import { AppLayout, RightPanelWidgets } from '../components';
import { AppState } from '../state';
import { icons } from '../icons';

export function ShopPage() {
  const s = AppState.user;
  const content = `
    <div class="shop-page">
      <div class="shop-header animate-in">
        <h2>Shop</h2>
        <div class="shop-gems" style="display:flex;align-items:center;gap:6px">
          <div style="width:24px;height:24px;line-height:0">${icons.gems}</div>
          <span>${s.gems}</span>
        </div>
      </div>

      <div class="shop-section animate-in" style="animation-delay:0.05s">
        <h3>Hearts</h3>
        <div class="shop-item">
          <div class="item-icon">❤️</div>
          <div class="item-info">
            <h4>Heart Refill</h4>
            <p>Refill your hearts so you can keep practicing without waiting</p>
          </div>
          <button class="item-price" onclick="buyItem('hearts', 350)" style="display:flex;align-items:center;gap:4px;justify-content:center">
            <div style="width:16px;height:16px;line-height:0">${icons.gems}</div> 350
          </button>
        </div>
        <div class="shop-item">
          <div class="item-icon">♾️</div>
          <div class="item-info">
            <h4>Unlimited Hearts</h4>
            <p>Get unlimited hearts for 24 hours</p>
          </div>
          <button class="item-price" onclick="buyItem('unlimited', 450)" style="display:flex;align-items:center;gap:4px;justify-content:center">
            <div style="width:16px;height:16px;line-height:0">${icons.gems}</div> 450
          </button>
        </div>
      </div>

      <div class="shop-section animate-in" style="animation-delay:0.1s">
        <h3>Power-Ups</h3>
        <div class="shop-item">
          <div class="item-icon">❄️</div>
          <div class="item-info">
            <h4>Streak Freeze</h4>
            <p>Streak Freeze allows your streak to remain in place for one full day of inactivity (${s.items?.streakFreeze || 0}/2)</p>
          </div>
          ${(s.items?.streakFreeze || 0) >= 2 
            ? `<div class="item-price" style="background: none; border: none; color: #AFAFAF; cursor: default;">MAXED OUT</div>`
            : `<button class="item-price" onclick="buyItem('freeze', 200)" style="display:flex;align-items:center;gap:4px;justify-content:center">
                 <div style="width:16px;height:16px;line-height:0">${icons.gems}</div> 200
               </button>`}
        </div>
        <div class="shop-item">
          <div class="item-icon">⏱️</div>
          <div class="item-info">
            <h4>Double or Nothing</h4>
            <p>Attempt to double a 50 Gem wager by maintaining a 7 day streak</p>
          </div>
          ${s.items?.doubleOrNothing 
            ? `<div class="item-price" style="background: none; border: none; color: #1CB0F6; cursor: default; box-shadow: none;">ACTIVE</div>`
            : `<button class="item-price" onclick="buyItem('double', 50)" style="display:flex;align-items:center;gap:4px;justify-content:center">
                 <div style="width:16px;height:16px;line-height:0">${icons.gems}</div> 50
               </button>`}
        </div>
        <div class="shop-item">
          <div class="item-icon">⚡</div>
          <div class="item-info">
            <h4>XP Boost</h4>
            <p>Earn double XP for the next 15 minutes</p>
          </div>
          <button class="item-price" onclick="buyItem('xpboost', 100)" style="display:flex;align-items:center;gap:4px;justify-content:center">
            <div style="width:16px;height:16px;line-height:0">${icons.gems}</div> 100
          </button>
        </div>
        <div class="shop-item">
          <div class="item-icon">🔮</div>
          <div class="item-info">
            <h4>Streak Repair</h4>
            <p>Restore your streak after losing it</p>
          </div>
          <button class="item-price" onclick="buyItem('repair', 500)" style="display:flex;align-items:center;gap:4px;justify-content:center">
            <div style="width:16px;height:16px;line-height:0">${icons.gems}</div> 500
          </button>
        </div>
      </div>

      <div class="shop-section animate-in" style="animation-delay:0.15s">
        <h3>Outfits for Duo</h3>
        <div class="shop-item">
          <div class="item-icon">🎩</div>
          <div class="item-info">
            <h4>Formal Attire</h4>
            <p>A classy look for your owl friend</p>
          </div>
          <button class="item-price" onclick="buyItem('outfit1', 1000)" style="display:flex;align-items:center;gap:4px;justify-content:center">
            <div style="width:16px;height:16px;line-height:0">${icons.gems}</div> 1000
          </button>
        </div>
        <div class="shop-item">
          <div class="item-icon">🦸</div>
          <div class="item-info">
            <h4>Super Hero</h4>
            <p>Duo saves the day!</p>
          </div>
          <button class="item-price" onclick="buyItem('outfit2', 1500)" style="display:flex;align-items:center;gap:4px;justify-content:center">
            <div style="width:16px;height:16px;line-height:0">${icons.gems}</div> 1500
          </button>
        </div>
        <div class="shop-item">
          <div class="item-icon">🏖️</div>
          <div class="item-info">
            <h4>Beach Outfit</h4>
            <p>Summer vibes for your feathered friend</p>
          </div>
          <button class="item-price" onclick="buyItem('outfit3', 800)" style="display:flex;align-items:center;gap:4px;justify-content:center">
            <div style="width:16px;height:16px;line-height:0">${icons.gems}</div> 800
          </button>
        </div>
        <div class="shop-item">
          <div class="item-icon">🎅</div>
          <div class="item-info">
            <h4>Holiday Outfit</h4>
            <p>Festive cheer for Duo</p>
          </div>
          <button class="item-price" onclick="buyItem('outfit4', 750)" style="display:flex;align-items:center;gap:4px;justify-content:center">
            <div style="width:16px;height:16px;line-height:0">${icons.gems}</div> 750
          </button>
        </div>
        <div class="shop-item">
          <div class="item-icon">🧑‍🚀</div>
          <div class="item-info">
            <h4>Space Suit</h4>
            <p>To infinity and beyond!</p>
          </div>
          <button class="item-price" onclick="buyItem('outfit5', 1200)" style="display:flex;align-items:center;gap:4px;justify-content:center">
            <div style="width:16px;height:16px;line-height:0">${icons.gems}</div> 1200
          </button>
        </div>
      </div>

      ${!s.isPremium ? `
      <div class="super-promo animate-in" style="animation-delay:0.2s;margin:0 20px 20px;cursor:pointer;" onclick="window.__router.navigate('/super')">
        <h3>🦉 Super Duolingo</h3>
        <p>No ads, unlimited hearts, and personality quizzes!</p>
        <button class="btn" style="font-size:14px;padding:12px 20px;">TRY FOR FREE</button>
      </div>
      ` : ''}
    </div>
  `;
  return {
    html: AppLayout('shop', content, RightPanelWidgets()),
    init() {
      (window as any).buyItem = (type: string, cost: number) => {
        if (s.gems < cost) {
          (window as any).duoAlert(`Not enough gems! You need ${cost} 💎 but only have ${s.gems} 💎`, '💔', 'GOT IT', 'btn-red');
          return;
        }
        const messages: Record<string, string> = {
          hearts: 'Hearts refilled! ❤️',
          unlimited: 'Unlimited hearts activated for 24 hours! ♾️',
          freeze: 'Streak Freeze equipped! ❄️',
          double: 'Double or Nothing started! ⏱️',
          xpboost: 'XP Boost activated! ⚡',
          repair: 'Streak repaired! 🔮',
        };
        AppState.update({ gems: s.gems - cost });
        
        let items = { ...s.items };
        if (type === 'hearts') {
           AppState.update({ hearts: Math.min(5, s.hearts + 5) });
        } else if (type === 'unlimited') {
           items.unlimitedHeartsExpiry = Date.now() + 24 * 60 * 60 * 1000;
        } else if (type === 'freeze') {
           items.streakFreeze = Math.min(2, items.streakFreeze + 1);
        } else if (type === 'double') {
           items.doubleOrNothing = true;
        } else if (type === 'xpboost') {
           items.xpBoostExpiry = Date.now() + 15 * 60 * 1000;
        }
        AppState.update({ items });
        
        (window as any).duoAlert(messages[type] || `Item purchased! 🎉`, '🎉', 'AWESOME!');
        window.__router.navigate('/shop');
      };
    }
  };
}
