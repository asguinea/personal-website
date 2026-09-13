---
title: "Independent research"
eyebrow: "Independent research programme"
description: "Research on foundation models, computer vision, uncertainty and risk control, computer graphics, and intelligence, developed through theory, experiments and reproducible public software."
layout: "research"
aliases:
  - "/publications/"
---

<section class="research-agenda-section" id="research-agenda">
<header class="research-page-heading">
  <h2>Research agenda</h2>
</header>

<div class="agenda-grid compact-agenda-grid">
  <article class="agenda-primary">
    <span>01</span>
    <h2>Foundation models</h2>
    <p>What representational structure makes broad transfer possible? This line tests whether recurrent, compositional representations are a prerequisite for foundation-model behaviour beyond language.</p>
    <a class="agenda-programme-link" href="#foundation-model-repositories">View public work <span aria-hidden="true">↓</span></a>
  </article>
  <article>
    <span>02</span>
    <h2>Computer vision</h2>
    <p>How can visual evidence support inspectable decisions and structured world models? This line spans finite-sample auditing, symbolic 4D scene representations and persistent motion models for video and LiDAR.</p>
    <a class="agenda-programme-link" href="#computer-vision-repositories">View public work <span aria-hidden="true">↓</span></a>
  </article>
  <article>
    <span>03</span>
    <h2>Uncertainty quantification and risk control</h2>
    <p>Finite-sample calibration, distribution shift, expert disagreement and sequential decision workflows across medical, social and incident-analysis settings.</p>
    <a class="agenda-programme-link" href="#uncertainty-repositories">View public work <span aria-hidden="true">↓</span></a>
  </article>
  <article>
    <span>04</span>
    <h2>Computer graphics</h2>
    <p>Structured representations for static and dynamic 3D scenes, including executable scene grammars, Gaussian scene experiments and procedural motion.</p>
    <a class="agenda-programme-link" href="#computer-graphics-repositories">View public work <span aria-hidden="true">↓</span></a>
  </article>
  <article class="agenda-intelligence">
    <span>05</span>
    <h2>Intelligence</h2>
    <p>Two connected programmes: a general theory of how natural intelligence constructs and recursively reuses abstractions, and a focused investigation of whether abstraction can reduce computational complexity.</p>
    <a class="agenda-card-link" href="/research/intelligence/">Explore the research direction <span aria-hidden="true">→</span></a>
  </article>
</div>
</section>

