(function () {
  "use strict";

  // ============================
  // Oliverfr Section0 Carousel (Isolated Widget)
  // - Namespaced DOM (class/id de-conflict) to avoid cross-carousel script conflicts
  // - Scoped CSS injection (no dependency on .section0-* rules)
  // - Instance-scoped queries only (no global getElementById usage)
  // - Multi-instance safe
  // ============================

  const KEY = Symbol.for("oliverfr.of_s0_carousel_widget_v1");
  if (window[KEY] && window[KEY].version === "1.0.0") return; // 防重复注入

  function uid() {
    return `of_s0_${Date.now()}_${Math.floor(Math.random() * 1e9)}`;
  }

  function qsa(root, sel) {
    return Array.from(root.querySelectorAll(sel));
  }

  function closestFollowingButtonRow(container) {
    // 优先：同一父容器内、出现在 carousel 后面的第一个 buttonRow
    const parent = container.parentElement || document.body;
    const rows = Array.from(parent.querySelectorAll(".section0-buttonRow, .of-s0-buttonRow"));
    let best = null;
    for (const r of rows) {
      if (!r || r.dataset.ofS0Bound) continue;
      const pos = container.compareDocumentPosition(r);
      if (pos & Node.DOCUMENT_POSITION_FOLLOWING) {
        if (!best) best = r;
        else {
          const rel = r.compareDocumentPosition(best);
          if (rel & Node.DOCUMENT_POSITION_PRECEDING) best = r;
        }
      }
    }
    // fallback：向后兄弟扫描
    if (!best) {
      let el = container.nextElementSibling;
      for (let i = 0; i < 24 && el; i++) {
        if ((el.classList && el.classList.contains("section0-buttonRow")) && !el.dataset.ofS0Bound) {
          best = el;
          break;
        }
        if (el.classList && el.classList.contains("section0-carousel")) break;
        el = el.nextElementSibling;
      }
    }
    return best;
  }

  function injectScopedCssOnce() {
    const STYLE_ID = "of-s0-carousel-style-v1";
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
/* =========================
   [OF-S0] Isolated Carousel Styles (scoped)
   ========================= */

/* Desktop */
@media (min-width: 769px) {
  .of-s0-carousel{
    width: 100%;
    padding: 0 10%;
    margin: 0 auto;
    box-sizing: border-box;
    background: #f9f9f9;
    overflow-x: clip;
    overflow-y: visible;
    position: relative;
    height: 495px;
    margin-top: 55px;
  }
  .of-s0-track{
    display:flex;
    gap:15px;
    transition: transform 0.5s ease-in-out;
    justify-content:flex-start;
    will-change: transform;
  }
  .of-s0-slide{
    flex: 0 0 auto;
    width: 100%;
    position: relative;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .of-s0-slide img{
    width:1013px;
    height:495px;
    object-fit:cover;
    border-radius:16px;
    box-shadow:0 6px 20px rgba(0,0,0,.15);
    transition: transform .4s ease, opacity .4s ease;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .of-s0-carousel{
    width:100vw;
    padding-left: calc((100vw - 85vw) / 2);
    padding-right: calc((100vw - 85vw) / 2);
    overflow-x:hidden;
    margin:0 auto;
    position: relative !important;
  }
  .of-s0-track{
    display:flex;
    gap:15px;
    align-items:center;
    transition: transform 0.5s ease-in-out;
    will-change: transform;
  }
  .of-s0-slide{
    flex: 0 0 auto;
    width: 85vw;
    max-width: 400px;
    aspect-ratio: 1 / 0.7;
    overflow:hidden;
    position:relative;
  }
  .of-s0-slide img{
    width:100%;
    height:100%;
    object-fit:cover;
    display:block;
    filter:none !important;
    opacity:1 !important;
  }
}

/* =========================
   Dots + Play (scoped)
   ========================= */
.of-s0-buttonRow{
  width: min(920px, 92vw);
  height: 44px;
  margin: 15px auto 16px auto;
  position: relative;
  z-index: 999;
  background: transparent;
  border: none;
  box-shadow: none;
}
.of-s0-buttonRow.is-hidden{
  opacity: 0;
  transform: translateY(-10px) scale(.96);
  pointer-events: none;
}
.of-s0-btn-container{
  position:absolute;
  top:50%;
  opacity:1;
  pointer-events:auto;
}
.of-s0-leftBtnContainer{
  left:50%;
  transform: translate(-50%, -50%);
}
.of-s0-rightBtnContainer{
  right:10px;
  left:auto;
  transform: translateY(-50%);
}
.of-s0-leftCapsule{
  width:auto;
  height:auto;
  background:transparent;
  border:none;
  border-radius:0;
  display:flex;
  align-items:center;
  justify-content:center;
}
.of-s0-dots{
  display:flex;
  align-items:center;
  gap:10px;
  padding:0 14px;
  user-select:none;
}
.of-s0-dot{
  --dotS:6px;
  --pillW:44px;
  --pillH:8px;
  --p:0;

  width:var(--dotS);
  height:var(--dotS);
  border-radius:999px;
  background:rgba(0,0,0,.30);
  opacity:.85;
  cursor:pointer;
  position:relative;
  overflow:hidden;
  transform: translateZ(0);
  transition:
    width .34s cubic-bezier(.22,.61,.36,1),
    height .34s cubic-bezier(.22,.61,.36,1),
    background-color .22s ease,
    opacity .22s ease;
}
.of-s0-dot::after{
  content:"";
  position:absolute;
  inset:0;
  border-radius:999px;
  background:rgba(0,0,0,.80);
  transform-origin:left center;
  transform: scaleX(var(--p));
  opacity:0;
  transition: opacity .18s ease;
  box-shadow: inset 0 0 0 0 rgba(0,0,0,0);
}
.of-s0-dot.is-active{
  width:var(--pillW);
  height:var(--pillH);
  background:rgba(0,0,0,.16);
  opacity:1;
}
.of-s0-dot.is-active::after{
  opacity:1;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.10);
}
.of-s0-dot.is-active.is-charge{
  width:var(--dotS);
  height:var(--dotS);
  background:rgba(0,0,0,.40);
  opacity:.95;
}

.of-s0-rightButton{
  width:34px;
  height:34px;
  border:none;
  border-radius:50%;
  background:rgba(0,0,0,.06);
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  box-shadow:0 10px 22px rgba(0,0,0,.18);
  transition: transform .18s ease, opacity .18s ease, background-color .18s ease, box-shadow .18s ease;
  user-select:none;
}
.of-s0-rightButton:hover{
  background:rgba(0,0,0,.08);
  box-shadow:0 12px 26px rgba(0,0,0,.20);
}
.of-s0-rightButton:active{ transform: scale(.96); }

.of-s0-playIcon{
  font-size:14px;
  line-height:1;
  color:rgba(0,0,0,.62);
  letter-spacing:-1px;
  user-select:none;
  transform: translateX(1px);
}
`.trim();
    document.head.appendChild(style);
  }

  function isolateDom(container, buttonRow, instanceId) {
    // 给容器和控制条打 scope 标记
    container.dataset.ofS0Scope = instanceId;
    buttonRow.dataset.ofS0Scope = instanceId;

    // 1) 去掉本实例内所有 section0-* 的 id（避免重复 id 导致跨脚本抢绑）
    const idKills = new Set([
      "section0-buttonRow",
      "leftBtnContainer",
      "rightBtnContainer",
      "section0-leftCapsule",
      "section0-dotsWrap",
      "section0-rightButton",
      "section0-playIcon",
    ]);

    function stripIds(root) {
      const all = qsa(root, "[id]");
      all.forEach((el) => {
        const id = el.id || "";
        if (idKills.has(id) || id.startsWith("section0-")) {
          el.setAttribute("data-of-s0-old-id", id);
          el.id = ""; // 直接清空：从根源避免冲突
        }
      });
    }

    stripIds(container);
    stripIds(buttonRow);

    // 2) 把 class 从 section0-* 迁移到 of-s0-*（只改本实例，避免其它脚本用 .section0-* 命中你这个轮播）
    container.classList.remove("section0-carousel");
    container.classList.add("of-s0-carousel");

    const track = container.querySelector(".section0-track");
    if (track) {
      track.classList.remove("section0-track");
      track.classList.add("of-s0-track");
    }

    qsa(container, ".section0-slide").forEach((s) => {
      s.classList.remove("section0-slide");
      s.classList.add("of-s0-slide");
    });

    buttonRow.classList.remove("section0-buttonRow");
    buttonRow.classList.add("of-s0-buttonRow");

    const leftBtnContainer =
      buttonRow.querySelector("#leftBtnContainer,[data-of-s0-old-id='leftBtnContainer'],.btn-container") || null;
    const rightBtnContainer =
      buttonRow.querySelector("#rightBtnContainer,[data-of-s0-old-id='rightBtnContainer'],.btn-container") || null;

    if (leftBtnContainer) {
      leftBtnContainer.classList.add("of-s0-btn-container", "of-s0-leftBtnContainer");
      leftBtnContainer.classList.remove("btn-container");
    }
    if (rightBtnContainer) {
      rightBtnContainer.classList.add("of-s0-btn-container", "of-s0-rightBtnContainer");
      rightBtnContainer.classList.remove("btn-container");
    }

    const leftCapsule =
      buttonRow.querySelector("#section0-leftCapsule,[data-of-s0-old-id='section0-leftCapsule']") || null;
    if (leftCapsule) leftCapsule.classList.add("of-s0-leftCapsule");

    const dotsWrap =
      buttonRow.querySelector("#section0-dotsWrap,[data-of-s0-old-id='section0-dotsWrap'],.dots") || null;
    if (dotsWrap) {
      dotsWrap.classList.add("of-s0-dots");
      dotsWrap.classList.remove("dots");
      qsa(dotsWrap, ".dot").forEach((d) => {
        d.classList.add("of-s0-dot");
        d.classList.remove("dot");
      });
    }

    const rightButton =
      buttonRow.querySelector("#section0-rightButton,[data-of-s0-old-id='section0-rightButton'],[aria-label='Play/Pause']") || null;
    if (rightButton) rightButton.classList.add("of-s0-rightButton");

    const playIcon =
      buttonRow.querySelector("#section0-playIcon,[data-of-s0-old-id='section0-playIcon']") || (rightButton ? rightButton.querySelector("span") : null);
    if (playIcon) playIcon.classList.add("of-s0-playIcon");

    return { track, dotsWrap, rightButton, playIcon };
  }

  function createCarousel(container) {
    const buttonRow = closestFollowingButtonRow(container);
    if (!buttonRow) return null;

    const instanceId = uid();

    injectScopedCssOnce();
    const { track, dotsWrap, rightButton, playIcon } = isolateDom(container, buttonRow, instanceId);

    if (!track || !dotsWrap) return null;

    // ===== 原有逻辑：参数保持不变 =====
    const ENABLE_OPEN_LINK = false;
    const LINK_URL = "https://oliverfr.com/agent-test.html";

    const TRANSITION_MS = 720;
    const SWIPE_PX_DESK = 50;
    const SWIPE_PX_MOB = 35;

    const DOT_CHARGE_MS = 240;
    const DOT_STRETCH_MS = 320;
    const DOT_PROGRESS_MS = 4600;

    // ===== Build triple clones =====
    let originalSlides = Array.from(track.querySelectorAll(".of-s0-slide"));
    const realCount = originalSlides.length;
    if (!realCount) return null;

    function syncDotsCount() {
      const exist = Array.from(dotsWrap.querySelectorAll(".of-s0-dot"));
      if (exist.length === realCount) return;
      dotsWrap.innerHTML = "";
      for (let i = 0; i < realCount; i++) {
        const d = document.createElement("div");
        d.className = "of-s0-dot";
        d.dataset.index = String(i);
        dotsWrap.appendChild(d);
      }
    }

    function cloneTriple() {
      if (realCount <= 1) return;
      const base = originalSlides.map((n) => n.cloneNode(true));
      track.innerHTML = "";
      for (let pass = 0; pass < 3; pass++) {
        for (let i = 0; i < base.length; i++) {
          const node = base[i].cloneNode(true);
          node.dataset.realIndex = String(i);
          node.dataset.pass = String(pass);
          track.appendChild(node);
        }
      }
    }

    syncDotsCount();
    cloneTriple();

    let slides = Array.from(track.querySelectorAll(".of-s0-slide"));
    let currentPos = realCount > 1 ? realCount : 0;

    // ===== Measurements (关键：用 offsetWidth，避免 transform/scale 导致 span 漂移，从而 gap 看起来不恒定) =====
    let slideSpan = 0;
    let centerOffset = 0;
    let centerBias = 0;

    function getGapPx() {
      const cs = getComputedStyle(track);
      const raw = (cs.gap && cs.gap !== "normal") ? cs.gap : (cs.columnGap || "0px");
      const g = parseFloat(raw || "0");
      return Number.isFinite(g) ? g : 0;
    }

    function recalcSpan() {
      if (!slides.length) return 0;

      const idx = Math.min(Math.max(currentPos, 0), slides.length - 1);
      const el = slides[idx];

      // ✅ 用 offsetWidth：不受 transform scale 影响
      const w = el ? (el.offsetWidth || 0) : 0;

      const gap = getGapPx();
      const span = w + gap;
      slideSpan = (Number.isFinite(span) && span > 0) ? span : 0;

      // ✅ 用 container.clientWidth（含 padding），保持左右 peek 对称
      const viewportW = container.clientWidth || 0;
      centerOffset = (viewportW && w) ? ((viewportW - w) / 2) : 0;
      if (!Number.isFinite(centerOffset)) centerOffset = 0;

      return slideSpan;
    }

    function applyTransform(animated) {
      if (!slideSpan) recalcSpan();
      if (!slideSpan || !Number.isFinite(slideSpan)) return;

      track.style.transition = animated
        ? `transform ${TRANSITION_MS}ms cubic-bezier(.22,.61,.36,1)`
        : "none";

      const tx = (centerOffset + centerBias) - (currentPos * slideSpan);
      track.style.transform = `translateX(${tx.toFixed(4)}px)`;
    }

    function getRealIndex() {
      if (realCount <= 1) return 0;
      const el = slides[currentPos];
      const ri = el ? parseInt(el.dataset.realIndex || "0", 10) : 0;
      return Number.isFinite(ri) ? ri : 0;
    }

    function updateCenterClasses() {
      slides.forEach((s) => s.classList.remove("is-center", "is-neighbor"));
      const center = slides[currentPos];
      const left = slides[currentPos - 1];
      const right = slides[currentPos + 1];
      if (center) center.classList.add("is-center");
      if (left) left.classList.add("is-neighbor");
      if (right) right.classList.add("is-neighbor");
    }

    function normalizePositionIfNeeded() {
      if (realCount <= 1) return false;

      let changed = false;
      if (currentPos >= realCount * 2) {
        currentPos -= realCount;
        changed = true;
      }
      if (currentPos < realCount) {
        currentPos += realCount;
        changed = true;
      }
      if (changed) applyTransform(false);
      updateCenterClasses();
      return changed;
    }

    // 手机端对称校准（保留你原先策略，但只作用于本实例）
    function applyMobileSymmetryBiasOnce() {
      if (window.innerWidth > 768) return;
      if (!slides.length || !slideSpan) return;

      const s = slides[currentPos];
      if (!s) return;

      const cr = container.getBoundingClientRect();
      const sr = s.getBoundingClientRect();
      const err = (cr.left + cr.width / 2) - (sr.left + sr.width / 2);

      if (!Number.isFinite(err)) return;
      if (Math.abs(err) < 0.35) return;

      centerBias = Math.max(-2000, Math.min(2000, centerBias + err));
      track.style.transition = "none";
      const tx = (centerOffset + centerBias) - (currentPos * slideSpan);
      track.style.transform = `translateX(${tx.toFixed(4)}px)`;
    }

    // ===== Dot physics + progress =====
    let isPlaying = true;
    let isMoving = false;

    let rafId = 0;
    let chargeTimer = 0;
    let cycleToken = 0;
    let activeDotIdx = 0;

    function dotsAll() {
      return Array.from(dotsWrap.querySelectorAll(".of-s0-dot"));
    }

    function resetAllDots() {
      dotsAll().forEach((d) => {
        d.classList.remove("is-active", "is-charge");
        d.style.setProperty("--p", "0");
      });
    }

    function activateDot(idx) {
      const dots = dotsAll();
      resetAllDots();
      const d = dots[idx];
      if (!d) return;

      activeDotIdx = idx;
      d.classList.add("is-active", "is-charge");
      d.style.setProperty("--p", "0");

      clearTimeout(chargeTimer);
      chargeTimer = setTimeout(() => {
        d.classList.remove("is-charge");
      }, DOT_CHARGE_MS);
    }

    function setDotProgress(idx, p) {
      const dots = dotsAll();
      const d = dots[idx];
      if (!d) return;
      d.style.setProperty("--p", String(Math.max(0, Math.min(1, p))));
    }

    function stopProgressLoop() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    }

    function startProgressCycle() {
      stopProgressLoop();
      if (!isPlaying || document.hidden || realCount <= 1) return;
      if (isMoving) return;

      const myToken = ++cycleToken;
      const idx = getRealIndex();
      activateDot(idx);

      const startAt = performance.now();
      const effectiveStart = startAt + DOT_CHARGE_MS + DOT_STRETCH_MS;

      function tick(now) {
        if (myToken !== cycleToken) return;
        if (!isPlaying || document.hidden) { stopProgressLoop(); return; }
        if (isMoving) { stopProgressLoop(); return; }

        const t = now - effectiveStart;
        const p = t <= 0 ? 0 : (t / DOT_PROGRESS_MS);
        setDotProgress(activeDotIdx, p);

        if (p >= 1) {
          stopProgressLoop();
          next(true);
          return;
        }
        rafId = requestAnimationFrame(tick);
      }

      rafId = requestAnimationFrame(tick);
    }

    // ===== Navigation =====
    let moveDoneTimer = 0;

    function endMoveSafely() {
      if (!isMoving) return;
      isMoving = false;

      clearTimeout(moveDoneTimer);
      moveDoneTimer = 0;

      normalizePositionIfNeeded();
      hardSyncLayout();

      if (isPlaying && !document.hidden) startProgressCycle();
    }

    function moveToPos(newPos, animated) {
      if (realCount <= 1) return;

      stopProgressLoop();
      clearTimeout(moveDoneTimer);

      currentPos = newPos;
      isMoving = !!animated;

      applyTransform(!!animated);
      updateCenterClasses();

      if (!animated) {
        isMoving = false;
        if (isPlaying && !document.hidden) startProgressCycle();
        return;
      }

      moveDoneTimer = setTimeout(endMoveSafely, TRANSITION_MS + 90);
    }

    function next() {
      if (realCount <= 1) return;
      if (isMoving) return;
      moveToPos(currentPos + 1, true);
    }

    function prev() {
      if (realCount <= 1) return;
      if (isMoving) return;
      moveToPos(currentPos - 1, true);
    }

    function goToRealIndex(realIdx) {
      if (realCount <= 1) return;
      if (!Number.isFinite(realIdx)) return;
      moveToPos(realCount + realIdx, true);
    }

    track.addEventListener("transitionend", (e) => {
      if (e.propertyName !== "transform") return;
      endMoveSafely();
    });

    // ===== Play/Pause =====
    function updatePlayButtonUI() {
      if (!playIcon) return;
      playIcon.textContent = isPlaying ? "❚❚" : "►";
    }

    function play() {
      isPlaying = true;
      updatePlayButtonUI();
      startProgressCycle();
    }

    function pause() {
      isPlaying = false;
      updatePlayButtonUI();
      stopProgressLoop();
    }

    if (rightButton) {
      rightButton.addEventListener("click", () => {
        if (isPlaying) pause();
        else play();
      });
    }

    // Dots click
    dotsWrap.addEventListener("click", (e) => {
      const t = e.target;
      if (!t || !t.classList || !t.classList.contains("of-s0-dot")) return;
      const idx = parseInt(t.getAttribute("data-index") || "0", 10);
      if (!Number.isFinite(idx)) return;

      const wasPlaying = isPlaying;
      goToRealIndex(idx);
      if (!wasPlaying) pause();
    });

    // Slide click behavior
    track.addEventListener("click", (e) => {
      const slide = e.target && e.target.closest ? e.target.closest(".of-s0-slide") : null;
      if (!slide) return;

      const idx = slides.indexOf(slide);
      if (idx < 0) return;

      if (idx === currentPos) {
        if (ENABLE_OPEN_LINK) window.open(LINK_URL, "_blank", "noopener");
        else (isPlaying ? pause() : play());
        return;
      }

      pause();
      if (idx < currentPos) prev(true);
      else next(true);
    });

    // Touch swipe
    let sx = 0, sy = 0, ex = 0, ey = 0;

    track.addEventListener("touchstart", (e) => {
      const t = e.touches && e.touches[0];
      if (!t) return;
      sx = t.clientX;
      sy = t.clientY;
    }, { passive: true });

    track.addEventListener("touchend", (e) => {
      const t = e.changedTouches && e.changedTouches[0];
      if (!t) return;
      ex = t.clientX;
      ey = t.clientY;

      const dx = ex - sx;
      const dy = ey - sy;

      if (Math.abs(dx) <= Math.abs(dy)) return;

      const thr = (window.innerWidth <= 768) ? SWIPE_PX_MOB : SWIPE_PX_DESK;
      if (Math.abs(dx) < thr) return;

      pause();
      if (dx < 0) next(true);
      else prev(true);
    }, { passive: true });

    // ButtonRow show/hide
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        buttonRow.classList.toggle("is-hidden", !entry.isIntersecting);
      });
    }, { threshold: 0 });
    observer.observe(container);

    window.addEventListener("scroll", () => {
      const br = buttonRow.getBoundingClientRect();
      buttonRow.style.transform = (br.bottom > window.innerHeight)
        ? "translateY(-180px)"
        : (buttonRow.classList.contains("is-hidden") ? "translateY(-10px) scale(.96)" : "");
    }, { passive: true });

    function hardSyncLayout() {
      let tries = 0;
      function tryMeasure() {
        tries++;
        const span = recalcSpan();
        if (span && span > 0) {
          applyTransform(false);
          normalizePositionIfNeeded();
          applyTransform(false);
          updateCenterClasses();
          requestAnimationFrame(() => applyMobileSymmetryBiasOnce());
          return;
        }
        if (tries < 6) requestAnimationFrame(tryMeasure);
      }
      tryMeasure();
    }

    function waitImagesReady() {
      const imgs = Array.from(track.querySelectorAll("img"));
      const tasks = imgs.map((img) => {
        if (!img) return Promise.resolve();
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        if (img.decode) return img.decode().catch(() => {});
        return new Promise((res) => {
          img.addEventListener("load", () => res(), { once: true });
          img.addEventListener("error", () => res(), { once: true });
        });
      });
      return Promise.all(tasks);
    }

    async function init() {
      updatePlayButtonUI();
      await waitImagesReady();

      hardSyncLayout();
      applyTransform(false);
      normalizePositionIfNeeded();
      applyTransform(false);
      updateCenterClasses();

      resetAllDots();
      activateDot(getRealIndex());

      if (isPlaying) startProgressCycle();
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopProgressLoop();
        clearTimeout(moveDoneTimer);
        moveDoneTimer = 0;
      } else {
        hardSyncLayout();
        if (isPlaying) startProgressCycle();
      }
    });

    window.addEventListener("pageshow", () => {
      hardSyncLayout();
      updatePlayButtonUI();
      if (!document.hidden && isPlaying) startProgressCycle();
    });

    window.addEventListener("resize", () => {
      centerBias = 0;
      hardSyncLayout();
    });

    if (document.readyState === "complete") init();
    else window.addEventListener("load", init, { once: true });

    // 标记绑定完成
    buttonRow.dataset.ofS0Bound = instanceId;

    // 返回实例（未来可扩展 destroy）
    return { instanceId };
  }

  function mount(mountSelector) {
    const sel = mountSelector || "[data-of-s0='1']";
    const list = Array.from(document.querySelectorAll(sel));

    // 如果用户没加 data-of-s0，又只有一个 section0-carousel，则兜底挂载它
    const targets = list.length
      ? list
      : (document.querySelectorAll(".section0-carousel").length === 1
        ? [document.querySelector(".section0-carousel")]
        : []);

    targets.forEach((c) => {
      try { createCarousel(c); } catch (e) { console.warn("[of-s0] mount error:", e); }
    });
  }

  // 暴露一个极小的全局入口（不污染其它命名空间）
  window[KEY] = { version: "1.0.0", mount };

  // 自动挂载：优先 data-of-s0=1；否则仅在“唯一一个 section0-carousel”时兜底挂载
  mount();
})();
