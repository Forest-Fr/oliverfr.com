<script>
/***************************************************
 * scripts.js (整合版)
 * -----------------------------------------------
 * 1. Hero轮播：全屏 100vh (PC端) 自动切换
 * 2. EmailJS表单提交
 * 3. 对比按钮(预留)
 * 4. 汉堡菜单逻辑
 * 5. 模态窗口
 * 6. 无限滚动(独立IIFE) + 暂停按钮
 * 7. 图片点击跳转
 * 8. 翻转卡片
 * 9. 帧动画(滚动触发 + 播放/暂停)
 * 10. slider1 轮播
 * 11. touch1 轮播
 ***************************************************/


/* ========== 1) Hero轮播功能 ========== */
function initHeroCarousel() {
  const heroSlides = document.getElementById('hero-slides');
  const dots = document.querySelectorAll('.hero-dots .dot');
  if (!heroSlides || dots.length === 0) return;

  let currentIndex = 0;
  const totalSlides = heroSlides.children.length;

  const updateSlide = () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    heroSlides.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      heroSlides.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === currentIndex);
      });
    });
  });

  setInterval(updateSlide, 5000);
}


/* ========== 2) EmailJS 表单提交 ========== */
function initEmailJS() {
  if (typeof emailjs === 'undefined') return;
  emailjs.init("HXCThZROMytOt-wyp");

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      emailjs.sendForm("service_1ffkva1", "template_ypdj9n9", contactForm)
        .then(() => {
          alert("邮件已发送成功，我们将尽快与您联系！");
          contactForm.reset();
        })
        .catch((err) => {
          console.error("邮件发送失败：", err);
          alert("邮件发送失败，请稍后再试。");
        });
    });
  }
}


/* ========== 3) 预留对比按钮 ========== */
function initCompareFeature() {
  const compareBtn = document.querySelector(".compare-features .btn");
  if (compareBtn) {
    compareBtn.addEventListener("click", () => {
      alert("对比功能暂未实现 (预留)！");
    });
  }
}


/* ========== 4) 汉堡菜单 ========== */
function initHamburgerMenu() {
  const menuIcon = document.getElementById('menuIcon');
  const mobileNav = document.getElementById('mobileNav');
  const closeBtn = document.getElementById('closeBtn');
  if (!menuIcon || !mobileNav || !closeBtn) return;

  menuIcon.addEventListener('click', () => {
    mobileNav.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    mobileNav.classList.remove('active');
  });

  const navLinks = mobileNav.querySelectorAll('ul li a');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
    });
  });
}


/* ========== 5) 模态窗口 ========== */
function initModalWindows() {
  document.querySelectorAll('[data-modal-target]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modal = document.querySelector(trigger.getAttribute('data-modal-target'));
      if (modal) modal.classList.add('active');
    });
  });

  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const parentModal = btn.closest('.modal');
      if (parentModal) parentModal.classList.remove('active');
    });
  });
}


/* 
  ========== 6) 无限滚动 + Apple 风格暂停按钮 ==========

  用 IIFE 封装, 暴露 initInfiniteScroller() 到 window, 
  以防止和其它脚本同名冲突
*/
(function(){
  "use strict";

  // 对外公开
  window.initInfiniteScroller = function(){
    const scroller = document.getElementById('infiniteScroller');
    const pauseBtn = document.querySelector('.pause-btn');
    if(!scroller || !pauseBtn) return;

    const images = [
      "A peaceful brookside setting.png",
      "A scenic riverside bend.png",
      "A serene coastal shore.png",
      "A shaded forest path.png"
    ];

    let isPaused = false;
    let speed = 0.3;  
    let lastTimestamp = 0;
    let itemsOnScreen = [];
    let track = null;

    // 防止重复
    if(scroller.querySelector('.infinite-scroller-track')){
      return;
    }

    // 创建轨道
    track = document.createElement('div');
    track.className = 'infinite-scroller-track';
    track.style.display = 'flex';
    track.style.position = 'relative';
    track.style.transform = 'translateX(0)';
    scroller.appendChild(track);

    // 插入双倍图片
    for(let i=0; i<2; i++){
      images.forEach(src => createItem(src));
    }

    function createItem(imageSrc){
      const imgContainer = document.createElement('div');
      imgContainer.className = 'infinite-scroller-item';
      imgContainer.style.position = 'absolute';
      imgContainer.style.visibility = 'hidden';

      const img = new Image();
      img.src = imageSrc;
      img.alt = imageSrc;
      img.style.width = '100%';
      img.style.objectFit = 'cover';

      img.onload = function(){
        const w = imgContainer.offsetWidth; 
        const offsetX = (itemsOnScreen.length===0)
          ? 0
          : (itemsOnScreen[itemsOnScreen.length-1].x + 
             itemsOnScreen[itemsOnScreen.length-1].width);
        imgContainer.style.left = offsetX + 'px';
        imgContainer.style.visibility = 'visible';
        itemsOnScreen.push({
          el: imgContainer,
          x: offsetX,
          width: w||300
        });
      };

      imgContainer.appendChild(img);
      track.appendChild(imgContainer);
    }

    function animate(timestamp){
      if(!isPaused){
        const delta = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        const moveDist = speed * (delta/16.67);

        itemsOnScreen.forEach(item=>{
          item.x -= moveDist;
          item.el.style.left = item.x + 'px';
        });

        const lastItem = itemsOnScreen[itemsOnScreen.length-1];
        if(lastItem.x + lastItem.width < window.innerWidth+100){
          createItem(images[ itemsOnScreen.length % images.length ]);
        }
      }
      requestAnimationFrame(animate);
    }

    // 暂停按钮
    pauseBtn.classList.remove('paused');
    pauseBtn.addEventListener('click', ()=>{
      isPaused = !isPaused;
      pauseBtn.classList.toggle('paused');
    });

    requestAnimationFrame(animate);
  };

  // 若原脚本有 scroller.innerHTML += scroller.innerHTML; 
  // 在这里加个检查
  window.handleExtraDuplicate = function(){
    const scroller = document.getElementById("infiniteScroller");
    const track = scroller? scroller.querySelector(".infinite-scroller-track"): null;
    if(scroller && !track){
      scroller.innerHTML += scroller.innerHTML;
      scroller.style.overflow="hidden";
    }
    if(track){
      track.style.transform="translateX(0)";
    }
  };

})();


