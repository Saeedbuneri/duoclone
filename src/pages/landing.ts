import { AppState } from '../state';
import { icons } from '../icons';

export function LandingPage() {
  return {
    html: `
      <div class="landing-page">
        <div class="landing-header">
          <div class="landing-logo">
            ${icons.duolingoTextLogo}
          </div>
        </div>
        <div class="landing-hero animate-in">
          <div class="landing-characters">
            <img src="/duo-icon.svg" alt="Duo Owl" style="width: 200px; height: auto;" />
          </div>
          <h1 class="landing-tagline">The free, fun, and effective way to learn a language!</h1>
          <div class="landing-buttons">
            <button class="btn btn-green btn-lg" onclick="window.__router.navigate('/onboarding')">GET STARTED</button>
            <button class="btn btn-white btn-lg" onclick="window.__router.navigate('/login')">I ALREADY HAVE AN ACCOUNT</button>
          </div>
          </div>
          </div>
        </div>

        <footer class="landing-footer">
          <div class="footer-container">
            <div class="footer-row">
              <div class="footer-col">
                <h3>About us</h3>
                <ul>
                  <li><a href="#" onclick="window.__router.navigate('/about')">Courses</a></li>
                  <li><a href="#" onclick="window.__router.navigate('/about')">Mission</a></li>
                  <li><a href="#" onclick="window.__router.navigate('/about')">Approach</a></li>
                  <li><a href="#" onclick="window.__router.navigate('/efficacy')">Efficacy</a></li>
                  <li><a href="#" onclick="window.__router.navigate('/careers')">Careers</a></li>
                  <li><a href="#" onclick="window.__router.navigate('/investors')">Investors</a></li>
                </ul>
              </div>
              <div class="footer-col">
                <h3>Products</h3>
                <ul>
                  <li><a href="#" onclick="window.__router.navigate('/login')">Duolingo</a></li>
                  <li><a href="#" onclick="window.__router.navigate('/login')">Duolingo for Schools</a></li>
                  <li><a href="#" onclick="window.__router.navigate('/login')">Duolingo English Test</a></li>
                  <li><a href="#" onclick="window.__router.navigate('/super')">Super Duolingo</a></li>
                  <li><a href="#" onclick="window.__router.navigate('/super')">Duolingo Max</a></li>
                </ul>
              </div>
              <div class="footer-col">
                <h3>Apps</h3>
                <ul>
                  <li><a href="#" onclick="duoAlert('Redirecting to Google Play Store...', '📱', 'OK')">Duolingo for Android</a></li>
                  <li><a href="#" onclick="duoAlert('Redirecting to App Store...', '🍎', 'OK')">Duolingo for iOS</a></li>
                </ul>
              </div>
              <div class="footer-col">
                <h3>Help and support</h3>
                <ul>
                  <li><a href="#" onclick="duoAlert('Help center is currently under maintenance.', '🛠️', 'OK')">Duolingo FAQs</a></li>
                  <li><a href="#" onclick="duoAlert('Help center is currently under maintenance.', '🛠️', 'OK')">Schools FAQs</a></li>
                  <li><a href="#" onclick="duoAlert('Status: All Systems Operational', '🟢', 'OK')">Status</a></li>
                </ul>
              </div>
              <div class="footer-col">
                <h3>Privacy and terms</h3>
                <ul>
                  <li><a href="#" onclick="window.__router.navigate('/terms')">Community guidelines</a></li>
                  <li><a href="#" onclick="window.__router.navigate('/terms')">Terms</a></li>
                  <li><a href="#" onclick="window.__router.navigate('/privacy')">Privacy</a></li>
                  <li><a href="#" onclick="window.__router.navigate('/privacy')">Do Not Sell My Info</a></li>
                </ul>
              </div>
              <div class="footer-col">
                <h3>Social</h3>
                <ul>
                  <li><a href="#" onclick="window.__router.navigate('/blog')">Blog</a></li>
                  <li><a href="#" onclick="duoAlert('Redirecting to Instagram...', '📸', 'OK')">Instagram</a></li>
                  <li><a href="#" onclick="duoAlert('Redirecting to TikTok...', '🎵', 'OK')">TikTok</a></li>
                  <li><a href="#" onclick="duoAlert('Redirecting to Twitter...', '🐦', 'OK')">Twitter</a></li>
                  <li><a href="#" onclick="duoAlert('Redirecting to YouTube...', '▶️', 'OK')">YouTube</a></li>
                </ul>
              </div>
            </div>
            
            <div class="footer-languages">
              <h3>Site language</h3>
              <ul class="lang-list">
                <li><a href="#">العربية</a></li>
                <li><a href="#">বাংলা</a></li>
                <li><a href="#">Čeština</a></li>
                <li><a href="#">Deutsch</a></li>
                <li><a href="#">Ελληνικά</a></li>
                <li><a href="#" style="font-weight: 800; color: #4B4B4B;">English</a></li>
                <li><a href="#">Español</a></li>
                <li><a href="#">Français</a></li>
                <li><a href="#">हिंदी</a></li>
                <li><a href="#">Magyar</a></li>
                <li><a href="#">Bahasa Indonesia</a></li>
                <li><a href="#">Italiano</a></li>
                <li><a href="#">日本語</a></li>
                <li><a href="#">한국어</a></li>
                <li><a href="#">Nederlands</a></li>
                <li><a href="#">Polski</a></li>
                <li><a href="#">Português</a></li>
                <li><a href="#">Română</a></li>
                <li><a href="#">Русский</a></li>
                <li><a href="#">svenska</a></li>
                <li><a href="#">தமிழ்</a></li>
                <li><a href="#">తెలుగు</a></li>
                <li><a href="#">ภาษาไทย</a></li>
                <li><a href="#">Tagalog</a></li>
                <li><a href="#">Türkçe</a></li>
                <li><a href="#">Українською</a></li>
                <li><a href="#">Tiếng Việt</a></li>
                <li><a href="#">中文</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    `,
    init() {
      if (AppState.user.isLoggedIn) {
        window.__router.navigate('/learn');
      }
    }
  };
}
