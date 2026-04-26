import { C, Note, type StudyPageContent, placeholderConcepts, placeholderQs } from "./_shared";

const concepts: StudyPageContent = {
  intro: <p>LLM internals — what every interview that mentions GenAI assumes you understand.</p>,
  body: (
    <div className="prose-study space-y-10">
      <section>
        <h2>The transformer in one screen</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>Tokens → embeddings.</strong> Text is tokenized (BPE, SentencePiece). Each token mapped to a learned vector (d_model dimensional, e.g. 4096).</li>
          <li><strong>Positional encoding.</strong> Added to embeddings so the model knows token order. RoPE (rotary) is the modern default — generalizes better to long contexts than absolute positions.</li>
          <li><strong>Self-attention.</strong> Each token attends to every other token in the context. Q, K, V projections; softmax(QKᵀ/√d)·V.</li>
          <li><strong>Multi-head attention.</strong> Run attention in parallel with multiple Q/K/V heads; concatenate. Lets the model attend to different patterns.</li>
          <li><strong>Feed-forward block.</strong> Two linear layers with non-linearity (GeLU/SwiGLU).</li>
          <li><strong>Residual + LayerNorm.</strong> Around attention and FFN. RMSNorm in modern LLMs.</li>
          <li><strong>Stack N times.</strong> Modern open LLMs: 32–80 transformer blocks.</li>
          <li><strong>LM head.</strong> Linear projection back to vocabulary; softmax = next-token distribution.</li>
        </ol>
      </section>

      <section>
        <h2>Decoder-only vs encoder-decoder</h2>
        <ul>
          <li><strong>Decoder-only (GPT, Llama, Claude):</strong> autoregressive next-token prediction. Causal mask in attention. Used for chat / generation.</li>
          <li><strong>Encoder-decoder (T5, BART):</strong> encoder builds bidirectional representation, decoder generates. Better for translation, summarization.</li>
          <li><strong>Encoder-only (BERT):</strong> bidirectional, masked language modeling. Used for classification, embeddings — not generation.</li>
        </ul>
      </section>

      <section>
        <h2>Why attention works</h2>
        <p>Attention computes a content-based weighted average over all tokens. Unlike RNNs, every position has direct access to every other position — no information bottleneck through hidden states. The cost is O(n²) in sequence length, which is what long-context techniques (sparse attention, sliding window, RoPE scaling) attack.</p>
      </section>

      <section>
        <h2>Decoding strategies</h2>
        <ul>
          <li><strong>Greedy:</strong> always pick argmax. Deterministic, often boring.</li>
          <li><strong>Beam search:</strong> track top-k partial sequences. Better for translation, worse for open-ended generation.</li>
          <li><strong>Temperature:</strong> divide logits by T before softmax. T&gt;1 = more random, T&lt;1 = more peaked.</li>
          <li><strong>Top-k:</strong> sample only from k highest-prob tokens.</li>
          <li><strong>Top-p (nucleus):</strong> sample from smallest set whose cumulative prob ≥ p. Better than top-k for variable distributions.</li>
        </ul>
      </section>

      <section>
        <h2>Context window math you need cold</h2>
        <ul>
          <li>1 token ≈ 0.75 English words (varies by tokenizer)</li>
          <li>Llama-3 8K context, GPT-4o 128K, Claude Opus 4 / Gemini 1.5 / Gemini 2.5 1M+</li>
          <li>Memory cost of attention is O(n²·d) — long contexts use techniques like Flash Attention, sliding window, ring attention</li>
          <li>KV cache stores past keys/values during generation — main memory cost in serving</li>
        </ul>
      </section>
    </div>
  ),
};