/* ========== 7) 图片点击跳转 ========== */
function initProductImageClick() {
  document.querySelectorAll('.product-card img').forEach(image => {
    image.addEventListener('click', () => {
      const productPage = image.alt.toLowerCase().replace(/\s+/g, '-') + ".html";
      window.location.href = productPage;
    });
  });
}


/* ========== 8) 翻转卡片功能 ========== */
function initFlipCards() {
  document.querySelectorAll('.flip-btn-front').forEach(flipBtn => {
    flipBtn.addEventListener('click', () => {
      flipBtn.closest('.card').style.transform = 'rotateY(180deg)';
    });
  });

  document.querySelectorAll('.flip-btn-back').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      closeBtn.closest('.card').style.transform = 'rotateY(0deg)';
    });
  });
}


/* ========== 9) 帧动画 ========== */
function initFrameAnimation() {
  const canvas = document.getElementById('animationCanvas');
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) return;

  const images = [
    "A young man standing in a natural landscape1.png",
    "A young man standing in a natural landscape2.png",
    "A young man standing in a natural landscape3.png"
  ];

  let imageObjects = [];
  let frameIndex = 0;
  let isPlaying = true;
  let alpha = 0;
  let fadeSpeed = 0.02;
  let frameInterval = 1000 / 24; 
  let lastFrameTime = 0;
  let imagesLoaded = 0;

  const playPauseButton = document.getElementById('playPauseButton');
  const animationContainer = document.getElementById('animationContainer');

  let lastScrollTop = 0;

  images.forEach((src, index) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      imageObjects[index] = img;
      imagesLoaded++;
      if (imagesLoaded === 1) {
        requestAnimationFrame(drawFrame);
      }
    };
  });

  function resizeCanvas() {
    const aspectRatio = 16 / 9;
    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.75;
    } else {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.6;
    }
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function drawFrame(timestamp) {
    if (!isPlaying || imagesLoaded===0) return;
    if (timestamp - lastFrameTime > frameInterval) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let nextFrameIndex = (frameIndex + 1) % images.length;

      if (imageObjects[frameIndex]) {
        ctx.globalAlpha = 1 - alpha;
        drawImageCover(ctx, imageObjects[frameIndex]);
      }
      if (imageObjects[nextFrameIndex]) {
        ctx.globalAlpha = alpha;
        drawImageCover(ctx, imageObjects[nextFrameIndex]);
      }

      alpha += fadeSpeed;
      if (alpha >= 1) {
        alpha = 0;
        frameIndex = nextFrameIndex;
      }
      lastFrameTime = timestamp;
    }
    requestAnimationFrame(drawFrame);
  }

  function drawImageCover(ctx, img) {
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth, drawHeight, offsetX, offsetY;
    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height * 0.9;
      drawWidth = img.width * (drawHeight / img.height);
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.width;
      drawHeight = img.height * (drawWidth / img.width);
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }

  playPauseButton?.addEventListener('click', () => {
    isPlaying = !isPlaying;
    playPauseButton.textContent = isPlaying ? "❚❚" : "▶";
    if (isPlaying) requestAnimationFrame(drawFrame);
  });

  window.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(drawFrame);
  });
}


