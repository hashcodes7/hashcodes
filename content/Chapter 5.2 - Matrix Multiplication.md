---
terminologies: []
prior understanding:
  - "[[Chapter 5.1 - Dot Products]]"
---

# ✖️ Matrix Multiplication

Matrix multiplication is essentially just doing many **Dot Products** all at once.

Let's visualize how a $2 \times 2$ matrix multiplies with another $2 \times 2$ matrix mathematically. We will use colors to track exactly where each number goes. 

### The Rule: Rows $\times$ Columns
To find the top-left number of the answer, we take the **Top Row** of the first matrix and calculate the dot product with the **Left Column** of the second matrix.

$$
\begin{bmatrix}  
\color{red}{A} & \color{red}{B} \\  
\color{skyblue}{C} & \color{skyblue}{D}  
\end{bmatrix}  
\times
\begin{bmatrix}  
\color{green}{E} & \color{orange}{F} \\  
\color{green}{G} & \color{orange}{H}  
\end{bmatrix}  
=
\begin{bmatrix}  
(\color{red}{A} \times \color{green}{E}) + (\color{red}{B} \times \color{green}{G}) & (\color{red}{A} \times \color{orange}{F}) + (\color{red}{B} \times \color{orange}{H}) \\  
(\color{skyblue}{C} \times \color{green}{E}) + (\color{skyblue}{D} \times \color{green}{G}) & (\color{skyblue}{C} \times \color{orange}{F}) + (\color{skyblue}{D} \times \color{orange}{H})  
\end{bmatrix}
$$

---

### Example with Numbers

Let's use some real numbers to see this in action. Suppose we have two $2 \times 2$ matrices, $X$ and $Y$.

$$
X =
\begin{bmatrix}  
\color{red}{1} & \color{red}{2} \\  
\color{skyblue}{3} & \color{skyblue}{4}  
\end{bmatrix}
\quad \quad
Y =
\begin{bmatrix}  
\color{green}{5} & \color{orange}{6} \\  
\color{green}{7} & \color{orange}{8}  
\end{bmatrix}
$$

When we multiply $X \times Y$:

$$
X \times Y =
\begin{bmatrix}  
(\color{red}{1} \times \color{green}{5}) + (\color{red}{2} \times \color{green}{7}) & (\color{red}{1} \times \color{orange}{6}) + (\color{red}{2} \times \color{orange}{8}) \\  
(\color{skyblue}{3} \times \color{green}{5}) + (\color{skyblue}{4} \times \color{green}{7}) & (\color{skyblue}{3} \times \color{orange}{6}) + (\color{skyblue}{4} \times \color{orange}{8})  
\end{bmatrix}
$$

$$
X \times Y =
\begin{bmatrix}  
\color{red}{5} + \color{red}{14} & \color{red}{6} + \color{red}{16} \\  
\color{skyblue}{15} + \color{skyblue}{28} & \color{skyblue}{18} + \color{skyblue}{32}  
\end{bmatrix}
=
\begin{bmatrix}  
19 & 22 \\  
43 & 50  
\end{bmatrix}
$$

---

### Matrix Multiplication in PyTorch

In Python using PyTorch, we can perform this exact same mathematical operation instantly using the `@` symbol:

```python
import torch

X = torch.tensor([
  [1, 2],
  [3, 4]
])

Y = torch.tensor([
  [5, 6],
  [7, 8]
])

# Perform matrix multiplication using the @ operator
result = X @ Y

print(result)
```

**Output:**
```
tensor([[19, 22],
        [43, 50]])
```

> [!tip] The Ultimate Cheat Code
> Matrix multiplication (`@`) is the engine of all Neural Networks. Whenever you see `@` in PyTorch, just remember it means: *"Take each row of the matrix on the left, and compute its dot product with each column of the matrix on the right."*