const pretraining: StudyPageContent = {
  intro: <p>How LLMs learn — and why each training stage matters.</p>,
  body: (
    <div className="prose-study space-y-8">
      <section>
        <h2>Three stages, three jobs</h2>
        <table className="w-full text-sm border border-cream-deep">
          <thead className="bg-cream-soft">
            <tr><th className="border p-2 text-left border-cream-deep">Stage</th><th className="border p-2 text-left border-cream-deep">Data</th><th className="border p-2 text-left border-cream-deep">Objective</th><th className="border p-2 text-left border-cream-deep">What it teaches</th></tr>
          </thead>
          <tbody>
            <tr><td className="border p-2 border-cream-deep">Pretraining</td><td className="border p-2 border-cream-deep">Trillions of internet tokens</td><td className="border p-2 border-cream-deep">Next-token prediction</td><td className="border p-2 border-cream-deep">World knowledge, language fluency</td></tr>
            <tr><td className="border p-2 border-cream-deep">SFT (instruction tuning)</td><td className="border p-2 border-cream-deep">Human-written prompt/response pairs</td><td className="border p-2 border-cream-deep">Imitate good responses</td><td className="border p-2 border-cream-deep">Following instructions, format</td></tr>
            <tr><td className="border p-2 border-cream-deep">RLHF / DPO</td><td className="border p-2 border-cream-deep">Preference pairs (chosen vs rejected)</td><td className="border p-2 border-cream-deep">Reward maximization</td><td className="border p-2 border-cream-deep">Helpfulness, harmlessness, safety</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>RLHF — the shape</h2>
        <ol className="list-decimal pl-6 space-y-1">
          <li>SFT model produces multiple completions per prompt</li>
          <li>Humans rank them</li>
          <li>Train a reward model (RM) on the preferences</li>
          <li>Use PPO to optimize the policy LLM against the RM, with a KL penalty against the SFT model so it doesn&apos;t go off-distribution</li>
        </ol>
      </section>

      <section>
        <h2>DPO — why it&apos;s replacing PPO</h2>
        <p>Direct Preference Optimization derives a closed-form loss that optimizes preferences <em>without</em> a separate reward model and without PPO. Same data (chosen, rejected pairs), one training run, way more stable. Most modern open-weight models use DPO or its variants (IPO, KTO).</p>
      </section>

      <section>
        <h2>Why instruction-following emerges from SFT</h2>
        <p>Pretraining on web text teaches &quot;continue this text&quot; not &quot;answer this question.&quot; SFT changes the prior: now &quot;USER: ... ASSISTANT: ...&quot; is the dominant template, so the model continues by responding as an assistant. The base model already knows everything; SFT just steers behavior.</p>
      </section>
    </div>
  ),
};

const prompting: StudyPageContent = {
  intro: <p>The handful of patterns that move evals — and the ones that don&apos;t.</p>,
  body: (
    <div className="prose-study space-y-8">
      <section>
        <h2>The patterns that work</h2>
        <ul>
          <li><strong>Few-shot examples</strong> — 2–5 high-quality examples beat detailed instructions for format learning</li>
          <li><strong>Chain-of-thought</strong> — &quot;think step by step&quot; for math, logic, planning. Modern reasoning models do this internally already.</li>
          <li><strong>Role priming</strong> — &quot;You are a senior data scientist...&quot; — small effect; mostly format steering.</li>
          <li><strong>Output format anchoring</strong> — give an explicit JSON schema or template. Best done with structured output APIs (response_format / tool_use).</li>
          <li><strong>Negative examples</strong> — &quot;Do NOT...&quot; works in modern models, contrary to older folklore.</li>
          <li><strong>Decompose</strong> — split complex tasks into multiple smaller LLM calls; pipeline beats prompt engineering.</li>
        </ul>
      </section>
      <section>
        <h2>Modern advanced patterns</h2>
        <ul>
          <li><strong>ReAct</strong> — interleave reasoning and tool use; for agents</li>
          <li><strong>Self-consistency</strong> — sample multiple CoT chains, take majority answer</li>
          <li><strong>Tree of Thoughts (ToT)</strong> — search over reasoning branches; rarely worth the cost</li>
          <li><strong>Self-refine / Reflexion</strong> — model critiques its own output then revises. Worth it for code/reasoning.</li>
          <li><strong>Prompt caching</strong> — cache the static system prompt prefix; saves cost &amp; latency at scale (Anthropic, OpenAI both support)</li>
        </ul>
      </section>
    </div>
  ),
};

