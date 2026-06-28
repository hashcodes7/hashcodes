---
terminologies: []
prior understanding:
  - "[[Chapter 5.3 - attention scores]]"
---

# What is Normalization

we total the sum to 1 for understanding importance of each word wrt journey. This is called     ==***attention weights***== 

Suppose we take the attention scores calculated previously for the word "journey":
```python
import torch

attn_scores = torch.tensor([0.9544, 1.4950, 1.4754, 0.8434, 0.7070, 1.0865])
```

# The Naive Method (Simple Division)

One basic way to normalize is to simply divide each score by the total sum of all scores.
```python
attn_weights_naive = attn_scores / attn_scores.sum()
print("Naive weights:", attn_weights_naive)
print("Sum:", attn_weights_naive.sum())
```
While this works for basic numbers, it is mathematically unstable in neural networks (especially if there are negative numbers or very large values).

# The Standard Method (Softmax)

In modern LLMs and Transformers, we use a special mathematical function called **Softmax**. 
Softmax does two magical things:
1. It uses exponents ($e^x$) to ensure all numbers (even negatives) become strictly positive.
2. It divides by the new total sum so everything perfectly adds up to 1 (100%).

> [!tip] FAST METHOD
> For fast, optimized, and numerically stable working, we always use PyTorch's built-in function!
```python
attn_weights = torch.softmax(attn_scores, dim=0)
print(attn_weights)
```

> [!success] Resulting State
> By applying Softmax, our raw attention score of `1.4950` for "journey" becomes a clean attention weight of `0.2379` (or ~23.8%).

**So attention weight of journey = 0.2379**

#### **Mathematically, Softmax looks like this:**
$$
\text{Softmax}(x_i) = \frac{e^{x_i}}{\sum_{j=1}^{N} e^{x_j}}
$$

For example, calculating the weight for our very first score ($0.9544$):
$$
\text{Weight}_1 = \frac{e^{0.9544}}{e^{0.9544} + e^{1.4950} + e^{1.4754} + e^{0.8434} + e^{0.7070} + e^{1.0865}} 
$$
$$
\text{Weight}_1 \approx \frac{2.597}{18.751} = 0.1385
$$
****
