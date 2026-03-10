import { AppLayout } from '../components';
import { AppState } from '../state';

export function LettersPage() {
  const lang = AppState.user.language || 'Spanish';
  let title = `🔤 ${lang} Alphabet`;
  let ttsLang = 'es-ES';

  let vowels: any[] = [];
  let consonants: any[] = [];
  let specialSounds: any[] = [];

  if (lang === 'French') {
    ttsLang = 'fr-FR';
    vowels = [
      { char: 'A', sound: 'ah', example: 'ami', color: '#58CC02' },
      { char: 'E', sound: 'uh', example: 'le', color: '#58CC02' },
      { char: 'I', sound: 'ee', example: 'ici', color: '#58CC02' },
      { char: 'O', sound: 'oh', example: 'or', color: '#58CC02' },
      { char: 'U', sound: 'ew', example: 'tu', color: '#58CC02' },
    ];
    consonants = [
      { char: 'B', sound: 'beh', example: 'bonjour' },
      { char: 'C', sound: 'seh', example: 'chat' },
      { char: 'D', sound: 'deh', example: 'dans' },
      { char: 'F', sound: 'eff', example: 'fille' },
      { char: 'G', sound: 'zheh', example: 'garçon' },
      { char: 'H', sound: 'ash', example: 'homme' },
      { char: 'J', sound: 'zhee', example: 'je' },
      { char: 'L', sound: 'ell', example: 'loup' },
      { char: 'M', sound: 'emm', example: 'merci' },
      { char: 'N', sound: 'enn', example: 'nom' },
      { char: 'P', sound: 'peh', example: 'père' },
      { char: 'R', sound: 'air', example: 'rouge' },
      { char: 'S', sound: 'ess', example: 'soir' },
      { char: 'T', sound: 'teh', example: 'très' },
      { char: 'V', sound: 'veh', example: 'vous' },
    ];
    specialSounds = [
      { chars: 'Ç', sound: 'ss', example: 'façade', desc: 'Soft C sound' },
      { chars: 'Œ', sound: 'eu', example: 'cœur', desc: 'Ligature eu' },
      { chars: 'OU', sound: 'oo', example: 'oui', desc: 'Like "ou" in "you"' },
      { chars: 'OI', sound: 'wa', example: 'noir', desc: 'Like "wa" in "water"' },
    ];
  } else if (lang === 'German') {
    ttsLang = 'de-DE';
    vowels = [
      { char: 'A', sound: 'ah', example: 'Apfel', color: '#58CC02' },
      { char: 'E', sound: 'eh', example: 'Ente', color: '#58CC02' },
      { char: 'I', sound: 'ee', example: 'Igel', color: '#58CC02' },
      { char: 'O', sound: 'oh', example: 'Oma', color: '#58CC02' },
      { char: 'U', sound: 'oo', example: 'Uhr', color: '#58CC02' },
    ];
    consonants = [
      { char: 'B', sound: 'beh', example: 'Brot' },
      { char: 'D', sound: 'deh', example: 'Danke' },
      { char: 'F', sound: 'eff', example: 'Frau' },
      { char: 'G', sound: 'geh', example: 'Gut' },
      { char: 'H', sound: 'hah', example: 'Hallo' },
      { char: 'J', sound: 'yot', example: 'Ja' },
      { char: 'K', sound: 'kah', example: 'Käse' },
      { char: 'L', sound: 'ell', example: 'Liebe' },
      { char: 'M', sound: 'emm', example: 'Mann' },
      { char: 'N', sound: 'enn', example: 'Nein' },
      { char: 'R', sound: 'err', example: 'Rot' },
      { char: 'S', sound: 'ess', example: 'Sonne' },
      { char: 'T', sound: 'teh', example: 'Tag' },
      { char: 'V', sound: 'fow', example: 'Vater' },
      { char: 'W', sound: 'veh', example: 'Wasser' },
      { char: 'Z', sound: 'tset', example: 'Zeit' },
    ];
    specialSounds = [
      { chars: 'Ä', sound: 'eh', example: 'Äpfel', desc: 'A-Umlaut' },
      { chars: 'Ö', sound: 'eu', example: 'Öl', desc: 'O-Umlaut' },
      { chars: 'Ü', sound: 'ue', example: 'Über', desc: 'U-Umlaut' },
      { chars: 'ß', sound: 'ss', example: 'Straße', desc: 'Eszett' },
    ];
  } else if (lang === 'Japanese') {
    title = `あ Hiragana & Katakana`;
    ttsLang = 'ja-JP';
    vowels = [
      { char: 'あ', sound: 'a', example: 'asa', color: '#58CC02' },
      { char: 'い', sound: 'i', example: 'ichi', color: '#58CC02' },
      { char: 'う', sound: 'u', example: 'umi', color: '#58CC02' },
      { char: 'え', sound: 'e', example: 'eki', color: '#58CC02' },
      { char: 'お', sound: 'o', example: 'onna', color: '#58CC02' },
    ];
    consonants = [
      { char: 'か', sound: 'ka', example: 'kami' },
      { char: 'き', sound: 'ki', example: 'kita' },
      { char: 'く', sound: 'ku', example: 'kuma' },
      { char: 'け', sound: 'ke', example: 'keru' },
      { char: 'こ', sound: 'ko', example: 'koko' },
      { char: 'さ', sound: 'sa', example: 'saru' },
      { char: 'し', sound: 'shi', example: 'shika' },
      { char: 'す', sound: 'su', example: 'sushi' },
      { char: 'せ', sound: 'se', example: 'sensei' },
      { char: 'そ', sound: 'so', example: 'sora' },
      { char: 'た', sound: 'ta', example: 'tako' },
      { char: 'ち', sound: 'chi', example: 'chichi' },
      { char: 'つ', sound: 'tsu', example: 'tsuki' },
      { char: 'て', sound: 'te', example: 'tera' },
      { char: 'と', sound: 'to', example: 'tori' },
      { char: 'な', sound: 'na', example: 'neko' },
    ];
    specialSounds = [];
  } else {
    vowels = [
      { char: 'A', sound: 'ah', example: 'agua', color: '#58CC02' },
      { char: 'E', sound: 'eh', example: 'es', color: '#58CC02' },
      { char: 'I', sound: 'ee', example: 'isla', color: '#58CC02' },
      { char: 'O', sound: 'oh', example: 'ojo', color: '#58CC02' },
      { char: 'U', sound: 'oo', example: 'uno', color: '#58CC02' },
    ];
    consonants = [
      { char: 'B', sound: 'beh', example: 'bueno' },
      { char: 'C', sound: 'seh', example: 'café' },
      { char: 'D', sound: 'deh', example: 'donde' },
      { char: 'F', sound: 'eh-feh', example: 'famoso' },
      { char: 'G', sound: 'heh', example: 'grande' },
      { char: 'H', sound: 'ah-cheh', example: 'hola' },
      { char: 'J', sound: 'ho-tah', example: 'jugo' },
      { char: 'L', sound: 'eh-leh', example: 'libro' },
      { char: 'M', sound: 'eh-meh', example: 'mujer' },
      { char: 'N', sound: 'eh-neh', example: 'noche' },
      { char: 'Ñ', sound: 'en-yeh', example: 'niño' },
      { char: 'P', sound: 'peh', example: 'pan' },
      { char: 'Q', sound: 'koo', example: 'que' },
      { char: 'R', sound: 'eh-reh', example: 'rojo' },
      { char: 'S', sound: 'eh-seh', example: 'sol' },
      { char: 'T', sound: 'teh', example: 'taco' },
      { char: 'V', sound: 'oo-beh', example: 'verde' },
    ];
    specialSounds = [
      { chars: 'CH', sound: 'cheh', example: 'chocolate', desc: 'Like "ch" in "chair"' },
      { chars: 'LL', sound: 'yeh', example: 'llamar', desc: 'Like "y" in "yes"' },
      { chars: 'RR', sound: 'rolled r', example: 'perro', desc: 'Rolled/trilled R' },
      { chars: 'GU', sound: 'gweh', example: 'guitarra', desc: 'Hard "g" before e/i' },
      { chars: 'QU', sound: 'keh', example: 'queso', desc: 'Like "k" (silent u)' },
    ];
  }

  const renderLetterCard = (l: { char: string; sound: string; example: string; color?: string }, i: number) => `
    <div class="animate-in" style="animation-delay:${i * 0.015}s;border:2px solid #E5E5E5;border-radius:12px;padding:14px 8px;text-align:center;cursor:pointer;transition:all 0.2s;border-bottom:4px solid #E5E5E5"
         onmouseenter="this.style.background='#DDF4FF';this.style.borderColor='#1CB0F6';this.style.borderBottomColor='#1581b3'"
         onmouseleave="this.style.background='';this.style.borderColor='#E5E5E5';this.style.borderBottomColor='#E5E5E5'"
         onclick="speakLetter('${l.example}')">
      <div style="font-size:30px;font-weight:800;color:${l.color || '#4B4B4B'}">${l.char}</div>
      <div style="font-size:12px;color:#AFAFAF;font-weight:700;margin-top:2px">${l.sound}</div>
      <div style="font-size:12px;color:#1CB0F6;font-weight:700;margin-top:4px">"${l.example}"</div>
    </div>
  `;

  const content = `
    <div style="padding:0">
      <div style="text-align:center;padding:30px 20px 16px" class="animate-in">
        <h2 style="font-size:26px;font-weight:800;color:#4B4B4B">${title}</h2>
        <p style="font-size:14px;color:#AFAFAF;margin-top:4px">Tap any letter to hear its pronunciation</p>
      </div>

      <div style="padding:0 20px 10px">
        <h3 style="font-size:14px;font-weight:800;color:#AFAFAF;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;padding-bottom:8px;border-bottom:2px solid #E5E5E5">Vowels</h3>
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:20px">
          ${vowels.map((l, i) => renderLetterCard(l, i)).join('')}
        </div>
      </div>

      <div style="padding:0 20px 10px">
        <h3 style="font-size:14px;font-weight:800;color:#AFAFAF;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;padding-bottom:8px;border-bottom:2px solid #E5E5E5">Consonants</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:8px;margin-bottom:20px">
          ${consonants.map((l, i) => renderLetterCard(l, i)).join('')}
        </div>
      </div>

      <div style="padding:0 20px 20px">
        <h3 style="font-size:14px;font-weight:800;color:#AFAFAF;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;padding-bottom:8px;border-bottom:2px solid #E5E5E5">Special Sounds</h3>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${specialSounds.map((s, i) => `
            <div class="animate-in" style="animation-delay:${i * 0.04}s;display:flex;align-items:center;gap:16px;padding:14px 16px;border:2px solid #E5E5E5;border-radius:12px;cursor:pointer;border-bottom:4px solid #E5E5E5;transition:all 0.2s"
                 onmouseenter="this.style.background='#DDF4FF'" onmouseleave="this.style.background=''"
                 onclick="speakLetter('${s.example}')">
              <div style="font-size:26px;font-weight:800;color:#CE82FF;min-width:50px">${s.chars}</div>
              <div style="flex:1">
                <div style="font-size:15px;font-weight:700;color:#4B4B4B">${s.desc}</div>
                <div style="font-size:13px;color:#AFAFAF;margin-top:2px">Example: "${s.example}" (${s.sound})</div>
              </div>
              <div style="font-size:22px">🔊</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  return {
    html: AppLayout('letters', content),
    init() {
      (window as any).speakLetter = (word: string) => {
        if ('speechSynthesis' in window) {
          const u = new SpeechSynthesisUtterance(word);
          u.lang = ttsLang;
          u.rate = 0.8;
          speechSynthesis.speak(u);
        }
      };
    }
  };
}
