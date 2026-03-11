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
          <input type="text" id="setting-name" value="${s.name}" style="text-align:right; border:none; background:transparent; font-size:17px; font-weight:700; color:#4B4B4B; outline:none; max-width: 150px;" />
        </div>
        <div class="setting-row">
          <span class="setting-label">Email</span>
          <input type="email" id="setting-email" value="${s.email}" style="text-align:right; border:none; background:transparent; font-size:17px; font-weight:700; color:#4B4B4B; outline:none; max-width: 150px;" />
        </div>
        <div class="setting-row">
          <span class="setting-label">Language</span>
          <select id="setting-language" style="text-align:right; border:none; background:transparent; font-size:17px; font-weight:700; color:#4B4B4B; outline:none; cursor:pointer;" dir="rtl">
            ${['Spanish', 'French', 'German', 'Japanese', 'Korean', 'Italian', 'Chinese', 'Portuguese', 'Russian', 'Turkish', 'Dutch', 'Hindi', 'Arabic', 'Swedish'].map(lang =>
    `<option value="${lang}" ${s.language === lang ? 'selected' : ''}>${lang}</option>`
  ).join('')}
          </select>
        </div>
        <button class="btn btn-blue btn-full" style="margin-top:10px" onclick="window.saveAccountSettings()">SAVE ACCOUNT SETTINGS</button>
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
      (window as any).saveAccountSettings = () => {
        const newName = (document.getElementById('setting-name') as HTMLInputElement).value;
        const newEmail = (document.getElementById('setting-email') as HTMLInputElement).value;
        const newLang = (document.getElementById('setting-language') as HTMLSelectElement).value;

        const langData: Record<string, string> = {
          'Spanish': '🇪🇸', 'French': '🇫🇷', 'German': '🇩🇪', 'Japanese': '🇯🇵',
          'Korean': '🇰🇷', 'Italian': '🇮🇹', 'Chinese': '🇨🇳', 'Portuguese': '🇵🇹',
          'Russian': '🇷🇺', 'Turkish': '🇹🇷', 'Dutch': '🇳🇱', 'Hindi': '🇮🇳',
          'Arabic': '🇸🇦', 'Swedish': '🇸🇪'
        };

        AppState.update({
          name: newName,
          email: newEmail,
          language: newLang,
          languageFlag: langData[newLang] || '🌍',
          isLoggedIn: true // If they saved profile info, consider them a registered user
        });

        (window as any).duoAlert('Your account settings have been successfully updated!', '✅', 'AWESOME');
        // Refresh to show changes immediately
        setTimeout(() => window.__router.navigate('/settings'), 100);
      };

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
