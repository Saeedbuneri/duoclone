import { AppState } from '../state';

export function LogoutPage() {
  const content = `
    <div id="logout-screen" 
      style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:#fff;z-index:999999;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:opacity 0.4s ease;gap:24px;">
      
      <div style="width: 300px; height: 300px;">
        <dotlottie-wc 
          src="https://lottie.host/1dbe72a6-8fb5-46f8-9df0-9a6990547b43/WGJNBvzds6.lottie" 
          style="width: 100%; height: 100%;" 
          autoplay 
          loop
        ></dotlottie-wc>
      </div>

      <div style="font-family:'Nunito',sans-serif;font-size:24px;font-weight:800;color:#4B4B4B;">Logging you out...</div>
      
      <div style="width:200px;height:8px;background:#E5E5E5;border-radius:4px;overflow:hidden;">
        <div id="logout-progress" style="height:100%;background:linear-gradient(90deg,#FF4B4B,#FF6B6B);border-radius:4px;width:0%; transition: width 2.5s linear;"></div>
      </div>
    </div>
  `;

  return {
    html: content,
    init() {
      const progressBar = document.getElementById('logout-progress');
      if (progressBar) {
        // Start progress bar
        setTimeout(() => {
          progressBar.style.width = '100%';
        }, 50);
      }

      // Perform actual logout after delay
      setTimeout(() => {
        const isPurge = sessionStorage.getItem('logout_purge') === 'true';
        if (isPurge) {
          AppState.reset();
          sessionStorage.removeItem('logout_purge');
        } else {
          AppState.logout();
        }
        
        const screen = document.getElementById('logout-screen');
        if (screen) {
          screen.style.opacity = '0';
          setTimeout(() => {
            window.__router.navigate('/');
          }, 400);
        } else {
          window.__router.navigate('/');
        }
      }, 2800);
    }
  };
}
