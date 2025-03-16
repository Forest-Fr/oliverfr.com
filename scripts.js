(function(){function _0x1(e){return document.getElementById(e)}function _0x2(e){return document.querySelector(e)}function _0x3(e){return document.querySelectorAll(e)}function _0x4(e){return Array.from(document.querySelectorAll(e))}
/* 1) Hero轮播 */
const _0x5=function(){
  var _0x6=_0x1("hero-slides"),_0x7=_0x3(".hero-dots .dot");
  if(!_0x6||!_0x7.length)return;
  var _0x8=0,_0x9=_0x6.children.length;
  function _0xa(){
    _0x8=(_0x8+1)%_0x9,
    _0x6.style.transform="translateX(-"+(_0x8*100)+"%)",
    _0x7.forEach(function(d,i){d.classList.toggle("active",i===_0x8)})
  }
  _0x7.forEach(function(d,i){
    d.addEventListener("click",function(){
      _0x8=i,
      _0x6.style.transform="translateX(-"+(_0x8*100)+"%)",
      _0x7.forEach(function(e,j){e.classList.toggle("active",j===_0x8)})
    })
  }),
  setInterval(_0xa,5000)
};
/* 2) EmailJS 表单提交 */
const _0xb=function(){
  if(typeof emailjs==="undefined")return;
  emailjs.init("HXCThZROMytOt-wyp");
  var _0xc=_0x1("contactForm");
  _0xc&&_0xc.addEventListener("submit",function(e){
    e.preventDefault(),
    emailjs.sendForm("service_1ffkva1","template_ypdj9n9",_0xc)
      .then(function(){alert("邮件已发送成功，我们将尽快与您联系！"),_0xc.reset()})
      .catch(function(err){console.error("邮件发送失败：",err),alert("邮件发送失败，请稍后再试。")})
  })
};
/* 3) 预留对比按钮 */
const _0xd=function(){
  var _0xe=_0x2(".compare-features .btn");
  _0xe&&_0xe.addEventListener("click",function(){alert("对比功能暂未实现 (预留)！")})
};
/* 4) 汉堡菜单 */
const _0xf=function(){
  var _0x10=_0x1("menuIcon"),_0x11=_0x1("mobileNav"),_0x12=_0x1("closeBtn");
  if(!_0x10||!_0x11||!_0x12)return;
  _0x10.addEventListener("click",function(){_0x11.classList.add("active")}),
  _0x12.addEventListener("click",function(){_0x11.classList.remove("active")}),
  _0x11.querySelectorAll("ul li a").forEach(function(l){l.addEventListener("click",function(){_0x11.classList.remove("active")})})
};
/* 5) 模态窗口 */
const _0x13=function(){
  _0x3("[data-modal-target]").forEach(function(t){
    t.addEventListener("click",function(){
      var m=_0x2(t.getAttribute("data-modal-target"));
      m&&m.classList.add("active")
    })
  }),
  _0x3("[data-modal-close]").forEach(function(b){
    b.addEventListener("click",function(){
      var m=b.closest(".modal");
      m&&m.classList.remove("active")
    })
  })
};
/* 6) 无限滚动 + Apple 风格暂停按钮 */
const _0x14=function(){
  var s=_0x1("infiniteScroller"),p=_0x2(".pause-btn");
  if(!s||!p)return;
  var _0x15=["A peaceful brookside setting.png","A scenic riverside bend.png","A serene coastal shore.png","A shaded forest path.png"],
      _0x16=!1,_0x17=0.3,_0x18=0, _0x19=[], _0x1a=document.createElement("div");
  _0x1a.className="infinite-scroller-track",
  _0x1a.style.display="flex",
  _0x1a.style.position="relative",
  _0x1a.style.transform="translateX(0)",
  s.appendChild(_0x1a);
  for(var i=0;i<2;i++){
    _0x15.forEach(function(src){_0x1b(src)})
  }
  function _0x1b(src){
    var c=document.createElement("div");
    c.className="infinite-scroller-item",
    c.style.position="absolute",
    c.style.width="100%";
    var im=document.createElement("img");
    im.src=src,im.alt=src,im.style.width="100%",im.style.objectFit="cover",
    c.appendChild(im),
    _0x1a.appendChild(c);
    var off= _0x19.length===0?0:(_0x19[_0x19.length-1].x+c.offsetWidth);
    c.style.left=off+"px",
    _0x19.push({el:c,x:off,width:c.offsetWidth})
  }
  function _0x1c(ts){
    if(!_0x16){
      var d=ts-_0x18;
      _0x18=ts;
      var m=_0x17*(d/16.67);
      _0x19.forEach(function(o){o.x-=m,o.el.style.left=o.x+"px"});
      var L=_0x19[_0x19.length-1];
      if(L.x+L.width<window.innerWidth+100){
        _0x1b(_0x15[_0x19.length%_0x15.length])
      }
    }
    requestAnimationFrame(_0x1c)
  }
  p.classList.remove("paused"),
  p.addEventListener("click",function(){_0x16=!_0x16, p.classList.toggle("paused")}),
  requestAnimationFrame(_0x1c)
};
/* 修复空白闪现 */
document.addEventListener("DOMContentLoaded",function(){
  var s=_0x1("infiniteScroller"), t=_0x2(".infinite-scroller-track");
  if(s&&t){t.style.transform="translateX(0)", s.innerHTML+=s.innerHTML}
  var p=_0x1("pauseBtn");var f=!1;
  p&&p.addEventListener("click",function(){
    f=!f, s.style.animationPlayState=f?"paused":"running", p.textContent=f?"▶":"❚❚"
  }),
  p&&(p.textContent="❚❚")
});
document.addEventListener("DOMContentLoaded",function(){
  var t=_0x2(".infinite-scroller-track");
  t&&(t.style.transform="translateX(0)")
});
/* 7) 图片点击跳转 */
const _0x1d=function(){
  _0x4(".product-card img").forEach(function(img){
    img.addEventListener("click",function(){
      window.location.href=img.alt.toLowerCase().replace(/\s+/g,"-")+".html"
    })
  })
};
/* 8) 翻转卡片 */
const _0x1e=function(){
  _0x4(".flip-btn-front").forEach(function(btn){
    btn.addEventListener("click",function(){
      btn.closest(".card").style.transform="rotateY(180deg)"
    })
  }),
  _0x4(".flip-btn-back").forEach(function(btn){
    btn.addEventListener("click",function(){
      btn.closest(".card").style.transform="rotateY(0deg)"
    })
  })
};
/* 9) 帧动画 */
const _0x1f=function(){
  var c=_0x1("animationCanvas"),ctx=c&&c.getContext("2d");
  if(!c||!ctx)return;
  var imgs=["A young man standing in a natural landscape1.png","A young man standing in a natural landscape2.png","A young man standing in a natural landscape3.png"],
      imObjs=[], idx=0, play=!0, a=0, f=0.02, inter=1000/24, lastT=0, load=0,
      pb=_0x1("playPauseButton");
  imgs.forEach(function(src,i){
    var im=new Image;
    im.src=src,
    im.onload=function(){
      imObjs[i]=im, load++, load===1&&requestAnimationFrame(draw)
    },
    im.onerror=function(){console.error("❌ 图片加载失败:",src)}
  });
  function resizeC(){
    var d=window.innerWidth>=1024;
    c.width=window.innerWidth,
    c.height=window.innerHeight*(d?0.75:0.6)
  }
  window.addEventListener("resize",resizeC),resizeC();
  function draw(t){
    if(!play||load===0)return;
    if(t-lastT>inter){
      ctx.clearRect(0,0,c.width,c.height);
      var nxt=(idx+1)%imgs.length;
      imObjs[idx]&&(ctx.globalAlpha=1-a, cover(ctx,imObjs[idx])),
      imObjs[nxt]&&(ctx.globalAlpha=a, cover(ctx,imObjs[nxt])),
      a+=f, a>=1&&(a=0, idx=nxt), lastT=t
    }
    requestAnimationFrame(draw)
  }
  function cover(ctx,im){
    var cr=c.width/c.height, ir=im.width/im.height, dw,dh,ox,oy;
    if(ir>cr){dh=c.height*0.9, dw=im.width*(dh/im.height),ox=(c.width-dw)/2,oy=(c.height-dh)/2}
    else {dw=c.width, dh=im.height*(dw/im.width),ox=0,oy=(c.height-dh)/2}
    ctx.drawImage(im,ox,oy,dw,dh)
  }
  pb&&pb.addEventListener("click",function(){
    play=!play, pb.textContent=play?"❚❚":"▶", play&&requestAnimationFrame(draw)
  }),
  window.addEventListener("DOMContentLoaded",function(){requestAnimationFrame(draw)})
};
/* 10) slider1 轮播 */
const _0x20=function(){
  var s=_0x4(".slider1-slide"),
      pb=_0x1("slider1-play-btn"),
      bi=_0x1("slider1-btn-icon"),
      dots=_0x4(".slider1-dot"),
      vt=_0x2(".view1-text"),
      vbs=_0x4(".view1-btn"),
      simgs=_0x4(".slider1-slide img");
  if(!s.length||!pb||!bi||!dots.length){console.warn("❌ initSlider1: 轮播元素未找到！");return;}
  var cur=0, playState=!0, af, startTime, dur=3000;
  function nav(name){
    var n=name.toLowerCase().replace(/\s+/g,"-")+".html";
    window.open(n,"_blank")
  }
  vbs.forEach(function(b,i){
    b.addEventListener("click",function(){
      var alt=s[i].querySelector("img").alt;
      nav(alt)
    })
  });
  simgs.forEach(function(img,i){
    img.addEventListener("click",function(){
      var alt=s[i].querySelector("img").alt;
      nav(alt)
    })
  });
  function updSlide(i){
    cur=i,
    s.forEach(function(sl,i2){sl.classList.toggle("active",i2===cur)}),
    dots.forEach(function(d,i2){d.classList.remove("active")}),
    dots[cur].classList.add("active"),
    pb&& (document.querySelector(".slider1-progress-bar").style.width=((cur+1)/s.length*100)+"%"),
    vt.textContent=s[cur].querySelector("img").alt
  }
  function animateProgress(ts){
    if(!startTime)startTime=ts;
    var el=ts-startTime, per=Math.min(el/dur,1)*100;
    document.querySelector(".slider1-progress-bar").style.width=per+"%";
    if(el<dur){af=requestAnimationFrame(animateProgress)}
    else {nextSlide()}
  }
  function nextSlide(){
    if(cur<s.length-1){cur++,updSlide(cur),document.querySelector(".slider1-progress-bar").style.width="0%",startTime=null,playState&& (af=requestAnimationFrame(animateProgress))}
    else {playState=!1,bi.textContent="↻",pb.classList.remove("playing","paused"),pb.classList.add("refresh")}
  }
  function togglePP(){
    if(!playState){
      playState=!0, cur=0,updSlide(cur),bi.textContent="⏸",pb.classList.remove("refresh"),pb.classList.add("playing"),startTime=null,af=requestAnimationFrame(animateProgress)
    } else {playState=!1, cancelAnimationFrame(af),bi.textContent="▶",pb.classList.remove("playing"),pb.classList.add("paused")}
  }
  dots.forEach(function(d,i){
    d.addEventListener("click",function(){
      updSlide(i), playState=!1, cancelAnimationFrame(af),bi.textContent="▶",pb.classList.remove("playing","refresh"),pb.classList.add("paused")
    })
  }),
  pb.addEventListener("click",togglePP),
  updSlide(0),requestAnimationFrame(animateProgress)
};
/* 11) touch1轮播 */
const _0x21=function(){
  var t=_0x2(".touch1-carousel-track"),
      s=Array.from(_0x3(".touch1-carousel-slide")),
      p=_0x2(".touch1-prev-btn"),
      n=_0x2(".touch1-next-btn");
  if(!t||!s.length||!p||!n)return;
  var cur=0, w=615+15;
  function upd(){
    t.style.transform="translateX(-"+(cur*w)+"px)",
    p.disabled=(cur===0),
    n.disabled=(cur===s.length-1)
  }
  p.addEventListener("click",function(){if(cur>0){cur--;upd()}}),
  n.addEventListener("click",function(){if(cur<s.length-1){cur++;upd()}}),
  upd()
};
/* 初始化所有功能 */
document.addEventListener("DOMContentLoaded",function(){
  _0x5();
  _0xb();
  _0xd();
  _0xf();
  _0x13();
  _0x14();
  _0x1d();
  _0x1e();
  _0x1f();
  _0x20();
  _0x21()
});
document.addEventListener("DOMContentLoaded",function(){
  var t=_0x2(".touch1-carousel-track"),
      s=Array.from(t.children),
      p=_0x2(".touch1-prev-btn"),
      n=_0x2(".touch1-next-btn");
  var cur=0, sw=615+15;
  function upd(){t.style.transform="translateX(-"+(cur*sw)+"px)", p.disabled=(cur===0), n.disabled=(cur===s.length-1)}
  p.addEventListener("click",()=>{if(cur>0){cur--;upd()}});
  n.addEventListener("click",()=>{if(cur<s.length-1){cur++;upd()}});
  upd()
});
})();
