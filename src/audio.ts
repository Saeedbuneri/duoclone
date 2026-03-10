export function playSound(type: 'click' | 'correct' | 'wrong' | 'pop' | 'fanfare') {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        // We instantiate a new context per interaction, or we can keep a singleton
        // But for short UI sounds, a quick instantiation is usually fine or we keep a global one.
        if (!(window as any).__audioCtx) {
            (window as any).__audioCtx = new AudioContext();
        }
        const ctx = (window as any).__audioCtx as AudioContext;
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        if (type === 'click' || type === 'pop') {
            // Short friendly pop sound for clicking options/buttons
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.2, now + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

            osc.start(now);
            osc.stop(now + 0.1);
        }
        else if (type === 'correct') {
            // Happy ding-ding - like Duolingo
            // We need two notes: quick E5 then E6

            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.connect(gain2);
            gain2.connect(ctx.destination);

            // Note 1
            osc.type = 'sine';
            osc.frequency.setValueAtTime(659.25, now); // E5
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);

            // Note 2
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(1318.51, now + 0.1); // E6
            gain2.gain.setValueAtTime(0, now + 0.1);
            gain2.gain.linearRampToValueAtTime(0.3, now + 0.15);
            gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
            osc2.start(now + 0.1);
            osc2.stop(now + 0.4);
        }
        else if (type === 'wrong') {
            // Sad bonk 
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(150, now + 0.2);

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.4);

            osc.start(now);
            osc.stop(now + 0.4);
        }
        else if (type === 'fanfare') {
            // Duolingo style triad fanfare (e.g. C - E - G - C octave)
            const notes = [
                { freq: 523.25, time: 0, dur: 0.15 }, // C5
                { freq: 659.25, time: 0.15, dur: 0.15 }, // E5
                { freq: 783.99, time: 0.3, dur: 0.15 }, // G5
                { freq: 1046.50, time: 0.45, dur: 0.4 }, // C6
            ];

            notes.forEach(note => {
                const o = ctx.createOscillator();
                const g = ctx.createGain();
                o.type = 'sine';
                o.frequency.value = note.freq;
                o.connect(g);
                g.connect(ctx.destination);

                g.gain.setValueAtTime(0, now + note.time);
                g.gain.linearRampToValueAtTime(0.3, now + note.time + 0.05);
                g.gain.exponentialRampToValueAtTime(0.01, now + note.time + note.dur);

                o.start(now + note.time);
                o.stop(now + note.time + note.dur);
            });
        }
    } catch (e) {
        console.error('Audio play failed', e);
    }
}
