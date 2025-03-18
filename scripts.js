(function(){
  function _0x1(a){return document.getElementById(a)}
  function _0x2(a){return document.querySelector(a)}
  function _0x3(a){return document.querySelectorAll(a)}
  function _0x4(a){return Array.from(document.querySelectorAll(a))}

  /* 1) Hero */
  const _0x5=function(){
    var a=_0x1('hero-slides'),b=_0x3('.hero-dots .dot');
    if(!a||!b.length)return;
    let c=0,d=a.children.length;
    const e=()=>{c=(c+1)%d, a.style.transform=`translateX(-${c*100}%)`, b.forEach((f,i)=>{f.classList.toggle('active',i===c)})};
    b.forEach((f,i)=>{f.addEventListener('click',()=>{c=i,a.style.transform=`translateX(-${c*100}%)`, b.forEach((g,j)=>{g.classList.toggle('active',j===c)})})});
    setInterval(e,5000)
  };

  /* 2) Email 表单提交 */
  const _0x6=function(){
    if(typeof emailjs==='undefined')return;
    emailjs.init("HXCThZROMytOt-wyp");
    var a=_0x1("contactForm");
    a && a.addEventListener("submit",e=>{
      e.preventDefault(),
      emailjs.sendForm("service_1ffkva1","template_ypdj9n9",a)
      .then(()=>{alert("邮件已发送成功，我们将尽快与您联系！"); a.reset()})
      .catch(err=>{console.error("邮件发送失败：",err); alert("邮件发送失败，请稍后再试。")})
    })
  };

  /* 3) 预留对比按钮 */
  const _0x7=function(){
    var a=_0x2(".compare-features .btn");
    a && a.addEventListener("click",()=>{alert("对比功能暂未实现 (预留)！")})
  };

  /* 4) 菜单 */
  const _0x8=function(){
    var a=_0x1('menuIcon'),b=_0x1('mobileNav'),c=_0x1('closeBtn');
    if(!a||!b||!c)return;
    a.addEventListener('click',()=>{b.classList.add('active')});
    c.addEventListener('click',()=>{b.classList.remove('active')});
    b.querySelectorAll('ul li a').forEach(d=>{d.addEventListener('click',()=>{b.classList.remove('active')})})
  };

  /* 5) 窗口 */
  const _0x9=function(){
    _0x3('[data-modal-target]').forEach(a=>{
      a.addEventListener('click',()=>{
        var b=_0x2(a.getAttribute('data-modal-target'));
        b && b.classList.add('active')
      })
    });
    _0x3('[data-modal-close]').forEach(a=>{
      a.addEventListener('click',()=>{
        var b=a.closest('.modal');
        b && b.classList.remove('active')
      })
    })
  };

  /* 6) Apple风  */
  const _0xa=function(){
    var a=_0x1('infiniteScroller'),b=_0x2('.pause-btn');
    if(!a||!b)return;
    var c=["A peaceful brookside setting.png","A scenic riverside bend.png","A serene coastal shore.png","A shaded forest path.png"],
        d=false,e=0,f=[],g=document.createElement('div');
    g.className='infinite-scroller-track';
    g.style.display='flex';
    g.style.position='relative';
    g.style.transform='translateX(0)';
    a.appendChild(g);
    for(let i=0;i<2;i++){
      c.forEach(h=>{ _0xaa(h) });
    }
    function _0xaa(h){
      var i=document.createElement('div');
      i.className='infinite-scroller-item';
      i.style.position='absolute';
      i.style.width='100%';
      var j=document.createElement('img');
      j.src=h; j.alt=h;
      j.style.width='100%'; j.style.objectFit='cover';
      i.appendChild(j);
      g.appendChild(i);
      var k=f.length===0?0:(f[f.length-1].x+i.offsetWidth);
      i.style.left=k+"px";
      f.push({el:i,x:k,width:i.offsetWidth})
    }
    function _0xac(l){
      if(!d){
        var m=l-e;
        e=l;
        var n=0.3*(m/16.67);
        for(var o=0;o<f.length;o++){
          f[o].x-=n;
          f[o].el.style.left=f[o].x+"px";
        }
        var p=f[f.length-1];
        if(p.x+p.width<window.innerWidth+100) _0xaa(c[f.length%c.length]);
      }
      requestAnimationFrame(_0xac);
    }
    b.classList.remove('paused');
    b.addEventListener('click',()=>{d=!d; b.classList.toggle('paused')});
    requestAnimationFrame(_0xac);
  };

  /* 7) 图片 */
  const _0xb=function(){
    _0x3('.product-card img').forEach(a=>{
      a.addEventListener('click',()=>{
        window.location.href=a.alt.toLowerCase().replace(/\s+/g,'-')+".html"
      })
    })
  };

  /* 8) 卡片 */
  const _0xc=function(){
    _0x3('.flip-btn-front').forEach(a=>{
      a.addEventListener('click',()=>{
        a.closest('.card').style.transform='rotateY(180deg)'
      })
    });
    _0x3('.flip-btn-back').forEach(a=>{
      a.addEventListener('click',()=>{
        a.closest('.card').style.transform='rotateY(0deg)'
      })
    })
  };

  /* 9) 动画： */
  const _0xd=function(){
    var a=_0x1('animationCanvas'),
        b=a && a.getContext('2d');
    if(!a||!b)return;
    var c=["A young man standing in a natural landscape1.png",
           "A young man standing in a natural landscape2.png",
           "A young man standing in a natural landscape3.png"],
        d=[], e=0, f=true, g=0, h=0.02, i=1000/24, j=0, k=0,
        l=_0x1('playPauseButton');
    c.forEach((m,n)=>{
      var o=new Image;
      o.src=m;
      o.onload=function(){
        d[n]=o; k++;
        console.log(`✅ 加载成功: ${m}`);
        if(k===1) requestAnimationFrame(p);
      };
      o.onerror=function(){console.error(`❌ 图片加载失败: ${m}`)}
    });
    function r(){
      var m=window.innerWidth>=1024;
      a.width=window.innerWidth;
      a.height=window.innerHeight*(m?0.75:0.6);
    }
    window.addEventListener('resize',r);
    r();
    function p(q){
      if(!f||k===0)return;
      if(q-j>i){
        b.clearRect(0,0,a.width,a.height);
        var m=(e+1)%c.length;
        if(d[e]){
          b.globalAlpha=1-g;
          u(d[e]);
        }
        if(d[m]){
          b.globalAlpha=g;
          u(d[m]);
        }
        g+=h;
        if(g>=1){g=0; e=m}
        j=q;
      }
      requestAnimationFrame(p);
    }
    function u(v){
      var m=a.width/a.height, n=v.width/v.height, o, p, q, r;
      if(n>m){
        o=a.height*0.9;
        p=v.width*(o/v.height);
        q=(a.width-p)/2;
        r=(a.height-o)/2;
      }else{
        p=a.width;
        o=v.height*(p/v.width);
        q=0;
        r=(a.height-o)/2;
      }
      b.drawImage(v,q,r,p,o);
    }
    l && l.addEventListener('click',()=>{
      f=!f;
      l.textContent=f?"❚❚":"▶";
      if(f) requestAnimationFrame(p);
    });
    window.addEventListener('DOMContentLoaded',()=>{requestAnimationFrame(p)});
  };

  /* 10) slider1 */
  const _0x20=function(){
    _0x3(".slider1-slide img, .view1-btn").forEach(a=>{a.removeAttribute("onclick")});
    var a=_0x3(".slider1-slide"),
        b=_0x1("slider1-play-btn"),
        c=_0x1("slider1-btn-icon"),
        d=_0x3(".slider1-dot"),
        e=_0x2(".slider1-progress-bar"),
        f=_0x2(".view1-text"),
        g=_0x3(".view1-btn"),
        h=_0x3(".slider1-slide img");
    if(!a.length||!b||!c||!d.length){console.warn("❌ initSlider1: 轮播元素未找到！"); return;}
    let i=0, j=true, k, l, m=3000;
    function n(){window.open("example.html","_blank")}
    g.forEach(a=>{a.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),n()})});
    h.forEach(a=>{a.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),n()})});
    function o(p){ i=p, a.forEach((q,r)=>{q.classList.toggle("active",r===i)}), d.forEach(s=>s.classList.remove("active")), d[i].classList.add("active"), e.style.width=((i+1)/a.length*100)+"%", f.textContent=a[i].querySelector("img").alt }
    function p(t){ if(!l)l=t; let u=t-l, v=Math.min(u/m,1)*100; e.style.width=v+"%"; u<m ? k=requestAnimationFrame(p) : q() }
    function q(){ if(i<a.length-1){ i++, o(i), e.style.width="0%", l=null, j && (k=requestAnimationFrame(p)) } else { j=false, c.textContent="↻", b.classList.remove("playing","paused"), b.classList.add("refresh") } }
    function r(){ if(!j){ j=true, i=0, o(i), c.textContent="⏸", b.classList.remove("refresh"), b.classList.add("playing"), l=null, k=requestAnimationFrame(p) } else { j=false, cancelAnimationFrame(k), c.textContent="▶", b.classList.remove("playing"), b.classList.add("paused") } }
    d.forEach((s,t)=>{ s.addEventListener("click",()=>{ o(t), j=false, cancelAnimationFrame(k), c.textContent="▶", b.classList.remove("playing","refresh"), b.classList.add("paused") }) });
    b.addEventListener("click",r);
    o(0);
    requestAnimationFrame(p);
  };

  /* 11) touch1 */
  const _0x21=function(){
    var a=_0x2(".touch1-carousel-track"),
        b=Array.from(_0x3(".touch1-carousel-slide")),
        c=_0x2(".touch1-prev-btn"),
        d=_0x2(".touch1-next-btn");
    if(!a||!b.length||!c||!d)return;
    let e=0, f=615+15;
    function g(){ a.style.transform=`translateX(-${e*f}px)`, c.disabled=(e===0), d.disabled=(e===b.length-1) }
    c.addEventListener("click",()=>{ if(e>0){ e--; g(); } });
    d.addEventListener("click",()=>{ if(e<b.length-1){ e++; g(); } });
    g();
  };

  /* x左侧空白闪现 */
  document.addEventListener("DOMContentLoaded",function(){
    var a=_0x1("infiniteScroller"), b=_0x2(".infinite-scroller-track");
    if(a&&b){ b.style.transform="translateX(0)"; a.innerHTML+=a.innerHTML }
    var c=_0x1("pauseBtn"), d=false;
    c && c.addEventListener("click",function(){ d=!d; a.style.animationPlayState=d?"paused":"running"; c.textContent=d?"▶":"❚❚" }), c && (c.textContent="❚❚")
  });
  document.addEventListener("DOMContentLoaded",function(){
    var a=_0x2(".infinite-scroller-track");
    a && (a.style.transform="translateX(0)")
  });

  /* touch1 */
  document.addEventListener("DOMContentLoaded",function(){
    var a=_0x2(".touch1-carousel-track"),
        b=Array.from(a.children),
        c=_0x2(".touch1-prev-btn"),
        d=_0x2(".touch1-next-btn"),
        e=0,
        f=615+15;
    function g(){ a.style.transform=`translateX(-${e*f}px)`, c.disabled=(e===0), d.disabled=(e===b.length-1) }
    c.addEventListener("click",()=>{ if(e>0){ e--; g(); } });
    d.addEventListener("click",()=>{ if(e<b.length-1){ e++; g(); } });
    g();
  });

  /* 初始化所有功能 */
  document.addEventListener('DOMContentLoaded',()=>{
    _0x5(); _0x6(); _0x7(); _0x8(); _0x9(); _0xa(); _0xb(); _0xc(); _0xd(); _0x20(); _0x21();
  });
})();