<section class="research-evidence" id="public-repositories">
  <header class="research-evidence-intro">
    <div>
      <h2>Research projects and artifacts</h2>
    </div>
    <div>
      <p>Current projects and public repositories connect the agenda to concrete methods, experiments, software and explicit limitations.</p>
      <a href="https://github.com/asguinea">View the complete GitHub profile <span aria-hidden="true">↗</span></a>
    </div>
  </header>

  <section class="research-programme" id="foundation-model-repositories">
    <header class="research-programme-heading">
      <span>01</span>
      <div><h3>Foundation models</h3><p>What makes a representation foundation-ready, so that learning can accumulate across contexts and familiar units can support genuinely new combinations?</p></div>
    </header>
    <div class="research-repo-grid">
      <a href="https://github.com/asguinea/motifshift">
        <small>Foundation-readiness diagnostics</small>
        <h4>MotifShift</h4>
        <p>Controlled experiments test cross-context unit reuse, distributional stability, sequence recombination and transfer across trajectories, gridworld replay and physical fields.</p>
        <b>View repository <span aria-hidden="true">↗</span></b>
      </a>
      <a href="https://github.com/asguinea/reusable-vision-representations">
        <small>Visual representations</small>
        <h4>Reusable Vision Representations</h4>
        <p>Measures selectivity, cross-context portability and held-out compositional transfer, including where specialization through depth begins to reduce reuse.</p>
        <b>View repository <span aria-hidden="true">↗</span></b>
      </a>
    </div>
  </section>

  <section class="research-programme" id="computer-vision-repositories">
    <header class="research-programme-heading">
      <span>02</span>
      <div><h3>Computer vision</h3><p>Auditing visual evidence and learning structured representations of scenes and motion from images, video and LiDAR.</p></div>
    </header>
    <div class="research-repo-grid">
      <a href="https://github.com/asguinea/finite-sample-vision-auditing">
        <small>Public repository · Evidence auditing</small>
        <h4>Finite-Sample Vision Auditing</h4>
        <p>Exact decision and influence certificates, contextual contribution estimates and integrity-checked experiments for studying spatial decision stability and reserve evidence.</p>
        <b>View repository <span aria-hidden="true">↗</span></b>
      </a>
      <article class="research-project-card">
        <small>Current project · Structured 4D vision</small>
        <h4>Beyond the Radiance</h4>
        <p>Spatio-temporal scene grammars that turn visual evidence into compact, editable programs of structure, motion and interaction.</p>
      </article>
      <article class="research-project-card">
        <small>Current project · Video understanding</small>
        <h4>Learning 3D Tapes from Video</h4>
        <p>A symbolic, compositional representation that joins spatial layout, object semantics and procedural motion for replay, editing and simulation.</p>
      </article>
      <article class="research-project-card">
        <small>Current project · LiDAR motion</small>
        <h4>Motion Tunnels</h4>
        <p>Probabilistic 4D motion representations designed to preserve object identity and continuity through sparse observations and occlusion.</p>
      </article>
    </div>
  </section>

  <section class="research-programme" id="uncertainty-repositories">
    <header class="research-programme-heading">
      <span>03</span>
      <div><h3>Uncertainty quantification and risk control</h3><p>When does a calibrated policy remain useful, how does it fail under changing conditions, and what evidence is needed to recalibrate it?</p></div>
    </header>
    <div class="research-repo-grid">
      <a href="https://github.com/asguinea/shift-aware-risk-control">
        <small>Context and distribution shift</small>
        <h4>Shift-Aware Risk Control</h4>
        <p>Global, context-transfer and context-weighted risk-control methods with audits for simultaneous validity, transfer penalties and data leakage.</p>
        <b>View repository <span aria-hidden="true">↗</span></b>
      </a>
      <a href="https://github.com/asguinea/conformal-pathways">
        <small>Sequential workflows</small>
        <h4>Conformal Pathways</h4>
        <p>Result-aware branching workflows that measure reference retention, selected-rule violations, abstention and diagnostic-test use separately.</p>
        <b>View repository <span aria-hidden="true">↗</span></b>
      </a>
      <a href="https://github.com/asguinea/medical-genai-beyond-factuality">
        <small>Consequence-aware evaluation</small>
        <h4>Medical GenAI Beyond Factuality</h4>
        <p>Separates evidence support from potential clinical consequence and compares consequence-selective evaluation with uniform factuality filtering.</p>
        <b>View repository <span aria-hidden="true">↗</span></b>
      </a>
      <a href="/eyetrustai/#research-programme">
        <small>EyeTrustAI research agenda</small>
        <h4>Closed-Loop Conformal Risk Control</h4>
        <p>A broader programme on how risk certificates transfer, govern action, receive feedback and adapt under changing deployment conditions.</p>
        <b>View research agenda <span aria-hidden="true">→</span></b>
      </a>
    </div>
  </section>

  <section class="research-programme" id="computer-graphics-repositories">
    <header class="research-programme-heading">
      <span>04</span>
      <div><h3>Computer graphics</h3><p>How can scenes and motion be represented as inspectable, editable and reproducible structures rather than opaque outputs?</p></div>
    </header>
    <div class="research-repo-grid research-repo-grid-three">
      <a href="https://github.com/asguinea/SceneGrammarKit">
        <small>Executable scene structure</small>
        <h4>SceneGrammarKit</h4>
        <p>Deterministic split-and-repeat grammars for coarse semantic scene structure, with typed edits, bounded execution and headless rendering.</p>
        <b>View repository <span aria-hidden="true">↗</span></b>
      </a>
      <a href="https://github.com/asguinea/gaussweave">
        <small>Structured 3D Gaussian scenes</small>
        <h4>GaussWeave</h4>
        <p>Reproducible tooling for structured 3D Gaussian experiments, including deterministic scenes and cameras, rendering adapters and artifact-integrity checks.</p>
        <b>View repository <span aria-hidden="true">↗</span></b>
      </a>
      <a href="https://github.com/asguinea/kinematicweave">
        <small>Dynamic 3D representation</small>
        <h4>KinematicWeave</h4>
        <p>Persistent spatial records and procedural motion with exact and error-bounded trajectory codecs, semantic events and matched-budget evaluation.</p>
        <b>View repository <span aria-hidden="true">↗</span></b>
      </a>
    </div>
  </section>
</section>

<section class="risk-portfolio" id="uncertainty-risk-control">
  <header class="risk-portfolio-intro">
    <p class="eyebrow">Active research portfolio</p>
    <h2>Conformal risk control for deployed AI systems</h2>
    <p>This programme asks how statistically valid risk guarantees can survive the conditions of real deployment: changing environments, adaptive policies, selective feedback, delayed labels and systems whose decisions alter the data they later observe.</p>
  </header>

  <div class="risk-track-grid">
    <article>
      <div class="risk-track-heading"><span>Track I</span><h3>Certificates across environments</h3></div>
      <p>How can a risk certificate remain meaningful when an AI system moves beyond the environment in which it was calibrated?</p>
      <ul>
        <li><strong>Contextual selective CRC:</strong> transferring release-risk guarantees to a new deployment context.</li>
        <li><strong>Meta-conformal risk transfer:</strong> certifying learned relationships across a population of environments.</li>
        <li><strong>Certificate survival under drift:</strong> determining when validity decays and a certificate must expire.</li>
        <li><strong>Adaptive risk contracts:</strong> allowing loss definitions, subgroups and evidence rules to change without invalidating guarantees.</li>
      </ul>
    </article>
    <article>
      <div class="risk-track-heading"><span>Track II</span><h3>Closed-loop AI control</h3></div>
      <p>How can risk be controlled when AI actions, human review and the resulting evidence form a feedback loop?</p>
      <ul>
        <li><strong>Adaptive sequential conformal authorisation:</strong> allocating risk across multi-step AI workflows.</li>
        <li><strong>CRC under policy-dependent feedback:</strong> preserving guarantees under selective release, delayed labels and review bias.</li>
        <li><strong>Safe active auditing:</strong> allocating human review to improve future autonomy while retaining risk guarantees.</li>
        <li><strong>Performative CRC:</strong> studying risk guarantees when the controller changes the environment it controls.</li>
      </ul>
    </article>
  </div>

  <div class="risk-flagship">
    <div>
      <span>Flagship synthesis</span>
      <h3>Closed-Loop Conformal Risk Control</h3>
    </div>
    <p>A unified theory combining context shift, adaptive policies, selective feedback, certificate expiration and recalibration for deployed AI systems.</p>
  </div>

  <div class="risk-applications">
    <span>Application branches</span>
    <p><strong>Medical imaging</strong> for clinical deployment shift, <strong>autonomous systems and robotics</strong> for sequential control, and <strong>AI agents</strong> for multi-step language-enabled workflows.</p>
  </div>
