---
terminologies: []
prior understanding: []
---

> [!abstract] Overview
> Token Embeddings are the magic trick that turns completely random ID numbers into rich, meaningful concepts that the AI can understand.

---

## 🎯 Why we do it
> [!info] Rationale
> Right now, our words are just basic ID numbers. To the computer, ID #7586 and ID #21831 are totally unrelated, even if they represent "brown" and "fox". We need a way to give words meaning. Embeddings turn every single ID into a long list of decimal numbers (a vector). In this new format, words that mean similar things will have very similar lists of numbers!

## 🛠️ How we do it
> [!tip] Methodology
> We use a lookup table called an Embedding Layer. Think of it like a giant spreadsheet. Every row in the spreadsheet corresponds to a specific word ID. The columns in the spreadsheet contain the decimal numbers that represent the word's "meaning".

## 📥 Input
> [!quote] Input Format
> - **Description:** A grid of simple integer IDs, shaped as `(Batch Size, Sequence Length)`. We will use the first two words from our master sentence ("The quick").
>
> - **Example:** 
> ```python
> input_ids = tensor([[464, 2068]]) # "The quick"
> ```

## 📤 Output
> [!success] Resulting State
> - **Description:** A 3D block of decimal numbers, shaped as `(Batch Size, Sequence Length, Embedding Size)`. Every single ID has been swapped out for its personal row of decimal numbers.
>
> - **Example:** 
> ```python
> # 464 ("The") turned into [0.12, -0.45, 0.88]
> # 2068 (" quick") turned into [-0.01, 0.99, -0.22]
> tensor([[[ 0.12, -0.45,  0.88],   
>          [-0.01,  0.99, -0.22]]]) 
> ```
> 
> **The Spreadsheet Lookup:**
> 
> | Token ID | Meaning Val 1 | Meaning Val 2 | Meaning Val 3 |
> | :---: | :---: | :---: | :---: |
> | `464` (The) | 0.12 | -0.45 | 0.88 |
> | `2068` (quick) | -0.01 | 0.99 | -0.22 |

## ⚙️ Working
> [!example] Under the Hood
> 1. The computer takes the first ID (e.g., 464).
> 2. It goes to row 464 in the Embedding Spreadsheet.
> 3. It copies the entire row of decimals and replaces the ID with them.
> 
> ```mermaid
> graph TD
>     A[Simple ID Grid] -->|Go to Spreadsheet| B{Embedding Layer}
>     B -->|Swap ID for row of decimals| C[3D Block of Meanings]
> ```

---
*Navigation:*
⬅️ **Previous Step:** [[Chapter 2 Data Sampling]] | ➡️ **Next Step:** [[Chapter 4 Encoding Positional Embeddings]]