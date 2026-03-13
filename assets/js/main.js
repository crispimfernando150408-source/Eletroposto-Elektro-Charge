gsap.registerPlugin(ScrollTrigger);

        // --- Cursor customizado ---
        (function() {
            var cc = document.getElementById('custom-cursor');
            if (!cc || window.matchMedia('(pointer: coarse)').matches) return;
            document.addEventListener('mousemove', function(e) {
                cc.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
            });
            var hoverSel = 'a,button,.bsec-card,.price-step,.glow-card,.bsec-cinema,.app-window,.navbar-btn';
            document.querySelectorAll(hoverSel).forEach(function(el) {
                el.addEventListener('mouseenter', function() { cc.classList.add('is-hovering'); });
                el.addEventListener('mouseleave', function() { cc.classList.remove('is-hovering'); });
            });
            document.addEventListener('mousedown', function() { cc.classList.add('is-clicking'); });
            document.addEventListener('mouseup',   function() { cc.classList.remove('is-clicking'); });
        })();

        // --- Click ripple nos botoes ---
        document.querySelectorAll('.btn-primary,.bsec-btn-primary,.glow-btn').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                var r = btn.getBoundingClientRect();
                var fx = document.createElement('span');
                fx.className = 'btn-ripple-fx';
                fx.style.left = (e.clientX - r.left) + 'px';
                fx.style.top  = (e.clientY - r.top)  + 'px';
                btn.appendChild(fx);
                setTimeout(function() { if(fx.parentNode) fx.parentNode.removeChild(fx); }, 560);
            });
        });

        // --- Text scramble nos eyebrows ---
        (function() {
            var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            function scramble(el) {
                var orig = el.textContent.trim();
                var f = 0, total = 24;
                var iv = setInterval(function() {
                    el.textContent = orig.split('').map(function(c, i) {
                        if (c === ' ') return ' ';
                        if (f / total > i / orig.length) return c;
                        return alpha[Math.floor(Math.random() * alpha.length)];
                    }).join('');
                    if (++f > total) { el.textContent = orig; clearInterval(iv); }
                }, 30);
            }
            document.querySelectorAll('.scramble-text').forEach(function(el) {
                ScrollTrigger.create({
                    trigger: el, start: 'top 88%', once: true,
                    onEnter: function() { scramble(el); }
                });
            });
        })();

        // --- Scroll progress bar ---
        const scrollBar = document.getElementById('scroll-progress');
        window.addEventListener('scroll', () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            scrollBar.style.width = (window.scrollY / max * 100).toFixed(2) + '%';
        }, { passive: true });

        // ─── Hero: partículas elétricas ───
        (function() {
            const container = document.getElementById('hero-particles');
            if (!container) return;
            for (let i = 0; i < 22; i++) {
                const p = document.createElement('div');
                p.className = 'hero-particle';
                const size = 1.2 + Math.random() * 1.8;
                p.style.cssText = `
                    left:  ${5 + Math.random() * 90}%;
                    bottom: ${Math.random() * 45}%;
                    width:  ${size}px;
                    height: ${size}px;
                    --dur:   ${2.5 + Math.random() * 4}s;
                    --delay: ${-Math.random() * 7}s;
                    --dx:    ${(Math.random() - 0.5) * 50}px;
                    opacity: 0;
                `;
                container.appendChild(p);
            }
        })();

        // ─── 3D tilt nos cards ───
        document.querySelectorAll('.bsec-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const r = card.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width  - 0.5;
                const y = (e.clientY - r.top)  / r.height - 0.5;
                card.style.transform = `perspective(700px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) scale(1.025)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
            });
        });

        // ─── Cursor glow global ───
        const cursorGlow = document.getElementById('cursor-glow');
        document.addEventListener('mousemove', e => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top  = e.clientY + 'px';
        });

        // ─── Navbar scroll state ───
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('is-scrolled', window.scrollY > 60);
        }, { passive: true });

        // ─── GSAP clip-path reveals nos titulos principais ───
        const revealTitles = [
            { el: '.bsec-title',  trigger: '#bsec-header' },
            { el: '.price-title', trigger: '#price-header' }
        ];
        revealTitles.forEach(({ el, trigger }) => {
            gsap.from(el, {
                clipPath: 'inset(0 0 100% 0)',
                opacity: 0,
                y: 20,
                duration: 1.1,
                ease: 'power4.out',
                scrollTrigger: { trigger, start: 'top 84%', toggleActions: 'play none none reverse' }
            });
        });

        // ─── Stat bars animadas com GSAP ───
        document.querySelectorAll('.bsec-stat-bar-fill').forEach((bar, i) => {
            const target = bar.dataset.width || '60%';
            gsap.to(bar, {
                width: target,
                duration: 1.8,
                ease: 'power2.out',
                delay: i * 0.18,
                scrollTrigger: { trigger: bar, start: 'top 88%', toggleActions: 'play none none none' }
            });
        });

        const video = document.getElementById('hero-video');

        // Hero entrada
        gsap.set(['#el-badge','#el-title','#el-subtitle','#el-desc','#el-cta','#el-scroll'], { opacity:0, y:24 });
        gsap.timeline({ delay:0.5 })
            .to('#el-badge',    { opacity:1, y:0, duration:0.8, ease:'power3.out' })
            .to('#el-title',    { opacity:1, y:0, duration:1.0, ease:'power3.out' }, '-=0.4')
            .to('#el-subtitle', { opacity:1, y:0, duration:0.8, ease:'power3.out' }, '-=0.6')
            .to('#el-desc',     { opacity:1, y:0, duration:0.8, ease:'power3.out' }, '-=0.6')
            .to('#el-cta',      { opacity:1, y:0, duration:0.7, ease:'power3.out' }, '-=0.5')
            .to('#el-scroll',   { opacity:1, y:0, duration:0.6, ease:'power2.out' }, '-=0.3');

        // Video scrub
        let targetTime=0, lerpTime=0, scrubReady=false;
        function initScrub(){
            if(scrubReady) return; scrubReady=true;
            video.pause(); video.currentTime=0;
            ScrollTrigger.create({ trigger:'#hero-trigger', start:'top top', end:'bottom bottom',
                onUpdate:(self)=>{ targetTime=self.progress*(video.duration||0); }
            });
            (function raf(){ lerpTime+=(targetTime-lerpTime)*0.1; if(Math.abs(video.currentTime-lerpTime)>0.02) video.currentTime=lerpTime; requestAnimationFrame(raf); })();
        }
        video.addEventListener('canplaythrough', initScrub, {once:true});
        video.addEventListener('loadedmetadata', ()=>setTimeout(initScrub,400), {once:true});
        if(video.readyState>=3) initScrub();

        function fadeEl(id,s,e){ gsap.to(id,{ opacity:0, y:-16, ease:'power2.in', immediateRender:false, scrollTrigger:{ trigger:'#hero-trigger', start:s+'% top', end:e+'% top', scrub:true } }); }
        fadeEl('#el-scroll',0,8); fadeEl('#el-badge',5,18); fadeEl('#el-title',12,28);
        fadeEl('#el-subtitle',22,35); fadeEl('#el-desc',30,42); fadeEl('#el-cta',38,50);
        gsap.to('#video-wrapper',{ opacity:0, ease:'none', immediateRender:false, scrollTrigger:{ trigger:'#hero-trigger', start:'75% top', end:'bottom top', scrub:true } });

        // ─── 2a DOBRA: animacoes ───

        gsap.from('#bsec-header', {
            opacity:0, y:60, filter:'blur(10px)', duration:1.2, ease:'power3.out',
            scrollTrigger: { trigger:'#bsec-header', start:'top 82%', toggleActions:'play none none reverse' }
        });

        // Cinema panel: imagem escala do fundo, stats desliza da direita
        gsap.from('#bsec-visual', {
            opacity:0, scale:1.06, filter:'blur(8px)', duration:1.6, ease:'power3.out',
            scrollTrigger: { trigger:'#bsec-visual-split', start:'top 80%', toggleActions:'play none none reverse' }
        });
        // Parallax sutil na imagem ao rolar
        gsap.to('#bsec-visual', {
            yPercent: -6, ease:'none',
            scrollTrigger: { trigger:'#bsec-visual-split', start:'top bottom', end:'bottom top', scrub: true }
        });
        gsap.from('.bsec-visual-live', {
            opacity:0, y:-14, duration:0.8, ease:'power3.out', delay:0.5,
            scrollTrigger: { trigger:'#bsec-visual-split', start:'top 80%', toggleActions:'play none none reverse' }
        });
        gsap.from('.bsec-visual-badge', {
            opacity:0, y:14, duration:0.8, ease:'power3.out', delay:0.6,
            scrollTrigger: { trigger:'#bsec-visual-split', start:'top 80%', toggleActions:'play none none reverse' }
        });
        gsap.from('#bsec-stats-col', {
            opacity:0, x:50, filter:'blur(6px)', duration:1.2, ease:'power3.out', delay:0.3,
            scrollTrigger: { trigger:'#bsec-visual-split', start:'top 80%', toggleActions:'play none none reverse' }
        });
        gsap.from('.bsec-stat', {
            opacity:0, y:30, filter:'blur(4px)', duration:0.85, ease:'power3.out', stagger:0.13,
            scrollTrigger: { trigger:'#bsec-stats', start:'top 85%', toggleActions:'play none none reverse' }
        });

        gsap.from('#bsec-cards-section .bsec-cards-label', {
            opacity:0, y:20, duration:0.8, ease:'power3.out',
            scrollTrigger: { trigger:'#bsec-cards', start:'top 86%', toggleActions:'play none none reverse' }
        });
        gsap.from(['#bc-0','#bc-1','#bc-2'], {
            opacity:0, y:50, filter:'blur(6px)', duration:1.0, ease:'power3.out', stagger:0.12,
            scrollTrigger: { trigger:'#bsec-cards', start:'top 82%', toggleActions:'play none none reverse' }
        });

        // Split — esquerda entra da esquerda, direita da direita
        gsap.from('#bsec-split-left', {
            opacity:0, x:-50, filter:'blur(8px)', duration:1.1, ease:'power3.out',
            scrollTrigger: { trigger:'#bsec-split', start:'top 80%', toggleActions:'play none none reverse' }
        });
        gsap.from('#bsec-split-right', {
            opacity:0, x:50, filter:'blur(8px)', duration:1.1, ease:'power3.out',
            scrollTrigger: { trigger:'#bsec-split', start:'top 80%', toggleActions:'play none none reverse' }
        });

        gsap.from('#bsec-cta', {
            opacity:0, y:30, duration:1.0, ease:'power3.out',
            scrollTrigger: { trigger:'#bsec-cta', start:'top 90%', toggleActions:'play none none reverse' }
        });

        // ─── Contadores das stats ───
        function animCount(id, end, dur) {
            const el = document.getElementById(id);
            if (!el) return;
            let v = 0;
            const step = end / (dur / 16);
            const t = setInterval(() => {
                v += step;
                if (v >= end) { v = end; clearInterval(t); }
                el.textContent = Math.floor(v);
            }, 16);
        }

        let statsDone = false;
        ScrollTrigger.create({
            trigger: '#bsec-stats', start: 'top 80%',
            onEnter: () => {
                if (statsDone) return;
                statsDone = true;
                animCount('stat-speed',  60,  1200);
                animCount('stat-time',   40,  1400);
                animCount('stat-energy', 100, 1600);
                // stat bars handled by GSAP above
            }
        });

        // ─── Bateria do app mock (anima quando aparece) ───
        let appDone = false;
        ScrollTrigger.create({
            trigger: '#bsec-split', start: 'top 75%',
            onEnter: () => {
                if (appDone) return;
                appDone = true;
                const bar = document.getElementById('app-bar');
                if (bar) { setTimeout(() => { bar.style.width = '67%'; }, 400); }
            }
        });

        // ─── Waveform gerada dinamicamente ───
        (function buildWave(){
            const wf = document.getElementById('app-waveform');
            if (!wf) return;
            const bars = 48;
            for (let i = 0; i < bars; i++) {
                const b = document.createElement('div');
                b.className = 'app-waveform-bar';
                const h = Math.floor(20 + Math.random() * 80);
                const dur = (0.6 + Math.random() * 0.8).toFixed(2);
                b.style.cssText = '--h:' + h + '%;--dur:' + dur + 's;height:' + Math.floor(15 + Math.random() * 50) + '%;';
                wf.appendChild(b);
            }
        })();

        // ─── Flashlight nos cards ───
        document.querySelectorAll('.bsec-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const r = card.getBoundingClientRect();
                card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
                card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
            });
        });

        // ─── 3a DOBRA: animacoes ───
        gsap.from('#price-header', {
            opacity:0, y:60, filter:'blur(10px)', duration:1.2, ease:'power3.out',
            scrollTrigger: { trigger:'#price-header', start:'top 82%', toggleActions:'play none none reverse' }
        });

        // Feature card — esquerda e direita
        gsap.from('.price-left', {
            opacity:0, x:-45, duration:1.1, ease:'power3.out',
            scrollTrigger: { trigger:'#price-feature', start:'top 80%', toggleActions:'play none none reverse' }
        });
        gsap.from('.price-right', {
            opacity:0, x:45, duration:1.1, ease:'power3.out',
            scrollTrigger: { trigger:'#price-feature', start:'top 80%', toggleActions:'play none none reverse' }
        });

        // Price number — conta de baixo pra cima (efeito impacto)
        gsap.from('.price-kw-num', {
            opacity:0, y:30, scale:0.92, filter:'blur(6px)', duration:1.0, ease:'power3.out', delay:0.2,
            scrollTrigger: { trigger:'#price-feature', start:'top 80%', toggleActions:'play none none reverse' }
        });

        // Comparativo — linhas surgem com stagger
        gsap.from('.price-compare-row', {
            opacity:0, x:-20, duration:0.7, ease:'power3.out', stagger:0.1, delay:0.4,
            scrollTrigger: { trigger:'#price-compare', start:'top 84%', toggleActions:'play none none reverse' }
        });

        // Includes — stagger
        gsap.from(['#pi-0','#pi-1','#pi-2','#pi-3'], {
            opacity:0, y:25, filter:'blur(4px)', duration:0.8, ease:'power3.out', stagger:0.1, delay:0.25,
            scrollTrigger: { trigger:'#price-feature', start:'top 80%', toggleActions:'play none none reverse' }
        });

        // Nota
        gsap.from('#price-note', {
            opacity:0, duration:0.8, ease:'power2.out',
            scrollTrigger: { trigger:'#price-note', start:'top 90%', toggleActions:'play none none reverse' }
        });

        // Steps — stagger da esquerda pra direita
        gsap.from('#price-steps-header', {
            opacity:0, y:20, duration:0.8, ease:'power3.out',
            scrollTrigger: { trigger:'#price-steps', start:'top 86%', toggleActions:'play none none reverse' }
        });
        gsap.from(['#ps-0','#ps-1','#ps-2','#ps-3'], {
            opacity:0, y:50, filter:'blur(6px)', duration:1.0, ease:'power3.out', stagger:0.12,
            scrollTrigger: { trigger:'#price-steps', start:'top 82%', toggleActions:'play none none reverse' }
        });

        // ─── 4a DOBRA: animacoes ───
        gsap.from('#glow-card-wrap', {
            opacity: 0, y: 70, scale: 0.94, filter: 'blur(14px)',
            duration: 1.4, ease: 'power3.out',
            scrollTrigger: { trigger: '#quarta-dobra', start: 'top 72%', toggleActions: 'play none none reverse' }
        });
        gsap.from('#glow-eyebrow', {
            opacity: 0, y: 18, duration: 0.85, ease: 'power3.out', delay: 0.35,
            scrollTrigger: { trigger: '#quarta-dobra', start: 'top 72%', toggleActions: 'play none none reverse' }
        });
        gsap.from(['#glow-big-num','#glow-sub-time'], {
            opacity: 0, y: 30, scale: 0.95, duration: 1.0, ease: 'power3.out', stagger: 0.1, delay: 0.5,
            scrollTrigger: { trigger: '#quarta-dobra', start: 'top 72%', toggleActions: 'play none none reverse' }
        });
        gsap.from('#glow-sub', {
            opacity: 0, y: 18, duration: 0.8, ease: 'power2.out', delay: 0.7,
            scrollTrigger: { trigger: '#quarta-dobra', start: 'top 72%', toggleActions: 'play none none reverse' }
        });
        gsap.from('#glow-stats', {
            opacity: 0, y: 24, duration: 0.8, ease: 'power2.out', delay: 0.85,
            scrollTrigger: { trigger: '#quarta-dobra', start: 'top 72%', toggleActions: 'play none none reverse' }
        });
        gsap.from('#glow-cta', {
            opacity: 0, y: 18, scale: 0.94, duration: 0.7, ease: 'power2.out', delay: 1.0,
            scrollTrigger: { trigger: '#quarta-dobra', start: 'top 72%', toggleActions: 'play none none reverse' }
        });

        // Flashlight effect no glow card
        const glowCard = document.getElementById('glow-card');
        if (glowCard) {
            glowCard.addEventListener('mousemove', function(e) {
                const r = this.getBoundingClientRect();
                this.style.setProperty('--mouse-x', (e.clientX - r.left) + 'px');
                this.style.setProperty('--mouse-y', (e.clientY - r.top) + 'px');
            });
        }

        // Flashlight nos steps
        document.querySelectorAll('.price-step').forEach(step => {
            step.addEventListener('mousemove', e => {
                const r = step.getBoundingClientRect();
                step.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
                step.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
            });
        });

        // ─── Simular progresso do app (ticker leve) ───
        let appPct = 67;
        setInterval(() => {
            const pctEl = document.getElementById('app-pct');
            const barEl = document.getElementById('app-bar');
            if (!pctEl || !barEl) return;
            if (appPct < 80) {
                appPct += 0.05;
                pctEl.textContent = appPct.toFixed(1);
                barEl.style.width = appPct + '%';
            }
        }, 500);
    

        // --- Bento Benefits: clock + counter + charge bar ---
        (function() {
            // Live clock
            var clockEl = document.getElementById('bento-clock');
            function updateClock() {
                if (!clockEl) return;
                var now = new Date();
                var h = String(now.getHours()).padStart(2,'0');
                var m = String(now.getMinutes()).padStart(2,'0');
                clockEl.innerHTML = h + '<span class="bn-clock-dot">:</span>' + m;
            }
            if (clockEl) { updateClock(); setInterval(updateClock, 1000); }

            // Counter + charge bar triggered on scroll
            var bnAnimated = false;
            ScrollTrigger.create({
                trigger: '#bn-power',
                start: 'top 78%',
                onEnter: function() {
                    if (bnAnimated) return;
                    bnAnimated = true;

                    // 0 â†’ 60 kW counter
                    var kwObj = { val: 0 };
                    gsap.to(kwObj, {
                        val: 60,
                        duration: 1.8,
                        ease: 'power3.out',
                        onUpdate: function() {
                            var el = document.getElementById('kw-counter');
                            if (el) el.textContent = Math.round(kwObj.val);
                        }
                    });

                    // Charge bar: 0 â†’ 80%
                    var pObj = { p: 0 };
                    gsap.to(pObj, {
                        p: 80,
                        duration: 2.4,
                        delay: 0.5,
                        ease: 'power2.inOut',
                        onUpdate: function() {
                            var v = Math.round(pObj.p);
                            var fill = document.getElementById('charge-fill');
                            var pct  = document.getElementById('charge-pct');
                            if (fill) fill.style.width = v + '%';
                            if (pct)  pct.textContent  = v + '%';
                        }
                    });
                }
            });

            // Stagger card reveal
            gsap.from('.bn-card', {
                opacity: 0,
                y: 48,
                stagger: { amount: 0.55, from: 'start' },
                duration: 0.75,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.bento-grid',
                    start: 'top 82%',
                }
            });

            // Header reveal
            gsap.from('.bento-head', {
                opacity: 0,
                y: 32,
                duration: 0.85,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.benefits-bento',
                    start: 'top 78%',
                }
            });

            // Add cursor hover to bento cards
            var cc = document.getElementById('custom-cursor');
            if (cc) {
                document.querySelectorAll('.bn-card').forEach(function(el) {
                    el.addEventListener('mouseenter', function() { cc.classList.add('is-hovering'); });
                    el.addEventListener('mouseleave', function() { cc.classList.remove('is-hovering'); });
                });
            }
        })();

        // --- Location section reveal ---
        gsap.from('#loc-info', {
            opacity: 0, x: -50, duration: 0.9, ease: 'power2.out',
            scrollTrigger: { trigger: '.location-section', start: 'top 75%' }
        });
        gsap.from('#loc-map', {
            opacity: 0, x: 50, scale: 0.96, duration: 0.9, ease: 'power2.out',
            scrollTrigger: { trigger: '.location-section', start: 'top 75%' }
        });
        gsap.from('.loc-row', {
            opacity: 0, y: 20, stagger: 0.12, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: '#loc-info', start: 'top 80%' }
        });

        // Add cursor hover to loc elements
        (function() {
            var cc = document.getElementById('custom-cursor');
            if (!cc) return;
            document.querySelectorAll('.loc-btn,.loc-map-open').forEach(function(el) {
                el.addEventListener('mouseenter', function() { cc.classList.add('is-hovering'); });
                el.addEventListener('mouseleave', function() { cc.classList.remove('is-hovering'); });
            });
        })();
// mx-fix-applied: update CSS --mx/--my for bsec-card flashlight
document.querySelectorAll('.bsec-card').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100).toFixed(1) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%');
    });
});