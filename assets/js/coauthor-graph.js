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

  publications.forEach((paper) => {
    const authors = parseAuthors(paper.citation);
    if (!authors.includes(SELF_NAME)) return;

    const uniqueCoauthors = new Set(authors.filter((name) => name !== SELF_NAME));
    uniqueCoauthors.forEach((name) => {
      collaboratorCounts.set(name, (collaboratorCounts.get(name) || 0) + 1);
    });
  });

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
    hovered: null,
    draggedNode: null,
    panning: false,
    lastPointer: { x: 0, y: 0 },
    panX: 0,
    panY: 0,
    zoom: 1,
  };

  const nodes = [{ id: SELF_NAME, count: publications.length, x: 0, y: 0, vx: 0, vy: 0, fixed: true }];
  const links = [];

  const radiusBase = 170;
  collaborators.forEach(([name, count], index) => {
    const angle = (Math.PI * 2 * index) / Math.max(collaborators.length, 1) - Math.PI / 2;
    const radius = radiusBase + (index % 3) * 34;
    const node = {
      id: name,
      count,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      vx: 0,
      vy: 0,
      fixed: false,
    };
    nodes.push(node);
    links.push({ source: nodes[0], target: node, value: count });
  });

  const colors = () => {
    const dark = document.documentElement.classList.contains("dark");
    return dark
      ? {
          bgGlow: "rgba(133, 181, 255, 0.16)",
          edge: "rgba(188, 214, 255, 0.62)",
          edgeText: "#eef4ff",
          node: "#d7e6ff",
          self: "#f5f9ff",
          text: "#edf4ff",
          hint: "#cad6eb",
        }
      : {
          bgGlow: "rgba(112, 173, 255, 0.14)",
          edge: "rgba(93, 129, 182, 0.48)",
          edgeText: "#5d718f",
          node: "#587fb6",
          self: "#2f4058",
          text: "#2f4058",
          hint: "#667992",
        };
  };

  const fontFamily = getComputedStyle(document.body).fontFamily || "sans-serif";

  const resize = () => {
    const rect = stage.getBoundingClientRect();
    state.width = Math.max(Math.round(rect.width), 320);
    state.height = window.innerWidth < 768 ? 360 : 620;
    canvas.width = state.width * state.dpr;
    canvas.height = state.height * state.dpr;
    canvas.style.width = `${state.width}px`;
    canvas.style.height = `${state.height}px`;
    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
  };

  const worldToScreen = (x, y) => ({
    x: state.width / 2 + state.panX + x * state.zoom,
    y: state.height / 2 + state.panY + y * state.zoom,
  });

  const screenToWorld = (x, y) => ({
    x: (x - state.width / 2 - state.panX) / state.zoom,
    y: (y - state.height / 2 - state.panY) / state.zoom,
  });

  const hitNode = (x, y) => {
    const world = screenToWorld(x, y);
    for (const node of nodes) {
      const radius = node.id === SELF_NAME ? 12 : 10;
      if (Math.hypot(world.x - node.x, world.y - node.y) < radius + 8) {
        return node;
      }
    }
    return null;
  };

  const tick = () => {
    for (let i = 1; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node === state.draggedNode) continue;

      const angle = Math.atan2(node.y, node.x);
      const targetRadius = 180 + Math.min(node.count * 16, 42);
      const targetX = Math.cos(angle) * targetRadius;
      const targetY = Math.sin(angle) * targetRadius;

      node.vx += (targetX - node.x) * 0.0022;
      node.vy += (targetY - node.y) * 0.0022;
      node.vx += (-node.x) * 0.0004;
      node.vy += (-node.y) * 0.0004;
    }

    for (let i = 1; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.max(Math.hypot(dx, dy), 1);
        const minDist = 72;
        if (dist < minDist) {
          const push = (minDist - dist) * 0.008;
          const ux = dx / dist;
          const uy = dy / dist;
          a.vx -= ux * push;
          a.vy -= uy * push;
          b.vx += ux * push;
          b.vy += uy * push;
        }
      }
    }

    for (let i = 1; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node === state.draggedNode) continue;
      node.x += node.vx;
      node.y += node.vy;
      node.vx *= 0.92;
      node.vy *= 0.92;
    }
  };

  const draw = () => {
    const palette = colors();
    ctx.clearRect(0, 0, state.width, state.height);

    const glow = ctx.createRadialGradient(
      state.width / 2 + state.panX,
      state.height / 2 + state.panY,
      0,
      state.width / 2 + state.panX,
      state.height / 2 + state.panY,
      220 * state.zoom
    );
    glow.addColorStop(0, palette.bgGlow);
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(state.width / 2 + state.panX, state.height / 2 + state.panY, 230 * state.zoom, 0, Math.PI * 2);
    ctx.fill();

    ctx.lineWidth = 1;
    ctx.strokeStyle = palette.edge;
    ctx.fillStyle = palette.edgeText;
    ctx.font = `400 ${window.innerWidth < 768 ? 12 : 14}px ${fontFamily}`;

    links.forEach((link) => {
      const a = worldToScreen(link.source.x, link.source.y);
      const b = worldToScreen(link.target.x, link.target.y);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();

      const mx = a.x + (b.x - a.x) * 0.58;
      const my = a.y + (b.y - a.y) * 0.58;
      ctx.save();
      ctx.fillStyle = palette.edgeText;
      ctx.fillText(String(link.value), mx + 6, my - 6);
      ctx.restore();
    });

    nodes.forEach((node) => {
      const p = worldToScreen(node.x, node.y);
      const radius = node.id === SELF_NAME ? 4.8 : 3.6;
      ctx.beginPath();
      ctx.fillStyle = node.id === SELF_NAME ? palette.self : palette.node;
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.font = `${window.innerWidth < 768 ? 400 : 400} ${window.innerWidth < 768 ? 16 : 20}px ${fontFamily}`;
    ctx.fillStyle = palette.text;

    nodes.forEach((node) => {
      const p = worldToScreen(node.x, node.y);
      if (node.id === SELF_NAME) {
        ctx.textAlign = "center";
        ctx.fillText(node.id, p.x, p.y + 24);
      } else {
        ctx.textAlign = node.x >= 0 ? "left" : "right";
        const offset = node.x >= 0 ? 12 : -12;
        ctx.fillText(node.id, p.x + offset, p.y + 5);
      }
    });

    const hint = stage.nextElementSibling;
    if (hint && hint.classList.contains("coauthor-graph__hint")) {
      hint.style.color = palette.hint;
    }
  };

  const animate = () => {
    tick();
    draw();
    requestAnimationFrame(animate);
  };

  canvas.addEventListener("pointerdown", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    state.lastPointer = { x, y };
    const hit = hitNode(x, y);
    if (hit && hit.id !== SELF_NAME) {
      state.draggedNode = hit;
      canvas.setPointerCapture(event.pointerId);
    } else {
      state.panning = true;
      canvas.setPointerCapture(event.pointerId);
    }
  });

  canvas.addEventListener("pointermove", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    state.hovered = hitNode(x, y);

    if (state.draggedNode) {
      const world = screenToWorld(x, y);
      state.draggedNode.x = world.x;
      state.draggedNode.y = world.y;
      state.draggedNode.vx = 0;
      state.draggedNode.vy = 0;
    } else if (state.panning) {
      state.panX += x - state.lastPointer.x;
      state.panY += y - state.lastPointer.y;
    }
    state.lastPointer = { x, y };
  });

  const releasePointer = () => {
    state.draggedNode = null;
    state.panning = false;
  };

  canvas.addEventListener("pointerup", releasePointer);
  canvas.addEventListener("pointercancel", releasePointer);
  canvas.addEventListener("pointerleave", () => {
    state.hovered = null;
  });

  canvas.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      const direction = event.deltaY > 0 ? 0.92 : 1.08;
      state.zoom = Math.max(0.72, Math.min(1.6, state.zoom * direction));
    },
    { passive: false }
  );

  resize();
  window.addEventListener("resize", resize);
  animate();
}
