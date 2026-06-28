import { useState, useEffect, useRef } from "react";
import {
  ExternalLink,
  BookOpen,
  Code,
  Layers,
  Terminal,
  Brain,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  Monitor,
  Smartphone,
  Server,
  Database,
} from "lucide-react";
import { AlgorithmDetailPane } from "./AlgorithmDetailPane";
import { llmChaptersData } from "../data/LlmChaptersData";

const ARTICLES_DATA = [
  {
    id: "flutter-performance",
    title:
      "Building Cross-Platform Mobile Apps with Flutter: Performance and State Management",
    authors: "Harsh Sharma",
    published: "2026",
    date: "June 10, 2026",
    readTime: "8 min read",
    category: "Mobile Dev",
    summary:
      "An in-depth look at Flutter's rendering pipeline, Skia vs. Impeller engines, and choosing the right state management approach for scaling apps.",
    tags: ["flutter", "mobile", "performance", "state-management", "impeller"],
    sections: [
      {
        id: "tldr",
        title: "TL;DR",
        content:
          "Flutter compiles to native ARM code and uses its own rendering canvas. To get 120 FPS, you need to understand how widget, element, and render object trees work, how the new Impeller engine reduces shader compilation jank, and when to use state managers like Riverpod or Bloc.",
      },
      {
        id: "rendering-pipeline",
        title: "The Rendering Pipeline",
        content:
          "Unlike web wrappers that rely on WebView, Flutter controls every pixel on the screen by rendering widgets directly to a flat canvas. It manages this lifecycle through three parallel trees:\n1. Widget Tree: Lightweight blueprints specifying configuration.\n2. Element Tree: The logical backbone connecting widgets to concrete structures; it manages lifecycle states and avoids reconstructing objects when updates are minor.\n3. RenderObject Tree: The actual layout, constraint solver, and paint engine. Understanding this hierarchy allows developers to prevent unnecessary global rebuilds by encapsulating state into isolated subtrees and leveraging const constructors.",
      },
      {
        id: "skia-vs-impeller",
        title: "Skia vs. Impeller Engine",
        content:
          "For years, Flutter relied on Skia as its underlying rendering backend. While highly performant, Skia compiles graphical shaders dynamically at runtime, causing a brief pause (shader compilation jank) the first time an animation is triggered. Flutter's new Impeller engine solves this. Impeller compiles shaders during build time, compiling pipeline states ahead of time. This yields solid 60/120 FPS transitions from the first frame, particularly noticeable in complex page transitions and clipping clips.",
      },
      {
        id: "state-management",
        title: "State Management Paradigms",
        content:
          "State management selection is crucial as mobile applications scale. Basic applications benefit from Provider, which handles simple prop-drilling scenarios. Riverpod expands this by providing compile-safe, global dependency injection that runs independently of the BuildContext tree. For enterprise architectures with strict requirements, the BLoC (Business Logic Component) pattern enforces an event-driven flow, converting user event inputs into well-defined state streams, simplifying unit testing.",
      },
    ],
    keyTakeaways: [
      "Flutter bypasses native platform widgets, rendering directly onto a raw canvas utilizing Impeller or Skia.",
      "Impeller eliminates shader compilation jank by precompiling visual pipelines at build time rather than runtime.",
      "Riverpod provides dependency injection outside the widget context, while BLoC provides a strict event-driven state stream structure.",
    ],
    relatedReading: [
      { id: "lite-ai-models", title: "Lite AI Models on Mobile Devices" },
      {
        id: "local-model-phone-steps",
        title: "Running Local Models on Mobile Apps",
      },
    ],
  },
  {
    id: "intro-ai-ml",
    title: "Foundations of Modern Artificial Intelligence and Machine Learning",
    authors: "Harsh Sharma",
    published: "2026",
    date: "June 8, 2026",
    readTime: "7 min read",
    category: "AI/ML Basics",
    summary:
      "Demystifying AI/ML: From historical heuristics to supervised, unsupervised, and reinforcement learning paradigms, and the neural network boom.",
    tags: ["ai-basics", "machine-learning", "neural-networks", "deep-learning"],
    sections: [
      {
        id: "tldr",
        title: "TL;DR",
        content:
          "Artificial Intelligence mimics cognitive functions. Machine Learning shifts from programming rules to letting algorithms discover patterns from raw data. Stacking multiple layers of computational nodes (Deep Learning) allows networks to learn high-level representations, fueling visual and textual models.",
      },
      {
        id: "historical-heuristics",
        title: "The Paradigm Shift: From Rules to Data",
        content:
          "Early AI was dominated by expert systems: complex, hand-coded logic and nested IF-ELSE decisions. These systems worked for predictable tasks like chess but collapsed when faced with noisy real-world data like handwritten digits. Machine Learning inverted this paradigm. Instead of inputting rules to get answers, engineers feed data and labels into an algorithm, which solves numerical optimization equations to produce the mapping rules autonomously.",
      },
      {
        id: "three-paradigms",
        title: "Supervised, Unsupervised, and Reinforcement Learning",
        content:
          "Machine learning algorithms fall into three primary categories:\n1. Supervised Learning: Models are trained on historical datasets containing inputs and target answers (labels). It solves prediction tasks like house valuations (regression) or email categorization (classification).\n2. Unsupervised Learning: Algorithmic structures inspect raw data without labels to find hidden groupings or structures, such as segmenting customers based on purchase behavior.\n3. Reinforcement Learning: Agents learn to navigate environment states through trial-and-error, receiving numerical feedback (rewards or penalties) to maximize long-term performance.",
      },
      {
        id: "neural-networks",
        title: "The Deep Learning Explosion",
        content:
          "Deep Learning uses artificial neural networks—computational layers modeled loosely after the biological brain. Each layer processes inputs, passes them through mathematical activation functions, and feeds the outputs to subsequent layers. By combining backpropagation with gradient descent, multi-layered networks learn to extract abstract representations of raw data (e.g. pixels to edges to shapes to objects) without manual feature engineering.",
      },
    ],
    keyTakeaways: [
      "Machine learning reverses the classical programming paradigm by deriving logical mapping rules directly from input data.",
      "The three core learning pillars are supervised (labeled data), unsupervised (pattern discovery), and reinforcement (reward feedback).",
      "Deep Learning uses nested activation nodes to automatically discover hierarchical representations of data.",
    ],
    relatedReading: [
      {
        id: "regression-vs-classification",
        title: "Regression vs. Classification Deep Dive",
      },
      { id: "overfitting-underfitting", title: "Overfitting vs. Underfitting" },
    ],
  },
  {
    id: "regression-vs-classification",
    title:
      "Regression vs. Classification: Understanding the Core Machine Learning Tasks",
    authors: "Harsh Sharma",
    published: "2026",
    date: "June 7, 2026",
    readTime: "7 min read",
    category: "Supervised Learning",
    summary:
      "Analyzing the mathematical and conceptual differences between predicting continuous values (regression) and categorizing discrete groups (classification).",
    tags: [
      "supervised-learning",
      "regression",
      "classification",
      "logistic-regression",
      "linear-regression",
    ],
    sections: [
      {
        id: "tldr",
        title: "TL;DR",
        content:
          "Supervised learning is split based on output type. Regression fits continuous numeric ranges (e.g. salary, price). Classification separates input features into distinct categories (e.g. fraud or valid). They employ different loss calculations and performance metrics.",
      },
      {
        id: "regression",
        title: "Regression: Predicting Continuous Scales",
        content:
          "Regression models predict numerical variables. Linear Regression fits a straight line (`y = wx + b`) that minimizes Mean Squared Error (MSE) across data points. Regularized variations (Ridge, Lasso) penalize model coefficients to reduce noise. Performance is validated by checking how close predictions are to actual figures, using Root Mean Squared Error (RMSE) and Mean Absolute Error (MAE).",
      },
      {
        id: "classification",
        title: "Classification: Defining Discrete Categories",
        content:
          "Classification models map feature vectors to discrete target classes. In binary classification, the output is restricted to two options (spam vs. ham). In multi-class problems, the model chooses among several labels. Algorithms like Logistic Regression pass linear combinations through a Sigmoid activation to output a probability (0 to 1), which is then mapped to a class. Evaluated using Precision, Recall, F1-Score, and ROC-AUC metrics.",
      },
      {
        id: "conceptual-comparison",
        title: "Conceptual Differences and Interconnection",
        content:
          "The fundamental distinction lies in the target variable: continuous vs. categorical. However, their mechanics are connected. For instance, logistic regression computes a continuous probability (regression-like task) before thresholding the output (classification task). Choosing the proper objective function (Mean Squared Error for regression vs. Cross-Entropy Loss for classification) dictates how the model learns during gradient updates.",
      },
    ],
    keyTakeaways: [
      "Regression outputs continuous numerical values; classification outputs discrete, categorical labels.",
      "Evaluation metrics differ: RMSE and MAE assess regression; Precision, Recall, and F1-score assess classification.",
      "Logistic regression outputs a continuous probability score which is converted into a class category via decision boundaries.",
    ],
    relatedReading: [
      { id: "intro-ai-ml", title: "Foundations of AI/ML" },
      { id: "overfitting-underfitting", title: "Overfitting vs. Underfitting" },
    ],
  },
  {
    id: "overfitting-underfitting",
    title:
      "Overfitting vs. Underfitting: Navigating the Bias-Variance Tradeoff",
    authors: "Harsh Sharma",
    published: "2026",
    date: "June 6, 2026",
    readTime: "8 min read",
    category: "Model Training",
    summary:
      "Understanding generalization error, identifying overfitting/underfitting in loss curves, and practical regularization techniques.",
    tags: [
      "training",
      "overfitting",
      "underfitting",
      "regularization",
      "bias-variance",
    ],
    sections: [
      {
        id: "tldr",
        title: "TL;DR",
        content:
          "Generalization is the goal of ML. Underfitting happens when a model is too simple to capture patterns (high bias). Overfitting happens when a model memorizes training noise (high variance). Balancing this requires monitoring training vs. validation loss curves and applying regularization.",
      },
      {
        id: "bias-variance-tradeoff",
        title: "The Bias-Variance Tradeoff",
        content:
          "Generalization error decomposes into two factors:\n1. Bias: Errors arising from simplistic assumptions. High bias restricts the model from learning training patterns, causing underfitting.\n2. Variance: Errors arising from high sensitivity to minor fluctuations in training data. High variance makes the model fit noise, causing overfitting.\nAs model complexity increases, bias drops but variance climbs, making model optimization a delicate balancing act.",
      },
      {
        id: "diagnostic-curves",
        title: "Diagnosing Loss Curves",
        content:
          "Plotting training and validation loss over epochs is the best way to detect training issues:\n- Underfitting: Both training and validation losses remain high and flat, indicating the model failed to learn the training dataset.\n- Overfitting: Training loss continues to drop, but validation loss flattens and begins to climb, showing that the model is memorizing training points and failing to generalize.",
      },
      {
        id: "mitigation-strategies",
        title: "Mitigation Strategies",
        content:
          "To correct underfitting: increase model capacity (add layers/parameters), engineer richer input features, or reduce regularization constraints. To correct overfitting: collect more training samples, apply data augmentation, use L1/L2 regularization (penalizing large weights), implement dropout layers in neural networks, use early stopping, or apply cross-validation.",
      },
    ],
    keyTakeaways: [
      "Underfitting is caused by excessive bias (simplistic models); overfitting is caused by excessive variance (sensitive models).",
      "Overfitting is diagnosed when training loss drops while validation loss begins to rise.",
      "Address overfitting through regularization (L1/L2), dropout, early stopping, cross-validation, and data augmentation.",
    ],
    relatedReading: [
      { id: "intro-ai-ml", title: "Foundations of AI/ML" },
      {
        id: "regression-vs-classification",
        title: "Regression vs. Classification",
      },
    ],
  },
  {
    id: "java-ai-renaissance",
    title: "Java's Modern Renaissance in Artificial Intelligence Development",
    authors: "Harsh Sharma",
    published: "2026",
    date: "June 5, 2026",
    readTime: "8 min read",
    category: "Backend Dev",
    summary:
      "Exploring Java's high-performance evolution for AI workloads using Project Panama, the Vector API, and enterprise frameworks.",
    tags: [
      "java",
      "ai-engineering",
      "project-panama",
      "spring-ai",
      "enterprise-ai",
    ],
    sections: [
      {
        id: "tldr",
        title: "TL;DR",
        content:
          "While Python dominates AI research, Java is becoming a major player for production AI execution. Modern Java features like Project Panama and the Vector API allow direct native code execution and hardware-level SIMD operations, while frameworks like Spring AI and Deep Java Library (DJL) simplify integration.",
      },
      {
        id: "project-panama",
        title: "Project Panama: Blazing Fast Native Interoperability",
        content:
          "Historically, Java interacted with native C/C++ libraries via JNI (Java Native Interface), which was slow and complex. Project Panama introduces foreign memory and function access APIs. This allows Java applications to call optimized C/C++ libraries (like llama.cpp, ONNX Runtime) directly with near-zero overhead, bypassing traditional JNI serialization bottlenecks.",
      },
      {
        id: "vector-api",
        title: "The Vector API: Hardware-Level SIMD",
        content:
          "Deep learning models are built on matrix math. Java's upcoming Vector API allows developers to write vector computations that the JVM compiles directly into hardware SIMD (Single Instruction Multiple Data) instructions, such as AVX-512. This enables high-performance local tensor operations directly in Java bytecode.",
      },
      {
        id: "enterprise-frameworks",
        title: "Enterprise Frameworks: Spring AI and DJL",
        content:
          "Spring AI brings the standard Spring development experience to AI, integrating model clients and vector search directly into enterprise backends. Amazon's Deep Java Library (DJL) provides high-level APIs to run PyTorch, TensorFlow, and ONNX models locally inside Java servers, offering native multi-threading advantages.",
      },
    ],
    keyTakeaways: [
      "Project Panama provides low-overhead, native memory access to call C++ libraries (like llama.cpp) from Java.",
      "The Vector API allows the JVM to execute hardware-accelerated SIMD instructions directly for tensor algebra.",
      "Spring AI and DJL bridge enterprise Java architectures with modern LLM inference and vector index pipelines.",
    ],
    relatedReading: [
      { id: "lite-ai-models", title: "Lite AI Models on Mobile Devices" },
      {
        id: "local-model-phone-steps",
        title: "Running Local Models on Mobile Apps",
      },
    ],
  },
  {
    id: "lite-ai-models",
    title: "Lite AI Models: Running Deep Learning Locally on Mobile Devices",
    authors: "Harsh Sharma",
    published: "2026",
    date: "June 4, 2026",
    readTime: "8 min read",
    category: "Mobile AI",
    summary:
      "How mobile architectures employ quantized, compressed models like TFLite and ONNX to process vision and audio inputs offline.",
    tags: ["mobile-ai", "tflite", "onnx", "quantization", "edge-devices"],
    sections: [
      {
        id: "tldr",
        title: "TL;DR",
        content:
          "Standard deep learning models require heavy server GPUs. Mobile apps use 'Lite' AI models—highly compressed, quantized networks—to run local, offline inferences (face detection, text-to-speech) on consumer mobile processors, protecting privacy and bypassing internet requirements.",
      },
      {
        id: "model-quantization",
        title: "Model Quantization and Compression",
        content:
          "To run models on device, their memory footprint must be reduced. Model Quantization converts weights from 32-bit floating point numbers (float32) to 8-bit integers (int8). This shrinks the model file size by 75% and speeds up math operations on mobile CPUs, with negligible loss in accuracy.",
      },
      {
        id: "inference-runtimes",
        title: "Mobile Inference Frameworks: TFLite and ONNX",
        content:
          "Google's TensorFlow Lite (TFLite) and the Open Neural Network Exchange (ONNX) Runtime Mobile are the primary runtimes. They compile models into flat buffers, bypassing complex network code to run swift local predictions on Android and iOS devices.",
      },
      {
        id: "hardware-acceleration",
        title: "Hardware Acceleration: GPU and NPU delegates",
        content:
          "Modern mobile SOCs contain NPUs (Neural Processing Units) and mobile GPUs. Runtime frameworks use hardware delegates (like Android NNAPI or iOS CoreML) to offload matrix multiplication from the CPU to these dedicated chips, resulting in lightning-fast, energy-efficient predictions.",
      },
    ],
    keyTakeaways: [
      "Lite models use 8-bit integer quantization to decrease model footprint and memory requirements by 75%.",
      "TFLite and ONNX runtimes execute compressed models offline, eliminating server API calls and protecting privacy.",
      "Mobile delegates route execution to phone NPUs and GPUs for high-efficiency, sub-10ms neural inferences.",
    ],
    relatedReading: [
      { id: "local-model-phone-steps", title: "Local AI on Mobile Apps" },
      { id: "flutter-performance", title: "Flutter Performance & State" },
    ],
  },
  {
    id: "local-model-phone-steps",
    title:
      "A Practical Guide to Running Local LLMs and Embeddings in Mobile Apps",
    authors: "Harsh Sharma",
    published: "2026",
    date: "June 3, 2026",
    readTime: "9 min read",
    category: "Edge AI",
    summary:
      "Step-by-step pipeline to integrate local LLMs (like Gemma 2B) inside Flutter or Native apps using llama.cpp and cross-compiled libraries.",
    tags: ["local-llm", "mobile-ai", "llama-cpp", "flutter-rust-bridge"],
    sections: [
      {
        id: "tldr",
        title: "TL;DR",
        content:
          "Deploying generative LLMs on mobile is now feasible. This guide lists the exact steps to load, quantize, and run a 2-billion parameter LLM (like Google's Gemma 2B) locally inside an Android or iOS application using llama.cpp and native bridges.",
      },
      {
        id: "model-quantization-steps",
        title: "Step 1: Selecting and Quantizing the Model",
        content:
          "Choose a small-footprint model like Gemma 2B or LLaMA 3.2 1B. Use the llama.cpp conversion scripts to compile the Hugging Face weights into a GGUF file format. Apply 4-bit quantization (Q4_K_M) to compress the model to ~1.3 GB, fitting within standard mobile RAM limits.",
      },
      {
        id: "cross-compiling-backends",
        title: "Step 2: Cross-Compiling llama.cpp",
        content:
          "To run C++ code on mobile, compile llama.cpp for mobile architectures (arm64-v8a for Android, arm64 for iOS). Build static libraries (`.a` or `.so`) using Android NDK and iOS Xcode toolchains, ensuring compilation flags enable SIMD neon vector optimizations.",
      },
      {
        id: "ffi-bridges",
        title: "Step 3: Creating the Dart/Swift Bridge",
        content:
          "For Flutter apps, use Dart FFI (Foreign Function Interface) or a packages wrapper (like `flutter_rust_bridge` or custom bindings) to call the C++ library functions. Pass the user prompt vector to the model memory and stream back tokens token-by-token in real-time.",
      },
      {
        id: "memory-management",
        title: "Step 4: Managing Mobile Memory Constraints",
        content:
          "Mobile operating systems aggressively kill background apps using excessive RAM. Load the model into memory only when needed, and release it immediately after. Ensure model loading runs on a background isolate/thread to keep the UI thread rendering at 60 FPS.",
      },
    ],
    keyTakeaways: [
      "Convert weights to GGUF format and apply 4-bit quantization to fit LLMs under the 1.5GB RAM ceiling.",
      "Cross-compile optimized C++ backends (like llama.cpp) for ARM architectures to leverage hardware neon instructions.",
      "Execute LLM token generation in background isolates using FFI to keep the main interface rendering smoothly.",
    ],
    relatedReading: [
      { id: "lite-ai-models", title: "Lite AI Models on Mobile Devices" },
      { id: "flutter-performance", title: "Flutter Performance & State" },
    ],
  },
  {
    id: "rag-architectures",
    title:
      "Retrieval-Augmented Generation (RAG): Architecting Knowledge-Aware Systems",
    authors: "Harsh Sharma",
    published: "2026",
    date: "June 2, 2026",
    readTime: "9 min read",
    category: "RAG Systems",
    summary:
      "Beyond static LLMs: Designing search databases, chunking strategies, embedding generation, semantic retrieval, and contextual prompts.",
    tags: ["rag", "embeddings", "vector-search", "llms", "context-window"],
    sections: [
      {
        id: "tldr",
        title: "TL;DR",
        content:
          "Generative AI models are limited by their training cutoff. Retrieval-Augmented Generation (RAG) connects an LLM to an external vector database. When a user asks a question, the system retrieves relevant documents and feeds them to the LLM as context, providing accurate answers.",
      },
      {
        id: "preprocessing-chunking",
        title: "Document Preprocessing and Chunking Strategies",
        content:
          "Raw text files must be broken into pieces (chunks) before indexing. Standard strategies include fixed-size sliding windows or semantic chunking (splitting at paragraph boundaries). Adding overlap (e.g., 500-token chunks with 50-token overlap) ensures context isn't lost at the borders.",
      },
      {
        id: "embedding-indexing-rag",
        title: "Vector Embeddings and Indexes",
        content:
          "Chunks are passed through an embedding model (like BGE or Cohere) to create high-dimensional vectors. These vectors are stored in a database (like Qdrant or Pinecone). We build a search index using HNSW to allow immediate similarity searches of the database.",
      },
      {
        id: "retrieval-loop",
        title: "The Retrieval and Generation Loop",
        content:
          "When a user inputs a query, it is converted to a vector. The system queries the vector database to retrieve the top-k most similar text chunks. These chunks are pasted into a prompt template along with the user's question. The LLM reads the context and generates an answer.",
      },
    ],
    keyTakeaways: [
      "RAG solves LLM hallucination and training cutoff limits by importing relevant documents dynamically.",
      "Apply semantic chunking with sliding overlaps to preserve context boundaries inside vector databases.",
      "Query vectors fetch context chunks, which are injected into LLM system prompts for grounded generation.",
    ],
    relatedReading: [
      {
        id: "vector-embeddings-deep-dive",
        title: "High-Dimensional Vector Embeddings",
      },
      {
        id: "bm25-vs-embeddings-hybrid",
        title: "BM25 vs. Embedding-Based Search",
      },
    ],
  },
  {
    id: "vector-embeddings-deep-dive",
    title: "High-Dimensional Representation: The Power of Vector Embeddings",
    authors: "Harsh Sharma",
    published: "2026",
    date: "June 1, 2026",
    readTime: "8 min read",
    category: "Vector Mathematics",
    summary:
      "A deep dive into how models map semantic coordinates, high-dimensional space dynamics, and similarity metrics.",
    tags: [
      "embeddings",
      "linear-algebra",
      "vector-databases",
      "hnsw",
      "similarity-metrics",
    ],
    sections: [
      {
        id: "tldr",
        title: "TL;DR",
        content:
          "Vector embeddings translate human text into arrays of numbers that capture semantic meaning. Words or sentences with similar concepts sit close together in a high-dimensional vector space. Understanding distance metrics and indexing is the key to semantic search.",
      },
      {
        id: "semantic-coordinates",
        title: "Mapping Semantics to Coordinates",
        content:
          "Deep learning encoders map text into a vector of dimensions (typically 384, 768, or 1536). The dimensions represent abstract semantic concepts learned during training. In this space, the vector for 'king' minus 'man' plus 'woman' sits remarkably close to the vector for 'queen'.",
      },
      {
        id: "similarity-metrics",
        title: "Distance Metrics: Cosine vs. L2 vs. Dot Product",
        content:
          "To find similar documents, we calculate distance between vectors. Cosine similarity measures the angle between vectors, ignoring magnitude. Dot product calculates projection (fastest for normalized vectors). L2 distance (Euclidean) measures straight-line distance, useful for non-normalized data.",
      },
      {
        id: "indexing-scaling",
        title: "Scaling Searches: Vector Indexes (HNSW)",
        content:
          "Computing distance against millions of vectors in real-time is too slow. Vector databases use Approximate Nearest Neighbor (ANN) search. The HNSW (Hierarchical Navigable Small World) index builds a multi-layered graph of vectors, allowing searches to hop across clusters in log-time.",
      },
    ],
    keyTakeaways: [
      "Vector embeddings represent text as float arrays, placing semantically similar content near each other.",
      "Cosine similarity is the standard metric for text search, measuring the angle difference between vectors.",
      "Use HNSW graph structures in production database indexing to perform fast searches across millions of vectors.",
    ],
    relatedReading: [
      { id: "rag-architectures", title: "RAG Architectures" },
      {
        id: "bm25-vs-embeddings-hybrid",
        title: "BM25 vs. Embedding-Based Search",
      },
    ],
  },
  {
    id: "bm25-vs-embeddings-hybrid",
    title: "BM25 vs. Embedding-Based Search: The Case for Hybrid Retrieval",
    authors: "Harsh Sharma",
    published: "2026",
    date: "May 28, 2026",
    readTime: "9 min read",
    category: "Retrieval Systems",
    summary:
      "Why lexical search (BM25) and dense embeddings are not competitors, but complementary systems that combine via Reciprocal Rank Fusion.",
    tags: ["lexical-search", "semantic-search", "hybrid-search", "rrf", "bm25"],
    sections: [
      {
        id: "tldr",
        title: "TL;DR",
        content:
          "Lexical search (BM25) matches exact keywords but misses context. Semantic search (embeddings) finds conceptual matches but struggles with exact terms like model IDs. Hybrid search combines both techniques using Reciprocal Rank Fusion (RRF) to deliver the ultimate retrieval pipeline.",
      },
      {
        id: "bm25-precision",
        title: "BM25: The Keyword Precision Benchmark",
        content:
          "BM25 scores documents based on exact keyword overlaps. It is incredibly robust, fast, and does not require neural inference. It excels at finding specific technical serial codes, names, or rare words. However, it fails when queries use synonyms (e.g., 'car' vs 'automobile').",
      },
      {
        id: "dense-search",
        title: "Dense Embeddings: Catching the Vibe",
        content:
          "Dense retrieval encodes the entire meaning of a query. It excels at conceptual matching, answering questions, and cross-lingual search. However, it requires a running model, can be slow, and can fetch irrelevant documents if they share a general 'vibe' but miss key words.",
      },
      {
        id: "rrf-hybrid",
        title: "Hybrid Integration and Reciprocal Rank Fusion",
        content:
          "Instead of choosing one, hybrid search runs both BM25 and vector searches in parallel. The results are combined using Reciprocal Rank Fusion (RRF). RRF scores documents based on their position in both result lists. This ensures documents that are both contextually similar and keyword-precise rise to the top.",
      },
    ],
    keyTakeaways: [
      "BM25 matches exact terms and names; vector search matches abstract semantic concepts and synonyms.",
      "Dense embeddings struggle with rare technical words, while lexical search fails to understand semantic context.",
      "Combine BM25 and Vector retrieval using Reciprocal Rank Fusion (RRF) for the most accurate hybrid search results.",
    ],
    relatedReading: [
      { id: "rag-architectures", title: "RAG Architectures" },
      {
        id: "vector-embeddings-deep-dive",
        title: "High-Dimensional Vector Embeddings",
      },
    ],
  },
  {
    id: "free-tier-deployment",
    title: "The Free-Tier Stack: Deploying and Building Apps at Zero Cost",
    authors: "Harsh Sharma",
    published: "2026",
    date: "May 25, 2026",
    readTime: "8 min read",
    category: "Web Operations",
    summary:
      "A curated guide to building and hosting applications using free AI tools, open-source assets, and serverless hosting platforms.",
    tags: [
      "deployment",
      "free-tier",
      "vercel",
      "netlify",
      "cloudflare-pages",
      "ai-tools",
    ],
    sections: [
      {
        id: "tldr",
        title: "TL;DR",
        content:
          "Building and launching software has never been cheaper. By combining modern AI coding assistants, free open-source design assets, GitHub repository storage, and serverless hosting (Vercel, Netlify, Cloudflare), developers can run complete applications for free.",
      },
      {
        id: "ai-coding-tools",
        title: "Free AI Coding Assistants",
        content:
          "Utilize modern AI tools (like the free tier of Cursor, Github Copilot, Gemini models, or Antigravity IDE) to rapidly scaffold templates, write boilerplate code, and resolve syntax bugs. This increases coding speeds by up to 10x for solo engineers.",
      },
      {
        id: "assets-illustrations",
        title: "Free Visual Assets & UI Components",
        content:
          "Avoid purchasing expensive stock visuals. Leverage Lucide React for clean, vector-based SVG icons. Use SVGRepo for custom illustrations, Unsplash or Pexels for high-quality royalty-free images, and LottieFiles for micro-animations to keep your apps visually premium and lightweight.",
      },
      {
        id: "serverless-hosting",
        title: "Free Serverless Hosting Platforms",
        content:
          "Deploy frontend apps without servers. Cloudflare Pages offers unlimited bandwidth for static portfolios. Vercel and Netlify provide direct GitHub integrations, triggering automatic edge-network deployments on every push. Database tiers like Supabase or Neon offer generous free PostgreSQL instances.",
      },
    ],
    keyTakeaways: [
      "Use free AI assistants to write templates, debug code, and accelerate development loops.",
      "Leverage open-source asset repositories like Lucide and SVGRepo for vector graphics and icons.",
      "Deploy apps using Vercel, Netlify, or Cloudflare Pages for free, automated edge-network hosting.",
    ],
    relatedReading: [
      { id: "flutter-performance", title: "Flutter Performance & State" },
      { id: "heavy-ai-overengineering", title: "The LLM Overkill" },
    ],
  },
  {
    id: "heavy-ai-overengineering",
    title:
      "The LLM Overkill: Why Heavy AI Layers Can Slow Down Simple Classification Pipelines",
    authors: "Harsh Sharma",
    published: "2026",
    date: "May 20, 2026",
    readTime: "8 min read",
    category: "System Architecture",
    summary:
      "Showing how replacing a simple heuristic, regex, or a lightweight classifier with a heavy LLM pipeline degrades latency and explodes cost.",
    tags: [
      "system-design",
      "latency-optimization",
      "classification",
      "over-engineering",
    ],
    sections: [
      {
        id: "tldr",
        title: "TL;DR",
        content:
          "Using large language models (LLMs) for basic tasks is an anti-pattern. If you are routing emails or classifying text labels, a simple regex or a small fine-tuned BERT classifier runs in milliseconds for fractions of a cent, whereas an LLM adds seconds of latency and massive API costs.",
      },
      {
        id: "latency-bottleneck",
        title: "The Latency and Cost Bottleneck",
        content:
          "Generative LLMs require executing billions of weights across cluster servers, which introduces token-generation latency (often 1-3 seconds). In high-throughput production pipelines (such as analyzing incoming messages in real-time), this creates a massive bottleneck. API costs also scale linearly with throughput, leading to massive and unnecessary computing bills.",
      },
      {
        id: "lightweight-alternatives",
        title: "Lightweight and Faster Alternatives",
        content:
          "Many tasks don't require semantic reasoning. String parsing, regular expressions, and heuristics execute in microseconds. If semantic grouping is required, training a classic machine learning classifier (like a Support Vector Machine or Random Forest) or a small, local BERT model runs in milliseconds for a fraction of the cost.",
      },
      {
        id: "architectural-design",
        title: "Architecting Efficient Pipelines",
        content:
          "Before deploying an LLM, analyze your task's output space. If it is small and deterministic (e.g. classification or validation), use lightweight classifiers. Reserve large, generative models (like GPT or Gemini) only for tasks requiring dynamic text generation, complex reasoning, or synthesis.",
      },
    ],
    keyTakeaways: [
      "Generative LLMs introduce seconds of network and computation latency, making them unfit for fast pipelines.",
      "Simple classification, routing, and verification tasks are best handled by regex, heuristics, or lightweight classifiers.",
      "Only deploy heavy generative models for complex, open-ended tasks like synthesis, translation, and content creation.",
    ],
    relatedReading: [
      { id: "intro-ai-ml", title: "Foundations of AI/ML" },
      {
        id: "regression-vs-classification",
        title: "Regression vs. Classification",
      },
    ],
  },
];

