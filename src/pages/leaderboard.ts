import { AppLayout, RightPanelWidgets } from '../components';
import { AppState } from '../state';
import { icons } from '../icons';



export function LeaderboardPage() {
  const leaderboardData = [
    { name: 'Ahmed K.', xp: 1240, color: '#FF9600', detail: 'Level 12' },
    { name: 'Sara M.', xp: 1180, color: '#1CB0F6', detail: 'Level 11' },
    { name: 'Carlos R.', xp: 980, color: '#CE82FF', detail: 'Level 9' },
    { name: 'Priya S.', xp: 920, color: '#FF4B4B', detail: 'Level 9' },
    { name: 'Marco L.', xp: 870, color: '#FFC800', detail: 'Level 8' },
    { name: 'You', xp: AppState.activeProgress.xp, color: '#58CC02', isMe: true, detail: `Level ${AppState.activeProgress.level}` },
    { name: 'Yuki T.', xp: 690, color: '#1CB0F6', detail: 'Level 7' },
    { name: 'Elena V.', xp: 640, color: '#CE82FF', detail: 'Level 6' },
    { name: 'Omar B.', xp: 590, color: '#FF9600', detail: 'Level 6' },
    { name: 'Lisa W.', xp: 520, color: '#58CC02', detail: 'Level 5' },
    { name: 'Raj P.', xp: 480, color: '#FF4B4B', detail: 'Level 5' },
    { name: 'Anna S.', xp: 420, color: '#1CB0F6', detail: 'Level 4' },
    { name: 'James H.', xp: 380, color: '#FFC800', detail: 'Level 4' },
    { name: 'Kim J.', xp: 310, color: '#CE82FF', detail: 'Level 3' },
    { name: 'Ali Z.', xp: 250, color: '#FF9600', detail: 'Level 3' },
    { name: 'Fatima R.', xp: 210, color: '#FF4B4B', detail: 'Level 2' },
    { name: 'Chen L.', xp: 180, color: '#58CC02', detail: 'Level 2' },
    { name: 'Sophie T.', xp: 140, color: '#1CB0F6', detail: 'Level 1' },
    { name: 'David K.', xp: 90, color: '#CE82FF', detail: 'Level 1' },
    { name: 'Rosa M.', xp: 45, color: '#FFC800', detail: 'Level 1' },
  ];

  const sorted = [...leaderboardData].sort((a, b) => b.xp - a.xp);
  const content = `
    <div class="leaderboard-page">
      <div class="league-header animate-in">
        <div class="league-icon" style="line-height:0">${icons.medalBronze}</div>
        <h2>Bronze League</h2>
        <p>Top 10 advance to the Silver League</p>
      </div>
      <div class="league-tabs">
        <div class="league-tab active" id="tab-week" onclick="switchTab('week')">This Week</div>
        <div class="league-tab" id="tab-all" onclick="switchTab('all')">All Time</div>
      </div>
      <div class="league-promotion animate-in" style="animation-delay:0.05s">
        <span>${icons.rankUp}</span>
        <span>Top 10 advance to the next league</span>
      </div>
      <div class="league-list" id="league-list">
        ${sorted.map((u, i) => `
          <div class="league-item ${u.isMe ? 'me' : ''} animate-in" style="animation-delay:${i * 0.025}s">
            <span class="rank ${i === 0 ? 'top-1' : ''} ${i === 1 ? 'top-2' : ''} ${i === 2 ? 'top-3' : ''}">${i + 1}</span>
            <div class="user-avatar" style="background:${u.color}">${u.name.charAt(0)}</div>
            <div class="user-info">
              <div class="user-name">${u.name}${u.isMe ? ' (you)' : ''}</div>
              <div class="user-detail">${u.detail}</div>
            </div>
            <span class="user-xp">${u.xp} XP</span>
          </div>
          ${i === 9 ? `<div class="league-demotion animate-in"><span>${icons.rankDown}</span><span>Bottom 5 get demoted</span></div>` : ''}
        `).join('')}
      </div>
    </div>
  `;
  return {
    html: AppLayout('leaderboard', content, RightPanelWidgets()),
    init() {
      (window as any).switchTab = (tab: string) => {
        document.querySelectorAll('.league-tab').forEach(t => t.classList.remove('active'));
        document.getElementById(`tab-${tab}`)?.classList.add('active');
      };
    }
  };
}
