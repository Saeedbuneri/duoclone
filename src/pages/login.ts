import { AppState } from '../state';
import { icons } from '../icons';

export function LoginPage() {
  return {
    html: `
      <div class="login-page">
        <div class="login-header">
          <button class="back-btn" onclick="window.__router.navigate('/')">✕</button>
          <span></span>
          <button class="btn btn-white btn-sm" onclick="window.__router.navigate('/register')" style="min-width:auto;padding:10px 16px;font-size:13px">
            SIGN UP
          </button>
        </div>
        <div class="login-content animate-in">
          <h2 class="login-title">Log in</h2>
          <form class="login-form" id="login-form">
            <div class="input-group">
              <input type="email" placeholder="Email or username" id="login-email" autocomplete="email" value="user@duo.com" required />
            </div>
            <div class="input-group">
              <input type="password" placeholder="Password" id="login-password" autocomplete="current-password" value="pass123" required />
              <button type="button" class="toggle-pw" onclick="togglePassword()">👁️</button>
            </div>
            <a href="#" onclick="duoAlert('Password reset link sent to ' + (document.getElementById('login-email').value || 'your email') + '!', '📧', 'GOT IT')" style="font-size:14px;font-weight:700;color:#1CB0F6;text-transform:uppercase;align-self:flex-start">FORGOT PASSWORD?</a>
            <button type="submit" class="btn btn-green btn-full" style="margin-top:4px">LOG IN</button>
          </form>
          <div class="login-divider"><span>OR</span></div>
          <div class="social-buttons">
            <button class="social-btn" onclick="socialLogin('Facebook')">
              <span class="social-icon" style="width:24px;height:24px;display:inline-flex">${icons.facebook}</span> FACEBOOK
            </button>
            <button class="social-btn" onclick="socialLogin('Google')">
              <span class="social-icon" style="width:24px;height:24px;display:inline-flex">${icons.google}</span> GOOGLE
            </button>
          </div>
          <div class="login-footer">
            <p>By signing in to Duolingo, you agree to our <a href="#" onclick="event.preventDefault(); window.__router.navigate('/terms')">Terms</a> and <a href="#" onclick="event.preventDefault(); window.__router.navigate('/privacy')">Privacy Policy</a>.</p>
          </div>
        </div>
      </div>
    `,
    init() {
      document.getElementById('login-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('login-email') as HTMLInputElement;
        const passwordInput = document.getElementById('login-password') as HTMLInputElement;

        if (!emailInput.value || !passwordInput.value) {
          (window as any).duoAlert('Please fill in all fields.', '⚠️', 'OK', 'btn-red');
          return;
        }

        const email = emailInput.value;
        const name = email.split('@')[0] || 'Learner';
        AppState.login(name, email);
        window.__router.navigate('/learn');
      });

      (window as any).togglePassword = () => {
        const pw = document.getElementById('login-password') as HTMLInputElement;
        pw.type = pw.type === 'password' ? 'text' : 'password';
      };

      (window as any).socialLogin = (provider: string) => {
        AppState.login(`${provider} User`, `user@${provider.toLowerCase()}.com`);
        window.__router.navigate('/learn');
      };
    }
  };
}