</section>

## Selected publications by research area

The selection below is organised around the first four areas of the research agenda. The [complete indexed record is available on DBLP](https://dblp.org/pid/132/8925.html).

<div class="publication-groups" id="publications">
  <section>
    <header><span>01</span><h2>Foundation models</h2></header>
    <ul>
      <li><strong>Motion as Language: Towards a Situation–Motion Language for Spatio-Temporal Learning.</strong> NeurIPS Workshops, 2025.</li>
      <li><strong>Ophthalmology as a Lens for Trustworthy GenAI in Europe.</strong> NeurIPS Workshops, 2025.</li>
      <li><strong>CLEAR-Command.</strong> NAACL System Demonstrations, 2025.</li>
      <li><strong>AEXL: Enhancing Path Prediction with Active Explainable Learning via Large Language Models.</strong> CHI Extended Abstracts, 2025.</li>
    </ul>
  </section>

  <section>
    <header><span>02</span><h2>Computer vision</h2></header>
    <ul>
      <li><strong>DeSPITE: Deep Skeleton–Pointcloud–IMU–Text Embeddings.</strong> ICCV, 2025.</li>
      <li><strong>NeSyMoF: A Neuro-Symbolic Model for Motion Forecasting.</strong> IROS, 2024.</li>
      <li><strong>LiOn-XA: Unsupervised Domain Adaptation via LiDAR-Only Cross-Modal Adversarial Training.</strong> IROS, 2024.</li>
      <li><strong>Unsupervised 4D LiDAR Moving Object Segmentation.</strong> WACV, 2023.</li>
      <li><strong>Improving Wearable-Based Activity Recognition Using Image Representations.</strong> Sensors, 2022.</li>
      <li><strong>VIDENS: Vision-Based User Identification from Inertial Sensors.</strong> ISWC, 2021.</li>
    </ul>
  </section>

  <section>
    <header><span>03</span><h2>Uncertainty quantification and risk control</h2></header>
    <ul>
      <li><strong>SafePath: Conformal Prediction for Safe LLM-Based Autonomous Navigation.</strong> arXiv, 2025.</li>
      <li><strong>Conformal Prediction for Semantically-Aware Autonomous Perception in Urban Environments.</strong> CoRL, 2024.</li>
      <li><strong>AR-CP: Uncertainty-Aware Perception in Adverse Conditions.</strong> CVPR Workshops, 2024.</li>
      <li><strong>Can You Handle the Truth? Investigating AR-Based Communication of Deep-Learning Uncertainty.</strong> ISMAR, 2023.</li>
      <li><strong>Visualization of Machine Learning Uncertainty in AR-Based See-Through Applications.</strong> AIVR, 2022.</li>
    </ul>
  </section>

  <section>
    <header><span>04</span><h2>Computer graphics</h2></header>
    <ul>
      <li><strong>Whenever, Wherever: Orchestrating Crowd Simulations with Spatio-Temporal Spawn Dynamics.</strong> ICRA, 2025.</li>
      <li><strong>PointCloudLab: 3D Point Cloud Annotation with Visual Aids and Immersion.</strong> ICRA, 2023.</li>
      <li><strong>VR-Surv: A VR-Based Privacy Preserving Surveillance System.</strong> CHI Extended Abstracts, 2022.</li>
    </ul>
  </section>
</div>

Earlier work in software engineering, continuous experimentation and pervasive systems remains part of the broader publication record and will be integrated more fully in a later revision.

<div class="professional-links research-links">
  <a href="https://dblp.org/pid/132/8925.html">Complete DBLP record <span>↗</span></a>
  <a href="https://github.com/asguinea">Public research on GitHub <span>↗</span></a>
  <a href="/supervision/">Supervised research <span>→</span></a>
  <a class="js-contact-open" data-contact-topic="collaboration" data-contact-interest="Independent research collaboration" href="/contact/?topic=collaboration&amp;interest=Independent%20research%20collaboration">Discuss research collaboration <span>↗</span></a>
</div>
