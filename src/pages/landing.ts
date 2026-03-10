import { AppState } from '../state';
import { icons } from '../icons';

export function LandingPage() {
  return {
    html: `
      <div class="landing-page">
        <div class="landing-header">
          <div class="landing-logo">
            ${icons.duolingoTextLogo}
          </div>
        </div>
        <div class="landing-hero animate-in">
          <div class="landing-characters">
            <img src="/duo-icon.svg" alt="Duo Owl" style="width: 200px; height: auto;" />
          </div>
          <h1 class="landing-tagline">The free, fun, and effective way to learn a language!</h1>
          <div class="landing-buttons">
            <button class="btn btn-green btn-lg" onclick="window.__router.navigate('/onboarding')">GET STARTED</button>
            <button class="btn btn-white btn-lg" onclick="window.__router.navigate('/login')">I ALREADY HAVE AN ACCOUNT</button>
          </div>
          </div>
        </div>
      </div>
    `,
    init() {
      if (AppState.user.isLoggedIn) {
        window.__router.navigate('/learn');
      }
    }
  };
}
