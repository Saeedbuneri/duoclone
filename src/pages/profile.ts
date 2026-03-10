import { AppLayout, RightPanelWidgets } from '../components';
import { AppState } from '../state';
import { icons, flagIcons } from '../icons';

export function ProfilePage() {
  const s = AppState.user;
  const p = AppState.activeProgress;
  const achievements = [
    { icon: icons.streak, name: 'Wildfire', desc: 'Reach a 3 day streak', unlocked: s.streak >= 3 },
    { icon: icons.lightning, name: 'Sage', desc: 'Earn 100 XP', unlocked: p.xp >= 100 },
    { icon: icons.trophy, name: 'Champion', desc: 'Complete 5 lessons', unlocked: p.lessonsCompleted >= 5 },
    { icon: icons.questTarget, name: 'Sharpshooter', desc: 'No mistakes in a lesson', unlocked: false },
    { icon: icons.guidebook, name: 'Scholar', desc: 'Complete 50 lessons', unlocked: p.lessonsCompleted >= 50 },
    { icon: `<div style="width:24px;height:24px;margin:auto">${icons.gems}</div>`, name: 'Regal', desc: 'Earn 1000 gems', unlocked: s.gems >= 1000 },
    { icon: icons.starActive, name: 'Legendary', desc: 'Reach a 30 day streak', unlocked: s.streak >= 30 },
    { icon: icons.medalBronze, name: 'Overachiever', desc: 'Complete 100 lessons', unlocked: p.lessonsCompleted >= 100 },
    { icon: `<div style="width:28px;height:28px;margin:auto">${icons.duoLogo}</div>`, name: 'Wise Owl', desc: 'Learn 500 words', unlocked: false },
  ];

  const weeklyXP = [20, 35, 15, 40, 25, 30, p.xp % 50];
  const maxXP = Math.max(...weeklyXP, 1);
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const friends = [
    { name: 'Ahmed', color: '#FF9600', xp: 980 },
    { name: 'Sara', color: '#1CB0F6', xp: 840 },
    { name: 'Maria', color: '#CE82FF', xp: 750 },
    { name: 'Carlos', color: '#58CC02', xp: 620 },
    { name: 'Yuki', color: '#FF4B4B', xp: 540 },
  ];

  const content = `
    <div class="profile-page">
      <div class="profile-header-section animate-in">
        <div class="profile-big-avatar">${s.name.charAt(0).toUpperCase()}</div>
        <h2>${s.name}</h2>
        <p>@${s.name.toLowerCase().replace(/\s/g, '')}</p>
        <p class="profile-joined">Joined March 2026</p>
        <div class="profile-actions">
          <button class="btn btn-blue btn-sm" onclick="duoPrompt('Enter a username or email to add:', (f) => duoAlert('Friend request sent to ' + f + '!', '👋'), '👤', 'Username or email...')">ADD FRIENDS</button>
          <button class="btn btn-white btn-sm" onclick="window.__router.navigate('/settings')">EDIT PROFILE</button>
        </div>
      </div>

      <div class="profile-stats-row animate-in" style="animation-delay:0.05s">
        <div class="profile-stat">
          <div class="stat-num" style="color:#FF9600;display:flex;align-items:center;gap:4px">
            <div style="width:20px;height:20px">${icons.streak}</div> ${s.streak}
          </div>
          <div class="stat-label">Day Streak</div>
        </div>
        <div class="profile-stat">
          <div class="stat-num" style="color:#FFC800;display:flex;align-items:center;gap:4px">
            <div style="width:20px;height:20px;line-height:0">${icons.lightning}</div> ${p.xp}
          </div>
          <div class="stat-label">Total XP</div>
        </div>
        <div class="profile-stat">
          <div class="stat-num" style="color:#1CB0F6;display:flex;align-items:center;gap:4px">
            <div style="width:20px;height:20px">${icons.trophy}</div> ${s.league}
          </div>
          <div class="stat-label">League</div>
        </div>
        <div class="profile-stat">
          <div class="stat-num" style="color:#58CC02;display:flex;align-items:center;gap:4px">
            <div style="width:20px;height:20px">${icons.guidebook}</div> ${p.lessonsCompleted}
          </div>
          <div class="stat-label">Lessons</div>
        </div>
      </div>

      <div class="profile-section animate-in" style="animation-delay:0.1s">
        <h3>Currently Learning</h3>
        <div style="display:flex;align-items:center;gap:14px;padding:14px;border:2px solid #E5E5E5;border-radius:16px">
          <span style="width:36px;height:36px;display:flex;align-items:center;justify-content:center">${flagIcons[s.language] || s.languageFlag}</span>
          <div style="flex:1">
            <div style="font-weight:800;font-size:17px;color:#4B4B4B">${s.language}</div>
            <div style="font-size:13px;color:#AFAFAF;margin-top:2px">Level ${p.level} · ${p.xp} XP</div>
            <div style="height:10px;background:#E5E5E5;border-radius:5px;margin-top:6px;overflow:hidden">
              <div style="height:100%;width:${Math.min(100, (p.xp % 200) / 2)}%;background:#58CC02;border-radius:5px"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="profile-section animate-in" style="animation-delay:0.15s">
        <h3>Weekly XP</h3>
        <div style="display:flex;align-items:flex-end;gap:6px;height:120px;padding:10px 0">
          ${weeklyXP.map((xp, i) => `
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
              <div style="font-size:11px;font-weight:700;color:#AFAFAF">${xp}</div>
              <div style="width:100%;height:${Math.max(8, (xp / maxXP) * 80)}px;background:${i === 6 ? '#58CC02' : '#E5E5E5'};border-radius:6px;transition:all 0.5s ease"></div>
              <div style="font-size:12px;font-weight:800;color:${i === 6 ? '#58CC02' : '#AFAFAF'}">${days[i]}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="profile-section animate-in" style="animation-delay:0.2s">
        <h3>Achievements</h3>
        <div class="achievement-grid">
          ${achievements.map(a => `
            <div class="achievement-card ${a.unlocked ? '' : 'locked'}">
              <div class="ach-icon">${a.icon}</div>
              <div class="ach-name">${a.name}</div>
              <div class="ach-desc">${a.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="profile-section animate-in" style="animation-delay:0.25s">
        <h3>Friends (${friends.length})</h3>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${friends.map(f => `
            <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #F7F7F7">
              <div style="width:40px;height:40px;border-radius:50%;background:${f.color};display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:15px">${f.name.charAt(0)}</div>
              <div style="flex:1">
                <div style="font-size:15px;font-weight:700;color:#4B4B4B">${f.name}</div>
                <div style="font-size:12px;color:#AFAFAF">${f.xp} XP this week</div>
              </div>
            </div>
          `).join('')}
          <button class="btn btn-white btn-full btn-sm" style="margin-top:8px" onclick="duoConfirm('Sync contacts from your address book?', () => duoAlert('No new contacts found using Duolingo.', '👥'), '🔍', 'SYNC', 'CANCEL')">FIND FRIENDS</button>
        </div>
      </div>
    </div>
  `;
  return { html: AppLayout('profile', content, RightPanelWidgets()) };
}
