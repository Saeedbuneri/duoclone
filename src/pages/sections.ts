import { AppLayout, RightPanelWidgets } from '../components';
import { AppState } from '../state';

export function SectionsPage() {
  const s = AppState.activeProgress;
  const currentLevel = s.currentSection || 1;

  const sectionsData = [
    {
      id: 1,
      name: 'Section 1: Rookie',
      badge: 'A1 • SEE DETAILS',
      units: 5,
      phrase: '¡Hola! ¿Cómo estás?',
      decoration: '/section-decoration-1.svg'
    },
    {
      id: 2,
      name: 'Section 2: Explorer',
      badge: 'A1 • SEE DETAILS',
      units: 12,
      phrase: 'Quiero aprender español.',
      decoration: '/section-decoration-2.svg'
    },
    {
      id: 3,
      name: 'Section 3: Traveler',
      badge: 'A1 • SEE DETAILS',
      units: 15,
      phrase: 'Sé algunas palabras.',
      decoration: '/section-decoration-1.svg' // Reuse or find more
    },
    {
      id: 4,
      name: 'Section 4: Trailblazer',
      badge: 'A2 • SEE DETAILS',
      units: 20,
      phrase: 'Practico todos los días.',
      decoration: '/section-decoration-2.svg'
    },
    {
      id: 5,
      name: 'Section 5: Adventurer',
      badge: 'B1 • SEE DETAILS',
      units: 25,
      phrase: 'Puedo tener conversaciones largas.',
      decoration: '/section-trophy.svg'
    }
  ];

  const htmlContent = `
    <div class="sections-page">
      <div class="sections-top-nav">
        <button class="back-link" onclick="window.__router.navigate('/learn')">
          <svg fill="none" height="18" viewBox="0 0 24 24" width="18" style="margin-right:8px;"><path d="M15.5 19.5L8.5 12L15.5 4.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></path></svg>
          Back
        </button>
      </div>
      
      <div class="sections-list">
        ${sectionsData.map((sec, index) => {
    const isActive = currentLevel === sec.id;
    const isLocked = currentLevel < sec.id;
    const animDelay = index * 0.1;

    const cardClass = isActive ? 'section-wrapper active' : isLocked ? 'section-wrapper locked' : 'section-wrapper completed';

    let buttonHtml = '';
    if (isActive) {
      buttonHtml = `<button class="btn btn-blue" onclick="jumpToSection(${sec.id})" style="margin-top: 16px; min-width: 140px; font-size: 15px; padding: 12px 18px;">CONTINUE</button>`;
    } else if (isLocked) {
      buttonHtml = `<button class="btn btn-outline" onclick="jumpToSection(${sec.id})" style="margin-top: 16px; min-width: 140px; font-size: 13px; padding: 12px 18px; color: #1CB0F6; border-color: #E5E5E5; background: white;">JUMP TO SECTION ${sec.id}</button>`;
    } else {
      // Completed
      buttonHtml = `<button class="btn btn-outline" onclick="jumpToSection(${sec.id})" style="margin-top: 16px; min-width: 140px; font-size: 13px; padding: 12px 18px; color: #AFB0B0; border-color: #E5E5E5; background: white;">REVIEW SECTION ${sec.id}</button>`;
    }

    return `
            <div class="${cardClass} animate-in" style="animation-delay: ${animDelay}s;">
              <div class="section-card-main">
                <div class="section-badge">${sec.badge}</div>
                <h2>${sec.name}</h2>
                
                ${isActive ? `
                  <div class="section-progress">
                     <div class="section-progress-icon" style="background:var(--duo-green);">
                        <svg viewBox="0 0 24 24" fill="white" width="14" height="14"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                     </div>
                     <div class="section-progress-bar">
                        <div class="section-progress-fill" style="width: 25%;"></div>
                     </div>
                     <div class="section-progress-icon" style="background:var(--duo-white); color: var(--duo-green); border: 2px solid var(--duo-gray-200); position:relative;">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                     </div>
                  </div>
                ` : `
                  <div class="section-locked-info">
                     <svg fill="none" height="14" viewBox="0 0 24 24" width="14" style="margin-right: 6px; color: ${isLocked ? '#AFB0B0' : '#FFC800'}"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="currentColor"></path></svg>
                     <span style="font-size:14px; font-weight:700; color: ${isLocked ? '#AFB0B0' : '#4b4b4b'};">${sec.units} UNITS</span>
                  </div>
                `}

                ${buttonHtml}
              </div>
              <div class="section-mascot-container">
                <div class="section-bubble" style="${isLocked ? 'background: #F0F0F0; color: #AFB0B0;' : ''}">${sec.phrase}</div>
                <div class="section-mascot">
                   <img src="${sec.decoration}" style="width: 140px; height: auto; ${isLocked ? 'filter: grayscale(100%) opacity(0.6);' : ''}" />
                </div>
              </div>
            </div>
          `;
  }).join('')}
      </div>
    </div>
  `;

  return {
    html: AppLayout('learn', htmlContent, RightPanelWidgets()), // 'learn' nav item stays active
    init() {
      (window as any).jumpToSection = (secId: number) => {
        AppState.updateProgress({ currentSection: secId });
        window.__router.navigate('/learn');
      };
    }
  };
}
