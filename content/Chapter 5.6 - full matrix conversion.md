---
terminologies: []
prior understanding:
  - "[[Chapter 5.5 - context vector]]"
---

# 🤖 The Full Matrix Conversion

In previous chapters, we calculated attention for just one word at a time. But in reality, LLMs process the entire sentence simultaneously using **Matrix Multiplication**. 

Here is the entire self-attention mechanism, written in just 3 lines of PyTorch code:

```python
# 1. Calculate raw attention scores
attn_scores = inputs @ inputs.T

# 2. Normalize scores into percentages
attn_weights = torch.softmax(attn_scores, dim=-1)

# 3. Multiply weights by inputs to get final context vectors
all_context_vecs = attn_weights @ inputs

print("All context vectors:\n", all_context_vecs)
```

But what is actually happening mathematically under the hood? Let's break down the full matrix conversion!

---

### Step 0: The Original Input Matrix ($X$)

Here is our 6x3 input matrix $X$ (6 words, 3 dimensions each) and its transposed version $X^T$ (which is 3x6):

$$
X = \begin{bmatrix}
0.43 & 0.15 & 0.89 \\
0.55 & 0.87 & 0.66 \\
0.57 & 0.85 & 0.64 \\
0.22 & 0.58 & 0.33 \\
0.77 & 0.25 & 0.10 \\
0.05 & 0.80 & 0.55
\end{bmatrix}
\quad \quad \quad
X^T = \begin{bmatrix}
0.43 & 0.55 & 0.57 & 0.22 & 0.77 & 0.05 \\
0.15 & 0.87 & 0.85 & 0.58 & 0.25 & 0.80 \\
0.89 & 0.66 & 0.64 & 0.33 & 0.10 & 0.55
\end{bmatrix}
$$

---

### Step 1: Calculating All Attention Scores
> `attn_scores = inputs @ inputs.T`

By multiplying $X \times X^T$, we calculate the dot product between *every single word* and *every other word* instantly. This results in a $6 \times 6$ matrix ($S$) containing all the raw attention scores!

$$
S = X \times X^T = 
\begin{bmatrix}
0.43 & 0.15 & 0.89 \\
0.55 & 0.87 & 0.66 \\
0.57 & 0.85 & 0.64 \\
0.22 & 0.58 & 0.33 \\
0.77 & 0.25 & 0.10 \\
0.05 & 0.80 & 0.55
\end{bmatrix}
\times
\begin{bmatrix}
0.43 & 0.55 & 0.57 & 0.22 & 0.77 & 0.05 \\
0.15 & 0.87 & 0.85 & 0.58 & 0.25 & 0.80 \\
0.89 & 0.66 & 0.64 & 0.33 & 0.10 & 0.55
\end{bmatrix}
$$

**Resulting Attention Scores ($S$):**
$$
S = 
\begin{bmatrix}
0.9995 & 0.9544 & 0.9422 & 0.4753 & 0.4576 & 0.6310 \\ 
0.9544 & 1.4950 & 1.4754 & 0.8434 & 0.7070 & 1.0865 \\ 
0.9422 & 1.4754 & 1.4570 & 0.8296 & 0.7154 & 1.0605 \\ 
0.4753 & 0.8434 & 0.8296 & 0.4937 & 0.3474 & 0.6565 \\ 
0.4576 & 0.7070 & 0.7154 & 0.3474 & 0.6654 & 0.2935 \\ 
0.6310 & 1.0865 & 1.0605 & 0.6565 & 0.2935 & 0.9450
\end{bmatrix}
$$
*(Notice that the score between Word 2 and Word 2 is `1.4950`, exactly as we calculated manually!)*

---

### Step 2: Normalizing into Attention Weights
> `attn_weights = torch.softmax(attn_scores, dim=-1)`

Next, we apply the Softmax function row-by-row to the $S$ matrix. This forces every row to perfectly sum up to `1.0` (or 100%), turning raw scores into percentages ($W$).

