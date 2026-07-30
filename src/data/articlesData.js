export const ARTICLES_DATA = [
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
