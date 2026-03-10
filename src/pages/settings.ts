import { AppLayout } from '../components';
import { AppState } from '../state';

export function SettingsPage() {
  const s = AppState.user;
  const content = `
    <div class="settings-page">
      <div class="settings-header animate-in">
        <h2>Settings</h2>
      </div>
      <div class="settings-section animate-in" style="animation-delay:0.05s">
        <h3>Account</h3>
        <div class="setting-row">
          <span class="setting-label">Name</span>
          <span class="setting-value">${s.name}</span>
        </div>
        <div class="setting-row">
          <span class="setting-label">Email</span>
          <span class="setting-value">${s.email || 'Not set'}</span>
        </div>
        <div class="setting-row">
          <span class="setting-label">Language</span>
          <span class="setting-value">${s.languageFlag} ${s.language}</span>
        </div>
      </div>
      <div class="settings-section animate-in" style="animation-delay:0.1s">
        <h3>Learning</h3>
        <div class="setting-row">
          <span class="setting-label">Daily Goal</span>
          <span class="setting-value">${s.dailyGoal} min/day</span>
        </div>
        <div class="setting-row">
          <span class="setting-label">Sound Effects</span>
          <div class="toggle-switch on" onclick="this.classList.toggle('on')"></div>
        </div>
        <div class="setting-row">
          <span class="setting-label">Listening Exercises</span>
          <div class="toggle-switch on" onclick="this.classList.toggle('on')"></div>
        </div>
        <div class="setting-row">
          <span class="setting-label">Speaking Exercises</span>
          <div class="toggle-switch on" onclick="this.classList.toggle('on')"></div>
        </div>
        <div class="setting-row">
          <span class="setting-label">Animations</span>
          <div class="toggle-switch on" onclick="this.classList.toggle('on')"></div>
        </div>
        <div class="setting-row">
          <span class="setting-label">Motivational Messages</span>
          <div class="toggle-switch on" onclick="this.classList.toggle('on')"></div>
        </div>
      </div>
      <div class="settings-section animate-in" style="animation-delay:0.15s">
        <h3>Notifications</h3>
        <div class="setting-row">
          <span class="setting-label">Practice Reminders</span>
          <div class="toggle-switch on" onclick="this.classList.toggle('on')"></div>
        </div>
        <div class="setting-row">
          <span class="setting-label">Leaderboard Updates</span>
          <div class="toggle-switch" onclick="this.classList.toggle('on')"></div>
        </div>
        <div class="setting-row">
          <span class="setting-label">Friend Activity</span>
          <div class="toggle-switch on" onclick="this.classList.toggle('on')"></div>
        </div>
      </div>
      <div class="settings-section animate-in" style="animation-delay:0.2s">
        <h3>Privacy</h3>
        <div class="setting-row">
          <span class="setting-label">Make my profile public</span>
          <div class="toggle-switch on" onclick="this.classList.toggle('on')"></div>
        </div>
        <div class="setting-row">
          <span class="setting-label">Show on Leaderboards</span>
          <div class="toggle-switch on" onclick="this.classList.toggle('on')"></div>
        </div>
      </div>
      <div class="settings-section animate-in" style="animation-delay:0.25s">
        <button class="btn btn-white btn-full" style="color:#FF4B4B;margin-bottom:12px" 
                onclick="duoConfirm('Log out of your account?', () => window.logoutUser(), '🚶', 'LOG OUT', 'CANCEL')">LOG OUT</button>
        <button class="btn btn-white btn-full" style="color:#FF4B4B;opacity:0.6" 
                onclick="duoConfirm('Delete your account? This cannot be undone.', () => window.logoutUser(true), '⚠️', 'DELETE', 'CANCEL')">DELETE ACCOUNT</button>
      </div>
    </div>
  `;
  return {
    html: AppLayout('settings', content),
    init() {
      (window as any).logoutUser = (purge = false) => {
        if (purge) {
          AppState.reset();
        } else {
          AppState.logout();
        }
        window.__router.navigate('/');
      };
    }
  };
}
