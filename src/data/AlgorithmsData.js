export const ALGORITHM_DETAILS = {
  "Linear Search": {
    category: "Search Algorithms",
    bestComplexity: "O(1)",
    avgComplexity: "O(N)",
    worstComplexity: "O(N)",
    spaceComplexity: "O(1)",
    description:
      "Linear search is the simplest search algorithm. It scans elements of a sequence sequentially, one by one, checking whether the target element matches the current element. This is useful for unsorted arrays or when data is simple and unsorted, though highly inefficient for larger arrays.",
    lang: "python",
    code: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Target index found
    return -1  # Target not found`,
    applications: [
      "Searching in unsorted collections.",
      "Small datasets where overhead of sorting exceeds search time.",
      "Input validation and checking presence in basic arrays.",
    ],
  },
  "Binary Search": {
    category: "Search Algorithms",
    bestComplexity: "O(1)",
    avgComplexity: "O(log N)",
    worstComplexity: "O(log N)",
    spaceComplexity: "O(1)",
    description:
      "Binary search is an efficient search algorithm that works on pre-sorted arrays. It repeatedly splits the search interval in half. If the target value is less than the middle element, it narrows the interval to the lower half; otherwise, it limits it to the upper half, repeating the split until the value is found or the interval is empty.",
    lang: "python",
    code: `def binary_search(arr, target):
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid  # Element found
        elif arr[mid] < target:
            left = mid + 1  # Discard left half
        else:
            right = mid - 1  # Discard right half
            
    return -1  # Element not found`,
    applications: [
      "Locating elements inside databases and index tables.",
      "Locating compiler dictionary tokens during tokenization.",
      "Finding numerical roots via numerical analysis approximation.",
    ],
    bestAnalysis:
      "Best search algorithm for static sorted arrays. By dividing the search interval in half with each iteration, Binary Search reduces the search space exponentially, yielding O(log N) average and worst-case time complexity. It outperforms linear scans dramatically for large datasets while maintaining O(1) auxiliary space.",
  },
  BFS: {
    category: "Graph / Tree Traversal",
    bestComplexity: "O(V + E)",
    avgComplexity: "O(V + E)",
    worstComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    description:
      "Breadth-First Search (BFS) is a graph traversal algorithm that explores nodes level-by-level, visiting all neighbor nodes at the current depth before moving deeper. It employs a FIFO Queue to orchestrate vertex traversal. BFS is guaranteed to discover the shortest path in unweighted graphs.",
    lang: "python",
    code: `from collections import deque

def breadth_first_search(graph, start_node):
    visited = set()
    queue = deque([start_node])
    visited.add(start_node)
    
    while queue:
        current = queue.popleft()  # Dequeue
        print("Visited node:", current)
        
        for neighbor in graph.get(current, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)  # Enqueue`,
    applications: [
      "Finding shortest path in unweighted networks.",
      "Social network analysis (finding friends within degrees of connection).",
      "Web crawlers indexing local links level by level.",
    ],
  },
  DFS: {
    category: "Graph / Tree Traversal",
    bestComplexity: "O(V + E)",
    avgComplexity: "O(V + E)",
    worstComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    description:
      "Depth-First Search (DFS) is a graph traversal algorithm that explores as deep as possible along each branch before backtracking. It relies on a LIFO Stack (or call stack recursion) to navigate vertices. DFS is essential for topological sorting, detecting cycles, and solving maze puzzles.",
    lang: "python",
    code: `def depth_first_search(graph, node, visited=None):
    if visited is None:
        visited = set()
        
    if node in visited:
        return
        
    visited.add(node)
    print("Visited node:", node)
    
    for neighbor in graph.get(node, []):
        if neighbor not in visited:
            depth_first_search(graph, neighbor, visited)`,
    applications: [
      "Topological sorting in compiler dependencies.",
      "Detecting cycles in directed/undirected graphs.",
      "Solving mazes, puzzles, and back-tracking constraint problems.",
    ],
  },
  "Merge Sort": {
    category: "Sorting Algorithms",
    bestComplexity: "O(N log N)",
    avgComplexity: "O(N log N)",
    worstComplexity: "O(N log N)",
    spaceComplexity: "O(N)",
    description:
      "Merge Sort is a stable, divide-and-conquer sorting algorithm. It recursively splits the input array into two halves, sorts each half individually, and merges the sorted sub-arrays. It ensures consistent O(N log N) speeds, though it requires auxiliary memory to merge elements.",
    lang: "python",
    code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
        
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
            
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
    applications: [
      "Sorting linked lists without access penalty.",
      "External sorting where dataset exceeds system memory capabilities.",
      "E-commerce sorting systems requiring stable matching order.",
    ],
    bestAnalysis:
      "Best sorting algorithm when stability (preserving order of duplicate values) is required and worst-case O(N log N) performance is a strict requirement. Unlike Quick Sort, which can degrade to O(N^2) for pre-sorted or adversarial inputs, Merge Sort guarantees consistent O(N log N) speed at the expense of O(N) temporary space.",
  },
  "Quick Sort": {
    category: "Sorting Algorithms",
    bestComplexity: "O(N log N)",
    avgComplexity: "O(N log N)",
    worstComplexity: "O(N^2)",
    spaceComplexity: "O(log N)",
    description:
      "Quick Sort is a divide-and-conquer sorting algorithm. It selects a 'pivot' element and partitions the array such that elements smaller than the pivot go to the left, and larger ones go to the right, before recursively sorting the sub-arrays. Highly efficient in-place sorting utility.",
    lang: "python",
    code: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)`,
    applications: [
      "In-place sorting library functions (e.g. C standard library qsort).",
      "Embedded microchips with highly restrictive RAM specifications.",
      "Real-time rendering systems where sorting speed is critical.",
    ],
  },
  Dijkstra: {
    category: "Pathfinding Algorithms",
    bestComplexity: "O((V + E) log V)",
    avgComplexity: "O((V + E) log V)",
    worstComplexity: "O(V^2)",
    spaceComplexity: "O(V)",
    description:
      "Dijkstra's algorithm finds the shortest paths from a single source node to all other nodes in a weighted graph with non-negative edge weights. It acts as a greedy algorithm, maintaining a priority queue of candidate vertices and relaxing paths continuously.",
    lang: "python",
    code: `import heapq

def dijkstra(graph, start):
    # graph is {node: {neighbor: weight}}
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]  # (distance, node)
    
    while pq:
        current_distance, current_node = heapq.heappop(pq)
        
        if current_distance > distances[current_node]:
            continue
            
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
                
    return distances`,
    applications: [
      "GPS network routing interfaces (maps directions).",
      "Network packet routing protocols (OSPF).",
      "Sewerage or power grid path flow optimization.",
    ],
  },
  "A*": {
    category: "Pathfinding Algorithms",
    bestComplexity: "O(E)",
    avgComplexity: "O(b^d)",
    worstComplexity: "O(V)",
    spaceComplexity: "O(V)",
    description:
      "A* (A-Star) is a heuristic-guided pathfinding algorithm. It extends Dijkstra's by calculating f(n) = g(n) + h(n), where g(n) is the exact cost to reach node n, and h(n) is a heuristic estimating the distance from n to the goal. Best-first search that minimizes explored graph nodes.",
    lang: "python",
    code: `import heapq