**Resulting Attention Weights ($W$):**
$$
W = \text{Softmax}(S) = 
\begin{bmatrix}
0.2098 & 0.2006 & 0.1981 & 0.1242 & 0.1220 & 0.1452 \\ 
0.1385 & 0.2379 & 0.2333 & 0.1240 & 0.1082 & 0.1581 \\ 
0.1390 & 0.2369 & 0.2326 & 0.1242 & 0.1108 & 0.1565 \\ 
0.1435 & 0.2074 & 0.2046 & 0.1462 & 0.1263 & 0.1720 \\ 
0.1526 & 0.1958 & 0.1975 & 0.1367 & 0.1879 & 0.1295 \\ 
0.1385 & 0.2184 & 0.2128 & 0.1420 & 0.0988 & 0.1896
\end{bmatrix}
$$
---
### Step 3: Understanding the weights matrix

|         |  your  | journey | starts |  with  |  one   |  step  |                                 |
| ------- | :----: | :-----: | :----: | :----: | :----: | :----: | ------------------------------- |
| your    | 0.2098 | 0.2006  | 0.1981 | 0.1242 | 0.1220 | 0.1452 |                                 |
| journey | 0.1385 | 0.2379  | 0.2333 | 0.1240 | 0.1082 | 0.1581 | <-this is the one we calculated |
| starts  | 0.1390 | 0.2369  | 0.2326 | 0.1242 | 0.1108 | 0.1565 |                                 |
| with    | 0.1435 | 0.2074  | 0.2046 | 0.1462 | 0.1263 | 0.1720 |                                 |
| one     | 0.1526 | 0.1958  | 0.1975 | 0.1367 | 0.1879 | 0.1295 |                                 |
| step    | 0.1385 | 0.2184  | 0.2128 | 0.1420 | 0.0988 | 0.1896 |                                 |

---

### Step 3: Generating Final Context Vectors (matrix multiplication)
> `all_context_vecs = attn_weights @ inputs`

For the final trick, we multiply our new $6 \times 6$ weights matrix ($W$) by our original $6 \times 3$ input matrix ($X$). This creates a perfectly blended $6 \times 3$ Context Vectors matrix ($Z$).

$$
Z = W \times X = 
\begin{bmatrix}
0.2098 & 0.2006 & 0.1981 & 0.1242 & 0.1220 & 0.1452 \\ 
0.1385 & 0.2379 & 0.2333 & 0.1240 & 0.1082 & 0.1581 \\ 
0.1390 & 0.2369 & 0.2326 & 0.1242 & 0.1108 & 0.1565 \\ 
0.1435 & 0.2074 & 0.2046 & 0.1462 & 0.1263 & 0.1720 \\ 
0.1526 & 0.1958 & 0.1975 & 0.1367 & 0.1879 & 0.1295 \\ 
0.1385 & 0.2184 & 0.2128 & 0.1420 & 0.0988 & 0.1896
\end{bmatrix}
\times
\begin{bmatrix}
0.43 & 0.15 & 0.89 \\
0.55 & 0.87 & 0.66 \\
0.57 & 0.85 & 0.64 \\
0.22 & 0.58 & 0.33 \\
0.77 & 0.25 & 0.10 \\
0.05 & 0.80 & 0.55
\end{bmatrix}
$$

**Final Resulting Context Vectors ($Z$):**
$$
Z = 
\begin{bmatrix}
0.4421 & 0.5931 & 0.5790 \\ 
0.4419 & 0.6515 & 0.5683 \\ 
0.4431 & 0.6496 & 0.5671 \\ 
0.4304 & 0.6298 & 0.5510 \\ 
0.4671 & 0.5910 & 0.5266 \\ 
0.4177 & 0.6503 & 0.5645
\end{bmatrix}
$$

> [!success] The Magic of Matrices
> We just processed the entire sequence at once! The second row in this final matrix (`[0.4419, 0.6515, 0.5683]`) is the exact same context vector for "journey" that we calculated manually with `for` loops in the previous chapter. Only this time, we got the context vectors for *all* words simultaneously!
