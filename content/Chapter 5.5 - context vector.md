---
terminologies: []
prior understanding:
  - "[[Chapter 5.4 - normalization]]"
---
# next we make context vector

A context vector is simply a blended, super-charged version of our original word vector. It contains the original word's meaning, plus the weighted meanings of all other relevant words in the sentence.

To build it, we simply multiply every word's original vector by its assigned attention weight, and sum them all together!
<img src="https://sebastianraschka.com/images/LLMs-from-scratch-images/ch03_compressed/10.webp" width="800px">
### The Step-by-Step Method

Let's calculate the context vector specifically for our query word "journey" (which was the 2nd word in our list). We will use the normalized weights we calculated in Chapter 5.3.

```python
import torch

# Our original inputs
inputs = torch.tensor(
  [[0.43, 0.15, 0.89], # Your     (x^1)
   [0.55, 0.87, 0.66], # journey  (x^2)
   [0.57, 0.85, 0.64], # starts   (x^3)
   [0.22, 0.58, 0.33], # with     (x^4)
   [0.77, 0.25, 0.10], # one      (x^5)
   [0.05, 0.80, 0.55]] # step     (x^6)
)

# The attention weights for "journey" (from Chapter 5.3)
attn_weights_2 = torch.tensor([0.1385, 0.2379, 0.2333, 0.1240, 0.1082, 0.1581])

query = inputs[1] 
context_vec_2 = torch.zeros(query.shape)

for i, vector in enumerate(inputs):
    # Multiply the original vector by its attention weight and add it up
    context_vec_2 += attn_weights_2[i] * vector

print("Context vector for 'journey':\n", context_vec_2)
```

#### **Mathematically, this weighted sum looks like this:**
$$
z^{(2)} = \sum_{i=1}^{6} \alpha_{2,i} x^{(i)} = \alpha_{2,1} x^{(1)} + \alpha_{2,2} x^{(2)} + \dots + \alpha_{2,6} x^{(6)}
$$
$$
z^{(2)} = (0.1385 \times [0.43, 0.15, 0.89]) + (0.2379 \times [0.55, 0.87, 0.66]) + \dots
$$
$$
z^{(2)} = [0.4419, 0.6515, 0.5683]
$$


> [!tip] FAST METHOD (Matrix Multiplication)
> Instead of using a `for` loop to calculate the context vector for just one word, we can use matrix multiplication (`@`) to instantly calculate the context vectors for **ALL** words in the sentence simultaneously!

```python
# Calculate the full 6x6 matrix of attention weights for all words
attn_scores = inputs @ inputs.T
attn_weights = torch.softmax(attn_scores, dim=-1)

# Multiply the full 6x6 weights matrix by the 6x3 input matrix
all_context_vecs = attn_weights @ inputs

print("All context vectors:\n", all_context_vecs)
```

> [!success] Resulting State
> Look closely at the second row of `all_context_vecs`. You'll see `[0.4419, 0.6515, 0.5683]` — this is the exact same context vector we calculated manually for "journey"! 

#### **Mathematically, this full matrix multiplication looks like this:**
$$
Z = A X
$$
Where $A$ is the $6 \times 6$ Attention Weights matrix, $X$ is the $6 \times 3$ Input matrix, and $Z$ is the final $6 \times 3$ Context Vectors matrix!