const rag: StudyPageContent = {
  intro: <p>RAG is the most-asked GenAI topic in DS interviews. Master the components and the tradeoffs.</p>,
  body: (
    <div className="prose-study space-y-10">
      <section>
        <h2>The pipeline</h2>
        <ol className="list-decimal pl-6 space-y-1">
          <li><strong>Ingest</strong> documents</li>
          <li><strong>Chunk</strong> into passages</li>
          <li><strong>Embed</strong> each chunk into a vector</li>
          <li><strong>Index</strong> vectors in a store</li>
          <li>At query time: <strong>embed query → retrieve top-k → rerank → stuff into prompt → generate</strong></li>
        </ol>
      </section>

      <section>
        <h2>Chunking — the underrated lever</h2>
        <ul>
          <li><strong>Fixed-size chunks</strong> (e.g. 512 tokens) with overlap (50–100 tokens) — fast, decent baseline</li>
          <li><strong>Recursive / structural</strong> — split on headings, paragraphs, then sentences. Respects document structure.</li>
          <li><strong>Semantic chunking</strong> — split where embedding similarity drops. Slow but produces clean units.</li>
          <li><strong>Sentence-window</strong> — embed single sentences, retrieve a window around hits</li>
          <li><strong>Hierarchical (parent-child)</strong> — embed small chunks for retrieval precision, return their parents for context</li>
        </ul>
      </section>

      <section>
        <h2>Retrieval: dense vs sparse vs hybrid</h2>
        <ul>
          <li><strong>Dense (embedding similarity)</strong> — captures semantics, struggles with rare terms, names, codes</li>
          <li><strong>Sparse (BM25 / TF-IDF)</strong> — exact-match strong, semantically blind</li>
          <li><strong>Hybrid</strong> — score-fuse dense + sparse with reciprocal rank fusion (RRF). Almost always better than either alone.</li>
          <li><strong>Reranking</strong> — cross-encoder (e.g. Cohere Rerank, BGE reranker) reranks top-50 down to top-5. Single biggest accuracy gain.</li>
        </ul>
      </section>

      <section>
        <h2>Vector stores — picking one</h2>
        <ul>
          <li><strong>FAISS</strong> — local, no infra, fastest for &lt;1M vectors</li>
          <li><strong>pgvector</strong> — embed inside Postgres; great when metadata filters matter</li>
          <li><strong>Qdrant / Weaviate / Milvus</strong> — production OSS, good filtering</li>
          <li><strong>Pinecone</strong> — managed, simple, expensive at scale</li>
        </ul>
      </section>

      <section>
        <h2>Evaluation</h2>
        <ul>
          <li><strong>Retrieval quality:</strong> recall@k, hit rate, MRR — built from a labeled query→relevant-doc set</li>
          <li><strong>Generation quality:</strong> faithfulness (no hallucinations), answer relevance, context precision/recall — Ragas, TruLens</li>
          <li><strong>End-to-end:</strong> LLM-as-judge with rubric, side-by-side eval against a baseline</li>
        </ul>
        <Note tone="terracotta">
          <strong>What interviewers love hearing:</strong> &quot;I&apos;d build the eval set first, before tuning anything. Otherwise improvements are vibes.&quot;
        </Note>
      </section>

      <section>
        <h2>Common failure modes</h2>
        <ul>
          <li><strong>Lost in the middle</strong> — LLMs ignore mid-prompt context; reorder retrieved chunks (most-relevant at start &amp; end)</li>
          <li><strong>Distractors</strong> — irrelevant chunks lower answer quality; aggressive reranking helps</li>
          <li><strong>Multi-hop questions</strong> — single-shot retrieval fails; use query rewriting / decomposition / iterative retrieval</li>
          <li><strong>Out-of-domain queries</strong> — model answers anyway; add a routing step that detects &quot;not in corpus&quot; and refuses</li>
        </ul>
      </section>
    </div>
  ),
};

const finetuning: StudyPageContent = {
  intro: <p>Full fine-tuning is rarely the right answer. PEFT methods (LoRA, QLoRA) are the standard.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>The decision tree</h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li>Can the task be solved with prompting + few-shot? <em>Yes ⇒ stop.</em></li>
        <li>Can it be solved with RAG? <em>Yes ⇒ stop.</em></li>
        <li>Do you need to teach a new style / format / domain language? <em>Yes ⇒ SFT + LoRA.</em></li>
        <li>Do you have tens of thousands of preference pairs and a clear reward signal? <em>Yes ⇒ DPO.</em></li>
        <li>Pretraining a new base model is almost never the right answer in DS interviews.</li>
      </ol>
      <h2>LoRA / QLoRA</h2>
      <ul>
        <li><strong>LoRA:</strong> freeze base weights, learn low-rank update <C>ΔW = BA</C> (rank r ≪ d). Only train a tiny fraction of parameters.</li>
        <li><strong>QLoRA:</strong> LoRA on top of a 4-bit quantized base model. Lets you fine-tune 70B models on a single GPU.</li>
        <li>Typical r = 8–64, alpha = 16, target modules = q_proj, k_proj, v_proj, o_proj (or all linear)</li>
      </ul>
      <h2>Common mistakes</h2>
      <ul>
        <li>Fine-tuning when prompting would have worked</li>
        <li>Tiny dataset (&lt;500 examples) — usually catastrophic; use few-shot instead</li>
        <li>Not separating train/val sets — overfitting goes unnoticed</li>
        <li>Forgetting to save and version the LoRA adapter separately from base</li>
      </ul>
    </div>
  ),
};

