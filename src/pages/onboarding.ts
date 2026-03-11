import { DuoSmall } from '../components';
import { AppState } from '../state';

interface Step {
  question: string;
  type: 'languages' | 'options';
  options: { icon: string; label: string; value: string }[];
}

const steps: Step[] = [
  {
    question: 'What do you want to learn?',
    type: 'languages',
    options: [
      { icon: '🇪🇸', label: 'Spanish', value: 'Spanish' },
      { icon: '🇫🇷', label: 'French', value: 'French' },
      { icon: '🇩🇪', label: 'German', value: 'German' },
      { icon: '🇯🇵', label: 'Japanese', value: 'Japanese' },
      { icon: '🇰🇷', label: 'Korean', value: 'Korean' },
      { icon: '🇮🇹', label: 'Italian', value: 'Italian' },
      { icon: '🇨🇳', label: 'Chinese', value: 'Chinese' },
      { icon: '🇵🇹', label: 'Portuguese', value: 'Portuguese' },
      { icon: '🇷🇺', label: 'Russian', value: 'Russian' },
      { icon: '🇹🇷', label: 'Turkish', value: 'Turkish' },
      { icon: '🇳🇱', label: 'Dutch', value: 'Dutch' },
      { icon: '🇮🇳', label: 'Hindi', value: 'Hindi' },
      { icon: '🇸🇦', label: 'Arabic', value: 'Arabic' },
      { icon: '🇸🇪', label: 'Swedish', value: 'Swedish' },
    ],
  },
  {
    question: 'How did you hear about Duolingo?',
    type: 'options',
    options: [
      { icon: '📱', label: 'TikTok / Social Media', value: 'social' },
      { icon: '📺', label: 'TV / YouTube', value: 'tv' },
      { icon: '👨‍👩‍👧', label: 'Family / Friends', value: 'family' },
      { icon: '🔍', label: 'Google Search', value: 'search' },
      { icon: '📰', label: 'News / Blog', value: 'news' },
      { icon: '🏫', label: 'School / Work', value: 'school' },
      { icon: '🎯', label: 'App Store', value: 'appstore' },
      { icon: '❓', label: 'Other', value: 'other' },
    ],
  },
  {
    question: 'Why are you learning a language?',
    type: 'options',
    options: [
      { icon: '🧠', label: 'Exercise my brain', value: 'brain' },
      { icon: '🗣️', label: 'Connect with people', value: 'connect' },
      { icon: '✈️', label: 'Prepare for travel', value: 'travel' },
      { icon: '💼', label: 'Boost my career', value: 'career' },
      { icon: '🏫', label: 'School or work', value: 'school' },
      { icon: '🎬', label: 'Enjoy media (TV, music, books)', value: 'media' },
      { icon: '❓', label: 'Other / just for fun', value: 'other' },
    ],
  },
  {
    question: 'What is your current level?',
    type: 'options',
    options: [
      { icon: '🌱', label: "I'm new to this language", value: 'beginner' },
      { icon: '📚', label: 'I know some basics', value: 'basic' },
      { icon: '💬', label: 'I can have simple conversations', value: 'intermediate' },
      { icon: '🎓', label: 'I can discuss most topics', value: 'advanced' },
    ],
  },
  {
    question: 'How much time do you want to spend each day?',
    type: 'options',
    options: [
      { icon: '☕', label: '5 min / day — Casual', value: '5' },
      { icon: '📖', label: '10 min / day — Regular', value: '10' },
      { icon: '📝', label: '15 min / day — Serious', value: '15' },
      { icon: '🔥', label: '20 min / day — Intense', value: '20' },
    ],
  },
];

let currentStep = 0;
let selectedValue: string | null = null;

function render() {
  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;
  const container = document.getElementById('onboarding-container');
  if (!container) return;

  let optionsHtml = '';
  if (step.type === 'languages') {
    optionsHtml = `
      <div class="lang-grid">
        ${step.options.map(opt => `
          <div class="lang-card ${selectedValue === opt.value ? 'selected' : ''}" 
               onclick="selectOption('${opt.value}')">
            <span class="lang-flag">${opt.icon}</span>
            <span class="lang-name">${opt.label}</span>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    optionsHtml = `
      <div class="onboarding-options">
        ${step.options.map(opt => `
          <div class="option-card ${selectedValue === opt.value ? 'selected' : ''}" 
               onclick="selectOption('${opt.value}')">
            <div class="option-icon">${opt.icon}</div>
            <div class="option-text">${opt.label}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  container.innerHTML = `
    <div class="onboarding-header">
      <button class="close-btn" onclick="duoConfirm('Quit setup? Your progress will be lost.', () => window.__router.navigate('/'), '🚪', 'QUIT', 'CONTINUE')">✕</button>
    </div>
    <div class="onboarding-progress">
      <div class="onboarding-progress-fill" style="width:${progress}%"></div>
    </div>
    <div class="onboarding-content">
      <div class="onboarding-mascot">
        ${DuoSmall}
        <div class="mascot-bubble">${step.question}</div>
      </div>
      ${optionsHtml}
    </div>
    <div class="onboarding-footer">
      <button class="btn ${selectedValue ? 'btn-green' : 'btn-disabled'}" onclick="continueStep()">CONTINUE</button>
    </div>
  `;
}

export function OnboardingPage() {
  currentStep = 0;
  selectedValue = null;

  return {
    html: `<div class="onboarding-page" id="onboarding-container"></div>`,
    init() {
      if (!AppState.db.currentUserEmail) {
        AppState.login('Guest', 'guest_' + Date.now() + '@example.com');
      }
      render();

      (window as any).selectOption = (val: string) => {
        selectedValue = val;
        render();
      };

      (window as any).continueStep = () => {
        if (!selectedValue) return;

        if (currentStep === 0) {
          const langData: Record<string, { flag: string }> = {
            'Spanish': { flag: '🇪🇸' }, 'French': { flag: '🇫🇷' }, 'German': { flag: '🇩🇪' },
            'Japanese': { flag: '🇯🇵' }, 'Korean': { flag: '🇰🇷' }, 'Italian': { flag: '🇮🇹' },
            'Chinese': { flag: '🇨🇳' }, 'Portuguese': { flag: '🇵🇹' }, 'Russian': { flag: '🇷🇺' },
            'Turkish': { flag: '🇹🇷' }, 'Dutch': { flag: '🇳🇱' }, 'Hindi': { flag: '🇮🇳' },
            'Arabic': { flag: '🇸🇦' }, 'Swedish': { flag: '🇸🇪' },
          };
          const data = langData[selectedValue] || { flag: '🌍' };
          AppState.update({ language: selectedValue, languageFlag: data.flag });
        } else if (currentStep === 4) {
          AppState.update({ dailyGoal: parseInt(selectedValue) || 10 });
        }

        currentStep++;
        selectedValue = null;

        if (currentStep >= steps.length) {
          // AppState.update({ isLoggedIn: true }); // Removed to preserve guests
          window.__router.navigate('/learn');
        } else {
          render();
        }
      };
    }
  };
}
