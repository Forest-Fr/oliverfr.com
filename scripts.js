"use strict";(function(){function t(){const e=document.getElementById("hero-slides"),t=document.querySelectorAll(".hero-dots .dot");if(!e||0===t.length)return;let n=0;const c=e.children.length;function i(){n=(n+1)%c,e.style.transform=`translateX(-${100*n}%)`,t.forEach((e,t)=>{e.classList.toggle("active",t===n)})}t.forEach((r,o)=>{r.addEventListener("click",()=>{n=o,e.style.transform=`translateX(-${100*n}%)`,t.forEach((e,t)=>{e.classList.toggle("active",t===n)})})}),setInterval(i,5e3)}function n(){if("undefined"==typeof emailjs)return;emailjs.init("HXCThZROMytOt-wyp");const e=document.getElementById("contactForm");e&&e.addEventListener("submit",(t=>{t.preventDefault(),emailjs.sendForm("service_1ffkva1","template_ypdj9n9",e).then((()=>{alert("邮件已发送成功，我们将尽快与您联系！"),e.reset()})).catch((e=>{console.error("邮件发送失败：",e),alert("邮件发送失败，请稍后再试。")}))}))}function c(){const e=document.querySelector(".compare-features .btn");e&&e.addEventListener("click",(()=>{alert("对比功能暂未实现 (预留)！")}))}function i(){const e=document.getElementById("menuIcon"),t=document.getElementById("mobileNav"),n=document.getElementById("closeBtn");if(!e||!t||!n)return;e.addEventListener("click",(()=>{t.classList.add("active")})),n.addEventListener("click",(()=>{t.classList.remove("active")})),t.querySelectorAll("ul li a").forEach((e=>{e.addEventListener("click",(()=>{t.classList.remove("active")}))}))}function r(){document.querySelectorAll("[data-modal-target]").forEach((e=>{e.addEventListener("click",(()=>{const t=document.querySelector(e.getAttribute("data-modal-target"));t&&t.classList.add("active")}))})),document.querySelectorAll("[data-modal-close]").forEach((e=>{e.addEventListener("click",(()=>{const t=e.closest(".modal");t&&t.classList.remove("active")}))}))}function o(){const e=document.getElementById("infiniteScroller"),t=document.querySelector(".pause-btn");if(!e||!t)return;const n=["A peaceful brookside setting.png","A scenic riverside bend.png","A serene coastal shore.png","A shaded forest path.png"];let c=!1,i=.3,r=0,o=[],a=document.createElement("div");function s(e){const t=document.createElement("div");t.className="infinite-scroller-item",t.style.position="absolute",t.style.width="100%";const c=document.createElement("img");c.src=e,c.alt=e,c.style.width="100%",c.style.objectFit="cover",t.appendChild(c),a.appendChild(t);const i=0===o.length?0:o[o.length-1].x+t.offsetWidth;t.style.left=`${i}px`;const r={el:t,x:i,width:t.offsetWidth};o.push(r)}function d(t){if(!c){const e=t-r;r=t;const n=i*(e/16.67);for(let e=0;e<o.length;e++){const t=o[e];t.x-=n,t.el.style.left=`${t.x}px`}const a=o[o.length-1];a.x+a.width<window.innerWidth+100&&s(n[o.length%n.length])}requestAnimationFrame(d)}a.className="infinite-scroller-track",a.style.display="flex",a.style.position="relative",a.style.transform="translateX(0)",e.appendChild(a);for(let e=0;e<2;e++)n.forEach(s);t.classList.remove("paused"),t.addEventListener("click",(()=>{c=!c,t.classList.toggle("paused")})),requestAnimationFrame(d)}document.addEventListener("DOMContentLoaded",(function(){const e=document.getElementById("infiniteScroller"),t=document.querySelector(".infinite-scroller-track");if(e&&t&&(t.style.transform="translateX(0)",e.innerHTML+=e.innerHTML),document.getElementById("pauseBtn")){let n=!1;document.getElementById("pauseBtn").addEventListener("click",(function(){n=!n,e.style.animationPlayState=n?"paused":"running",this.textContent=n?"▶":"❚❚"})),document.getElementById("pauseBtn").textContent="❚❚"}})),document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelector(".infinite-scroller-track");e&&(e.style.transform="translateX(0)")}))}function a(){document.querySelectorAll(".product-card img").forEach((e=>{e.addEventListener("click",(()=>{const t=e.alt.toLowerCase().replace(/\s+/g,"-")+".html";window.location.href=t}))}))}function s(){document.querySelectorAll(".flip-btn-front").forEach((e=>{e.addEventListener("click",(()=>{e.closest(".card").style.transform="rotateY(180deg)"}))})),document.querySelectorAll(".flip-btn-back").forEach((e=>{e.addEventListener("click",(()=>{e.closest(".card").style.transform="rotateY(0deg)"}))}))}function d(){const e=document.getElementById("animationCanvas"),t=e?.getContext("2d");if(!e||!t)return;const n=["A young man standing in a natural landscape1.png","A young man standing in a natural landscape2.png","A young man standing in a natural landscape3.png"];let c=[],i=0,r=!0,o=0,a=.02,s=1e3/24,d=0,l=0;const m=document.getElementById("playPauseButton");function u(e,t){const n=e.width/e.height,c=t.width/t.height;let i,r,o,a;if(c>n?(r=.9*e.height,i=t.width*(r/t.height),o=(e.width-i)/2,a=(e.height-r)/2):(i=e.width,r=t.height*(i/t.width),o=0,a=(e.height-r)/2),e.drawImage(t,o,a,i,r)}function f(e){if(!r||0===l)return;if(e-d>s){t.clearRect(0,0,e.width,e.height);let i=(M+1)%c.length;c[M]&&(t.globalAlpha=1-o,u(t,c[M])),c[i]&&(t.globalAlpha=o,u(t,c[i])),o+=a,o>=1&&(o=0,M=i),d=e}requestAnimationFrame(f)}let M=0;n.forEach(((e,t)=>{const n=new Image;n.src=e,n.onload=()=>{c[t]=n,l++,1===l&&requestAnimationFrame(f)},n.onerror=()=>console.error("❌ 图片加载失败: "+e)}));function p(){window.innerWidth>=1024?(e.width=window.innerWidth,e.height=.75*window.innerHeight):(e.width=window.innerWidth,e.height=.6*window.innerHeight)}window.addEventListener("resize",p),p(),m?.addEventListener("click",(()=>{r=!r,m.textContent=r?"❚❚":"▶",r&&requestAnimationFrame(f)})),window.addEventListener("DOMContentLoaded",(()=>{requestAnimationFrame(f)}))}document.addEventListener("DOMContentLoaded",(()=>{!function(){const e=document.querySelectorAll(".slider1-slide"),t=document.getElementById("slider1-play-btn"),n=document.getElementById("slider1-btn-icon"),c=document.querySelectorAll(".slider1-dot"),i=document.querySelector(".slider1-progress-bar"),r=document.querySelector(".view1-text"),o=document.querySelectorAll(".view1-btn"),a=document.querySelectorAll(".slider1-slide img");let s=0,d=!0,l,m,u=3e3;if(!e.length||!t||!n||!c.length)return void console.warn("❌ initSlider1: 轮播元素未找到！");function f(e){const t=e.toLowerCase().replace(/\s+/g,"-")+".html";window.open(t,"_blank")}o.forEach(((t,n)=>{t.addEventListener("click",(()=>{const c=e[n].querySelector("img").alt;f(c)}))})),a.forEach(((t,n)=>{t.addEventListener("click",(()=>{const c=e[n].querySelector("img").alt;f(c)}))}));function M(t){s=t,e.forEach(((e,n)=>{e.classList.toggle("active",n===s)})),c.forEach((e=>e.classList.remove("active"))),c[s].classList.add("active"),i.style.width=100*(s+1)/e.length+"%",r.textContent=e[s].querySelector("img").alt}function p(e){l||(l=e);let t=e-l,n=Math.min(t/u,1)*100;i.style.width=n+"%",t<u?m=requestAnimationFrame(p):g()}function g(){s<e.length-1?(s++,M(s),i.style.width="0%",l=null,d&&(m=requestAnimationFrame(p))):(d=!1,n.textContent="↻",t.classList.remove("playing","paused"),t.classList.add("refresh"))}function y(){d?(d=!1,cancelAnimationFrame(m),n.textContent="▶",t.classList.remove("playing"),t.classList.add("paused")):(d=!0,s=0,M(s),n.textContent="⏸",t.classList.remove("refresh"),t.classList.add("playing"),l=null,m=requestAnimationFrame(p))}c.forEach(((t,n)=>{t.addEventListener("click",(()=>{M(n),d=!1,cancelAnimationFrame(m),l=null,i.style.width="0%",s=n,y()}))})),t.addEventListener("click",y),M(0),requestAnimationFrame(p)}(),function(){const e=document.querySelector(".touch1-carousel-track"),t=Array.from(document.querySelectorAll(".touch1-carousel-slide")),n=document.querySelector(".touch1-prev-btn"),c=document.querySelector(".touch1-next-btn");let i=0;if(!e||!t.length||!n||!c)return;const r=630;function o(){e.style.transform=`translateX(-${i*r}px)`,n.disabled=0===i,c.disabled=i===t.length-1}n.addEventListener("click",(()=>{i>0&&(i--,o())})),c.addEventListener("click",(()=>{i<t.length-1&&(i++,o())})),o()}()})),document.addEventListener("DOMContentLoaded",(()=>{const e=document.querySelector(".touch1-carousel-track"),t=Array.from(e.children),n=document.querySelector(".touch1-prev-btn"),c=document.querySelector(".touch1-next-btn");let i=0;const r=t.length,o=630;function a(){e.style.transform=`translateX(-${i*o}px)`,n.disabled=0===i,c.disabled=i===r-1}n.addEventListener("click",(()=>{i>0&&(i--,a())})),c.addEventListener("click",(()=>{i<r-1&&(i++,a())})),a()})),document.addEventListener("DOMContentLoaded",(()=>{t(),n(),c(),i(),r(),o(),a(),s(),d()}));
