(function(){
  // 1) Hero 
  (function(){
    const a=document.getElementById("hero-slides"),
          b=document.querySelectorAll(".hero-dots .dot");
    if(!a||!b.length)return;
    let i=0, n=a.children.length;
    const u=()=>{i=(i+1)%n, a.style.transform="translateX(-"+(i*100)+"%)", b.forEach((e,j)=>e.classList.toggle("active",j===i))};
    b.forEach((e,j)=>e.addEventListener("click",()=>{i=j, a.style.transform="translateX(-"+(i*100)+"%)", b.forEach((d,k)=>d.classList.toggle("active",k===i))}));
    setInterval(u,5000);
  })();
  
  // 2) EmailJS 表单提交
  (function(){
    if(typeof emailjs==="undefined")return;
    emailjs.init("HXCThZROMytOt-wyp");
    const a=document.getElementById("contactForm");
    a&&a.addEventListener("submit",e=>{
      e.preventDefault(),
      emailjs.sendForm("service_1ffkva1","template_ypdj9n9",a)
        .then(()=>{alert("邮件已发送成功，我们将尽快与您联系！"),a.reset()})
        .catch(err=>{console.error("邮件发送失败：",err),alert("邮件发送失败，请稍后再试。")});
    });
  })();
  
  // 3) 预留对比按钮
  (function(){
    const a=document.querySelector(".compare-features .btn");
    a&&a.addEventListener("click",()=>{alert("对比功能暂未实现 (预留)！")});
  })();
  
  // 4) 汉堡菜单
  (function(){
    const a=document.getElementById("menuIcon"),
          b=document.getElementById("mobileNav"),
          c=document.getElementById("closeBtn");
    if(!a||!b||!c)return;
    a.addEventListener("click",()=>b.classList.add("active")),
    c.addEventListener("click",()=>b.classList.remove("active")),
    b.querySelectorAll("ul li a").forEach(e=>e.addEventListener("click",()=>b.classList.remove("active")));
  })();
  
  // 5) 模态窗口
  (function(){
    document.querySelectorAll("[data-modal-target]").forEach(t=>{
      t.addEventListener("click",()=>{
        const a=document.querySelector(t.getAttribute("data-modal-target"));
        a&&a.classList.add("active");
      });
    });
    document.querySelectorAll("[data-modal-close]").forEach(b=>{
      b.addEventListener("click",()=>{
        const a=b.closest(".modal");
        a&&a.classList.remove("active");
      });
    });
  })();
  
  // 6) 无限+ Apple 风格暂停按钮
  (function(){
    const a=document.getElementById("infiniteScroller"),
          b=document.querySelector(".pause-btn");
    if(!a||!b)return;
    const c=["A peaceful brookside setting.png","A scenic riverside bend.png","A serene coastal shore.png","A shaded forest path.png"];
    let paused=!1, speed=0.3, last=0, items=[], track=document.createElement("div");
    track.className="infinite-scroller-track", track.style.display="flex", track.style.position="relative", track.style.transform="translateX(0)";
    a.appendChild(track);
    for(let i=0;i<2;i++) c.forEach(src=>{
      const d=document.createElement("div");
      d.className="infinite-scroller-item", d.style.position="absolute", d.style.width="100%";
      const img=document.createElement("img");
      img.src=src, img.alt=src, img.style.width="100%", img.style.objectFit="cover",
      d.appendChild(img), track.appendChild(d);
      let off=items.length===0?0:(items[items.length-1].x+d.offsetWidth);
      d.style.left=off+"px", items.push({el:d,x:off,width:d.offsetWidth});
    });
    function ani(t){
      if(!paused){
        let dt=t-last; last=t;
        const move=speed*(dt/16.67);
        items.forEach(o=>{o.x-=move,o.el.style.left=o.x+"px"});
        const lastItem=items[items.length-1];
        if(lastItem.x+lastItem.width<window.innerWidth+100){
          let idx=items.length % c.length,
              d=document.createElement("div");
          d.className="infinite-scroller-item", d.style.position="absolute", d.style.width="100%";
          const img=document.createElement("img");
          img.src=c[idx], img.alt=c[idx], img.style.width="100%", img.style.objectFit="cover",
          d.appendChild(img), track.appendChild(d);
          let off=items[items.length-1].x+d.offsetWidth;
          d.style.left=off+"px", items.push({el:d,x:off,width:d.offsetWidth});
        }
      }
      requestAnimationFrame(ani);
    }
    b.classList.remove("paused"), b.addEventListener("click",()=>{paused=!paused, b.classList.toggle("paused")});
    requestAnimationFrame(ani);
  })();
  document.addEventListener("DOMContentLoaded",function(){
    const a=document.getElementById("infiniteScroller"),
          b=document.querySelector(".infinite-scroller-track");
    if(a&&b){ b.style.transform="translateX(0)", a.innerHTML+=a.innerHTML; }
    const c=document.getElementById("pauseBtn");
    let paused=!1;
    c&&c.addEventListener("click",function(){
      paused=!paused, a.style.animationPlayState=paused?"paused":"running", c.textContent=paused?"▶":"❚❚";
    }), c&&(c.textContent="❚❚");
  });
  document.addEventListener("DOMContentLoaded",function(){
    const a=document.querySelector(".infinite-scroller-track");
    a&&(a.style.transform="translateX(0)");
  });
  
  // 7) 图片点击跳转
  (function(){
    document.querySelectorAll(".product-card img").forEach(img=>{
      img.addEventListener("click",()=>{ window.location.href=img.alt.toLowerCase().replace(/\s+/g,"-")+".html"; });
    });
  })();
  
  // 8) 卡片
  (function(){
    document.querySelectorAll(".flip-btn-front").forEach(btn=>{
      btn.addEventListener("click",()=>{ btn.closest(".card").style.transform="rotateY(180deg)"; });
    });
    document.querySelectorAll(".flip-btn-back").forEach(btn=>{
      btn.addEventListener("click",()=>{ btn.closest(".card").style.transform="rotateY(0deg)"; });
    });
  })();
  
  // 9) 帧
  (function(){
    const a=document.getElementById("animationCanvas"), ctx=a&&a.getContext("2d");
    if(!a||!ctx)return;
    const imgs=["A young man standing in a natural landscape1.png","A young man standing in a natural landscape2.png","A young man standing in a natural landscape3.png"];
    let imObjs=[], idx=0, playing=!0, alpha=0, fade=0.02, interval=1000/24, last=0, loaded=0;
    const btn=document.getElementById("playPauseButton");
    imgs.forEach((src,i)=>{
      const im=new Image; im.src=src;
      im.onload=()=>{ imObjs[i]=im, loaded++, loaded===1&&requestAnimationFrame(draw) };
      im.onerror=()=>console.error("❌ 图片加载失败:",src);
    });
    function resize(){ const d=window.innerWidth>=1024; a.width=window.innerWidth, a.height=window.innerHeight*(d?0.75:0.6) }
    window.addEventListener("resize",resize), resize();
    function draw(t){
      if(!playing||loaded===0)return;
      if(t-last>interval){
        ctx.clearRect(0,0,a.width,a.height);
        let nxt=(idx+1)%imgs.length;
        imObjs[idx]&&(ctx.globalAlpha=1-alpha, cover(imObjs[idx])),
        imObjs[nxt]&&(ctx.globalAlpha=alpha, cover(imObjs[nxt])),
        alpha+=fade, alpha>=1&&(alpha=0, idx=nxt), last=t;
      }
      requestAnimationFrame(draw);
    }
    function cover(im){
      const cr=a.width/a.height, ir=im.width/im.height;
      let dw, dh, ox, oy;
      if(ir>cr){ dh=a.height*0.9, dw=im.width*(dh/im.height), ox=(a.width-dw)/2, oy=(a.height-dh)/2 }
      else { dw=a.width, dh=im.height*(dw/im.width), ox=0, oy=(a.height-dh)/2 }
      ctx.drawImage(im,ox,oy,dw,dh);
    }
    btn&&btn.addEventListener("click",()=>{
      playing=!playing, btn.textContent=playing?"❚❚":"▶", playing&&requestAnimationFrame(draw);
    });
  })();
  
  
  
  // 12) 移动端触摸轮播 track
  (function(){
    const a=document.querySelector(".touch1-carousel-track"),
          b=Array.from(a?.children||[]),
          c=document.querySelector(".touch1-prev-btn"),
          d=document.querySelector(".touch1-next-btn");
    if(!a||!b.length||!c||!d)return;
    let i=0, w=615+15;
    function u(){ a.style.transform="translateX(-"+(i*w)+"px)", c.disabled=(i===0), d.disabled=(i===b.length-1); }
    c.addEventListener("click",()=>{if(i>0){i--; u();}});
    d.addEventListener("click",()=>{if(i<b.length-1){i++; u();}});
    u();
  })();
  
  // 初始化所有功能（去除 demo1 相关调用）
  document.addEventListener("DOMContentLoaded",function(){
    initHeroCarousel&&initHeroCarousel();
    initEmailJS&&initEmailJS();
    initCompareFeature&&initCompareFeature();
    initHamburgerMenu&&initHamburgerMenu();
    initModalWindows&&initModalWindows();
    initInfiniteScroller&&initInfiniteScroller();
    initProductImageClick&&initProductImageClick();
    initFlipCards&&initFlipCards();
    initFrameAnimation&&initFrameAnimation();
 
    initTouch1CarouselTrack&&initTouch1CarouselTrack();
  });
})();
