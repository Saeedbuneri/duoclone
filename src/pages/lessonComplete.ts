import { AppState } from '../state';

export function LessonCompletePage() {
  const s = AppState.user;
  const xpEarned = 30;
  const accuracy = Math.round((1 - 0.15) * 100);

  const content = `
    <div class="lesson-complete" style="position:relative; overflow:hidden">
      <!-- Confetti base (CSS animated) -->
      <div id="confetti-container" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:1;"></div>
      
      <div class="complete-icon animate-in" style="font-size: 100px; animation: bounceIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); position:relative; z-index:2;">🎉</div>
      <h2 class="animate-in" style="animation-delay: 0.2s; position:relative; z-index:2;">Lesson Complete!</h2>
      <p class="animate-in" style="animation-delay: 0.3s; position:relative; z-index:2;">Amazing work! You're building a great streak!</p>
      
      <div class="xp-earned animate-in" style="animation-delay: 0.5s; position:relative; z-index:2; transform: scale(1.1); transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1.1)'">
        <span>⚡</span>
        <span>TOTAL XP +${xpEarned}</span>
      </div>
      
      <div class="complete-stats" style="position:relative; z-index:2;">
        <div class="complete-stat animate-in" style="animation-delay: 0.7s; background: #D7FFB8; border: 2px solid #58CC02; padding: 16px; border-radius: 16px; min-width: 90px; border-bottom: 4px solid #58CC02;">
          <div class="cs-label-top" style="color: #58CC02">AMAZING</div>
          <div class="cs-value" style="color:#58CC02">${accuracy}%</div>
          <div class="cs-label" style="color: #46A302">Accuracy</div>
        </div>
        <div class="complete-stat animate-in" style="animation-delay: 0.9s; background: #DDF4FF; border: 2px solid #1CB0F6; padding: 16px; border-radius: 16px; min-width: 90px; border-bottom: 4px solid #1CB0F6;">
          <div class="cs-label-top" style="color: #1CB0F6">SPEED</div>
          <div class="cs-value" style="color:#1CB0F6">2:45</div>
          <div class="cs-label" style="color: #1581b3">Time</div>
        </div>
        <div class="complete-stat animate-in" style="animation-delay: 1.1s; background: #FFF0D6; border: 2px solid #FF9600; padding: 16px; border-radius: 16px; min-width: 90px; border-bottom: 4px solid #FF9600;">
          <div class="cs-label-top" style="color: #FF9600">GREAT</div>
          <div class="cs-value" style="color:#FF9600">🔥 ${s.streak}</div>
          <div class="cs-label" style="color: #CC7800">Day Streak</div>
        </div>
      </div>
      
      <div class="animate-in" style="animation-delay: 1.3s; display:flex;flex-direction:column;gap:10px;width:100%;max-width:320px; position:relative; z-index:2; margin-top:20px;">
        <button class="btn btn-green btn-full btn-lg" onclick="window.__router.navigate('/learn')">CONTINUE</button>
        <button class="btn btn-white btn-full" onclick="window.__router.navigate('/lesson')" style="font-size:14px">PRACTICE AGAIN</button>
      </div>
    </div>
  `;

  return {
    html: content,
    init() {
      // Create confetti
      const container = document.getElementById('confetti-container');
      if (container) {
        const colors = ['#58CC02', '#1CB0F6', '#FF9600', '#FF4B4B', '#CE82FF', '#FFD900'];
        for (let i = 0; i < 50; i++) {
          const conf = document.createElement('div');
          conf.style.position = 'absolute';
          conf.style.width = Math.random() > 0.5 ? '8px' : '10px';
          conf.style.height = Math.random() > 0.5 ? '8px' : '16px';
          conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';

          conf.style.left = Math.random() * 100 + '%';
          conf.style.top = '-20px';

          // Animation config
          const duration = Math.random() * 2 + 2;
          const delay = Math.random() * 1;

          conf.animate([
            { transform: `translate3d(0,0,0) rotate(0deg)`, opacity: 1 },
            { transform: `translate3d(${(Math.random() - 0.5) * 200}px, ${window.innerHeight}px, 0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
          ], {
            duration: duration * 1000,
            delay: delay * 1000,
            easing: 'cubic-bezier(.37,0,.63,1)',
            fill: 'forwards'
          });

          container.appendChild(conf);
        }
      }

      // Play sound
      if ('AudioContext' in window || 'webkitAudioContext' in window) {
        setTimeout(() => {
          try {
            // Mock sound effect by using a very short synth pop
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
            osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.1); // C6
            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.5);
          } catch (e) { }
        }, 500);
      }
    }
  };
}
