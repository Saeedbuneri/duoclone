import { AppState } from './state';
import { icons, flagIcons } from './icons';

export const DuoOwl = `<img src="/duo-icon.svg" alt="Duo Owl" style="width: 200px; height: auto; transform: scale(1.1);" />`;

export const DuoSmall = `<img src="/duo-icon.svg" alt="Duo Small" style="width: 80px; height: auto;" />`;

export const DuoMascotPath = `<img src="/duo-icon.svg" alt="Duo Path" style="width: 100px; height: auto;" />`;

export function Sidebar(activePage: string) {
  const navItems = [
    { id: 'learn', icon: icons.learn, label: 'LEARN', path: '/learn' },
    { id: 'letters', icon: icons.letters, label: 'LETTERS', path: '/letters' },
    { id: 'leaderboard', icon: icons.leaderboard, label: 'LEADERBOARDS', path: '/leaderboard' },
    { id: 'quests', icon: icons.quests, label: 'QUESTS', path: '/quests' },
    { id: 'shop', icon: icons.shop, label: 'SHOP', path: '/shop' },
    { id: 'profile', icon: icons.profile, label: 'PROFILE', path: '/profile' },
  ];

  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-logo" onclick="window.__router.navigate('/learn')">
        ${icons.duolingoTextLogo}
      </div>
      <nav class="sidebar-nav">
        ${navItems.map(item => `
          <div class="nav-item ${activePage === item.id ? 'active' : ''}" 
               onclick="window.__router.navigate('${item.path}')" id="nav-${item.id}">
            <span class="nav-icon">${item.icon}</span>
            <span class="nav-text" style="font-weight: 800; font-size: 15px;">${item.label}</span>
          </div>
        `).join('')}
        
        <!-- MORE Dropdown -->
        <div style="position: relative;" id="sidebar-more-container">
          <div class="nav-item ${activePage === 'settings' ? 'active' : ''}" 
               onclick="document.getElementById('more-popover').classList.toggle('show');" id="nav-more">
            <span class="nav-icon">${icons.more}</span>
            <span class="nav-text" style="font-weight: 800; font-size: 15px;">MORE</span>
          </div>
          
          <div id="more-popover" style="position: absolute; bottom: 0; left: 100%; margin-left: -10px; background: white; border: 2px solid #E5E5E5; border-radius: 16px; padding: 12px; width: 280px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 200; display: none; flex-direction: column; gap: 4px;">
            <button onclick="window.__router.navigate('/about')" style="text-align: left; background: none; border: none; padding: 12px 16px; font-size: 15px; font-weight: 800; color: #777; border-radius: 12px; cursor: pointer; transition: background 0.1s; display: flex; align-items: center; gap: 12px;" onmouseover="this.style.background='#F7F7F7'" onmouseout="this.style.background='none'">
              <div style="font-size: 20px;">🎒</div>
              SCHOOLS
            </button>
            <button onclick="window.__router.navigate('/settings')" style="text-align: left; background: none; border: none; padding: 12px 16px; font-size: 15px; font-weight: 800; color: #777; border-radius: 12px; cursor: pointer; transition: background 0.1s; display: flex; align-items: center; gap: 12px;" onmouseover="this.style.background='#F7F7F7'" onmouseout="this.style.background='none'">
              <div style="font-size: 20px;">⚙️</div>
              SETTINGS
            </button>
            <button onclick="window.__router.navigate('/profile')" style="text-align: left; background: none; border: none; padding: 12px 16px; font-size: 15px; font-weight: 800; color: #777; border-radius: 12px; cursor: pointer; transition: background 0.1s; display: flex; align-items: center; gap: 12px;" onmouseover="this.style.background='#F7F7F7'" onmouseout="this.style.background='none'">
              <div style="font-size: 20px;">❓</div>
              HELP
            </button>
            <hr style="border: none; border-top: 2px solid #E5E5E5; margin: 4px 0;" />
            <button onclick="window.AppState.logout(); window.__router.navigate('/');" style="text-align: left; background: none; border: none; padding: 12px 16px; font-size: 15px; font-weight: 800; color: #FF4B4B; border-radius: 12px; cursor: pointer; transition: background 0.1s; display: flex; align-items: center; gap: 12px;" onmouseover="this.style.background='#FFDFDF'" onmouseout="this.style.background='none'">
              <div style="font-size: 20px;">🚪</div>
              LOGOUT
            </button>
          </div>
          
          <style>
            #more-popover.show {
              display: flex !important;
            }
          </style>
          
          <script>
            // Close popover when clicking outside
            document.addEventListener('click', function(e) {
              const container = document.getElementById('sidebar-more-container');
              const popover = document.getElementById('more-popover');
              if (container && popover && !container.contains(e.target) && popover.classList.contains('show')) {
                popover.classList.remove('show');
              }
            });
          </script>
        </div>
      </nav>
    </aside>
  `;
}

export function TopStats() {
  const s = AppState.user;
  const flag = flagIcons[s.language] || icons.flag_globe;
  return `
    <div class="top-stats" id="main-top-bar">
      <div class="stat-item flag" title="${s.language}" onclick="window.showModal('flag-modal')">
        <span class="stat-icon">${flag}</span>
      </div>
      <div class="stat-item streak" title="${s.streak} day streak" onclick="window.showModal('streak-modal')">
        <span class="stat-icon">${icons.streak}</span>
        <span class="stat-value">${s.streak}</span>
      </div>
      <div class="stat-item gems" title="${s.gems} gems" onclick="window.__router.navigate('/shop')">
        <span class="stat-icon">${icons.gems}</span>
        <span class="stat-value">${s.gems}</span>
      </div>
      <div class="stat-item hearts" title="${s.isPremium ? 'Unlimited' : s.hearts} hearts" onclick="window.showModal('hearts-modal')">
        <span class="stat-icon">${icons.heart}</span>
        <span class="stat-value" style="${s.isPremium ? 'color:#1CB0F6;' : ''}">${s.isPremium ? '∞' : s.hearts}</span>
      </div>
    </div>
  `;
}

export function AppLayout(activePage: string, content: string, rightPanel: string = '') {
  return `
    <div class="app-layout">
      ${Sidebar(activePage)}
      <div class="main-content">
        <div class="content-split">
          <div class="content-area">
            ${content}
          </div>
          ${rightPanel ? `<div class="right-panel">${rightPanel}</div>` : ''}
        </div>
      </div>
    </div>
    <div id="global-modals"></div>
  `;
}

export function RightPanelWidgets() {
  const p = AppState.activeProgress;
  return `
    ${TopStats()}
    <div class="widget animate-in" style="animation-delay:0.05s">
      <h3 style="margin-bottom:10px">Unlock Leaderboards!</h3>
      <div class="lb-widget-item">
        <span class="lb-shield">${icons.shield}</span>
        <p>Complete 10 more lessons to start competing</p>
      </div>
    </div>

    <div class="widget daily-quests animate-in" style="animation-delay:0.1s">
      <div class="widget-header">
        <h3>Daily Quests</h3>
        <a onclick="window.__router.navigate('/quests')">VIEW ALL</a>
      </div>
      <div class="quest-item">
        <div class="quest-icon">${icons.lightning}</div>
        <div class="quest-info">
          <div class="quest-name">Earn 10 XP</div>
          <div class="quest-progress">
            <div class="quest-bar"><div class="quest-bar-fill" style="width:${Math.min(100, (p.xp % 10) * 10)}%;background:#FFC800"></div></div>
            <span>${Math.min(p.xp % 10, 10)} / 10</span>
          </div>
        </div>
        <div class="quest-reward" style="line-height:0">${icons.chest}</div>
      </div>
    </div>

    ${!AppState.user.isLoggedIn ? `
    <div class="cta-widget animate-in" style="animation-delay:0.15s">
      <h3>Create a profile to save your progress!</h3>
      <button class="btn btn-green btn-full" onclick="window.__router.navigate('/register')">CREATE A PROFILE</button>
      <button class="btn btn-blue btn-full" onclick="window.__router.navigate('/login')">SIGN IN</button>
    </div>` : ''}

    ${AppState.user.isLoggedIn && !AppState.user.isPremium ? `
    <div class="widget super-widget animate-in" style="animation-delay:0.15s; border: none; padding: 0; display: block; overflow: hidden; border-radius: 16px;">
      <div style="background: linear-gradient(135deg, rgba(137, 226, 25, 0.1), rgba(88, 204, 2, 0.1)); padding: 20px; border: 2px solid #E5E5E5; border-radius: 16px; border-bottom-width: 4px; display: flex; flex-direction: column; gap: 12px; cursor: pointer; transition: transform 0.1s;" onclick="window.__router.navigate('/super')">
        <div style="display: flex; gap: 12px; align-items: center;">
          <img src="/duo-icon.svg" style="width: 40px; height: 40px;" alt="Super Duo" />
          <div>
            <h3 style="font-size: 16px; font-weight: 800; color: #4B4B4B; margin-bottom: 2px;">Try Super for $0</h3>
            <p style="font-size: 14px; font-weight: 600; color: #777;">No ads, personalized practice, and unlimited hearts!</p>
          </div>
        </div>
        <button class="btn btn-green btn-full" style="padding: 10px; font-size: 14px;">TRY 2 WEEKS FREE</button>
      </div>
    </div>` : ''}

    <div class="app-footer animate-in" style="animation-delay:0.2s">
      <a href="#" onclick="event.preventDefault(); window.__router.navigate('/about')">ABOUT</a>
      <a href="#" onclick="event.preventDefault(); window.__router.navigate('/blog')">BLOG</a>
      <a href="#" onclick="event.preventDefault(); window.__router.navigate('/store')">STORE</a>
      <a href="#" onclick="event.preventDefault(); window.__router.navigate('/efficacy')">EFFICACY</a>
      <a href="#" onclick="event.preventDefault(); window.__router.navigate('/careers')">CAREERS</a>
      <a href="#" onclick="event.preventDefault(); window.__router.navigate('/investors')">INVESTORS</a>
      <a href="#" onclick="event.preventDefault(); window.__router.navigate('/terms')">TERMS</a>
      <a href="#" onclick="event.preventDefault(); window.__router.navigate('/privacy')">PRIVACY</a>
    </div>
  `;
}