/* ========== 10) slider1 轮播功能 ========== */
function initSlider1(){
  document.querySelectorAll(".slider1-slide img, .view1-btn").forEach(el => {
    el.removeAttribute("onclick");
  });

  const slides = document.querySelectorAll(".slider1-slide");
  const slider1PlayButton = document.getElementById("slider1-play-btn");
  const slider1BtnIcon = document.getElementById("slider1-btn-icon");
  const slider1Dots = document.querySelectorAll(".slider1-dot");
  const slider1ProgressBar = document.querySelector(".slider1-progress-bar");
  const viewText = document.querySelector(".view1-text");
  const viewButtons = document.querySelectorAll(".view1-btn");
  const slideImages = document.querySelectorAll(".slider1-slide img");

  let currentIndex = 0;
  let isPlaying = true;
  let animationFrame;
  let startTime;
  const duration = 3000;

  if (!slides.length || !slider1PlayButton || !slider1BtnIcon || !slider1Dots.length) {
    console.warn("❌ initSlider1: 轮播元素未找到！");
    return;
  }

  function navigateToPage() {
    window.open("example.html", "_blank");
  }

  viewButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      navigateToPage();
    });
  });

  slideImages.forEach(img => {
    img.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      navigateToPage();
    });
  });

  function updateSlide(index) {
    currentIndex = index;
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentIndex);
    });
    slider1Dots.forEach(dot => dot.classList.remove("active"));
    slider1Dots[currentIndex].classList.add("active");
    slider1ProgressBar.style.width = ((currentIndex + 1) / slides.length) * 100 + "%";
    viewText.textContent = slides[currentIndex].querySelector("img").alt;
  }

  function animateProgressBar(timestamp) {
    if (!startTime) startTime = timestamp;
    let elapsed = timestamp - startTime;
    let percent = Math.min(elapsed / duration, 1) * 100;
    slider1ProgressBar.style.width = percent + "%";
    if (elapsed < duration) {
      animationFrame = requestAnimationFrame(animateProgressBar);
    } else {
      nextSlide();
    }
  }

  function nextSlide() {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateSlide(currentIndex);
      slider1ProgressBar.style.width = "0%";
      startTime = null;
      if (isPlaying) {
        animationFrame = requestAnimationFrame(animateProgressBar);
      }
    } else {
      isPlaying = false;
      slider1BtnIcon.textContent = "↻";
      slider1PlayButton.classList.remove("playing","paused");
      slider1PlayButton.classList.add("refresh");
    }
  }

  function togglePlayPause() {
    if (!isPlaying) {
      isPlaying = true;
      currentIndex = 0;
      updateSlide(currentIndex);
      slider1BtnIcon.textContent = "⏸";
      slider1PlayButton.classList.remove("refresh");
      slider1PlayButton.classList.add("playing");
      startTime = null;
      animationFrame = requestAnimationFrame(animateProgressBar);
    } else {
      isPlaying = false;
      cancelAnimationFrame(animationFrame);
      slider1BtnIcon.textContent = "▶";
      slider1PlayButton.classList.remove("playing");
      slider1PlayButton.classList.add("paused");
    }
  }

  slider1Dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      updateSlide(index);
      isPlaying = false;
      cancelAnimationFrame(animationFrame);
      slider1BtnIcon.textContent = "▶";
      slider1PlayButton.classList.remove("playing","refresh");
      slider1PlayButton.classList.add("paused");
    });
  });

  slider1PlayButton.addEventListener("click", togglePlayPause);

  updateSlide(0);
  requestAnimationFrame(animateProgressBar);
}


/* ========== 11) touch1 轮播 ========== */
function initTouch1CarouselTrack(){
  const track = document.querySelector(".touch1-carousel-track");
  const slides = Array.from(track.children);
  const prevBtn = document.querySelector(".touch1-prev-btn");
  const nextBtn = document.querySelector(".touch1-next-btn");
  if(!track || !slides.length || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  const slideWidth = 615 + 15; // 615px(图片) + 15px(gap)

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    prevBtn.disabled = (currentIndex===0);
    nextBtn.disabled = (currentIndex=== totalSlides -1);
  }

  prevBtn.addEventListener("click", ()=>{
    if(currentIndex>0){
      currentIndex--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener("click", ()=>{
    if(currentIndex< totalSlides-1){
      currentIndex++;
      updateCarousel();
    }
  });

  updateCarousel();
}


/* ========== (最后) 在 DOMContentLoaded 时统一初始化 ========== */
document.addEventListener('DOMContentLoaded', () => {
  // 1) Hero
  initHeroCarousel();
  // 2) EmailJS
  initEmailJS();
  // 3) Compare
  initCompareFeature();
  // 4) Hamburger
  initHamburgerMenu();
  // 5) Modal
  initModalWindows();

  // (先检查 scroller.innerHTML += scroller.innerHTML)
  if(typeof window.handleExtraDuplicate === 'function'){
    window.handleExtraDuplicate();
  }
  // 然后执行无限滚动
  if(typeof window.initInfiniteScroller === 'function'){
    window.initInfiniteScroller();
  }

  // 7) 图片点击
  initProductImageClick();
  // 8) 翻转卡片
  initFlipCards();
  // 9) 帧动画
  initFrameAnimation();
  // 10) slider1
  initSlider1();
  // 11) touch1
  initTouch1CarouselTrack();
});

</script>
