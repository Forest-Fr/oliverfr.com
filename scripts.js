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
 * 10. (新增) 轮播轨道功能：左右按钮和小点控制
 * 11. 
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
const initInfiniteScroller = () => {
  const scroller = document.getElementById('infiniteScroller');
  const pauseBtn = document.querySelector('.pause-btn');
  if (!scroller || !pauseBtn) return;

  const images = [
    "A peaceful brookside setting.png",
    "A scenic riverside bend.png",
    "A serene coastal shore.png",
    "A shaded forest path.png"
  ];

  let isPaused = false;
  let speed = 0.3; // 滚动速度
  let lastTimestamp = 0;
  let itemsOnScreen = [];
  let track; // 轨道

  // 立即创建 .infinite-scroller-track
  track = document.createElement('div');
  track.className = 'infinite-scroller-track';
  track.style.display = 'flex';
  track.style.position = 'relative';
  track.style.transform = 'translateX(0)'; // 确保初始状态无偏移
  scroller.appendChild(track);

  // 初始化滚动项（确保无缝滚动）
  for (let i = 0; i < 2; i++) {
    images.forEach(createItem);
  }

  function createItem(imageSrc) {
    const imgContainer = document.createElement('div');
    imgContainer.className = 'infinite-scroller-item';
    imgContainer.style.position = 'absolute';
    imgContainer.style.width = '100%';

    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = imageSrc;
    img.style.width = '100%';
    img.style.objectFit = 'cover';

    imgContainer.appendChild(img);
    track.appendChild(imgContainer);

    // 防止滚动时左侧出现空白
    const offsetX = (itemsOnScreen.length === 0) ? 0 : (itemsOnScreen[itemsOnScreen.length - 1].x + imgContainer.offsetWidth);
    imgContainer.style.left = `${offsetX}px`;

    const itemObj = { el: imgContainer, x: offsetX, width: imgContainer.offsetWidth };
    itemsOnScreen.push(itemObj);
  }

  function animate(timestamp) {
    if (!isPaused) {
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      const moveDist = speed * (delta / 16.67);

      for (let i = 0; i < itemsOnScreen.length; i++) {
        const item = itemsOnScreen[i];
        item.x -= moveDist;
        item.el.style.left = `${item.x}px`;
      }

      const lastItem = itemsOnScreen[itemsOnScreen.length - 1];
      if (lastItem.x + lastItem.width < window.innerWidth + 100) {
        createItem(images[itemsOnScreen.length % images.length]);
      }
    }
    requestAnimationFrame(animate);
  }

  // 监听暂停/播放按钮
  pauseBtn.classList.remove('paused');
  pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseBtn.classList.toggle('paused');
  });

  // 启动滚动
  requestAnimationFrame(animate);
};

// 修复左侧空白闪现（DOMContentLoaded 立即初始化 transform）
document.addEventListener("DOMContentLoaded", function () {
  const scroller = document.getElementById("infiniteScroller");
  const track = document.querySelector(".infinite-scroller-track");

  if (scroller && track) {
    track.style.transform = "translateX(0)"; // 立即对齐左侧，防止空白
    scroller.innerHTML += scroller.innerHTML; // 确保滚动区域内容填充
  }

  const pauseBtn = document.getElementById("pauseBtn");
  let isPaused = false;

  pauseBtn.addEventListener("click", function () {
    isPaused = !isPaused;
    scroller.style.animationPlayState = isPaused ? "paused" : "running";
    pauseBtn.textContent = isPaused ? "▶" : "❚❚";
  });

  pauseBtn.textContent = "❚❚";
});

