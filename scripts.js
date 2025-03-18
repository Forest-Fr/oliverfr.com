/*************************************************** 
 * scripts.js
 * 
 * 1. Hero轮播：全屏 100vh (PC端)，自动切换
 * 2. EmailJS表单提交
 * 3. 预留更多JS功能(对比按钮、3D旋转、在线聊天)
 * 4. 汉堡菜单逻辑：支持全屏子窗口显示和关闭
 * 5. 模态窗口逻辑：点击后可打开/关闭子级界面
 * 6. (优化) 无限滚动逻辑 + Apple 风格暂停按钮 (使用 CSS 伪元素显示符号)
 * 7. (新增) 图片点击跳转至产品详情页面
 * 8. (新增) 翻转卡片功能：正面与反面切换
 * 9. (优化) 帧动画：滚动触发 + 平滑渐变 + 播放/暂停按钮
 * 10. **slider1 轮播** (新增, 具有进度条和播放/暂停按钮)
 * 11. touch1轮播
 ***************************************************/

/* 1) 轮播功能 */
const initHeroCarousel = () => {
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
};

/* 2) EmailJS 表单提交 */
const initEmailJS = () => {
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
};

/* 3) 预留对比按钮 */
const initCompareFeature = () => {
  const compareBtn = document.querySelector(".compare-features .btn");
  if (compareBtn) {
    compareBtn.addEventListener("click", () => {
      alert("对比功能暂未实现 (预留)！");
    });
  }
};

/* 4) 汉堡菜单 */
const initHamburgerMenu = () => {
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
};

/* 5) 模态窗口 */
const initModalWindows = () => {
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
};

/* 6) 无限滚动 + Apple 风格暂停按钮 */
(function(){
  "use strict";

  // =============================
  // 1) 核心：无限滚动逻辑
  // =============================
  // 只在 #infiniteScroller 存在时才执行
  // 并且不会对外部变量造成污染
  function initInfiniteScroller(){
    const scroller = document.getElementById('infiniteScroller');
    const pauseBtn = document.querySelector('.pause-btn'); // 或 .pause-btn
    if(!scroller || !pauseBtn) return;

    const images = [
      "A peaceful brookside setting.png",
      "A scenic riverside bend.png",
      "A serene coastal shore.png",
      "A shaded forest path.png"
    ];

    let isPaused = false;
    let speed = 0.3;  // 滚动速度(像素/帧)
    let lastTimestamp = 0;
    let itemsOnScreen = [];
    let track = null;

    // 防止与其它脚本重复创建
    if(scroller.querySelector('.infinite-scroller-track')){
      return;
    }

    track = document.createElement('div');
    track.className = 'infinite-scroller-track';
    track.style.display = 'flex';
    track.style.position = 'relative';
    track.style.transform = 'translateX(0)';
    scroller.appendChild(track);

    // 插入两倍图片，以便无缝循环
    for(let i=0; i<2; i++){
      images.forEach(src => createItem(src));
    }

    function createItem(imageSrc){
      const imgContainer = document.createElement('div');
      imgContainer.className = 'infinite-scroller-item';
      // 初始 visibility: hidden，等图片加载完后再显示
      imgContainer.style.position = 'absolute';
      imgContainer.style.visibility = 'hidden';

      const img = new Image();
      img.src = imageSrc;
      img.alt = imageSrc;
      img.style.width = '100%';
      img.style.objectFit = 'cover';

      img.onload = function(){
        // 强制一次 reflow，以拿到正确的 offsetWidth
        const actualWidth = imgContainer.offsetWidth;
        // 计算 left
        const offsetX = itemsOnScreen.length === 0
          ? 0
          : itemsOnScreen[itemsOnScreen.length - 1].x +
            itemsOnScreen[itemsOnScreen.length - 1].width;

        imgContainer.style.left = offsetX + 'px';
        imgContainer.style.visibility = 'visible';

        const itemObj = {
          el: imgContainer,
          x: offsetX,
          width: actualWidth || 300 // 如果0就给默认300
        };
        itemsOnScreen.push(itemObj);
      };

      imgContainer.appendChild(img);
      track.appendChild(imgContainer);
    }

    function animate(timestamp){
      if(!isPaused){
        const delta = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        // 每16.67ms视为1帧
        const moveDist = speed * (delta / 16.67);

        itemsOnScreen.forEach(item => {
          item.x -= moveDist;
          item.el.style.left = item.x + 'px';
        });

        const lastItem = itemsOnScreen[itemsOnScreen.length - 1];
        if(lastItem.x + lastItem.width < window.innerWidth + 100){
          // 新增下一张图
          createItem(images[ itemsOnScreen.length % images.length ]);
        }
      }
      requestAnimationFrame(animate);
    }

    // 绑定暂停/播放按钮
    pauseBtn.classList.remove('paused');
    pauseBtn.addEventListener('click', () => {
      isPaused = !isPaused;
      pauseBtn.classList.toggle('paused');
    });

    requestAnimationFrame(animate);
  }

  // =============================
  // 2) 额外：若脚本里还有 scroller.innerHTML += ...
  // =============================
  // 可做一次判断，防止重复插入
  function handleExtraDuplicate(){
    const scroller = document.getElementById("infiniteScroller");
    const track = scroller ? scroller.querySelector(".infinite-scroller-track") : null;
    if(scroller && !track){
      // 原脚本中 “scroller.innerHTML += scroller.innerHTML;”
      scroller.innerHTML += scroller.innerHTML;
      scroller.style.overflow = "hidden";
    }
    if(track){
      track.style.transform = "translateX(0)";
    }
  }

  // =============================
  // 3) DOMContentLoaded 事件，统一初始化
  // =============================
  document.addEventListener('DOMContentLoaded', function(){
    // 先处理可能的重复插入
    handleExtraDuplicate();
    // 再初始化无限滚动
    initInfiniteScroller();

    // 如果还有一个 #pauseBtn 供外部控制
    const scrollerEl = document.getElementById("infiniteScroller");
    const pauseBtnEl = document.getElementById("pauseBtn");
    if(pauseBtnEl && scrollerEl){
      let paused = false;
      pauseBtnEl.addEventListener("click", function(){
        paused = !paused;
        scrollerEl.style.animationPlayState = paused ? "paused" : "running";
        pauseBtnEl.textContent = paused ? "▶" : "❚❚";
      });
      pauseBtnEl.textContent = "❚❚";
    }
  });
})();


