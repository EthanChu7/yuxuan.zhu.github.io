---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Education
======
* M.S. in Computer Science, Guangdong University of Technology, 2021-2024
* B.S. in Computer Science, Guangdong University of Technology, 2017-2021

Work experience
======
* 2024-Present: Research & Machine Learning Engineer
  * Shopee, Search, Recommendation & Ads (S&R&A)
  * Model development for retrieval and pre-rank stages of Shopee Search
  * Focus on industrial recommendation modeling, temporal generalization, and production iteration
 
Skills
======
* Machine Learning: Recommender Systems, Ranking, Retrieval, Multi-task Learning, Temporal Generalization
* Modeling: Deep Learning Recommendation Models, Representation Learning, Causal/Counterfactual Methods
* Engineering: Python, SQL, PyTorch, Large-scale training and inference pipelines
* Experimentation: Offline evaluation, online A/B testing, iterative production optimization

Publications
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

Service and leadership
======
* Reviewer: NeurIPS, AAAI, SIGIR, etc.
* Led and supported cross-functional model iteration projects for Shopee Search retrieval and pre-rank pipelines
