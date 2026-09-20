---
title: "Computable abstraction"
seoTitle: "Natural Intelligence Research | Alejandro Sanchez Guinea"
eyebrow: "Intelligence research direction"
description: "Two research lines on computable abstraction, natural intelligence and computational complexity."
lastmod: 2026-09-14
url: "/research/intelligence/"
---

<div class="intelligence-thesis">
<p class="eyebrow light">Central hypothesis</p>
<h2>Natural intelligence may depend on a computable process that constructs and recursively reuses context-sensitive abstractions.</h2>
<p>Rather than treating every detail and possibility independently, an intelligent system can preserve what matters for a task, collapse irrelevant distinctions and create new operational primitives for further reasoning.</p>
</div>

<aside class="intelligence-scope-note">
<p class="eyebrow">Scope of the program</p>
<h2>This is a study of natural intelligence, not an artificial intelligence research program.</h2>
<p>Artificial intelligence asks how to construct capable artificial systems. This research asks a different question: what mechanical process allows natural intelligence to construct, contextualize, compose, revise and recursively use abstractions?</p>
<p>A learned AI model may contain useful abstract representations without explaining the general process that created them. AI may eventually implement or help test a computable abstraction mechanism, but AI capability is not the object of this research.</p>
</aside>

## Two principal research lines

<section class="intelligence-line">
<header class="intelligence-line-header"><span>I</span><div><p class="eyebrow">General theory</p><h2>Computable abstraction as a mechanism of natural intelligence</h2><p>Can abstraction be characterized as an effectively computable operation that changes an agent's representational system, creates new reusable primitives and reorganizes future reasoning around them?</p></div></header>
<div class="intelligence-line-question"><strong>Central object of study</strong><p>An abstraction operator that maps a current representation and its context to a revised representation whose new abstractions can be used in later rounds of reasoning.</p></div>
<div class="intelligence-line-topics">
<article><span>01</span><h3>Define abstraction</h3><p>Establish a representation-independent criterion that distinguishes genuine abstraction from compression, memorization or a feature that is merely decodable.</p></article>
<article><span>02</span><h3>Explain construction</h3><p>Determine what drives the formation of one abstraction rather than another, including relevance, prediction, action, invariance, reuse and computational cost.</p></article>
<article><span>03</span><h3>Formalise context</h3><p>Explain how goals and context determine which distinctions must be preserved, which can be collapsed and when finer distinctions must be recovered.</p></article>
<article><span>04</span><h3>Model recursive reuse</h3><p>Characterize how new abstractions become operational primitives and then participate in the construction of higher-order abstractions.</p></article>
<article><span>05</span><h3>Test across domains</h3><p>Look for the same construction principle in concept learning, perception, language, mathematical invention and structured problem solving.</p></article>
<article><span>06</span><h3>Establish evidence</h3><p>Measure causal use, transfer, compositionality, construction cost, revision and failure, while testing whether the theory reduces to an existing formalism.</p></article>
</div>
</section>

<section class="intelligence-line intelligence-line-complexity">
<header class="intelligence-line-header"><span>II</span><div><p class="eyebrow">Specific complexity program</p><h2>Can abstraction overcome computational complexity?</h2><p>This line asks when recursively constructed, exact abstractions can replace exponentially many raw computational states with a tractable hierarchy of context-dependent states.</p></div></header>
<div class="intelligence-line-question"><strong>Primary mathematical laboratory</strong><p>3-SAT and related constraint problems, where a variable's Boolean value is separated from its contextual role in the remaining formula.</p></div>
<div class="complexity-concepts">
<article><span>Problem formulation</span><h3>From state space to abstraction hierarchy</h3><p>Define exact decision-sufficient abstractions, quotient raw states by their relevant consequences and allow higher-order abstractions to summarise interactions among lower-level structures.</p></article>
<article><span>Formal measurement</span><h3>Existence, recognition and construction</h3><p>Separate whether a compact abstraction exists from whether it can be recognized and constructed efficiently. Measure hierarchy cost, construction time, inference work and the number of distinct abstract states.</p></article>
<article><span>Comparison and limits</span><h3>Known structure and hard instances</h3><p>Compare the mechanism with treewidth, backdoors, knowledge compilation, decision diagrams, modern SAT solving and proof complexity. Use adversarial formula families to expose unavoidable blow-ups.</p></article>
</div>

<h3 class="intelligence-stage-title">Staged research program</h3>

<div class="intelligence-test-grid">
<div><span>Stage I</span><p>Define exact contextual states and compare them with established local reasoning methods.</p></div>
<div><span>Stage II</span><p>Allow the system to create new abstract objects with explicit interfaces and verifiable semantics.</p></div>
<div><span>Stage III</span><p>Permit abstractions to become primitives for recursively higher-order abstraction.</p></div>
<div><span>Stage IV</span><p>Compare against SAT solving, decision diagrams, structural methods and knowledge compilation.</p></div>
<div><span>Stage V</span><p>Test adversarial families and establish where compact abstractions cannot be constructed efficiently.</p></div>
</div>

<div class="complexity-status">
<p class="eyebrow">Status of the strongest conjecture</p>
<h3>A universal polynomial abstraction constructor for 3-SAT would imply P equals NP.</h3>
<p>The research does not claim that such a constructor has been found or that the conjecture is established. This implication defines the burden of proof. Even if the universal conjecture fails, exact or approximate results for important structured families could still produce useful algorithms and a theory of abstraction-mediated complexity reduction.</p>
</div>
</section>

## How the lines fit together

<div class="intelligence-relationship">
<div><span>I</span><p>Develop the general mechanical theory: what abstraction is, how context guides it and how representations are extended recursively.</p></div>
<b aria-hidden="true">→</b>
<div><span>II</span><p>Subject that mechanism to a precise mathematical stress test: can it expose and construct structure that changes the effective cost of reasoning?</p></div>
</div>

The second line is therefore not a minor application of the first. It is a distinct, focused program that tests one of computable abstraction's most consequential possibilities under the standards of complexity theory.

<div class="professional-links research-links">
<a href="/research/">Research agenda <span>←</span></a>
<a class="js-contact-open" data-contact-topic="collaboration" data-contact-interest="Intelligence research collaboration" href="/contact/?topic=collaboration&amp;interest=Intelligence%20research%20collaboration">Discuss research collaboration <span>↗</span></a>
</div>
