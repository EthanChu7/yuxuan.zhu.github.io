---
title: "Feature Attribution with Necessity and Sufficiency via Dual-stage Perturbation Test for Causal Explanation"
collection: publications
category: conferences
date: 2024-07-01
venue: 'ICML 2024'
paperurl: 'https://arxiv.org/abs/2402.08845'
citation: 'Xuexin Chen, Ruichu Cai, Zhengting Huang, Yuxuan Zhu, Julien Horwood, Zhifeng Hao, Zijian Li, Jose Miguel Hernandez-Lobato. (2024). "Feature Attribution with Necessity and Sufficiency via Dual-stage Perturbation Test for Causal Explanation." <i>ICML 2024</i>.'
---
We investigate the problem of explainability for machine learning models, focusing on Feature Attribution Methods (FAMs) that evaluate feature importance through perturbation tests. Despite their utility, FAMs struggle to distinguish the contributions of different features, when their prediction changes are similar after perturbation. To enhance FAMs' discriminative power, we introduce Feature Attribution with Necessity and Sufficiency (FANS), which find a neighborhood of the input such that perturbing samples within this neighborhood have a high Probability of being Necessity and Sufficiency (PNS) cause for the change in predictions, and use this PNS as the importance of the feature. Specifically, FANS compute this PNS via a heuristic strategy for estimating the neighborhood and a perturbation test involving two stages (factual and interventional) for counterfactual reasoning. To generate counterfactual samples, we use a resampling-based approach on the observed samples to approximate the required conditional distribution. We demonstrate that FANS outperforms existing attribution methods on six benchmarks. Please refer to the source code via url{https://github.com/DMIRLAB-Group/FANS}.
