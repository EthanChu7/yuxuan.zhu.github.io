---
permalink: /
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

<section class="content-card">
  <h2>Biography</h2>
  <p>My research focuses on recommender systems and causality-inspired machine learning, with interests in explainability, robustness, and real-world large-scale recommendation systems.</p>
  <p><strong>Education:</strong> M.S. in Computer Science, Guangdong University of Technology (2021-2024); B.S. in Computer Science, Guangdong University of Technology (2017-2021).</p>
</section>

<section class="content-card">
  <h2>Contact 📫</h2>
  <ul>
    <li>Email: <a href="mailto:iamyuxuanzhu@gmail.com">iamyuxuanzhu@gmail.com</a></li>
  </ul>
</section>

<section class="content-card">
  <h2>News 📰</h2>
  <ul>
    <li><strong>Apr 2026:</strong> Homepage and publications page redesigned for clearer structure and mobile readability.</li>
    <li><strong>2026:</strong> Two new preprints accepted on arXiv: ReSID (<code>arXiv:2602.02338</code>) and ManCAR (<code>arXiv:2602.20093</code>).</li>
    <li><strong>2025:</strong> KDD paper on deep collaborative filtering published; OnePiece and ELBO-TDS released as arXiv preprints.</li>
  </ul>
</section>

<section class="content-card">
  <h2>Research Interests 🔬</h2>
  <ul>
    <li>Recommender Systems 🎯</li>
    <li>Causality-inspired Machine Learning 🧠</li>
    <li>Explainable AI 🧩</li>
    <li>Robustness and Counterfactual Learning 🛡️</li>
  </ul>
</section>

<section class="content-card">
  <h2>Selected Publications 📚</h2>

  <h3>2026</h3>
  <div class="sun-card"><strong>Rethinking Generative Recommender Tokenizer: Recsys-Native Encoding and Semantic Quantization Beyond LLMs</strong>. CoRR abs/2602.02338 (2026). <a href="https://arxiv.org/abs/2602.02338">arXiv:2602.02338</a></div>
  <div class="sun-card"><strong>ManCAR: Manifold-Constrained Latent Reasoning with Adaptive Test-Time Computation for Sequential Recommendation</strong>. CoRR abs/2602.20093 (2026). <a href="https://arxiv.org/abs/2602.20093">arXiv:2602.20093</a></div>

  <h3>2025</h3>
  <div class="sun-card"><strong>On the probability of necessity and sufficiency of explaining Graph Neural Networks: A lower bound optimization approach</strong>. Neural Networks 184:107065 (2025). <a href="https://arxiv.org/abs/2212.07056">arXiv:2212.07056</a></div>
  <div class="sun-card"><strong>Embed Progressive Implicit Preference in Unified Space for Deep Collaborative Filtering</strong>. KDD 2025. <a href="https://arxiv.org/abs/2505.20900">arXiv:2505.20900</a></div>
  <div class="sun-card"><strong>OnePiece: Bringing Context Engineering and Reasoning to Industrial Cascade Ranking System</strong>. CoRR abs/2509.18091 (2025). <a href="https://arxiv.org/abs/2509.18091">arXiv:2509.18091</a></div>
  <div class="sun-card"><strong>A Probabilistic Framework for Temporal Distribution Generalization in Industry-Scale Recommender Systems</strong>. CoRR abs/2511.21032 (2025). <a href="https://arxiv.org/abs/2511.21032">arXiv:2511.21032</a></div>

  <h3>2024</h3>
  <div class="sun-card"><strong>Feature Attribution with Necessity and Sufficiency via Dual-stage Perturbation Test for Causal Explanation</strong>. ICML 2024. <a href="https://arxiv.org/abs/2402.08845">arXiv:2402.08845</a></div>
  <div class="sun-card"><strong>Where and How to Attack? A Causality-Inspired Recipe for Generating Counterfactual Adversarial Examples</strong>. AAAI 2024. <a href="https://arxiv.org/abs/2312.13628">arXiv:2312.13628</a></div>
</section>

<section class="content-card">
  <h2>Co-authors 🤝</h2>
  <div class="coauthor-graph">
    <div id="coauthor-graph-app" class="coauthor-graph__stage" data-self-name="Yuxuan Zhu"></div>
    <p class="coauthor-graph__hint">Drag to move, scroll to zoom, drag a name to reposition it.</p>
    <script id="coauthor-graph-data" type="application/json">
      [
      {% for post in site.publications %}
        {
          "title": {{ post.title | jsonify }},
          "citation": {{ post.citation | strip_html | jsonify }},
          "url": {{ post.url | jsonify }}
        }{% unless forloop.last %},{% endunless %}
      {% endfor %}
      ]
    </script>
  </div>
</section>

<section class="content-card">
  <h2>Services 🤝</h2>
  <ul>
    <li>Reviewer: NeurIPS, AAAI, SIGIR, etc. ✅</li>
  </ul>
</section>

<section class="content-card">
  <h2>Links 🔗</h2>
  <ul>
    <li><a href="https://scholar.google.com/citations?hl=en&user=iqf_6DYAAAAJ">Google Scholar</a></li>
    <li><a href="https://openreview.net/profile?id=~Yuxuan_Zhu2">OpenReview</a></li>
    <li><a href="https://dblp.org/pid/146/0939-1">DBLP</a></li>
    <li><a href="https://orcid.org/0000-0003-1831-9688">ORCID</a></li>
  </ul>
</section>

<section class="content-card">
  <h2>Work Experience 💼</h2>
  <div class="experience-card">
    <h3>Research &amp; Machine Learning Engineer</h3>
    <p><strong>Organization:</strong> Shopee, Search, Recommendation &amp; Ads (S&amp;R&amp;A)</p>
    <p><strong>Period:</strong> 2024-Present</p>
    <p><strong>Responsibilities:</strong> Model development for retrieval and pre-rank stages of Shopee Search.</p>
    <p><strong>Current Focus:</strong> Industrial recommendation modeling, temporal generalization, and production iteration.</p>
  </div>
</section>

<section class="content-card">
  <h2>Skills 🛠️</h2>
  <ul>
    <li><strong>Machine Learning:</strong> Recommender Systems, Ranking, Retrieval, Multi-task Learning, Temporal Generalization</li>
    <li><strong>Modeling:</strong> Deep Learning Recommendation Models, Representation Learning, Causal/Counterfactual Methods</li>
    <li><strong>Engineering:</strong> Python, SQL, PyTorch, Large-scale training and inference pipelines</li>
    <li><strong>Experimentation:</strong> Offline evaluation, online A/B testing, iterative production optimization</li>
  </ul>
</section>
