export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-title">Project Blueprint</div>
          <div className="footer-text">
            Fan-made wiki for Balatro. Not affiliated with Playstack or LocalThunk.
          </div>
        </div>

        <div className="footer-section">
          <div className="footer-title">Balatro</div>
          <div className="footer-text">
            Developed by <a href="https://twitter.com/localThunk" target="_blank" rel="noopener noreferrer">LocalThunk</a>
          </div>
          <div className="footer-text">
            Published by <a href="https://playstack.com" target="_blank" rel="noopener noreferrer">Playstack</a>
          </div>
          <div className="footer-text">
            <a href="https://store.steampowered.com/app/2379780/Balatro/" target="_blank" rel="noopener noreferrer">Buy on Steam</a>
          </div>
        </div>

        <div className="footer-section">
          <div className="footer-title">Social Media</div>
          <div className="footer-text">
            <a href="https://twitter.com/Playstack" target="_blank" rel="noopener noreferrer">Playstack on Twitter</a>
          </div>
          <div className="footer-text">
            <a href="https://twitter.com/localThunk" target="_blank" rel="noopener noreferrer">LocalThunk on Twitter</a>
          </div>
          <div className="footer-text">
            <a href="https://discord.gg/balatro" target="_blank" rel="noopener noreferrer">Balatro Discord</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        All assets and trademarks are property of their respective owners.
      </div>
    </footer>
  );
}
