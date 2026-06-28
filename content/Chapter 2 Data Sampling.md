---
terminologies: []
prior understanding: []
---
> [!abstract] Overview
> Data sampling is how we organize our massive list of numbers into bite-sized, overlapping flashcards so the model can actually practice learning.

---

## 🎯 Why we do it
> [!info] Rationale
> We can't feed an entire book to the model at once. We have to break the data into small chunks. The model learns by looking at a chunk of text (the Input) and trying to guess the very next word (the Target). We group these chunks into "batches" so the computer can process many of them at the exact same time.

## 🛠️ How we do it
> [!tip] Methodology
> We use a "sliding window" trick. Imagine a tiny window that only lets you see 3 words at a time. We take what's in the window (the Input sequence), and then we slide the window over by exactly one word to get the correct answer (the Target sequence).

## 📥 Input
> [!quote] Input Format
> - **Description:** A massive, single-file line of numbers representing our entire training book or dataset. Here is our tokenized master sentence: "The quick, brown fox jumps over the lazy dog!"
>
> - **Example:** 
> ```python
> dataset = tensor([464, 2068, 11, 7586, 21831, 11687, 625, 262, 16931, 3290, 0])
> ```

## 📤 Output
> [!success] Resulting State
> - **Description:** Two distinct grids of numbers. One grid is the "Inputs" and the other is the "Targets". The grids are sized by `(Batch Size, Sequence Length)`.
>
> - **Example:** 
> ```python
> # Inputs (Batch Size = 2, Sequence Length = 3)
> inputs = tensor([[464, 2068, 11],     # "The quick,"
>                  [2068, 11, 7586]])   # "quick, brown"
> 
> # Targets (Shifted over by one word!)
> targets = tensor([[2068, 11, 7586],   # "quick, brown"
>                   [11, 7586, 21831]]) # ", brown fox"
> ```
> 
> **Batch Shape Grid `(Batch Size=2, Seq Length=3)`:**
> 
> | | Pos 1 | Pos 2 | Pos 3 |
> | :--- | :---: | :---: | :---: |
> | **Batch 1 (Input)** | 464 (The) | 2068 (quick) | 11 (,) |
> | **Batch 1 (Target)** | 2068 (quick) | 11 (,) | 7586 (brown) |
> | **Batch 2 (Input)** | 2068 (quick) | 11 (,) | 7586 (brown) |
> | **Batch 2 (Target)** | 11 (,) | 7586 (brown) | 21831 (fox) |

## ⚙️ Working
> [!example] Under the Hood
> 1. We carve out an input chunk of a specific length.
> 2. We carve out the target chunk (the exact same length, just shifted to the right by one).
> 3. We bundle a bunch of these pairs together into a "Batch" to speed up training.
> 
> ```mermaid
> graph TD
>     A[Massive list of numbers] -->|Sliding Window| B(Input Chunk)
>     A -->|Slide over by 1| C(Target Chunk)
>     B --> D[Bundle into a Batch]
>     C --> D
> ```

---
*Navigation:*
⬅️ **Previous Step:** [[Chapter 1 Tokenizing Text]] | ➡️ **Next Step:** [[Chapter 3 Creating Token Embeddings]]