def a_star_search(graph, start, goal, heuristic):
    # heuristic is dict: {node: estimated_cost_to_goal}
    pq = [(0, start)]  # (f_score, node)
    g_score = {node: float('inf') for node in graph}
    g_score[start] = 0
    
    while pq:
        _, current = heapq.heappop(pq)
        
        if current == goal:
            return g_score[goal]
            
        for neighbor, weight in graph[current].items():
            tentative_g = g_score[current] + weight
            if tentative_g < g_score[neighbor]:
                g_score[neighbor] = tentative_g
                f_score = tentative_g + heuristic.get(neighbor, 0)
                heapq.heappush(pq, (f_score, neighbor))
                
    return None`,
    applications: [
      "Game development AI movement patterns (pathfinding around obstacles).",
      "Robotics navigational map solvers.",
      "Route planning in real-world spatial geometries.",
    ],
    bestAnalysis:
      "Best single-source point-to-point pathfinding algorithm. By combining Dijkstra's exact edge-weight cost with a heuristic estimate of the remaining distance to the goal (f = g + h), it avoids exploring paths in incorrect directions. This slashes the search grid area, making it faster than Dijkstra in game AI and map navigation.",
  },
  KMP: {
    category: "String Algorithms",
    bestComplexity: "O(N + M)",
    avgComplexity: "O(N + M)",
    worstComplexity: "O(N + M)",
    spaceComplexity: "O(M)",
    description:
      "Knuth-Morris-Pratt (KMP) is a linear-time pattern matching algorithm. It preprocesses the search pattern to construct a Longest Prefix Suffix (LPS) table. The LPS table allows the search to bypass redundant character comparisons when a mismatch occurs, preventing backtracking on the main text.",
    lang: "python",
    code: `def kmp_search(text, pattern):
    lps = compute_lps(pattern)
    i = j = 0
    
    while i < len(text):
        if pattern[j] == text[i]:
            i += 1
            j += 1
        if j == len(pattern):
            return i - j  # Pattern match index
        elif i < len(text) and pattern[j] != text[i]:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1
    return -1

