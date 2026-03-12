import { AppState } from '../state';

export function LandingPage() {
  return {
    html: `
      <div class="landing-page" id="landing-root">

        <!-- ===== HEADER ===== -->
        <header class="landing-header">
          <div class="landing-header-inner">
            <div class="landing-logo" onclick="window.__router.navigate('/learn')" style="cursor:pointer">
              <img src="/duo-icon.svg" alt="Dicto" style="width:40px;height:40px;"/>
              <span class="landing-logo-text">dicto</span>
            </div>
            <nav class="landing-header-nav">
              <button class="btn-landing-outline" onclick="window.__router.navigate('/login')">LOG IN</button>
              <button class="btn-landing-signup" onclick="window.__router.navigate('/register')">GET STARTED</button>
            </nav>
          </div>
        </header>

        <!-- ===== HERO SECTION ===== -->
        <section class="landing-hero">
          <div class="landing-hero-inner">
            <div class="landing-hero-image-wrapper">
              <div class="landing-earth-bg">
                <svg viewBox="0 0 200 200" class="earth-svg" xmlns="http://www.w3.org/2000/svg">
                  <!-- Ocean -->
                  <circle cx="100" cy="100" r="95" fill="#1CB0F6" />
                  <!-- Continents (Stylized) -->
                  <path d="M 40 40 Q 60 20 80 50 T 120 40 Q 140 30 150 60 T 180 80 Q 190 100 170 120 T 140 160 Q 120 180 90 170 T 40 140 Q 20 120 30 90 T 40 40 Z" fill="#58CC02" />
                  <!-- Cloud 1 -->
                  <path d="M 30 70 Q 40 60 50 70 Q 60 60 70 70 Q 80 80 60 90 Q 40 90 30 70 Z" fill="white" opacity="0.8" />
                  <!-- Cloud 2 -->
                  <path d="M 140 120 Q 150 110 160 120 Q 170 110 180 120 Q 190 130 170 140 Q 150 140 140 120 Z" fill="white" opacity="0.8" />
                </svg>
              </div>
              <img src="/duo-icon.svg" alt="Duo mascot" class="landing-hero-owl" />
              <div class="landing-hero-characters">
                <div class="character-blob blob-1">
                  <img src="https://hatscripts.github.io/circle-flags/flags/es.svg" width="32" height="32" alt=""/>
                </div>
                <div class="character-blob blob-2" style="background: #FF9600; color: white;">A</div>
                <div class="character-blob blob-3">
                  <img src="https://hatscripts.github.io/circle-flags/flags/jp.svg" width="32" height="32" alt=""/>
                </div>
                <div class="character-blob blob-4" style="background: #1CB0F6; color: white;">あ</div>
                <div class="character-blob blob-5" style="background: #CE82FF; color: white;">?</div>
              </div>
            </div>
            <div class="landing-hero-text">
              <h1 class="landing-tagline">The free, fun, and effective way to learn a language!</h1>
              <div class="landing-buttons">
                <button class="btn btn-green btn-lg landing-cta" onclick="window.__router.navigate('/onboarding')">GET STARTED</button>
                <button class="btn btn-white btn-lg landing-cta" onclick="window.__router.navigate('/login')">I ALREADY HAVE AN ACCOUNT</button>
              </div>
            </div>
          </div>
        </section>

        <!-- ===== LANGUAGE TABS ===== -->
        <section class="landing-lang-tabs">
          <div class="landing-lang-tabs-inner">
            <button class="lang-tab-btn active" data-lang="english" onclick="setActiveLangTab(this, 'english')">
              <img src="https://hatscripts.github.io/circle-flags/flags/us.svg" onerror="this.style.display='none'" width="24" height="24" alt="English"/>
              ENGLISH
            </button>
            <button class="lang-tab-btn" data-lang="spanish" onclick="setActiveLangTab(this, 'spanish')">
              <img src="https://hatscripts.github.io/circle-flags/flags/es.svg" onerror="this.style.display='none'" width="24" height="24" alt="Spanish"/>
              SPANISH
            </button>
            <button class="lang-tab-btn" data-lang="french" onclick="setActiveLangTab(this, 'french')">
              <img src="https://hatscripts.github.io/circle-flags/flags/fr.svg" onerror="this.style.display='none'" width="24" height="24" alt="French"/>
              FRENCH
            </button>
            <button class="lang-tab-btn" data-lang="german" onclick="setActiveLangTab(this, 'german')">
              <img src="https://hatscripts.github.io/circle-flags/flags/de.svg" onerror="this.style.display='none'" width="24" height="24" alt="German"/>
              GERMAN
            </button>
            <button class="lang-tab-btn" data-lang="italian" onclick="setActiveLangTab(this, 'italian')">
              <img src="https://hatscripts.github.io/circle-flags/flags/it.svg" onerror="this.style.display='none'" width="24" height="24" alt="Italian"/>
              ITALIAN
            </button>
            <button class="lang-tab-btn" data-lang="portuguese" onclick="setActiveLangTab(this, 'portuguese')">
              <img src="https://hatscripts.github.io/circle-flags/flags/pt.svg" onerror="this.style.display='none'" width="24" height="24" alt="Portuguese"/>
              PORTUGUESE
            </button>
            <button class="lang-tab-btn" data-lang="japanese" onclick="setActiveLangTab(this, 'japanese')">
              <img src="https://hatscripts.github.io/circle-flags/flags/jp.svg" onerror="this.style.display='none'" width="24" height="24" alt="Japanese"/>
              JAPANESE
            </button>
            <button class="lang-tab-btn" data-lang="korean" onclick="setActiveLangTab(this, 'korean')">
              <img src="https://hatscripts.github.io/circle-flags/flags/kr.svg" onerror="this.style.display='none'" width="24" height="24" alt="Korean"/>
              KOREAN
            </button>
          </div>
        </section>

        <!-- ===== FEATURE SECTIONS ===== -->
        <section class="landing-features">

          <!-- Feature 1: Free, fun, effective -->
          <div class="landing-feature">
            <div class="landing-feature-text">
              <h2 class="landing-feature-title">free. fun. effective.</h2>
              <p class="landing-feature-desc">Learning with Dicto is fun, and <a href="#" style="color:#58CC02;font-weight:700">research shows that it works!</a> With quick, bite-sized lessons, you'll earn points and unlock new levels while gaining real-world communication skills.</p>
            </div>
            <div class="landing-feature-img">
              <div class="landing-feature-illustration feature-illust-1">
                <div class="illust-phone">
                  <div class="illust-phone-screen">
                    <div class="phone-lesson-header">
                      <div style="width:60%;height:8px;background:#E5E5E5;border-radius:4px;overflow:hidden"><div style="width:40%;height:100%;background:#58CC02;border-radius:4px"></div></div>
                      <span style="font-size:11px;color:#FF4B4B;font-weight:800">❤️ 5</span>
                    </div>
                    <div style="text-align:center;padding:10px 0 6px">
                      <div style="font-size:11px;font-weight:800;color:#CE82FF">NEW WORD: BASICS</div>
                      <div style="font-size:13px;font-weight:800;color:#4B4B4B;margin-top:4px">Which is "coffee"?</div>
                    </div>
                    <div class="phone-lesson-options">
                      <div class="phone-option correct-glow">☕</div>
                      <div class="phone-option">👧</div>
                      <div class="phone-option">🍞</div>
                      <div class="phone-option">👦</div>
                    </div>
                    <div class="phone-check-btn">CHECK</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Feature 2: Backed by science -->
          <div class="landing-feature landing-feature-reverse">
            <div class="landing-feature-img">
              <div class="landing-feature-illustration feature-illust-2">
                <div class="science-cards">
                  <div class="science-card">
                    <span style="font-size:24px">📊</span>
                    <div style="font-size:11px;font-weight:800;color:#4B4B4B">Students outperform<br/>university courses</div>
                  </div>
                  <div class="science-card science-card-blue">
                    <span style="font-size:24px">🧠</span>
                    <div style="font-size:11px;font-weight:800;color:#1CB0F6">Spaced repetition<br/>learning system</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="landing-feature-text">
              <h2 class="landing-feature-title">backed by science.</h2>
              <p class="landing-feature-desc">We use a combination of research-backed teaching methods and delightful content to create courses that effectively teach reading, writing, listening, and speaking skills!</p>
            </div>
          </div>

          <!-- Feature 3: Stay motivated -->
          <div class="landing-feature">
            <div class="landing-feature-text">
              <h2 class="landing-feature-title">stay motivated.</h2>
              <p class="landing-feature-desc">We make it easy to form a habit of language learning with game-like features, fun challenges, and reminders from our friendly mascot, Duo the owl.</p>
            </div>
            <div class="landing-feature-img">
              <div class="landing-feature-illustration feature-illust-3">
                <div class="motivation-cards">
                  <div class="mcard mcard-streak">
                    <span style="font-size:28px">🔥</span>
                    <div style="font-weight:800;font-size:14px;color:#4B4B4B">7 day streak!</div>
                    <div style="font-size:11px;color:#AFAFAF;margin-top:2px">Keep it going!</div>
                  </div>
                  <div class="mcard mcard-xp">
                    <span style="font-size:24px">⭐</span>
                    <div style="font-weight:800;font-size:14px;color:#FFD900">+10 XP</div>
                    <div style="font-size:11px;color:#AFAFAF;margin-top:2px">Lesson complete</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Feature 4: Personalized learning -->
          <div class="landing-feature landing-feature-reverse">
            <div class="landing-feature-img">
              <div class="landing-feature-illustration feature-illust-4">
                <div class="personalized-cards">
                  <div class="pcard">🎯 Adaptive difficulty</div>
                  <div class="pcard pcard-blue">🤖 AI-powered lessons</div>
                  <div class="pcard pcard-orange">📈 Track your progress</div>
                </div>
              </div>
            </div>
            <div class="landing-feature-text">
              <h2 class="landing-feature-title">personalized learning.</h2>
              <p class="landing-feature-desc">Combining the best of AI and language science, lessons are tailored to help you learn at just the right level and pace.</p>
            </div>
          </div>
        </section>

        <!-- ===== APP DOWNLOAD SECTION ===== -->
        <section class="landing-app-section">
          <div class="landing-app-inner">
            <h2 class="landing-app-title">learn anytime, anywhere</h2>
            <div class="landing-app-buttons">
              <button class="app-store-btn" onclick="duoAlert('Redirecting to App Store...', '🍎', 'AWESOME')">
                <span style="font-size:22px">🍎</span>
                <div style="text-align:left">
                  <div style="font-size:10px;font-weight:600">Download on the</div>
                  <div style="font-size:15px;font-weight:800">App Store</div>
                </div>
              </button>
              <button class="app-store-btn" onclick="duoAlert('Redirecting to Google Play...', '📱', 'AWESOME')">
                <span style="font-size:22px">▶️</span>
                <div style="text-align:left">
                  <div style="font-size:10px;font-weight:600">Get it on</div>
                  <div style="font-size:15px;font-weight:800">Google Play</div>
                </div>
              </button>
            </div>
            <div class="landing-app-mockups">
              <div class="app-mockup-phone app-mockup-1">
                <div class="mockup-screen">
                  <div style="display:flex;align-items:center;gap:6px;padding:8px;border-bottom:1px solid #E5E5E5">
                    <img src="/duo-icon.svg" width="20" height="20" alt=""/>
                    <span style="font-weight:800;font-size:11px;color:#58CC02">dicto</span>
                  </div>
                  <div class="mockup-path">
                    <div class="mockup-node active-node">⭐</div>
                    <div class="mockup-connector"></div>
                    <div class="mockup-node locked-node">⭐</div>
                  </div>
                </div>
              </div>
              <div class="app-mockup-phone app-mockup-2">
                <div class="mockup-screen">
                  <div style="padding:10px;text-align:center">
                    <div style="font-size:10px;font-weight:800;color:#CE82FF;margin-bottom:4px">¿Qué es "coffee"?</div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-top:8px">
                      <div style="background:#58CC02;border-radius:8px;padding:6px;text-align:center;font-size:16px">☕</div>
                      <div style="background:#E5E5E5;border-radius:8px;padding:6px;text-align:center;font-size:16px">👦</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ===== FOOTER ===== -->
        <footer class="landing-footer">
          <div class="footer-container">
            <div class="footer-top">
              <div class="footer-logo">
                <img src="/duo-icon.svg" alt="Dicto" width="32" height="32"/>
                <span style="font-size:20px;font-weight:800;color:#58CC02;letter-spacing:-0.5px">dicto</span>
              </div>
            </div>
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
                  <li><a href="#" onclick="window.__router.navigate('/login')">Dicto</a></li>
                  <li><a href="#" onclick="window.__router.navigate('/login')">Dicto for Schools</a></li>
                  <li><a href="#" onclick="window.__router.navigate('/login')">English Test</a></li>
                  <li><a href="#" onclick="window.__router.navigate('/super')">Super Dicto</a></li>
                  <li><a href="#" onclick="window.__router.navigate('/super')">Dicto Max</a></li>
                </ul>
              </div>
              <div class="footer-col">
                <h3>Apps</h3>
                <ul>
                  <li><a href="#" onclick="duoAlert('Redirecting to Google Play Store...', '📱', 'OK')">Dicto for Android</a></li>
                  <li><a href="#" onclick="duoAlert('Redirecting to App Store...', '🍎', 'OK')">Dicto for iOS</a></li>
                </ul>
              </div>
              <div class="footer-col">
                <h3>Help & Support</h3>
                <ul>
                  <li><a href="#" onclick="duoAlert('Help center is currently under maintenance.', '🛠️', 'OK')">Dicto FAQs</a></li>
                  <li><a href="#" onclick="duoAlert('Help center is currently under maintenance.', '🛠️', 'OK')">Schools FAQs</a></li>
                  <li><a href="#" onclick="duoAlert('Status: All Systems Operational', '🟢', 'OK')">Status</a></li>
                </ul>
              </div>
              <div class="footer-col">
                <h3>Privacy & Terms</h3>
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
                  <li><a href="#" onclick="duoAlert('Redirecting to Twitter...', '🐦', 'OK')">Twitter/X</a></li>
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
                <li><a href="#">Türkçe</a></li>
                <li><a href="#">中文</a></li>
              </ul>
            </div>

            <div class="footer-bottom">
              <p style="color:#AFAFAF;font-size:12px;text-align:center">© 2025 Dicto. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    `,
    init() {
      if (AppState.user.isLoggedIn) {
        window.__router.navigate('/learn');
        return;
      }

      // Simple language tab switcher
      (window as any).setActiveLangTab = (el: HTMLElement, lang: string) => {
        document.querySelectorAll('.lang-tab-btn').forEach(b => b.classList.remove('active'));
        el.classList.add('active');
        console.log('selected lang tab:', lang);
      };
    }
  };
}
