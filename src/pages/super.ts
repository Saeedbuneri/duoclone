import { AppLayout } from '../components';
import { AppState } from '../state';

export function SuperPage() {
  const isPremium = AppState.user.isPremium;

  const content = `
    <div class="shop-page">
      <div class="shop-header animate-in" style="justify-content:center;background:linear-gradient(135deg, #7B61FF, #CE82FF);color:white;padding:30px;border-radius:16px;margin-bottom:30px;text-align:center;">
        <h2>Super Duolingo</h2>
        <p style="font-size:16px;margin-top:8px;font-weight:700">Learn faster with no ads and unlimited hearts!</p>
      </div>

      ${isPremium ? `
        <div class="animate-in" style="text-align:center;padding:40px;">
          <h3 style="color:#7B61FF;font-size:24px;margin-bottom:10px">You are Super! 🌟</h3>
          <p style="font-size:16px;color:#AFAFAF;font-weight:700">Enjoy your unlimited hearts and ad-free experience.</p>
        </div>
      ` : `
        <div class="shop-section animate-in" style="animation-delay:0.05s">
          <h3>Super Benefits</h3>
          <div class="shop-item">
            <div class="item-icon">♾️</div>
            <div class="item-info">
              <h4>Unlimited Hearts</h4>
              <p>Never run out of hearts while learning</p>
            </div>
          </div>
          <div class="shop-item">
            <div class="item-icon">🚫</div>
            <div class="item-info">
              <h4>No Ads</h4>
              <p>Learn without interruptions</p>
            </div>
          </div>
          <div class="shop-item">
            <div class="item-icon">⚡</div>
            <div class="item-info">
              <h4>Unlimited Legendary</h4>
              <p>Prove your skills with Legendary levels</p>
            </div>
          </div>
          <div style="margin-top:30px;">
            <button class="btn btn-green btn-full" onclick="buySuper()" style="background:#7B61FF;border-bottom-color:#5E45D8;font-size:16px;padding:16px;">
              Get Super for free
            </button>
            <p style="text-align:center;color:#AFAFAF;font-size:13px;margin-top:12px;font-weight:700">Mock purchase - 100% free!</p>
          </div>
        </div>
      `}
    </div>
  `;

  return {
    html: AppLayout('super', content),
    init() {
      (window as any).buySuper = () => {
        AppState.update({ isPremium: true });
        (window as any).duoAlert('Welcome to Super Duolingo! 🌟 Enjoy unlimited hearts and no ads!', '🌟', 'AWESOME!', 'btn-green');
        setTimeout(() => window.__router.navigate('/super'), 1000);
      };
    }
  };
}