// 修复左侧空白闪现
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".infinite-scroller-track");
  if (track) {
    track.style.transform = "translateX(0)"; // 确保初始位置正确
  }
});

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
//*10为触发active的demo1容器
function initdemo1CarouselTrack() {
  const container = document.querySelector(".demo1-carousel-container");
  const track = document.querySelector(".demo1-carousel-track");
  const slides = Array.from(document.querySelectorAll(".demo1-carousel-slide"));
  const prevBtn = document.querySelector(".demo1-carousel-prev");
  const nextBtn = document.querySelector(".demo1-carousel-next");
  const dots = Array.from(document.querySelectorAll(".demo1-carousel-dot"));

  if (!container || !track || slides.length === 0 || !dots.length) {
    console.warn("Carousel elements not found!");
    return;
  }

  // 假设真实幻灯片共 6 张
  const totalReal = 6;
  const uniqueSlides = slides.slice(0, totalReal);
  uniqueSlides.forEach((slide, i) => {
    slide.setAttribute("data-index", i);
  });

  // 1) 克隆：首端插入最后一张克隆, 末端插入第一张克隆
  const firstSlide = uniqueSlides[0];
  const lastSlide  = uniqueSlides[totalReal - 1];
  const firstClone = firstSlide.cloneNode(true);
  const lastClone  = lastSlide.cloneNode(true);

  firstClone.setAttribute("data-index", 0);
  lastClone.setAttribute("data-index", totalReal - 1);

  track.insertBefore(lastClone, track.firstChild);
  track.appendChild(firstClone);

  const allSlides = Array.from(track.querySelectorAll(".demo1-carousel-slide"));
  const totalSlidesWithClones = allSlides.length;

  let currentIndex = 1;    // 初始指向真实第1张(克隆后变索引1)
  let isAnimating  = false;

  // 2) 计算每张幻灯片宽度：移动端固定公式(0.8*屏宽+15)，桌面端可保持原逻辑
  function getSlideWidth() {
    if (window.innerWidth <= 768) {
      // 移动端：直接用 (0.85 * window.innerWidth) + 15
      return Math.floor(window.innerWidth * 0.8) + 15;
    } else {
      // 桌面端：若想保持原 boundingClientRect + gap
      const slideElem = container.querySelector(".demo1-carousel-slide");
      let measuredWidth = slideElem ? slideElem.getBoundingClientRect().width : 0;
      if (measuredWidth === 0) {
        measuredWidth = container.clientWidth || window.innerWidth;
      }
      const gap = 15;
      return measuredWidth + gap;
    }
  }

  // 3) 核心更新：算 offset, 移动 track, 更新 dots, prev/next, shadow
  function updateCarousel() {
    const slideWidth = getSlideWidth();
    const offset = -currentIndex * slideWidth;
    track.style.transform = `translateX(${offset}px)`;

    // 更新圆点
    let dotIndex;
    if (currentIndex === 0) {
      dotIndex = totalReal - 1;
    } else if (currentIndex === totalSlidesWithClones - 1) {
      dotIndex = 0;
    } else {
      dotIndex = currentIndex - 1;
    }
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === dotIndex);
    });

    // 移除所有 active/prev/next/shadow
    allSlides.forEach(sl => {
      sl.classList.remove("active","prev","next","shadow");
      // 禁用它们内部 <a> 点击
      const aTag = sl.querySelector("a");
      if (aTag) aTag.style.pointerEvents = "none";
    });

    // 中间图 => active + a可点
    allSlides[currentIndex].classList.add("active");
    const centerA = allSlides[currentIndex].querySelector("a");
    if (centerA) centerA.style.pointerEvents = "auto";

    // 左右 => prev / next
    const nextIndex = (currentIndex + 1) % totalSlidesWithClones;
    const prevIndex = (currentIndex - 1 + totalSlidesWithClones) % totalSlidesWithClones;
    allSlides[nextIndex].classList.add("next");
    allSlides[prevIndex].classList.add("prev");

    // 非 active => shadow
    allSlides.forEach(sl => {
      if (!sl.classList.contains("active")) {
        sl.classList.add("shadow");
      }
    });
  }

  // 4) 切换：next/prev/jump
  function nextSlide() {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex++;
    track.style.transition = "transform 0.5s ease-in-out";
    updateCarousel();
  }
  function prevSlide() {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex--;
    track.style.transition = "transform 0.5s ease-in-out";
    updateCarousel();
  }
  function jumpToSlide(index) {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = index + 1; // 0-based dot => +1
    track.style.transition = "transform 0.5s ease-in-out";
    updateCarousel();
  }

  // 5) 绑定按钮/圆点 & 自动播放
  prevBtn?.addEventListener("click", () => {
    prevSlide(); resetInterval();
  });
  nextBtn?.addEventListener("click", () => {
    nextSlide(); resetInterval();
  });
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      jumpToSlide(i);
      resetInterval();
    });
  });

  let interval = setInterval(nextSlide, 5000);
  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 5000);
  }

  // 6) transitionend => 无限循环
  track.addEventListener("transitionend", () => {
    if (currentIndex === totalSlidesWithClones - 1) {
      track.style.transition = "none";
      currentIndex = 1;
      updateCarousel();
      void track.offsetWidth; // 强制回流
      track.style.transition = "transform 0.5s ease-in-out";
    }
    if (currentIndex === 0) {
      track.style.transition = "none";
      currentIndex = totalReal;
      updateCarousel();
      void track.offsetWidth;
      track.style.transition = "transform 0.5s ease-in-out";
    }
    isAnimating = false;
  });

  // 7) 初始化
  track.style.transition = "none";
  updateCarousel();
  setTimeout(() => {
    track.style.transition = "transform 0.5s ease-in-out";
  }, 50);

  // 8) 点击事件: 中图 => 链接, 左右图 => 切换
  allSlides.forEach(slide => {
    slide.addEventListener("click", (e) => {
      if (slide.classList.contains("active")) {
        // 不阻止, 让 <a> 正常跳转
      } else if (slide.classList.contains("next")) {
        e.preventDefault();
        nextSlide();
        resetInterval();
      } else if (slide.classList.contains("prev")) {
        e.preventDefault();
        prevSlide();
        resetInterval();
      }
    });
  });

  // 若有 'Explore now' 按钮
  const exploreBtns = document.querySelectorAll('.demo1-explore-btn');
  exploreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const link = e.target.closest('.demo1-carousel-slide')?.querySelector('a');
      if (link) {
        window.location.href = link.href;
      }
    });
  });

  // 9) 监听窗口变化 => 重新计算
  window.addEventListener("resize", () => {
    // 1) 取消动画
    isAnimating = false;
    track.style.transition = "none";
    // 2) 重新update
    updateCarousel();
    // 3) 恢复动画
    setTimeout(() => {
      track.style.transition = "transform 0.5s ease-in-out";
    }, 50);
  });

  // ========== 新增: 移动端触摸滑动 ==========

  let startX = 0;      // touchstart X坐标
  let isSwiping = false;

  container.addEventListener('touchstart', (e) => {
    // 若正动画中，可选地禁止再次滑动
    if (isAnimating) return;
    isSwiping = true;
    startX = e.touches[0].clientX;
  });

  container.addEventListener('touchmove', (e) => {
    // 若你想在移动时阻止默认竖向滚动，可 e.preventDefault();
    // 这里不做“中间拖拽”效果，只记录
    // const currentX = e.touches[0].clientX;
    // const delta = currentX - startX;
  });

  container.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    let endX = e.changedTouches[0].clientX;
    let distance = endX - startX;
    isSwiping = false;

    // 滑动阈值: 50px
    if (Math.abs(distance) > 50) {
      if (distance < 0) {
        // 左滑 => next
        nextSlide();
      } else {
        // 右滑 => prev
        prevSlide();
      }
      resetInterval();
    }
  });
}

