import { AppState } from '../state';
import { icons } from '../icons';
import type { QuestionData as Question } from '../lessonData';
import { lessonContent, getGenericQuestions } from '../lessonData';
import { playSound } from '../audio';

let isPracticeRound = false;

function getLessonQuestions(lang: string): Question[] {
  let completed = AppState.activeProgress.lessonsCompleted;
  isPracticeRound = false;

  const targetIdx = sessionStorage.getItem('targetLessonIdx');
  if (targetIdx !== null) {
    const idx = parseInt(targetIdx, 10);
    if (idx < completed) {
      isPracticeRound = true;
    }
    completed = idx;
    // Do not clear it yet, so if user refreshes it stays on the same lesson
  }

  // Calculate unit based on 5 nodes per unit (layout in learn.ts)
  const currentUnit = Math.floor(completed / 5) + 1;
  const lessonIdx = (completed % 5);

  if (lessonContent[lang] && lessonContent[lang][currentUnit]) {
    const unitContent = lessonContent[lang][currentUnit];
    return unitContent[lessonIdx % unitContent.length];
  }

  // Fallback to generic questions if the specific language/unit is missing
  return getGenericQuestions(lang, currentUnit, lessonIdx);
}


let activeQuestions: Question[] = [];
let currentQ = 0;
let selectedAnswer: string | null = null;
let answeredWords: string[] = [];
let isChecked = false;
let isCorrect = false;
let score = { correct: 0, wrong: 0, streak: 0, bestStreak: 0 };
let lessonStartTime = 0;

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
  const hasUnlimited = AppState.user.items && AppState.user.items.unlimitedHeartsExpiry && AppState.user.items.unlimitedHeartsExpiry > Date.now();
  const hearts = (isPremium || hasUnlimited) ? '∞' : AppState.user.hearts;

  const container = document.getElementById('lesson-container');
  if (!container) return;

  if (hearts === 0 && !isChecked) {
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center; padding: 20px; background: white;">
        <div style="font-size: 80px; margin-bottom: 20px;">💔</div>
        <h2 style="font-size: 28px; font-weight: 800; color: #4B4B4B; margin-bottom: 12px;">You're out of hearts!</h2>
        <p style="font-size: 17px; color: #777; margin-bottom: 32px; max-width: 400px; line-height: 1.5;">Refill your hearts to keep learning, or try Super Duolingo for unlimited hearts.</p>
        <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 300px;">
           <button class="btn btn-blue btn-full" onclick="window.__router.navigate('/shop')">REFILL HEARTS</button>
           <button class="btn btn-white btn-full" onclick="window.__router.navigate('/learn')">END SESSION</button>
        </div>
      </div>
    `;
    return;
  }

  let questionContent = '';

  if (q.type === 'image-select') {
    questionContent = `
      ${q.badge ? `<div class="lesson-badge"><div class="badge-dot"></div><span>${q.badge}</span></div>` : ''}
      <h2 class="lesson-question">${q.question}</h2>
      <div class="lesson-options">
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
      <div class="lesson-options">
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
    const mascotHtml = isCorrect 
      ? `<img src="/assets/animations/muddy_buddy.gif" style="width: 150px; height: 150px; object-fit: contain; margin-top: -60px; filter: drop-shadow(0 8px 16px rgba(0,0,0,0.15));" />` 
      : `<img src="/assets/animations/crying_baby.gif" style="width: 150px; height: 150px; object-fit: contain; margin-top: -60px; filter: drop-shadow(0 8px 16px rgba(0,0,0,0.15));" />`;
    footerContent = `
      <div class="feedback-mascot" style="margin-right: 24px;">
        ${mascotHtml}
      </div>
      <div class="lesson-result" style="flex: 1;">
        <div class="lesson-result-text ${isCorrect ? 'correct-text' : 'wrong-text'}">
          ${isCorrect ? '✓ Correct!' : '✗ Incorrect'}
        </div>
        ${!isCorrect ? `<div class="lesson-result-detail" style="color:#EA2B2B">Correct answer: <strong>${q.correctAnswer}</strong></div>` : ''}
        ${isCorrect && score.streak > 1 ? `<div class="lesson-result-detail" style="color:#58A700">🔥 ${score.streak} in a row!</div>` : ''}
      </div>
      <button class="btn ${isCorrect ? 'btn-green' : 'btn-red'}" onclick="nextQuestion()">CONTINUE</button>
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
      lessonStartTime = Date.now();

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
            playSound('pop');
            matchedPairs.push(matchSelectedLeft, matchSelectedRight);
          } else {
            playSound('wrong');
            // mock error shake
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
        playSound('pop');
        selectedAnswer = label;
        renderQuestion();
      };

      (window as any).addWord = (word: string, _idx: number) => {
        if (isChecked || answeredWords.includes(word)) return;
        playSound('pop');
        answeredWords.push(word);
        selectedAnswer = answeredWords.join(' ');
        renderQuestion();
      };

      (window as any).removeWord = (idx: number) => {
        if (isChecked) return;
        playSound('pop');
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

        if (isCorrect) {
          playSound('correct');
        } else {
          playSound('wrong');
          // Shake animation
          const container = document.getElementById('lesson-container');
          if (container) {
            container.style.animation = 'none';
            container.offsetHeight; /* trigger reflow */
            container.style.animation = 'shake 0.4s ease';
          }
        }

        if (isCorrect) {
          score.correct++;
          score.streak++;
          if (score.streak > score.bestStreak) score.bestStreak = score.streak;
        } else {
          score.wrong++;
          score.streak = 0;
          const isPremium = AppState.user.isPremium;
          const hasUnlimited = AppState.user.items && AppState.user.items.unlimitedHeartsExpiry && AppState.user.items.unlimitedHeartsExpiry > Date.now();
          if (!isPremium && !hasUnlimited) {
            AppState.update({ hearts: Math.max(0, AppState.user.hearts - 1) });
          }
        }
        renderQuestion();
      };

      (window as any).nextQuestion = () => {
        currentQ++;
        if (currentQ >= activeQuestions.length) {
          const xpEarned = score.correct * 5 + (score.bestStreak >= 3 ? 10 : 0);

          if (!isPracticeRound) {
            AppState.updateProgress({
              xp: AppState.activeProgress.xp + xpEarned,
              lessonsCompleted: AppState.activeProgress.lessonsCompleted + 1,
            });
          } else {
            AppState.updateProgress({ xp: AppState.activeProgress.xp + xpEarned });
          }

          // Clear target id so next time it defaults tracking correctly
          sessionStorage.removeItem('targetLessonIdx');

          const endTime = Date.now();
          const timeSpentMs = Math.max(0, endTime - lessonStartTime);
          const accuracyPercent = Math.round((score.correct / activeQuestions.length) * 100) || 0;
          sessionStorage.setItem('lessonStats', JSON.stringify({
            time: timeSpentMs,
            accuracy: accuracyPercent,
            xp: xpEarned,
            streak: score.bestStreak
          }));

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
