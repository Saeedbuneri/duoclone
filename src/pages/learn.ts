import { AppLayout, RightPanelWidgets, DuoMascotPath } from '../components';
import { AppState } from '../state';
import { icons } from '../icons';

interface PathNode {
  id: number;
  name: string;
  status: string;
  type: 'lesson' | 'chest' | 'trophy';
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
  return genericTitles.map((title, unitIdx) => {
    const section = Math.floor(unitIdx / 4) + 1;
    const isFirstInSection = unitIdx % 4 === 0;
    const nodeNames = genericNodes[unitIdx];

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
            <button class="btn btn-full" onclick="window.__router.navigate('/lesson')" style="background: white; color: var(--duo-green); box-shadow: 0 4px 0 #E5E5E5; border: none; font-weight: 800; font-size: 15px;">
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

        const guideData: Record<number, any> = {
          1: {
            phrases: [
              { term: 'Hello!', type: 'Greeting' },
              { term: 'Thank you very much.', type: 'Polite Phrase' },
              { term: 'See you later.', type: 'Farewell' }
            ],
            grammar: 'In this unit, focus on memorizing the patterns! Nouns often have genders, and verbs might change endings depending on who defaults the action. Tap words in lessons to see hints!'
          },
          2: {
            phrases: [
              { term: 'I would like a coffee.', type: 'Ordering Food' },
              { term: 'Where is the bathroom?', type: 'Question' },
              { term: 'The check, please.', type: 'Restaurant' }
            ],
            grammar: 'When asking questions, the verb often moves to the front of the sentence. Keep an eye out for question marks at the beginning of sentences in some languages like Spanish (¿)!'
          },
          3: {
            phrases: [
              { term: 'My name is...', type: 'Introduction' },
              { term: 'Nice to meet you.', type: 'Greeting' },
              { term: 'I am from...', type: 'Origin' }
            ],
            grammar: 'Pay attention to formal vs. informal pronouns (like "tú" vs "usted" in Spanish or "tu" vs "vous" in French). Use formal when speaking to strangers or elders.'
          },
          4: {
            phrases: [
              { term: 'How much does this cost?', type: 'Shopping' },
              { term: 'Do you have this in blue?', type: 'Colors' },
              { term: 'It is too expensive.', type: 'Bargaining' }
            ],
            grammar: 'Adjectives often change to match the gender and number of the noun they describe. For example, a red apple might be "manzana roja" but a red car is "coche rojo".'
          }
        };

        const data = guideData[((unit - 1) % 4) + 1];

        const content = `
          <div class="top-modal animate-in" style="animation-duration: 0.2s; top: 10%; right: auto; left: 50%; transform: translateX(-50%); width: 90%; max-width: 500px; padding: 0; overflow: hidden;">
            <div style="background: ${color}; padding: 24px; color: white;">
              <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 8px;">Unit ${unit} Guidebook</h2>
              <p style="font-size: 16px; font-weight: 700; opacity: 0.9;">${title}</p>
            </div>
            <div style="padding: 24px;">
              <h3 style="color: #4B4B4B; font-size: 18px; font-weight: 800; margin-bottom: 12px;">Key Phrases</h3>
              <div style="background: #F7F7F7; border: 2px solid #E5E5E5; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
                ${data.phrases.map((p: any, i: number) => `
                <p style="font-size: 16px; color: #4B4B4B; font-weight: 700; display: flex; justify-content: space-between; align-items: center; ${i < data.phrases.length - 1 ? 'border-bottom: 2px solid #E5E5E5; padding-bottom: 12px; margin-bottom: 12px;' : ''}">
                  <span>${p.term}</span> <span style="color: #AFAFAF; font-size: 14px;">(${p.type})</span>
                </p>`).join('')}
              </div>
              
              <h3 style="color: #4B4B4B; font-size: 18px; font-weight: 800; margin-bottom: 12px;">Grammar Tip</h3>
              <div style="background: #DDF4FF; border: 2px solid #1CB0F6; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
                <p style="font-size: 15px; color: #1899D6; line-height: 1.5; font-weight: 600;">
                  ${data.grammar}
                </p>
              </div>
              
              <button class="btn btn-green btn-full" onclick="document.getElementById('global-modals').innerHTML=''">GOT IT</button>
            </div>
          </div>
        `;

        container.innerHTML = `
          <div class="modal-backdrop" onclick="document.getElementById('global-modals').innerHTML=''"></div>
          ${content}
        `;
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