/* 7) 图片点击跳转 */
const initProductImageClick = () => {
  document.querySelectorAll('.product-card img').forEach(image => {
    image.addEventListener('click', () => {
      const productPage = image.alt.toLowerCase().replace(/\s+/g, '-') + ".html";
      window.location.href = productPage;
    });
  });
};

/* 8) 翻转卡片 */
const initFlipCards = () => {
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
};

/* 9) 帧动画：滚动触发 + 平滑渐变 + 播放/暂停按钮 */
const initFrameAnimation = () => {
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
  let frameInterval = 1000 / 24; // 24 FPS
  let lastFrameTime = 0;
  let imagesLoaded = 0;

  const playPauseButton = document.getElementById('playPauseButton');
  const animationContainer = document.getElementById('animationContainer');

  let lastScrollTop = 0;

  // 加载图片
  images.forEach((src, index) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      imageObjects[index] = img;
      imagesLoaded++;
      console.log(`✅ 加载成功: ${src}`);

      // 首张加载完后启动
      if (imagesLoaded === 1) {
        requestAnimationFrame(drawFrame);
      }
    };
    img.onerror = () => console.error(`❌ 图片加载失败: ${src}`);
  });

  // 适配 canvas 尺寸
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

  // 核心绘制
  function drawFrame(timestamp) {
    if (!isPlaying || imagesLoaded === 0) return;

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

  // cover 适配
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

  // 播放/暂停按钮
  playPauseButton?.addEventListener('click', () => {
    isPlaying = !isPlaying;
    playPauseButton.textContent = isPlaying ? "❚❚" : "▶";
    if (isPlaying) requestAnimationFrame(drawFrame);
  });

  // DOM 加载后，立即开始
  window.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(drawFrame);
  });
};
/*10 ========== 9) slider1 轮播功能 ========== */
document.addEventListener("DOMContentLoaded", () => {
  // 移除内联 onclick 属性，避免重复触发
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
  let isPlaying = true; // 初始状态：自动播放
  let animationFrame;
  let startTime;
  const duration = 3000; // 轮播间隔

  if (!slides.length || !slider1PlayButton || !slider1BtnIcon || !slider1Dots.length) {
    console.warn("❌ initSlider1: 轮播元素未找到！");
    return;
  }

  // 跳转到预期页面，始终按 "_blank" 在新窗口打开
  function navigateToPage() {
    window.open("example.html", "_blank");
  }

  // 给“Taking in the view”按钮添加事件监听
  viewButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      navigateToPage();
    });
  });

  // 给幻灯片中的图片添加事件监听
  slideImages.forEach(img => {
    img.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      navigateToPage();
    });
  });

  // 更新幻灯片与控制按钮状态
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

  // 进度条动画
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

  // 切换到下一张幻灯片
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
      // 播放结束，切换按钮样式为刷新
      isPlaying = false;
      slider1BtnIcon.textContent = "↻";
      slider1PlayButton.classList.remove("playing", "paused");
      slider1PlayButton.classList.add("refresh");
    }
  }

  // 切换播放/暂停/刷新状态
  function togglePlayPause() {
    if (!isPlaying) {
      // 点击刷新后重新播放
      isPlaying = true;
      currentIndex = 0;
      updateSlide(currentIndex);
      slider1BtnIcon.textContent = "⏸";
      slider1PlayButton.classList.remove("refresh");
      slider1PlayButton.classList.add("playing");
      startTime = null;
      animationFrame = requestAnimationFrame(animateProgressBar);
    } else {
      // 播放中点击暂停
      isPlaying = false;
      cancelAnimationFrame(animationFrame);
      slider1BtnIcon.textContent = "▶";
      slider1PlayButton.classList.remove("playing");
      slider1PlayButton.classList.add("paused");
    }
  }

  // 监听底部圆点点击
  slider1Dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      updateSlide(index);
      isPlaying = false;
      cancelAnimationFrame(animationFrame);
      slider1BtnIcon.textContent = "▶";
      slider1PlayButton.classList.remove("playing", "refresh");
      slider1PlayButton.classList.add("paused");
    });
  });

  // 监听播放/暂停按钮点击
  slider1PlayButton.addEventListener("click", togglePlayPause);

  // 启动自动播放
  updateSlide(0);
  requestAnimationFrame(animateProgressBar);
});



