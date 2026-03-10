import { AppState } from '../state';
import { icons } from '../icons';

interface Question {
  type: 'image-select' | 'translate' | 'fill-blank' | 'listen-tap' | 'match-pairs';
  badge?: string;
  question: string;
  options?: { img: string; label: string; key: string }[];
  words?: string[];
  correctAnswer: string;
  sentence?: string;
  hint?: string;
  pairs?: { left: string; right: string }[];
}

function getLessonQuestions(lang: string): Question[] {
  const dict: Record<string, { coffee: string, w1: string, water: string, w2: string, sentence1: string, woman: string, w3: string, w4: string, sentence2: string }> = {
    'French': { coffee: 'café', w1: 'croissant', water: 'eau', w2: 'lait', sentence1: 'Le garçon mange du pain.', woman: 'la femme', w3: 'le garçon', w4: "l'homme", sentence2: 'Je suis une femme.' },
    'German': { coffee: 'Kaffee', w1: 'Wurst', water: 'Wasser', w2: 'Milch', sentence1: 'Der Junge isst Brot.', woman: 'die Frau', w3: 'der Junge', w4: 'der Mann', sentence2: 'Ich bin eine Frau.' },
    'Japanese': { coffee: 'コーヒー', w1: 'タコ', water: '水', w2: '牛乳', sentence1: '男の子はパンを食べる。', woman: '女の人', w3: '男の子', w4: '男の人', sentence2: '私は女です。' },
    'Korean': { coffee: '커피', w1: '빵', water: '물', w2: '우유', sentence1: '소년이 빵을 먹는다.', woman: '여자', w3: '소년', w4: '남자', sentence2: '나는 여자입니다.' },
    'Italian': { coffee: 'caffè', w1: 'pizza', water: 'acqua', w2: 'latte', sentence1: 'Il ragazzo mangia il pane.', woman: 'la donna', w3: 'il ragazzo', w4: "l'uomo", sentence2: 'Io sono una donna.' },
    'Chinese': { coffee: '咖啡', w1: '包子', water: '水', w2: '牛奶', sentence1: '男孩吃面包。', woman: '女人', w3: '男孩', w4: '男人', sentence2: '我是女人。' },
    'Portuguese': { coffee: 'café', w1: 'pão', water: 'água', w2: 'leite', sentence1: 'O menino come pão.', woman: 'a mulher', w3: 'o menino', w4: 'o homem', sentence2: 'Eu sou uma mulher.' },
    'Russian': { coffee: 'кофе', w1: 'блин', water: 'вода', w2: 'молоко', sentence1: 'Мальчик ест хлеб.', woman: 'женщина', w3: 'мальчик', w4: 'мужчина', sentence2: 'Я женщина.' },
    'Turkish': { coffee: 'kahve', w1: 'simit', water: 'su', w2: 'süt', sentence1: 'Çocuk ekmek yer.', woman: 'kadın', w3: 'oğlan', w4: 'adam', sentence2: 'Ben bir kadınım.' },
    'Dutch': { coffee: 'koffie', w1: 'kaas', water: 'water', w2: 'melk', sentence1: 'De jongen eet brood.', woman: 'de vrouw', w3: 'de jongen', w4: 'de man', sentence2: 'Ik ben een vrouw.' },
    'Hindi': { coffee: 'कॉफ़ी', w1: 'रोटी', water: 'पानी', w2: 'दूध', sentence1: 'लड़का रोटी खाता है।', woman: 'औरत', w3: 'लड़का', w4: 'आदमी', sentence2: 'मैं एक औरत हूँ।' },
    'Arabic': { coffee: 'قهوة', w1: 'خبز', water: 'ماء', w2: 'حليب', sentence1: 'الولد يأكل الخبز.', woman: 'امرأة', w3: 'ولد', w4: 'رجل', sentence2: 'أنا امرأة.' },
    'Swedish': { coffee: 'kaffe', w1: 'bulle', water: 'vatten', w2: 'mjölk', sentence1: 'Pojken äter bröd.', woman: 'kvinnan', w3: 'pojken', w4: 'mannen', sentence2: 'Jag är en kvinna.' },
    'Spanish': { coffee: 'café', w1: 'taco', water: 'agua', w2: 'leche', sentence1: 'El niño come pan.', woman: 'la mujer', w3: 'el niño', w4: 'el hombre', sentence2: 'Yo soy una mujer.' }
  };

  const d = dict[lang] || dict['Spanish'];

  return [
    { type: 'image-select', badge: 'NEW WORD', question: 'Which one of these is "coffee"?', options: [{ img: '☕', label: d.coffee, key: '1' }, { img: '🌮', label: d.w1, key: '2' }, { img: '🍵', label: d.w2 || 'té', key: '3' }], correctAnswer: d.coffee },
    {
      type: 'match-pairs', badge: 'MATCH', question: 'Tap the matching pairs', pairs: [
        { left: d.coffee, right: 'coffee' },
        { left: d.water, right: 'water' },
        { left: d.woman, right: 'woman' },
        { left: d.w1, right: 'bread' }
      ], correctAnswer: ''
    },
    { type: 'image-select', badge: 'NEW WORD', question: 'Which one of these is "water"?', options: [{ img: '🥛', label: d.w2, key: '1' }, { img: '💧', label: d.water, key: '2' }, { img: '🍷', label: 'vino', key: '3' }], correctAnswer: d.water },
    { type: 'translate', question: 'Write this in English', sentence: d.sentence1, words: ['The', 'boy', 'eats', 'bread', 'girl', 'drinks', 'water', 'is'], correctAnswer: 'The boy eats bread' },
    { type: 'image-select', badge: 'NEW WORD', question: 'Which one of these is "the woman"?', options: [{ img: '👦', label: d.w3, key: '1' }, { img: '👩', label: d.woman, key: '2' }, { img: '👨', label: d.w4, key: '3' }], correctAnswer: d.woman },
    { type: 'translate', question: 'Write this in English', sentence: d.sentence2, words: ['I', 'am', 'a', 'woman', 'man', 'the', 'boy', 'she'], correctAnswer: 'I am a woman' }
  ];
}

