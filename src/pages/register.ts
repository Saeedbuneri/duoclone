import { AppState } from '../state';
import { icons } from '../icons';

export function RegisterPage() {
  return {
    html: `
      <div class="register-page">
        <div class="login-header">
          <button class="back-btn" onclick="window.__router.navigate('/')">✕</button>
          <span></span>
          <button class="btn btn-white btn-sm" onclick="window.__router.navigate('/login')" style="min-width:auto;padding:10px 16px;font-size:13px">
            LOG IN
          </button>
        </div>
        <div class="login-content animate-in">
          <h2 class="login-title">Create your profile</h2>
          <form class="login-form" id="register-form">
            <div class="input-group">
              <input type="text" placeholder="Age" id="reg-age" required />
            </div>
            <div class="input-group">
              <input type="text" placeholder="Name (optional)" id="reg-name" autocomplete="name" />
            </div>
            <div class="input-group">
              <input type="email" placeholder="Email" id="reg-email" autocomplete="email" required />
            </div>
            <div class="input-group">
              <input type="password" placeholder="Password" id="reg-password" autocomplete="new-password" required />
              <button type="button" class="toggle-pw" onclick="togglePassword()">👁️</button>
            </div>
            <button type="submit" class="btn btn-green btn-full" style="margin-top:4px">CREATE ACCOUNT</button>
          </form>
          <div class="login-divider"><span>OR</span></div>
          <div class="social-buttons">
            <button class="social-btn" onclick="socialRegister('Facebook')">
              <span class="social-icon" style="width:24px;height:24px;display:inline-flex">${icons.facebook}</span> FACEBOOK
            </button>
            <button class="social-btn" onclick="socialRegister('Google')">
              <span class="social-icon" style="width:24px;height:24px;display:inline-flex">${icons.google}</span> GOOGLE
            </button>
          </div>
          <div class="login-footer">
            <p>By signing up, you agree to our <a href="#" onclick="event.preventDefault(); window.__router.navigate('/terms')">Terms</a> and <a href="#" onclick="event.preventDefault(); window.__router.navigate('/privacy')">Privacy Policy</a>.</p>
            <p style="margin-top:12px">Already have an account? <a href="#" onclick="event.preventDefault();window.__router.navigate('/login')" style="color:#1CB0F6;text-transform:uppercase">Log in</a></p>
          </div>
        </div>
      </div>
    `,
    init() {
      document.getElementById('register-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const ageInput = document.getElementById('reg-age') as HTMLInputElement;
        const emailInput = document.getElementById('reg-email') as HTMLInputElement;
        const passwordInput = document.getElementById('reg-password') as HTMLInputElement;

        if (!ageInput.value || !emailInput.value || !passwordInput.value) {
          (window as any).duoAlert('Please fill in all required fields.', '⚠️', 'OK', 'btn-red');
          return;
        }

        const name = (document.getElementById('reg-name') as HTMLInputElement).value || 'Learner';
        const email = emailInput.value;
        AppState.login(name, email);
        window.__router.navigate('/learn');
      });

      (window as any).togglePassword = () => {
        const pw = document.getElementById('reg-password') as HTMLInputElement;
        pw.type = pw.type === 'password' ? 'text' : 'password';
      };

      (window as any).socialRegister = (provider: string) => {
        AppState.login(`${provider} User`, `user@${provider.toLowerCase()}.com`);
        window.__router.navigate('/learn');
      };
    }
  };
}
