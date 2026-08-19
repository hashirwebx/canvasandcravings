import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import CcFooter from "./CcFooter";
import "./CanvasCravings.css";

gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------- content ---------------------------------- */

const GALLERY = [
  { idx: "01", cap: "C&C / 01", label: "Dining", img: "/images/cafe-p01.jpg" },
  { idx: "02", cap: "C&C / 02", label: "The Kitchen", img: "/images/cafe-l01.jpg" },
  { idx: "03", cap: "C&C / 03", label: "The Wall", img: "/images/cafe-p02.jpg" },
  { idx: "04", cap: "C&C / 04", label: "Coffee", img: "/images/cafe-l02.jpg" },
  { idx: "05", cap: "C&C / 05", label: "The Night", img: "/images/cafe-p03.jpg" },
  { idx: "06", cap: "C&C / 06", label: "The Corner", img: "/images/cafe-l03.jpg" },
  { idx: "07", cap: "C&C / 07", label: "Mocktails", img: "/images/cafe-p04.jpg" },
  { idx: "08", cap: "C&C / 08", label: "Sessions", img: "/images/cafe-p05.jpg" },
  { idx: "09", cap: "C&C / 09", label: "Gallery", img: "/images/cafe-p06.jpg" },
  { idx: "10", cap: "C&C / 10", label: "Us", img: "/images/cafe-p07.jpg" },
];

const RITUAL = [
  { num: "01", name: "Sip & sketch", desc: "Pull a canvas off the wall, grab a corner table, order a coffee.", img: "/images/cafe-l04.jpg" },
  { num: "02", name: "Order the works", desc: "Loaded fries to Mughlai pizza — the menu runs long.", img: "/images/cafe-l05.jpg" },
  { num: "03", name: "Paint it out", desc: "Guided sessions every week. No talent required.", img: "/images/cafe-t01.jpg" },
  { num: "04", name: "Repeat, obviously", desc: "DJ nights on Fridays. You'll be back before Monday.", img: "/images/cafe-t02.png" },
];

const STRIP_TILES = [
  "cafe-s01", "cafe-s02", "cafe-s03", "cafe-s04", "cafe-s05", "cafe-s06", "cafe-s07",
  "cafe-s08", "cafe-s09", "cafe-s10", "cafe-s11", "cafe-m01", "cafe-m02", "cafe-m03",
  "cafe-m04", "cafe-m05", "cafe-m06", "cafe-m07",
];

const MENU = [
  { cat: "Starters", items: [["Loaded Fries", "650"], ["Peri Wings", "720"], ["Garlic Bread", "550"]] },
  { cat: "Soups", items: [["Tomato Basil", "520"], ["Cream of Mushroom", "560"], ["Chicken Corn", "540"]] },
  { cat: "Pizza", items: [["Mughlai", "1350"], ["Stuffed Crust", "1550"], ["BBQ Chicken", "1290"]] },
  { cat: "Steaks & Mains", items: [["Grilled Chicken Steak", "1450"], ["White Sauce Pasta", "890"], ["Sizzling Beef", "1850"]] },
  { cat: "Bar & Mocktails", items: [["Fresh Mojito", "450"], ["Turkish Coffee", "380"], ["Hot Chocolate", "520"]] },
];



const QUOTE_WORDS =
  "Ordered the stuffed crust pizza and the Italian white sauce pasta — both absolutely delicious. Highly recommended.".split(" ");

const CANVAS_VIDEOS = [
  { src: "/video/v1.mp4", label: "Night Vibes", tag: "MUSIC / C&C" },
  { src: "/video/v2.mp4", label: "The Experience", tag: "ART / 08.10.26" },
  { src: "/video/v3.mp4", label: "The Vibe", tag: "MOMENTS / C&C" },
  { src: "/video/v4.mp4", label: "Signature Sip", tag: "DRINKS / C&C" },
  { src: "/video/v5.mp4", label: "Hidden Gem", tag: "FOOD / 08.02.26" },
  { src: "/video/v6.mp4", label: "Paint & Create", tag: "PAINT / C&C" },
  { src: "/video/v7.mp4", label: "Your Story", tag: "ART / C&C" },
];

/* ---------------------------------- component ---------------------------------- */