// 在 window.onload 后再执行，以免图片未加载导致尺寸不准确
window.addEventListener('load', () => {
  initdemo1CarouselTrack();
});








/* 11) 轮播轨道功能：左右按钮和小点控制 */
// 桌面端轮播初始化函数
const initSpec1CarouselTrack = () => { 
    const track = document.querySelector(".spec1-carousel-track");
    const slides = document.querySelectorAll(".spec1-carousel-slide");
    const prevBtn = document.querySelector(".spec1-carousel-prev");
    const nextBtn = document.querySelector(".spec1-carousel-next");
    const dots = document.querySelectorAll(".spec1-carousel-dot");

    if (!track || slides.length === 0 || !dots.length) return;

    let currentIndex = 1; // Start at second image to avoid initial blank space
    const totalSlides = slides.length;
    const slideWidth = slides[0].offsetWidth + 15; // Slide width + gap

    const firstSlide = slides[0];
    const lastSlide = slides[slides.length - 1];
    const firstClone = firstSlide.cloneNode(true);
    const lastClone = lastSlide.cloneNode(true);
    track.appendChild(firstClone);
    track.insertBefore(lastClone, track.firstChild);

    const totalSlidesWithClones = totalSlides + 2;

    function updateCarousel() {
        const offset = -currentIndex * slideWidth;
        track.style.transform = `translateX(${offset}px)`;

        slides.forEach((slide, index) => {
            slide.classList.toggle("active", index === currentIndex);
        });

        dots.forEach((dot, i) => dot.classList.toggle("active", i === currentIndex));
    }

    function nextSlide() {
        currentIndex++;
        if (currentIndex >= totalSlidesWithClones) {
            currentIndex = 1;
            track.style.transition = "none";
            updateCarousel();
            setTimeout(() => {
                track.style.transition = "transform 0.5s ease-in-out";
            }, 50);
        } else {
            updateCarousel();
        }
    }

    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = totalSlidesWithClones - 2;
            track.style.transition = "none";
            updateCarousel();
            setTimeout(() => {
                track.style.transition = "transform 0.5s ease-in-out";
            }, 50);
        } else {
            updateCarousel();
        }
    }

    function jumpToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    prevBtn?.addEventListener("click", () => {
        prevSlide();
        resetInterval();
    });

    nextBtn?.addEventListener("click", () => {
        nextSlide();
        resetInterval();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            jumpToSlide(index);
            resetInterval();
        });
    });

    let interval = setInterval(nextSlide, 5000);

    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(nextSlide, 5000);
    }

    setTimeout(() => {
        track.style.transition = "none";
        currentIndex = 1;
        updateCarousel();

        setTimeout(() => {
            track.style.transition = "transform 0.5s ease-in-out";
        }, 50);
    }, 50);

    if (window.innerWidth <= 768) {
        setTimeout(() => {
            track.style.transition = "transform 0.3s ease-in-out";
        }, 500);
    }

    updateCarousel();

    // 为按钮绑定点击事件，点击时跳转
    const exploreBtns = document.querySelectorAll('.spec1-explore-btn');
    exploreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const link = e.target.closest('.spec1-carousel-slide').querySelector('a');
            if (link) {
                window.location.href = link.href;
            }
        });
    });
};

