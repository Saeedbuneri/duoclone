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
    { id: 'settings', icon: icons.more, label: 'MORE', path: '/settings' },
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
      </nav>
    </aside>
  `;
}

export function TopStats() {
  const s = AppState.user;
  const flag = flagIcons[s.language] || icons.flag_globe;
  return `
    <div class="top-stats">
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
