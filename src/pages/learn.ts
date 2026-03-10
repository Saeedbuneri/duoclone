import { AppLayout, RightPanelWidgets, DuoMascotPath } from '../components';
import { AppState } from '../state';
import { icons } from '../icons';
import { getGuideData } from '../guideData';

interface PathNode {
  id: number;
  name: string;
  status: string;
  type: 'lesson' | 'chest' | 'trophy';
  globalIdx?: number;
}

interface Unit {
  section: number;
  unit: number;
  title: string;
  color: string;
  dividerText?: string;
  nodes: PathNode[];
}

function generateUnitsForLanguage(langName: string): Unit[] {
  const genericTitles = [
    `Basics 1 in ${langName}`,
    `Greetings and Introduction`,
    `Food and Drink`,
    `Family and Friends`,
    `Travel and Directions`,
    `Shopping and Money`
  ];
  const genericNodes = [
    ['Intro', 'Phrases', 'Chest', 'Greetings', 'Review'],
    ['Family', 'Work', 'Chest', 'Numbers', 'Review'],
    ['Travel', 'Food', 'Places', 'Chest', 'Review'],
    ['Animals', 'Colors', 'People', 'Chest', 'Review'],
    ['Questions', 'Time', 'Date', 'Chest', 'Review'],
    ['Feelings', 'Verbs', 'Adjectives', 'Chest', 'Review']
  ];
  const colors = ['#58CC02', '#CE82FF', '#1CB0F6', '#FF9600', '#FF4B4B', '#00CD9C'];

  let globalId = 1;
  return Array.from({ length: 30 }).map((_, unitIdx) => {
    const section = Math.floor(unitIdx / 4) + 1;
    const isFirstInSection = unitIdx % 4 === 0;

    const baseTitle = genericTitles[unitIdx % genericTitles.length];
    const loopNum = Math.floor(unitIdx / genericTitles.length) + 1;
    const title = loopNum > 1 ? `${baseTitle} (Part ${loopNum})` : baseTitle;

    const nodeNames = genericNodes[unitIdx % genericNodes.length];

    return {
      section,
      unit: unitIdx + 1,
      title: title,
      color: colors[unitIdx % colors.length],
      dividerText: isFirstInSection && unitIdx > 0 ? title : undefined,
      nodes: nodeNames.map((name, i) => {
        let type: PathNode['type'] = 'lesson';
        if (name === 'Chest') type = 'chest';
        if (i === nodeNames.length - 1) type = 'trophy';
        return { id: globalId++, name, status: 'locked', type };
      })
    };
  });
}

let activePopup: number | null = null;

function getNodeIcon(node: PathNode): string {
  if (node.status === 'completed') {
    return icons.checkmark;
  }
  if (node.type === 'chest') return icons.chest;
  if (node.type === 'trophy') return icons.trophy;
  if (node.status === 'active') return icons.starActive;
  return icons.starLocked;
}

function getNodeBgColor(node: PathNode): string {
  if (node.status === 'completed') return '#FFD900';
  if (node.status === 'active') return '#58CC02';
  if (node.type === 'chest') return '#D0D0D0';
  if (node.type === 'trophy') return '#D0D0D0';
  return '#E5E5E5';
}

function getNodeShadowColor(node: PathNode): string {
  if (node.status === 'completed') return '#D4B300';
  if (node.status === 'active') return '#46A302';
  return '#C4C4C4';
}