const embeddings: StudyPageContent = {
  intro: <p>Embeddings power RAG, semantic search, classification, recommendations.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>How they&apos;re trained</h2>
      <p>Modern embedding models are trained with contrastive loss: pairs of (query, positive_doc) pulled together, (query, negative_doc) pushed apart. InfoNCE / MultipleNegativesRanking are the dominant losses.</p>
      <h2>Picking a model</h2>
      <ul>
        <li><strong>OpenAI text-embedding-3-small/large</strong> — strong general-purpose, paid API</li>
        <li><strong>BGE / M3 (BAAI)</strong> — best-in-class open-weight, strong on multi-lingual</li>
        <li><strong>Voyage / Cohere embeddings</strong> — strong proprietary, often outperform OpenAI on niche</li>
        <li><strong>Sentence-transformers (all-mpnet, all-MiniLM)</strong> — small, fast, great for low-latency</li>
      </ul>
      <h2>Distance metrics</h2>
      <ul>
        <li><strong>Cosine similarity</strong> — most common; angle-based, scale-invariant</li>
        <li><strong>Inner product (dot)</strong> — equivalent to cosine if vectors are unit-normed</li>
        <li><strong>Euclidean (L2)</strong> — distance-based; rarely used for embeddings</li>
      </ul>
      <h2>Approximate Nearest Neighbor (ANN)</h2>
      <p>Exact NN is O(n) per query — fine for &lt;100K, painful at scale. ANN indexes (HNSW, IVF, ScaNN) trade a tiny accuracy loss for orders-of-magnitude speedup.</p>
    </div>
  ),
};

const evalLLM: StudyPageContent = {
  intro: <p>LLM evaluation is half the job. Most teams skip it; that&apos;s why they ship slop.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>The evaluation hierarchy</h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li><strong>Reference-based metrics</strong> — BLEU, ROUGE, BERTScore. Ok for translation/summarization where there&apos;s a ground truth. Useless for open-ended generation.</li>
        <li><strong>Rule-based / programmatic</strong> — exact match, regex, JSON schema validation. Fast, cheap, robust. Use whenever possible.</li>
        <li><strong>LLM-as-judge</strong> — a strong model rates outputs on a rubric. Most flexible, but biased toward fluent/long responses; calibrate carefully.</li>
        <li><strong>Human eval</strong> — gold standard, expensive, slow. Use to validate other metrics.</li>
        <li><strong>Live A/B</strong> — actual user behavior. The only metric that ever matters.</li>
      </ol>
      <h2>Building an eval set</h2>
      <ul>
        <li>Start small (50–100 examples) but cover the edge cases that matter</li>
        <li>Use real user queries from logs whenever possible</li>
        <li>Version it — eval set drift is a thing</li>
        <li>Automate it as a CI gate before any prompt or model change ships</li>
      </ul>
    </div>
  ),
};

const hallucinations: StudyPageContent = {
  intro: <p>You can&apos;t eliminate hallucinations. You can systematically reduce them.</p>,
  body: (
    <div className="prose-study space-y-6">
      <h2>Why models hallucinate</h2>
      <ul>
        <li>Trained to produce <em>plausible</em> text, not <em>true</em> text</li>
        <li>Long-tail facts have insufficient training signal</li>
        <li>Conflicting information in training data</li>
        <li>Out-of-distribution queries fall back to confident-sounding bullshit</li>
      </ul>
      <h2>Mitigations, in order of impact</h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li><strong>Ground in retrieved context</strong> (RAG) — the single biggest reduction</li>
        <li><strong>Cite sources</strong> — force the model to attribute claims to chunks</li>
        <li><strong>Verify with a second pass</strong> — &quot;is this answer supported by the provided context?&quot;</li>
        <li><strong>Tool use over generation</strong> — call a real API for facts, calculator for math</li>
        <li><strong>Lower temperature</strong> for factual tasks</li>
        <li><strong>Refuse when uncertain</strong> — train/prompt the model to say &quot;I don&apos;t know&quot;</li>
        <li><strong>Detection</strong> — token-level probability, log-probability of generated text, NLI-based fact-checking</li>
      </ol>
    </div>
  ),
};

