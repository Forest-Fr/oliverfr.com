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
 * 10. (新增) 轮播轨道功能：左右按钮和小点控制（自动轮播）
 * 11. (可选) 移动端 touch 轮播 track
 * 12. (新增) spec1 手动无限轮播(仅左右按钮 + 手机触摸滑动)
 ***************************************************/

/* ========== 0) 工具函数：等待图片加载后再执行 ========== */
function waitImagesLoaded(images, callback) {
  let loadedCount = 0;
  const total = images.length;
  function checkDone() {
    loadedCount++;
    if (loadedCount >= total) {
      callback();
    }
  }
  images.forEach((img) => {
    if (img.complete) {
      checkDone();
    } else {
      img.addEventListener("load", checkDone);
      img.addEventListener("error", checkDone);
    }
  });
  if (total === 0) callback();
}

/* ========== 1) Hero 轮播(自动) ========== */
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

/* ========== 2) EmailJS 表单提交 ========== */
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

/* ========== 3) 预留对比按钮 ========== */
const initCompareFeature = () => {
  const compareBtn = document.querySelector(".compare-features .btn");
  if (compareBtn) {
    compareBtn.addEventListener("click", () => {
      alert("对比功能暂未实现 (预留)！");
    });
  }
};

/* ========== 4) 汉堡菜单 ========== */
const initHamburgerMenu = () => {
  const menuIcon  = document.getElementById('menuIcon');
  const mobileNav = document.getElementById('mobileNav');
  const closeBtn  = document.getElementById('closeBtn');
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

/* ========== 5) 模态窗口 ========== */
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

/* ========== 6) 无限滚动 + Apple 风格暂停按钮 ========== */
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
  let speed = 0.3; 
  let lastTimestamp = 0;
  let itemsOnScreen = [];
  let track;

  track = document.createElement('div');
  track.className = 'infinite-scroller-track';
  track.style.display = 'flex';
  track.style.position = 'relative';
  track.style.transform = 'translateX(0)';
  scroller.appendChild(track);

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

    const offsetX = (itemsOnScreen.length === 0) ? 0 :
      (itemsOnScreen[itemsOnScreen.length - 1].x + imgContainer.offsetWidth);
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

  pauseBtn.classList.remove('paused');
  pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseBtn.classList.toggle('paused');
  });

  requestAnimationFrame(animate);
};

// 修复滚动左侧空白
document.addEventListener("DOMContentLoaded", function () {
  const scroller = document.getElementById("infiniteScroller");
  const track = document.querySelector(".infinite-scroller-track");
  if (scroller && track) {
    track.style.transform = "translateX(0)";
    scroller.innerHTML += scroller.innerHTML;
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
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".infinite-scroller-track");
  if (track) {
    track.style.transform = "translateX(0)";
  }
});

/* ========== 7) 图片点击跳转 ========== */
const initProductImageClick = () => {
  document.querySelectorAll('.product-card img').forEach(image => {
    image.addEventListener('click', () => {
      const productPage = image.alt.toLowerCase().replace(/\s+/g, '-') + ".html";
      window.location.href = productPage;
    });
  });
};

/* ========== 8) 翻转卡片 ========== */
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

/* ========== 9) 帧动画(滚动触发+播放/暂停) ========== */
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
  let frameInterval = 1000 / 24; 
  let lastFrameTime = 0;
  let imagesLoaded = 0;

  const playPauseButton = document.getElementById('playPauseButton');

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
    img.onerror = () => console.error(`❌ 图片加载失败: ${src}`);
  });

  function resizeCanvas() {
    if (!canvas) return;
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
    if (!isPlaying || imagesLoaded === 0) return;
    if (!canvas || !ctx) return;

    if (timestamp - lastFrameTime > frameInterval) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let nextFrameIndex = (frameIndex + 1) % images.length;
      if (imageObjects[frameIndex]) {
        ctx.globalAlpha = 1 - alpha;
        drawImageCover(imageObjects[frameIndex]);
      }
      if (imageObjects[nextFrameIndex]) {
        ctx.globalAlpha = alpha;
        drawImageCover(imageObjects[nextFrameIndex]);
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

  function drawImageCover(img) {
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
};

/* ========== 10) 触摸轮播: initTouch1CarouselTrack ========== */
const initTouch1CarouselTrack = () => {
  const track = document.querySelector(".touch1-carousel-track");
  const slides = Array.from(track?.children || []);
  const prevBtn = document.querySelector(".touch1-prev-btn");
  const nextBtn = document.querySelector(".touch1-next-btn");
  if (!track || slides.length === 0 || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  const slideWidth = 615 + 15; 
  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    prevBtn.disabled = (currentIndex === 0);
    nextBtn.disabled = (currentIndex === slides.length - 1);
  }
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });
  nextBtn.addEventListener("click", () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });
  updateCarousel();
};

