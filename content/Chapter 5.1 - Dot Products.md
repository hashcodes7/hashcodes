---
terminologies: []
prior understanding: []
---

# Calculating Dot Products

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
print(inputs)
```


we will now take 2 values and multiply them mathematically 
```python
print ([0.4300*0.5500+ 0.1500*0.8700+ 0.8900*0.6600])
```


now lets try to do same through torch library 
```python
print(torch.dot(inputs[0],inputs[1]))
```

so dot is of [x, y, z] and [a, b, c] is [x*a +y*b + zc ] both mathematically and by using torch.dot() library method.