const topQuestions: StudyPageContent = {
  intro: <p>The GenAI questions every LLM-centric DS interview now asks.</p>,
  qa: [
    { q: "Walk me through the transformer architecture.", a: <p>Tokens → embeddings + positional encoding → N transformer blocks (multi-head self-attention + feed-forward, with residual + LayerNorm) → LM head → next-token distribution. Self-attention lets every token attend to every other; multi-head learns multiple attention patterns in parallel; FFN adds non-linear capacity per position. Decoder-only models use causal masking so position i only attends to ≤i.</p> },
    { q: "Explain RAG and when not to use it.", a: <p>RAG retrieves relevant context from a corpus and stuffs it into the prompt before generation, grounding answers in your data. Use when the model needs information not in its training data, when freshness matters, or when source attribution is required. Don&apos;t use when the task doesn&apos;t need external knowledge (sentiment, classification, code refactoring) or when context already fits in the prompt.</p> },
    { q: "Pretraining vs SFT vs RLHF — what each one teaches.", a: <p>Pretraining = world knowledge + language fluency from next-token prediction on internet-scale text. SFT = how to follow instructions and format responses (imitation learning on prompt/response pairs). RLHF / DPO = aligns with human preferences for helpfulness, harmlessness, style. The base model already knows almost everything; later stages steer behavior, not knowledge.</p> },
    { q: "LoRA — how does it work?", a: <p>Freeze the pretrained weights W. Learn a low-rank decomposition <C>ΔW = BA</C> where A is r×d and B is d×r with r much smaller than d. Add ΔW to W during forward pass. You only train r·d·2 parameters per layer instead of d² — orders-of-magnitude smaller. QLoRA adds 4-bit quantization of W, letting you fine-tune 70B models on consumer GPUs.</p> },
    { q: "How would you evaluate a RAG system?", a: <p>Two-tier eval: (1) Retrieval — recall@k, MRR, hit rate against a labeled query→doc set. (2) Generation — faithfulness, answer relevance, context precision (Ragas / TruLens). End-to-end: LLM-as-judge or human eval on representative queries. Build the eval set <em>first</em>, version it, automate as a CI gate.</p> },
    { q: "Hybrid search — why is it almost always better?", a: <p>Dense embeddings capture semantics but miss exact matches (names, codes, rare terms). Sparse retrieval (BM25) captures exact matches but is semantically blind. Hybrid combines them via Reciprocal Rank Fusion, capturing both modes. Add a cross-encoder reranker on top for the biggest single accuracy gain.</p> },
    { q: "Decoding strategies — when do you use which?", a: <p>Greedy / low temp + top-p for factual / code / structured output. Higher temperature + top-p for creative generation. Beam search for translation / summarization with a clear correct answer. Modern API default: temperature=0.7, top_p=0.95 — works most cases.</p> },
    { q: "What&apos;s prompt caching and why does it matter?", a: <p>Static prefixes (system prompt, RAG context) get cached after first use, so subsequent calls re-use the cached KV state — much cheaper and faster. Anthropic and OpenAI both support it. At scale this is meaningful cost: a 10K-token system prompt called 1M times saves real money.</p> },
    { q: "[Placeholder] Explain attention with the QKV math.", a: <p>Answer being drafted.</p> },
    { q: "[Placeholder] What&apos;s the difference between encoder and decoder models?", a: <p>Answer being drafted.</p> },
    { q: "[Placeholder] How does BPE tokenization work?", a: <p>Answer being drafted.</p> },
    { q: "[Placeholder] What&apos;s the role of positional encoding?", a: <p>Answer being drafted.</p> },
    { q: "[Placeholder] How would you fine-tune for a domain-specific task?", a: <p>Answer being drafted.</p> },
  ],
};

export const genAiContent: Record<string, StudyPageContent> = {
  concepts,
  pretraining,
  prompting,
  rag,
  "fine-tuning": finetuning,
  embeddings,
  evaluation: evalLLM,
  hallucinations,
  "top-questions": topQuestions,
};