/* ========== 11) spec1 手动无限轮播(左右按钮 + 手机触摸滑动阈值=20) ========== */
const initspec1ManualCarouselTrack = () => {
  const container = document.querySelector(".spec1-carousel-container");
  const track     = document.querySelector(".spec1-carousel-track");
  let slides      = Array.from(document.querySelectorAll(".spec1-carousel-slide"));
  const prevBtn   = document.querySelector(".spec1-carousel-prev");
  const nextBtn   = document.querySelector(".spec1-carousel-next");

  if (!container || !track || slides.length === 0 || !prevBtn || !nextBtn) {
    console.warn("spec1 hand-control carousel: elements or arrows not found!");
    return;
  }

  const totalReal = slides.length;
  let currentIndex = 1; 
  let isAnimating  = false;
  let slideWidth   = 0;
  let gapWidth     = 15;

  // 1) 克隆首尾 => 无缝
  const firstClone = slides[0].cloneNode(true);
  const lastClone  = slides[totalReal - 1].cloneNode(true);
  track.appendChild(firstClone);
  track.insertBefore(lastClone, track.firstChild);

  slides = Array.from(track.querySelectorAll(".spec1-carousel-slide"));

  function updateSlideWidth() {
    if (window.innerWidth <= 768) {
      const containerWidth = container.offsetWidth;
      gapWidth = containerWidth * 0.04; 
      slides.forEach((slide) => {
        slide.style.width = `${containerWidth * 0.85}px`; 
      });
      slideWidth = containerWidth * 0.85 + gapWidth;
    } else {
      slides.forEach((slide) => {
        slide.style.width = ""; 
      });
      gapWidth = 15;
      const measured = slides[1].getBoundingClientRect().width;
      slideWidth = measured + gapWidth;
    }
  }

  function updateCarousel(animated = true) {
    updateSlideWidth();
    track.style.transition = animated ? "transform 0.5s ease-in-out" : "none";

    if (window.innerWidth <= 768) {
      track.style.transform = `translateX(${-currentIndex * slideWidth + gapWidth/2}px)`;
    } else {
      track.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
    }

    slides.forEach(sl => sl.classList.remove("active","prev","next","shadow"));
    slides[currentIndex]?.classList.add("active");

    const nextIndex = (currentIndex + 1) % slides.length;
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    slides[nextIndex]?.classList.add("next");
    slides[prevIndex]?.classList.add("prev");

    // 只有 .active 不加阴影
    slides.forEach(sl => {
      if (!sl.classList.contains("active")) {
        sl.classList.add("shadow");
      }
    });

    // 内部链接只在 active slide 可点
    slides.forEach((slide) => {
      const link = slide.querySelector("a");
      if (link) {
        link.style.pointerEvents = slide.classList.contains("active") ? "auto" : "none";
      }
    });
  }

  function nextSlide() {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex++;
    updateCarousel(true);
    setTimeout(() => {
      if (currentIndex === slides.length - 1) {
        track.style.transition = "none";
        currentIndex = 1;
        updateCarousel(false);
      }
      isAnimating = false;
    }, 500);
  }
  function prevSlide() {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex--;
    updateCarousel(true);
    setTimeout(() => {
      if (currentIndex === 0) {
        track.style.transition = "none";
        currentIndex = slides.length - 2;
        updateCarousel(false);
      }
      isAnimating = false;
    }, 500);
  }

  prevBtn.addEventListener("click", () => {
    if(!isAnimating) prevSlide();
  });
  nextBtn.addEventListener("click", () => {
    if(!isAnimating) nextSlide();
  });

  // 点击左右图 => 切换
  slides.forEach((slide) => {
    slide.addEventListener("click", (e) => {
      if (slide.classList.contains("active")) {
        // 不阻止
      } else if (slide.classList.contains("next")) {
        e.preventDefault();
        if(!isAnimating) nextSlide();
      } else if (slide.classList.contains("prev")) {
        e.preventDefault();
        if(!isAnimating) prevSlide();
      }
    });
    const exploreBtn = slide.querySelector(".spec1-explore-btn");
    if (exploreBtn) {
      exploreBtn.addEventListener("click", (ev) => {
        ev.stopPropagation();
      });
    }
  });

  // 手机端触摸滑动: 阈值=20px
  let startX = 0;
  let isSwiping = false;
  track.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1 && !isAnimating) {
      startX = e.touches[0].clientX;
      isSwiping = true;
    }
  }, { passive: true });
  track.addEventListener("touchmove", () => {}, { passive: true });
  track.addEventListener("touchend", (e) => {
    if (!isSwiping) return;
    isSwiping = false;
    const endX = e.changedTouches[0].clientX;
    const distance = endX - startX;
    if (Math.abs(distance) > 20) {
      if (distance < 0) nextSlide();
      else prevSlide();
    }
  }, { passive: true });

  function onResize() {
    isAnimating = false;
    track.style.transition = "none";
    updateCarousel(false);
    setTimeout(() => {
      track.style.transition = "transform 0.5s ease-in-out";
    }, 50);
  }
  window.addEventListener("resize", onResize);

  track.style.transition = "none";
  updateCarousel(false);
  setTimeout(() => {
    track.style.transition = "transform 0.5s ease-in-out";
  }, 50);

  if (window.innerWidth <= 768) {
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
  } else {
    prevBtn.style.display = "block";// ✅ 让桌面端按钮也可见
    nextBtn.style.display = "block";// ✅ 让桌面端按钮也可见
  }
};

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

  // 移动端 触摸轮播(若使用):
  initTouch1CarouselTrack();
});

/* ========== 在 window.load 后再初始化 spec1 手动轮播 ========== */
window.addEventListener('load', () => {
  const spec1Imgs = document.querySelectorAll(".spec1-carousel-slide img");
  if (spec1Imgs.length > 0) {
    waitImagesLoaded(spec1Imgs, () => {
      initspec1ManualCarouselTrack();
    });
  }
});