export function LearnPage() {
  const completed = AppState.activeProgress.lessonsCompleted;
  const lang = AppState.user.language || 'Language';
  const units = generateUnitsForLanguage(lang);

  let globalIdx = 0;
  units.forEach(unit => {
    unit.nodes.forEach(node => {
      if (globalIdx < completed) node.status = 'completed';
      else if (globalIdx === completed) node.status = 'active';
      else node.status = 'locked';
      node.globalIdx = globalIdx;
      globalIdx++;
    });
  });

  const pathHtml = units.map((unit) => {
    const divider = unit.dividerText ? `
      <div class="section-divider animate-in">
        <span>${unit.dividerText}</span>
      </div>
    ` : '';

    const sectionHeader = `
      <div class="section-header animate-in" style="background:${unit.color}">
        <div class="section-header-info">
          <h2>← SECTION ${unit.section}, UNIT ${unit.unit}</h2>
          <h3>${unit.title}</h3>
        </div>
        <button class="guidebook-btn" title="Guidebook" onclick="showGuidebook(${unit.unit}, '${unit.title.replace(/'/g, "\\'")}', '${unit.color}')">
          <div style="width:24px;height:24px;display:flex;align-items:center;">${icons.guidebook}</div>
          <span>GUIDEBOOK</span>
        </button>
      </div>
    `;

    const nodesHtml = unit.nodes.map((node, i) => {
      const showStartTooltip = node.status === 'active';
      const showMascot = node.status === 'active';
      const bgColor = getNodeBgColor(node);
      const shadowColor = getNodeShadowColor(node);
      const nodeIcon = getNodeIcon(node);

      const ringClass = node.status === 'active' ? 'active-ring' :
        node.status === 'completed' ? 'completed-ring' : '';

      return `
        <div class="path-node" id="node-${node.id}">
          ${showStartTooltip ? '<div class="start-tooltip">START</div>' : ''}
          <div class="node-ring ${ringClass}">
            <button class="node-btn" 
                    style="background:${bgColor};box-shadow:0 4px 0 ${shadowColor};${node.status === 'locked' ? 'cursor:default;' : ''}"
                    onclick="${node.status !== 'locked' ? `togglePopup(${node.id})` : ''}"
                    ${node.status === 'locked' ? 'disabled' : ''}>
              ${nodeIcon}
            </button>
          </div>
          ${node.status !== 'locked' ? `
          <div class="start-popup" id="popup-${node.id}">
            <h4>${node.name}</h4>
            <p>Lesson ${i + 1} of ${unit.nodes.length}</p>
            <button class="btn btn-full" onclick="startLesson(${node.globalIdx})" style="background: white; color: var(--duo-green); box-shadow: 0 4px 0 #E5E5E5; border: none; font-weight: 800; font-size: 15px;">
              ${node.status === 'completed' ? 'PRACTICE' : 'START +10 XP'}
            </button>
          </div>` : ''}
          ${showMascot ? `<div class="path-mascot-inline" style="position:absolute; right: -70px; top: 10px; animation: floatRotate 3.5s infinite alternate ease-in-out; pointer-events: none; z-index: 5;">${DuoMascotPath}</div>` : ''}
          ${i < unit.nodes.length - 1 ? `<div class="path-connector ${node.status === 'completed' ? 'active' : ''}"></div>` : ''}
        </div>
      `;
    }).join('');

    return `${divider}${sectionHeader}<div class="path-container">${nodesHtml}</div>`;
  }).join('');

  return {
    html: AppLayout('learn', pathHtml, RightPanelWidgets()),
    init() {
      (window as any).showGuidebook = (unit: number, title: string, color: string) => {
        const container = document.getElementById('global-modals');
        if (!container) return;

        const lang = AppState.user.language || 'Spanish';
        const data = getGuideData(lang, unit);

        const content = `
          <div class="top-modal animate-in" style="animation-duration: 0.2s; top: 10%; right: auto; left: 50%; transform: translateX(-50%); width: 90%; max-width: 500px; padding: 0; overflow-y: auto; max-height: 80vh; border-radius: 20px;">
            <div style="background: ${color}; padding: 32px 24px; color: white;">
              <div style="display:flex; justify-content: space-between; align-items: flex-start;">
                <div>
                  <h2 style="font-size: 28px; font-weight: 800; margin-bottom: 8px;">Unit ${unit} Guidebook</h2>
                  <p style="font-size: 18px; font-weight: 700; opacity: 0.9;">${title}</p>
                </div>
                <button onclick="document.getElementById('global-modals').innerHTML=''" style="background: rgba(255,255,255,0.2); border: none; color: white; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: 800;">✕</button>
              </div>
            </div>
            
            <div style="padding: 24px;">
              <!-- Section 1: Key Phrases -->
              <h3 style="color: #4B4B4B; font-size: 19px; font-weight: 800; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 24px;">🗣️</span> Key Phrases
              </h3>
              <div style="background: white; border: 2px solid #E5E5E5; border-radius: 16px; padding: 8px; margin-bottom: 24px; box-shadow: 0 4px 0 #E5E5E5;">
                ${data.phrases.map((p, i) => `
                <div style="padding: 16px; ${i < data.phrases.length - 1 ? 'border-bottom: 2px solid #F0F0F0;' : ''}">
                  <div style="font-size: 17px; color: #4B4B4B; font-weight: 800;">${p.native}</div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
                    <span style="color: #777; font-size: 15px; font-weight: 600;">${p.trans}</span>
                    <span style="background: #E5E5E5; color: #777; font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 99px;">${p.type.toUpperCase()}</span>
                  </div>
                </div>`).join('')}
              </div>
              
              <!-- Section 2: Grammar Tips -->
              <h3 style="color: #4B4B4B; font-size: 19px; font-weight: 800; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 24px;">💡</span> Grammar Tip
              </h3>
              <div style="background: #DDF4FF; border: 2px solid #1CB0F6; border-radius: 16px; padding: 20px; margin-bottom: 24px; position: relative;">
                <p style="font-size: 16px; color: #1899D6; line-height: 1.6; font-weight: 600; margin: 0;">
                  ${data.grammar}
                </p>
              </div>

              ${data.culture ? `
              <!-- Section 3: Cultural Note -->
              <h3 style="color: #4B4B4B; font-size: 19px; font-weight: 800; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 24px;">🌎</span> Cultural Note
              </h3>
              <div style="background: #FFF4D1; border: 2px solid #FFC800; border-radius: 16px; padding: 20px; margin-bottom: 24px;">
                <p style="font-size: 16px; color: #C67600; line-height: 1.6; font-weight: 600; margin: 0;">
                  ${data.culture}
                </p>
              </div>
              ` : ''}
              
              <button class="btn btn-green btn-full" onclick="document.getElementById('global-modals').innerHTML=''" style="height: 50px; font-size: 17px;">GOT IT</button>
            </div>
          </div>
        `;

        container.innerHTML = `
          <div class="modal-backdrop" onclick="document.getElementById('global-modals').innerHTML=''"></div>
          ${content}
        `;
      };

      (window as any).startLesson = (idx: number) => {
        sessionStorage.setItem('targetLessonIdx', idx.toString());
        window.__router.navigate('/lesson');
      };

      (window as any).togglePopup = (id: number) => {
        document.querySelectorAll('.start-popup').forEach(p => p.classList.remove('show'));
        document.querySelectorAll('.path-node').forEach(n => (n as HTMLElement).style.zIndex = '10');
        if (activePopup === id) { activePopup = null; return; }
        activePopup = id;
        document.getElementById(`popup-${id}`)?.classList.add('show');
        const activeNode = document.getElementById(`node-${id}`);
        if (activeNode) activeNode.style.zIndex = '100';
      };
      document.addEventListener('click', (e) => {
        if (!(e.target as HTMLElement).closest('.path-node')) {
          document.querySelectorAll('.start-popup').forEach(p => p.classList.remove('show'));
          document.querySelectorAll('.path-node').forEach(n => (n as HTMLElement).style.zIndex = '10');
          activePopup = null;
        }
      });
    }
  };
}
