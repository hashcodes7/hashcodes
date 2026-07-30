export const PAPERS_DATA = [
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
