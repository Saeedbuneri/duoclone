import './style.css';
import '@lottiefiles/lottie-player';
import { animations } from './animations';
import { Router } from './router';
import { LandingPage } from './pages/landing';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { OnboardingPage } from './pages/onboarding';
import { LearnPage } from './pages/learn';
import { LessonPage } from './pages/lesson';
import { LeaderboardPage } from './pages/leaderboard';
import { ShopPage } from './pages/shop';
import { ProfilePage } from './pages/profile';
import { QuestsPage } from './pages/quests';
import { SettingsPage } from './pages/settings';
import { LessonCompletePage } from './pages/lessonComplete';
import { LettersPage } from './pages/letters';
import { SuperPage } from './pages/super';
import { AboutPage, BlogPage, StorePage, EfficacyPage, CareersPage, InvestorsPage, TermsPage, PrivacyPage } from './pages/info';
import { SectionsPage } from './pages/sections';
import { AppState } from './state';
import { playSound } from './audio';

// Initialize global state
AppState.init();
(window as any).AppState = AppState;

// Setup router
const router = new Router('#app');
router.addRoute('/', LandingPage);
router.addRoute('/login', LoginPage);
router.addRoute('/register', RegisterPage);
router.addRoute('/onboarding', OnboardingPage);
router.addRoute('/learn', LearnPage);
router.addRoute('/lesson', LessonPage);
router.addRoute('/lesson-complete', LessonCompletePage);
router.addRoute('/leaderboard', LeaderboardPage);
router.addRoute('/shop', ShopPage);
router.addRoute('/profile', ProfilePage);
router.addRoute('/quests', QuestsPage);
router.addRoute('/settings', SettingsPage);
router.addRoute('/letters', LettersPage);
router.addRoute('/super', SuperPage);
router.addRoute('/about', AboutPage);
router.addRoute('/blog', BlogPage);
router.addRoute('/store', StorePage);
router.addRoute('/efficacy', EfficacyPage);
router.addRoute('/careers', CareersPage);
router.addRoute('/investors', InvestorsPage);
router.addRoute('/terms', TermsPage);
router.addRoute('/privacy', PrivacyPage);
router.addRoute('/sections', SectionsPage);
router.start();

// Remove initial loader
const loader = document.getElementById('initial-loader');
if (loader) {
  loader.innerHTML = `
    <lottie-player src="${animations.logoAnimation}" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></lottie-player>
    <div style="font-family:'Nunito',sans-serif;font-size:32px;font-weight:800;color:#58CC02;letter-spacing:-0.5px;margin-top:-40px;">dicto</div>
  `;
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 400);
  }, 4000); // 4 seconds splash
}

// Expose router globally for navigation
(window as any).__router = router;

// Global Modals Logic
(window as any).showModal = (id: string) => {
  const container = document.getElementById('global-modals');
  if (!container) return;

  const s = AppState.user;
  let content = '';

  if (id === 'streak-modal') {
    content = `
      <div class="top-modal animate-in" style="animation-duration: 0.2s;">
        <h3 style="color:#FF9600; font-size: 24px;">🔥 ${s.streak} Day Streak!</h3>
        <p style="color:#AFAFAF; font-size:14px; margin-top:8px;">You're on fire! Practice tomorrow to keep it going.</p>
        <div style="display:flex; gap:10px; margin-top:20px;">
          <div style="flex:1; background:#F7F7F7; padding:10px; border-radius:12px; text-align:center;">
             <div style="font-weight:800; color:#4B4B4B;">MON</div>
             <div style="font-size:20px; color:#FF9600;">🔥</div>
          </div>
          <div style="flex:1; background:#F7F7F7; padding:10px; border-radius:12px; text-align:center;">
             <div style="font-weight:800; color:#4B4B4B;">TUE</div>
             <div style="font-size:20px; color:#FF9600;">🔥</div>
          </div>
          <div style="flex:1; background:#F7F7F7; padding:10px; border-radius:12px; text-align:center; border:2px solid #FF9600;">
             <div style="font-weight:800; color:#FF9600;">WED</div>
             <div style="font-size:20px; color:#FF9600;">🔥</div>
          </div>
        </div>
      </div>
    `;
  } else if (id === 'hearts-modal') {
    content = `
      <div class="top-modal animate-in" style="animation-duration: 0.2s;">
        <h3 style="color:#FF4B4B; font-size:24px; display:flex; align-items:center; gap:8px;">
          ♥️ ${s.isPremium ? 'Unlimited Hearts!' : s.hearts + ' Hearts'}
        </h3>
        <p style="color:#AFAFAF; font-size:14px; margin-top:8px;">
          ${s.isPremium ? 'You have Super Duolingo! Never worry about making mistakes.' : 'Hearts refill every 5 hours. Keep practicing!'}
        </p>
        <div style="margin-top:20px; display:flex; flex-direction:column; gap:10px;">
          ${!s.isPremium ? `
            <button class="btn btn-white btn-full" onclick="window.__router.navigate('/lesson'); document.getElementById('global-modals').innerHTML='';">PRACTICE TO EARN</button>
            <button class="btn btn-green btn-full" onclick="window.__router.navigate('/super'); document.getElementById('global-modals').innerHTML='';">GET UNLIMITED</button>
          ` : `
            <button class="btn btn-green btn-full" onclick="document.getElementById('global-modals').innerHTML=''">KEEP LEARNING</button>
          `}
        </div>
      </div>
    `;
  } else if (id === 'flag-modal') {
    content = `
      <div class="top-modal animate-in" style="animation-duration: 0.2s;">
        <h3 style="color:#4B4B4B; font-size:20px;">My Courses</h3>
        <div style="display:flex; align-items:center; gap:16px; margin-top:16px; padding:12px; border:2px solid #E5E5E5; border-radius:12px; background:#DDF4FF; border-color:#1CB0F6;">
           <span style="font-size:28px;">${s.languageFlag}</span>
           <span style="font-weight:800; color:#1CB0F6;">${s.language}</span>
        </div>
      </div>
     `;
  }

  container.innerHTML = `
    <div class="modal-backdrop" onclick="document.getElementById('global-modals').innerHTML=''"></div>
    ${content}
  `;
};

