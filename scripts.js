function waitImagesLoaded(a,b){let c=0,total=a.length;function d(){c++,c>=total&&b()}a.forEach(e=>{e.complete?d():(e.addEventListener("load",d),e.addEventListener("error",d))}),total===0&&b()}const initHeroCarousel=()=>{const a=document.getElementById("hero-slides"),b=document.querySelectorAll(".hero-dots .dot");if(!a||!b.length)return;let c=0,d=a.children.length,e=()=>{c=(c+1)%d,a.style.transform=`translateX(-${c*100}%)`,b.forEach((f,g)=>{f.classList.toggle("active",g===c)})};b.forEach((f,g)=>{f.addEventListener("click",()=>{c=g,a.style.transform=`translateX(-${c*100}%)`,b.forEach((h,i)=>{h.classList.toggle("active",i===c)})})}),setInterval(e,5000)};const initEmailJS=()=>{if(typeof emailjs=="undefined")return;emailjs.init("HXCThZROMytOt-wyp");const a=document.getElementById("contactForm");a&&a.addEventListener("submit",e=>{e.preventDefault(),emailjs.sendForm("service_1ffkva1","template_ypdj9n9",a).then(()=>{alert("邮件已发送成功，我们将尽快与您联系！"),a.reset()}).catch(f=>{console.error("邮件发送失败：",f),alert("邮件发送失败，请稍后再试。")})})};const initCompareFeature=()=>{const a=document.querySelector(".compare-features .btn");a&&a.addEventListener("click",()=>{alert("对比功能暂未实现 (预留)！")})};const initHamburgerMenu=()=>{const a=document.getElementById("menuIcon"),b=document.getElementById("mobileNav"),c=document.getElementById("closeBtn");if(!a||!b||!c)return;a.addEventListener("click",()=>{b.classList.add("active")}),c.addEventListener("click",()=>{b.classList.remove("active")});const d=b.querySelectorAll("ul li a");d.forEach(e=>{e.addEventListener("click",()=>{b.classList.remove("active")})})};const initModalWindows=()=>{document.querySelectorAll("[data-modal-target]").forEach(a=>{a.addEventListener("click",()=>{const b=document.querySelector(a.getAttribute("data-modal-target"));b&&b.classList.add("active")})});document.querySelectorAll("[data-modal-close]").forEach(a=>{a.addEventListener("click",()=>{const b=a.closest(".modal");b&&b.classList.remove("active")})})};const initInfiniteScroller=()=>{const a=document.getElementById("infiniteScroller"),b=document.querySelector(".pause-btn");if(!a||!b)return;const c=["A peaceful brookside setting.png","A scenic riverside bend.png","A serene coastal shore.png","A shaded forest path.png"];let d=!1,e=0.3,f=0,g=[],h;h=document.createElement("div"),h.className="infinite-scroller-track",h.style.display="flex",h.style.position="relative",h.style.transform="translateX(0)",a.appendChild(h);for(let i=0;i<2;i++)c.forEach(j=>{createItem(j)});function createItem(j){const k=document.createElement("div");k.className="infinite-scroller-item",k.style.position="absolute",k.style.width="100%";const l=document.createElement("img");l.src=j,l.alt=j,l.style.width="100%",l.style.objectFit="cover",k.appendChild(l),h.appendChild(k);let m=g.length===0?0:(g[g.length-1].x+k.offsetWidth);k.style.left=`${m}px`;g.push({el:k,x:m,width:k.offsetWidth})}function n(i){if(!d){let j=i-f;f=i;let k=e*(j/16.67);for(let l=0;l<g.length;l++){let m=g[l];m.x-=k,m.el.style.left=`${m.x}px`}let o=g[g.length-1];if(o.x+o.width<window.innerWidth+100)createItem(c[g.length%c.length])}requestAnimationFrame(n)}b.classList.remove("paused"),b.addEventListener("click",()=>{d=!d,b.classList.toggle("paused")}),requestAnimationFrame(n)};document.addEventListener("DOMContentLoaded",()=>{const a=document.getElementById("infiniteScroller"),b=document.querySelector(".infinite-scroller-track");if(a&&b){b.style.transform="translateX(0)",a.innerHTML+=a.innerHTML}const c=document.getElementById("pauseBtn");let d=!1;c&&c.addEventListener("click",function(){d=!d,a.style.animationPlayState=d?"paused":"running",c.textContent=d?"▶":"❚❚"}),c&&(c.textContent="❚❚")}),document.addEventListener("DOMContentLoaded",()=>{const a=document.querySelector(".infinite-scroller-track");a&&(a.style.transform="translateX(0)")});const initProductImageClick=()=>{document.querySelectorAll(".product-card img").forEach(a=>{a.addEventListener("click",()=>{const b=a.alt.toLowerCase().replace(/\s+/g,"-")+".html";window.location.href=b})})};const initFlipCards=()=>{document.querySelectorAll(".flip-btn-front").forEach(a=>{a.addEventListener("click",()=>{a.closest(".card").style.transform="rotateY(180deg)"})});document.querySelectorAll(".flip-btn-back").forEach(a=>{a.addEventListener("click",()=>{a.closest(".card").style.transform="rotateY(0deg)"})})};const initFrameAnimation=()=>{const a=document.getElementById("animationCanvas"),b=a&&a.getContext("2d");if(!a||!b)return;const c=["A young man standing in a natural landscape1.png","A young man standing in a natural landscape2.png","A young man standing in a natural landscape3.png"];let d=[],e=0,f=!0,g=0.02,h=1000/24,i=0,j=0,k=0,l=document.getElementById("playPauseButton");c.forEach((m,n)=>{const o=new Image;o.src=m,o.onload=()=>{d[n]=o,k++,k===1&&requestAnimationFrame(p)},o.onerror=()=>console.error(`❌ 图片加载失败: ${m}`)});function q(){if(!a)return;const m=window.innerWidth>=1024; a.width=window.innerWidth,a.height=window.innerHeight*(m?0.75:0.6)}window.addEventListener("resize",q),q();function p(m){if(!f||k===0)return;if(m-i>h){b.clearRect(0,0,a.width,a.height);let n=(e+1)%c.length;n in d&&(b.globalAlpha=1-g,drawImageCover(d[e])),n in d&&(b.globalAlpha=g,drawImageCover(d[n])),g+=0.02,g>=1&&(g=0,e=n),i=m}requestAnimationFrame(p)}function drawImageCover(n){const o=a.width/a.height,p=n.width/n.height, r=o>p?(a.height*0.9, n.width*(a.height*0.9/n.height)):(a.width, n.height*(a.width/n.width));let s,t; if(p>o){t=a.height*0.9,s=n.width*(t/n.height),s=(a.width-s)/2,t=(a.height-t)/2}else{ s=a.width,t=n.height*(s/n.width),t=(a.height-t)/2,s=0}b.drawImage(n,s,t, s? s : a.width, t? t : a.height)}l&&l.addEventListener("click",()=>{f=!f,l.textContent=f?"❚❚":"▶",f&&requestAnimationFrame(p)})};const initTouch1CarouselTrack=()=>{const a=document.querySelector(".touch1-carousel-track"),b=Array.from(a?.children||[]),c=document.querySelector(".touch1-prev-btn"),d=document.querySelector(".touch1-next-btn");if(!a||!b.length||!c||!d)return;let e=0,f=615+15;function g(){a.style.transform=`translateX(-${e*f}px)`,c.disabled=e===0,d.disabled=e===b.length-1}c.addEventListener("click",()=>{e>0&&(e--,g())}),d.addEventListener("click",()=>{e<b.length-1&&(e++,g())}),g()};const initspec1ManualCarouselTrack=()=>{const a=document.querySelector(".spec1-carousel-container"),b=document.querySelector(".spec1-carousel-track");let c=Array.from(document.querySelectorAll(".spec1-carousel-slide"));const d=document.querySelector(".spec1-carousel-prev"),e=document.querySelector(".spec1-carousel-next");if(!a||!b||!c.length||!d||!e){console.warn("spec1 hand-control carousel: elements or arrows not found!");return}const f=c.length;let g=1,h=!1,i=0,j=0;let k=15;const l=c[0].cloneNode(!0),m=c[f-1].cloneNode(!0);b.appendChild(l),b.insertBefore(m,b.firstChild),c=Array.from(b.querySelectorAll(".spec1-carousel-slide"));function n(){window.innerWidth<=768?(j=a.offsetWidth*0.85+j=a.offsetWidth*0.85+ (k=a.offsetWidth*0.04),c.forEach(o=>{o.style.width=`${a.offsetWidth*0.85}px`}),i=a.offsetWidth*0.85+k):(c.forEach(o=>{o.style.width=""}),k=15,i=c[1].getBoundingClientRect().width+k)}function o(p=!0){n(),b.style.transition=p?"transform 0.5s ease-in-out":"none",window.innerWidth<=768?b.style.transform=`translateX(${-g*i+k/2}px)`:b.style.transform=`translateX(${-g*i}px)`,c.forEach(q=>q.classList.remove("active","prev","next","shadow")),c[g]&&c[g].classList.add("active");let r=(g+1)%c.length,s=(g-1+c.length)%c.length;c[r]&&c[r].classList.add("next"),c[s]&&c[s].classList.add("prev"),c.forEach(q=>{!q.classList.contains("active")&&q.classList.add("shadow"),q.querySelector("a")&&(q.querySelector("a").style.pointerEvents=q.classList.contains("active")?"auto":"none")})}function p(){if(h)return;h=!0,g++,o();setTimeout(()=>{if(g===c.length-1){b.style.transition="none",g=1,o(!1)}h=!1},500)}function q(){if(h)return;h=!0,g--,o();setTimeout(()=>{if(g===0){b.style.transition="none",g=c.length-2,o(!1)}h=!1},500)}d.addEventListener("click",()=>{!h&&q()}),e.addEventListener("click",()=>{!h&&p()});c.forEach(r=>{r.addEventListener("click",e=>{if(r.classList.contains("active"));else if(r.classList.contains("next")){e.preventDefault(),!h&&p()}else if(r.classList.contains("prev")){e.preventDefault(),!h&&q()}});
let s=r.querySelector(".spec1-explore-btn");s&&s.addEventListener("click",e=>{e.stopPropagation()})});a.addEventListener("touchstart",e=>{if(e.touches.length===1&&!h){j=e.touches[0].clientX;}} ,{passive:true}),a.addEventListener("touchmove",()=>{}, {passive:true}),a.addEventListener("touchend",e=>{if(typeof j=="undefined")return;let f=e.changedTouches[0].clientX, p=f-j;p=Math.abs(p)>20&&(p<0?p=p:(p=-p),p),Math.abs(f-j)>20&&(f-j<0?p=p, f-j<0?p=p, f-j<0?p=p, f-j<0?p=p):(f-j>=20?q():p=p))},{passive:true});function r(){h=!1,b.style.transition="none",o(!1),setTimeout(()=>{b.style.transition="transform 0.5s ease-in-out"},50)} 
window.addEventListener("resize",r),b.style.transition="none",o(!1),setTimeout(()=>{b.style.transition="transform 0.5s ease-in-out"},50),window.innerWidth<=768?(d.style.display="block",e.style.display="block"):(d.style.display="block",e.style.display="block")};document.addEventListener("DOMContentLoaded",()=>{initHeroCarousel(),initEmailJS(),initCompareFeature(),initHamburgerMenu(),initModalWindows(),initInfiniteScroller(),initProductImageClick(),initFlipCards(),initFrameAnimation(),initTouch1CarouselTrack()});window.addEventListener("load",()=>{const a=document.querySelectorAll(".spec1-carousel-slide img");a.length>0&&waitImagesLoaded(a,()=>{initspec1ManualCarouselTrack()})});
