---
title: "A Probabilistic Framework for Temporal Distribution Generalization in Industry-Scale Recommender Systems"
collection: publications
category: manuscripts
date: 2025-11-01
venue: 'CoRR abs/2511.21032 (2025)'
paperurl: 'https://arxiv.org/abs/2511.21032'
citation: 'Yuxuan Zhu, Cong Fu, Yabo Ni, Anxiang Zeng, Yuan Fang. (2025). "A Probabilistic Framework for Temporal Distribution Generalization in Industry-Scale Recommender Systems." <i>CoRR</i> abs/2511.21032.'
---
Temporal distribution shift (TDS) erodes the long-term accuracy of recommender systems, yet industrial practice still relies on periodic incremental training, which struggles to capture both stable and transient patterns. Existing approaches such as invariant learning and self-supervised learning offer partial solutions but often suffer from unstable temporal generalization, representation collapse, or inefficient data utilization. To address these limitations, we propose ELBO$_\text{TDS}$, a probabilistic framework that integrates seamlessly into industry-scale incremental learning pipelines. First, we identify key shifting factors through statistical analysis of real-world production data and design a simple yet effective data augmentation strategy that resamples these time-varying factors to extend the training support. Second, to harness the benefits of this extended distribution while preventing representation collapse, we model the temporal recommendation scenario using a causal graph and derive a self-supervised variational objective, ELBO$_\text{TDS}$, grounded in the causal structure. Extensive experiments supported by both theoretical and empirical analysis demonstrate that our method achieves superior temporal generalization, yielding a 2.33\% uplift in GMV per user and has been successfully deployed in Shopee Product Search. Code is available at https://github.com/FuCongResearchSquad/ELBO4TDS.