export default function CanvasCravings() {
  const rootRef = useRef(null);
  const preRef = useRef(null);
  const preWordRefs = useRef([]);
  const preBrushRef = useRef(null);
  const preDotRef = useRef(null);
  const heroRef = useRef(null);
  const heroTypeRef = useRef(null);
  const heroWordsRef = useRef([]);
  const heroImgRef = useRef(null);
  const heroDropRef = useRef(null);
  const navRef = useRef(null);
  const curRef = useRef(null);
  const ringRef = useRef(null);
  const tickerRef = useRef(null);
  const stripTrackRef = useRef(null);
  const magneticRef = useRef(null);
  const badgeRef = useRef(null);
  const ritualWrapRef = useRef(null);
  const ritualImgRef = useRef(null);
  const ritualImgPicRef = useRef(null);
  const ritualImgCapRef = useRef(null);
  const galleryRef = useRef(null);
  const hTrackRef = useRef(null);
  const cravRef = useRef(null);
  const cravTitleRef = useRef(null);
  const cravImgRef = useRef(null);
  const cravDotRef = useRef(null);
  const cravBrushRef = useRef(null);
  const cravOutlineRef = useRef(null);
  const cravFirstCardRef = useRef(null);
  const galCountRef = useRef(null);
  const galBarRef = useRef(null);

  const quoteRef = useRef(null);
  const lenisRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const burgerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ------------------------------- mobile menu toggle ------------------------------- */
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => {
      const next = !prev;
      const overlay = mobileMenuRef.current;
      const burger = burgerRef.current;
      if (!overlay) return next;
      if (next) {
        overlay.classList.add("cc-mmenu--open");
        burger?.classList.add("cc-burger--open");
        gsap.fromTo(
          overlay.querySelectorAll(".cc-mmenu-link"),
          { yPercent: 30, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.5, stagger: 0.06, ease: "power3.out", delay: 0.1 }
        );
        gsap.fromTo(overlay.querySelector(".cc-mmenu-book"), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out", delay: 0.35 });
      } else {
        gsap.to(overlay.querySelectorAll(".cc-mmenu-link, .cc-mmenu-book"), {
          autoAlpha: 0, yPercent: 10, duration: 0.3, stagger: 0.02, ease: "power2.in",
          onComplete: () => overlay.classList.remove("cc-mmenu--open"),
        });
        burger?.classList.remove("cc-burger--open");
      }
      return next;
    });
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    mobileMenuRef.current?.classList.remove("cc-mmenu--open");
    burgerRef.current?.classList.remove("cc-burger--open");
  }, []);

  /* ------------------------------- magnetic CTA ------------------------------- */

  const handleMagneticMove = (e) => {
    const el = magneticRef.current;
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - r.left - r.width / 2) * 0.4,
      y: (e.clientY - r.top - r.height / 2) * 0.4,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };
  const handleMagneticLeave = () => {
    gsap.to(magneticRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.35)",
      overwrite: "auto",
    });
  };
  const handleMagneticEnter = () => {
    gsap.to(magneticRef.current, { scale: 1.06, duration: 0.3, ease: "power2.out", overwrite: "auto" });
  };

  const handleTop = () => {
    lenisRef.current?.scrollTo(0, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
  };

  /* --------------------------------- animations --------------------------------- */

  useEffect(() => {
    let alive = true;
    let onNavClick = null;
    let tickerFn = null;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ---- Lenis smooth scroll, wired into GSAP's ticker (canonical setup) ---- */
      const lenis = new Lenis({
        duration: 1.1,
        stopInertiaOnNavigate: true,
      });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      tickerFn = tick; // store for cleanup
      lenis.scrollTo(0, { immediate: true }); // router-safe: land at top on mount

      /* smooth-scroll section anchors, but let router links (#/…) navigate natively */
      onNavClick = (e) => {
        const a = e.target.closest?.('a[href^="#"]');
        if (!a) return;
        const href = a.getAttribute("href");
        if (!href || href === "#" || href.startsWith("#/")) return;
        e.preventDefault();
        lenis.scrollTo(href, { duration: 1.5 });
      };
      document.addEventListener("click", onNavClick);

      /* ------------------------------ full experience ------------------------------ */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* ---- preloader -> hero intro ---- */
        const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
        if (preRef.current) {
          intro
            .fromTo(
              preWordRefs.current,
              { autoAlpha: 0, y: 26 },
              { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.09, ease: "power3.out" }
            )
            .fromTo(
              preBrushRef.current,
              { scaleX: 0, transformOrigin: "left center" },
              { scaleX: 1, duration: 0.9, ease: "power2.inOut" },
              "-=0.15"
            )
            .fromTo(
              preDotRef.current,
              { x: 0, autoAlpha: 0 },
              { x: "+=360", autoAlpha: 1, duration: 0.9, ease: "power2.inOut" },
              "<"
            )
            .to(preRef.current, { yPercent: -100, duration: 0.95, ease: "power4.inOut" }, "+=0.25")
            .add(() => preRef.current?.remove());
        }

        /* hero words — translateY + stagger + a touch of rotation (no plain fade) */
        intro
          .fromTo(
            heroWordsRef.current,
            { yPercent: 115, rotation: (i) => (i === 1 ? -4 : 2) },
            { yPercent: 0, rotation: 0, duration: 1.15, stagger: 0.12, ease: "power4.out" },
            "-=0.6"
          )
          .fromTo(
            heroImgRef.current,
            { yPercent: -240, autoAlpha: 0, rotation: -6 },
            { yPercent: 0, autoAlpha: 1, rotation: 0, duration: 1.3, ease: "elastic.out(1, 0.6)" },
            "-=" + (0.4 + 0.12 * 2)
          )
          .fromTo(
            navRef.current,
            { autoAlpha: 0, y: -16 },
            { autoAlpha: 1, y: 0, duration: 0.6 },
            "-=1.05"
          )
          .fromTo(
            ".cc-hero-top > div",
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08 },
            "<"
          )
          .fromTo(
            ".cc-hero-bottom > *",
            { autoAlpha: 0, y: 26 },
            { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" },
            "-=0.5"
          );

        /* ---- custom cursor: instant dot + lerped ring (quickTo, not 1:1) ---- */
        let cursorCleanup = null;
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          const dot = curRef.current;
          const ring = ringRef.current;
          gsap.set([dot, ring], { x: window.innerWidth / 2, y: window.innerHeight / 2, autoAlpha: 0 });
          const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
          const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });
          const ringX = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" });
          const ringY = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" });
          const move = (e) => {
            dotX(e.clientX);
            dotY(e.clientY);
            ringX(e.clientX);
            ringY(e.clientY);
          };
          const interactive = (el) => el?.closest?.("a, button, [data-cursor]");
          const over = (e) => {
            const n = interactive(e.target);
            const label = n ? n.dataset.cursor || "view" : "";
            if (label && ring) {
              ring.classList.add("cc-on");
              ring.textContent = label;
            }
          };
          const out = (e) => {
            if (interactive(e.relatedTarget)) return;
            ring?.classList.remove("cc-on");
            if (ring) ring.textContent = "";
          };
          window.addEventListener("mousemove", move);
          window.addEventListener(
            "mousemove",
            () => gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 }),
            { once: true }
          );
          document.addEventListener("mouseover", over);
          document.addEventListener("mouseout", out);
          cursorCleanup = () => {
            window.removeEventListener("mousemove", move);
            document.removeEventListener("mouseover", over);
            document.removeEventListener("mouseout", out);
          };
        }

        /* ---- ticker marquee (left) + angled art strip (right), seamless loops ---- */
        let tickerTween;
        let stripTween;
        const runTicker = () => {
          const el = tickerRef.current;
          if (!el || !alive) return;
          tickerTween?.kill();
          /* capture the offset now — never read the ref inside a deferred GSAP callback,
             or a revert after unmount throws on the nulled ref */
          tickerTween = gsap.to(el, {
            x: -el.scrollWidth / 2,
            duration: 18,
            ease: "none",
            repeat: -1,
          });
        };
        const runStrip = () => {
          const el = stripTrackRef.current;
          if (!el || !alive) return;
          stripTween?.kill();
          stripTween = gsap.fromTo(
            el,
            { x: -el.scrollWidth / 2 },
            { x: 0, duration: 38, ease: "none", repeat: -1 }
          );
        };
        runTicker();
        runStrip();
        document.fonts?.ready?.then(() => {
          if (!alive) return;
          runTicker();
          runStrip();
          ScrollTrigger.refresh();
        });

        /* rotating badge */
        gsap.to(badgeRef.current, { rotation: 360, duration: 18, ease: "none", repeat: -1 });

        /* ---- hero parallax on scroll ---- */
        gsap.to(heroTypeRef.current, {
          yPercent: 16,
          ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
        });

        /* ---- hero image flies down + shrinks, lands in the ritual header (desktop) ---- */
        mm.add("(min-width: 821px) and (prefers-reduced-motion: no-preference)", () => {
          const img = heroImgRef.current;
          const drop = heroDropRef.current;
          if (!img || !drop) return;

          /* document-coordinate deltas: img center -> drop center, plus scale-down */
          const measure = () => {
            const ir = img.getBoundingClientRect();
            const dr = drop.getBoundingClientRect();
            return {
              x: dr.left + dr.width / 2 - (ir.left + ir.width / 2),
              y: dr.top + dr.height / 2 - (ir.top + ir.height / 2),
              scale: dr.width / ir.width,
            };
          };

          const flight = gsap.timeline({
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              /* land when the ritual header sits ~140px below the viewport top */
              end: () => drop.getBoundingClientRect().top + window.scrollY - 140,
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          });
          flight.fromTo(
            img,
            { x: 0, y: 0, scale: 1, transformOrigin: "50% 50%" },
            { x: () => measure().x, y: () => measure().y, scale: () => measure().scale, ease: "none" },
            0
          );
        });

        /* ---- nav: compact on scroll down, reveal on up, solidify after 60px ---- */
        let lastScroll = 0;
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const scroll = self.scroll();
            const nav = navRef.current;
            if (!nav) return;

            /* solidify after 60px */
            nav.classList.toggle("cc-scrolled", scroll > 60);

            /* hide on scroll down, reveal on scroll up */
            if (scroll > lastScroll && scroll > 120) {
              gsap.to(nav, { yPercent: -100, duration: 0.35, ease: "power2.out", overwrite: "auto" });
            } else {
              gsap.to(nav, { yPercent: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
            }
            lastScroll = scroll;
          },
        });

        /* ---- ritual rows + menu reveal ---- */
        gsap.from(".cc-ritual-row", {
          y: 46,
          autoAlpha: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ritualWrapRef.current, start: "top 80%" },
        });
        gsap.from(".cc-menu-col", {
          y: 34,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cc-menu", start: "top 86%" },
        });


        /* ---- FROM OUR CANVAS: video editorial reveal ---- */
        gsap.utils.toArray(".cc-canvas-title .cc-el-in").forEach((line) => {
          gsap.fromTo(line, { yPercent: 110 }, { yPercent: 0, ease: "power3.out",
            scrollTrigger: { trigger: ".cc-canvas-title", start: "top 85%", end: "top 50%", scrub: 0.4 } });
        });
        gsap.from(".cc-canvas-eyebrow", { autoAlpha: 0, y: 14, duration: 0.6,
          scrollTrigger: { trigger: ".cc-canvas-head", start: "top 80%" } });
        gsap.from(".cc-canvas-desc", { autoAlpha: 0, y: 18, duration: 0.7, delay: 0.1,
          scrollTrigger: { trigger: ".cc-canvas-head", start: "top 78%" } });
        gsap.from(".cc-canvas-cta-wrap", { autoAlpha: 0, y: 16, duration: 0.6, delay: 0.2,
          scrollTrigger: { trigger: ".cc-canvas-head", start: "top 76%" } });
        /* staggered video reveal */
        const canvasItems = gsap.utils.toArray(".cc-canvas-item");
        canvasItems.forEach((item, i) => {
          gsap.fromTo(item, { y: 60, autoAlpha: 0, scale: 0.94 }, {
            y: 0, autoAlpha: 1, scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 88%" },
            delay: (i % 3) * 0.08,
          });
        });

        /* brush element */
        gsap.fromTo(".cc-canvas-brush", { scaleX: 0, transformOrigin: "left center" }, {
          scaleX: 1, ease: "none",
          scrollTrigger: { trigger: ".cc-canvas-head", start: "top 80%", end: "bottom 60%", scrub: 0.4 },
        });

        /* --- IntersectionObserver: play/pause videos for performance --- */
        let videoCleanup = null;
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const vids = document.querySelectorAll(".cc-canvas-vid");
          if (vids.length && "IntersectionObserver" in window) {
            const io = new IntersectionObserver((entries) => {
              entries.forEach((e) => {
                const v = e.target;
                if (e.isIntersecting) { v.play().catch(() => {}); }
                else { v.pause(); }
              });
            }, { threshold: 0.25 });
            vids.forEach((v) => io.observe(v));
            videoCleanup = () => { io.disconnect(); };
          }
          return () => { videoCleanup?.(); videoCleanup = null; };
        });

        /* ---- COME FIND US: location section reveal ---- */
        gsap.utils.toArray(".cc-loc-title .cc-el-in").forEach((line) => {
          gsap.fromTo(line, { yPercent: 110 }, { yPercent: 0, ease: "power3.out",
            scrollTrigger: { trigger: ".cc-loc-title", start: "top 85%", end: "top 50%", scrub: 0.4 } });
        });
        gsap.from(".cc-loc-eyebrow", { autoAlpha: 0, y: 14, duration: 0.6,
          scrollTrigger: { trigger: ".cc-loc-head", start: "top 80%" } });
        gsap.from(".cc-loc-sub", { autoAlpha: 0, y: 18, duration: 0.7, delay: 0.1,
          scrollTrigger: { trigger: ".cc-loc-head", start: "top 78%" } });
        /* map reveal */
        gsap.from(".cc-loc-map", { y: 30, autoAlpha: 0, scale: 0.97, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".cc-loc-map", start: "top 82%" } });
        gsap.from(".cc-loc-map-label", { autoAlpha: 0, y: -10, duration: 0.6, delay: 0.4,
          scrollTrigger: { trigger: ".cc-loc-map", start: "top 78%" } });
        /* info reveal */
        gsap.from(".cc-loc-brand", { autoAlpha: 0, y: 24, duration: 0.7,
          scrollTrigger: { trigger: ".cc-loc-info", start: "top 80%" } });
        gsap.from(".cc-loc-rating", { autoAlpha: 0, y: 18, duration: 0.6, delay: 0.1,
          scrollTrigger: { trigger: ".cc-loc-info", start: "top 78%" } });
        gsap.from(".cc-loc-ctas", { autoAlpha: 0, y: 20, duration: 0.6, delay: 0.2,
          scrollTrigger: { trigger: ".cc-loc-info", start: "top 76%" } });
        /* brush line draw */
        gsap.to(".cc-loc-brush-line", { scaleX: 1, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: ".cc-loc-brush-line", start: "top 85%" } });

        /* ---- FINAL CTA: cinematic reveal ---- */
        gsap.utils.toArray(".cc-fcta-title .cc-el-in").forEach((line, i) => {
          gsap.fromTo(line, { yPercent: 110 }, { yPercent: 0, ease: "power3.out",
            scrollTrigger: { trigger: ".cc-fcta-title", start: "top 85%", end: "top 45%", scrub: 0.5 },
            delay: i * 0.15 });
        });
        gsap.from(".cc-fcta-buttons", { autoAlpha: 0, y: 24, duration: 0.8, delay: 0.3,
          scrollTrigger: { trigger: ".cc-fcta-title", start: "top 60%" } });
        /* final brush sweep */
        gsap.to(".cc-fcta-final-brush", { scaleX: 1, ease: "power2.inOut",
          scrollTrigger: { trigger: ".cc-fcta", start: "top 40%", end: "bottom 60%", scrub: 0.4 } });
        gsap.from(".cc-fcta-tagline", { autoAlpha: 0, y: 14, duration: 0.6,
          scrollTrigger: { trigger: ".cc-fcta-final-brush", start: "top 80%" } });

        /* ---- FOOTER: sequential reveal ---- */
        gsap.from(".cc-foot-top", { autoAlpha: 0, y: 20, duration: 0.7,
          scrollTrigger: { trigger: ".cc-footer", start: "top 85%" } });
        gsap.from(".cc-foot-col", {
          y: 20, autoAlpha: 0, stagger: 0.08, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".cc-foot-grid", start: "top 90%" },
        });
        gsap.from(".cc-foot-bar", { autoAlpha: 0, duration: 0.5, delay: 0.3,
          scrollTrigger: { trigger: ".cc-foot-bar", start: "top 95%" } });
        gsap.from(".cc-foot-brush-line", { scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power2.inOut",
          scrollTrigger: { trigger: ".cc-foot-brush-line", start: "top 95%" } });

        /* ---- editorial quote: premium reveal ---- */
        const quoteWords = gsap.utils.toArray(".cc-quote .cc-wi", quoteRef.current);
        const qTl = gsap.timeline({ scrollTrigger: { trigger: ".cc-quote", start: "top 75%" } });
        qTl.fromTo(".cc-q-gmark", { opacity: 0, scale: 0.8, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" }, 0)
          .fromTo(quoteWords, { yPercent: 115 }, { yPercent: 0, duration: 0.9, stagger: 0.025, ease: "power3.out" }, 0.15)
          .fromTo(".cc-q-brush-accent", { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, 0.5)
          .fromTo(".cc-q-star", { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.06, ease: "power2.out" }, 0.7)
          .fromTo(".cc-q-reviewer span, .cc-q-source", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }, 0.85)
          .fromTo(".cc-q-dot", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)" }, 0.4)
          .fromTo(".cc-q-circle", { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, 0.3)
          .fromTo(".cc-q-eyebrow", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0)
          .fromTo(".cc-q-catalog", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, 1)

        /* ---- THE CRAVINGS: cinematic editorial reveal ---- */
        const crav = cravRef.current;
        if (crav) {
          /* 1. headline reveals upward (masked lines) */
          gsap.utils.toArray(".cc-crav-title .cc-el-in", crav).forEach((line) => {
            gsap.fromTo(line, { yPercent: 120 }, { yPercent: 0, ease: "none",
              scrollTrigger: { trigger: ".cc-crav-title", start: "top 82%", end: "top 40%", scrub: 0.5 } });
          });
          /* 2. food image: right-anchored pocket reveal (clip-path expands left) */
          gsap.fromTo(cravImgRef.current,
            { clipPath: "inset(0 82% 0 0)", scale: 0.96, opacity: 0.7 },
            { clipPath: "inset(0 0% 0 0)", scale: 1, opacity: 1, ease: "none",
              scrollTrigger: { trigger: ".cc-crav-media", start: "top 90%", end: "top 44%", scrub: 0.5 } }
          );
          /* 3. categories fade in sequentially */
          gsap.from(".cc-crav-cat", {
            y: 16, autoAlpha: 0, stagger: 0.09, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: ".cc-crav-cats", start: "top 92%" },
          });
          /* 4. orange dot drifts slightly */
          gsap.fromTo(cravDotRef.current, { x: 10, y: -8 }, { x: 0, y: 0, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: ".cc-crav-media", start: "top 88%" } });
          /* 5. FOOD AS ART outlined reveal (mask wipe) */
          gsap.fromTo(cravOutlineRef.current, { clipPath: "inset(0 100% 0 0)" }, {
            clipPath: "inset(0 0% 0 0)", ease: "none",
            scrollTrigger: { trigger: ".cc-crav-outro", start: "top 74%", end: "top 34%", scrub: 0.5 },
          });
          /* 6. brush draws left -> right; when it finishes, first gallery card reveals */
          if (cravFirstCardRef.current) {
            gsap.set(cravFirstCardRef.current, { autoAlpha: 0 });
          }
          gsap.fromTo(cravBrushRef.current, { scaleX: 0, transformOrigin: "left center" }, {
            scaleX: 1, ease: "none",
            scrollTrigger: {
              trigger: ".cc-crav-outro",
              start: "top 70%",
              end: "bottom 82%",
              scrub: 0.4,
              onUpdate: (self) => {
                /* once the brush passes ~95%, reveal the first gallery card under it */
                if (self.progress > 0.95 && cravFirstCardRef.current) {
                  gsap.set(cravFirstCardRef.current, { autoAlpha: 1 });
                }
              },
            },
          });
        }

        return () => {
          cursorCleanup?.();
          videoCleanup?.();
          tickerTween?.kill();
          stripTween?.kill();
        };
      });

      /* ----------------------- reduced motion: just get to the page ----------------------- */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (preRef.current) {
          gsap.to(preRef.current, {
            autoAlpha: 0,
            duration: 0.35,
            delay: 0.05,
            onComplete: () => preRef.current?.remove(),
          });
        }
      });

      /* ------------------------- ritual hover preview (desktop, fine pointer) ------------------------- */
      mm.add("(hover: hover) and (pointer: fine) and (min-width: 821px) and (prefers-reduced-motion: no-preference)", () => {
        const img = ritualImgRef.current;
        const xTo = gsap.quickTo(img, "x", { duration: 0.65, ease: "power3.out" });
        const yTo = gsap.quickTo(img, "y", { duration: 0.65, ease: "power3.out" });
        let active = false;
        const rows = gsap.utils.toArray(".cc-ritual-row", ritualWrapRef.current);
        const onMove = (e) => {
          if (!active) return;
          xTo(e.clientX + 48);
          yTo(e.clientY - 170);
        };
        const show = (row) => {
          active = true;
          ritualImgPicRef.current.src = row.dataset.img;
          ritualImgCapRef.current.textContent = row.dataset.name;
          gsap.to(img, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "power3.out", overwrite: "auto" });
        };
        const hide = () => {
          active = false;
          gsap.to(img, { autoAlpha: 0, scale: 0.85, duration: 0.3, ease: "power3.in", overwrite: "auto" });
        };
        const bound = [];
        rows.forEach((row) => {
          const enter = () => show(row);
          row.addEventListener("mouseenter", enter);
          row.addEventListener("mouseleave", hide);
          bound.push([row, enter, hide]);
        });
        window.addEventListener("mousemove", onMove);
        return () => {
          bound.forEach(([row, enter, leave]) => {
            row.removeEventListener("mouseenter", enter);
            row.removeEventListener("mouseleave", leave);
          });
          window.removeEventListener("mousemove", onMove);
        };
      });

      /* ------------------------- horizontal pinned gallery (desktop) ------------------------- */
      mm.add("(min-width: 821px) and (prefers-reduced-motion: no-preference)", () => {
        const track = hTrackRef.current;
        const sec = galleryRef.current;
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const hTween = gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: () => "+=" + dist(),
            scrub: 0.7,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const n = Math.min(GALLERY.length - 1, Math.round(self.progress * (GALLERY.length - 1)));
              if (galCountRef.current) {
                galCountRef.current.textContent =
                  String(n + 1).padStart(2, "0") + " / " + String(GALLERY.length).padStart(2, "0");
              }
              if (galBarRef.current) galBarRef.current.style.transform = "scaleX(" + self.progress + ")";
            },
          },
        });

        /* uniform cards — same size, active-card scale + opacity effect */
        const cards = gsap.utils.toArray(".cc-h-card", sec);
        const vw = window.innerWidth;
        cards.forEach((card) => {
          const media = card.querySelector(".cc-h-media");
          /* image zoom-out as card scrolls into view */
          if (media) {
            gsap.fromTo(media, { scale: 1.2 }, { scale: 1, ease: "none",
              scrollTrigger: { trigger: card, containerAnimation: hTween, start: "left right", end: "right left", scrub: true } });
          }
          /* active-card: scale + opacity based on distance from viewport center */
          ScrollTrigger.create({
            trigger: card,
            containerAnimation: hTween,
            start: "left center",
            end: "right center",
            onUpdate: (self) => {
              const progress = self.progress;
              const centerDist = Math.abs(progress - 0.5) * 2;
              const scale = 0.96 + (1 - centerDist) * 0.04;
              const opacity = 0.75 + (1 - centerDist) * 0.25;
              card.style.transform = `scale(${scale})`;
              card.style.opacity = opacity;
            },
          });
        });

        return () => hTween.scrollTrigger?.kill();
      });

      return () => {
        mm.revert();
      };
    }, rootRef);

    return () => {
      alive = false;
      if (onNavClick) document.removeEventListener("click", onNavClick);
      /* kill marquee tweens that may have escaped ctx scope (async fonts.ready rebuilds) */
      if (tickerRef.current) gsap.killTweensOf(tickerRef.current);
      if (stripTrackRef.current) gsap.killTweensOf(stripTrackRef.current);
      if (typeof tickerFn === "function") gsap.ticker.remove(tickerFn);
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.ticker.lagSmoothing(0);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* ---------------------------------- render ---------------------------------- */

  return (
    <div className="cc-root" ref={rootRef}>
      <svg className="cc-grain" width="100%" height="100%" aria-hidden="true">
        <filter id="cc-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cc-noise)" />
      </svg>

      <div className="cc-cur" ref={curRef} />
      <div className="cc-cur-ring" ref={ringRef} />

      <div className="cc-pre" ref={preRef}>
        <span className="cc-pre-mono" ref={(el) => (preWordRefs.current[0] = el)}>C&amp;C</span>
        <span className="cc-pre-tag" ref={(el) => (preWordRefs.current[1] = el)}>Eat • Paint • Repeat</span>
        <div className="cc-pre-stroke" aria-hidden="true">
          <span className="cc-pre-brush" ref={preBrushRef} />
          <span className="cc-pre-dot" ref={preDotRef} />
        </div>
      </div>

      <nav className="cc-nav" ref={navRef}>
        <a className="cc-nav-mark" href="#top" data-cursor="view"><img className="cc-nav-logo" src="/logo.png" alt="Canvas & Cravings" /></a>
        <div className="cc-nav-right">
          <a href="#/menu" data-cursor="view"><span className="cc-nav-link-text">Menu</span><span className="cc-nav-dot" aria-hidden="true" /></a>
          <a href="#ritual" data-cursor="view"><span className="cc-nav-link-text">Ritual</span><span className="cc-nav-dot" aria-hidden="true" /></a>
          <a href="#gallery" data-cursor="view"><span className="cc-nav-link-text">Walls</span><span className="cc-nav-dot" aria-hidden="true" /></a>
          <a href="#visit" className="cc-nav-book" data-cursor="view">Book<span className="cc-nav-book-arr">→</span></a>
        </div>
        <button className="cc-burger" ref={burgerRef} onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={menuOpen}>
          <span /><span /><span />
        </button>
      </nav>

      {/* mobile full-screen menu overlay */}
      <div className="cc-mmenu" ref={mobileMenuRef} aria-hidden={!menuOpen}>
        <div className="cc-mmenu-inner">
          <a className="cc-mmenu-link" href="#top" onClick={closeMenu} data-cursor="view"><span className="cc-mmenu-num">00</span><span className="cc-mmenu-text">Home</span></a>
          <a className="cc-mmenu-link" href="#/menu" onClick={closeMenu} data-cursor="view"><span className="cc-mmenu-num">01</span><span className="cc-mmenu-text">Menu</span></a>
          <a className="cc-mmenu-link" href="#ritual" onClick={closeMenu} data-cursor="view"><span className="cc-mmenu-num">02</span><span className="cc-mmenu-text">Ritual</span></a>
          <a className="cc-mmenu-link" href="#gallery" onClick={closeMenu} data-cursor="view"><span className="cc-mmenu-num">03</span><span className="cc-mmenu-text">Walls</span></a>
          <a className="cc-mmenu-link" href="#visit" onClick={closeMenu} data-cursor="view"><span className="cc-mmenu-num">04</span><span className="cc-mmenu-text">Visit</span></a>
          <a className="cc-mmenu-book" href="#visit" onClick={closeMenu} data-cursor="view">
            Book a table <span className="cc-mmenu-book-arr">→</span>
          </a>
        </div>
      </div>

      <div className="cc-ticker-strip">
        <div className="cc-ticker-track" ref={tickerRef}>
          {[0, 1].map((i) => (
            <span className="cc-ticker-group" key={i} aria-hidden={i === 1}>
              <span>Gulberg Greens · Islamabad</span><span className="cc-tick-star">★</span>
              <span>Eat · Paint · Repeat</span><span className="cc-tick-star">★</span>
              <span>Open till 12AM</span><span className="cc-tick-star">★</span>
              <span>DJ Night — Fridays</span><span className="cc-tick-star">★</span>
              <span>Paint &amp; Plate — weekly</span><span className="cc-tick-star">★</span>
            </span>
          ))}
        </div>
      </div>

      <section className="cc-hero" id="top" ref={heroRef}>
        <div className="cc-hero-top">
          <div className="cc-hero-meta">Art café · Gulberg Greens<br />Islamabad, Pakistan</div>
          <div className="cc-hero-meta cc-right"><span className="cc-star">★</span> 4.4 rated<br />195 Google reviews</div>
        </div>

        <div className="cc-hero-img-wrap">
          <img
            className="cc-hero-img"
            ref={heroImgRef}
            src="/images/hero.png"
            alt="Fettuccine with grilled chicken, latte art, and a mini easel — Eat. Paint. Repeat."
          />
        </div>

        <div className="cc-hero-type" ref={heroTypeRef}>
          <div className="cc-hero-row"><h1 ref={(el) => (heroWordsRef.current[0] = el)}>Eat</h1></div>
          <div className="cc-hero-row cc-r2"><h1 ref={(el) => (heroWordsRef.current[1] = el)}>Paint</h1></div>
          <div className="cc-hero-row cc-r3"><h1 ref={(el) => (heroWordsRef.current[2] = el)}>Repeat</h1></div>
        </div>

        <div className="cc-hero-bottom">
          <p className="cc-hero-note">
            Every table gets a canvas. Chef-plated food, live painting sessions, and a café built for
            lingering — not rushing.
          </p>
          <div className="cc-hero-cta">
            <a
              className="cc-magnetic"
              href="#/menu"
              ref={magneticRef}
              data-cursor="menu"
              onMouseMove={handleMagneticMove}
              onMouseEnter={handleMagneticEnter}
              onMouseLeave={handleMagneticLeave}
            >
              <span className="cc-mag-label">See<br />menu</span>
              <span className="cc-mag-arr">→</span>
            </a>
            <svg className="cc-badge" ref={badgeRef} viewBox="0 0 120 120" aria-hidden="true">
              <defs>
                <path id="cc-badge-path" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" fill="none" />
              </defs>
              <text>
                <textPath href="#cc-badge-path">EAT · PAINT · REPEAT · EAT · PAINT · REPEAT ·</textPath>
              </text>
              <path className="cc-badge-arr" d="M60 38 L60 74 M60 74 L70 64 M60 74 L50 64" />
            </svg>
          </div>
        </div>
      </section>

      <div className="cc-strip-wrap">
        <div className="cc-strip">
          <div className="cc-strip-track" ref={stripTrackRef}>
            {[0, 1].map((i) => (
              <span className="cc-strip-group" key={i} aria-hidden={i === 1}>
                {STRIP_TILES.map((t, j) => (
                  <img key={j} className="cc-strip-tile" src={`/images/${t}.jpg`} alt="" loading="lazy" />
                ))}
                <span className="cc-strip-word">Eat</span>
                <span className="cc-strip-star">★</span>
                <span className="cc-strip-word">Paint</span>
                <span className="cc-strip-star">★</span>
                <span className="cc-strip-word">Repeat</span>
                <span className="cc-strip-star">★</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="cc-ritual" id="ritual">
        <div className="cc-wrap">
          <div className="cc-sec-head">
            <span className="cc-sec-label">The Ritual — how it works</span>
            <span className="cc-hero-drop" ref={heroDropRef} aria-hidden="true" />
            <span className="cc-sec-num">01–04</span>
          </div>
          <div className="cc-ritual-rows" ref={ritualWrapRef}>
            {RITUAL.map((r) => (
              <div className="cc-ritual-row" key={r.num} data-cursor="paint" data-img={r.img} data-name={r.name}>
                <span className="cc-ritual-num">{r.num}</span>
                <span className="cc-ritual-name">{r.name}</span>
                <span className="cc-ritual-desc">{r.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="cc-menu">
          <div className="cc-wrap">
            <div className="cc-menu-head">
              <h3 className="cc-menu-title">The menu</h3>
              <span className="cc-menu-sub">All prices in PKR · kitchen open till 11:45PM</span>
            </div>
            <div className="cc-menu-grid">
              {MENU.map((m, i) => (
                <div className="cc-menu-col" key={m.cat}>
                  <h4 className="cc-menu-cat"><span className="cc-menu-idx">0{i + 1}</span>{m.cat}</h4>
                  {m.items.map(([name, price]) => (
                    <div className="cc-menu-item" key={name}>
                      <span className="cc-menu-name">{name}</span>
                      <span className="cc-menu-dots" />
                      <span className="cc-menu-price">Rs {price}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="cc-menu-foot">
              <span className="cc-menu-foot-note">The full spread — 71 dishes &amp; drinks</span>
              <a className="cc-menu-all" href="#/menu" data-cursor="view">
                View all menu <span className="cc-menu-all-arr">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------- THE CRAVINGS ------------------------------- */}
      <section className="cc-crav" id="cravings" ref={cravRef}>
        <div className="cc-wrap">
          <div className="cc-crav-eyebrow">
            <span>The Cravings</span>
            <span className="cc-crav-eyebrow-slash">/ Signature Plates</span>
          </div>

          <div className="cc-crav-grid">
            <div className="cc-crav-copy">
              <h2 className="cc-crav-title" ref={cravTitleRef}>
                <span className="cc-el"><span className="cc-el-in">Made to be tasted.</span></span>
                <span className="cc-el"><span className="cc-el-in">Designed to be <em>remembered.</em></span></span>
              </h2>
              <p className="cc-crav-desc">
                Chef-plated cravings inspired by good food,
                good company and a little creative chaos.
              </p>

              <nav className="cc-crav-cats" aria-label="Menu categories">
                {["Pizza", "Pasta", "Coffee", "Desserts"].map((c) => (
                  <a className="cc-crav-cat" href="#/menu" key={c} data-cursor="view">
                    <span className="cc-crav-cat-line" aria-hidden="true" />
                    {c}
                  </a>
                ))}
              </nav>

              <a className="cc-crav-cta" href="#/menu" data-cursor="view">
                Explore the menu <span className="cc-crav-cta-arr">→</span>
              </a>
            </div>

            <div className="cc-crav-media">
              <span className="cc-crav-dot" ref={cravDotRef} aria-hidden="true" />
              <div className="cc-crav-photo" ref={cravImgRef}>
                <img
                  src="/images/cravings-plate.png"
                  alt="Chef-plated fettuccine in a ceramic bowl with basil and cherry tomatoes — composed like a canvas"
                  fetchpriority="high"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="cc-crav-outro">
          <span className="cc-crav-outro-label">Food as art</span>
          <h3 className="cc-crav-outline" ref={cravOutlineRef} aria-hidden="true">FOOD AS ART</h3>
          <p className="cc-crav-outro-sub">Every plate is a canvas.</p>
          <div className="cc-crav-brush">
            <img src="/images/brush-stroke.png" alt="" ref={cravBrushRef} loading="lazy" />
          </div>
        </div>
      </section>

      <section className="cc-h-gallery" id="gallery" ref={galleryRef}>
        <span className="cc-h-bg" aria-hidden="true">Walls</span>
        <div className="cc-gal-head">
          <span className="cc-gal-label">The Walls — keep scrolling</span>
          <span className="cc-gal-count">
            <span ref={galCountRef}>01 / 10</span>
            <span className="cc-gal-bar"><i ref={galBarRef} /></span>
          </span>
        </div>
        <div className="cc-h-track" ref={hTrackRef}>
          {GALLERY.map((c, gi) => (
            <div
              className="cc-h-card"
              data-cursor="drag"
              key={c.idx}
              ref={gi === 0 ? cravFirstCardRef : undefined}
            >
              <div className="cc-h-media"><img className="cc-h-img" src={c.img} alt={c.label} loading="lazy" /></div>
              <div className="cc-h-shade" />
              <div className="cc-h-meta">
                <span className="cc-h-caption">{c.cap}</span>
                <span className="cc-h-idx">{c.idx}</span>
              </div>
              <span className="cc-h-label">{c.label}</span>
            </div>
          ))}
          <a className="cc-h-card cc-h-cta" href="#visit" data-cursor="view">
            <span className="cc-h-cta-cap">Next up</span>
            <span className="cc-h-cta-title">Your table<br />is a canvas.</span>
            <span className="cc-h-cta-arr">Book →</span>
          </a>
        </div>
      </section>

      {/* ------------------------------- FROM OUR CANVAS ------------------------------- */}
      <section className="cc-canvas" id="canvas">
        <div className="cc-canvas-head">
          <span className="cc-canvas-eyebrow">@CANVASNCRAVINGS</span>
          <h2 className="cc-canvas-title">
            <span className="cc-el"><span className="cc-el-in">From our</span></span>
            <span className="cc-el"><span className="cc-el-in">canvas</span></span>
          </h2>
          <p className="cc-canvas-desc">
            A little food.<br />
            A little art.<br />
            A lot of good memories.
          </p>
        </div>

        {/* decorative brush */}
        <img className="cc-canvas-brush" src="/images/brush-stroke.png" alt="" aria-hidden="true" loading="lazy" />

        <div className="cc-canvas-grid">
          {/* 3-column masonry layout */}
          <div className="cc-canvas-col">
            {CANVAS_VIDEOS.filter((_, i) => i % 3 === 0).map((item, i) => (
              <div className="cc-canvas-item" key={i} data-cursor="view">
                <div className="cc-canvas-vid-wrap">
                  <video className="cc-canvas-vid" src={item.src} muted loop playsInline preload="metadata" />
                  <div className="cc-canvas-overlay">
                    <span className="cc-canvas-label">{item.label}</span>
                    <span className="cc-canvas-tag">{item.tag}</span>
                  </div>
                  <div className="cc-canvas-social"><span>♡</span><span>comment</span><span>share</span></div>
                </div>
              </div>
            ))}
          </div>
          <div className="cc-canvas-col">
            {CANVAS_VIDEOS.filter((_, i) => i % 3 === 1).map((item, i) => (
              <div className="cc-canvas-item" key={i} data-cursor="view">
                <div className="cc-canvas-vid-wrap">
                  <video className="cc-canvas-vid" src={item.src} muted loop playsInline preload="metadata" />
                  <div className="cc-canvas-overlay">
                    <span className="cc-canvas-label">{item.label}</span>
                    <span className="cc-canvas-tag">{item.tag}</span>
                  </div>
                  <div className="cc-canvas-social"><span>♡</span><span>comment</span><span>share</span></div>
                </div>
              </div>
            ))}
          </div>
          <div className="cc-canvas-col">
            {CANVAS_VIDEOS.filter((_, i) => i % 3 === 2).map((item, i) => (
              <div className="cc-canvas-item" key={i} data-cursor="view">
                <div className="cc-canvas-vid-wrap">
                  <video className="cc-canvas-vid" src={item.src} muted loop playsInline preload="metadata" />
                  <div className="cc-canvas-overlay">
                    <span className="cc-canvas-label">{item.label}</span>
                    <span className="cc-canvas-tag">{item.tag}</span>
                  </div>
                  <div className="cc-canvas-social"><span>♡</span><span>comment</span><span>share</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* social CTA */}
        <div className="cc-canvas-cta-wrap">
          <a className="cc-canvas-cta" href="https://www.instagram.com/canvasncravings/?hl=en" target="_blank" rel="noopener noreferrer" data-cursor="view">
            <svg className="cc-canvas-ig" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
            Follow the canvas <span className="cc-canvas-cta-arr">→</span>
          </a>
          <span className="cc-canvas-ig-handle">@CANVASNCRAVINGS</span>
        </div>
      </section>

      {/* ---- COME FIND US — location section ---- */}
      <section className="cc-location">
        <div className="cc-wrap">
          <div className="cc-loc-head">
            <span className="cc-loc-eyebrow">LOCATION</span>
            <h2 className="cc-loc-title">
              <span className="cc-el"><span className="cc-el-in">Come find</span></span>
              <span className="cc-el"><span className="cc-el-in">us</span></span>
            </h2>
            <p className="cc-loc-sub">Come for the cravings.<br/>Stay for the canvas.</p>
          </div>

          <div className="cc-loc-grid">
            {/* Google Maps embed — professional styled */}
            <div className="cc-loc-map">
              <iframe
                className="cc-loc-map-iframe"
                title="Canvas & Cravings Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.0!2d73.1681471!3d33.6083696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfeb001b72f70f%3A0x49a09e95a3efcbcf!2sCANVAS%20%26%20CRAVINGS%20CAFE!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="cc-loc-map-overlay">
                <div className="cc-loc-map-label">
                  <svg className="cc-loc-map-pin-icon" viewBox="0 0 24 24" width="16" height="16" fill="var(--orange)" stroke="none"><path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 14 8 14s8-8.75 8-14c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>
                  <span>CANVAS & CRAVINGS</span>
                </div>
              </div>
              <a className="cc-loc-map-link" href="https://www.google.com/maps/place/CANVAS+%26+CRAVINGS+CAFE/@33.6083696,73.1681471,17z" target="_blank" rel="noopener noreferrer" data-cursor="view" aria-label="Open in Google Maps"></a>
            </div>

            {/* location info */}
            <div className="cc-loc-info">
              <div className="cc-loc-brand">
                <span className="cc-loc-brand-name">CANVAS & CRAVINGS</span>
                <span className="cc-loc-address">Gulberg Greens<br/>Islamabad, Pakistan</span>
              </div>
              <div className="cc-loc-rating">
                <span className="cc-loc-stars">4.4 ★</span>
                <span className="cc-loc-reviews">199 Google Reviews</span>
              </div>
              <div className="cc-loc-hours">
                <span className="cc-loc-hours-label">Hours</span>
                <span className="cc-loc-hours-val">Open now · Closes 12AM</span>
              </div>
              <div className="cc-loc-ctas">
                <a className="cc-loc-btn cc-loc-btn--primary" href="https://www.google.com/maps/place/CANVAS+%26+CRAVINGS+CAFE/@33.6083696,73.1681471,17z" target="_blank" rel="noopener noreferrer" data-cursor="view">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  GET DIRECTIONS <span className="cc-loc-btn-arr">→</span>
                </a>
                <a className="cc-loc-btn cc-loc-btn--secondary" href="#" data-cursor="view">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  BOOK A TABLE <span className="cc-loc-btn-arr">→</span>
                </a>
              </div>
              {/* decorative brush */}
              <div className="cc-loc-brush-line"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- FINAL CTA ---- */}
      <section className="cc-fcta">
        <div className="cc-fcta-brush-bg"></div>
        <div className="cc-wrap">
          <h2 className="cc-fcta-title">
            <span className="cc-el"><span className="cc-el-in cc-fcta-line1">Come hungry.</span></span>
            <span className="cc-el"><span className="cc-el-in cc-fcta-line2">Leave <em>inspired.</em></span></span>
          </h2>
          <div className="cc-fcta-buttons">
            <a className="cc-fcta-btn cc-fcta-btn--primary magnetic" href="#" data-cursor="view" ref={magneticRef} onMouseMove={handleMagneticMove} onMouseEnter={handleMagneticEnter} onMouseLeave={handleMagneticLeave}>
              BOOK A TABLE <span className="cc-fcta-arr">→</span>
            </a>
            <a className="cc-fcta-btn cc-fcta-btn--secondary" href="#cravings" data-cursor="view">
              EXPLORE THE MENU <span className="cc-fcta-arr">→</span>
            </a>
          </div>
        </div>
        {/* final brush signature */}
        <div className="cc-fcta-final-brush"></div>
        <div className="cc-fcta-tagline">
          <span>EAT</span><span className="cc-fcta-dot">•</span>
          <span>PAINT</span><span className="cc-fcta-dot">•</span>
          <span>REPEAT</span>
        </div>
      </section>

      <section className="cc-quote">
        {/* decorative background elements */}
        <div className="cc-q-gmark" aria-hidden="true">“</div>
        <div className="cc-q-dot" aria-hidden="true" />
        <div className="cc-q-circle" aria-hidden="true" />
        <div className="cc-q-line" aria-hidden="true" />

        <div className="cc-wrap cc-q-wrap">
          <span className="cc-q-eyebrow">From the people</span>

          <div ref={quoteRef} className="cc-q-text">
            {QUOTE_WORDS.map((w, i) => (
              <span className="cc-w" key={i}><span className="cc-wi">{w + "\u00A0"}</span></span>
            ))}
          </div>

          <div className="cc-q-brush-accent" aria-hidden="true" />

          <div className="cc-q-att">
            <div className="cc-q-stars">{'★'.repeat(5).split('').map((s,i)=><span key={i} className="cc-q-star">{s}</span>)}</div>
            <div className="cc-q-reviewer">
              <span className="cc-q-name">Sana</span>
              <span className="cc-q-role">Local Guide</span>
            </div>
            <div className="cc-q-source">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              <span>Google Review</span>
            </div>
          </div>

          <span className="cc-q-catalog" aria-hidden="true">C&C / Review 01</span>
        </div>
      </section>

      <CcFooter onTop={handleTop} />

      <div className="cc-ritual-img" ref={ritualImgRef}>
        <img className="cc-ritual-img-img" ref={ritualImgPicRef} src="/images/cafe-p04.jpg" alt="" />
        <span className="cc-ritual-img-cap" ref={ritualImgCapRef}>Sip &amp; sketch</span>
      </div>
    </div>
  );
}
