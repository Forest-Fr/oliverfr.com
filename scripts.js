(function(){function _0x1(a){return a}var _0x2=function(a){return document.querySelector(a)},_0x3=function(a){return Array.from(document.querySelectorAll(a))};(function(){var _0x4=function(){var _0x5=_0x2(".demo1-carousel-container"),
    _0x6=_0x2(".demo1-carousel-track"),
    _0x7=_0x3(".demo1-carousel-slide"),
    _0x8=_0x2(".demo1-carousel-prev"),
    _0x9=_0x2(".demo1-carousel-next"),
    _0xa=_0x3(".demo1-carousel-dot");
  if(!_0x5||!_0x6||!_0x7.length||!_0xa.length)return;
  var _0xb=_0x7.length, _0xc=!1;
  // 克隆首尾幻灯片
  var _0xd=_0x7[0].cloneNode(!0), _0xe=_0x7[_0xb-1].cloneNode(!0);
  _0x6.appendChild(_0xd), _0x6.insertBefore(_0xe,_0x6.firstChild);
  _0x7=_0x3(".demo1-carousel-slide"); 
  var _0xf=1, _0x10=_0x7[1].getBoundingClientRect().width+15;
  function _0x11(_0x12){_0x10=_0x7[1].getBoundingClientRect().width+15, 
    _0x6.style.transition=_0x12?"transform 0.5s ease-in-out":"none",
    _0x6.style.transform="translateX("+(-_0xf*_0x10)+"px)";
    var _0x13=(_0xf===0)?_0xb-1:(_0xf===_0x7.length-1)?0:_0xf-1;
    _0xa.forEach(function(_0x14,_0x15){_0x14.classList.toggle("active",_0x15===_0x13)}),
    _0x7.forEach(function(_0x16){_0x16.classList.remove("active","prev","next","shadow");
      var _0x17=_0x16.querySelector("a");_0x17&&( _0x17.style.pointerEvents=_0x16.classList.contains("active")?"auto":"none")
    }),
    _0x7[_0xf].classList.add("active");
    var _0x18=(_0xf+1)%_0x7.length, _0x19=(_0xf-1+_0x7.length)%_0x7.length;
    _0x7[_0x18].classList.add("next"), _0x7[_0x19].classList.add("prev"),
    _0x7.forEach(function(_0x1a){!_0x1a.classList.contains("active")&&_0x1a.classList.add("shadow")}),
    _0x3(".demo1-explore-btn").forEach(function(_0x1b){_0x1b.style.opacity="0",_0x1b.style.pointerEvents="none"});
    var _0x1c=_0x7[_0xf].querySelector(".demo1-explore-btn");
    _0x1c&&( _0x1c.style.opacity="1", _0x1c.style.pointerEvents="auto")
  }
  function _0x1d(){if(_0xc)return;_0xc=!0, _0xf++, _0x11(!0), setTimeout(function(){if(_0xf===_0x7.length-1){_0x6.style.transition="none",_0xf=1,_0x11(!1)}_0xc=!1},500)}
  function _0x1e(){if(_0xc)return;_0xc=!0, _0xf--, _0x11(!0), setTimeout(function(){if(_0xf===0){_0x6.style.transition="none",_0xf=_0x7.length-2,_0x11(!1)}_0xc=!1},500)}
  function _0x1f(_0x20){if(_0xc)return;_0xc=!0, _0xf=_0x20+1, _0x6.style.transition="transform 0.5s ease-in-out", _0x11(!0), setTimeout(function(){_0xc=!1},500)}
  _0x8&&_0x8.addEventListener("click",_0x1e),
  _0x9&&_0x9.addEventListener("click",_0x1d),
  _0xa.forEach(function(_0x21,_0x22){_0x21.addEventListener("click",function(){_0x1f(_0x22), _0x24()})});
  var _0x23=setInterval(_0x1d,5000);
  function _0x24(){clearInterval(_0x23), _0x23=setInterval(_0x1d,5000)}
  _0x6.addEventListener("transitionend",function(){_0xc=!1});
  _0x6.style.transition="none", _0x11(!1), setTimeout(function(){_0x6.style.transition="transform 0.5s ease-in-out"},50),
  window.innerWidth<=768?(_0x8.style.display="block",_0x9.style.display="block"):(_0x8.style.display="none",_0x9.style.display="none"),
  _0x7.forEach(function(_0x25){_0x25.addEventListener("click",function(e){if(_0x25.classList.contains("active"))return;else if(_0x25.classList.contains("next")){e.preventDefault(),_0x1d(),_0x24()}else if(_0x25.classList.contains("prev")){e.preventDefault(),_0x1e(),_0x24()}})});
  _0x5.addEventListener("touchstart",function(e){if(_0xc)return; window._sx=e.touches[0].clientX, window._sw=!0, clearInterval(_0x23)}, {passive:true}),
  _0x5.addEventListener("touchend",function(e){if(!window._sw)return; var _0x26=e.changedTouches[0].clientX, _0x27=_0x26-window._sx; window._sw=!0; Math.abs(_0x27)<20?(_0x11(),_0x24()):(_0x27<0?_0x1d():_0x1e(),_0x24())}, {passive:true})
  };
  window.addEventListener("load",_0x4);
})();
(function(){const _0x28=document.getElementById("hero-slides"),_0x29=document.querySelectorAll(".hero-dots .dot");if(!_0x28||!_0x29.length)return;let _0x2a=0,_0x2b=_0x28.children.length,_0x2c=()=>{_0x2a=(_0x2a+1)%_0x2b,_0x28.style.transform="translateX(-"+(_0x2a*100)+"%)",_0x29.forEach((e,i)=>{e.classList.toggle("active",i===_0x2a)})};_0x29.forEach((e,i)=>{e.addEventListener("click",()=>{_0x2a=i,_0x28.style.transform="translateX(-"+(_0x2a*100)+"%)",_0x29.forEach((d,j)=>{d.classList.toggle("active",j===_0x2a)})})}),setInterval(_0x2c,5000)});
(function(){if(typeof emailjs==="undefined")return;emailjs.init("HXCThZROMytOt-wyp");var _0x2d=document.getElementById("contactForm");_0x2d&&_0x2d.addEventListener("submit",function(e){e.preventDefault(),emailjs.sendForm("service_1ffkva1","template_ypdj9n9",_0x2d).then(function(){alert("邮件已发送成功，我们将尽快与您联系！"),_0x2d.reset()}).catch(function(e){console.error("邮件发送失败：",e),alert("邮件发送失败，请稍后再试。")})})})();
(function(){var _0x2e=document.querySelector(".compare-features .btn");_0x2e&&_0x2e.addEventListener("click",function(){alert("对比功能暂未实现 (预留)！")})})();
(function(){var _0x2f=document.getElementById("menuIcon"),_0x30=document.getElementById("mobileNav"),_0x31=document.getElementById("closeBtn");if(!_0x2f||!_0x30||!_0x31)return;_0x2f.addEventListener("click",()=>{_0x30.classList.add("active")}),_0x31.addEventListener("click",()=>{_0x30.classList.remove("active")}),_0x30.querySelectorAll("ul li a").forEach(e=>{e.addEventListener("click",()=>{_0x30.classList.remove("active")})})})();
(function(){document.querySelectorAll("[data-modal-target]").forEach(e=>{e.addEventListener("click",()=>{var _0x32=document.querySelector(e.getAttribute("data-modal-target"));_0x32&&_0x32.classList.add("active")})});document.querySelectorAll("[data-modal-close]").forEach(e=>{e.addEventListener("click",()=>{var _0x33=e.closest(".modal");_0x33&&_0x33.classList.remove("active")})})})();
(function(){var _0x34=document.getElementById("infiniteScroller"),_0x35=document.querySelector(".pause-btn");if(!_0x34||!_0x35)return;var _0x36=["A peaceful brookside setting.png","A scenic riverside bend.png","A serene coastal shore.png","A shaded forest path.png"],_0x37=!1,_0x38=0.3,_0x39=0, _0x3a=[], _0x3b=document.createElement("div");_0x3b.className="infinite-scroller-track",_0x3b.style.display="flex",_0x3b.style.position="relative",_0x3b.style.transform="translateX(0)",_0x34.appendChild(_0x3b);for(var i=0;i<2;i++)_0x36.forEach(function(s){var _0x3c=document.createElement("div");_0x3c.className="infinite-scroller-item",_0x3c.style.position="absolute",_0x3c.style.width="100%";var _0x3d=document.createElement("img");_0x3d.src=s,_0x3d.alt=s,_0x3d.style.width="100%",_0x3d.style.objectFit="cover",_0x3c.appendChild(_0x3d),_0x3b.appendChild(_0x3c);var _0x3e=_0x3a.length===0?0:(_0x3a[_0x3a.length-1].x+_0x3c.offsetWidth);_0x3c.style.left=_0x3e+"px",_0x3a.push({el:_0x3c,x:_0x3e,width:_0x3c.offsetWidth})});
function _0x3f(t){if(!_0x37){var _0x40=t-_0x39;_0x39=t;var _0x41=_0x38*(_0x40/16.67);_0x3a.forEach(function(o){o.x-=_0x41,o.el.style.left=o.x+"px"});var _0x42=_0x3a[_0x3a.length-1];if(_0x42.x+_0x42.width<window.innerWidth+100){var _0x43=_0x3a.length % _0x36.length;var _0x44=document.createElement("div");_0x44.className="infinite-scroller-item",_0x44.style.position="absolute",_0x44.style.width="100%";var _0x45=document.createElement("img");_0x45.src=_0x36[_0x43],_0x45.alt=_0x36[_0x43],_0x45.style.width="100%",_0x45.style.objectFit="cover",_0x44.appendChild(_0x45),_0x3b.appendChild(_0x44);var _0x46=_0x3a[_0x3a.length-1].x+_0x44.offsetWidth;_0x44.style.left=_0x46+"px",_0x3a.push({el:_0x44,x:_0x46,width:_0x44.offsetWidth})}}requestAnimationFrame(_0x3f)}
_0x35.classList.remove("paused"),_0x35.addEventListener("click",function(){_0x37=!_0x37,_0x35.classList.toggle("paused")}),requestAnimationFrame(_0x3f)})();
document.addEventListener("DOMContentLoaded",function(){var _0x47=document.getElementById("infiniteScroller"),_0x48=document.querySelector(".infinite-scroller-track");if(_0x47&&_0x48){_0x48.style.transform="translateX(0)",_0x47.innerHTML+=_0x47.innerHTML}var _0x49=document.getElementById("pauseBtn");var _0x4a=!1;_0x49&&_0x49.addEventListener("click",function(){_0x4a=!_0x4a, _0x47.style.animationPlayState=_0x4a?"paused":"running", _0x49.textContent=_0x4a?"▶":"❚❚"}),_0x49&&( _0x49.textContent="❚❚")});
document.addEventListener("DOMContentLoaded",function(){var _0x4b=document.querySelector(".infinite-scroller-track");_0x4b&&( _0x4b.style.transform="translateX(0)")})();
(function(){_0x3(".product-card img").forEach(function(i){i.addEventListener("click",function(){window.location.href=i.alt.toLowerCase().replace(/\s+/g,"-")+".html"})})})();
(function(){_0x3(".flip-btn-front").forEach(function(b){b.addEventListener("click",function(){b.closest(".card").style.transform="rotateY(180deg)"})});
_0x3(".flip-btn-back").forEach(function(b){b.addEventListener("click",function(){b.closest(".card").style.transform="rotateY(0deg)"})})})();
(function(){var c=document.getElementById("animationCanvas"),ctx=c&&c.getContext("2d");if(!c||!ctx)return;var _0x4c=["A young man standing in a natural landscape1.png","A young man standing in a natural landscape2.png","A young man standing in a natural landscape3.png"], _0x4d=[],_0x4e=0,_0x4f=!0, _0x50=0, _0x51=0.02, _0x52=1000/24, _0x53=0, _0x54=0, _0x55=0, _0x56=document.getElementById("playPauseButton");
_0x4c.forEach(function(s,i){var im=new Image;im.src=s, im.onload=function(){_0x4d[i]=im, _0x55++, _0x55===1&&requestAnimationFrame(_0x57)}, im.onerror=function(){console.error("❌ 图片加载失败:",s)}});
function _0x57(t){if(!_0x4f||_0x55===0)return;if(t-_0x53>_0x52){ctx.clearRect(0,0,c.width,c.height);var _0x58=( _0x4e+1)%_0x4c.length; _0x4d[_0x4e]&&(ctx.globalAlpha=1-_0x50, _0x59(_0x4d[_0x4e])),
_0x4d[_0x58]&&(ctx.globalAlpha=_0x50, _0x59(_0x4d[_0x58])), _0x50+=_0x51, _0x50>=1&&( _0x50=0, _0x4e=_0x58), _0x53=t}requestAnimationFrame(_0x57)}
function _0x59(im){var cr=c.width/c.height, ir=im.width/im.height, dw,dh,ox,oy;ir>cr?(dh=c.height*0.9,dw=im.width*(dh/im.height),ox=(c.width-dw)/2,oy=(c.height-dh)/2):(dw=c.width,dh=im.height*(dw/im.width),ox=0,oy=(c.height-dh)/2), ctx.drawImage(im,ox,oy,dw,dh)}
_0x56&&_0x56.addEventListener("click",function(){_0x4f=!_0x4f, _0x56.textContent=_0x4f?"❚❚":"▶",_0x4f&&requestAnimationFrame(_0x57)})})();
(function(){var t=_0x2(".touch1-carousel-track"), s=Array.from(t?.children||[]), p=_0x2(".touch1-prev-btn"), n=_0x2(".touch1-next-btn");if(!t||!s.length||!p||!n)return;var idx=0, w=615+15;function u(){t.style.transform="translateX(-"+(idx*w)+"px)", p.disabled=(idx===0), n.disabled=(idx===s.length-1)}p.addEventListener("click",function(){if(idx>0){idx--; u()}}), n.addEventListener("click",function(){if(idx<s.length-1){idx++; u()}}), u()})();
(function(){var c=_0x2(".spec1-carousel-container"), t=_0x2(".spec1-carousel-track"), s=Array.from(document.querySelectorAll(".spec1-carousel-slide")), p=_0x2(".spec1-carousel-prev"), n=_0x2(".spec1-carousel-next");if(!c||!t||!s.length||!p||!n){console.warn("spec1 hand-control carousel: elements or arrows not found!");return}var R=s.length, idx=1, anim=!1, w=0, gap=15;var fc=s[0].cloneNode(!0), lc=s[R-1].cloneNode(!0);t.appendChild(fc), t.insertBefore(lc,t.firstChild), s=Array.from(t.querySelectorAll(".spec1-carousel-slide"));
function u(){if(window.innerWidth<=768){gap=c.offsetWidth*0.04, s.forEach(function(e){e.style.width=c.offsetWidth*0.85+"px"}), w=c.offsetWidth*0.85+gap}else{s.forEach(function(e){e.style.width=""}), gap=15, w=s[1].getBoundingClientRect().width+gap}}
function up(a){u(), t.style.transition=a?"transform 0.5s ease-in-out":"none", window.innerWidth<=768?t.style.transform="translateX("+(-idx*w+gap/2)+"px)":t.style.transform="translateX("+(-idx*w)+"px)", s.forEach(function(e){e.classList.remove("active","prev","next","shadow")}), s[idx]&&s[idx].classList.add("active"); var ni=(idx+1)%s.length, pi=(idx-1+s.length)%s.length; s[ni]&&s[ni].classList.add("next"), s[pi]&&s[pi].classList.add("prev"), s.forEach(function(e){!e.classList.contains("active")&&e.classList.add("shadow"), e.querySelector("a")&&(e.querySelector("a").style.pointerEvents=e.classList.contains("active")?"auto":"none")})}
function ns(){if(anim)return;anim=!0, idx++, up(!0), setTimeout(function(){if(idx===s.length-1){t.style.transition="none", idx=1, up(!1)}anim=!1},500)}
function ps(){if(anim)return;anim=!0, idx--, up(!0), setTimeout(function(){if(idx===0){t.style.transition="none", idx=s.length-2, up(!1)}anim=!1},500)}
function js(i){if(anim)return;anim=!0, idx=i+1, t.style.transition="transform 0.5s ease-in-out", up(!0), setTimeout(function(){anim=!1},500)}
p.addEventListener("click",function(){ps(); rI()}), n.addEventListener("click",function(){ns(); rI()}), s.forEach(function(e,i){e.addEventListener("click",function(ev){if(e.classList.contains("active"));else if(e.classList.contains("next")){ev.preventDefault(), ns()}else if(e.classList.contains("prev")){ev.preventDefault(), ps()}}), e.querySelector(".spec1-explore-btn")&&e.querySelector(".spec1-explore-btn").addEventListener("click",function(ev){ev.stopPropagation()})});
function rI(){ } 
c.addEventListener("touchstart",function(e){if(e.touches.length===1&&!anim){window._sx2=e.touches[0].clientX, window._sw2=!0}}, {passive:true});
c.addEventListener("touchmove",function(){}, {passive:true});
c.addEventListener("touchend",function(e){if(!window._sw2)return; var ex=e.changedTouches[0].clientX, d=ex-window._sx2; window._sw2=!1, Math.abs(d)>50&&(d<0?ns():ps())}, {passive:true});
window.addEventListener("resize",function(){anim=!1, t.style.transition="none", up(), setTimeout(function(){t.style.transition="transform 0.5s ease-in-out"},50)}), t.style.transition="none", up(!1), setTimeout(function(){t.style.transition="transform 0.5s ease-in-out"},50), window.innerWidth<=768?(p.style.display="block", n.style.display="block"):(p.style.display="block", n.style.display="block")
})();
document.addEventListener("DOMContentLoaded",function(){initHeroCarousel();initEmailJS();initCompareFeature();initHamburgerMenu();initModalWindows();initInfiniteScroller();initProductImageClick();initFlipCards();initFrameAnimation();_0x4();initspec1ManualCarouselTrack();initTouch1CarouselTrack()});
document.addEventListener("DOMContentLoaded",function(){var t=_0x2(".touch1-carousel-track"), s=Array.from(t.children), p=_0x2(".touch1-prev-btn"), n=_0x2(".touch1-next-btn");var idx=0, ts=s.length, w=615+15; function u(){t.style.transform="translateX(-"+(idx*w)+"px)", p.disabled=(idx===0), n.disabled=(idx===ts-1)};p.addEventListener("click",function(){if(idx>0){idx--; u()} }), n.addEventListener("click",function(){if(idx<ts-1){idx++; u()} }), u()});
})();
