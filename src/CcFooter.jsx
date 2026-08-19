import "./CcFooter.css";

/**
 * Shared site footer — used by both the homepage and the menu page.
 */
export default function CcFooter({ onTop }) {
  return (
    <footer className="cc-footer" id="visit">
      {/* large background C&C mark */}
      {/* <img className="cc-foot-bg-mark" src="/logo.png" alt="" aria-hidden="true" /> */}

      <div className="cc-wrap">
        {/* main brand area */}
        <div className="cc-foot-top">
          <div className="cc-foot-brand">
            <img className="cc-foot-logo" src="/logo.png" alt="Canvas & Cravings" />
            <span className="cc-foot-tagline">Eat • Paint • Repeat</span>
          </div>
        </div>

        {/* 4-column grid */}
        <div className="cc-foot-grid">
          <div className="cc-foot-col">
            <h5>Navigation</h5>
            <a href="#/" data-cursor="view">Home</a>
            <a href="#/" data-cursor="view">The Ritual</a>
            <a href="#/menu" data-cursor="view">Menu</a>
            <a href="#/" data-cursor="view">The Walls</a>
            <a href="#/" data-cursor="view">From Our Canvas</a>
          </div>
          <div className="cc-foot-col">
            <h5>Contact</h5>
            <a href="https://maps.google.com/?q=Gulberg%20Greens%20Islamabad" target="_blank" rel="noopener noreferrer" data-cursor="view">Gulberg Greens, Islamabad</a>
            <a href="tel:+923001234567" data-cursor="view">+92 300 123 4567</a>
            <a href="mailto:hello@canvasncravings.com" data-cursor="view">hello@canvasncravings.com</a>
          </div>
          <div className="cc-foot-col">
            <h5>Social</h5>
            <a href="https://www.instagram.com/canvasncravings/?hl=en" target="_blank" rel="noopener noreferrer" data-cursor="view">Instagram</a>
            <a href="#" data-cursor="view">Facebook</a>
          </div>
          <div className="cc-foot-col">
            <h5>Hours</h5>
            <a href="#" data-cursor="view">Open till 12AM</a>
            <a href="#" data-cursor="view">Reservations open</a>
            <a href="#" data-cursor="view">Walk-ins welcome</a>
          </div>
        </div>

        {/* bottom bar */}
        <div className="cc-foot-bar">
          <span className="cc-foot-copy">© Canvas & Cravings</span>
          <span className="cc-foot-made">Made with good food & creative energy.</span>
          <button className="cc-top" onClick={onTop} data-cursor="view">Back to top ↑</button>
        </div>
      </div>

      {/* orange brush line at bottom */}
      <div className="cc-foot-brush-line"></div>
    </footer>
  );
}