def compute_lps(pattern):
    lps = [0] * len(pattern)
    length = 0
    i = 1
    while i < len(pattern):
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1
    return lps`,
    applications: [
      "Text editors locating keyword occurrences.",
      "DNA sequence scanning and bio-informatics pattern matching.",
      "Log scanners monitoring regex occurrences in streams.",
    ],
  },
  Trie: {
    category: "String Algorithms",
    bestComplexity: "O(L) - Key Length",
    avgComplexity: "O(L)",
    worstComplexity: "O(L)",
    spaceComplexity: "O(ALPHABET_SIZE * N * L)",
    description:
      "A Trie (Prefix Tree) is an ordered tree data structure used to store strings. Each node represents a single character, and shared prefixes share the same node paths. This allows constant time retrieval proportional to key length, regardless of dictionary size.",
    lang: "python",
    code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
        
    def insert(self, word):
        curr = self.root
        for char in word:
            if char not in curr.children:
                curr.children[char] = TrieNode()
            curr = curr.children[char]
        curr.is_end_of_word = True
        
    def search(self, word):
        curr = self.root
        for char in word:
            if char not in curr.children:
                return False
            curr = curr.children[char]
        return curr.is_end_of_word`,
    applications: [
      "Autocomplete widgets on search bars.",
      "IP routing lookup tables.",
      "Spell checkers and dictionary validation tools.",
    ],
  },
  "Dynamic Programming": {
    category: "Optimization",
    bestComplexity: "O(Decision States)",
    avgComplexity: "O(Decision States)",
    worstComplexity: "O(Decision States)",
    spaceComplexity: "O(States)",
    description:
      "Dynamic Programming (DP) is a method for solving complex problems by breaking them down into simpler, overlapping subproblems. It solves subproblems once and stores their solutions using Memoization (Top-down) or Tabulation (Bottom-up), trading memory to optimize computational speed.",
    lang: "python",
    code: `# DP: Fibonacci with Memoization (Top-Down)
def fib_memo(n, memo=None):
    if memo is None:
        memo = {}
    if n <= 1:
        return n
    if n in memo:
        return memo[n]
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]

# Tabulation approach (Bottom-Up)
def fib_tab(n):
    if n <= 1:
        return n
    table = [0] * (n + 1)
    table[1] = 1
    for i in range(2, n + 1):
        table[i] = table[i - 1] + table[i - 2]
    return table[n]`,
    applications: [
      "Knapsack resource allocation optimizations.",
      "String edit distance (Levenshtein distance) in spellchecking.",
      "Pathfinding inside grids with variable terrains (Viterbi algorithm).",
    ],
  },
  "Linear Regression": {
    category: "Machine Learning (Supervised)",
    bestComplexity: "O(P^2 * N)",
    avgComplexity: "O(P^2 * N)",
    worstComplexity: "O(P^2 * N)",
    spaceComplexity: "O(P)",
    description:
      "Linear Regression is a supervised learning algorithm that models the relationship between a dependent variable ($Y$) and independent variables ($X$) by fitting a linear equation to observed data. It optimizes the slope coefficients by minimizing the Mean Squared Error (MSE) using Ordinary Least Squares (OLS) or Gradient Descent.",
    lang: "python",
    code: `import numpy as np

class LinearRegressionGD:
    def __init__(self, lr=0.01, epochs=1000):
        self.lr = lr
        self.epochs = epochs
        self.weights = None
        self.bias = None
        
    def fit(self, X, y):
        n_samples, n_features = X.shape
        self.weights = np.zeros(n_features)
        self.bias = 0
        
        for _ in range(self.epochs):
            y_pred = np.dot(X, self.weights) + self.bias
            # Compute gradients
            dw = (1 / n_samples) * np.dot(X.T, (y_pred - y))
            db = (1 / n_samples) * np.sum(y_pred - y)
            
            # Update weights
            self.weights -= self.lr * dw
            self.bias -= self.lr * db
            
    def predict(self, X):
        return np.dot(X, self.weights) + self.bias`,
    applications: [
      "Economic forecasting (predicting house prices or retail sales volumes).",
      "Trend lines analysis for scientific models.",
      "Risk assessment tools in financial banking software.",
    ],
  },
  "K-Means": {
    category: "Machine Learning (Unsupervised)",
    bestComplexity: "O(I * K * N * D)",
    avgComplexity: "O(I * K * N * D)",
    worstComplexity: "O(I * K * N * D)",
    spaceComplexity: "O(K * D + N)",
    description:
      "K-Means is a centroid-based clustering algorithm. It partitions $N$ observations into $K$ distinct clusters where each data point belongs to the cluster with the nearest mean (centroid). It repeats two steps: assigning points to the closest centroid, and recalculating centroids based on the average of all cluster members.",
    lang: "python",
    code: `import numpy as np

def kmeans(X, k, max_iters=100):
    # Initialize random centroids
    centroids = X[np.random.choice(X.shape[0], k, replace=False)]
    
    for _ in range(max_iters):
        # 1. Assign clusters based on Euclidean Distance
        distances = np.linalg.norm(X[:, np.newaxis] - centroids, axis=2)
        cluster_labels = np.argmin(distances, axis=1)
        
        # 2. Recalculate centroids
        new_centroids = np.array([X[cluster_labels == i].mean(axis=0) for i in range(k)])
        
        if np.allclose(centroids, new_centroids):
            break # Convergence reached
        centroids = new_centroids
        
    return centroids, cluster_labels`,
    applications: [
      "Customer profiling and market segmentation clusters.",
      "Image quantization and color compression pipelines.",
      "Anomaly detection by identifying points far from cluster centroids.",
    ],
  },
  "Naive Bayes": {
    category: "Machine Learning (Probabilistic)",
    bestComplexity: "O(N * D)",
    avgComplexity: "O(N * D)",
    worstComplexity: "O(N * D)",
    spaceComplexity: "O(C * D)",
    description:
      "Naive Bayes is a probabilistic classifier based on Bayes' Theorem. It makes the 'naive' assumption that features are conditionally independent of each other given the class label, which simplifies joint probability calculation and enables fast training speeds on large datasets.",
    lang: "python",
    code: `# Conceptual Naive Bayes Classifier equation
# P(y | X) = [ P(X | y) * P(y) ] / P(X)
# Under independent feature assumption:
# P(y | x1, ..., xn) proportional to P(y) * Prod( P(xi | y) )

def calculate_naive_bayes_posterior(class_prior, feature_likelihoods, input_features):
    score = math.log(class_prior)
    for idx, feature_val in enumerate(input_features):
        # Add logs of conditional likelihoods to prevent underflow
        score += math.log(feature_likelihoods[idx].get(feature_val, 1e-6))
    return score`,
    applications: [
      "Email spam filtering (e.g. classifying text as spam or ham).",
      "Sentiment analysis in social feeds.",
      "Real-time multi-class classification tasks.",
    ],
  },
  BM25: {
    category: "Information Retrieval",
    bestComplexity: "O(Q)",
    avgComplexity: "O(Q)",
    worstComplexity: "O(Q)",
    spaceComplexity: "O(V)",
    description:
      "BM25 (Best Matching 25) is a ranking function used by search engines to estimate the relevance of documents to a search query. It enhances basic TF-IDF by incorporating document length normalization ($b$) and term frequency saturation ($k_1$), preventing document lengths from biasing similarity scores.",
    lang: "python",
    code: `import math

def bm25_term_weight(tf, doc_len, avg_doc_len, idf, k1=1.5, b=0.75):
    # Calculates BM25 score for a single term in a document
    numerator = tf * (k1 + 1)
    denominator = tf + k1 * (1.0 - b + b * (doc_len / avg_doc_len))
    return idf * (numerator / denominator)`,
    applications: [
      "Elasticsearch keyword matching engine default configuration.",
      "Keyword-based index ranking in document management systems.",
      "First-stage retrieval in multi-tier search engine architectures.",
    ],
  },
  "Vector Search": {
    category: "Information Retrieval",
    bestComplexity: "O(log N) - HNSW index",
    avgComplexity: "O(log N)",
    worstComplexity: "O(N) - Flat scan",
    spaceComplexity: "O(N * D)",
    description:
      "Vector search finds semantically similar text by comparing query embeddings with document embeddings in high-dimensional vector space. It uses metrics like Cosine Similarity or Inner Product, allowing search engines to match queries based on semantic meaning rather than exact keywords.",
    lang: "python",
    code: `import numpy as np

def cosine_similarity(v1, v2):
    dot_product = np.dot(v1, v2)
    norm_v1 = np.linalg.norm(v1)
    norm_v2 = np.linalg.norm(v2)
    return dot_product / (norm_v1 * norm_v2)

# Flat search scanning candidate pool
def flat_vector_search(query_vec, candidate_matrix, top_k=5):
    # candidate_matrix is of shape (N, D)
    similarities = np.dot(candidate_matrix, query_vec) / (
        np.linalg.norm(candidate_matrix, axis=1) * np.linalg.norm(query_vec)
    )
    return np.argsort(similarities)[-top_k:][::-1]`,
    applications: [
      "Retrieval-Augmented Generation (RAG) contexts locator.",
      "Recommendation systems (recommending similar products or tracks).",
      "Image similarity and reverse visual matching engines.",
    ],
  },
  HNSW: {
    category: "Information Retrieval",
    bestComplexity: "O(log N)",
    avgComplexity: "O(log N)",
    worstComplexity: "O(N)",
    spaceComplexity: "O(N * D + M * N)",
    description:
      "Hierarchical Navigable Small World (HNSW) is a graph-based data structure for Approximate Nearest Neighbor (ANN) search. It builds a multi-layered hierarchy of proximity graphs. The top layer has long-range links for fast global routing, while the bottom layer has short-range links for local accuracy.",
    lang: "python",
    code: `# Conceptual traversal of HNSW layers
def search_hnsw(query, index, k):
    enter_point = index.enter_node
    # Traverse from top layer down to bottom layer
    for layer in reversed(range(index.num_layers)):
        enter_point = search_layer(query, enter_point, ef=1, layer=layer)
        
    # Get top-k nearest neighbors on bottom layer
    nearest_neighbors = search_layer(query, enter_point, ef=index.ef_search, layer=0)
    return nearest_neighbors[:k]`,
    applications: [
      "High-performance vector databases (Milvus, Pinecone, Qdrant).",
      "Million-scale semantic search systems requiring sub-50ms latencies.",
      "Large-scale recommendation system index engines.",
    ],
  },
  Attention: {
    category: "Deep Learning",
    bestComplexity: "O(N^2 * D)",
    avgComplexity: "O(N^2 * D)",
    worstComplexity: "O(N^2 * D)",
    spaceComplexity: "O(N^2)",
    description:
      "Scaled Dot-Product Attention calculates relevance scores between sequence elements. It takes Query (Q), Key (K), and Value (V) matrices, computes dot products of Q and K, scales them by the square root of query dimension, applies Softmax to yield attention weights, and multiplies the weights with V.",
    lang: "python",
    code: `import torch
import torch.nn as nn
import math

def attention(Q, K, V, mask=None):
    # Q, K, V shape: [batch, heads, seq_len, dim]
    d_k = Q.size(-1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)
    
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)
        
    attn_weights = torch.softmax(scores, dim=-1)
    output = torch.matmul(attn_weights, V)
    return output, attn_weights`,
    applications: [
      "Transformer-based language translation pipelines.",
      "Cross-attention in text-to-image diffusion models.",
      "Vision Transformers encoding dependencies across image patches.",
    ],
  },
  Transformers: {
    category: "Deep Learning",
    bestComplexity: "O(N^2 * D)",
    avgComplexity: "O(N^2 * D)",
    worstComplexity: "O(N^2 * D)",
    spaceComplexity: "O(N^2)",
    description:
      "Transformers are sequence models introduced in 'Attention Is All You Need'. They discard recurrence and convolutions entirely, relying on Multi-Head Self-Attention layers and Position-wise Feed-Forward Networks. They process sequences in parallel, enabling rapid training on massive web datasets.",
    lang: "python",
    code: `import torch.nn as nn

class TransformerEncoderBlock(nn.Module):
    def __init__(self, dim, heads, mlp_dim, dropout=0.1):
        super().__init__()
        self.attn = nn.MultiheadAttention(embed_dim=dim, num_heads=heads)
        self.norm1 = nn.LayerNorm(dim)
        self.norm2 = nn.LayerNorm(dim)
        
        self.mlp = nn.Sequential(
            nn.Linear(dim, mlp_dim),
            nn.ReLU(),
            nn.Linear(mlp_dim, dim)
        )
        self.dropout = nn.Dropout(dropout)
        
    def forward(self, x):
        # 1. Self Attention with Skip Connection
        attn_out, _ = self.attn(x, x, x)
        x = self.norm1(x + self.dropout(attn_out))
        # 2. Feed-Forward with Skip Connection
        mlp_out = self.mlp(x)
        x = self.norm2(x + self.dropout(mlp_out))
        return x`,
    applications: [
      "Large Language Models (Llama, GPT, Gemini).",
      "Vision Transformers (ViT) for object classification.",
      "Protein folding predictions (AlphaFold).",
    ],
  },
  GPT: {
    category: "Deep Learning",
    bestComplexity: "O(N^2 * D)",
    avgComplexity: "O(N^2 * D)",
    worstComplexity: "O(N^2 * D)",
    spaceComplexity: "O(N^2)",
    description:
      "Generative Pre-trained Transformer (GPT) is a decoder-only Transformer model. It is pre-trained on text corpora to predict the next token given preceding context. It uses causal attention masks to ensure tokens only attend to previous positions during training, enabling rapid auto-regressive generation.",
    lang: "python",
    code: `# Conceptual block of Causal/Masked Self-Attention in GPT
# The causal mask is a lower-triangular matrix of ones
def causal_attention_mask(seq_len):
    # Returns a mask matrix where upper-triangular index weights are -inf
    mask = torch.triu(torch.full((seq_len, seq_len), float('-inf')), diagonal=1)
    return mask`,
    applications: [
      "Generative chat bots and code completion services (Copilot).",
      "Synthetic dataset generation workflows.",
      "Text summarization, translation, and general instruction following.",
    ],
  },
  "Boyer-Moore": {
    category: "Pattern Matching",
    bestComplexity: "O(N / M)",
    avgComplexity: "O(N / M)",
    worstComplexity: "O(N * M)",
    spaceComplexity: "O(Σ)",
    description:
      "Boyer-Moore is a highly efficient string matching algorithm that serves as the standard for practical text searches. It skips comparisons by processing the pattern from right to left, utilizing the Bad Character Heuristic and Good Suffix Heuristic to shift the pattern across the text by large intervals upon character mismatches.",
    lang: "python",
    code: `def boyer_moore_search(text, pattern):
    m = len(pattern)
    n = len(text)
    if m == 0: return 0
    
    # Preprocess Bad Character Table
    bad_char = {}
    for i in range(m):
        bad_char[pattern[i]] = i
        
    s = 0  # s is shift of the pattern with respect to text
    while s <= n - m:
        j = m - 1
        
        # Keep reducing j while characters match
        while j >= 0 and pattern[j] == text[s + j]:
            j -= 1
            
        if j < 0:
            return s  # Match found at shift s
        else:
            # Shift pattern using Bad Character Heuristic
            bad_char_val = bad_char.get(text[s + j], -1)
            s += max(1, j - bad_char_val)
            
    return -1`,
    applications: [
      "GNU grep utility implementation (searches text files at raw hardware speed).",
      "Integrated search engine queries inside text editors (VS Code / Sublime).",
      "Network intrusion detection systems searching signature packets.",
    ],
    bestAnalysis:
      "Best exact string matching algorithm. By scanning the search pattern from right-to-left, Boyer-Moore shifts past entire text segments when a mismatch occurs. This enables a sublinear average complexity of O(N/M) in practice, far outperforming naive search and KMP for larger alphabets.",
  },
  "Hybrid Search": {
    category: "Information Retrieval",
    bestComplexity: "O(log N + Q)",
    avgComplexity: "O(log N + Q)",
    worstComplexity: "O(N)",
    spaceComplexity: "O(N * D)",
    description:
      "Hybrid Search combines sparse lexical retrieval (BM25) and dense semantic retrieval (Vector Search) to provide optimal query relevance. It executes both keyword matching and vector similarity lookups in parallel, and merges the resulting rank lists using Reciprocal Rank Fusion (RRF) to leverage the strengths of both retrieval styles.",
    lang: "python",
    code: `def reciprocal_rank_fusion(bm25_ranks, vector_ranks, k=60):
    # bm25_ranks and vector_ranks are lists of document_ids
    rrf_scores = {}
    
    # 1. Score BM25 rankings
    for rank, doc_id in enumerate(bm25_ranks):
        rrf_scores[doc_id] = rrf_scores.get(doc_id, 0.0) + 1.0 / (k + rank + 1)
        
    # 2. Score Vector Search rankings
    for rank, doc_id in enumerate(vector_ranks):
        rrf_scores[doc_id] = rrf_scores.get(doc_id, 0.0) + 1.0 / (k + rank + 1)
        
    # 3. Sort by highest RRF score
    sorted_docs = sorted(rrf_scores.items(), key=lambda item: item[1], reverse=True)
    return [doc_id for doc_id, score in sorted_docs]`,
    applications: [
      "High-accuracy AI Search platforms (Perplexity, Cohere Rerank, Elasticsearch).",
      "Enterprise Retrieval-Augmented Generation (RAG) to fetch context.",
      "E-commerce product search engines matching both tags and semantic intent.",
    ],
    bestAnalysis:
      "Best information retrieval approach. Instead of choosing between exact keyword matching (BM25) and conceptual semantic meaning (Dense Vector Embeddings), Hybrid Search runs both in parallel and fuses their scores using Reciprocal Rank Fusion (RRF). This avoids vocabulary mismatch issues while preserving structural keyword filtering.",
  },
};