// 初始化新轮播
document.addEventListener("DOMContentLoaded", initSpec1CarouselTrack);

//*12
document.addEventListener("DOMContentLoaded", function () {
    // 获取轮播轨道和所有幻灯片
    const track = document.querySelector(".touch1-carousel-track");
    const slides = Array.from(document.querySelectorAll(".touch1-carousel-slide"));
    // 获取左右控制按钮（单独设置在一个容器内）
    const prevBtn = document.querySelector(".touch1-prev-btn");
    const nextBtn = document.querySelector(".touch1-next-btn");
    
    // 当前幻灯片索引，从 0 开始
    let currentIndex = 0;
    // 每张幻灯片宽度为 615px，加上幻灯片之间15px的间隙
    const slideWidthWithGap = 615 + 15;
    
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
  initDemo1CarouselTrack();
 initSpec1CarouselTrack(); // 这行保证了轮播图的初始化
  initTouch1CarouselTrack();
});
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".touch1-carousel-track");
  const slides = Array.from(track.children);
  const prevBtn = document.querySelector(".touch1-prev-btn");
  const nextBtn = document.querySelector(".touch1-next-btn");

  let currentIndex = 0;
  const totalSlides = slides.length;
  // 615px(图片) + 15px(gap) = 630px
  const slideWidth = 615 + 15;

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
