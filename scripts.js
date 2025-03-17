(function(){
  function _0x1(e){return document.getElementById(e)}
  function _0x2(e){return document.querySelector(e)}
  function _0x3(e){return document.querySelectorAll(e)}
  function _0x4(e){return Array.from(document.querySelectorAll(e))}

  /* 1) Hero */
  const _0x5=function(){
    var _0x6=_0x1("hero-slides"),_0x7=_0x3(".hero-dots .dot");
    if(!_0x6||!_0x7.length)return;
    let _0x8=0,_0x9=_0x6.children.length;
    function _0xa(){
      _0x8=(_0x8+1)%_0x9,
      _0x6.style.transform="translateX(-"+(_0x8*100)+"%)",
      _0x7.forEach((d,i)=>{d.classList.toggle("active",i===_0x8)})
    }
    _0x7.forEach((d,i)=>{
      d.addEventListener("click",()=>{
        _0x8=i,
        _0x6.style.transform="translateX(-"+(_0x8*100)+"%)",
        _0x7.forEach((e,j)=>{e.classList.toggle("active",j===_0x8)})
      })
    });
    setInterval(_0xa,5000)
  };

  /* 2) Email表单提交 */
  const _0xb=function(){
    if(typeof emailjs==="undefined")return;
    emailjs.init("HXCThZROMytOt-wyp");
    var _0xc=_0x1("contactForm");
    _0xc&&_0xc.addEventListener("submit",e=>{
      e.preventDefault(),
      emailjs.sendForm("service_1ffkva1","template_ypdj9n9",_0xc)
      .then(()=>{
        alert("邮件已发送成功，我们将尽快与您联系！"),
        _0xc.reset()
      })
      .catch(err=>{
        console.error("邮件发送失败：",err),
        alert("邮件发送失败，请稍后再试。")
      })
    })
  };

  /* 3) 预留对比按钮 */
  const _0xd=function(){
    var _0xe=_0x2(".compare-features .btn");
    _0xe&&_0xe.addEventListener("click",()=>{
      alert("对比功能暂未实现 (预留)！")
    })
  };

  /* 4) 菜单 */
  const _0xf=function(){
    var _0x10=_0x1("menuIcon"),_0x11=_0x1("mobileNav"),_0x12=_0x1("closeBtn");
    if(!_0x10||!_0x11||!_0x12)return;
    _0x10.addEventListener("click",()=>{_0x11.classList.add("active")});
    _0x12.addEventListener("click",()=>{_0x11.classList.remove("active")});
    _0x11.querySelectorAll("ul li a").forEach(l=>{
      l.addEventListener("click",()=>{_0x11.classList.remove("active")})
    })
  };

  /* 5) 模态窗口 */
  const _0x13=function(){
    _0x3("[data-modal-target]").forEach(t=>{
      t.addEventListener("click",()=>{
        var m=_0x2(t.getAttribute("data-modal-target"));
        m&&m.classList.add("active")
      })
    });
    _0x3("[data-modal-close]").forEach(b=>{
      b.addEventListener("click",()=>{
        var m=b.closest(".modal");
        m&&m.classList.remove("active")
      })
    })
  };

  /* 6) Apple 风格暂停按钮 */
  const _0x14=function(){
    var s=_0x1("infiniteScroller"),p=_0x2(".pause-btn");
    if(!s||!p)return;
    var _0x15=["A peaceful brookside setting.png","A scenic riverside bend.png","A serene coastal shore.png","A shaded forest path.png"],
        _0x16=!1,_0x17=0.3,_0x18=0,_0x19=[],_0x1a=document.createElement("div");
    _0x1a.className="infinite-scroller-track",
    _0x1a.style.display="flex",
    _0x1a.style.position="relative",
    _0x1a.style.transform="translateX(0)",
    s.appendChild(_0x1a);
    for(let i=0;i<2;i++){
      _0x15.forEach(src=>{_0x1b(src)})
    }
    function _0x1b(src){
      var c=document.createElement("div");
      c.className="infinite-scroller-item",
      c.style.position="absolute",
      c.style.width="100%";
      var im=document.createElement("img");
      im.src=src,im.alt=src,
      im.style.width="100%",
      im.style.objectFit="cover",
      c.appendChild(im),
      _0x1a.appendChild(c);
      var off=_0x19.length===0?0:(_0x19[_0x19.length-1].x+c.offsetWidth);
      c.style.left=off+"px",
      _0x19.push({el:c,x:off,width:c.offsetWidth})
    }
    function _0x1c(ts){
      if(!_0x16){
        let d=ts-_0x18;
        _0x18=ts;
        let m=_0x17*(d/16.67);
        _0x19.forEach(o=>{
          o.x-=m,
          o.el.style.left=o.x+"px"
        });
        let L=_0x19[_0x19.length-1];
        if(L.x+L.width<window.innerWidth+100){
          _0x1b(_0x15[_0x19.length%_0x15.length])
        }
      }
      requestAnimationFrame(_0x1c)
    }
    p.classList.remove("paused"),
    p.addEventListener("click",()=>{
      _0x16=!_0x16,
      p.classList.toggle("paused")
    }),
    requestAnimationFrame(_0x1c)
  };

  /* 修复空白闪现 */
  document.addEventListener("DOMContentLoaded",()=>{
    var s=_0x1("infiniteScroller"),
        t=_0x2(".infinite-scroller-track");
    if(s&&t){
      t.style.transform="translateX(0)",
      s.innerHTML+=s.innerHTML
    }
    var p=_0x1("pauseBtn");
    var f=!1;
    p&&p.addEventListener("click",()=>{
      f=!f,
      s.style.animationPlayState=f?"paused":"running",
      p.textContent=f?"▶":"❚❚"
    }),
    p&&(p.textContent="❚❚")
  });
  document.addEventListener("DOMContentLoaded",()=>{
    var t=_0x2(".infinite-scroller-track");
    t&&(t.style.transform="translateX(0)")
  });

  /* 7) 图片点击 */
  const _0x1d=function(){
    _0x4(".product-card img").forEach(img=>{
      img.addEventListener("click",()=>{
        window.location.href=img.alt.toLowerCase().replace(/\s+/g,"-")+".html"
      })
    })
  };

  /* 8) 卡片 */
  const _0x1e=function(){
    _0x4(".flip-btn-front").forEach(btn=>{
      btn.addEventListener("click",()=>{
        btn.closest(".card").style.transform="rotateY(180deg)"
      })
    });
    _0x4(".flip-btn-back").forEach(btn=>{
      btn.addEventListener("click",()=>{
        btn.closest(".card").style.transform="rotateY(0deg)"
      })
    })
  };

  /* 9) 动画 */
  const _0x1f=function(){
    var c=_0x1("animationCanvas"),
        ctx=c&&c.getContext("2d");
    if(!c||!ctx)return;
    var imgs=["A young man standing in a natural landscape1.png",
              "A young man standing in a natural landscape2.png",
              "A young man standing in a natural landscape3.png"],
        imObjs=[],idx=0,play=!0,a=0,f=0.02,inter=1000/24,lastT=0,load=0,
        pb=_0x1("playPauseButton");
    imgs.forEach((src,i)=>{
      var im=new Image;
      im.src=src,
      im.onload=function(){
        imObjs[i]=im,
        load++,
        1===load&&requestAnimationFrame(draw)
      },
      im.onerror=function(){
        console.error("❌ 图片加载失败:",src)
      }
    });
    function resizeC(){
      var d=window.innerWidth>=1024;
      c.width=window.innerWidth,
      c.height=window.innerHeight*(d?0.75:0.6)
    }
    window.addEventListener("resize",resizeC),
    resizeC();
    function draw(t){
      if(!play||0===load)return;
      if(t-lastT>inter){
        ctx.clearRect(0,0,c.width,c.height);
        var nxt=(idx+1)%imgs.length;
        imObjs[idx]&&(ctx.globalAlpha=1-f,cover(ctx,imObjs[idx])),
        imObjs[nxt]&&(ctx.globalAlpha=f,cover(ctx,imObjs[nxt])),
        f+=0.02,
        f>=1&&(f=0,idx=nxt),
        lastT=t
      }
      requestAnimationFrame(draw)
    }
    function cover(ctx,im){
      var cr=c.width/c.height,
          ir=im.width/im.height,
          drawW,drawH,offsetX,offsetY;
      if(ir>cr){
        drawH=c.height*0.9,
        drawW=im.width*(drawH/im.height),
        offsetX=(c.width-drawW)/2,
        offsetY=(c.height-drawH)/2
      }else{
        drawW=c.width,
        drawH=im.height*(drawW/im.width),
        offsetX=0,
        offsetY=(c.height-drawH)/2
      }
      ctx.drawImage(im,offsetX,offsetY,drawW,drawH)
    }
    pb&&pb.addEventListener("click",()=>{
      play=!play,
      pb.textContent=play?"❚❚":"▶",
      play&&requestAnimationFrame(draw)
    }),
    window.addEventListener("DOMContentLoaded",()=>{
      requestAnimationFrame(draw)
    })
  };

  /* 10) slider1 */
  const _0x20=function(){
    var s=_0x4(".slider1-slide"),
        pb=_0x1("slider1-play-btn"),
        bi=_0x1("slider1-btn-icon"),
        dots=_0x4(".slider1-dot"),
        vt=_0x2(".view1-text"),
        vbs=_0x4(".view1-btn"),
        simgs=_0x4(".slider1-slide img");
    if(!s.length||!pb||!bi||!dots.length){
      console.warn("❌ initSlider1: 轮播元素未找到！");
      return;
    }
    let cur=0,playing=!0,af,startTime,dur=3000,navLock=!1,lockTime=1000;
    function nav(text){
      if(navLock)return;
      navLock=!0;
      setTimeout(()=>{navLock=!1},lockTime);
      let n=text.toLowerCase().replace(/\s+/g,"-")+".html";
      window.open(n,"_blank")
    }
    vbs.forEach((btn,i)=>{
      btn.addEventListener("click",()=>{
        let alt=s[i].querySelector("img").alt;
        nav(alt)
      })
    });
    simgs.forEach((img,i)=>{
      img.addEventListener("click",()=>{
        let alt=s[i].querySelector("img").alt;
        nav(alt)
      })
    });
    function updSlide(i){
      cur=i,
      s.forEach((sl,idx)=>{sl.classList.toggle("active",idx===cur)}),
      dots.forEach((d,idx)=>{d.classList.remove("active")}),
      dots[cur].classList.add("active"),
      document.querySelector(".slider1-progress-bar").style.width=((cur+1)/s.length*100)+"%",
      vt.textContent=s[cur].querySelector("img").alt
    }
    function animateProgress(ts){
      if(!startTime) startTime=ts;
      let elapsed=ts-startTime,
          per=Math.min(elapsed/dur,1)*100;
      document.querySelector(".slider1-progress-bar").style.width=per+"%";
      elapsed<dur?af=requestAnimationFrame(animateProgress):nextSlide()
    }
    function nextSlide(){
      if(cur<s.length-1){
        cur++,
        updSlide(cur),
        document.querySelector(".slider1-progress-bar").style.width="0%",
        startTime=null,
        playing&&(af=requestAnimationFrame(animateProgress))
      }else{
        playing=!1,
        bi.textContent="↻",
        pb.classList.remove("playing","paused"),
        pb.classList.add("refresh")
      }
    }
    function togglePP(){
      playing?
      (playing=!1,
       cancelAnimationFrame(af),
       bi.textContent="▶",
       pb.classList.remove("playing"),
       pb.classList.add("paused"))
      :(playing=!0,
        cur=0,
        updSlide(cur),
        bi.textContent="❚❚",
        pb.classList.remove("refresh"),
        pb.classList.add("playing"),
        startTime=null,
        af=requestAnimationFrame(animateProgress))
    }
    dots.forEach((d,i)=>{
      d.addEventListener("click",()=>{
        updSlide(i),
        playing=!1,
        cancelAnimationFrame(af),
        bi.textContent="▶",
        pb.classList.remove("playing","refresh"),
        pb.classList.add("paused")
      })
    });
    pb.addEventListener("click",togglePP),
    updSlide(0),
    requestAnimationFrame(animateProgress)
  };

  /* 11) touch1 */
  const _0x21=function(){
    var t=_0x2(".touch1-carousel-track"),
        s=Array.from(_0x3(".touch1-carousel-slide")),
        p=_0x2(".touch1-prev-btn"),
        n=_0x2(".touch1-next-btn");
    if(!t||!s.length||!p||!n)return;
    let cur=0,w=615+15;
    function upd(){
      t.style.transform="translateX(-"+(cur*w)+"px)",
      p.disabled=(cur===0),
      n.disabled=(cur===s.length-1)
    }
    p.addEventListener("click",()=>{cur>0&&(cur--,upd())});
    n.addEventListener("click",()=>{cur<s.length-1&&(cur++,upd())});
    upd()
  };

  /* 初始化所有功能 */
  document.addEventListener("DOMContentLoaded",()=>{
    _0x5();_0xb();_0xd();_0xf();_0x13();_0x14();_0x1d();_0x1e();_0x1f();_0x20();_0x21()
  });
  document.addEventListener("DOMContentLoaded",function(){
    var t=_0x2(".touch1-carousel-track"),
        s=Array.from(t.children),
        p=_0x2(".touch1-prev-btn"),
        n=_0x2(".touch1-next-btn"),
        cur=0,
        sw=615+15;
    function upd(){
      t.style.transform="translateX(-"+(cur*sw)+"px)",
      p.disabled=(cur===0),
      n.disabled=(cur===s.length-1)
    }
    p.addEventListener("click",()=>{cur>0&&(cur--,upd())});
    n.addEventListener("click",()=>{cur<s.length-1&&(cur++,upd())});
    upd()
  })
})();