let activeQuestions: Question[] = [];
let currentQ = 0;
let selectedAnswer: string | null = null;
let answeredWords: string[] = [];
let isChecked = false;
let isCorrect = false;
let score = { correct: 0, wrong: 0, streak: 0, bestStreak: 0 };

let matchLefts: string[] = [];
let matchRights: string[] = [];
let matchedPairs: string[] = [];
let matchSelectedLeft: string | null = null;
let matchSelectedRight: string | null = null;

function renderQuestion() {
  if (activeQuestions.length === 0) activeQuestions = getLessonQuestions(AppState.user.language || 'Spanish');
  const q = activeQuestions[currentQ];
  const progress = ((currentQ) / activeQuestions.length) * 100;
  const isPremium = AppState.user.isPremium;
  const hearts = isPremium ? '∞' : AppState.user.hearts;

  const container = document.getElementById('lesson-container');
  if (!container) return;

  let questionContent = '';

  if (q.type === 'image-select') {
    const cols = (q.options?.length || 3) >= 4 ? 'repeat(2, 1fr)' : `repeat(${q.options?.length || 3}, 1fr)`;
    questionContent = `
      ${q.badge ? `<div class="lesson-badge"><div class="badge-dot"></div><span>${q.badge}</span></div>` : ''}
      <h2 class="lesson-question">${q.question}</h2>
      <div class="lesson-options" style="grid-template-columns:${cols}">
        ${q.options!.map(opt => `
          <div class="lesson-option ${selectedAnswer === opt.label ? 'selected' : ''} ${isChecked && opt.label === q.correctAnswer ? 'correct' : ''} ${isChecked && selectedAnswer === opt.label && opt.label !== q.correctAnswer ? 'wrong' : ''}" 
               onclick="${!isChecked ? `selectAnswer('${opt.label.replace(/'/g, "\\'")}')` : ''}" id="opt-${opt.key}">
            ${opt.img ? `<span class="option-img">${opt.img}</span>` : ''}
            <div class="option-label">
              <span>${opt.label}</span>
              <span class="key-hint">${opt.key}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (q.type === 'translate') {
    questionContent = `
      <h2 class="lesson-question">${q.question}</h2>
      <div class="translation-area">
        <button class="speaker-btn" onclick="speak()">
          <span class="speaker-icon">${icons.speaker}</span>
          <span>${q.sentence}</span>
        </button>
        <div class="answer-area" id="answer-area">
          ${answeredWords.map((w, i) => `
            <span class="word-chip in-answer" onclick="${!isChecked ? `removeWord(${i})` : ''}">${w}</span>
          `).join('')}
        </div>
        <div class="word-bank" id="word-bank">
          ${q.words!.map((w, i) => `
            <span class="word-chip ${answeredWords.includes(w) ? 'used' : ''}" 
                  onclick="${!isChecked ? `addWord('${w}', ${i})` : ''}" id="word-${i}">${w}</span>
          `).join('')}
        </div>
      </div>
    `;
  } else if (q.type === 'fill-blank') {
    questionContent = `
      ${q.badge ? `<div class="lesson-badge"><div class="badge-dot"></div><span>${q.badge}</span></div>` : ''}
      <h2 class="lesson-question">${q.question}</h2>
      <div style="font-size:22px;font-weight:700;color:#4B4B4B;margin-bottom:8px;line-height:1.5">${q.sentence}</div>
      ${q.hint ? `<div style="font-size:14px;color:#AFAFAF;margin-bottom:20px;font-weight:600">💡 ${q.hint}</div>` : ''}
      <div class="lesson-options" style="grid-template-columns:repeat(${q.options?.length || 3}, 1fr)">
        ${q.options!.map(opt => `
          <div class="lesson-option ${selectedAnswer === opt.label ? 'selected' : ''} ${isChecked && opt.label === q.correctAnswer ? 'correct' : ''} ${isChecked && selectedAnswer === opt.label && opt.label !== q.correctAnswer ? 'wrong' : ''}" 
               onclick="${!isChecked ? `selectAnswer('${opt.label}')` : ''}">
            <div class="option-label" style="justify-content:center">
              <span style="font-size:20px">${opt.label}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (q.type === 'match-pairs') {
    questionContent = `
      <h2 class="lesson-question">${q.question}</h2>
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px; margin-top:20px;">
        <div style="display:flex; flex-direction:column; gap:12px;">
          ${matchLefts.map(l => {
      const isMatched = matchedPairs.includes(l);
      const isSelected = matchSelectedLeft === l;
      return `
            <div class="lesson-option ${isSelected ? 'selected' : ''} ${isMatched ? 'matched d-disabled' : ''}"
                 onclick="${!isMatched ? `selectMatchPair('left', '${l.replace(/'/g, "\\'")}')` : ''}"
                 style="min-height: 64px; justify-content: center; padding: 12px; height: 100%;">
              <span style="font-size:16px; font-weight:700; display:flex; justify-content:center; align-items:center; width:100%; border-radius: 0; text-align: center;">${l}</span>
            </div>
            `;
    }).join('')}
        </div>
        <div style="display:flex; flex-direction:column; gap:12px;">
          ${matchRights.map(r => {
      const isMatched = matchedPairs.includes(r);
      const isSelected = matchSelectedRight === r;
      return `
            <div class="lesson-option ${isSelected ? 'selected' : ''} ${isMatched ? 'matched d-disabled' : ''}"
                 onclick="${!isMatched ? `selectMatchPair('right', '${r.replace(/'/g, "\\'")}')` : ''}"
                 style="min-height: 64px; justify-content: center; padding: 12px; height: 100%;">
              <span style="font-size:16px; font-weight:700; display:flex; justify-content:center; align-items:center; width:100%; border-radius: 0; text-align: center;">${r}</span>
            </div>
            `;
    }).join('')}
        </div>
      </div>
    `;
  }

  let footerClass = '';
  let footerContent = '';

  if (isChecked) {
    footerClass = isCorrect ? 'correct-footer' : 'wrong-footer';
    footerContent = `
      <div class="lesson-result">
        <div class="lesson-result-text ${isCorrect ? 'correct-text' : 'wrong-text'}">
          ${isCorrect ? '✓ Correct!' : '✗ Incorrect'}
        </div>
        ${!isCorrect ? `<div class="lesson-result-detail" style="color:#EA2B2B">Correct answer: <strong>${q.correctAnswer}</strong></div>` : ''}
        ${isCorrect && score.streak > 1 ? `<div class="lesson-result-detail" style="color:#58A700">🔥 ${score.streak} in a row!</div>` : ''}
      </div>
      <button class="btn ${isCorrect ? 'btn-green' : 'btn-blue'}" onclick="nextQuestion()">CONTINUE</button>
    `;
  } else {
    footerContent = `
      <button class="btn btn-white" onclick="skipQuestion()" style="min-width:120px">SKIP</button>
      <button class="btn ${selectedAnswer || answeredWords.length > 0 || q.type === 'match-pairs' ? 'btn-green' : 'btn-disabled'}" onclick="checkAnswer()" id="check-btn" style="min-width:140px">CHECK</button>
    `;
  }

  container.innerHTML = `
    <div class="lesson-header">
      <button class="lesson-close" onclick="exitLesson()">${icons.close}</button>
      <div class="lesson-progress">
        <div class="lesson-progress-fill" style="width:${progress}%"></div>
      </div>
      <div class="lesson-hearts">
        <span class="heart-icon">${icons.heart}</span>
        <span class="heart-count">${hearts}</span>
      </div>
    </div>
    <div class="lesson-content animate-in">
      ${questionContent}
    </div>
    <div class="lesson-footer ${footerClass}">
      ${footerContent}
    </div>
  `;
}

export function LessonPage() {
  return {
    html: `<div class="lesson-page" id="lesson-container"></div>`,
    init() {
      // Reset lesson state on mount
      activeQuestions = getLessonQuestions(AppState.user.language || 'Spanish');
      currentQ = 0;
      selectedAnswer = null;
      answeredWords = [];
      isChecked = false;
      isCorrect = false;
      score = { correct: 0, wrong: 0, streak: 0, bestStreak: 0 };

      const shuffle = (array: any[]) => array.sort(() => Math.random() - 0.5);

      const initMatchPairs = () => {
        const q = activeQuestions[currentQ];
        if (q.type === 'match-pairs' && q.pairs) {
          matchLefts = shuffle(q.pairs.map(p => p.left));
          matchRights = shuffle(q.pairs.map(p => p.right));
          matchedPairs = [];
          matchSelectedLeft = null;
          matchSelectedRight = null;
        }
      };

      initMatchPairs();
      renderQuestion();

      (window as any).selectMatchPair = (side: 'left' | 'right', val: string) => {
        if (side === 'left') matchSelectedLeft = matchSelectedLeft === val ? null : val;
        if (side === 'right') matchSelectedRight = matchSelectedRight === val ? null : val;

        const q = activeQuestions[currentQ];
        if (matchSelectedLeft && matchSelectedRight && q.pairs) {
          const isMatch = q.pairs.some(p => p.left === matchSelectedLeft && p.right === matchSelectedRight);
          if (isMatch) {
            matchedPairs.push(matchSelectedLeft, matchSelectedRight);
          } else {
            // mock error sound and shake
            const container = document.getElementById('lesson-container');
            if (container) {
              container.style.animation = 'none';
              container.offsetHeight; // trigger reflow
              container.style.animation = 'shake 0.4s ease';
            }
          }
          matchSelectedLeft = null;
          matchSelectedRight = null;

          if (matchedPairs.length === q.pairs.length * 2) {
            (window as any).checkAnswer(); // auto submit when full
            return;
          }
        }
        renderQuestion();
      };

      (window as any).selectAnswer = (label: string) => {
        if (isChecked) return;
        selectedAnswer = label;
        renderQuestion();
      };

      (window as any).addWord = (word: string, _idx: number) => {
        if (isChecked || answeredWords.includes(word)) return;
        answeredWords.push(word);
        selectedAnswer = answeredWords.join(' ');
        renderQuestion();
      };

      (window as any).removeWord = (idx: number) => {
        if (isChecked) return;
        answeredWords.splice(idx, 1);
        selectedAnswer = answeredWords.join(' ');
        renderQuestion();
      };

      (window as any).checkAnswer = () => {
        const q = activeQuestions[currentQ];
        if (q.type !== 'match-pairs' && !selectedAnswer && answeredWords.length === 0) return;
        if (q.type === 'match-pairs' && matchedPairs.length !== (q.pairs?.length || 0) * 2) return;

        isChecked = true;
        let answer = '';
        if (q.type === 'translate') answer = answeredWords.join(' ');
        else if (q.type === 'match-pairs') answer = 'MATCH_COMPLETE';
        else answer = selectedAnswer || '';

        isCorrect = q.type === 'match-pairs' ? true : answer === q.correctAnswer;

        try {
          // Play mock SFX
          const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioContext) {
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            if (isCorrect) {
              // Happy ding-ding
              osc.type = 'sine';
              osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
              osc.frequency.exponentialRampToValueAtTime(1318.51, ctx.currentTime + 0.1); // E6
              gain.gain.setValueAtTime(0, ctx.currentTime);
              gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
              gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
              osc.start(ctx.currentTime);
              osc.stop(ctx.currentTime + 0.3);
            } else {
              // Sad bonk
              osc.type = 'triangle';
              osc.frequency.setValueAtTime(300, ctx.currentTime);
              osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.2);
              gain.gain.setValueAtTime(0, ctx.currentTime);
              gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
              gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.4);
              osc.start(ctx.currentTime);
              osc.stop(ctx.currentTime + 0.4);

              // Shake animation
              const container = document.getElementById('lesson-container');
              if (container) {
                container.style.animation = 'none';
                container.offsetHeight; /* trigger reflow */
                container.style.animation = 'shake 0.4s ease';
              }
            }
          }
        } catch (e) { }

        if (isCorrect) {
          score.correct++;
          score.streak++;
          if (score.streak > score.bestStreak) score.bestStreak = score.streak;
        } else {
          score.wrong++;
          score.streak = 0;
          if (!AppState.user.isPremium) {
            AppState.update({ hearts: Math.max(0, AppState.user.hearts - 1) });
          }
        }
        renderQuestion();
      };

      (window as any).nextQuestion = () => {
        currentQ++;
        if (currentQ >= activeQuestions.length) {
          const xpEarned = score.correct * 5 + (score.bestStreak >= 3 ? 10 : 0);
          AppState.updateProgress({
            xp: AppState.activeProgress.xp + xpEarned,
            lessonsCompleted: AppState.activeProgress.lessonsCompleted + 1,
          });
          window.__router.navigate('/lesson-complete');
        } else {
          selectedAnswer = null;
          answeredWords = [];
          isChecked = false;
          isCorrect = false;
          initMatchPairs();
          renderQuestion();
        }
      };

      (window as any).skipQuestion = () => {
        score.wrong++;
        score.streak = 0;
        (window as any).nextQuestion();
      };

      (window as any).exitLesson = () => {
        (window as any).duoConfirm(
          'Are you sure you want to quit? All progress in this lesson will be lost.',
          () => window.__router.navigate('/learn'),
          '🚪', 'QUIT', 'STAY'
        );
      };

      (window as any).speak = () => {
        const q = activeQuestions[currentQ];
        if (q.sentence && 'speechSynthesis' in window) {
          const u = new SpeechSynthesisUtterance(q.sentence);
          u.lang = 'es-ES';
          u.rate = 0.85;
          speechSynthesis.speak(u);
        }
      };

      const keyHandler = (e: KeyboardEvent) => {
        if (!document.getElementById('lesson-container')) {
          document.removeEventListener('keydown', keyHandler);
          return;
        }
        if (isChecked) {
          if (e.key === 'Enter') (window as any).nextQuestion();
          return;
        }

        const q = activeQuestions[currentQ];
        if (q && (q.type === 'image-select' || q.type === 'fill-blank') && q.options) {
          const idx = parseInt(e.key) - 1;
          if (idx >= 0 && idx < q.options.length) {
            (window as any).selectAnswer(q.options[idx].label);
          }
        }
        if (e.key === 'Enter') (window as any).checkAnswer();
      };
      document.addEventListener('keydown', keyHandler);
    }
  };
}
