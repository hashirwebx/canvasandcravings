import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import CcFooter from "./CcFooter";
import "./CanvasCravingsMenu.css";

gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------- icons ---------------------------------- */

const ChiliIcon = () => (
  <svg className="ccm-chili" viewBox="0 0 24 24" aria-label="spicy" role="img">
    <path
      d="M17.8 3.2c1 1.7 1.6 3.6 1.6 5.7 0 5.1-4.2 9-8.2 9-2 0-3.7-.8-5-2.2.6-3.5 2.6-6.3 5.7-7.7.4-.2.9-.3 1.3-.4-1-1.5-2.6-2.7-4.4-3.6.2-.4.5-.7.9-.9 2.4 1 4.4 2.6 5.6 4.6.6-2 .6-4.1-.3-5.9 1-.1 1.9 0 2.8.4z"
      fill="currentColor"
    />
    <path
      d="M17.8 3.2c-1.5 1-2.5 2.3-2.9 3.8"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

/* ---------------------------------- data ---------------------------------- */

const CATS = [
  {
    id: "starters",
    name: "Starters",
    items: [
      { n: "Chicken Nuggets", d: "crispy golden bites, ready for the dip", p: "599" },
      { n: "Chef's Chicken Strips", d: "buttermilk-tender, honey-mustard sidekick", p: "799" },
      { n: "Chili Kissed Chicken", d: "sweet-heat glaze, sesame crunch", p: "999", spicy: true },
      { n: "Chef's Hot Shots", d: "spiced, fried, dangerously snackable", p: "999", spicy: true },
      { n: "Chicken Wings", d: "sticky BBQ or blazing buffalo", p: "899", spicy: true },
    ],
  },
  {
    id: "soups",
    name: "Soups",
    items: [
      { n: "Chef's Signature Soup", d: "the daily bowl — ask what's cooking", p: "999", note: "family" },
      { n: "Chef's Hot & Sour Creation", d: "spicy, sour, seriously warming", p: "599", p2: "1799", note: "regular / family", spicy: true },
      { n: "Chef's Chicken Corn Soup", d: "silky, with the proper egg ribbon", p: "599", p2: "1799", note: "regular / family" },
      { n: "Creamy Mushroom Soup", d: "earthy, velvety, no shortcuts", p: "899" },
      { n: "Classic Mulligatawny Soup", d: "the old-school favourite, done right", p: "599" },
    ],
  },
  {
    id: "salads",
    name: "Salads",
    items: [
      { n: "Salade du Chef", d: "the chef's own salad. trust it", p: "999", chef: true },
      { n: "Russian Medley Salad", d: "hearty, creamy, cold and crisp", p: "799" },
    ],
  },
  {
    id: "fries",
    name: "Fries",
    items: [
      { n: "Chef's Signature Loaded Fries", d: "cheese, sauce, drama", p: "999", chef: true },
      { n: "French Fries", d: "classic, golden, unbothered", p: "499" },
    ],
  },
  {
    id: "sandwiches",
    name: "Sandwiches",
    items: [
      { n: "Chef's Signature Club Sandwich", d: "triple-decked and stacked tall", p: "1099" },
      { n: "Chef's Smokey BBQ Delight", d: "smoky, saucy, substantial", p: "999" },
    ],
  },
  {
    id: "chinese-thai",
    name: "Chinese & Thai",
    items: [
      { n: "Chicken Chilli Dry", d: "wok-tossed, garlicky, serious heat", p: "1399", spicy: true },
      { n: "Chicken Manchurian", d: "sticky, glossy, umami-loaded", p: "1199" },
      { n: "Chicken Chowmein", d: "wok-charred noodles, the reliable hit", p: "1299" },
    ],
  },
  {
    id: "pasta",
    name: "Pasta",
    items: [
      { n: "Chef's Signature Fettuccini", d: "creamy, cheesy, comforting", p: "1399" },
      { n: "Chef's Arrabbiata", d: "angry tomato sauce, as promised", p: "1299", spicy: true },
      { n: "Chef's Signature Italian Bake", d: "bubbling, baked, worth the wait", p: "1299" },
    ],
  },
  {
    id: "chicken",
    name: "Chicken",
    items: [
      { n: "Parmesan Chicken", d: "crumb-crusted, parmesan-dusted", p: "1799" },
      { n: "Tarragon Chicken", d: "creamy tarragon sauce, a proper plate", p: "1999" },
      { n: "Peri Peri Chicken", d: "flame-grilled, peri-peri heat", p: "1999", spicy: true },
      { n: "Blazing Chicken Joro", d: "the spicy one. yes, that spicy", p: "1499", spicy: true },
      { n: "Polo Chicken", d: "simple, elegant, chicken done right", p: "1299" },
      { n: "Morocan Chicken", d: "warm spices, slow-cooked character", p: "1999" },
    ],
  },
  {
    id: "steaks",
    name: "Beef Steaks",
    items: [
      { n: "The Maestro Undercut Steak", d: "the house favourite, cooked to order", p: "3099", chef: true },
      { n: "Chef's Signature Rib-Eye Steak", d: "marbled, seared, indulgent", p: "3499", chef: true },
    ],
  },
  {
    id: "seafood",
    name: "Seafood",
    items: [
      { n: "Fish and Chips", d: "crispy batter, chunky fries", p: "1499" },
      { n: "Grill Fish", d: "charred, herbed, flaky", p: "2899" },
    ],
  },
  {
    id: "pizza",
    name: "Pizza",
    items: [
      { n: "Chef's Special", d: "everything the kitchen loves, on one base", size: ["1799", "2199"], chef: true },
      { n: "Crown Crust", d: "cheese-stuffed crust, obviously", size: ["1599", "2199"] },
      { n: "Stuffed Crust", d: "the classic, done properly", size: ["1599", "2199"] },
      { n: "Cairo Kabab", d: "kebab-heavy, smoky, satisfying", size: ["1499", "2099"] },
      { n: "Margherita", d: "tomato, mozzarella, basil. enough said", size: ["1199", "1499"] },
      { n: "Emperor's Tikka", d: "tikka-marinated, charred edges", size: ["1599", "2199"], spicy: true },
      { n: "Tex-Mex Fajita", d: "peppers, spice, fiesta energy", size: ["1299", "1599"], spicy: true },
      { n: "Royal Feast Mughlai", d: "rich, creamy, properly royal", size: ["1599", "1899"] },
    ],
  },
  {
    id: "burgers",
    name: "Burgers",
    items: [
      { n: "Bistro Spicy Zinger Burger", d: "crispy, spicy, unapologetic", p: "649", spicy: true },
      { n: "Bistro Chicken Burger", d: "the reliable one", p: "799" },
      { n: "Deluxe Smash Beef Burger", d: "smash patty, melted cheese", p: "1299" },
      { n: "Smoky Beef Grill Burger", d: "char-grilled, smoky, beefy", p: "1199" },
    ],
  },
  {
    id: "bar",
    name: "The Bar",
    bar: true,
    groups: [
      {
        g: "Coffee",
        items: [
          ["Espresso", "480"], ["Americano", "540"], ["Cappuccino", "690"], ["Latte", "690"],
          ["Spanish Latte", "690"], ["Mocha", "990"], ["Flat White", "690"], ["Matcha", "790"],
          ["Build-your-own coffee", "990"],
        ],
      },
      {
        g: "Mojitos / Mocktails",
        items: [
          ["Mint Margarita", "490"], ["Peach Margarita", "590"], ["Strawberry Margarita", "690"],
          ["Pina Colada", "690"], ["Sky Blue Lagoon", "540"], ["Peach Mojito", "540"],
          ["Strawberry Mojito", "540"], ["Lemon Ice Tea", "540"], ["Peach Ice Tea", "540"],
        ],
      },
      {
        g: "Tea",
        items: [
          ["Black Tea", "290"], ["Doodh Patti", "340"], ["Green Tea", "240"],
        ],
      },
      {
        g: "Smoothies & Shakes",
        items: [
          ["C&C Special Shake", "790"], ["Oreo Shake", "690"], ["Nutella Shake", "740"],
          ["Banana & Dates Shake", "580"], ["Blueberry Smoothie", "590"], ["Mix Fruit Smoothie", "690"],
        ],
      },
    ],
  },
];

const FOOD_COUNT = CATS.filter((c) => !c.bar).reduce((a, c) => a + c.items.length, 0);
const BAR_COUNT = CATS.filter((c) => c.bar).reduce((a, c) => a + c.groups.reduce((x, g) => x + g.items.length, 0), 0);
const TOTAL_ITEMS = FOOD_COUNT + BAR_COUNT;

/* ------------------------------ pizza row (toggle) ------------------------------ */

function PizzaRow({ item }) {
  const [size, setSize] = useState(0); // 0 = Medium, 1 = Large
  const priceRef = useRef(null);
  const tweenRef = useRef(null);
  const label = item.spicy ? "spicy" : item.chef ? "chef" : "view";

  /* the price span is childless on purpose: React never rewrites its text,
     so the GSAP number-swap is the only writer (no flash on re-render). */
  useEffect(() => {
    if (priceRef.current && !tweenRef.current) priceRef.current.textContent = "Rs " + item.size[0];
    return () => tweenRef.current?.kill();
  }, []);

  const swap = (next) => {
    if (next === size) return;
    const el = priceRef.current;
    const to = parseInt(item.size[next], 10);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (el) el.textContent = "Rs " + to;
      setSize(next);
      return;
    }
    const from = parseInt(item.size[size], 10);
    const o = { v: from };
    tweenRef.current?.kill();
    tweenRef.current = gsap.to(o, {
      v: to,
      duration: 0.45,
      ease: "power2.out",
      onUpdate: () => {
        if (el) el.textContent = "Rs " + Math.round(o.v);
      },
      onComplete: () => {
        tweenRef.current = null;
      },
    });
    if (el) {
      gsap.fromTo(
        el,
        { y: 8, autoAlpha: 0.25 },
        { y: 0, autoAlpha: 1, duration: 0.35, ease: "power2.out", clearProps: "transform,opacity", overwrite: "auto" }
      );
    }
    setSize(next);
  };

  return (
    <div className={"ccm-row ccm-row-pizza" + (item.spicy ? " ccm-spicy" : "")} data-cursor={label}>
      <div className="ccm-row-main">
        <div className="ccm-row-line">
          <span className="ccm-name">
            {item.n}
            {item.spicy && <ChiliIcon />}
            {item.chef && <span className="ccm-chef">★</span>}
          </span>
          <span className="ccm-leader" aria-hidden="true" />
          <span className="ccm-price" ref={priceRef} />
        </div>
        <div className="ccm-row-sub">
          <div className="ccm-sizes">
            <button
              className={"ccm-size" + (size === 0 ? " ccm-on" : "")}
              onClick={() => swap(0)}
              data-cursor="toggle"
            >
              Medium
            </button>
            <button
              className={"ccm-size" + (size === 1 ? " ccm-on" : "")}
              onClick={() => swap(1)}
              data-cursor="toggle"
            >
              Large
            </button>
          </div>
          {item.d && <span className="ccm-desc">{item.d}</span>}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function CanvasCravingsMenu() {
  const rootRef = useRef(null);
  const curRef = useRef(null);
  const ringRef = useRef(null);
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const progRef = useRef(null);
  const barRef = useRef(null);
  const lenisRef = useRef(null);

  const goTo = (id) => {
    lenisRef.current?.scrollTo("#ccm-cat-" + id, { offset: -80, duration: 1.3 });
  };
  const handleTop = () => {
    lenisRef.current?.scrollTo(0, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
  };

  useEffect(() => {
    let alive = true;
    let onAnchor = null;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ---- Lenis smooth scroll, wired into GSAP's ticker (canonical setup) ---- */
      const lenis = new Lenis({ duration: 1.1 });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      lenis.scrollTo(0, { immediate: true });

      /* smooth in-page anchors; let router links (#/…) navigate natively */
      onAnchor = (e) => {
        const a = e.target.closest?.('a[href^="#"]');
        if (!a) return;
        const href = a.getAttribute("href");
        if (!href || href === "#" || href.startsWith("#/")) return;
        e.preventDefault();
        lenis.scrollTo(href, { offset: -20, duration: 1.4 });
      };
      document.addEventListener("click", onAnchor);

      /* ---- scroll-spy category nav (UI state — always on) ---- */
      const pills = gsap.utils.toArray(".ccm-pill");
      const setActive = (i) => pills.forEach((p, j) => p.classList.toggle("ccm-on", j === i));
      CATS.forEach((c, i) => {
        ScrollTrigger.create({
          trigger: "#ccm-cat-" + c.id,
          start: "top 130px",
          end: "bottom 130px",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
          onLeave: () => setActive(-1),
          onLeaveBack: () => setActive(-1),
        });
      });

      /* ------------------------------ full experience ------------------------------ */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* entrance: the whole page slides up from below (like the menu opening) */
        const rootEl = rootRef.current;
        if (rootEl) {
          gsap.set(rootEl, { y: window.innerHeight });
          gsap.to(rootEl, {
            y: 0,
            duration: 0.95,
            ease: "power4.out",
            delay: 0.05,
            onComplete: () => {
              rootEl.classList.add("ccm-in");
              gsap.set(rootEl, { clearProps: "transform" });
            },
          });
        }

        /* header reveal */
        gsap.from(".ccm-head > *", { y: 30, autoAlpha: 0, stagger: 0.08, duration: 0.7, ease: "power3.out", delay: 0.15 });
        gsap.from(".ccm-nav", { y: -18, autoAlpha: 0, duration: 0.6, ease: "power3.out", delay: 0.38 });

        /* custom cursor: instant dot + lerped ring with contextual labels */
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
          window.addEventListener("mousemove", () => gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 }), { once: true });
          document.addEventListener("mouseover", over);
          document.addEventListener("mouseout", out);
          cursorCleanup = () => {
            window.removeEventListener("mousemove", move);
            document.removeEventListener("mouseover", over);
            document.removeEventListener("mouseout", out);
          };
        }

        /* editorial row reveals per category */
        gsap.utils.toArray(".ccm-sec").forEach((sec) => {
          gsap.from(sec.querySelectorAll(".ccm-row, .ccm-bar-item, .ccm-bar-cat"), {
            y: 26,
            autoAlpha: 0,
            duration: 0.5,
            stagger: 0.035,
            ease: "power2.out",
            scrollTrigger: { trigger: sec, start: "top 78%" },
          });
        });

        /* scroll progress line along the left edge */
        gsap.fromTo(
          progRef.current,
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } }
        );

        /* sticky bottom order bar: appears past header, hides at the footer */
        /* CSS hides the bar with translateY(115%), which GSAP reads as px — so tween `y`
           with a measured offset rather than yPercent (yPercent would parse as 0 and no-op). */
        const barHiddenY = () => barRef.current.offsetHeight * 1.15;
        const showBar = () =>
          gsap.to(barRef.current, { y: 0, duration: 0.45, ease: "power3.out", overwrite: "auto" });
        const hideBar = () =>
          gsap.to(barRef.current, { y: barHiddenY(), duration: 0.4, ease: "power3.in", overwrite: "auto" });
        ScrollTrigger.create({ trigger: headerRef.current, start: "bottom top+=40", onEnter: showBar, onLeaveBack: hideBar });
        ScrollTrigger.create({ trigger: ".cc-footer", start: "top 88%", onEnter: hideBar, onLeaveBack: showBar });

        /* footer statement reveal */
        gsap.utils.toArray(".cc-footer .cc-el-in").forEach((line) => {
          gsap.fromTo(line, { yPercent: 120 }, { yPercent: 0, ease: "none",
            scrollTrigger: { trigger: ".cc-footer h2", start: "top 88%", end: "top 58%", scrub: 0.5 } });
        });
        gsap.from(".cc-foot-col", {
          y: 24,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cc-foot-grid", start: "top 92%" },
        });

        return () => cursorCleanup?.();
      });

      return () => mm.revert();
    }, rootRef);

    return () => {
      alive = false;
      if (onAnchor) document.removeEventListener("click", onAnchor);
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.ticker.lagSmoothing(0);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* ---------------------------------- render ---------------------------------- */

  return (
    <div className="ccm-root" ref={rootRef}>
      <svg className="ccm-grain" width="100%" height="100%" aria-hidden="true">
        <filter id="ccm-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ccm-noise)" />
      </svg>

      <div className="cc-cur" ref={curRef} />
      <div className="cc-cur-ring" ref={ringRef} />
      <div className="ccm-prog" ref={progRef} aria-hidden="true" />

      <header className="ccm-head" ref={headerRef}>
        <div className="ccm-top">
          <a className="ccm-mark" href="#/" data-cursor="view">C&amp;C</a>
          <a className="ccm-home" href="#/" data-cursor="view">Back to the café →</a>
        </div>
        <div className="ccm-wrap">
          <p className="ccm-eyebrow">The full spread</p>
          <h1 className="ccm-title">Everything on the table.</h1>
          <p className="ccm-meta">
            {TOTAL_ITEMS} items · {CATS.length} categories · Gulberg Greens, Islamabad
          </p>
        </div>
      </header>

      <nav className="ccm-nav" ref={navRef} aria-label="Menu categories">
        {CATS.map((c) => (
          <button key={c.id} className="ccm-pill" onClick={() => goTo(c.id)} data-cursor="view">
            {c.name}
          </button>
        ))}
      </nav>

      <main className="ccm-main">
        {CATS.map((c, i) => (
          <section
            key={c.id}
            id={"ccm-cat-" + c.id}
            className={"ccm-sec " + (i % 2 === 0 ? "ccm-cream" : "ccm-green")}
          >
            <div className="ccm-wrap">
              <div className="ccm-sec-head">
                <span className="ccm-dot" aria-hidden="true" />
                <h2 className="ccm-cat">{c.name}</h2>
                <span className="ccm-count">{c.bar ? BAR_COUNT : c.items.length} items</span>
              </div>

              {c.bar ? (
                <div className="ccm-bar-grid">
                  {c.groups.map((g) => (
                    <div className="ccm-bar-col" key={g.g}>
                      <h3 className="ccm-bar-cat">{g.g}</h3>
                      {g.items.map(([n, p]) => (
                        <div className="ccm-bar-item" key={n} data-cursor="view">
                          <span className="ccm-bar-name">{n}</span>
                          <span className="ccm-leader" aria-hidden="true" />
                          <span className="ccm-bar-price">Rs {p}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="ccm-rows">
                  {c.items.map((it) =>
                    it.size ? (
                      <PizzaRow key={it.n} item={it} />
                    ) : (
                      <div
                        className={"ccm-row" + (it.spicy ? " ccm-spicy" : "")}
                        key={it.n}
                        data-cursor={it.spicy ? "spicy" : it.chef ? "chef" : "view"}
                      >
                        <div className="ccm-row-main">
                          <div className="ccm-row-line">
                            <span className="ccm-name">
                              {it.n}
                              {it.spicy && <ChiliIcon />}
                              {it.chef && <span className="ccm-chef">★</span>}
                            </span>
                            <span className="ccm-leader" aria-hidden="true" />
                            <span className="ccm-price">
                              {it.dual ? "Rs " + it.p + " / Rs " + it.p2 : "Rs " + it.p}
                            </span>
                          </div>
                          <div className="ccm-row-sub">
                            {it.d && <span className="ccm-desc">{it.d}</span>}
                            {it.note && <span className="ccm-note">{it.note}</span>}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </section>
        ))}
      </main>

      <div className="ccm-bar" ref={barRef}>
        <span className="ccm-bar-note">Open till 12AM · Gulberg Greens</span>
        <div className="ccm-bar-actions">
          <a
            className="ccm-bar-btn ccm-bar-primary"
            href="https://www.foodpanda.pk/"
            target="_blank"
            rel="noreferrer"
            data-cursor="view"
          >
            Order on Foodpanda →
          </a>
          <a className="ccm-bar-btn ccm-bar-ghost" href="#visit" data-cursor="view">Reserve a table</a>
        </div>
      </div>

      <CcFooter onTop={handleTop} />
    </div>
  );
}
