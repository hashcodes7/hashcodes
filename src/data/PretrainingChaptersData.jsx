/* eslint-disable react-refresh/only-export-components */
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

const InlineMath = ({ math }) => (
  <span
    dangerouslySetInnerHTML={{
      __html: katex.renderToString(math, {
        displayMode: false,
        throwOnError: false,
      }),
    }}
  />
);

const BlockMath = ({ math }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: katex.renderToString(math, {
        displayMode: true,
        throwOnError: false,
      }),
    }}
  />
);

const NavButton = ({ direction, targetTopic }) => {
  if (!targetTopic || targetTopic === "None") {
    return <div style={{ width: "50%" }}></div>;
  }

  const isPrev = direction === "prev";

  return (
    <div style={{ width: "50%", display: "flex", justifyContent: isPrev ? "flex-start" : "flex-end" }}>
      <button
        onClick={() => window.dispatchEvent(new CustomEvent('navigate-topic', { detail: targetTopic }))}
        style={{
          background: "transparent",
          border: "none",
          textAlign: isPrev ? "left" : "right",
          cursor: "pointer",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: isPrev ? "flex-start" : "flex-end",
          gap: "0.25rem",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        <span style={{
          color: "var(--text-secondary)",
          fontSize: "0.85rem",
          fontWeight: "500",
          marginLeft: isPrev ? "1.5rem" : "0",
          marginRight: !isPrev ? "1.5rem" : "0",
        }}>
          {isPrev ? "Previous" : "Next"}
        </span>
        <span style={{
          color: "#fff",
          fontSize: "1.1rem",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          {isPrev && <ChevronLeft size={18} />}
          {targetTopic}
          {!isPrev && <ChevronRight size={18} />}
        </span>
      </button>
    </div>
  );
};

const TopicLink = ({ targetTopic, children, isChapterHeader = false }) => (
  <button
    onClick={() => window.dispatchEvent(new CustomEvent('navigate-topic', { detail: targetTopic }))}
    style={{
      background: "transparent",
      border: "none",
      color: isChapterHeader ? "#fff" : "var(--accent-color)",
      cursor: "pointer",
      padding: 0,
      font: "inherit",
      textAlign: "left",
      fontSize: isChapterHeader ? "1.05rem" : "0.95rem",
      fontWeight: isChapterHeader ? 600 : 400,
      textDecoration: "none",
      transition: "all 0.2s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.color = isChapterHeader ? "var(--accent-color)" : "#ffffff";
      if (!isChapterHeader) e.currentTarget.style.textDecoration = "underline";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = isChapterHeader ? "#fff" : "var(--accent-color)";
      if (!isChapterHeader) e.currentTarget.style.textDecoration = "none";
    }}
  >
    {children}
  </button>
);

const Callout = ({ type, title, children }) => {
  const styles = {
    abstract: { border: 'rgba(255, 255, 255, 0.4)', bg: 'rgba(255, 255, 255, 0.05)', color: '#fff' },
    info: { border: 'rgba(0, 240, 255, 0.4)', bg: 'rgba(0, 240, 255, 0.05)', color: 'var(--accent-color)' },
    tip: { border: 'rgba(16, 185, 129, 0.4)', bg: 'rgba(16, 185, 129, 0.05)', color: '#10b981' },
    quote: { border: 'rgba(245, 158, 11, 0.4)', bg: 'rgba(245, 158, 11, 0.05)', color: '#f59e0b' },
    success: { border: 'rgba(16, 185, 129, 0.4)', bg: 'rgba(16, 185, 129, 0.05)', color: '#10b981' },
    example: { border: 'rgba(139, 92, 246, 0.4)', bg: 'rgba(139, 92, 246, 0.05)', color: '#8b5cf6' },
  };
  const theme = styles[type] || styles.info;
  return (
    <div style={{
      borderLeft: '4px solid ' + theme.border,
      background: theme.bg,
      padding: '1.5rem',
      borderRadius: '0 12px 12px 0',
      marginBottom: '2rem',
      marginTop: '1rem'
    }}>
      <div style={{ fontWeight: 600, color: theme.color, marginBottom: '0.75rem', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {title}
      </div>
      <div style={{ color: 'var(--text-primary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
        {children}
      </div>
    </div>
  );
};

const CodeBlock = ({ language, children }) => {
  const [copied, setCopied] = useState(false);
  const codeString =
    typeof children === "string" ? children.trim() : String(children).trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        background: "#1e1e1e",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "12px",
        overflow: "hidden",
        marginBottom: "1.5rem",
        fontSize: "0.95rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 1rem",
          background: "rgba(255, 255, 255, 0.05)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <span style={{ color: "#888", fontSize: "0.85rem" }}>
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          style={{
            background: "transparent",
            border: "none",
            color: copied ? "#10b981" : "#888",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            fontSize: "0.8rem",
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || "text"}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "transparent",
          fontSize: "0.9rem",
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

const Nav = ({ prev, next }) => (
  <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
    <NavButton direction="prev" targetTopic={prev} />
    <span style={{ color: "var(--text-secondary)" }}>|</span>
    <NavButton direction="next" targetTopic={next} />
  </div>
);

const H2 = ({ children, id }) => (
  <h2 id={id} style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
    {children}
  </h2>
);

export const pretrainingChaptersData = [
  {
    title: "Chapter 0 : Index",
    topics: [
      {
        title: "Pretraining 0.1 - Course Index",
        summary: "Overview of the pretraining-on-unlabelled-data and weight-loading course",
        content: (
          <>
            After building the decoder-only Transformer, the next milestone is to actually <strong>teach it language</strong>. This course covers <strong>pretraining on unlabelled data</strong> — how we measure whether the model is learning, the training loop itself, how we control the randomness of generated text, and finally how to <strong>save, load, and import pretrained weights</strong> (including OpenAI's GPT-2) into our own architecture.
            <Callout type="abstract" title="🎯 What You Will Learn">
              Pretraining is <strong>self-supervised</strong>: there are no human labels. The raw text <em>is</em> the label — we simply ask the model to predict the next token, and the correct next token is the one that already appears in the corpus. This single trick lets us train on the entire internet.
            </Callout>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem", marginTop: "1.5rem" }}>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Pretraining 1.1 - Generating Text & Text-Token Utilities" isChapterHeader={true}>Chapter 1: Evaluating Generative Text Models</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Pretraining 1.1 - Generating Text & Text-Token Utilities">1.1 Generating Text & Token Utilities</TopicLink></li>
                  <li><TopicLink targetTopic="Pretraining 1.2 - Cross-Entropy Training & Validation Loss">1.2 Cross-Entropy Training & Validation Loss</TopicLink></li>
                  <li><TopicLink targetTopic="Pretraining 1.3 - Perplexity">1.3 Perplexity</TopicLink></li>
                </ul>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Pretraining 2.1 - The Pretraining Loop" isChapterHeader={true}>Chapter 2: Training the LLM</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Pretraining 2.1 - The Pretraining Loop">2.1 The Pretraining Loop</TopicLink></li>
                  <li><TopicLink targetTopic="Pretraining 2.2 - Reading the Loss Curves (Overfitting)">2.2 Reading the Loss Curves</TopicLink></li>
                </ul>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Pretraining 3.1 - Temperature Scaling" isChapterHeader={true}>Chapter 3: Controlling Randomness (Decoding)</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Pretraining 3.1 - Temperature Scaling">3.1 Temperature Scaling</TopicLink></li>
                  <li><TopicLink targetTopic="Pretraining 3.2 - Top-k Sampling">3.2 Top-k Sampling</TopicLink></li>
                  <li><TopicLink targetTopic="Pretraining 3.3 - The Combined generate() Function">3.3 The Combined generate() Function</TopicLink></li>
                </ul>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Pretraining 4.1 - Saving & Loading Weights (state_dict)" isChapterHeader={true}>Chapter 4: Saving & Loading Model Weights</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Pretraining 4.1 - Saving & Loading Weights (state_dict)">4.1 Saving & Loading Weights (state_dict)</TopicLink></li>
                  <li><TopicLink targetTopic="Pretraining 4.2 - Saving Optimizer State for Resuming">4.2 Saving Optimizer State for Resuming</TopicLink></li>
                </ul>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Pretraining 5.1 - Downloading OpenAI GPT-2 Weights" isChapterHeader={true}>Chapter 5: Loading Pretrained Weights from OpenAI</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Pretraining 5.1 - Downloading OpenAI GPT-2 Weights">5.1 Downloading OpenAI GPT-2 Weights</TopicLink></li>
                  <li><TopicLink targetTopic="Pretraining 5.2 - Mapping Weights into Our Architecture">5.2 Mapping Weights into Our Architecture</TopicLink></li>
                  <li><TopicLink targetTopic="Pretraining 5.3 - Verifying the Loaded Model">5.3 Verifying the Loaded Model</TopicLink></li>
                </ul>
              </div>
            </div>
            <Nav prev="None" next="Pretraining 1.1 - Generating Text & Text-Token Utilities" />
          </>
        ),
      },
    ],
  },
  {
    title: "Chapter 1 Evaluating Generative Text Models",
    topics: [
      {
        title: "Pretraining 1.1 - Generating Text & Text-Token Utilities",
        summary: "Wrapping the model's forward pass into text-in / text-out helper functions",
        content: (
          <>
            <H2 id="autoregressive-workflow">🔁 The Auto-Regressive Generation Workflow</H2>
            GPT models are <strong>auto-regressive</strong>: they generate text one token at a time, and the model's own output at step <InlineMath math={String.raw`t`} /> becomes part of its input context at step <InlineMath math={String.raw`t+1`} />. Inference is therefore a feedback loop:
            <CodeBlock language="text">{`[Input Tokens] → [Token IDs] → [GPT Architecture] → [Output Logits Tensor]
      ↑                                                        │
      │                                                        ▼
[Append Text] ← [Convert to Text] ← [Select Next ID via Argmax / Top-K]`}</CodeBlock>
            <H2 id="logit-tensor">📐 The Output Logits Tensor</H2>
            When a context of <InlineMath math={String.raw`N`} /> tokens passes through the model, the output is a 3-D tensor of raw, unnormalized scores:
            <BlockMath math={String.raw`\text{Shape} = (\text{Batch Size},\; \text{Context Length } N,\; \text{Vocabulary Size})`} />
            Every row index <InlineMath math={String.raw`i`} /> (where <InlineMath math={String.raw`0 \le i < N`} />) is a logit vector spanning the whole vocabulary, and it represents the model's prediction for <em>the token that should follow position </em><InlineMath math={String.raw`i`} />. For a text-completion task we isolate the <strong>final row</strong> (index <InlineMath math={String.raw`N-1`} />) — that single vector holds the scores that dictate the next unseen token.
            <H2 id="text-token-utils">🔤 From Model Logits to Readable Text</H2>
            Our model speaks in <strong>token IDs</strong>, but we think in <strong>text</strong>. Before we can evaluate anything, we need two thin utilities that bridge the tokenizer and the model, so we can go <em>text → tokens → model → tokens → text</em> in one call.
            <CodeBlock language="python">{`import torch

def text_to_token_ids(text, tokenizer):
    encoded = tokenizer.encode(text, allowed_special={"<|endoftext|>"})
    # add the batch dimension the model expects: (seq) -> (1, seq)
    return torch.tensor(encoded).unsqueeze(0)

def token_ids_to_text(token_ids, tokenizer):
    flat = token_ids.squeeze(0)          # drop the batch dimension
    return tokenizer.decode(flat.tolist())`}</CodeBlock>
            The greedy generation helper simply feeds the context back into the model, takes the highest-probability next token, appends it, and repeats:
            <CodeBlock language="python">{`def generate_text_simple(model, idx, max_new_tokens, context_size):
    for _ in range(max_new_tokens):
        idx_cond = idx[:, -context_size:]        # crop to context window
        with torch.no_grad():
            logits = model(idx_cond)
        logits = logits[:, -1, :]                # only the LAST position matters
        probs = torch.softmax(logits, dim=-1)
        idx_next = torch.argmax(probs, dim=-1, keepdim=True)
        idx = torch.cat((idx, idx_next), dim=1)  # append and loop
    return idx`}</CodeBlock>
            <Callout type="info" title="Why only the last position?">
              The model outputs logits for <em>every</em> position in the sequence, but for generation we only care about the prediction that follows the <strong>final</strong> token. During <TopicLink targetTopic="Pretraining 1.2 - Cross-Entropy Training & Validation Loss">training (1.2)</TopicLink>, by contrast, we use <em>all</em> positions at once — that parallelism is what makes pretraining efficient.
            </Callout>
            <Callout type="tip" title="Sanity check">
              An <strong>untrained</strong> model with random weights will produce gibberish here — that is expected and correct. The whole point of the next sections is to turn that gibberish into coherent text by minimizing a loss.
            </Callout>
            <Nav prev="Pretraining 0.1 - Course Index" next="Pretraining 1.2 - Cross-Entropy Training & Validation Loss" />
          </>
        ),
      },
      {
        title: "Pretraining 1.2 - Cross-Entropy Training & Validation Loss",
        summary: "Defining the next-token prediction loss and splitting data into train/val",
        content: (
          <>
            <H2 id="cross-entropy-loss">📉 The Next-Token Cross-Entropy Loss</H2>
            Pretraining is <strong>self-supervised</strong>: the target for every input token is simply <em>the next token in the corpus</em>. We shift the inputs by one position to build the targets — no human labelling required.
            <CodeBlock language="python">{`# inputs  = "every effort moves"
# targets = "effort moves you"   (shifted left by one)
input_ids  = tokens[:-1]
target_ids = tokens[1:]`}</CodeBlock>
            For each position the model outputs a probability distribution over the whole vocabulary. A good model assigns a <strong>high probability</strong> to the correct target token. Cross-entropy loss punishes the model in proportion to how <em>surprised</em> it is by the truth. Averaged over a batch of <InlineMath math={String.raw`B`} /> sequences of length <InlineMath math={String.raw`N`} />:
            <BlockMath math={String.raw`\mathcal{L} = -\frac{1}{B \cdot N}\sum_{b=1}^{B}\sum_{n=1}^{N} \ln\big(p_{b,\,n,\,\text{target}}\big)`} />
            where <InlineMath math={String.raw`p_{b,n,\text{target}}`} /> is the probability the model assigns to the correct token. Perfect prediction (<InlineMath math={String.raw`p = 1`} />) gives <InlineMath math={String.raw`-\ln 1 = 0`} /> loss; a confident wrong answer drives the loss toward infinity.
            <Callout type="example" title="🧮 How the loss is computed, step by step">
              <ol style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: "1.8" }}>
                <li><strong>Extract target logits</strong> — pick out the raw scores at the true target token indices.</li>
                <li><strong>Softmax</strong> — convert logits <InlineMath math={String.raw`z`} /> into probabilities <InlineMath math={String.raw`p_i = e^{z_i} / \sum_j e^{z_j}`} />.</li>
                <li><strong>Log</strong> — take the natural log of each target probability, <InlineMath math={String.raw`\ln(p_\text{target})`} />.</li>
                <li><strong>Negative average</strong> — average across all tokens and multiply by <InlineMath math={String.raw`-1`} /> to get the Negative Log-Likelihood (NLL).</li>
              </ol>
            </Callout>
            <Callout type="info" title="What the untrained baseline looks like">
              A fresh, untrained model produces a near-uniform distribution over all <InlineMath math={String.raw`V = 50{,}257`} /> tokens, so each target gets a probability of roughly <InlineMath math={String.raw`1/50{,}257`} />. The starting loss is therefore predictable:
              <BlockMath math={String.raw`\mathcal{L}_{\text{init}} \approx -\ln\!\left(\frac{1}{50{,}257}\right) \approx 10.82`} />
              Watching the loss fall from ~10.8 toward ~3–4 is the clearest signal that pretraining is actually working.
            </Callout>
            <H2 id="loss-helpers">Computing the Loss in PyTorch</H2>
            <CodeBlock language="python">{`def calc_loss_batch(input_batch, target_batch, model, device):
    input_batch = input_batch.to(device)
    target_batch = target_batch.to(device)
    logits = model(input_batch)                       # (B, T, vocab)
    loss = torch.nn.functional.cross_entropy(
        logits.flatten(0, 1),                         # (B*T, vocab)
        target_batch.flatten(),                       # (B*T,)
    )
    return loss

def calc_loss_loader(data_loader, model, device, num_batches=None):
    total_loss = 0.0
    if len(data_loader) == 0:
        return float("nan")
    n = min(num_batches or len(data_loader), len(data_loader))
    for i, (inp, tgt) in enumerate(data_loader):
        if i >= n:
            break
        total_loss += calc_loss_batch(inp, tgt, model, device).item()
    return total_loss / n`}</CodeBlock>
            <Callout type="info" title="Train vs. Validation split">
              We hold out a slice of the corpus the model never trains on. The <strong>training loss</strong> tells us how well the model fits data it has seen; the <strong>validation loss</strong> tells us how well it <em>generalises</em>. When the two diverge, we are overfitting — covered in <TopicLink targetTopic="Pretraining 2.2 - Reading the Loss Curves (Overfitting)">2.2</TopicLink>.
            </Callout>
            <CodeBlock language="python">{`train_ratio = 0.90
split_idx = int(train_ratio * len(text_data))
train_data = text_data[:split_idx]
val_data   = text_data[split_idx:]`}</CodeBlock>
            <Nav prev="Pretraining 1.1 - Generating Text & Text-Token Utilities" next="Pretraining 1.3 - Perplexity" />
          </>
        ),
      },
      {
        title: "Pretraining 1.3 - Perplexity",
        summary: "Interpreting loss as an intuitive branching factor over the vocabulary",
        content: (
          <>
            <H2 id="perplexity">🎲 Perplexity — Loss You Can Feel</H2>
            Cross-entropy is measured in <em>nats</em>, which is hard to reason about. <strong>Perplexity</strong> is just the exponential of the loss, and it has a beautifully concrete meaning: the effective number of tokens the model is <em>choosing between</em> at each step.
            <BlockMath math={String.raw`\text{Perplexity} = e^{\mathcal{L}}`} />
            <CodeBlock language="python">{`perplexity = torch.exp(loss)`}</CodeBlock>
            <Callout type="example" title="Reading the number">
              <ul style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: "1.8" }}>
                <li><strong>Perplexity ≈ 50,257</strong> (the GPT-2 vocab size): equivalent to an untrained model with loss ≈ 10.82, guessing uniformly at random — it has learned nothing.</li>
                <li><strong>Perplexity ≈ 20</strong>: at each step the model is effectively torn between ~20 plausible tokens. Strong.</li>
                <li><strong>Loss = 0.5 → Perplexity ≈ 1.65</strong>: <InlineMath math={String.raw`e^{0.5} \approx 1.65`} />, meaning the model has narrowed the choice down to roughly one or two viable candidate words.</li>
                <li><strong>Perplexity ≈ 1</strong>: the model is certain of the next token every time (only achievable by memorising / overfitting).</li>
              </ul>
            </Callout>
            Because perplexity is monotonic in the loss, minimizing one minimizes the other. We train on the loss (it is smooth and differentiable) and report perplexity (it is interpretable).
            <Nav prev="Pretraining 1.2 - Cross-Entropy Training & Validation Loss" next="Pretraining 2.1 - The Pretraining Loop" />
          </>
        ),
      },
    ],
  },
  {
    title: "Chapter 2 Training the LLM",
    topics: [
      {
        title: "Pretraining 2.1 - The Pretraining Loop",
        summary: "The full training loop: forward, backward, AdamW step, periodic evaluation",
        content: (
          <>
            <H2 id="training-loop">🏋️ The Core Pretraining Loop</H2>
            Everything so far comes together in one standard loop. For each batch we run a forward pass, compute the loss, backpropagate the gradients, and let the optimizer update the weights. Periodically we pause to evaluate on train/val data and to print a text sample so we can watch the model learn.
            <CodeBlock language="text">{`[Fetch Batch] → [zero_grad()] → [Forward Pass] → [Compute Cross-Entropy]
                                                            │
                                                            ▼
[Optimizer Step] ← [Gradient Clipping] ← [Backward Pass (.backward())]`}</CodeBlock>
            <Callout type="info" title="Vocabulary of the loop">
              <ul style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: "1.8" }}>
                <li><strong>Epoch</strong> — one complete pass of the <em>entire</em> training set through the model.</li>
                <li><strong>Batching &amp; <code>drop_last=True</code></strong> — sequences are packed into fixed blocks matching <code>context_length</code>. If the token count isn't evenly divisible by the batch size, the leftover chunk is dropped so every matrix operation stays uniform and gradients don't spike erratically.</li>
                <li><strong><code>torch.no_grad()</code></strong> — during validation we switch off gradient tracking so PyTorch skips building the computation graph, cutting memory use and speeding up the eval pass.</li>
              </ul>
            </Callout>
            <CodeBlock language="python">{`def train_model_simple(model, train_loader, val_loader, optimizer, device,
                       num_epochs, eval_freq, eval_iter,
                       start_context, tokenizer):
    train_losses, val_losses, track_tokens = [], [], []
    tokens_seen, global_step = 0, -1

    for epoch in range(num_epochs):
        model.train()
        for input_batch, target_batch in train_loader:
            optimizer.zero_grad()                      # reset gradients
            loss = calc_loss_batch(input_batch, target_batch, model, device)
            loss.backward()                            # backpropagation
            optimizer.step()                           # update weights
            tokens_seen += input_batch.numel()
            global_step += 1

            if global_step % eval_freq == 0:
                train_loss, val_loss = evaluate_model(
                    model, train_loader, val_loader, device, eval_iter)
                train_losses.append(train_loss)
                val_losses.append(val_loss)
                track_tokens.append(tokens_seen)
                print(f"Ep {epoch+1} (step {global_step:06d}): "
                      f"train {train_loss:.3f}, val {val_loss:.3f}")

        generate_and_print_sample(model, tokenizer, device, start_context)

    return train_losses, val_losses, track_tokens`}</CodeBlock>
            <H2 id="eval-helpers">Evaluation & Sampling Helpers</H2>
            <CodeBlock language="python">{`def evaluate_model(model, train_loader, val_loader, device, eval_iter):
    model.eval()                                       # disable dropout
    with torch.no_grad():                              # no gradient tracking
        train_loss = calc_loss_loader(train_loader, model, device, eval_iter)
        val_loss   = calc_loss_loader(val_loader, model, device, eval_iter)
    model.train()
    return train_loss, val_loss

def generate_and_print_sample(model, tokenizer, device, start_context):
    model.eval()
    context_size = model.pos_emb.weight.shape[0]
    encoded = text_to_token_ids(start_context, tokenizer).to(device)
    with torch.no_grad():
        token_ids = generate_text_simple(
            model, encoded, max_new_tokens=50, context_size=context_size)
    print(token_ids_to_text(token_ids, tokenizer).replace("\\n", " "))
    model.train()`}</CodeBlock>
            <H2 id="backprop-mechanics">🧠 What Happens Under the Hood</H2>
            <ul style={{ margin: "0 0 1rem 0", paddingLeft: "1.2rem", lineHeight: "1.8" }}>
              <li><strong>Dynamic computation graph</strong> — during the forward pass PyTorch records every matrix operation (embeddings, attention dot-products, feed-forward projections) as nodes in a directed acyclic graph.</li>
              <li><strong>The backward pass (<code>.backward()</code>)</strong> — using the chain rule of calculus, PyTorch walks backwards from the scalar loss to compute the partial derivative of the loss with respect to <em>every</em> parameter, <InlineMath math={String.raw`\frac{\partial \mathcal{L}}{\partial w}`} />.</li>
              <li><strong>The AdamW step</strong> — those gradients update each weight using running averages of past gradients (momentum) plus decoupled weight decay to fight overfitting.</li>
            </ul>
            <BlockMath math={String.raw`w_{t+1} = w_t - \eta \left( \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon} + \lambda\, w_t \right)`} />
            Here <InlineMath math={String.raw`\eta`} /> is the learning rate, <InlineMath math={String.raw`\hat{m}_t`} /> and <InlineMath math={String.raw`\hat{v}_t`} /> are the bias-corrected first and second gradient moments, and <InlineMath math={String.raw`\lambda`} /> is the decoupled weight-decay penalty.
            <Callout type="info" title="Why AdamW?">
              AdamW pairs Adam's adaptive per-parameter learning rates with <em>decoupled weight decay</em> for regularization. It is the de-facto standard for training Transformers.
            </Callout>
            <CodeBlock language="python">{`model = GPTModel(GPT_CONFIG_124M)
model.to(device)
optimizer = torch.optim.AdamW(model.parameters(), lr=4e-4, weight_decay=0.1)

train_losses, val_losses, tokens_seen = train_model_simple(
    model, train_loader, val_loader, optimizer, device,
    num_epochs=10, eval_freq=5, eval_iter=5,
    start_context="Every effort moves you", tokenizer=tokenizer)`}</CodeBlock>
            <Callout type="tip" title="model.train() vs model.eval()">
              Always flip to <code>model.eval()</code> before evaluating or generating — this turns off <strong>dropout</strong> so results are deterministic — and back to <code>model.train()</code> before continuing. Forgetting this is one of the most common training bugs.
            </Callout>
            <Nav prev="Pretraining 1.3 - Perplexity" next="Pretraining 2.2 - Reading the Loss Curves (Overfitting)" />
          </>
        ),
      },
      {
        title: "Pretraining 2.2 - Reading the Loss Curves (Overfitting)",
        summary: "Interpreting train vs. validation curves and recognising overfitting",
        content: (
          <>
            <H2 id="loss-curves">📈 What the Loss Curves Tell You</H2>
            Plotting training and validation loss against tokens seen is the single most useful diagnostic in pretraining.
            <CodeBlock language="python">{`import matplotlib.pyplot as plt

def plot_losses(epochs_seen, tokens_seen, train_losses, val_losses):
    fig, ax = plt.subplots(figsize=(5, 3))
    ax.plot(epochs_seen, train_losses, label="Training loss")
    ax.plot(epochs_seen, val_losses, linestyle="-.", label="Validation loss")
    ax.set_xlabel("Epochs"); ax.set_ylabel("Loss"); ax.legend()
    plt.show()`}</CodeBlock>
            <Callout type="quote" title="⚠️ The tell-tale sign of overfitting">
              Both curves fall together at first. When the <strong>training loss keeps dropping</strong> but the <strong>validation loss flattens or turns upward</strong>, the model has stopped learning language and started <em>memorising the training set</em>. On a tiny dataset (like a single short story) this happens very quickly — which is expected and instructive.
            </Callout>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Symptom</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Diagnosis</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Typical Fix</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}><td style={{ padding: "0.75rem" }}>Train ↓, Val ↑</td><td style={{ padding: "0.75rem" }}>Overfitting</td><td style={{ padding: "0.75rem" }}>More data, dropout, early stopping</td></tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}><td style={{ padding: "0.75rem" }}>Both high & flat</td><td style={{ padding: "0.75rem" }}>Underfitting / LR too low</td><td style={{ padding: "0.75rem" }}>Train longer, raise LR, bigger model</td></tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}><td style={{ padding: "0.75rem" }}>Loss = NaN</td><td style={{ padding: "0.75rem" }}>Exploding gradients</td><td style={{ padding: "0.75rem" }}>Lower LR, gradient clipping, warmup</td></tr>
              </tbody>
            </table>
            <Callout type="tip" title="Real pretraining">
              Because our demo corpus is tiny, we overfit deliberately to prove the training loop works end-to-end. Real pretraining uses <strong>billions of tokens</strong>, where the model sees each example roughly once and overfitting is far less of a concern — instead the challenge becomes cost and scale. The remedy for our toy setup is exactly what <TopicLink targetTopic="Pretraining 5.1 - Downloading OpenAI GPT-2 Weights">Chapter 5</TopicLink> does: borrow weights that were already trained on a massive corpus.
            </Callout>
            <Nav prev="Pretraining 2.1 - The Pretraining Loop" next="Pretraining 3.1 - Temperature Scaling" />
          </>
        ),
      },
    ],
  },
  {
    title: "Chapter 3 Controlling Randomness (Decoding Strategies)",
    topics: [
      {
        title: "Pretraining 3.1 - Temperature Scaling",
        summary: "Trading determinism for diversity by rescaling logits before softmax",
        content: (
          <>
            <H2 id="temperature">🌡️ Temperature Scaling</H2>
            Greedy decoding (<code>argmax</code>) always picks the single most likely token, which makes text repetitive and robotic. <strong>Temperature scaling</strong> introduces controlled randomness by dividing the logits by a temperature <InlineMath math={String.raw`T`} /> before the softmax:
            <BlockMath math={String.raw`P_i = \frac{\exp(z_i / T)}{\sum_j \exp(z_j / T)}`} />
            <CodeBlock language="python">{`def softmax_with_temperature(logits, temperature):
    scaled = logits / temperature
    return torch.softmax(scaled, dim=-1)

# instead of argmax, sample from the distribution:
probs = softmax_with_temperature(logits, temperature=1.4)
idx_next = torch.multinomial(probs, num_samples=1)`}</CodeBlock>
            <Callout type="example" title="Intuition for the dial">
              <ul style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: "1.8" }}>
                <li><strong>T → 0</strong>: distribution sharpens to a spike → equivalent to greedy <code>argmax</code> (deterministic, safe, repetitive).</li>
                <li><strong>T = 1</strong>: the model's original, unmodified distribution.</li>
                <li><strong>T &gt; 1</strong>: distribution flattens → more surprising, creative, but also more error-prone text.</li>
              </ul>
            </Callout>
            <Callout type="info" title="Sampling, not selecting">
              Note the switch from <code>torch.argmax</code> to <code>torch.multinomial</code>. We no longer <em>select</em> the top token — we <em>sample</em> from the probability distribution, so lower-probability tokens still occasionally get chosen. Temperature only controls <em>how much</em>.
            </Callout>
            <Callout type="quote" title="⚠️ The T = 0 deterministic floor">
              Literally dividing by <InlineMath math={String.raw`T = 0`} /> would be a division-by-zero error. Instead the code treats <InlineMath math={String.raw`T = 0`} /> as a special case: it <strong>skips the sampling branch entirely</strong> and falls back to a deterministic <code>argmax</code> selection — recovering plain greedy decoding. You'll see this exact branch in the combined <TopicLink targetTopic="Pretraining 3.3 - The Combined generate() Function">generate() function (3.3)</TopicLink>.
            </Callout>
            <Nav prev="Pretraining 2.2 - Reading the Loss Curves (Overfitting)" next="Pretraining 3.2 - Top-k Sampling" />
          </>
        ),
      },
      {
        title: "Pretraining 3.2 - Top-k Sampling",
        summary: "Restricting sampling to the k most probable tokens to cut off the nonsense tail",
        content: (
          <>
            <H2 id="top-k">🔝 Top-k Sampling</H2>
            High temperatures make text creative but risk sampling absurd, low-probability tokens from the long tail of the vocabulary. <strong>Top-k sampling</strong> fixes this by keeping only the <InlineMath math={String.raw`k`} /> highest-probability tokens as candidates and zeroing out the rest before sampling.
            <CodeBlock language="python">{`top_k = 3
top_logits, top_pos = torch.topk(logits, top_k)

# mask everything outside the top-k with -inf
min_val = top_logits[:, -1]
logits = torch.where(
    logits < min_val,
    torch.tensor(float("-inf")).to(logits.device),
    logits,
)
# -inf -> 0 after softmax, so only k tokens can be sampled
probs = torch.softmax(logits / temperature, dim=-1)
idx_next = torch.multinomial(probs, num_samples=1)`}</CodeBlock>
            <Callout type="info" title="Why -inf?">
              Setting a logit to <InlineMath math={String.raw`-\infty`} /> makes <InlineMath math={String.raw`e^{-\infty} = 0`} />, so those tokens receive exactly zero probability mass after the softmax and can never be sampled. The probability is then redistributed among the surviving <InlineMath math={String.raw`k`} /> tokens.
            </Callout>
            <Callout type="tip" title="Top-k + Temperature = the standard recipe">
              In practice these two are combined: <strong>top-k</strong> removes the implausible tail, then <strong>temperature</strong> tunes the diversity among the plausible survivors. We assemble both into a single production-ready function in <TopicLink targetTopic="Pretraining 3.3 - The Combined generate() Function">3.3</TopicLink>.
            </Callout>
            <Nav prev="Pretraining 3.1 - Temperature Scaling" next="Pretraining 3.3 - The Combined generate() Function" />
          </>
        ),
      },
      {
        title: "Pretraining 3.3 - The Combined generate() Function",
        summary: "A single decoding function supporting greedy, temperature, and top-k modes",
        content: (
          <>
            <H2 id="generate-fn">⚙️ The Production generate() Function</H2>
            Here is the complete decoding function that unifies everything: it supports greedy decoding, temperature scaling, and top-k filtering, plus an optional end-of-sequence stop token.
            <CodeBlock language="python">{`def generate(model, idx, max_new_tokens, context_size,
             temperature=0.0, top_k=None, eos_id=None):
    for _ in range(max_new_tokens):
        idx_cond = idx[:, -context_size:]
        with torch.no_grad():
            logits = model(idx_cond)
        logits = logits[:, -1, :]

        # (1) optional top-k filtering
        if top_k is not None:
            top_logits, _ = torch.topk(logits, top_k)
            min_val = top_logits[:, -1]
            logits = torch.where(
                logits < min_val,
                torch.tensor(float("-inf")).to(logits.device),
                logits,
            )

        # (2) temperature scaling + sampling  OR  greedy argmax
        if temperature > 0.0:
            logits = logits / temperature
            probs = torch.softmax(logits, dim=-1)
            idx_next = torch.multinomial(probs, num_samples=1)
        else:
            idx_next = torch.argmax(logits, dim=-1, keepdim=True)

        # (3) optional early stop on end-of-text token
        if eos_id is not None and idx_next.item() == eos_id:
            break

        idx = torch.cat((idx, idx_next), dim=1)
    return idx`}</CodeBlock>
            <CodeBlock language="python">{`token_ids = generate(
    model=model,
    idx=text_to_token_ids("Every effort moves you", tokenizer),
    max_new_tokens=25,
    context_size=GPT_CONFIG_124M["context_length"],
    top_k=25,
    temperature=1.4,
)
print(token_ids_to_text(token_ids, tokenizer))`}</CodeBlock>
            <Callout type="success" title="Decoding is inference-only">
              None of these strategies change the model's weights — they only reshape how we <em>read out</em> its predictions at generation time. You can tune temperature and top-k freely without retraining.
            </Callout>
            <H2 id="hyperparam-summary">📋 Hyperparameter Quick Reference</H2>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "0.5rem", marginBottom: "1.5rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
                  <th style={{ padding: "0.6rem", color: "#fff" }}>Hyperparameter</th>
                  <th style={{ padding: "0.6rem", color: "#fff" }}>Setting</th>
                  <th style={{ padding: "0.6rem", color: "#fff" }}>Effect on the Distribution</th>
                  <th style={{ padding: "0.6rem", color: "#fff" }}>Resulting Text</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}><td style={{ padding: "0.6rem" }}>Temperature <InlineMath math={String.raw`T`} /></td><td style={{ padding: "0.6rem" }}><InlineMath math={String.raw`T \to 0.1`} /></td><td style={{ padding: "0.6rem" }}>Sharpens peaks; widens gaps between logits</td><td style={{ padding: "0.6rem" }}>Safe, predictable, repetitive</td></tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}><td style={{ padding: "0.6rem" }}>Temperature <InlineMath math={String.raw`T`} /></td><td style={{ padding: "0.6rem" }}><InlineMath math={String.raw`T \ge 1.0`} /></td><td style={{ padding: "0.6rem" }}>Flattens the curve; narrows logit gaps</td><td style={{ padding: "0.6rem" }}>Creative, diverse, risk of nonsense</td></tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}><td style={{ padding: "0.6rem" }}>Top-K</td><td style={{ padding: "0.6rem" }}>Low (e.g. 3)</td><td style={{ padding: "0.6rem" }}>Sets all logits outside the top-K to <InlineMath math={String.raw`-\infty`} /></td><td style={{ padding: "0.6rem" }}>Highly focused, no out-of-context tokens</td></tr>
                <tr><td style={{ padding: "0.6rem" }}>Top-K</td><td style={{ padding: "0.6rem" }}>High (e.g. 50)</td><td style={{ padding: "0.6rem" }}>Keeps a broad candidate pool intact</td><td style={{ padding: "0.6rem" }}>Balanced, room for unexpected vocabulary</td></tr>
              </tbody>
            </table>
            <Nav prev="Pretraining 3.2 - Top-k Sampling" next="Pretraining 4.1 - Saving & Loading Weights (state_dict)" />
          </>
        ),
      },
    ],
  },
  {
    title: "Chapter 4 Saving & Loading Model Weights",
    topics: [
      {
        title: "Pretraining 4.1 - Saving & Loading Weights (state_dict)",
        summary: "Persisting and restoring trained parameters with torch.save / load_state_dict",
        content: (
          <>
            <H2 id="save-load">💾 Saving & Loading the state_dict</H2>
            Training is expensive, so we persist the learned parameters to disk. The recommended PyTorch approach saves the model's <strong><code>state_dict</code></strong> — a plain dictionary mapping each layer name to its weight tensor — rather than the whole Python object.
            <CodeBlock language="python">{`# --- Saving ---
torch.save(model.state_dict(), "model.pth")`}</CodeBlock>
            To restore, we first re-create the model with the <em>same architecture</em>, then load the weights into it:
            <CodeBlock language="python">{`# --- Loading ---
model = GPTModel(GPT_CONFIG_124M)     # identical architecture
model.load_state_dict(torch.load("model.pth", map_location=device))
model.eval()                          # eval mode for inference`}</CodeBlock>
            <Callout type="quote" title="⚠️ Save the state_dict, not the model object">
              You <em>can</em> <code>torch.save(model)</code> directly, but that pickles the object and tightly couples the file to your exact class definitions and directory layout — it breaks easily across refactors. The <code>state_dict</code> is just tensors: portable, forward-compatible, and the industry standard.
            </Callout>
            <Callout type="info" title="map_location">
              Passing <code>map_location=device</code> lets you load a checkpoint trained on a GPU onto a CPU-only machine (or vice-versa) without errors — PyTorch remaps the tensors to the target device on load.
            </Callout>
            <Nav prev="Pretraining 3.3 - The Combined generate() Function" next="Pretraining 4.2 - Saving Optimizer State for Resuming" />
          </>
        ),
      },
      {
        title: "Pretraining 4.2 - Saving Optimizer State for Resuming",
        summary: "Checkpointing model + optimizer together so training can resume cleanly",
        content: (
          <>
            <H2 id="save-optimizer">🔄 Checkpointing for Resumable Training</H2>
            If you plan to <strong>pause and resume</strong> training, saving only the model weights is not enough. Adaptive optimizers like AdamW maintain internal state (running averages of gradients — the momentum and variance terms). Discarding it forces the optimizer to "warm up" again and can spike the loss.
            <CodeBlock language="python">{`# --- Saving a full checkpoint ---
torch.save({
    "model_state_dict": model.state_dict(),
    "optimizer_state_dict": optimizer.state_dict(),
}, "checkpoint.pth")`}</CodeBlock>
            <CodeBlock language="python">{`# --- Resuming from a checkpoint ---
checkpoint = torch.load("checkpoint.pth", map_location=device)

model = GPTModel(GPT_CONFIG_124M)
model.load_state_dict(checkpoint["model_state_dict"])

optimizer = torch.optim.AdamW(model.parameters(), lr=4e-4, weight_decay=0.1)
optimizer.load_state_dict(checkpoint["optimizer_state_dict"])

model.train()   # back to training mode`}</CodeBlock>
            <Callout type="tip" title="Checklist for a robust checkpoint">
              For long training runs, real pipelines also store the current <strong>epoch/step</strong>, the <strong>learning-rate scheduler state</strong>, and the <strong>RNG seed</strong> — everything needed to make resumption bit-for-bit identical to an uninterrupted run.
            </Callout>
            <Nav prev="Pretraining 4.1 - Saving & Loading Weights (state_dict)" next="Pretraining 5.1 - Downloading OpenAI GPT-2 Weights" />
          </>
        ),
      },
    ],
  },
  {
    title: "Chapter 5 Loading Pretrained Weights from OpenAI",
    topics: [
      {
        title: "Pretraining 5.1 - Downloading OpenAI GPT-2 Weights",
        summary: "Fetching OpenAI's publicly released GPT-2 checkpoints instead of training from scratch",
        content: (
          <>
            <H2 id="download-gpt2">⬇️ Standing on the Shoulders of GPT-2</H2>
            Pretraining a capable model from scratch costs enormous compute. Fortunately, OpenAI publicly released the <strong>GPT-2</strong> weights. Because we deliberately built our architecture to mirror GPT-2, we can load those battle-tested weights straight into our own model and instantly get coherent generation.
            <Callout type="abstract" title="Available GPT-2 sizes">
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "0.5rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
                    <th style={{ padding: "0.6rem", color: "#fff" }}>Model</th>
                    <th style={{ padding: "0.6rem", color: "#fff" }}>Parameters</th>
                    <th style={{ padding: "0.6rem", color: "#fff" }}>emb_dim</th>
                    <th style={{ padding: "0.6rem", color: "#fff" }}>n_layers</th>
                    <th style={{ padding: "0.6rem", color: "#fff" }}>n_heads</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}><td style={{ padding: "0.6rem" }}>gpt2-small</td><td style={{ padding: "0.6rem" }}>124M</td><td style={{ padding: "0.6rem" }}>768</td><td style={{ padding: "0.6rem" }}>12</td><td style={{ padding: "0.6rem" }}>12</td></tr>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}><td style={{ padding: "0.6rem" }}>gpt2-medium</td><td style={{ padding: "0.6rem" }}>355M</td><td style={{ padding: "0.6rem" }}>1024</td><td style={{ padding: "0.6rem" }}>24</td><td style={{ padding: "0.6rem" }}>16</td></tr>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}><td style={{ padding: "0.6rem" }}>gpt2-large</td><td style={{ padding: "0.6rem" }}>774M</td><td style={{ padding: "0.6rem" }}>1280</td><td style={{ padding: "0.6rem" }}>36</td><td style={{ padding: "0.6rem" }}>20</td></tr>
                  <tr><td style={{ padding: "0.6rem" }}>gpt2-xl</td><td style={{ padding: "0.6rem" }}>1558M</td><td style={{ padding: "0.6rem" }}>1600</td><td style={{ padding: "0.6rem" }}>48</td><td style={{ padding: "0.6rem" }}>25</td></tr>
                </tbody>
              </table>
            </Callout>
            <CodeBlock language="python">{`from gpt_download import download_and_load_gpt2

settings, params = download_and_load_gpt2(
    model_size="124M", models_dir="gpt2")

print("Settings:", settings)
print("Parameter keys:", params.keys())`}</CodeBlock>
            The returned <code>params</code> is a nested dictionary of NumPy arrays holding every weight matrix and bias of the original TensorFlow checkpoint. Our job in the next section is to copy each of these into the matching slot of our PyTorch model.
            <Nav prev="Pretraining 4.2 - Saving Optimizer State for Resuming" next="Pretraining 5.2 - Mapping Weights into Our Architecture" />
          </>
        ),
      },
      {
        title: "Pretraining 5.2 - Mapping Weights into Our Architecture",
        summary: "Assigning each downloaded weight tensor to the correct layer of our model",
        content: (
          <>
            <H2 id="weight-mapping">🔗 Mapping Weights, Tensor by Tensor</H2>
            OpenAI's naming differs from ours, so we write a mapping function that walks each Transformer block and copies embeddings, attention projections, feed-forward layers, and layer norms into place. A small <code>assign</code> helper guards against shape mismatches — the single most common source of silent bugs.
            <CodeBlock language="python">{`import numpy as np
import torch

def assign(left, right):
    if left.shape != right.shape:
        raise ValueError(f"Shape mismatch. Left: {left.shape}, Right: {right.shape}")
    return torch.nn.Parameter(torch.tensor(right))`}</CodeBlock>
            <CodeBlock language="python">{`def load_weights_into_gpt(gpt, params):
    # token + positional embeddings
    gpt.pos_emb.weight = assign(gpt.pos_emb.weight, params["wpe"])
    gpt.tok_emb.weight = assign(gpt.tok_emb.weight, params["wte"])

    for b in range(len(params["blocks"])):
        blk = params["blocks"][b]

        # QKV weights are stored as one fused matrix -> split into 3
        q_w, k_w, v_w = np.split(blk["attn"]["c_attn"]["w"], 3, axis=-1)
        gpt.trf_blocks[b].att.W_query.weight = assign(gpt.trf_blocks[b].att.W_query.weight, q_w.T)
        gpt.trf_blocks[b].att.W_key.weight   = assign(gpt.trf_blocks[b].att.W_key.weight,   k_w.T)
        gpt.trf_blocks[b].att.W_value.weight = assign(gpt.trf_blocks[b].att.W_value.weight, v_w.T)

        q_b, k_b, v_b = np.split(blk["attn"]["c_attn"]["b"], 3, axis=-1)
        gpt.trf_blocks[b].att.W_query.bias = assign(gpt.trf_blocks[b].att.W_query.bias, q_b)
        gpt.trf_blocks[b].att.W_key.bias   = assign(gpt.trf_blocks[b].att.W_key.bias,   k_b)
        gpt.trf_blocks[b].att.W_value.bias = assign(gpt.trf_blocks[b].att.W_value.bias, v_b)

        # attention output projection
        gpt.trf_blocks[b].att.out_proj.weight = assign(gpt.trf_blocks[b].att.out_proj.weight, blk["attn"]["c_proj"]["w"].T)
        gpt.trf_blocks[b].att.out_proj.bias   = assign(gpt.trf_blocks[b].att.out_proj.bias,   blk["attn"]["c_proj"]["b"])

        # feed-forward network
        gpt.trf_blocks[b].ff.layers[0].weight = assign(gpt.trf_blocks[b].ff.layers[0].weight, blk["mlp"]["c_fc"]["w"].T)
        gpt.trf_blocks[b].ff.layers[0].bias   = assign(gpt.trf_blocks[b].ff.layers[0].bias,   blk["mlp"]["c_fc"]["b"])
        gpt.trf_blocks[b].ff.layers[2].weight = assign(gpt.trf_blocks[b].ff.layers[2].weight, blk["mlp"]["c_proj"]["w"].T)
        gpt.trf_blocks[b].ff.layers[2].bias   = assign(gpt.trf_blocks[b].ff.layers[2].bias,   blk["mlp"]["c_proj"]["b"])

        # layer norms
        gpt.trf_blocks[b].norm1.scale = assign(gpt.trf_blocks[b].norm1.scale, blk["ln_1"]["g"])
        gpt.trf_blocks[b].norm1.shift = assign(gpt.trf_blocks[b].norm1.shift, blk["ln_1"]["b"])
        gpt.trf_blocks[b].norm2.scale = assign(gpt.trf_blocks[b].norm2.scale, blk["ln_2"]["g"])
        gpt.trf_blocks[b].norm2.shift = assign(gpt.trf_blocks[b].norm2.shift, blk["ln_2"]["b"])

    # final layer norm + weight-tied output head
    gpt.final_norm.scale = assign(gpt.final_norm.scale, params["g"])
    gpt.final_norm.shift = assign(gpt.final_norm.shift, params["b"])
    gpt.out_head.weight  = assign(gpt.out_head.weight, params["wte"])  # weight tying`}</CodeBlock>
            <Callout type="info" title="Two subtleties to watch">
              <ul style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: "1.8" }}>
                <li><strong>Transpose (.T):</strong> TensorFlow stores linear weights in the opposite orientation to PyTorch, so most matrices need transposing on assignment.</li>
                <li><strong>Fused QKV:</strong> GPT-2 packs the Query, Key, and Value projections into one <code>c_attn</code> matrix; we <code>np.split</code> it into three before assigning.</li>
                <li><strong>Weight tying:</strong> the output head reuses the token-embedding matrix (<code>wte</code>) — the same weights map tokens→vectors and vectors→logits.</li>
              </ul>
            </Callout>
            <Nav prev="Pretraining 5.1 - Downloading OpenAI GPT-2 Weights" next="Pretraining 5.3 - Verifying the Loaded Model" />
          </>
        ),
      },
      {
        title: "Pretraining 5.3 - Verifying the Loaded Model",
        summary: "Confirming the imported weights produce coherent GPT-2 text",
        content: (
          <>
            <H2 id="verify">✅ Verifying the Imported Model</H2>
            With the weights loaded, our from-scratch architecture is now functionally OpenAI's GPT-2. The proof is in the output: instead of the random gibberish of an untrained model, we should immediately get fluent, coherent continuations.
            <CodeBlock language="python">{`gpt = GPTModel(NEW_CONFIG)      # config matching the chosen GPT-2 size
load_weights_into_gpt(gpt, params)
gpt.to(device)
gpt.eval()

torch.manual_seed(123)
token_ids = generate(
    model=gpt,
    idx=text_to_token_ids("Every effort moves you", tokenizer).to(device),
    max_new_tokens=25,
    context_size=NEW_CONFIG["context_length"],
    top_k=50,
    temperature=1.5,
)
print(token_ids_to_text(token_ids, tokenizer))`}</CodeBlock>
            <Callout type="quote" title="Match the config to the checkpoint">
              Before loading, update your config to the downloaded size and enable the QKV bias GPT-2 uses:
              <CodeBlock language="python">{`NEW_CONFIG = GPT_CONFIG_124M.copy()
NEW_CONFIG.update({"context_length": 1024, "qkv_bias": True})`}</CodeBlock>
              A mismatch here is exactly what the <code>assign</code> shape-check is designed to catch.
            </Callout>
            <Callout type="success" title="🎉 You now have a working GPT-2">
              From here the natural next step is <strong>fine-tuning</strong> — adapting these pretrained weights to a specific task (classification or instruction-following) with a fraction of the original compute. That is the entire premise of transfer learning, and where the <TopicLink targetTopic="Chapter 10.1 - Supervised Fine-Tuning (SFT / Instruction Tuning)">Post-Training</TopicLink> material in the training course picks up.
            </Callout>
            <Nav prev="Pretraining 5.2 - Mapping Weights into Our Architecture" next="None" />
          </>
        ),
      },
    ],
  },
];