// ✅ Themed replacements for native browser dialogs
(window as any).duoAlert = (msg: string, icon = '📢', btnText = 'GOT IT', btnClass = 'btn-green') => {
  const container = document.getElementById('global-modals');
  if (!container) { alert(msg); return; }
  container.innerHTML = `
    <div class="modal-backdrop" onclick="document.getElementById('global-modals').innerHTML=''"></div>
    <div class="top-modal animate-in" style="animation-duration:0.2s;top:30%;right:auto;left:50%;transform:translateX(-50%);width:90%;max-width:420px;text-align:center;padding:32px 24px;">
      <div style="font-size:48px;margin-bottom:16px;">${icon}</div>
      <p style="font-size:16px;color:#4B4B4B;font-weight:700;line-height:1.6;margin-bottom:24px;">${msg}</p>
      <button class="btn ${btnClass} btn-full" onclick="document.getElementById('global-modals').innerHTML=''">${btnText}</button>
    </div>
  `;
};

(window as any).duoConfirm = (msg: string, onYes: () => void, icon = '❓', yesText = 'YES', noText = 'CANCEL') => {
  const container = document.getElementById('global-modals');
  if (!container) { if (confirm(msg)) onYes(); return; }
  const cbId = `__confirm_${Date.now()}`;
  (window as any)[cbId] = () => {
    container.innerHTML = '';
    delete (window as any)[cbId];
    onYes();
  };
  container.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="top-modal animate-in" style="animation-duration:0.2s;top:30%;right:auto;left:50%;transform:translateX(-50%);width:90%;max-width:420px;text-align:center;padding:32px 24px;">
      <div style="font-size:48px;margin-bottom:16px;">${icon}</div>
      <p style="font-size:16px;color:#4B4B4B;font-weight:700;line-height:1.6;margin-bottom:24px;">${msg}</p>
      <div style="display:flex;gap:12px;">
        <button class="btn btn-white btn-full" onclick="document.getElementById('global-modals').innerHTML=''">${noText}</button>
        <button class="btn btn-red btn-full" onclick="${cbId}()">${yesText}</button>
      </div>
    </div>
  `;
};

(window as any).duoPrompt = (msg: string, onSubmit: (val: string) => void, icon = '✏️', placeholder = 'Type here...') => {
  const container = document.getElementById('global-modals');
  if (!container) { const v = prompt(msg); if (v) onSubmit(v); return; }
  const cbId = `__prompt_${Date.now()}`;
  const inputId = `__promptInput_${Date.now()}`;
  (window as any)[cbId] = () => {
    const el = document.getElementById(inputId) as HTMLInputElement;
    const val = el?.value?.trim();
    if (!val) return;
    container.innerHTML = '';
    delete (window as any)[cbId];
    onSubmit(val);
  };
  container.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="top-modal animate-in" style="animation-duration:0.2s;top:30%;right:auto;left:50%;transform:translateX(-50%);width:90%;max-width:420px;padding:32px 24px;">
      <div style="font-size:40px;margin-bottom:12px;text-align:center;">${icon}</div>
      <p style="font-size:16px;color:#4B4B4B;font-weight:700;line-height:1.6;margin-bottom:16px;text-align:center;">${msg}</p>
      <input id="${inputId}" type="text" placeholder="${placeholder}"
        style="width:100%;padding:14px 16px;border:2px solid #E5E5E5;border-radius:12px;font-size:16px;font-weight:600;color:#4B4B4B;outline:none;margin-bottom:16px;box-sizing:border-box;"
        onfocus="this.style.borderColor='#1CB0F6'" onblur="this.style.borderColor='#E5E5E5'"
        onkeydown="if(event.key==='Enter') ${cbId}()" />
      <div style="display:flex;gap:12px;">
        <button class="btn btn-white btn-full" onclick="document.getElementById('global-modals').innerHTML=''">CANCEL</button>
        <button class="btn btn-green btn-full" onclick="${cbId}()">SUBMIT</button>
      </div>
    </div>
  `;
  setTimeout(() => (document.getElementById(inputId) as HTMLInputElement)?.focus(), 50);
};

// Global click effects
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  // Generic button/nav click sound
  const clickable = target.closest('button, .nav-item, a.btn');
  const isLessonOption = target.closest('.lesson-option, .word-chip'); // handled by lesson.ts explicitly
  const isCheckBtn = target.closest('#check-btn'); // handled by lesson.ts explicitly 
  if (clickable && !isLessonOption && !isCheckBtn) {
    playSound('click');
  }
});
