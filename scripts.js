"use strict";function initHeroCarousel(){const e=document.getElementById("hero-slides"),t=document.querySelectorAll(".hero-dots .dot");if(!e||0===t.length)return;let n=0;const o=e.children.length;function r(){n=(n+1)%o,e.style.transform=`translateX(-${100*n}%)`,t.forEach((e,t)=>{e.classList.toggle("active",t===n)})}t.forEach((c,i)=>{c.addEventListener("click",()=>{n=i,e.style.transform=`translateX(-${100*n}%)`,t.forEach((e,t)=>{e.classList.toggle("active",t===n)})})}),setInterval(r,5e3)}function initEmailJS(){if("undefined"==typeof emailjs)return;emailjs.init("HXCThZROMytOt-wyp");const e=document.getElementById("contactForm");e&&e.addEventListener("submit",(t=>{t.preventDefault(),emailjs.sendForm("service_1ffkva1","template_ypdj9n9",e).then((()=>{alert("邮件已发送成功，我们将尽快与您联系！"),e.reset()})).catch((e=>{console.error("邮件发送失败：",e),alert("邮件发送失败，请稍后再试。")}))}))}function initCompareFeature(){const e=document.querySelector(".compare-features .btn");e&&e.addEventListener("click",()=>{alert("对比功能暂未实现 (预留)！")})}function initHamburgerMenu(){const e=document.getElementById("menuIcon"),t=document.getElementById("mobileNav"),n=document.getElementById("closeBtn");if(!e||!t||!n)return;e.addEventListener("click",()=>{t.classList.add("active")}),n.addEventListener("click",()=>{t.classList.remove("active")});t.querySelectorAll("ul li a").forEach((e=>{e.addEventListener("click",()=>{t.classList.remove("active")})}))}function initModalWindows(){document.querySelectorAll("[data-modal-target]").forEach((e=>{e.addEventListener("click",()=>{const t=document.querySelector(e.getAttribute("data-modal-target"));t&&t.classList.add("active")})})),document.querySelectorAll("[data-modal-close]").forEach((e=>{e.addEventListener("click",()=>{const t=e.closest(".modal");t&&t.classList.remove("active")})}))}function initInfiniteScroller(){const e=document.getElementById("infiniteScroller"),t=document.querySelector(".pause-btn");if(!e||!t)return;const n=["A peaceful brookside setting.png","A scenic riverside bend.png","A serene coastal shore.png","A shaded forest path.png"];let o=!1,r=.3,c=0,i=[];const a=document.createElement("div");function s(e){const t=document.createElement("div");t.className="infinite-scroller-item",t.style.position="absolute",t.style.width="100%";const n=document.createElement("img");n.src=e,n.alt=e,n.style.width="100%",n.style.objectFit="cover",t.appendChild(n),a.appendChild(t);const o=0===i.length?0:i[i.length-1].x+t.offsetWidth;t.style.left=`${o}px`;const r={el:t,x:o,width:t.offsetWidth};i.push(r)}function d(t){if(!o){const e=t-c;c=t;const n=r*(e/16.67);for(let e=0;e<i.length;e++){const t=i[e];t.x-=n,t.el.style.left=`${t.x}px`}const a=i[i.length-1];a.x+a.width<window.innerWidth+100&&s(n[i.length%i.length])}requestAnimationFrame(d)}a.className="infinite-scroller-track",a.style.display="flex",a.style.position="relative",a.style.transform="translateX(0)",e.appendChild(a);for(let e=0;e<2;e++)n.forEach(s);t.classList.remove("paused"),t.addEventListener("click",()=>{o=!o,t.classList.toggle("paused")}),requestAnimationFrame(d)}document.addEventListener("DOMContentLoaded",(function(){const e=document.getElementById("infiniteScroller"),t=document.querySelector(".infinite-scroller-track");if(e&&t&&(t.style.transform="translateX(0)",e.innerHTML+=e.innerHTML),document.getElementById("pauseBtn")){let n=!1;document.getElementById("pauseBtn").addEventListener("click",(function(){n=!n,e.style.animationPlayState=n?"paused":"running",this.textContent=n?"▶":"❚❚"})),document.getElementById("pauseBtn").textContent="❚❚"}})),document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelector(".infinite-scroller-track");e&&(e.style.transform="translateX(0)")}))}function initProductImageClick(){document.querySelectorAll(".product-card img").forEach((e=>{e.addEventListener("click",(()=>{const t=e.alt.toLowerCase().replace(/\s+/g,"-")+".html";window.location.href=t}))}))}function initFlipCards(){document.querySelectorAll(".flip-btn-front").forEach((e=>{e.addEventListener("click",(()=>{e.closest(".card").style.transform="rotateY(180deg)"}))})),document.querySelectorAll(".flip-btn-back").forEach((e=>{e.addEventListener("click",(()=>{e.closest(".card").style.transform="rotateY(0deg)"}))}))}function initFrameAnimation(){const e=document.getElementById("animationCanvas"),t=e?.getContext("2d");if(!e||!t)return;const n=["A young man standing in a natural landscape1.png","A young man standing in a natural landscape2.png","A young man standing in a natural landscape3.png"];let o=[],r=0,c=!0,i=0,a=.02,s=1e3/24,d=0,l=0;const m=document.getElementById("playPauseButton");function u(e,n){const o=e.width/e.height,r=n.width/n.height;let c,i,a,s;if(r>o?(i=.9*e.height,c=n.width*(i/n.height),a=(e.width-c)/2,s=(e.height-i)/2):(c=e.width,i=n.height*(c/n.width),a=0,s=(e.height-i)/2),e.drawImage(n,a,s,c,i)}function f(e){if(!c||0===l)return;if(e-d>s){t.clearRect(0,0,e.width,e.height);let m=(r+1)%o.length;o[r]&&(t.globalAlpha=1-i,u(t,o[r])),o[m]&&(t.globalAlpha=i,u(t,o[m])),(i+=a)>=1&&(i=0,r=m),d=e}requestAnimationFrame(f)}n.forEach(((e,t)=>{const n=new Image;n.src=e,n.onload=()=>{o[t]=n,l++,1===l&&requestAnimationFrame(f)},n.onerror=()=>console.error("❌ 图片加载失败: "+e)}));function M(){window.innerWidth>=1024?(e.width=window.innerWidth,e.height=.75*window.innerHeight):(e.width=window.innerWidth,e.height=.6*window.innerHeight)}window.addEventListener("resize",M),M(),m?.addEventListener("click",(()=>{c=!c,m.textContent=c?"❚❚":"▶",c&&requestAnimationFrame(f)})),window.addEventListener("DOMContentLoaded",(()=>{requestAnimationFrame(f)}))}document.addEventListener("DOMContentLoaded",(()=>{!function(){const e=document.querySelectorAll(".slider1-slide"),t=document.getElementById("slider1-play-btn"),n=document.getElementById("slider1-btn-icon"),o=document.querySelectorAll(".slider1-dot"),r=document.querySelector(".slider1-progress-bar"),c=document.querySelector(".view1-text"),i=document.querySelectorAll(".view1-btn"),a=document.querySelectorAll(".slider1-slide img");let s=0,d=!0,l,m,u=3e3;if(!e.length||!t||!n||!o.length)return void console.warn("❌ initSlider1: 轮播元素未找到！");function f(e){const t=e.toLowerCase().replace(/\s+/g,"-")+".html";window.open(t,"_blank")}i.forEach(((t,n)=>{t.addEventListener("click",(()=>{const o=e[n].querySelector("img").alt;f(o)}))})),a.forEach(((t,n)=>{t.addEventListener("click",(()=>{const o=e[n].querySelector("img").alt;f(o)}))}));function M(t){s=t,e.forEach(((e,n)=>{e.classList.toggle("active",n===s)})),o.forEach((e=>e.classList.remove("active"))),o[s].classList.add("active"),r.style.width=100*(s+1)/e.length+"%",c.textContent=e[s].querySelector("img").alt}function h(e){l||(l=e);let t=e-l,n=Math.min(t/u,1)*100;r.style.width=n+"%",t<u?m=requestAnimationFrame(h):p()}function p(){s<e.length-1?(s++,M(s),r.style.width="0%",l=null,d&&(m=requestAnimationFrame(h))):(d=!1,n.textContent="↻",t.classList.remove("playing","paused"),t.classList.add("refresh"))}function g(){d?(d=!1,cancelAnimationFrame(m),n.textContent="▶",t.classList.remove("playing"),t.classList.add("paused")):(d=!0,s=0,M(s),n.textContent="⏸",t.classList.remove("refresh"),t.classList.add("playing"),l=null,m=requestAnimationFrame(h))}o.forEach(((t,n)=>{t.addEventListener("click",(()=>{M(n),d=!1,cancelAnimationFrame(m),l=null,r.style.width="0%",s=n,g()}))})),t.addEventListener("click",g),M(0),requestAnimationFrame(h)}(),function(){const e=document.querySelector(".touch1-carousel-track"),t=Array.from(document.querySelectorAll(".touch1-carousel-slide")),n=document.querySelector(".touch1-prev-btn"),o=document.querySelector(".touch1-next-btn");let r=0;if(!e||!t.length||!n||!o)return;const c=630;function i(){e.style.transform=`translateX(-${r*c}px)`,n.disabled=0===r,o.disabled=r===t.length-1}n.addEventListener("click",(()=>{r>0&&(r--,i())})),o.addEventListener("click",(()=>{r<t.length-1&&(r++,i())})),i()}()})),document.addEventListener("DOMContentLoaded",(()=>{const e=document.querySelector(".touch1-carousel-track"),t=Array.from(e.children),n=document.querySelector(".touch1-prev-btn"),o=document.querySelector(".touch1-next-btn");let r=0;const c=t.length,i=630;function a(){e.style.transform=`translateX(-${r*i}px)`,n.disabled=0===r,o.disabled=r===c-1}n.addEventListener("click",(()=>{r>0&&(r--,a())})),o.addEventListener("click",(()=>{r<c-1&&(r++,a())})),a()}));document.addEventListener("DOMContentLoaded",(()=>{initHeroCarousel(),initEmailJS(),initCompareFeature(),initHamburgerMenu(),initModalWindows(),initInfiniteScroller(),initProductImageClick(),initFlipCards(),initFrameAnimation(),initSlider1(),initTouch1CarouselTrack()}));