const ArticleReader = ({ article, onBack, onNavigateToRelated }) => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const readerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {

    const handleScroll = () => {
      if (!readerRef.current) return;
      const rect = readerRef.current.getBoundingClientRect();

      const start = rect.top + window.scrollY - 120;
      const end = rect.bottom + window.scrollY - window.innerHeight;
      const range = end - start;

      let percent;
      if (range > 0) {
        percent = Math.min(
          100,
          Math.max(0, Math.round(((window.scrollY - start) / range) * 100)),
        );
      } else {
        percent = window.scrollY > start ? 100 : 0;
      }
      setScrollPercent(percent);

      let currentActive = "";
      const allSections = [
        ...article.sections,
        { id: "key-takeaways" },
        { id: "related-reading" },
      ];

      allSections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const elRect = el.getBoundingClientRect();
          if (elRect.top < window.innerHeight * 0.4) {
            currentActive = sec.id;
          }
        }
      });
      if (currentActive) {
        setActiveSection(currentActive);
      } else if (article.sections.length > 0) {
        setActiveSection(article.sections[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    const timer = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timer);
    };
  }, [article]);

  const handleIndexClick = (id, e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const sidebarStyle = isMobile
    ? {
      position: "fixed",
      bottom: "1.5rem",
      left: "1.5rem",
      right: "1.5rem",
      zIndex: 1000,
      background: "rgba(15, 15, 15, 0.9)",
      backdropFilter: "blur(20px)",
      border: "1px solid var(--glass-border)",
      borderRadius: "16px",
      padding: "1.25rem",
      boxShadow: "0 8px 32px var(--glass-shadow)",
      maxHeight: isExpanded ? "60vh" : "auto",
      overflowY: isExpanded ? "auto" : "hidden",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    }
    : {
      position: "sticky",
      top: "8rem",
      alignSelf: "start",
      zIndex: 10,
      background: "var(--glass-bg)",
      backdropFilter: "blur(16px)",
      border: "1px solid var(--glass-border)",
      borderRadius: "16px",
      padding: "1.25rem",
      boxShadow: "0 8px 32px var(--glass-shadow)",
      width: "100%",
      maxHeight: "calc(100vh - 12rem)",
      overflowY: "auto",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    };

  const indexSections = [
    ...article.sections,
    { id: "key-takeaways", title: "Key Takeaways" },
    { id: "related-reading", title: "Related Reading" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <button
          onClick={onBack}
          style={{
            background: "transparent",
            border: "1px solid var(--glass-border)",
            padding: "0.5rem 1rem",
            borderRadius: "9999px",
            color: "var(--text-primary)",
            fontSize: "0.85rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1.5rem",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent-color)";
            e.currentTarget.style.color = "var(--accent-color)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--glass-border)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
        >
          ← Back to Articles
        </button>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <span
            className="glass-pill"
            style={{ width: "max-content", fontSize: "0.65rem" }}
          >
            {article.category}
          </span>
          <h2
            style={{
              fontSize: "2.5rem",
              margin: "0.5rem 0 0.25rem 0",
              color: "#fff",
              textAlign: "left",
            }}
          >
            {article.title}
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.95rem",
              margin: 0,
            }}
          >
            By {article.authors} •{" "}
            <span style={{ color: "var(--accent-color)", fontWeight: "600" }}>
              {article.date}
            </span>
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "70% 30%",
          gap: "2rem",
          marginTop: "1.5rem",
        }}
      >
        {/* Left Column - Article content */}
        <div
          ref={readerRef}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {article.sections.map((sec) => (
            <div
              key={sec.id}
              id={sec.id}
              style={{ marginBottom: "3.5rem", scrollMarginTop: "120px" }}
            >
              <h3
                style={{
                  fontSize: "1.6rem",
                  marginBottom: "1rem",
                  color: "#fff",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  paddingBottom: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span
                  style={{
                    width: "4px",
                    height: "1.6rem",
                    background: "var(--accent-color)",
                    borderRadius: "2px",
                  }}
                />
                {sec.title}
              </h3>
              <p
                style={{
                  fontSize: "1.02rem",
                  lineHeight: "1.75",
                  color: "var(--text-secondary)",
                  whiteSpace: "pre-line",
                  textAlign: "justify",
                }}
              >
                {sec.content}
              </p>
            </div>
          ))}

          {/* Key Takeaways Section */}
          <div
            id="key-takeaways"
            style={{ marginBottom: "3.5rem", scrollMarginTop: "120px" }}
          >
            <h3
              style={{
                fontSize: "1.6rem",
                marginBottom: "1rem",
                color: "#fff",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                paddingBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  width: "4px",
                  height: "1.6rem",
                  background: "var(--accent-color)",
                  borderRadius: "2px",
                }}
              />
              Key Takeaways
            </h3>
            <ul
              style={{
                paddingLeft: "1.25rem",
                color: "var(--text-secondary)",
                lineHeight: "1.8",
                fontSize: "1.02rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} style={{ textAlign: "justify" }}>
                  {takeaway}
                </li>
              ))}
            </ul>
          </div>

          {/* Related Reading Section */}
          <div
            id="related-reading"
            style={{ marginBottom: "3.5rem", scrollMarginTop: "120px" }}
          >
            <h3
              style={{
                fontSize: "1.6rem",
                marginBottom: "1rem",
                color: "#fff",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                paddingBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  width: "4px",
                  height: "1.6rem",
                  background: "var(--accent-color)",
                  borderRadius: "2px",
                }}
              />
              Related Reading
            </h3>
            <p
              style={{
                fontSize: "1.02rem",
                color: "var(--text-secondary)",
                lineHeight: "1.6",
                marginBottom: "1rem",
              }}
            >
              Explore other content related to this topic:
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {article.relatedReading.map((ref) => (
                <button
                  key={ref.id}
                  onClick={() => onNavigateToRelated(ref.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#06b6d4",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "0.98rem",
                    padding: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontWeight: "600",
                    width: "max-content",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#2dd4bf")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#06b6d4")
                  }
                >
                  <ChevronRight size={14} /> {ref.title}
                </button>
              ))}
            </div>
          </div>
          {/* Pagination Navigation */}
          <div style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
            {(() => {
              const articleIndex = ARTICLES_DATA.findIndex(a => a.id === article.id);
              const prevArticle = articleIndex > 0 ? ARTICLES_DATA[articleIndex - 1] : null;
              const nextArticle = articleIndex < ARTICLES_DATA.length - 1 ? ARTICLES_DATA[articleIndex + 1] : null;
              return (
                <>
                  <div style={{ width: "50%" }}>
                    {prevArticle && (
                      <button
                        onClick={() => onNavigateToRelated(prevArticle.id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          textAlign: "left",
                          cursor: "pointer",
                          padding: 0,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "0.25rem",
                          width: "100%",
                          transition: "opacity 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                      >
                        <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem", fontWeight: "500", marginLeft: "1.5rem" }}>
                          Previous
                        </span>
                        <span style={{ color: "#fff", fontSize: "1.1rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <ChevronLeft size={18} /> {prevArticle.title}
                        </span>
                      </button>
                    )}
                  </div>
                  <div style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>
                    {nextArticle && (
                      <button
                        onClick={() => onNavigateToRelated(nextArticle.id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          textAlign: "right",
                          cursor: "pointer",
                          padding: 0,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          gap: "0.25rem",
                          width: "100%",
                          transition: "opacity 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                      >
                        <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem", fontWeight: "500", marginRight: "1.5rem" }}>
                          Next
                        </span>
                        <span style={{ color: "#fff", fontSize: "1.1rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          {nextArticle.title} <ChevronRight size={18} />
                        </span>
                      </button>
                    )}
                  </div>
                </>
              );
            })()}
          </div>

        </div>

        {/* Right Column - Expandable scroll-spy widget */}
        <div style={isMobile ? {} : { position: "relative" }}>
          <div style={sidebarStyle}>
            {/* Widget Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "700",
                  letterSpacing: "0.05em",
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                ON THIS PAGE
                <span
                  style={{
                    color: "#06b6d4",
                    fontSize: "0.85rem",
                    fontWeight: "800",
                  }}
                >
                  {scrollPercent}%
                </span>
              </span>
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {isExpanded ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
            </div>

            {/* Custom Progress Bar */}
            <div
              style={{
                height: "4px",
                background: "rgba(255, 255, 255, 0.08)",
                borderRadius: "2px",
                overflow: "hidden",
                margin: "0.75rem 0 0.5rem 0",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${scrollPercent}%`,
                  background:
                    "linear-gradient(90deg, #06b6d4, var(--accent-color))",
                  transition: "width 0.1s ease",
                  borderRadius: "2px",
                }}
              />
            </div>

            {/* Section Index List */}
            {isExpanded && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                  marginTop: "1.25rem",
                  borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
                  paddingLeft: "0.25rem",
                }}
              >
                {indexSections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => handleIndexClick(sec.id, e)}
                      style={{
                        display: "block",
                        padding: "0.3rem 0 0.3rem 0.75rem",
                        fontSize: "0.88rem",
                        lineHeight: "1.4",
                        color: isActive ? "#fff" : "var(--text-secondary)",
                        fontWeight: isActive ? "700" : "400",
                        borderLeft: "2px solid",
                        borderColor: isActive ? "#06b6d4" : "transparent",
                        marginLeft: "-1px",
                        transition: "all 0.2s ease",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive)
                          e.currentTarget.style.color = "var(--text-secondary)";
                      }}
                    >
                      {sec.title}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ArticlesPage = () => {
  const getArticleIdFromHash = () => {
    const parts = window.location.hash.split("?");
    if (parts.length > 1) {
      const params = new URLSearchParams(parts[1]);
      return params.get("id");
    }
    return null;
  };

  const [selectedArticleId, setSelectedArticleId] = useState(
    getArticleIdFromHash(),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTag, setActiveTag] = useState(null);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);
  const pageSize = 6;

  useEffect(() => {
    const handleHashChange = () => {
      setSelectedArticleId(getArticleIdFromHash());
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSelectArticle = (id) => {
    if (id) {
      // eslint-disable-next-line react-hooks/immutability
      window.location.hash = `#/articles?id=${id}`;
    } else {
      // eslint-disable-next-line react-hooks/immutability
      window.location.hash = `#/articles`;
    }
  };

  const handleNavigateToRelated = (id) => {
    if (PAPERS_DATA.some((p) => p.id === id)) {
      window.location.hash = `#/papers?id=${id}`;
    } else if (ARTICLES_DATA.some((a) => a.id === id)) {
      window.location.hash = `#/articles?id=${id}`;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const selectedArticle = ARTICLES_DATA.find((a) => a.id === selectedArticleId);

  const filteredArticles = activeTag
    ? ARTICLES_DATA.filter((a) => a.tags.includes(activeTag))
    : ARTICLES_DATA;

  const totalArticles = filteredArticles.length;
  const totalPages = Math.ceil(totalArticles / pageSize);

  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const el = document.getElementById("all-articles-title");
      if (el) {
        const yOffset = -100;
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  const allTags = Array.from(new Set(ARTICLES_DATA.flatMap((a) => a.tags)));
  const visibleTags = isTagsExpanded ? allTags : allTags.slice(0, 5);

  return (
    <section
      id="articles"
      className="section container"
      style={{ paddingTop: "8rem", minHeight: "80vh" }}
    >
      {!selectedArticle ? (
        <>
          {/* Header Card Block */}
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(20, 20, 35, 0.45) 0%, rgba(10, 10, 20, 0.6) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "24px",
              padding: "2.5rem 3rem",
              marginBottom: "4rem",
              boxShadow: "0 8px 32px var(--glass-shadow)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "2rem",
              position: "relative",
              overflow: "hidden",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                flex: "1 1 60%",
                minWidth: "280px",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <h2
                style={{
                  fontSize: "2.6rem",
                  fontWeight: "800",
                  color: "#fff",
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                Technical Articles & Blog
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.98rem",
                  lineHeight: 1.5,
                  margin: 0,
                  maxWidth: "580px",
                }}
              >
                Deep dive into machine learning, computer vision, and software
                engineering. Expert insights on AI, local LLMs, quantization,
                and practical implementation details from real-world projects.
              </p>

              {/* Stat Counters Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: "1.5rem",
                  marginTop: "1.5rem",
                }}
              >
                {[
                  { value: "12", label: "Published Articles" },
                  { value: "30+", label: "Target Technologies" },
                  { value: "2026", label: "Active Writing" },
                  { value: "100% Free", label: "Resource Guides" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.15rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.75rem",
                        fontWeight: "800",
                        color: "#00f0ff",
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-secondary)",
                        fontWeight: "500",
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Illustration */}
            <div
              style={{
                flex: "0 0 auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="navbar-pill-links"
            >
              <svg
                width="200"
                height="200"
                viewBox="0 0 240 240"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ opacity: 0.85 }}
              >
                <rect
                  x="40"
                  y="20"
                  width="160"
                  height="200"
                  rx="16"
                  fill="rgba(255, 255, 255, 0.01)"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="2"
                />
                <path
                  d="M70 60 H170 M70 90 H170 M70 120 H130 M70 150 H150"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M140 120 L160 140 L195 105"
                  stroke="#00f0ff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="160" cy="140" r="3" fill="#00f0ff" />
                <line
                  x1="60"
                  y1="190"
                  x2="180"
                  y2="190"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>
          </div>

          {/* Section Divider with Line */}
          <div
            id="all-articles-title"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              marginBottom: "2.5rem",
              scrollMarginTop: "100px",
            }}
          >
            <h2
              style={{
                fontSize: "1.65rem",
                fontWeight: "800",
                color: "#fff",
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              All Articles{" "}
              {activeTag && (
                <span
                  style={{
                    color: "#06b6d4",
                    fontSize: "1.2rem",
                    fontWeight: "400",
                  }}
                >
                  ({activeTag})
                </span>
              )}
            </h2>
            <div
              style={{
                flexGrow: 1,
                height: "1px",
                background: "rgba(255, 255, 255, 0.08)",
              }}
            />
          </div>

          {/* Tags Quick Filter Bar */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "2.5rem",
            }}
          >
            <button
              onClick={() => {
                setActiveTag(null);
                setCurrentPage(1);
              }}
              style={{
                background:
                  activeTag === null ? "#06b6d4" : "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                padding: "0.4rem 0.8rem",
                fontSize: "0.82rem",
                color: activeTag === null ? "#000" : "var(--text-primary)",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              All Topics
            </button>
            {visibleTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setActiveTag(tag);
                  setCurrentPage(1);
                }}
                style={{
                  background:
                    activeTag === tag ? "#06b6d4" : "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  padding: "0.4rem 0.8rem",
                  fontSize: "0.82rem",
                  color: activeTag === tag ? "#000" : "var(--text-primary)",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {tag}
              </button>
            ))}
            {allTags.length > 5 && (
              <button
                onClick={() => setIsTagsExpanded(!isTagsExpanded)}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid var(--accent-color)",
                  borderRadius: "8px",
                  padding: "0.4rem 0.8rem",
                  fontSize: "0.82rem",
                  color: "var(--accent-color)",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--accent-color)";
                  e.currentTarget.style.color = "#000";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "var(--accent-color)";
                }}
              >
                {isTagsExpanded ? "Show less" : `+${allTags.length - 5}`}
              </button>
            )}
          </div>

          {/* Cards List Layout */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}
          >
            {paginatedArticles.map((article) => (
              <div
                key={article.id}
                className="glass-card"
                style={{
                  padding: "2.25rem 2rem",
                  display: "flex",
                  flexDirection: "column",
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: "16px",
                  position: "relative",
                  transition: "transform 0.2s, border-color 0.2s",
                }}
              >
                {/* Meta Row: Date, Duration, Icon Badge */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      color: "var(--text-secondary)",
                      fontSize: "0.8rem",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                      }}
                    >
                      <Calendar size={14} strokeWidth={2.5} /> {article.date}
                    </span>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                      }}
                    >
                      <Clock size={14} strokeWidth={2.5} /> {article.readTime}
                    </span>
                  </div>

                  {/* Article Icon Badge */}
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: "rgba(6, 182, 212, 0.08)",
                      border: "1px solid rgba(6, 182, 212, 0.15)",
                      color: "#06b6d4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BookOpen size={16} />
                  </div>
                </div>

                {/* Title */}
                <h3
                  onClick={() => handleSelectArticle(article.id)}
                  style={{
                    fontSize: "1.45rem",
                    color: "#fff",
                    fontWeight: "700",
                    marginBottom: "0.75rem",
                    lineHeight: "1.3",
                    cursor: "pointer",
                    width: "max-content",
                    maxWidth: "100%",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#06b6d4")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
                >
                  {article.title}
                </h3>

                {/* Short Summary */}
                <p
                  style={{
                    fontSize: "0.94rem",
                    lineHeight: 1.5,
                    color: "var(--text-secondary)",
                    marginBottom: "1.5rem",
                    textAlign: "justify",
                  }}
                >
                  {article.summary}
                </p>

                {/* Bottom Actions Row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                    paddingTop: "1rem",
                    marginTop: "0.5rem",
                    flexWrap: "wrap",
                    gap: "1rem",
                  }}
                >
                  {/* Tag Pills */}
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}
                  >
                    {article.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        onClick={() => {
                          setActiveTag(tag);
                          setCurrentPage(1);
                        }}
                        style={{
                          background: "rgba(6, 182, 212, 0.06)",
                          border: "1px solid rgba(45, 212, 191, 0.15)",
                          color: "#2dd4bf",
                          fontSize: "0.74rem",
                          padding: "0.15rem 0.55rem",
                          borderRadius: "9999px",
                          fontWeight: "500",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(6, 182, 212, 0.15)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "rgba(6, 182, 212, 0.06)";
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleSelectArticle(article.id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#06b6d4",
                      fontWeight: "700",
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      padding: 0,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#2dd4bf")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#06b6d4")
                    }
                  >
                    Read article{" "}
                    <ChevronRight
                      size={14}
                      style={{ transform: "translateY(0.5px)" }}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Custom styled pagination bar */}
          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "4rem",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  fontWeight: "500",
                }}
              >
                Showing {(currentPage - 1) * pageSize + 1}-
                {Math.min(totalArticles, currentPage * pageSize)} of{" "}
                {totalArticles} articles
              </span>

              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    color:
                      currentPage === 1
                        ? "rgba(255,255,255,0.2)"
                        : "var(--text-primary)",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        background:
                          currentPage === pageNum
                            ? "#2563eb"
                            : "rgba(255, 255, 255, 0.02)",
                        border:
                          currentPage === pageNum
                            ? "1px solid #3b82f6"
                            : "1px solid rgba(255, 255, 255, 0.08)",
                        color: "#fff",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s",
                      }}
                    >
                      {pageNum}
                    </button>
                  ),
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    color:
                      currentPage === totalPages
                        ? "rgba(255,255,255,0.2)"
                        : "var(--text-primary)",
                    cursor:
                      currentPage === totalPages ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <ArticleReader
          article={selectedArticle}
          onBack={() => handleSelectArticle(null)}
          onNavigateToRelated={handleNavigateToRelated}
        />
      )}
    </section>
  );
};

const PAPERS_DATA = [
  {
    id: "bm25",
    title: "BM25: The Okapi Classical Retrieval Model",
    authors: "Robertson, Spärck Jones, et al. (City University London)",
    published: "1999",
    date: "March 13, 2026",
    readTime: "12 min read",
    category: "Retrieval Systems",
    summary:
      "The classic probabilistic search algorithm that remains the industry-standard lexical baseline for ranking document relevance based on term frequency.",
    tags: [
      "information-retrieval",
      "lexical-search",
      "bm25",
      "probabilistic-models",
      "tf-idf",
    ],
    originalLink: "https://doi.org/10.1561/1500000019",
    sections: [
      {
        id: "tldr",
        title: "TL;DR",
        content:
          "Before dense embeddings, sequential search relied purely on lexical overlap. This paper presents Okapi BM25, a probabilistic retrieval framework that improves on traditional TF-IDF. BM25 scores documents based on term frequencies matching a query, factoring in term frequency saturation and document length normalization. It remains the strongest lexical baseline in modern search engines.",
      },
      {
        id: "probabilistic-framework",
        title: "Probabilistic Framework",
        content:
          "BM25 is derived from the probabilistic relevance model developed by Stephen Robertson and Karen Spärck Jones. The model ranks documents based on their estimated probability of relevance to a user query. It uses a 2-Poisson term frequency distribution model, which describes the probability that a term appears in a document given that the document is relevant or non-relevant.",
      },
      {
        id: "tf-saturation",
        title: "Term Frequency Saturation",
        content:
          "In basic TF-IDF, Term Frequency (TF) scales linearly. This causes a major problem: a document mentioning a word 100 times is ranked 100x higher than one mentioning it once, which is rarely correct. BM25 introduces term frequency saturation. By using a parameter k1 (typically between 1.2 and 2.0), the term frequency score asymptotically approaches a limit. Additional occurrences of a term provide diminishing returns, smoothing out the relevance score.",
      },
      {
        id: "length-normalization",
        title: "Document Length Normalization",
        content:
          "Longer documents naturally contain more words and are more likely to repeat terms. To prevent verbose documents from dominating search results, BM25 normalizes term frequencies by document length. By comparing the length of a candidate document against the average length across the corpus (using parameter b, typically 0.75), BM25 penalizes long, wordy documents while rewarding short, concise ones that contain the query terms.",
      },
      {
        id: "final-equation",
        title: "The Final Equation",
        content:
          "The BM25 score is computed as the sum of weighted scores for each query term. It combines the Inverse Document Frequency (IDF) of the term, the saturated term frequency, and the length normalization factor. By tuning k1 (relevance saturation) and b (length penalty), engineers can optimize lexical queries for short passages (like tweets) or long articles (like wikis).",
      },
    ],
    keyTakeaways: [
      "Okapi BM25 remains the primary lexical benchmark algorithm for modern database search indexing.",
      "Introduces non-linear term frequency scaling so repeating a word repeatedly provides diminishing relevance returns.",
      "Applies length normalization to penalize lengthy, wordy files while prioritizing concise matches.",
    ],
    relatedReading: [
      { id: "bi-encoder", title: "Bi-Encoder (DPR)" },
      { id: "cross-encoder", title: "Cross-Encoder Re-ranking" },
      { id: "rag-systems", title: "RAG Systems" },
    ],
  },
  {
    id: "hyde",
    title: "HyDE: Precise Zero-Shot Dense Retrieval",
    authors: "Gao, Dai, et al. (Boston University / Carnegie Mellon)",
    published: "2022",
    date: "March 13, 2026",
    readTime: "15 min read",
    category: "Retrieval Systems",
    summary:
      "An innovative zero-shot retrieval model that generates a hypothetical document to guide dense vector retrieval without search fine-tuning.",
    tags: ["dense-retrieval", "hyde", "zero-shot", "llms", "embeddings", "rag"],
    originalLink: "https://arxiv.org/abs/2212.10496",
    sections: [
      {
        id: "tldr",
        title: "TL;DR",
        content:
          "Dense retrievers often fail in zero-shot settings because queries and documents occupy different semantic manifolds. This paper proposes Hypothetical Document Embeddings (HyDE). HyDE uses an instruction-following model (like GPT) to generate a hypothetical answer to the query. This mock document—despite containing hallucinations—is encoded by a dense encoder to find similar real passages in the vector index, outperforming fine-tuned models.",
      },
      {
        id: "hypothetical-step",
        title: "The Hypothetical Document Step",
        content:
          "Rather than search a database using the raw user query (which is typically short and lacks context), HyDE first feeds the query into an LLM. The LLM is prompted to write a mock answer to the question. Even though this mock answer is unchecked and may contain factual errors, it possesses the structure, format, and terminology of a document in the database, matching the target document manifold.",
      },
      {
        id: "dense-alignment",
        title: "Dense Vector Alignment",
        content:
          "Once the hypothetical document is generated, it is passed through a dense passage encoder (like Contriever). Because the hypothetical answer is dense in detail, its vector representation aligns much closer to the vector space of the actual documents in the database than the original short query. This translates the search problem from query-to-document matching to document-to-document matching.",
      },
      {
        id: "resolving-hallucination",
        title: "Resolving Hallucinations",
        content:
          "A common concern is that LLM hallucinations will break the search accuracy. The authors prove that dense encoders naturally compress documents to semantic patterns, filtering out specific details. The encoder acts as a lossy compressor, focusing on the core topic. If the LLM generates a fake fact, the vector search still directs the model to real documents discussing that general topic.",
      },
      {
        id: "zero-shot-eval",
        title: "Zero-Shot Evaluations",
        content:
          "Tested across multiple search benchmarks (BEIR dataset), HyDE demonstrated remarkable zero-shot retrieval capabilities. It consistently outperformed unsupervised lexical models and matched or exceeded the performance of models trained heavily on MS-MARCO. This eliminates the need for expensive relevance-triplet annotation pipelines.",
      },
    ],
    keyTakeaways: [
      "HyDE uses an LLM to generate a hypothetical, unverified document to bridge the semantic gap between queries and documents.",
      "Transforms short query vectors into rich document embeddings, translating the search task into document-to-document matching.",
      "Provides state-of-the-art zero-shot retrieval performance without requiring task-specific labeled training datasets.",
    ],
    relatedReading: [
      { id: "bi-encoder", title: "Bi-Encoder (DPR)" },
      { id: "rag-systems", title: "RAG Systems" },
    ],
  },
  {
    id: "bi-encoder",
    title: "Bi-Encoder: Dense Passage Retrieval for Open-Domain QA",
    authors: "Karpukhin et al. (Facebook AI Research)",
    published: "2020",
    date: "March 12, 2026",
    readTime: "14 min read",
    category: "Retrieval Systems",
    summary:
      "A dual-tower transformer framework that maps queries and documents independently to dense vectors, enabling fast similarity searches.",
    tags: [
      "dense-retrieval",
      "dpr",
      "dual-tower",
      "bi-encoder",
      "embeddings",
      "vector-databases",
    ],
    originalLink: "https://arxiv.org/abs/2004.04906",
    sections: [
      {
        id: "tldr",
        title: "TL;DR",
        content:
          "Open-domain question answering typically relies on TF-IDF or BM25 retrieval. This paper introduces Dense Passage Retrieval (DPR). DPR uses a Bi-Encoder setup: two separate BERT-style transformers that map queries and documents into a shared dense vector space. Similarity is calculated via a simple dot product, enabling sub-millisecond document retrieval using vector index databases.",
      },
      {
        id: "dual-tower",
        title: "The Dual-Tower Setup",
        content:
          "The Bi-Encoder architecture consists of two separate encoders: one for the query and one for the document. During search, the document vectors can be pre-computed offline and indexed in a vector database (like FAISS). The query encoder runs online, translating the user's question into a single vector. Because the streams are decoupled, we bypass cross-token attention calculations between query and document.",
      },
      {
        id: "similarity",
        title: "Similarity Metrics",
        content:
          "The relevance score between a query and a document is computed as the simple dot product (or cosine similarity) of their respective vector outputs. Because this score is calculated strictly using vector coordinates, dense passage retrieval can leverage indexing structures like HNSW (Hierarchical Navigable Small World) trees to search billions of documents in a fraction of a millisecond.",
      },
      {
        id: "in-batch",
        title: "In-Batch Negative Training",
        content:
          "Training a Bi-Encoder requires optimizing a contrastive loss. The authors introduce in-batch negatives, an efficient training trick where documents relevant to other queries in the same batch are used as negative examples. This allows the model to compute gradients against multiple negative passages at a minimal VRAM cost, substantially improving training quality.",
      },
      {
        id: "limitations",
        title: "Trade-offs and Limitations",
        content:
          "While Bi-Encoders are incredibly fast and capture deep semantic meanings, they struggle with exact keyword matching (like serial numbers or rare names) and out-of-domain evaluation. For practical production engines, combining a Bi-Encoder with a lexical baseline (BM25) via hybrid search yields the most robust search performance.",
      },
    ],
    keyTakeaways: [
      "Bi-encoders decouple query and document processing into separate transformer pipelines, enabling offline pre-computation.",
      "Calculates relevance scores via fast vector dot products, allowing search scaling to millions of entries using vector databases.",
      "Captures semantic and contextual relations, but is often combined with lexical BM25 for keyword robustness.",
    ],
    relatedReading: [
      { id: "cross-encoder", title: "Cross-Encoder Re-ranking" },
      { id: "rag-systems", title: "RAG Systems" },
      { id: "hyde", title: "HyDE" },
    ],
  },
  {
    id: "cross-encoder",
    title: "Cross-Encoder: High-Precision Passage Re-ranking",
    authors: "Nogueira & Cho (New York University)",
    published: "2019",
    date: "March 12, 2026",
    readTime: "15 min read",
    category: "Retrieval Systems",
    summary:
      "A joint-attention ranking model that processes queries and passages together, offering high accuracy at the expense of query latency.",
    tags: [
      "cross-encoder",
      "re-ranking",
      "attention",
      "transformers",
      "precision-search",
    ],
    originalLink: "https://arxiv.org/abs/1901.04085",
    sections: [
      {
        id: "tldr",
        title: "TL;DR",
        content:
          "Retrieval engines must balance accuracy and speed. While Bi-Encoders are fast, they lack cross-attention between queries and documents. This paper proposes using a BERT model as a Cross-Encoder for passage re-ranking. By feeding the query and passage concatenated into a single input, the model applies full cross-attention across all tokens. This yields high precision but restricts usage to re-ranking a few candidates.",
      },
      {
        id: "joint-input",
        title: "Joint Input Representation",
        content:
          "Unlike the Bi-Encoder, which encodes the query and the passage separately, a Cross-Encoder concatenates them into a single token sequence: '[CLS] Query [SEP] Passage [SEP]'. This combined sequence is processed by a single transformer encoder, allowing the tokens of the query to interact with the tokens of the passage at every transformer layer.",
      },
      {
        id: "cross-attention",
        title: "Full Cross-Attention Power",
        content:
          "By applying self-attention to the joint sequence, the model performs full cross-attention. It weighs the importance of every document word in the context of the user's specific query. This allows the model to capture subtle nuances, negations, and semantic dependencies that separate Bi-Encoders miss, resulting in state-of-the-art ranking accuracy.",
      },
      {
        id: "computational-bottleneck",
        title: "The Computational Bottleneck",
        content:
          "The major drawback of the Cross-Encoder is its computational footprint. Because the query and document must be concatenated and run through the model together, document representations cannot be pre-computed offline. Searching a database would require running the heavy model for every single candidate document, which is impossible in real-time.",
      },
      {
        id: "pipeline",
        title: "Multi-Stage Retrieval Pipelines",
        content:
          "To build a high-performance search engine, developers use a multi-stage pipeline. A fast baseline (like BM25 or a Bi-Encoder) is run first to retrieve the top 100 candidate documents from a corpus of millions. Then, the computationally expensive Cross-Encoder is applied strictly to these 100 candidates to re-rank them, achieving high accuracy with acceptable latency.",
      },
    ],
    keyTakeaways: [
      "Cross-encoders process concatenated query-document sequences, allowing full token-to-token cross-attention.",
      "Achieves maximum retrieval and ranking precision, outperforming Bi-Encoder models on search benchmarks.",
      "Cannot pre-compute vectors, restricting practical deployment to a re-ranking stage on top-k candidates.",
    ],
    relatedReading: [
      { id: "bi-encoder", title: "Bi-Encoder (DPR)" },
      { id: "bm25", title: "BM25: The Okapi Classical Retrieval Model" },
    ],
  },
  {
    id: "rag-systems",
    title: "RAG: Retrieval-Augmented Generation for Knowledge NLP",
    authors: "Lewis et al. (Facebook AI Research / UCL)",
    published: "2020",
    date: "March 11, 2026",
    readTime: "16 min read",
    category: "RAG Systems",
    summary:
      "The foundational architecture combining pre-trained parametric language models with non-parametric external vector indexes to reduce hallucinations.",
    tags: [
      "rag",
      "retrieval-augmented",
      "llms",
      "parametric-memory",
      "external-knowledge",
    ],
    originalLink: "https://arxiv.org/abs/2005.11401",
    sections: [
      {
        id: "tldr",
        title: "TL;DR",
        content:
          "Pre-trained language models store knowledge in their parameters, but their memory is static, hard to update, and prone to hallucinations. This paper introduces Retrieval-Augmented Generation (RAG). RAG combines a parametric pre-trained seq2seq model with a non-parametric dense vector index of Wikipedia. This grounds generation in retrieved facts, decreasing hallucinations and enabling dynamic database updates.",
      },
      {
        id: "parametric-vs-non-parametric",
        title: "Parametric vs. Non-Parametric Memory",
        content:
          "Language models rely on parametric memory—the weights learned during training. RAG introduces non-parametric memory: an external database of documents. Instead of asking the model to memorize the world, we use a Bi-Encoder (DPR) to retrieve relevant text passages from the document database dynamically at query time, feeding the documents as context.",
      },
      {
        id: "retrieve-and-generate",
        title: "Retrieve-and-Generate Pipeline",
        content:
          "The RAG process consists of two stages. In the retrieval stage, the system uses a dense retriever to fetch the top-k document passages matching the query. In the generation stage, these retrieved passages are concatenated with the original query and passed to a sequence-to-sequence model (like BART). The generator reads the context and produces a factually correct answer.",
      },
      {
        id: "rag-formulations",
        title: "RAG-Sequence vs. RAG-Token",
        content:
          "The authors outline two RAG formulations:\n1. RAG-Sequence: The model retrieves a set of passages and uses the same passage to generate the entire output sequence.\n2. RAG-Token: The model retrieves passages for each token, allowing the generator to draw from different documents at different parts of the output sentence. RAG-Sequence generally yields more coherent outputs.",
      },
      {
        id: "hallucination-mitigate",
        title: "Hallucination Mitigation",
        content:
          "By grounding the generator in retrieved context, RAG dramatically decreases the rate of factual hallucinations in open-domain question answering. Furthermore, because the knowledge database is external to the model parameters, updates or deletions can be made instantly by swapping or modifying document vectors, without needing expensive retraining.",
      },
    ],
    keyTakeaways: [
      "RAG combines static LLM parameters with dynamic non-parametric document databases to ground outputs.",
      "Uses a dense vector passage search to retrieve facts, appending them directly to the LLM's prompt window.",
      "Reduces factual hallucinations and allows database edits and document citations without model retraining.",
    ],
    relatedReading: [
      { id: "bi-encoder", title: "Bi-Encoder (DPR)" },
      { id: "hyde", title: "HyDE" },
    ],
  },
  {
    id: "gemma-4",
    title:
      "Gemma 4: Open, Unified and Encoder-Free Multimodal Foundation Models",
    authors: "Google DeepMind (Google)",
    published: "2026",
    date: "March 11, 2026",
    readTime: "15 min read",
    category: "LLMs",
    summary:
      "Google's newly launched open-weights multimodal model featuring a unified, encoder-free architecture that processes vision, audio, and text directly in the LLM backbone.",
    tags: [
      "llms",
      "gemma-4",
      "encoder-free",
      "multimodality",
      "local-inference",
      "unified-architecture",
    ],
    originalLink:
      "https://blog.google/technology/developers/gemma-4-open-unified-encoder-free/",
    sections: [
      {
        id: "tldr",
        title: "TL;DR",
        content:
          "Google recently released Gemma 4 12B, a new open-weights multimodal model that introduces a 'unified, encoder-free' architecture. In traditional multimodal AI, separate encoders are used to translate images or audio into vectors before passing them to the language model. Gemma 4 removes these specialized encoders, feeding raw pixels and audio frequencies directly into the core transformer backbone, lowering memory usage and latency.",
      },
      {
        id: "unified-architecture",
        title: "Unified Representation Space",
        content:
          "Traditional multimodal models (like Gemini 1.0 or LLaVA) rely on separate pre-trained encoders (such as ViT for vision or Whisper for audio) connected via projection layers. Gemma 4 consolidates these into a unified representation space. Image patches and audio frames are flattened and projected directly into the model's main token embedding space. The core LLM processes text, image, and audio tokens using a single shared network.",
      },
      {
        id: "memory-and-speed",
        title: "Memory and Speed Gains",
        content:
          "Removing separate encoders reduces model parameters and eliminates the overhead of running multi-stage pipelines. By avoiding vision and audio feature extraction models, Gemma 4 cuts VRAM consumption by 30%. This architectural choice enables full multimodal local execution on consumer-grade hardware, such as a laptop with 16GB of memory.",
      },
      {
        id: "mtp-heads",
        title: "Multi-Token Prediction (MTP)",
        content:
          "To further speed up local generation, Gemma 4 is trained with Multi-Token Prediction. Instead of predicting a single next token at each step, the model contains secondary speculative decoding heads that predict multiple future tokens in parallel. This acts as a native speculative decoding engine, dramatically reducing latency during text-to-speech or chat interactions.",
      },
      {
        id: "benchmarks",
        title: "Performance Benchmarks",
        content:
          "Tested across multimodal datasets (MMMU and AudioBench), Gemma 4 12B achieves results matching or exceeding larger, multi-component models. By unifying the processing pipeline, the model gains a deeper cross-modal understanding, proving that encoder-free models are more efficient and semantically coherent.",
      },
    ],
    keyTakeaways: [
      "Gemma 4 introduces a unified, encoder-free architecture that processes vision, audio, and text in a single shared backbone.",
      "Decreases parameter footprint and memory usage, enabling multimodal inference locally on consumer laptops.",
      "Employs Multi-Token Prediction (MTP) drafting heads to accelerate generation speeds.",
    ],
    relatedReading: [
      { id: "bpe", title: "Byte Pair Encoding (BPE)" },
      { id: "rag-systems", title: "RAG Systems" },
    ],
  },
  {
    id: "bpe",
    title: "BPE: Neural Machine Translation of Rare Words with Subword Units",
    authors: "Sennrich, Haddow, & Birch (University of Edinburgh)",
    published: "2015",
    date: "March 10, 2026",
    readTime: "10 min read",
    category: "LLMs",
    summary:
      "The foundational tokenization technique that represents open vocabularies using variable-length subword units, solving out-of-vocabulary limits.",
    tags: [
      "tokenization",
      "bpe",
      "subwords",
      "vocabularies",
      "preprocessing",
      "nmt",
    ],
    originalLink: "https://arxiv.org/abs/1508.07909",
    sections: [
      {
        id: "tldr",
        title: "TL;DR",
        content:
          "Neural Machine Translation (NMT) models typically operate with a fixed vocabulary, leading to errors when encountering rare or out-of-vocabulary (OOV) words. This paper introduces Byte Pair Encoding (BPE) for subword tokenization. By representing rare words as sequences of subwords, BPE enables open-vocabulary translation, capturing morphological patterns and morphological roots efficiently.",
      },
      {
        id: "algorithm",
        title: "The BPE Algorithm",
        content:
          "Originally a data compression technique, BPE is adapted for tokenization by initializing the vocabulary with individual characters. The algorithm scans the training corpus, counts the frequency of adjacent character sequences, and iteratively merges the most frequent pair to create a new subword unit. This merge process is executed for a pre-defined number of iterations, expanding the vocabulary.",
      },
      {
        id: "balance-vocab",
        title: "Balancing Vocabulary Size",
        content:
          "Vocabulary size is a key hyperparameter. A small vocabulary size splits text into tiny pieces (characters or bigrams), increasing sequence lengths and training times. A massive vocabulary size approaches word-level representation, reducing sequence lengths but causing sparse parameter updates for rare words. Modern setups balance this tradeoff with vocab sizes between 30,000 and 100,000.",
      },
      {
        id: "morphology",
        title: "Morphological Stem Matching",
        content:
          "Because BPE is purely frequency-driven, it naturally matches grammatical stems, prefixes, and suffixes. For example, rare compound verbs are split into constituent morphemes (e.g., 'unbelievable' -> 'un', 'believ', 'able'). This structural decomposition allows transformers to generalize meanings of unseen words during inference based on known pieces.",
      },
      {
        id: "impact-nmt",
        title: "Impact on NMT and LLMs",
        content:
          "BPE resolved the vocabulary bottleneck in translation systems. It became the universal standard for word tokenization across modern generative AI models. Modern variants like SentencePiece and byte-level BPE are the core tokenizers behind models like GPT, LLaMA, and Google's Gemma models, ensuring stable text ingestion.",
      },
    ],
    keyTakeaways: [
      "BPE adapts a text compression algorithm to tokenization, splitting text into variable-length subword units.",
      "Solves the Out-Of-Vocabulary (OOV) bottleneck, enabling language models to process unseen names, terms, and compounds.",
      "Serves as the foundational preprocessing tokenizer layer for GPT, LLaMA, and Google Gemma transformers.",
    ],
    relatedReading: [{ id: "gemma-4", title: "Gemma 4 12B" }],
  },
];

const PaperReader = ({ paper, onBack, onNavigateToPaper }) => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const readerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {

    const handleScroll = () => {
      if (!readerRef.current) return;
      const rect = readerRef.current.getBoundingClientRect();

      const start = rect.top + window.scrollY - 120;
      const end = rect.bottom + window.scrollY - window.innerHeight;
      const range = end - start;

      let percent;
      if (range > 0) {
        percent = Math.min(
          100,
          Math.max(0, Math.round(((window.scrollY - start) / range) * 100)),
        );
      } else {
        percent = window.scrollY > start ? 100 : 0;
      }
      setScrollPercent(percent);

      let currentActive = "";
      const allSections = [
        ...paper.sections,
        { id: "key-takeaways" },
        { id: "related-reading" },
      ];

      allSections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const elRect = el.getBoundingClientRect();
          if (elRect.top < window.innerHeight * 0.4) {
            currentActive = sec.id;
          }
        }
      });
      if (currentActive) {
        setActiveSection(currentActive);
      } else if (paper.sections.length > 0) {
        setActiveSection(paper.sections[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    const timer = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timer);
    };
  }, [paper]);

  const handleIndexClick = (id, e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const sidebarStyle = isMobile
    ? {
      position: "fixed",
      bottom: "1.5rem",
      left: "1.5rem",
      right: "1.5rem",
      zIndex: 1000,
      background: "rgba(15, 15, 15, 0.9)",
      backdropFilter: "blur(20px)",
      border: "1px solid var(--glass-border)",
      borderRadius: "16px",
      padding: "1.25rem",
      boxShadow: "0 8px 32px var(--glass-shadow)",
      maxHeight: isExpanded ? "60vh" : "auto",
      overflowY: isExpanded ? "auto" : "hidden",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    }
    : {
      position: "sticky",
      top: "8rem",
      alignSelf: "start",
      zIndex: 10,
      background: "var(--glass-bg)",
      backdropFilter: "blur(16px)",
      border: "1px solid var(--glass-border)",
      borderRadius: "16px",
      padding: "1.25rem",
      boxShadow: "0 8px 32px var(--glass-shadow)",
      width: "100%",
      maxHeight: "calc(100vh - 12rem)",
      overflowY: "auto",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    };

  const indexSections = [
    ...paper.sections,
    { id: "key-takeaways", title: "Key Takeaways" },
    { id: "related-reading", title: "Related Reading" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <button
          onClick={onBack}
          style={{
            background: "transparent",
            border: "1px solid var(--glass-border)",
            padding: "0.5rem 1rem",
            borderRadius: "9999px",
            color: "var(--text-primary)",
            fontSize: "0.85rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1.5rem",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent-color)";
            e.currentTarget.style.color = "var(--accent-color)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--glass-border)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
        >
          ← Back to Papers
        </button>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <span
            className="glass-pill"
            style={{ width: "max-content", fontSize: "0.65rem" }}
          >
            {paper.category}
          </span>
          <h2
            style={{
              fontSize: "2.5rem",
              margin: "0.5rem 0 0.25rem 0",
              color: "#fff",
              textAlign: "left",
            }}
          >
            {paper.title}
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.95rem",
              margin: 0,
            }}
          >
            {paper.authors} •{" "}
            <span style={{ color: "var(--accent-color)", fontWeight: "600" }}>
              {paper.published}
            </span>
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "70% 30%",
          gap: "2rem",
          marginTop: "1.5rem",
        }}
      >
        {/* Left Column - Paper content */}
        <div
          ref={readerRef}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {paper.sections.map((sec) => (
            <div
              key={sec.id}
              id={sec.id}
              style={{ marginBottom: "3.5rem", scrollMarginTop: "120px" }}
            >
              <h3
                style={{
                  fontSize: "1.6rem",
                  marginBottom: "1rem",
                  color: "#fff",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  paddingBottom: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span
                  style={{
                    width: "4px",
                    height: "1.6rem",
                    background: "var(--accent-color)",
                    borderRadius: "2px",
                  }}
                />
                {sec.title}
              </h3>
              <p
                style={{
                  fontSize: "1.02rem",
                  lineHeight: "1.75",
                  color: "var(--text-secondary)",
                  whiteSpace: "pre-line",
                  textAlign: "justify",
                }}
              >
                {sec.content}
              </p>
            </div>
          ))}

          {/* Key Takeaways Section */}
          <div
            id="key-takeaways"
            style={{ marginBottom: "3.5rem", scrollMarginTop: "120px" }}
          >
            <h3
              style={{
                fontSize: "1.6rem",
                marginBottom: "1rem",
                color: "#fff",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                paddingBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  width: "4px",
                  height: "1.6rem",
                  background: "var(--accent-color)",
                  borderRadius: "2px",
                }}
              />
              Key Takeaways
            </h3>
            <ul
              style={{
                paddingLeft: "1.25rem",
                color: "var(--text-secondary)",
                lineHeight: "1.8",
                fontSize: "1.02rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {paper.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} style={{ textAlign: "justify" }}>
                  {takeaway}
                </li>
              ))}
            </ul>
          </div>

          {/* Related Reading Section */}
          <div
            id="related-reading"
            style={{ marginBottom: "3.5rem", scrollMarginTop: "120px" }}
          >
            <h3
              style={{
                fontSize: "1.6rem",
                marginBottom: "1rem",
                color: "#fff",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                paddingBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  width: "4px",
                  height: "1.6rem",
                  background: "var(--accent-color)",
                  borderRadius: "2px",
                }}
              />
              Related Reading
            </h3>
            <p
              style={{
                fontSize: "1.02rem",
                color: "var(--text-secondary)",
                lineHeight: "1.6",
                marginBottom: "1rem",
              }}
            >
              Explore other reviewed papers related to this research topic:
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {paper.relatedReading.map((ref) => (
                <button
                  key={ref.id}
                  onClick={() => onNavigateToPaper(ref.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#06b6d4",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "0.98rem",
                    padding: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontWeight: "600",
                    width: "max-content",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#2dd4bf")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#06b6d4")
                  }
                >
                  <ChevronRight size={14} /> {ref.title}
                </button>
              ))}
            </div>
          </div>
          {/* Pagination Navigation */}
          <div style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
            {(() => {
              const articleIndex = ARTICLES_DATA.findIndex(a => a.id === article.id);
              const prevArticle = articleIndex > 0 ? ARTICLES_DATA[articleIndex - 1] : null;
              const nextArticle = articleIndex < ARTICLES_DATA.length - 1 ? ARTICLES_DATA[articleIndex + 1] : null;
              return (
                <>
                  <div style={{ width: "50%" }}>
                    {prevArticle && (
                      <button
                        onClick={() => onNavigateToRelated(prevArticle.id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          textAlign: "left",
                          cursor: "pointer",
                          padding: 0,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "0.25rem",
                          width: "100%",
                          transition: "opacity 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                      >
                        <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem", fontWeight: "500", marginLeft: "1.5rem" }}>
                          Previous
                        </span>
                        <span style={{ color: "#fff", fontSize: "1.1rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <ChevronLeft size={18} /> {prevArticle.title}
                        </span>
                      </button>
                    )}
                  </div>
                  <div style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>
                    {nextArticle && (
                      <button
                        onClick={() => onNavigateToRelated(nextArticle.id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          textAlign: "right",
                          cursor: "pointer",
                          padding: 0,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          gap: "0.25rem",
                          width: "100%",
                          transition: "opacity 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                      >
                        <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem", fontWeight: "500", marginRight: "1.5rem" }}>
                          Next
                        </span>
                        <span style={{ color: "#fff", fontSize: "1.1rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          {nextArticle.title} <ChevronRight size={18} />
                        </span>
                      </button>
                    )}
                  </div>
                </>
              );
            })()}
          </div>

        </div>

        {/* Right Column - Expandable scroll-spy widget */}
        <div style={isMobile ? {} : { position: "relative" }}>
          <div style={sidebarStyle}>
            {/* Widget Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "700",
                  letterSpacing: "0.05em",
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                ON THIS PAGE
                <span
                  style={{
                    color: "#06b6d4",
                    fontSize: "0.85rem",
                    fontWeight: "800",
                  }}
                >
                  {scrollPercent}%
                </span>
              </span>
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {isExpanded ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
            </div>

            {/* Custom teal Progress Bar */}
            <div
              style={{
                height: "4px",
                background: "rgba(255, 255, 255, 0.08)",
                borderRadius: "2px",
                overflow: "hidden",
                margin: "0.75rem 0 0.5rem 0",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${scrollPercent}%`,
                  background:
                    "linear-gradient(90deg, #06b6d4, var(--accent-color))",
                  transition: "width 0.1s ease",
                  borderRadius: "2px",
                }}
              />
            </div>

            {/* Section Index List */}
            {isExpanded && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                  marginTop: "1.25rem",
                  borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
                  paddingLeft: "0.25rem",
                }}
              >
                {indexSections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => handleIndexClick(sec.id, e)}
                      style={{
                        display: "block",
                        padding: "0.3rem 0 0.3rem 0.75rem",
                        fontSize: "0.88rem",
                        lineHeight: "1.4",
                        color: isActive ? "#fff" : "var(--text-secondary)",
                        fontWeight: isActive ? "700" : "400",
                        borderLeft: "2px solid",
                        borderColor: isActive ? "#06b6d4" : "transparent",
                        marginLeft: "-1px",
                        transition: "all 0.2s ease",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive)
                          e.currentTarget.style.color = "var(--text-secondary)";
                      }}
                    >
                      {sec.title}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PapersPage = () => {
  const getPaperIdFromHash = () => {
    const parts = window.location.hash.split("?");
    if (parts.length > 1) {
      const params = new URLSearchParams(parts[1]);
      return params.get("id");
    }
    return null;
  };

  const [selectedPaperId, setSelectedPaperId] = useState(getPaperIdFromHash());
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const totalPapers = PAPERS_DATA.length;
  const totalPages = Math.ceil(totalPapers / pageSize);

  useEffect(() => {
    const handleHashChange = () => {
      setSelectedPaperId(getPaperIdFromHash());
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSelectPaper = (id) => {
    if (id) {
      // eslint-disable-next-line react-hooks/immutability
      window.location.hash = `#/papers?id=${id}`;
    } else {
      // eslint-disable-next-line react-hooks/immutability
      window.location.hash = `#/papers`;
    }
  };

  const handleNavigateToRelated = (id) => {
    if (PAPERS_DATA.some((p) => p.id === id)) {
      window.location.hash = `#/papers?id=${id}`;
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (ARTICLES_DATA.some((a) => a.id === id)) {
      window.location.hash = `#/articles?id=${id}`;
    }
  };

  const selectedPaper = PAPERS_DATA.find((p) => p.id === selectedPaperId);

  const paginatedPapers = PAPERS_DATA.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const el = document.getElementById("all-reviews-title");
      if (el) {
        // Smooth scroll to reviews title
        const yOffset = -100;
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="papers"
      className="section container"
      style={{ paddingTop: "8rem", minHeight: "80vh" }}
    >
      {!selectedPaper ? (
        <>
          {/* Header Card Block */}
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(20, 20, 35, 0.45) 0%, rgba(10, 10, 20, 0.6) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "24px",
              padding: "2.5rem 3rem",
              marginBottom: "4rem",
              boxShadow: "0 8px 32px var(--glass-shadow)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "2rem",
              position: "relative",
              overflow: "hidden",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                flex: "1 1 60%",
                minWidth: "280px",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <h2
                style={{
                  fontSize: "2.6rem",
                  fontWeight: "800",
                  color: "#fff",
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                Machine Learning Paper Reviews
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.98rem",
                  lineHeight: 1.5,
                  margin: 0,
                  maxWidth: "580px",
                }}
              >
                Expert analysis and in-depth reviews of machine learning
                research papers. Covering computer vision, deep learning, and AI
                innovations with practical insights.
              </p>

              {/* Stat Counters Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: "1.5rem",
                  marginTop: "1.5rem",
                }}
              >
                {[
                  { value: "7", label: "Paper Reviews" },
                  { value: "10+", label: "Topics Covered" },
                  { value: "2006-2025", label: "Years Span" },
                  { value: "20+", label: "Unique Authors" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.15rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.75rem",
                        fontWeight: "800",
                        color: "#00f0ff",
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-secondary)",
                        fontWeight: "500",
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Illustration */}
            <div
              style={{
                flex: "0 0 auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="navbar-pill-links"
            >
              <svg
                width="200"
                height="200"
                viewBox="0 0 240 240"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ opacity: 0.85 }}
              >
                <rect
                  x="40"
                  y="20"
                  width="160"
                  height="200"
                  rx="16"
                  fill="rgba(255, 255, 255, 0.01)"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="2"
                />
                <rect
                  x="60"
                  y="45"
                  width="80"
                  height="12"
                  rx="4"
                  fill="#00f0ff"
                  opacity="0.3"
                />
                <rect
                  x="60"
                  y="68"
                  width="120"
                  height="6"
                  rx="3"
                  fill="rgba(255, 255, 255, 0.2)"
                />
                <line
                  x1="60"
                  y1="90"
                  x2="180"
                  y2="90"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <line
                  x1="60"
                  y1="102"
                  x2="150"
                  y2="102"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M 60 170 Q 90 130 120 155 T 180 120"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="120" cy="155" r="4" fill="#00f0ff" />
                <circle cx="180" cy="120" r="4" fill="var(--accent-color)" />
                <line
                  x1="60"
                  y1="190"
                  x2="180"
                  y2="190"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="80"
                  cy="190"
                  r="3"
                  fill="rgba(255, 255, 255, 0.25)"
                />
                <circle
                  cx="140"
                  cy="190"
                  r="3"
                  fill="rgba(255, 255, 255, 0.25)"
                />
              </svg>
            </div>
          </div>

          {/* Section Divider with Line */}
          <div
            id="all-reviews-title"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              marginBottom: "2.5rem",
              scrollMarginTop: "100px",
            }}
          >
            <h2
              style={{
                fontSize: "1.65rem",
                fontWeight: "800",
                color: "#fff",
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              All Paper Reviews
            </h2>
            <div
              style={{
                flexGrow: 1,
                height: "1px",
                background: "rgba(255, 255, 255, 0.08)",
              }}
            />
          </div>

          {/* Cards Grid */}
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "2rem" }}
          >
            {paginatedPapers.map((paper) => (
              <div
                key={paper.id}
                className="glass-card"
                style={{
                  padding: "2.25rem 2rem",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: "16px",
                }}
              >
                {/* Meta Row: Date, Duration, Year Badge */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      color: "var(--text-secondary)",
                      fontSize: "0.8rem",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <Calendar size={13} strokeWidth={2.5} /> {paper.date}
                    </span>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <Clock size={13} strokeWidth={2.5} /> {paper.readTime}
                    </span>
                  </div>
                  <span
                    style={{
                      background: "rgba(6, 182, 212, 0.1)",
                      border: "1px solid rgba(6, 182, 212, 0.25)",
                      color: "#06b6d4",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "6px",
                    }}
                  >
                    {paper.published}
                  </span>
                </div>

                {/* Title */}
                <h3
                  onClick={() => handleSelectPaper(paper.id)}
                  style={{
                    fontSize: "1.35rem",
                    color: "#fff",
                    fontWeight: "700",
                    marginBottom: "1rem",
                    lineHeight: "1.3",
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#06b6d4")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
                >
                  {paper.title}
                </h3>

                {/* Tag Pills */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.4rem 0.5rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  {paper.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        background: "rgba(6, 182, 212, 0.06)",
                        border: "1px solid rgba(45, 212, 191, 0.15)",
                        color: "#2dd4bf",
                        fontSize: "0.74rem",
                        padding: "0.15rem 0.55rem",
                        borderRadius: "9999px",
                        fontWeight: "500",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Short Summary */}
                <p
                  style={{
                    fontSize: "0.92rem",
                    lineHeight: 1.5,
                    color: "var(--text-secondary)",
                    marginBottom: "1.75rem",
                    flexGrow: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {paper.summary}
                </p>

                {/* Bottom Actions Row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                    paddingTop: "1rem",
                    marginTop: "auto",
                  }}
                >
                  <button
                    onClick={() => handleSelectPaper(paper.id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#06b6d4",
                      fontWeight: "700",
                      fontSize: "0.88rem",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.2rem",
                      padding: 0,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#2dd4bf")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#06b6d4")
                    }
                  >
                    Read review{" "}
                    <ChevronRight
                      size={14}
                      style={{ transform: "translateY(0.5px)" }}
                    />
                  </button>

                  <a
                    href={paper.originalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.88rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-secondary)")
                    }
                  >
                    Original Paper <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Custom styled pagination bar */}
          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "4rem",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  fontWeight: "500",
                }}
              >
                Showing {(currentPage - 1) * pageSize + 1}-
                {Math.min(totalPapers, currentPage * pageSize)} of {totalPapers}{" "}
                papers
              </span>

              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    color:
                      currentPage === 1
                        ? "rgba(255,255,255,0.2)"
                        : "var(--text-primary)",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        background:
                          currentPage === pageNum
                            ? "#2563eb"
                            : "rgba(255, 255, 255, 0.02)",
                        border:
                          currentPage === pageNum
                            ? "1px solid #3b82f6"
                            : "1px solid rgba(255, 255, 255, 0.08)",
                        color: "#fff",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s",
                      }}
                    >
                      {pageNum}
                    </button>
                  ),
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    color:
                      currentPage === totalPages
                        ? "rgba(255,255,255,0.2)"
                        : "var(--text-primary)",
                    cursor:
                      currentPage === totalPages ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <PaperReader
          paper={selectedPaper}
          onBack={() => handleSelectPaper(null)}
          onNavigateToPaper={handleNavigateToRelated}
        />
      )}
    </section>
  );
};

const LEARN_CATEGORIES = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    badge: "AI",
    icon: <Brain size={32} />,
    conceptsCount: 42 + llmChaptersData.length,
    description: "Neural networks, computer vision, and generative models.",
    subCategories: [
      {
        id: "llm-from-scratch",
        title: "LLM From Scratch (inference - next word generation)",
        topics: llmChaptersData,
      },
      {
        id: "rag",
        title: "RAG Architecture",
        topics: [
          {
            title: "Retrieval Mechanisms",
            content: "Detailed breakdown of dense vs sparse retrieval.",
          },
        ],
      },
      {
        id: "recsys",
        title: "Recommendation Systems",
        topics: [
          {
            title: "Collaborative Filtering",
            content: "Matrix factorization techniques.",
          },
        ],
      },
    ],
  },
  {
    id: "cv",
    title: "Computer Vision",
    badge: "VISION",
    icon: <Monitor size={32} />,
    conceptsCount: 28,
    description:
      "Image processing, spatial pattern recognition, and CNN architectures.",
    subCategories: [
      {
        id: "core-cv",
        title: "Core Vision Concepts",
        topics: [
          {
            title: "Convolutional Neural Networks (CNNs)",
            summary: "Extracting spatial hierarchies of features from images.",
            content:
              "CNNs use convolution operations to filter inputs, preserving spatial relationships. Pooling layers reduce dimensionality. Modern architectures (ResNet, EfficientNet) use skip connections to train deeper networks without vanishing gradients.",
          },
        ],
      },
    ],
  },
  {
    id: "flutter",
    title: "Flutter Mobile Development",
    badge: "FLUTTER",
    icon: <Smartphone size={32} />,
    conceptsCount: 15,
    description:
      "Widget trees, state management paradigms, and cross-platform compilation.",
    subCategories: [
      {
        id: "core-flutter",
        title: "Core Framework",
        topics: [
          {
            title: "The Three Trees Architecture",
            summary:
              "How Flutter structures widget, element, and render object trees.",
            content:
              "Flutter operates three parallel hierarchies:\n1. Widget Tree: Declarative, lightweight configurations.\n2. Element Tree: Manages lifecycle.\n3. RenderObject Tree: Computes sizes and coordinates constraints.",
          },
        ],
      },
    ],
  },
  {
    id: "sys",
    title: "Systems & Architecture",
    badge: "SYS",
    icon: <Server size={32} />,
    conceptsCount: 46,
    description:
      "Microservices design, load balancing, databases, and distributed caching.",
    subCategories: [
      {
        id: "core-sys",
        title: "Distributed Systems",
        topics: [
          {
            title: "Database Partitioning & Sharding",
            summary: "Splitting table ranges horizontally.",
            content:
              "Horizontal sharding partitions rows across separate physical database servers using shard keys. This allows scaling database write throughput beyond a single server.",
          },
        ],
      },
    ],
  },
  {
    id: "algo-ds-main",
    title: "Algorithms & Data Structures",
    badge: "ALGO",
    icon: <Code size={32} />,
    conceptsCount: 65,
    description:
      "Core algorithms, sorting techniques, and dynamic programming.",
    subCategories: [
      {
        id: "algorithms",
        title: "Algorithms",
        topics: [
          {
            title: "Search Algorithms",
            topics: [
              {
                title: "Linear Search",
                summary: "Explore Linear Search details, code, and comparisons.",
                content: (
                  <AlgorithmDetailPane
                    selectedAlgo={"Linear Search"}
                    parentCat={"Search Algorithms"}
                  />
                ),
              },
              {
                title: "Binary Search",
                summary: "Explore Binary Search details, code, and comparisons.",
                content: (
                  <AlgorithmDetailPane
                    selectedAlgo={"Binary Search"}
                    parentCat={"Search Algorithms"}
                  />
                ),
              },
              {
                title: "Hybrid Search",
                summary: "Explore Hybrid Search details, code, and comparisons.",
                content: (
                  <AlgorithmDetailPane
                    selectedAlgo={"Hybrid Search"}
                    parentCat={"Search Algorithms"}
                  />
                ),
              },
              {
                title: "Vector Search",
                summary: "Explore Vector Search details, code, and comparisons.",
                content: (
                  <AlgorithmDetailPane
                    selectedAlgo={"Vector Search"}
                    parentCat={"Search Algorithms"}
                  />
                ),
              },
            ],
          },
          {
            title: "Sorting Algorithms",
            topics: [
              {
                title: "Merge Sort",
                summary: "Explore Merge Sort details, code, and comparisons.",
                content: (
                  <AlgorithmDetailPane
                    selectedAlgo={"Merge Sort"}
                    parentCat={"Sorting Algorithms"}
                  />
                ),
              },
              {
                title: "Quick Sort",
                summary: "Explore Quick Sort details, code, and comparisons.",
                content: (
                  <AlgorithmDetailPane
                    selectedAlgo={"Quick Sort"}
                    parentCat={"Sorting Algorithms"}
                  />
                ),
              },
            ],
          },
          {
            title: "Pathfinding Algorithms",
            topics: [
              {
                title: "A*",
                summary: "Explore A* details, code, and comparisons.",
                content: (
                  <AlgorithmDetailPane
                    selectedAlgo={"A*"}
                    parentCat={"Pathfinding Algorithms"}
                  />
                ),
              },
            ],
          },
          {
            title: "Machine Learning",
            topics: [
              {
                title: "Linear Regression",
                summary: "Explore Linear Regression details, code, and comparisons.",
                content: (
                  <AlgorithmDetailPane
                    selectedAlgo={"Linear Regression"}
                    parentCat={"Machine Learning"}
                  />
                ),
              },
              {
                title: "K-Means",
                summary: "Explore K-Means details, code, and comparisons.",
                content: (
                  <AlgorithmDetailPane
                    selectedAlgo={"K-Means"}
                    parentCat={"Machine Learning"}
                  />
                ),
              },
              {
                title: "Naive Bayes",
                summary: "Explore Naive Bayes details, code, and comparisons.",
                content: (
                  <AlgorithmDetailPane
                    selectedAlgo={"Naive Bayes"}
                    parentCat={"Machine Learning"}
                  />
                ),
              },
            ],
          },
          {
            title: "String Matching",
            topics: [
              {
                title: "Boyer-Moore",
                summary: "Explore Boyer-Moore details, code, and comparisons.",
                content: (
                  <AlgorithmDetailPane
                    selectedAlgo={"Boyer-Moore"}
                    parentCat={"String Matching"}
                  />
                ),
              },
            ],
          },
          {
            title: "Dynamic Programming",
            topics: [
              {
                title: "Dynamic Programming",
                summary: "Explore Dynamic Programming details, code, and comparisons.",
                content: (
                  <AlgorithmDetailPane
                    selectedAlgo={"Dynamic Programming"}
                    parentCat={"Dynamic Programming"}
                  />
                ),
              },
            ],
          },
        ],
      },
      {
        id: "datastructures",
        title: "Data Structures",
        topics: [
          {
            title: "Primitive Data Structures",
            topics: [
              {
                title: "Arrays",
                summary: "Fundamental sequential memory structures.",
                content: (
                  <div style={{ padding: "2rem" }}>
                    <h2>Arrays</h2>
                    <p>Content coming soon...</p>
                  </div>
                ),
              },
              {
                title: "Strings",
                summary: "Sequence of characters.",
                content: (
                  <div style={{ padding: "2rem" }}>
                    <h2>Strings</h2>
                    <p>Content coming soon...</p>
                  </div>
                ),
              },
            ],
          },
          {
            title: "Non-Primitive Data Structures",
            topics: [
              {
                title: "Hash Maps",
                summary: "Key-value storage with constant time complexity.",
                content: (
                  <div style={{ padding: "2rem" }}>
                    <h2>Hash Maps</h2>
                    <p>Content coming soon...</p>
                  </div>
                ),
              },
              {
                title: "Trees",
                summary: "Hierarchical data structures.",
                content: (
                  <div style={{ padding: "2rem" }}>
                    <h2>Trees</h2>
                    <p>Content coming soon...</p>
                  </div>
                ),
              },
              {
                title: "Graphs",
                summary: "Nodes and edges.",
                content: (
                  <div style={{ padding: "2rem" }}>
                    <h2>Graphs</h2>
                    <p>Content coming soon...</p>
                  </div>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
];

export const LearnPage = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [activeTopic, setActiveTopic] = useState(null);
  const [hoveredCategoryIdx, setHoveredCategoryIdx] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [pageSections, setPageSections] = useState([]);
  const [activeSection, setActiveSection] = useState("");
  const [scrollPercent, setScrollPercent] = useState(0);
  const readerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const syncRoute = () => {
      const hash = window.location.hash;
      const parts = hash.split("/");

      if (parts.length >= 3 && parts[1] === "learn") {
        const catId = parts[2];
        const cat = LEARN_CATEGORIES.find((c) => c.id === catId);
        if (cat) {
          setActiveCategory(cat);
          if (parts.length >= 4) {
            const subId = parts[3];
            let foundTopic = null;
            for (const sub of cat.subCategories) {
              if (sub.id === subId || sub.routeId === subId) {
                const items =
                  sub.items ||
                  (sub.groups
                    ? sub.groups.map((g) => ({ ...g, isGroup: true }))
                    : sub.topics
                      ? sub.topics.map((t) => ({ ...t, isGroup: false }))
                      : []);
                if (items && items.length > 0) {
                  if (items[0].topics || items[0].isGroup) {
                    foundTopic = items[0].topics[0];
                    setExpandedGroups((prev) => ({
                      ...prev,
                      [items[0].title]: true,
                    }));
                  } else {
                    foundTopic = items[0];
                  }
                }
                break;
              }
            }
            if (foundTopic) setActiveTopic(foundTopic);
          }
        } else {
          // If not a top-level category, check if it's a subcategory of any category
          let foundParent = null;
          let foundTopic = null;
          for (const c of LEARN_CATEGORIES) {
            if (c.id === "algo-ds-main") continue; // Skip the grid-only category
            for (const sub of c.subCategories || []) {
              if (sub.id === catId || sub.routeId === catId) {
                foundParent = c;
                const items =
                  sub.items ||
                  (sub.groups
                    ? sub.groups.map((g) => ({ ...g, isGroup: true }))
                    : sub.topics
                      ? sub.topics.map((t) => ({ ...t, isGroup: false }))
                      : []);
                if (items && items.length > 0) {
                  if (items[0].topics || items[0].isGroup) {
                    foundTopic = items[0].topics[0];
                    setExpandedGroups((prev) => ({
                      ...prev,
                      [items[0].title]: true,
                    }));
                  } else {
                    foundTopic = items[0];
                  }
                }
                break;
              }
            }
            if (foundParent) break;
          }

          if (foundParent) {
            setActiveCategory(foundParent);
            if (foundTopic) setActiveTopic(foundTopic);
          } else {
            setActiveCategory(null);
          }
        }
      } else if (parts.length === 2 && parts[1] === "learn") {
        setActiveCategory(null);
      }
    };

    syncRoute();
    window.addEventListener("hashchange", syncRoute);
    return () => window.removeEventListener("hashchange", syncRoute);
  }, []);

  useEffect(() => {
    if (activeCategory && !activeTopic) {
      if (activeCategory.subCategories.length > 0) {
        const firstSub = activeCategory.subCategories[0];
        if (
          firstSub.groups &&
          firstSub.groups.length > 0 &&
          firstSub.groups[0].topics.length > 0
        ) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setActiveTopic(firstSub.groups[0].topics[0]);
          setExpandedGroups({ [firstSub.groups[0].title]: true });
        } else if (firstSub.topics && firstSub.topics.length > 0) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setActiveTopic(firstSub.topics[0]);
        }
      }
    }
  }, [activeCategory, activeTopic]);

  useEffect(() => {
    if (activeCategory) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const timer = setTimeout(() => {
        const headers = Array.from(
          document.querySelectorAll(".custom-chapter-content h2"),
        );
        const sections = headers.map((h) => ({ id: h.id, title: h.innerText }));
        setPageSections(sections);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [activeTopic, activeCategory]);

  useEffect(() => {
    const handleNav = (e) => {
      const title = e.detail;
      if (!activeCategory) return;
      let foundTopic = null;
      let foundGroupTitle = null;
      (activeCategory.subCategories || []).forEach(sub => {
        const items = sub.topics || [];
        items.forEach(t => {
          if (t.topics) {
            t.topics.forEach(subT => {
              if (subT.title === title) {
                foundTopic = subT;
                foundGroupTitle = t.title;
              }
            });
          } else {
            if (t.title === title) foundTopic = t;
          }
        });
      });
      if (foundTopic) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveTopic(foundTopic);
        if (foundGroupTitle) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setExpandedGroups(prev => ({ ...prev, [foundGroupTitle]: true }));
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("navigate-topic", handleNav);
    return () => window.removeEventListener("navigate-topic", handleNav);
  }, [activeCategory]);

  useEffect(() => {
    const handleScroll = () => {
      if (!readerRef.current) return;
      const rect = readerRef.current.getBoundingClientRect();
      const start = rect.top + window.scrollY - 120;
      const end = rect.bottom + window.scrollY - window.innerHeight;
      const range = end - start;

      let percent;
      if (range > 0) {
        percent = Math.min(
          100,
          Math.max(0, Math.round(((window.scrollY - start) / range) * 100)),
        );
      } else {
        percent = window.scrollY > start ? 100 : 0;
      }
      setScrollPercent(percent);

      let currentActive = "";
      pageSections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const elRect = el.getBoundingClientRect();
          if (elRect.top < window.innerHeight * 0.4) {
            currentActive = sec.id;
          }
        }
      });
      if (currentActive) {
        setActiveSection(currentActive);
      } else if (pageSections.length > 0) {
        setActiveSection(pageSections[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pageSections]);

  const handleIndexClick = (id, e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (activeCategory) {
    let activeSubCategory = activeCategory.subCategories[0];
    if (activeTopic) {
      for (const sub of activeCategory.subCategories) {
        const items =
          sub.items ||
          (sub.groups
            ? sub.groups.map((g) => ({ ...g, isGroup: true }))
            : sub.topics
              ? sub.topics.map((t) => ({ ...t, isGroup: false }))
              : []);
        let found = false;
        for (const item of items) {
          if (item.topics || item.isGroup) {
            if (item.topics.some((t) => t.title === activeTopic.title)) {
              found = true;
              break;
            }
          } else {
            if (item.title === activeTopic.title) {
              found = true;
              break;
            }
          }
        }
        if (found) {
          activeSubCategory = sub;
          break;
        }
      }
    }

    const sidebarStyle = isMobile
      ? {
        position: "fixed",
        bottom: "1.5rem",
        left: "1.5rem",
        right: "1.5rem",
        zIndex: 1000,
        background: "rgba(15, 15, 15, 0.9)",
        backdropFilter: "blur(20px)",
        border: "1px solid var(--glass-border)",
        borderRadius: "16px",
        padding: "1.25rem",
        boxShadow: "0 8px 32px var(--glass-shadow)",
        maxHeight: isExpanded ? "60vh" : "auto",
        overflowY: isExpanded ? "auto" : "hidden",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }
      : {
        position: "sticky",
        top: "7.5rem",
        alignSelf: "start",
        zIndex: 10,
        background: "var(--bg-primary)",
        borderLeft: "1px solid rgba(255,255,255,0.08)",
        padding: "2rem 1.5rem",
        width: "100%",
        maxHeight: "calc(100vh - 7.5rem)",
        overflowY: "auto",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "4rem",
          minHeight: "100vh",
        }}
      >
        {/* Top Minimal Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.75rem 1.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(0,0,0,0.4)",
            position: "sticky",
            top: "4rem",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              fontSize: "0.85rem",
            }}
          >
            <button
              onClick={() => {
                window.location.hash = "#/learn";
              }}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-secondary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontWeight: 600,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              <ChevronLeft size={14} /> Back to Categories
            </button>
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
            {activeSubCategory?.title}
          </div>
        </div>

        {/* 3-Column Split Layout */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            flex: 1,
          }}
        >
          {/* Left Sidebar Navigation */}
          <div
            style={{
              flex: isMobile ? "none" : "0 0 280px",
              borderRight: isMobile
                ? "none"
                : "1px solid rgba(255,255,255,0.08)",
              borderBottom: isMobile
                ? "1px solid rgba(255,255,255,0.08)"
                : "none",
              padding: isMobile ? "1.5rem 1.5rem" : "2rem 1.25rem",
              background: "var(--bg-primary)",
              position: isMobile ? "relative" : "sticky",
              top: isMobile ? "auto" : "7.5rem",
              height: isMobile ? "auto" : "calc(100vh - 7.5rem)",
              overflowY: isMobile ? "visible" : "auto",
            }}
          >

            <div style={{ marginBottom: "1.5rem", padding: "0 0.5rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, color: "var(--accent-color)", letterSpacing: "0.01em" }}>
                {activeSubCategory.title}
              </h3>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {[activeSubCategory].filter(Boolean).map((subCat, sIdx) => {
                const items =
                  subCat.items ||
                  (subCat.groups
                    ? subCat.groups.map((g) => ({ ...g, isGroup: true }))
                    : subCat.topics
                      ? subCat.topics.map((t) => ({ ...t, isGroup: false }))
                      : []);

                return (
                  <div
                    key={sIdx}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    {items.map((item, iIdx) => {
                      if (item.topics || item.isGroup) {
                        const isGrpExpanded = expandedGroups[item.title];
                        return (
                          <div key={iIdx}>
                            <button
                              onClick={() =>
                                setExpandedGroups((prev) => ({
                                  ...prev,
                                  [item.title]: !prev[item.title],
                                }))
                              }
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                background: "transparent",
                                border: "none",
                                color: isGrpExpanded
                                  ? "#fff"
                                  : "var(--text-secondary)",
                                cursor: "pointer",
                                padding: "0.4rem 0",
                                fontSize: "0.85rem",
                                fontWeight: "600",
                              }}
                            >
                              {item.title}
                              {isGrpExpanded ? (
                                <ChevronUp size={14} />
                              ) : (
                                <ChevronDown size={14} />
                              )}
                            </button>
                            {isGrpExpanded && (
                              <ul
                                style={{
                                  listStyle: "none",
                                  padding: 0,
                                  margin: "0.3rem 0 0 0",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "0.2rem",
                                }}
                              >
                                {item.topics.map((topic, tIdx) => {
                                  const isActive =
                                    activeTopic?.title === topic.title;
                                  return (
                                    <li key={tIdx}>
                                      <button
                                        onClick={() => setActiveTopic(topic)}
                                        style={{
                                          width: "100%",
                                          textAlign: "left",
                                          background: isActive
                                            ? "rgba(0, 240, 255, 0.08)"
                                            : "transparent",
                                          border: "none",
                                          color: isActive
                                            ? "var(--accent-color)"
                                            : "var(--text-secondary)",
                                          padding: "0.5rem 0.75rem 0.5rem 1rem",
                                          borderRadius: "6px",
                                          fontSize: "0.8rem",
                                          fontWeight: isActive ? 600 : 500,
                                          cursor: "pointer",
                                          transition: "all 0.2s",
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "0.5rem",
                                        }}
                                        onMouseEnter={(e) => {
                                          if (!isActive)
                                            e.currentTarget.style.color =
                                              "#fff";
                                        }}
                                        onMouseLeave={(e) => {
                                          if (!isActive)
                                            e.currentTarget.style.color =
                                              "var(--text-secondary)";
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: "4px",
                                            height: "4px",
                                            borderRadius: "50%",
                                            background: isActive
                                              ? "var(--accent-color)"
                                              : "transparent",
                                            flexShrink: 0,
                                          }}
                                        />
                                        <span
                                          style={{
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                          }}
                                        >
                                          {topic.title}
                                        </span>
                                      </button>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </div>
                        );
                      } else {
                        const isActive = activeTopic?.title === item.title;
                        return (
                          <button
                            key={iIdx}
                            onClick={() => setActiveTopic(item)}
                            style={{
                              width: "100%",
                              textAlign: "left",
                              background: isActive
                                ? "rgba(0, 240, 255, 0.08)"
                                : "transparent",
                              border: "none",
                              color: isActive
                                ? "var(--accent-color)"
                                : "var(--text-secondary)",
                              padding: "0.4rem 0",
                              borderRadius: "6px",
                              fontSize: "0.85rem",
                              fontWeight: isActive ? 600 : 500,
                              cursor: "pointer",
                              transition: "all 0.2s",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                            onMouseEnter={(e) => {
                              if (!isActive)
                                e.currentTarget.style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                              if (!isActive)
                                e.currentTarget.style.color =
                                  "var(--text-secondary)";
                            }}
                          >
                            <span
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontWeight: "600",
                              }}
                            >
                              {item.title}
                            </span>
                          </button>
                        );
                      }
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content Area */}
          <div
            style={{
              flex: "1 1 0%",
              minWidth: 0,
              padding: isMobile ? "2rem 1.5rem" : "3rem 4rem",
              background: "var(--bg-secondary)",
            }}
          >
            {activeTopic && (
              <div
                ref={readerRef}
                style={{ maxWidth: "800px", margin: "0 auto" }}
              >
                <div
                  style={{
                    marginBottom: "2.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "var(--accent-color)",
                        fontSize: "0.8rem",
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "1rem",
                        background: "rgba(0, 240, 255, 0.1)",
                        padding: "0.3rem 0.75rem",
                        borderRadius: "20px",
                      }}
                    >
                      <BookOpen size={14} />
                      {activeCategory.title}
                    </div>
                    <h1
                      style={{
                        fontSize: "2.5rem",
                        fontWeight: 800,
                        color: "#fff",
                        margin: 0,
                        lineHeight: 1.2,
                      }}
                    >
                      {activeTopic.title}
                    </h1>
                  </div>
                </div>

                <div
                  className="custom-chapter-content"
                  style={{
                    paddingBottom: "4rem",
                    fontSize: "0.9rem",
                    lineHeight: 1.8,
                    color: "var(--text-primary)",
                    fontWeight: 300,
                  }}
                >
                  {activeTopic.content}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: On this page */}
          <div
            style={isMobile ? {} : { flex: "0 0 240px", position: "relative" }}
          >
            <div style={sidebarStyle}>
              {/* Widget Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  userSelect: "none",
                }}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "700",
                    letterSpacing: "0.05em",
                    color: "var(--text-primary)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  ON THIS PAGE
                  <span
                    style={{
                      color: "#06b6d4",
                      fontSize: "0.85rem",
                      fontWeight: "800",
                    }}
                  >
                    {scrollPercent}%
                  </span>
                </span>
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {isExpanded ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
              </div>

              {/* Custom teal Progress Bar */}
              <div
                style={{
                  height: "4px",
                  background: "rgba(255, 255, 255, 0.08)",
                  borderRadius: "2px",
                  overflow: "hidden",
                  margin: "0.75rem 0 0.5rem 0",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${scrollPercent}%`,
                    background:
                      "linear-gradient(90deg, #06b6d4, var(--accent-color))",
                    transition: "width 0.1s ease",
                    borderRadius: "2px",
                  }}
                />
              </div>

              {/* Section Index List */}
              {isExpanded && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                    marginTop: "1.25rem",
                    borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
                    paddingLeft: "0.25rem",
                  }}
                >
                  {pageSections.length > 0 ? (
                    pageSections.map((sec) => {
                      const isActive = activeSection === sec.id;
                      return (
                        <a
                          key={sec.id}
                          href={`#${sec.id}`}
                          onClick={(e) => handleIndexClick(sec.id, e)}
                          style={{
                            display: "block",
                            padding: "0.3rem 0 0.3rem 0.75rem",
                            fontSize: "0.88rem",
                            lineHeight: "1.4",
                            color: isActive ? "#fff" : "var(--text-secondary)",
                            fontWeight: isActive ? "700" : "400",
                            borderLeft: "2px solid",
                            borderColor: isActive ? "#06b6d4" : "transparent",
                            marginLeft: "-1px",
                            transition: "all 0.2s ease",
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) e.currentTarget.style.color = "#fff";
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive)
                              e.currentTarget.style.color =
                                "var(--text-secondary)";
                          }}
                        >
                          {sec.title}
                        </a>
                      );
                    })
                  ) : (
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-secondary)",
                        marginLeft: "0.75rem",
                      }}
                    >
                      No sections found on this page.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      id="learn"
      className="section container"
      style={{ paddingTop: "8rem", minHeight: "100vh" }}
    >
      {/* Premium Header Layout */}
      <div
        className="glass-panel"
        style={{
          padding: "2.5rem",
          borderRadius: "24px",
          marginBottom: "3rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, var(--accent-color), #3b82f6)",
          }}
        />
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            marginBottom: "0.75rem",
            color: "#fff",
          }}
        >
          Learn & Explore
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.05rem",
            marginBottom: "1.5rem",
            maxWidth: "700px",
          }}
        >
          Hover over a domain category to reveal subtopics, then click to drill
          down into architectural workflows and deep dives.
        </p>
      </div>

      <div
        className="grid md:grid-cols-2 lg:grid-cols-3"
        style={{ gap: "2rem", marginBottom: "4rem", alignItems: "stretch" }}
      >
        {LEARN_CATEGORIES.filter((c) => !c.hiddenFromGrid).map((cat, idx) => {
          const isHovered = hoveredCategoryIdx === idx;

          return (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: "2.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                height: "100%",
                borderRadius: "24px",
                background: isHovered
                  ? "rgba(0, 240, 255, 0.04)"
                  : "rgba(255, 255, 255, 0.02)",
                border: isHovered
                  ? "1px solid rgba(0, 240, 255, 0.2)"
                  : "1px solid rgba(255, 255, 255, 0.08)",
                transform: isHovered ? "translateY(-4px)" : "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={() => setHoveredCategoryIdx(idx)}
              onMouseLeave={() => setHoveredCategoryIdx(null)}
            >
              <div
                style={{
                  color: "var(--accent-color)",
                  background: "rgba(0, 240, 255, 0.1)",
                  padding: "1.25rem",
                  borderRadius: "20px",
                  marginBottom: "1.5rem",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cat.icon}
              </div>

              <div
                style={{
                  background: "rgba(0, 240, 255, 0.08)",
                  color: "var(--accent-color)",
                  fontWeight: "800",
                  fontSize: "0.7rem",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "6px",
                  letterSpacing: "0.05em",
                  marginBottom: "1rem",
                  textTransform: "uppercase",
                }}
              >
                {cat.badge}
              </div>

              <h4
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  marginBottom: "0.75rem",
                  color: "#fff",
                }}
              >
                {cat.title}
              </h4>
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.5,
                  color: "var(--text-secondary)",
                  marginBottom: isHovered ? "1.5rem" : "0",
                  flexGrow: 1,
                  transition: "margin 0.3s",
                }}
              >
                {cat.description}
              </p>

              <div
                style={{
                  height: isHovered ? "auto" : "0",
                  opacity: isHovered ? 1 : 0,
                  overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  marginTop: isHovered ? "1rem" : "0",
                }}
              >
                {(cat.hoverOptions || cat.subCategories).map((sub, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => {
                      window.location.hash = `#/learn/${sub.routeId || sub.id || cat.id}`;
                      // We set the active category and scroll will be handled
                    }}
                    style={{
                      padding: "0.75rem 1rem",
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      borderRadius: "8px",
                      color: "var(--text-secondary)",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(0, 240, 255, 0.08)";
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.borderColor =
                        "rgba(0, 240, 255, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.03)";
                      e.currentTarget.style.color = "var(--text-secondary)";
                      e.currentTarget.style.borderColor =
                        "rgba(255, 255, 255, 0.05)";
                    }}
                  >
                    {sub.title}
                    <ChevronRight size={14} />
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export const TechStackPage = () => {
  const categories = [
    {
      title: "Languages",
      icon: <Code size={24} />,
      description:
        "Foundational programming languages used for application logic, scripting, database querying, and modern web styling.",
      skills: ["Java", "JavaScript", "Python", "HTML", "CSS", "Dart", "SQL"],
    },
    {
      title: "Frameworks & Libraries",
      icon: <Layers size={24} />,
      description:
        "Robust frameworks and libraries utilized to engineer fast, responsive frontends, cross-platform mobile apps, and scalable microservices.",
      skills: [
        "Spring Boot",
        "React",
        "Flutter",
        "Streamlit",
        "Gradio",
        "REST APIs",
        "And other major frameworks",
      ],
    },
    {
      title: "Tools & Operations",
      icon: <Terminal size={24} />,
      description:
        "Version control platforms, design interfaces, cloud infrastructure, container platforms, and knowledge orchestration workspaces.",
      skills: [
        "Git",
        "GitHub",
        "GitLab",
        "Docker",
        "AWS",
        "Linux",
        "MongoDB",
        "Figma",
        "Obsidian",
        "Notion",
        "Antigravity IDE",
      ],
    },
    {
      title: "AI & Models",
      icon: <Brain size={24} />,
      description:
        "Open-weight foundational models, local inference pipelines, deep learning frameworks, NLP, and advanced semantic retrieval workflows.",
      skills: [
        "Gemma Models",
        "Llama Models",
        "PyTorch",
        "Hugging Face Transformers",
        "LLMs",
        "RAG Systems",
        "NLP",
        "Tokenization",
        "Embeddings",
        "Semantic Search",
        "Similarity Search",
        "Vector Search Concepts",
        "Data Pipelines",
      ],
    },
  ];

  return (
    <section
      id="techstack"
      className="section container"
      style={{ paddingTop: "8rem", minHeight: "80vh" }}
    >
      <h2
        style={{
          fontSize: "2.5rem",
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        Tech Stack
      </h2>
      <p
        style={{
          textAlign: "center",
          color: "var(--text-secondary)",
          marginBottom: "4rem",
          maxWidth: "600px",
          margin: "0 auto 4rem auto",
        }}
      >
        The languages, frameworks, development tools, and artificial
        intelligence models I work with.
      </p>

      <div className="grid md:grid-cols-2" style={{ gap: "2rem" }}>
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="glass-card"
            style={{
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              transition: "all 0.3s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.25rem",
              }}
            >
              <div
                style={{
                  color: "var(--accent-color)",
                  background: "rgba(0, 240, 255, 0.1)",
                  padding: "0.75rem",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cat.icon}
              </div>
              <h3 style={{ fontSize: "1.5rem", margin: 0, color: "#fff" }}>
                {cat.title}
              </h3>
            </div>

            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.6,
                color: "var(--text-secondary)",
                marginBottom: "1.75rem",
                flexGrow: 1,
              }}
            >
              {cat.description}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {cat.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "8px",
                    padding: "0.4rem 0.8rem",
                    fontSize: "0.85rem",
                    fontWeight: "500",
                    color: "var(--text-primary)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    transition: "all 0.2s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(0, 240, 255, 0.08)";
                    e.currentTarget.style.borderColor =
                      "rgba(0, 240, 255, 0.3)";
                    e.currentTarget.style.color = "var(--accent-color)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.03)";
                    e.currentTarget.style.borderColor =
                      "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.color = "var(--text-primary)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--accent-color)",
                    }}
                  />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const ConsultingPage = () => {
  return (
    <section
      id="consulting"
      className="section container"
      style={{ paddingTop: "8rem" }}
    >
      <h2
        style={{
          fontSize: "2.5rem",
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        Consulting Services
      </h2>
      <p
        style={{
          textAlign: "center",
          color: "var(--text-secondary)",
          marginBottom: "4rem",
          maxWidth: "600px",
          margin: "0 auto 4rem auto",
        }}
      >
        Specialized professional services to help optimize your business and
        bring your ideas to life.
      </p>

      <div
        className="grid md:grid-cols-2 lg:grid-cols-3"
        style={{ gap: "2rem" }}
      >
        <div
          className="glass-card"
          style={{
            padding: "2.25rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{ fontSize: "1.35rem", marginBottom: "1rem", color: "#fff" }}
          >
            Website Making
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              marginBottom: "1.5rem",
              flexGrow: 1,
            }}
          >
            Custom, high-performance websites and web applications tailored to
            your brand. From stunning landing pages to complex full-stack
            platforms using React, Vite, and modern UI/UX principles.
          </p>
          <a
            href="#contact"
            className="btn-primary"
            style={{
              fontSize: "0.85rem",
              width: "max-content",
              padding: "0.4rem 1rem",
            }}
          >
            Consult Now
          </a>
        </div>

        <div
          className="glass-card"
          style={{
            padding: "2.25rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{ fontSize: "1.35rem", marginBottom: "1rem", color: "#fff" }}
          >
            Android App Making
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              marginBottom: "1.5rem",
              flexGrow: 1,
            }}
          >
            Native and cross-platform mobile application development. Let's
            build intuitive, performant Android apps that users love, complete
            with seamless backend integration.
          </p>
          <a
            href="#contact"
            className="btn-primary"
            style={{
              fontSize: "0.85rem",
              width: "max-content",
              padding: "0.4rem 1rem",
            }}
          >
            Consult Now
          </a>
        </div>

        <div
          className="glass-card"
          style={{
            padding: "2.25rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{ fontSize: "1.35rem", marginBottom: "1rem", color: "#fff" }}
          >
            Local AI Deployment
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              marginBottom: "1.5rem",
              flexGrow: 1,
            }}
          >
            Designing and scaling local, offline AI networks. I help configure
            local LLMs, secure RAG (Retrieval-Augmented Generation) pipelines,
            and private autonomous agents.
          </p>
          <a
            href="#contact"
            className="btn-primary"
            style={{
              fontSize: "0.85rem",
              width: "max-content",
              padding: "0.4rem 1rem",
            }}
          >
            Consult Now
          </a>
        </div>

        <div
          className="glass-card"
          style={{
            padding: "2.25rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{ fontSize: "1.35rem", marginBottom: "1rem", color: "#fff" }}
          >
            Backend Architecture
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              marginBottom: "1.5rem",
              flexGrow: 1,
            }}
          >
            Robust, scalable backend systems and RESTful APIs. Database schema
            design, authentication, cloud deployments, and integrating complex
            3rd party services.
          </p>
          <a
            href="#contact"
            className="btn-primary"
            style={{
              fontSize: "0.85rem",
              width: "max-content",
              padding: "0.4rem 1rem",
            }}
          >
            Consult Now
          </a>
        </div>

        <div
          className="glass-card"
          style={{
            padding: "2.25rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span
            className="glass-pill"
            style={{
              width: "max-content",
              fontSize: "0.65rem",
              marginBottom: "1rem",
              borderColor: "#10b981",
              color: "#10b981",
            }}
          >
            Learning
          </span>
          <h3
            style={{ fontSize: "1.35rem", marginBottom: "1rem", color: "#fff" }}
          >
            1-on-1 Mentorship
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              marginBottom: "1.5rem",
              flexGrow: 1,
            }}
          >
            Want to learn how to build any of this yourself? Book a dedicated
            session to master web development, mobile apps, algorithms, or
            practical Machine Learning.
          </p>
          <a
            href="#contact"
            className="btn-primary"
            style={{
              fontSize: "0.85rem",
              width: "max-content",
              padding: "0.4rem 1rem",
              background: "#10b981",
              color: "#fff",
            }}
          >
            Book Session
          </a>
        </div>
      </div>

      {/* Why Consult Me Section */}
      <h3
        style={{
          fontSize: "2.2rem",
          textAlign: "center",
          marginTop: "6rem",
          marginBottom: "1rem",
        }}
      >
        Why Consult Me?
      </h3>
      <p
        style={{
          textAlign: "center",
          color: "var(--text-secondary)",
          marginBottom: "3.5rem",
          maxWidth: "650px",
          margin: "0 auto 3.5rem auto",
        }}
      >
        A unique blend of full-stack engineering, algorithmic optimization, and
        modern design aesthetics tailored for success.
      </p>

      <div
        className="grid md:grid-cols-2 lg:grid-cols-4"
        style={{ gap: "1.5rem", marginBottom: "2rem" }}
      >
        <div
          className="glass-card"
          style={{ padding: "2rem 1.5rem", textAlign: "center" }}
        >
          <h4
            style={{
              fontSize: "1.2rem",
              marginBottom: "0.75rem",
              color: "#fff",
            }}
          >
            Expertise
          </h4>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.5,
              color: "var(--text-secondary)",
            }}
          >
            Deep knowledge spanning frontend React, mobile applications, and
            robust scalable backend architectures.
          </p>
        </div>
        <div
          className="glass-card"
          style={{ padding: "2rem 1.5rem", textAlign: "center" }}
        >
          <h4
            style={{
              fontSize: "1.2rem",
              marginBottom: "0.75rem",
              color: "#fff",
            }}
          >
            Modern Stack
          </h4>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.5,
              color: "var(--text-secondary)",
            }}
          >
            Utilizing the latest technologies like Vite, Next.js, and
            cutting-edge local AI model integration.
          </p>
        </div>
        <div
          className="glass-card"
          style={{ padding: "2rem 1.5rem", textAlign: "center" }}
        >
          <h4
            style={{
              fontSize: "1.2rem",
              marginBottom: "0.75rem",
              color: "#fff",
            }}
          >
            Fast Delivery
          </h4>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.5,
              color: "var(--text-secondary)",
            }}
          >
            Optimized development workflows to quickly move your product from an
            idea to a production-ready application.
          </p>
        </div>
        <div
          className="glass-card"
          style={{ padding: "2rem 1.5rem", textAlign: "center" }}
        >
          <h4
            style={{
              fontSize: "1.2rem",
              marginBottom: "0.75rem",
              color: "#fff",
            }}
          >
            Scalability
          </h4>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.5,
              color: "var(--text-secondary)",
            }}
          >
            Building systems that are designed to handle traffic growth smoothly
            from day one without architectural bottlenecks.
          </p>
        </div>
      </div>
    </section>
  );
};
