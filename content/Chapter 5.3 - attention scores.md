---
terminologies: []
prior understanding:
  - "[[Chapter 5.1 - Dot Products]]"
---

# What is attention score

it is simply the dot multiplication result between the word vector we are trying to calculate the attention score of, with any other word It simply shows the extent of relationship between two words

suppose we have a tensor with list of values 
```python
import torch

inputs = torch.tensor(
  [[0.43, 0.15, 0.89], # Your     (x^1)
   [0.55, 0.87, 0.66], # journey  (x^2)
   [0.57, 0.85, 0.64], # starts   (x^3)
   [0.22, 0.58, 0.33], # with     (x^4)
   [0.77, 0.25, 0.10], # one      (x^5)
   [0.05, 0.80, 0.55]] # step     (x^6)
)
```

```python
print(torch.dot(inputs[0],inputs[1]))
```

**result is 0.9544 so this is the attention score between first word(your) and second word (journey).**

#### **Mathematically, this single dot product looks like this in matrix form:**
$$
\begin{bmatrix}
0.43 & 0.15 & 0.89
\end{bmatrix}  .
\begin{bmatrix}
0.55 &
0.87 &
0.66
\end{bmatrix}
= (0.43 \times 0.55) + (0.15 \times 0.87) + (0.89 \times 0.66) = 0.9544
$$

# similarly we can calculate it for entire of the list

```python
atn_scores = [torch.dot(x, inputs[1]) for x in inputs]
print(atn_scores)
```



> [!tip] FAST METHOD
for fast working we use @ sign
```python
query = inputs[1]  
attn_scores2 = inputs @ inputs[1]
print(attn_scores2)

```
so @ means "Take each row of the matrix LHS and compute its dot product with the vector RHS."


> [!success] Resulting State
> now By this we simply that are query vector journey Is most related to itself (1.4950) as it has the maximum attention score while its least related to "another" word (0.7070).
#### **Mathematically, this full matrix multiplication looks like this:**
$$
\begin{bmatrix}
0.43 & 0.15 & 0.89 \\
0.55 & 0.87 & 0.66 \\
0.57 & 0.85 & 0.64 \\
0.22 & 0.58 & 0.33 \\
0.77 & 0.25 & 0.10 \\
0.05 & 0.80 & 0.55
\end{bmatrix}
\begin{bmatrix}
0.55 \\
0.87 \\
0.66
\end{bmatrix}
=
\begin{bmatrix}
0.9544 \\
1.4950 \\
1.4754 \\
0.8434 \\
0.7070 \\
1.0865
\end{bmatrix}
$$