export const COMPARISONS_DATA = [
  {
    categoryKey: "Pathfinding Algorithms",
    title: "Pathfinding Algorithms",
    subtitle: "Dijkstra vs. A* vs. Bellman-Ford vs. Floyd-Warshall",
    description:
      "Evaluating single-source vs. all-pairs shortest path algorithms and their capabilities to handle variable graphs and weights.",
    headers: [
      "Property / Feature",
      "Dijkstra",
      "A* Search ⭐ Best",
      "Bellman-Ford",
      "Floyd-Warshall",
    ],
    rows: [
      { name: "Single-Source Paths?", vals: [true, true, true, false] },
      { name: "All-Pairs Paths?", vals: [false, false, false, true] },
      { name: "Supports Weighted Graphs?", vals: [true, true, true, true] },
      { name: "Supports Negative Weights?", vals: [false, false, true, true] },
      { name: "Detects Negative Cycles?", vals: [false, false, true, false] },
      {
        name: "Heuristic / AOT Estimate Guided?",
        vals: [false, true, false, false],
      },
      {
        name: "Worst-Case Time Complexity",
        vals: ["O((V + E) log V)", "O(b^d)", "O(V * E)", "O(V^3)"],
      },
      { name: "Space Complexity", vals: ["O(V)", "O(V)", "O(V)", "O(V^2)"] },
    ],
  },
  {
    categoryKey: "Search Algorithms",
    title: "Search Algorithms",
    subtitle: "Linear vs. Binary vs. BFS vs. DFS",
    description:
      "Comparing basic sequence scanning, divide-and-conquer lookup, and topological graph traversal traversers.",
    headers: [
      "Property / Feature",
      "Linear Search",
      "Binary Search ⭐ Best",
      "BFS",
      "DFS",
    ],
    rows: [
      { name: "Requires Sorted Input?", vals: [false, true, false, false] },
      { name: "Graph / Tree Traversal?", vals: [false, false, true, true] },
      {
        name: "Guarantees Shortest Path (Unweighted)?",
        vals: [false, false, true, false],
      },
      { name: "FIFO Queue Orchestrated?", vals: [false, false, true, false] },
      {
        name: "LIFO Stack / Recursion Orchestrated?",
        vals: [false, false, false, true],
      },
      {
        name: "Worst-Case Time Complexity",
        vals: ["O(N)", "O(log N)", "O(V + E)", "O(V + E)"],
      },
      {
        name: "Worst-Case Space Complexity",
        vals: ["O(1)", "O(1)", "O(V)", "O(V)"],
      },
    ],
  },
  {
    categoryKey: "Sorting Algorithms",
    title: "Sorting Algorithms",
    subtitle: "Quick Sort vs. Merge Sort vs. Heap Sort vs. Bubble Sort",
    description:
      "Analyzing stability, auxiliary memory, and complexity tradeoffs across sorting paradigms.",
    headers: [
      "Property / Feature",
      "Quick Sort",
      "Merge Sort ⭐ Best",
      "Heap Sort",
      "Bubble Sort",
    ],
    rows: [
      { name: "Stable Sort?", vals: [false, true, false, true] },
      { name: "In-Place Sorting?", vals: [true, false, true, true] },
      {
        name: "Best-Case Time Complexity",
        vals: ["O(N log N)", "O(N log N)", "O(N log N)", "O(N)"],
      },
      {
        name: "Worst-Case Time Complexity",
        vals: ["O(N^2)", "O(N log N)", "O(N log N)", "O(N^2)"],
      },
      {
        name: "Average-Case Time Complexity",
        vals: ["O(N log N)", "O(N log N)", "O(N log N)", "O(N^2)"],
      },
      {
        name: "Auxiliary Space Complexity",
        vals: ["O(log N)", "O(N)", "O(1)", "O(1)"],
      },
    ],
  },
  {
    categoryKey: "String Matching",
    title: "String Matching",
    subtitle: "Naive vs. KMP vs. Rabin-Karp vs. Boyer-Moore",
    description:
      "Contrasting exact match strategies, prefix lookup functions, and rolling hash optimization metrics.",
    headers: [
      "Property / Feature",
      "Naive Search",
      "KMP",
      "Rabin-Karp",
      "Boyer-Moore ⭐ Best",
    ],
    rows: [
      { name: "Preprocessing Phase?", vals: [false, true, true, true] },
      { name: "Uses Rolling Hashing?", vals: [false, false, true, false] },
      { name: "Skips Redundant Comparisons?", vals: [false, true, true, true] },
      {
        name: "Average Time Complexity",
        vals: ["O(N * M)", "O(N + M)", "O(N + M)", "O(N / M)"],
      },
      {
        name: "Worst Time Complexity",
        vals: ["O(N * M)", "O(N + M)", "O(N * M)", "O(N * M)"],
      },
      {
        name: "Auxiliary Space Complexity",
        vals: ["O(1)", "O(M)", "O(1)", "O(Σ)"],
      },
    ],
  },
  {
    categoryKey: "Information Retrieval (IR)",
    title: "Information Retrieval (IR)",
    subtitle: "TF-IDF vs. BM25 vs. Dense Vector vs. Hybrid (RRF)",
    description:
      "Contrasting lexical queries, term frequencies, and semantic vector embeddings clusters.",
    headers: [
      "Paradigm / Property",
      "TF-IDF",
      "BM25",
      "Dense Vectors",
      "Hybrid (RRF) ⭐ Best",
    ],
    rows: [
      { name: "Captures Semantic Meanings?", vals: [false, false, true, true] },
      { name: "Exact Keyword Matches?", vals: [true, true, false, true] },
      {
        name: "Frequency Saturation Bounds?",
        vals: [false, true, false, true],
      },
      {
        name: "Document Length Normalization?",
        vals: [false, true, false, true],
      },
      { name: "Requires Vector Database?", vals: [false, false, true, true] },
      {
        name: "Query Processing Speed",
        vals: [
          "Fast (Lexical)",
          "Fast (Lexical)",
          "Moderate (ANN)",
          "Moderate-Fast",
        ],
      },
    ],
  },
];