//*11
document.addEventListener("DOMContentLoaded", function () {
    // 获取轮播轨道和所有幻灯片
    const track = document.querySelector(".touch1-carousel-track");
    const slides = Array.from(document.querySelectorAll(".touch1-carousel-slide"));
    // 获取左右控制按钮（单独设置在一个容器内）
    const prevBtn = document.querySelector(".touch1-prev-btn");
    const nextBtn = document.querySelector(".touch1-next-btn");
    
    // 当前幻灯片索引，从 0 开始
    let currentIndex = 0;
    // 每张幻灯片宽度为615px，加上幻灯片之间15px的间隙
    const slideWidthWithGap = 615+ 15;
    
    // 更新轮播显示与按钮状态
    function updateCarousel() {
        // 平滑过渡：设置 track 的 transform
        track.style.transform = `translateX(-${currentIndex * slideWidthWithGap}px)`;
        
        // 当在第一张时禁用左按钮，否则启用
        if (currentIndex === 0) {
            prevBtn.disabled = true;
        } else {
            prevBtn.disabled = false;
        }
        
        // 当在最后一张时禁用右按钮，否则启用
        if (currentIndex === slides.length - 1) {
            nextBtn.disabled = true;
        } else {
            nextBtn.disabled = false;
        }
    }
    
    // 左按钮点击事件
    prevBtn.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    // 右按钮点击事件
    nextBtn.addEventListener("click", function () {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // 初始化轮播
    updateCarousel();
});

/* ========== 初始化所有功能 ========== */
document.addEventListener('DOMContentLoaded', () => {
  initHeroCarousel();
  initEmailJS();
  initCompareFeature();
  initHamburgerMenu();
  initModalWindows();
  initInfiniteScroller();
  initProductImageClick();
  initFlipCards();
  initFrameAnimation();
initSlider1(); // **初始化 slider1 轮播**
  initTouch1CarouselTrack();// 这行保证了轮播图的初始化
});
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".touch1-carousel-track");
  const slides = Array.from(track.children);
  const prevBtn = document.querySelector(".touch1-prev-btn");
  const nextBtn = document.querySelector(".touch1-next-btn");

  let currentIndex = 0;
  const totalSlides = slides.length;
  // 615px(图片) + 15px(gap) = 630px
  const slideWidth =615 + 15;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    prevBtn.disabled = (currentIndex === 0);
    nextBtn.disabled = (currentIndex === totalSlides - 1);
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  // 初始化
  updateCarousel();
});
