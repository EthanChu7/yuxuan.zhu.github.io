const stage = document.getElementById("coauthor-graph-app");
const payload = document.getElementById("coauthor-graph-data");

if (stage && payload) {
  const SELF_NAME = stage.dataset.selfName || "Yuxuan Zhu";
  const publications = JSON.parse(payload.textContent);

  const stripHtml = (value) => value.replace(/<[^>]+>/g, "").trim();

  const parseAuthors = (citation) => {
    const clean = stripHtml(citation);
    const match = clean.match(/^(.*?)\.\s*\(\d{4}\)\./);
    if (!match) return [];
    return match[1]
      .split(",")
      .map((name) => name.trim().replace(/\.$/, ""))
      .filter(Boolean);
  };

  const collaboratorCounts = new Map();
  for (const paper of publications) {
    const authors = parseAuthors(paper.citation);
    if (!authors.includes(SELF_NAME)) continue;
    const uniqueCoauthors = new Set(authors.filter((name) => name !== SELF_NAME));
    uniqueCoauthors.forEach((name) => {
      collaboratorCounts.set(name, (collaboratorCounts.get(name) || 0) + 1);
    });
  }

  const collaborators = Array.from(collaboratorCounts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  const canvas = document.createElement("canvas");
  canvas.className = "coauthor-graph__canvas";
  stage.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const state = {
    width: 0,
    height: 0,
    dpr: Math.max(window.devicePixelRatio || 1, 1),
    rotationY: 0,
    rotationX: -0.24,
    isDragging: false,
    pointerId: null,
    lastX: 0,
    lastY: 0,
  };

  const nodes = [{ id: SELF_NAME, count: publications.length, phi: 0, theta: 0 }];
  const links = [];

  const total = Math.max(collaborators.length, 1);
  collaborators.forEach(([name, count], index) => {
    const t = total === 1 ? 0.5 : index / (total - 1);
    const phi = Math.acos(1 - 2 * t);
    const theta = Math.PI * (3 - Math.sqrt(5)) * index;
    const node = { id: name, count, phi, theta };
    nodes.push(node);
    links.push({ source: nodes[0], target: node, value: count });
  });

  const fontFamily = getComputedStyle(document.body).fontFamily || "sans-serif";

  const colors = () => {
    const dark = document.documentElement.classList.contains("dark");
    return dark
      ? {
          glow: "rgba(66, 153, 225, 0.18)",
          edge: "rgba(133, 197, 255, 0.28)",
          edgeText: "rgba(214, 233, 255, 0.88)",
          dot: "#7dd3fc",
          text: "#edf6ff",
          center: "#edf6ff",
          shadow: "rgba(8, 16, 30, 0.28)",
        }
      : {
          glow: "rgba(56, 189, 248, 0.14)",
          edge: "rgba(71, 117, 173, 0.2)",
          edgeText: "rgba(78, 99, 129, 0.84)",
          dot: "#2563eb",
          text: "#23324a",
          center: "#23324a",
          shadow: "rgba(148, 163, 184, 0.14)",
        };
  };

  const resize = () => {
    const rect = stage.getBoundingClientRect();
    state.width = Math.max(Math.round(rect.width), 320);
    state.height = window.innerWidth < 768 ? 420 : 700;
    canvas.width = state.width * state.dpr;
    canvas.height = state.height * state.dpr;
    canvas.style.width = `${state.width}px`;
    canvas.style.height = `${state.height}px`;
    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
  };

  const projectNode = (node) => {
    if (node.id === SELF_NAME) {
      return { x: 0, y: 0, z: 1.1, scale: 1.08 };
    }

    const radius = 182 + Math.min(node.count * 16, 40);
    const sx = Math.sin(node.phi) * Math.cos(node.theta);
    const sy = Math.cos(node.phi);
    const sz = Math.sin(node.phi) * Math.sin(node.theta);

    const cosY = Math.cos(state.rotationY);
    const sinY = Math.sin(state.rotationY);
    const cosX = Math.cos(state.rotationX);
    const sinX = Math.sin(state.rotationX);

    const x1 = sx * cosY - sz * sinY;
    const z1 = sx * sinY + sz * cosY;
    const y2 = sy * cosX - z1 * sinX;
    const z2 = sy * sinX + z1 * cosX;

    const depth = (z2 + 1.8) / 2.8;
    const scale = 0.72 + depth * 0.6;

    return {
      x: x1 * radius,
      y: y2 * radius * 0.88,
      z: z2,
      scale,
    };
  };

  const draw = () => {
    const palette = colors();
    ctx.clearRect(0, 0, state.width, state.height);

    const centerX = state.width / 2;
    const centerY = state.height / 2;

    const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.min(state.width, state.height) * 0.34);
    glow.addColorStop(0, palette.glow);
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(centerX, centerY, Math.min(state.width, state.height) * 0.36, 0, Math.PI * 2);
    ctx.fill();

    const projected = nodes.map((node) => ({ node, ...projectNode(node) }));
    const centerNode = projected[0];
    const others = projected.slice(1).sort((a, b) => a.z - b.z);

    ctx.save();
    ctx.translate(centerX, centerY);

    ctx.lineCap = "round";
    ctx.lineWidth = 0.75;
    ctx.font = `400 ${window.innerWidth < 768 ? 11 : 13}px ${fontFamily}`;

    others.forEach((entry) => {
      ctx.strokeStyle = palette.edge;
      ctx.beginPath();
      ctx.moveTo(centerNode.x, centerNode.y);
      ctx.lineTo(entry.x, entry.y);
      ctx.stroke();

      const labelT = 0.55;
      const lx = centerNode.x + (entry.x - centerNode.x) * labelT;
      const ly = centerNode.y + (entry.y - centerNode.y) * labelT;
      ctx.fillStyle = palette.edgeText;
      ctx.fillText(String(entry.node.count), lx + 6, ly - 4);
    });

    others.forEach((entry) => {
      ctx.beginPath();
      ctx.fillStyle = palette.dot;
      ctx.arc(entry.x, entry.y, 2.7 * entry.scale, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.beginPath();
    ctx.fillStyle = palette.dot;
    ctx.arc(centerNode.x, centerNode.y, 3.6, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    others.forEach((entry) => {
      ctx.fillStyle = palette.text;
      const baseSize = window.innerWidth < 768 ? 13 : 17;
      const bonusSize = Math.min(entry.node.count * (window.innerWidth < 768 ? 0.9 : 1.1), window.innerWidth < 768 ? 4 : 6);
      ctx.font = `400 ${Math.round(baseSize * entry.scale + bonusSize)}px ${fontFamily}`;
      ctx.textAlign = entry.x >= 0 ? "left" : "right";
      const offset = entry.x >= 0 ? 10 : -10;
      ctx.fillText(entry.node.id, entry.x + offset, entry.y + 5);
    });

    ctx.fillStyle = palette.center;
    ctx.font = `400 ${window.innerWidth < 768 ? 17 : 22}px ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.shadowColor = palette.shadow;
    ctx.shadowBlur = 10;
    ctx.fillText(SELF_NAME, centerNode.x, centerNode.y + 26);
    ctx.restore();

  };

  const updateCursor = () => {
    stage.style.cursor = state.isDragging ? "grabbing" : "grab";
  };

  const handlePointerDown = (event) => {
    state.isDragging = true;
    state.pointerId = event.pointerId;
    state.lastX = event.clientX;
    state.lastY = event.clientY;
    canvas.setPointerCapture(event.pointerId);
    updateCursor();
  };

  const handlePointerMove = (event) => {
    if (!state.isDragging || event.pointerId !== state.pointerId) return;
    event.preventDefault();
    const dx = event.clientX - state.lastX;
    const dy = event.clientY - state.lastY;
    state.lastX = event.clientX;
    state.lastY = event.clientY;

    const xSensitivity = window.innerWidth < 768 ? 0.016 : 0.009;
    const ySensitivity = window.innerWidth < 768 ? 0.011 : 0.006;
    state.rotationY += dx * xSensitivity;
    state.rotationX += dy * ySensitivity;
    state.rotationX = Math.max(-0.9, Math.min(0.9, state.rotationX));
  };

  const handlePointerUp = (event) => {
    if (state.pointerId !== event.pointerId) return;
    state.isDragging = false;
    state.pointerId = null;
    updateCursor();
  };

  const animate = () => {
    draw();
    requestAnimationFrame(animate);
  };

  resize();
  window.addEventListener("resize", resize);
  canvas.addEventListener("pointerdown", handlePointerDown);
  canvas.addEventListener("pointermove", handlePointerMove);
  canvas.addEventListener("pointerup", handlePointerUp);
  canvas.addEventListener("pointercancel", handlePointerUp);
  canvas.addEventListener("pointerleave", handlePointerUp);
  updateCursor();
  animate();
}