export const getComparisonData = (category, algoName) => {
  const catLower = (category || "").toLowerCase();
  const algoLower = (algoName || "").toLowerCase();

  if (catLower.includes("pathfinding")) {
    return COMPARISONS_DATA.find(
      (c) => c.categoryKey === "Pathfinding Algorithms",
    );
  }
  if (
    catLower.includes("search") ||
    catLower.includes("traversal") ||
    algoLower === "bfs" ||
    algoLower === "dfs"
  ) {
    return COMPARISONS_DATA.find((c) => c.categoryKey === "Search Algorithms");
  }
  if (catLower.includes("sort")) {
    return COMPARISONS_DATA.find((c) => c.categoryKey === "Sorting Algorithms");
  }
  if (
    catLower.includes("string") ||
    catLower.includes("pattern") ||
    algoLower === "kmp" ||
    algoLower === "boyer-moore" ||
    algoLower === "trie"
  ) {
    return COMPARISONS_DATA.find((c) => c.categoryKey === "String Matching");
  }
  if (
    catLower.includes("retrieval") ||
    catLower.includes("vector") ||
    catLower.includes("hnsw") ||
    algoLower === "bm25" ||
    algoLower === "hybrid search"
  ) {
    return COMPARISONS_DATA.find(
      (c) => c.categoryKey === "Information Retrieval (IR)",
    );
  }

  return COMPARISONS_DATA.find(
    (c) => c.categoryKey === "Information Retrieval (IR)",
  );
};
