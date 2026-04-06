---
title: "On the probability of necessity and sufficiency of explaining Graph Neural Networks: A lower bound optimization approach"
collection: publications
category: manuscripts
date: 2025-01-01
venue: 'Neural Networks 184:107065 (2025)'
paperurl: 'https://arxiv.org/abs/2212.07056'
codeurl: 'https://github.com/EthanChu7/NSEG'
citation: 'Ruichu Cai, Yuxuan Zhu, Xuexin Chen, Yuan Fang, Min Wu, Jie Qiao, Zhifeng Hao. (2025). "On the probability of necessity and sufficiency of explaining Graph Neural Networks: A lower bound optimization approach." <i>Neural Networks</i>.'
---
The explainability of Graph Neural Networks (GNNs) is critical to various GNN applications, yet it remains a significant challenge. A convincing explanation should be both necessary and sufficient simultaneously. However, existing GNN explaining approaches focus on only one of the two aspects, necessity or sufficiency, or a heuristic trade-off between the two. Theoretically, the Probability of Necessity and Sufficiency (PNS) holds the potential to identify the most necessary and sufficient explanation since it can mathematically quantify the necessity and sufficiency of an explanation. Nevertheless, the difficulty of obtaining PNS due to non-monotonicity and the challenge of counterfactual estimation limit its wide use. To address the non-identifiability of PNS, we resort to a lower bound of PNS that can be optimized via counterfactual estimation, and propose a framework of Necessary and Sufficient Explanation for GNN (NSEG) via optimizing that lower bound. Specifically, we depict the GNN as a structural causal model (SCM), and estimate the probability of counterfactual via the intervention under the SCM. Additionally, we leverage continuous masks with a sampling strategy to optimize the lower bound to enhance the scalability. Empirical results demonstrate that NSEG outperforms state-of-the-art methods, consistently generating the most necessary and sufficient explanations.
