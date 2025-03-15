/***************************************************
 * scripts.js
 ***************************************************/
function waitImagesLoaded(images, callback) {let loadedCount = 0, total = images.length; function checkDone() {loadedCount++; if(loadedCount>=total){callback();}} images.forEach(img=>{if(img.complete){checkDone();} else {img.addEventListener("load", checkDone); img.addEventListener("error", checkDone);}}); if(total===0) callback();}
const initHeroCarousel = () => {
  const heroSlides = document.getElementById('hero-slides'), dots = document.querySelectorAll('.hero-dots .dot');
  if (!heroSlides || !dots.length) return;
  let currentIndex = 0, totalSlides = heroSlides.children.length;
  const updateSlide = () => { currentIndex = (currentIndex+1)%totalSlides; heroSlides.style.transform = `translateX(-${currentIndex*100}%)`; dots.forEach((dot,index)=>{ dot.classList.toggle('active', index===currentIndex); }); };
  dots.forEach((dot,index)=>{ dot.addEventListener('click', ()=>{ currentIndex = index; heroSlides.style.transform = `translateX(-${currentIndex*100}%)`; dots.forEach((d,i)=>{ d.classList.toggle('active', i===currentIndex); }); }); });
  setInterval(updateSlide,5000);
};
const initEmailJS = () => {
  if(typeof emailjs==='undefined') return;
  emailjs.init("HXCThZROMytOt-wyp");
  const contactForm = document.getElementById("contactForm");
  if(contactForm) { contactForm.addEventListener("submit", e => { e.preventDefault(); emailjs.sendForm("service_1ffkva1","template_ypdj9n9", contactForm).then(() => { alert("邮件已发送成功，我们将尽快与您联系！"); contactForm.reset(); }).catch(err => { console.error("邮件发送失败：", err); alert("邮件发送失败，请稍后再试。"); }); }); }
};
const initCompareFeature = () => {
  const compareBtn = document.querySelector(".compare-features .btn");
  compareBtn && compareBtn.addEventListener("click", ()=>{ alert("对比功能暂未实现 (预留)！"); });
};
const initHamburgerMenu = () => {
  const menuIcon = document.getElementById('menuIcon'), mobileNav = document.getElementById('mobileNav'), closeBtn = document.getElementById('closeBtn');
  if(!menuIcon || !mobileNav || !closeBtn) return;
  menuIcon.addEventListener('click', ()=>{ mobileNav.classList.add('active'); });
  closeBtn.addEventListener('click', ()=>{ mobileNav.classList.remove('active'); });
  mobileNav.querySelectorAll('ul li a').forEach(link=>{ link.addEventListener('click', ()=>{ mobileNav.classList.remove('active'); }); });
};
const initModalWindows = () => {
  document.querySelectorAll('[data-modal-target]').forEach(trigger=>{ trigger.addEventListener('click', ()=>{ const modal = document.querySelector(trigger.getAttribute('data-modal-target')); if(modal) modal.classList.add('active'); }); });
  document.querySelectorAll('[data-modal-close]').forEach(btn=>{ btn.addEventListener('click', ()=>{ const parentModal = btn.closest('.modal'); if(parentModal) parentModal.classList.remove('active'); }); });
};
const initInfiniteScroller = () => {
  const scroller = document.getElementById('infiniteScroller'), pauseBtn = document.querySelector('.pause-btn');
  if(!scroller || !pauseBtn) return;
  const images = ["A peaceful brookside setting.png", "A scenic riverside bend.png", "A serene coastal shore.png", "A shaded forest path.png"];
  let isPaused = false, speed = 0.3, lastTimestamp = 0, itemsOnScreen = [];
  let track = document.createElement('div');
  track.className = 'infinite-scroller-track';
  track.style.display = 'flex'; track.style.position = 'relative'; track.style.transform = 'translateX(0)';
  scroller.appendChild(track);
  for(let i=0; i<2; i++){
    images.forEach(src=>{ createItem(src); });
  }
  function createItem(src) {
    const imgContainer = document.createElement('div');
    imgContainer.className = 'infinite-scroller-item';
    imgContainer.style.position = 'absolute'; imgContainer.style.width = '100%';
    const img = document.createElement('img');
    img.src = src; img.alt = src; img.style.width = '100%'; img.style.objectFit = 'cover';
    imgContainer.appendChild(img); track.appendChild(imgContainer);
    const offset = itemsOnScreen.length===0 ? 0 : (itemsOnScreen[itemsOnScreen.length-1].x + imgContainer.offsetWidth);
    imgContainer.style.left = `${offset}px`;
    itemsOnScreen.push({el: imgContainer, x: offset, width: imgContainer.offsetWidth});
  }
  function animate(ts) {
    if(!isPaused) {
      const delta = ts - lastTimestamp; lastTimestamp = ts;
      const moveDist = speed * (delta/16.67);
      itemsOnScreen.forEach(item=>{ item.x -= moveDist; item.el.style.left = `${item.x}px`; });
      const lastItem = itemsOnScreen[itemsOnScreen.length-1];
      if(lastItem.x+lastItem.width < window.innerWidth+100) { createItem(images[itemsOnScreen.length % images.length]); }
    }
    requestAnimationFrame(animate);
  }
  pauseBtn.classList.remove('paused');
  pauseBtn.addEventListener('click', ()=>{ isPaused = !isPaused; pauseBtn.classList.toggle('paused'); });
  requestAnimationFrame(animate);
  // 修复滚动左侧空白
  document.addEventListener("DOMContentLoaded", function() {
    const s = document.getElementById("infiniteScroller"), t = document.querySelector(".infinite-scroller-track");
    if(s && t) { t.style.transform = "translateX(0)"; s.innerHTML += s.innerHTML; }
    const pb = document.getElementById("pauseBtn");
    let p = false;
    pb.addEventListener("click", function() { p = !p; s.style.animationPlayState = p ? "paused" : "running"; pb.textContent = p ? "▶" : "❚❚"; });
    pb.textContent = "❚❚";
  });
  document.addEventListener("DOMContentLoaded", function() { const t = document.querySelector(".infinite-scroller-track"); t && (t.style.transform = "translateX(0)"); });
};
const initProductImageClick = () => {
  document.querySelectorAll('.product-card img').forEach(image => {
    image.addEventListener('click', ()=>{ const p = image.alt.toLowerCase().replace(/\s+/g,'-')+".html"; window.location.href = p; });
  });
};
const initFlipCards = () => {
  document.querySelectorAll('.flip-btn-front').forEach(btn => { btn.addEventListener('click', ()=>{ btn.closest('.card').style.transform = 'rotateY(180deg)'; }); });
  document.querySelectorAll('.flip-btn-back').forEach(btn => { btn.addEventListener('click', ()=>{ btn.closest('.card').style.transform = 'rotateY(0deg)'; }); });
};
const initFrameAnimation = () => {
  const canvas = document.getElementById('animationCanvas'), ctx = canvas?.getContext('2d');
  if(!canvas || !ctx) return;
  const images = ["A young man standing in a natural landscape1.png", "A young man standing in a natural landscape2.png", "A young man standing in a natural landscape3.png"];
  let imageObjects = [], frameIndex = 0, isPlaying = true, alpha = 0, fadeSpeed = 0.02, frameInterval = 1000/24, lastFrameTime = 0, imagesLoaded = 0;
  const playPauseButton = document.getElementById('playPauseButton');
  images.forEach((src, index)=>{ let img = new Image(); img.src = src; img.onload = () => { imageObjects[index] = img; imagesLoaded++; if(imagesLoaded===1){ requestAnimationFrame(drawFrame); } }; img.onerror = () => console.error(`❌ 图片加载失败: ${src}`); });
  function resizeCanvas() { if(!canvas)return; const isDesktop = window.innerWidth >= 1024; if(isDesktop){ canvas.width = window.innerWidth; canvas.height = window.innerHeight*0.75; } else { canvas.width = window.innerWidth; canvas.height = window.innerHeight*0.6; } }
  window.addEventListener('resize', resizeCanvas); resizeCanvas();
  function drawFrame(timestamp) {
    if(!isPlaying || imagesLoaded===0) return;
    if(!canvas || !ctx)return;
    if(timestamp - lastFrameTime > frameInterval) {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      let nextFrameIndex = (frameIndex+1)%images.length;
      if(imageObjects[frameIndex]){ ctx.globalAlpha = 1-alpha; drawImageCover(imageObjects[frameIndex]); }
      if(imageObjects[nextFrameIndex]){ ctx.globalAlpha = alpha; drawImageCover(imageObjects[nextFrameIndex]); }
      alpha += fadeSpeed; if(alpha>=1){ alpha = 0; frameIndex = nextFrameIndex; } lastFrameTime = timestamp;
    }
    requestAnimationFrame(drawFrame);
  }
  function drawImageCover(img) {
    const canvasRatio = canvas.width/canvas.height, imgRatio = img.width/img.height;
    let drawWidth, drawHeight, offsetX, offsetY;
    if(imgRatio>canvasRatio){ drawHeight = canvas.height*0.9; drawWidth = img.width*(drawHeight/img.height); offsetX = (canvas.width-drawWidth)/2; offsetY = (canvas.height-drawHeight)/2; }
    else { drawWidth = canvas.width; drawHeight = img.height*(drawWidth/img.width); offsetX = 0; offsetY = (canvas.height-drawHeight)/2; }
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }
  playPauseButton?.addEventListener('click', ()=>{ isPlaying = !isPlaying; playPauseButton.textContent = isPlaying ? "❚❚" : "▶"; if(isPlaying) requestAnimationFrame(drawFrame); });
};
const initTouch1CarouselTrack = () => {
  const track = document.querySelector(".touch1-carousel-track"), slides = Array.from(track?.children||[]), prevBtn = document.querySelector(".touch1-prev-btn"), nextBtn = document.querySelector(".touch1-next-btn");
  if(!track || slides.length===0 || !prevBtn || !nextBtn) return;
  let currentIndex = 0, slideWidth = 615+15;
  function updateCarousel(){ track.style.transform = `translateX(-${currentIndex*slideWidth}px)`; prevBtn.disabled = (currentIndex===0); nextBtn.disabled = (currentIndex===slides.length-1); }
  prevBtn.addEventListener("click", ()=>{ if(currentIndex>0){ currentIndex--; updateCarousel(); } });
  nextBtn.addEventListener("click", ()=>{ if(currentIndex<slides.length-1){ currentIndex++; updateCarousel(); } });
  updateCarousel();
};
document.addEventListener('DOMContentLoaded', ()=>{ initHeroCarousel(); initEmailJS(); initCompareFeature(); initHamburgerMenu(); initModalWindows(); initInfiniteScroller(); initProductImageClick(); initFlipCards(); initFrameAnimation(); initTouch1CarouselTrack(); });
