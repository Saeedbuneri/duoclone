import { AppLayout, RightPanelWidgets } from '../components';
import { AppState } from '../state';
import { icons } from '../icons';

export function QuestsPage() {
  const s = AppState.user;
  const p = AppState.activeProgress;
  const content = `
    <div class="quests-page">
      <div class="quests-header animate-in">
        <h2>Daily Quests</h2>
        <p>Complete quests to earn bonus XP and gems!</p>
        <div class="quests-timer">⏰ Resets in 14h 23m</div>
      </div>
      <div class="quests-list">
        <div class="quest-card animate-in" style="animation-delay:0.05s">
          <div class="qc-icon">${icons.lightning}</div>
          <div class="qc-info">
            <h4>Earn 10 XP</h4>
            <div class="qc-progress">
              <div class="qc-bar"><div class="qc-bar-fill" style="width:${Math.min(100, (p.xp % 10) * 10)}%;background:#FFC800"></div></div>
              <span>${Math.min(p.xp % 10, 10)}/10 XP</span>
            </div>
          </div>
          <div class="qc-reward" style="line-height:0">${icons.chest}</div>
        </div>
        <div class="quest-card animate-in" style="animation-delay:0.1s">
          <div class="qc-icon">${icons.questTarget}</div>
          <div class="qc-info">
            <h4>Complete 3 lessons</h4>
            <div class="qc-progress">
              <div class="qc-bar"><div class="qc-bar-fill" style="width:${Math.min(100, (p.lessonsCompleted % 3) * 33)}%;background:#1CB0F6"></div></div>
              <span>${p.lessonsCompleted % 3}/3</span>
            </div>
          </div>
          <div class="qc-reward" style="line-height:0">${icons.chest}</div>
        </div>
        <div class="quest-card animate-in" style="animation-delay:0.15s">
          <div class="qc-icon">${icons.streak}</div>
          <div class="qc-info">
            <h4>Get a perfect lesson</h4>
            <div class="qc-progress">
              <div class="qc-bar"><div class="qc-bar-fill" style="width:0%;background:#FF9600"></div></div>
              <span>0/1</span>
            </div>
          </div>
          <div class="qc-reward" style="color:#1CB0F6;line-height:0;gap:4px">
             <div style="width:20px;height:20px">${icons.gems}</div> 20
          </div>
        </div>
        <div class="quest-card animate-in" style="animation-delay:0.2s">
          <div class="qc-icon">${icons.questTimer}</div>
          <div class="qc-info">
            <h4>Practice for 10 minutes</h4>
            <div class="qc-progress">
              <div class="qc-bar"><div class="qc-bar-fill" style="width:60%;background:#CE82FF"></div></div>
              <span>6/10 min</span>
            </div>
          </div>
          <div class="qc-reward" style="line-height:0">${icons.chest}</div>
        </div>
        <div class="quest-card animate-in" style="animation-delay:0.25s">
          <div class="qc-icon">${icons.questList}</div>
          <div class="qc-info">
            <h4>Get 5 answers correct in a row</h4>
            <div class="qc-progress">
              <div class="qc-bar"><div class="qc-bar-fill" style="width:40%;background:#58CC02"></div></div>
              <span>2/5</span>
            </div>
          </div>
          <div class="qc-reward" style="color:#1CB0F6;line-height:0;gap:4px">
             <div style="width:20px;height:20px">${icons.gems}</div> 25
          </div>
        </div>
        <div class="quest-card animate-in" style="animation-delay:0.3s">
          <div class="qc-icon">${icons.questStar}</div>
          <div class="qc-info">
            <h4>Earn 50 XP today</h4>
            <div class="qc-progress">
              <div class="qc-bar"><div class="qc-bar-fill" style="width:${Math.min(100, (p.xp % 50) * 2)}%;background:#FFC800"></div></div>
              <span>${Math.min(p.xp % 50, 50)}/50 XP</span>
            </div>
          </div>
          <div class="qc-reward" style="color:#1CB0F6;line-height:0;gap:4px">
             <div style="width:20px;height:20px">${icons.gems}</div> 30
          </div>
        </div>
      </div>

      <div style="padding:0 20px 10px">
        <h3 style="font-size:20px;font-weight:800;color:#4B4B4B;margin-bottom:4px">Friends Quest</h3>
        <p style="font-size:14px;color:#AFAFAF;margin-bottom:14px">Team up with friends to earn bonus rewards!</p>
      </div>
      <div style="padding:0 20px 20px">
        <div class="quest-card animate-in" style="animation-delay:0.35s;border-color:#1CB0F6">
          <div class="qc-icon" style="background:#DDF4FF">${icons.friendsQuest}</div>
          <div class="qc-info">
            <h4>Complete 5 lessons together</h4>
            <div class="qc-progress">
              <div class="qc-bar"><div class="qc-bar-fill" style="width:20%;background:#1CB0F6"></div></div>
              <span>1/5</span>
            </div>
          </div>
          <div class="qc-reward" style="background:#DDF4FF;color:#1CB0F6;line-height:0;gap:4px">
             <div style="width:20px;height:20px">${icons.gems}</div> 50
          </div>
        </div>
        <div class="quest-card animate-in" style="animation-delay:0.4s;border-color:#CE82FF">
          <div class="qc-icon" style="background:#F0DBFF">${icons.medalBronze}</div>
          <div class="qc-info">
            <h4>Beat a friend's weekly XP</h4>
            <div class="qc-progress">
              <div class="qc-bar"><div class="qc-bar-fill" style="width:65%;background:#CE82FF"></div></div>
              <span>120/185 XP</span>
            </div>
          </div>
          <div class="qc-reward" style="background:#F0DBFF;color:#CE82FF;line-height:0;gap:4px">
             <div style="width:20px;height:20px">${icons.gems}</div> 40
          </div>
        </div>
      </div>

      <div style="padding:0 20px 10px">
        <h3 style="font-size:20px;font-weight:800;color:#4B4B4B;margin-bottom:4px">Monthly Challenge</h3>
        <p style="font-size:14px;color:#AFAFAF;margin-bottom:14px">March 2026</p>
      </div>
      <div style="padding:0 20px 20px">
        <div class="quest-card animate-in" style="animation-delay:0.45s;border-color:#FF9600">
          <div class="qc-icon" style="background:#FFF0D6">${icons.calendar}</div>
          <div class="qc-info">
            <h4>Complete 30 days learning streak</h4>
            <div class="qc-progress">
              <div class="qc-bar"><div class="qc-bar-fill" style="width:${(s.streak / 30) * 100}%;background:#FF9600"></div></div>
              <span>${s.streak}/30 days</span>
            </div>
          </div>
          <div class="qc-reward" style="background:#FFF0D6;color:#FF9600;line-height:0;gap:4px">
             <div style="width:20px;height:20px">${icons.gems}</div> 100
          </div>
        </div>
      </div>
    </div>
  `;
  return { html: AppLayout('quests', content, RightPanelWidgets()) };
}
