export interface GuidebookData {
    phrases: { native: string; trans: string; type: string }[];
    grammar: string;
    culture?: string;
}

export const guideData: Record<string, Record<number, GuidebookData>> = {
    'Spanish': {
        1: {
            phrases: [
                { native: 'Hola', trans: 'Hello', type: 'Greeting' },
                { native: 'Mucho gusto', trans: 'Nice to meet you', type: 'Greeting' },
                { native: 'Gracias', trans: 'Thank you', type: 'Polite Phrase' }
            ],
            grammar: 'In Spanish, nouns have gender! For example, "el niño" (the boy) is masculine, while "la niña" (the girl) is feminine. This also affects adjectives and articles.',
            culture: 'Did you know? In many Spanish-speaking countries, people greet each other with a single kiss on the cheek.'
        },
        2: {
            phrases: [
                { native: 'Yo bebo agua', trans: 'I drink water', type: 'Sentence' },
                { native: 'Tú comes pan', trans: 'You eat bread', type: 'Sentence' },
                { native: 'Ella es una mujer', trans: 'She is a woman', type: 'Sentence' }
            ],
            grammar: 'Verbs in Spanish change their endings based on the subject. For -er verbs like "comer" (to eat), it\'s "yo como", "tú comes", and "él/ella come".',
            culture: 'The word "Tú" is informal, used with friends. "Usted" is formal, used for respect!'
        },
        3: {
            phrases: [
                { native: '¿Dónde está...?', trans: 'Where is...?', type: 'Question' },
                { native: 'Yo necesito un taxi', trans: 'I need a taxi', type: 'Travel' },
                { native: 'El hotel', trans: 'The hotel', type: 'Vocabulary' }
            ],
            grammar: 'Spanish uses an inverted question mark (¿) at the beginning of questions to help you know the tone before you even start reading!',
            culture: 'Taxis in Spain are often white with a diagonal red stripe on the front doors.'
        }
    },
    'French': {
        1: {
            phrases: [
                { native: 'Bonjour', trans: 'Hello / Good morning', type: 'Greeting' },
                { native: 'Merci beaucoup', trans: 'Thank you very much', type: 'Polite Phrase' },
                { native: 'S\'il vous plaît', trans: 'Please', type: 'Polite Phrase' }
            ],
            grammar: 'French uses distinct articles for masculine (le) and feminine (la) nouns. Use "l\'" before nouns starting with a vowel, like "l\'eau" (the water).',
            culture: 'Saying "Bonjour" is extremely important when entering any shop in France; it\'s considered rude to skip it!'
        },
        2: {
            phrases: [
                { native: 'Je suis...', trans: 'I am...', type: 'Identity' },
                { native: 'Enchanté', trans: 'Nice to meet you', type: 'Greeting' },
                { native: 'Au revoir', trans: 'Goodbye', type: 'Farewell' }
            ],
            grammar: 'The verb "être" (to be) is irregular but essential: Je suis, tu es, il/elle est. Practice these early!',
            culture: 'French people often greet friends with "la bise" - a series of light air-kisses on the cheeks.'
        },
        3: {
            phrases: [
                { native: 'Le garçon mange', trans: 'The boy is eating', type: 'Sentence' },
                { native: 'La femme boit', trans: 'The woman is drinking', type: 'Sentence' },
                { native: 'Une pomme rouge', trans: 'A red apple', type: 'Description' }
            ],
            grammar: 'Ajectives in French usually come AFTER the noun. For example, "un chat noir" (a black cat) instead of "un noir chat".',
            culture: 'Apples are a staple in French cuisine, used in everything from Tarte Tatin to Cidre.'
        }
    },
    'German': {
        1: {
            phrases: [
                { native: 'Guten Tag', trans: 'Good day', type: 'Greeting' },
                { native: 'Danke schön', trans: 'Thank you very much', type: 'Polite Phrase' },
                { native: 'Bitte sehr', trans: 'You\'re welcome', type: 'Polite Phrase' }
            ],
            grammar: 'German has three genders: masculine (der), feminine (die), and neuter (das). All nouns are capitalized in German!',
            culture: 'Germans value punctuality highly. "Fünf Minuten vor der Zeit ist des Deutschen Pünktlichkeit" (Five minutes early is German punctuality).'
        },
        2: {
            phrases: [
                { native: 'Ich trinke Milch', trans: 'I drink milk', type: 'Sentence' },
                { native: 'Das Kind isst Brot', trans: 'The child eats bread', type: 'Sentence' },
                { native: 'Er ist ein Mann', trans: 'He is a man', type: 'Sentence' }
            ],
            grammar: 'Verb placement is key! In a simple statement, the conjugated verb always sits in the second position of the sentence.',
            culture: 'Bread (Brot) is a huge part of German culture, with over 3,000 different types recognized!'
        },
        3: {
            phrases: [
                { native: 'Wo ist...?', trans: 'Where is...?', type: 'Question' },
                { native: 'Ein Kaffee, bitte', trans: 'A coffee, please', type: 'Ordering' },
                { native: 'Entschuldigung', trans: 'Excuse me', type: 'Polite Phrase' }
            ],
            grammar: 'The German case system (Nominative, Accusative, etc.) changes the articles. "Der Kaffee" (subject) becomes "einen Kaffee" (object).',
            culture: 'Coffee breaks (Kaffeepause) are a traditional afternoon ritual in Germany, often accompanied by cake.'
        }
    },
    'Italian': {
        1: {
            phrases: [
                { native: 'Ciao', trans: 'Hello/Goodbye', type: 'Greeting' },
                { native: 'Grazie mille', trans: 'A thousand thanks', type: 'Polite Phrase' },
                { native: 'Piacere', trans: 'Pleasure (Nice to meet you)', type: 'Greeting' }
            ],
            grammar: 'Most Italian words end in a vowel. Nouns ending in -o are usually masculine, while those in -a are feminine.',
            culture: 'Italian is known as the "musical language" because so many terms in classical music are Italian!'
        },
        2: {
            phrases: [
                { native: 'Per favore', trans: 'Please', type: 'Polite Phrase' },
                { native: 'Io mangio', trans: 'I eat', type: 'Sentence' },
                { native: 'L’acqua', trans: 'The water', type: 'Vocabulary' }
            ],
            grammar: 'In Italian, you often drop the subject pronoun (like "io" or "tu") because the verb ending already tells you who is doing the action.',
            culture: 'Breakfast in Italy is usually light - a cornetto and a cappuccino at a local bar.'
        },
        3: {
            phrases: [
                { native: 'Dov’è...?', trans: 'Where is...?', type: 'Question' },
                { native: 'Un gelato, grazie', trans: 'A gelato, thanks', type: 'Ordering' },
                { native: 'Arrivederci', trans: 'Goodbye (Formal)', type: 'Farewell' }
            ],
            grammar: 'Articles like "il" and "la" change to "l’" before words starting with a vowel to make the language flow more smoothly.',
            culture: 'Italians are famous for using hand gestures to add emphasis and extra meaning to their speech.'
        }
    },
    'Japanese': {
        1: {
            phrases: [
                { native: 'こんにちは', trans: 'Hello', type: 'Greeting' },
                { native: 'ありがとうございます', trans: 'Thank you', type: 'Polite Phrase' },
                { native: 'はい', trans: 'Yes', type: 'Basic' }
            ],
            grammar: 'Japanese uses three writing systems: Hiragana, Katakana, and Kanji. In this unit, we start with Hiragana, the foundational script for native words.',
            culture: 'Bowing (ojigi) is an essential part of Japanese etiquette, used for greetings, thanks, and apologies.'
        },
        2: {
            phrases: [
                { native: 'コーヒー', trans: 'Coffee', type: 'Vocabulary' },
                { native: '水をください', trans: 'Water, please', type: 'Ordering' },
                { native: 'おいしいです', trans: 'It is delicious', type: 'Reaction' }
            ],
            grammar: 'The particle "o" (を) is used to mark the direct object of a sentence. Usually, the verb comes at the very end of the sentence in Japanese.',
            culture: 'Japan has a massive vending machine culture! You can find coffee, tea, and even hot meals in machines on almost every corner.'
        },
        3: {
            phrases: [
                { native: 'どこですか？', trans: 'Where is it?', type: 'Question' },
                { native: '駅', trans: 'Station', type: 'Travel' },
                { native: 'すみません', trans: 'Excuse me', type: 'Polite Phrase' }
            ],
            grammar: 'To turn a statement into a question, just add the particle "ka" (か) to the end of the sentence. It acts like a verbal question mark.',
            culture: 'The Shinkansen (Bullet Train) is famous for its punctuality and speed, connecting major cities across Japan.'
        }
    },
    'Korean': {
        1: {
            phrases: [
                { native: '안녕하세요', trans: 'Hello', type: 'Greeting' },
                { native: '감사합니다', trans: 'Thank you', type: 'Polite Phrase' },
                { native: '네', trans: 'Yes', type: 'Basic' }
            ],
            grammar: 'Korean uses an alphabet called Hangul. It was invented in 1443 to be easy to learn! Letters are grouped into syllable blocks.',
            culture: 'Using both hands when giving or receiving something is a sign of respect in Korean culture.'
        },
        2: {
            phrases: [
                { native: '저는...입니다', trans: 'I am...', type: 'Identity' },
                { native: '우유', trans: 'Milk', type: 'Vocabulary' },
                { native: '빵', trans: 'Bread', type: 'Vocabulary' }
            ],
            grammar: 'Korean uses particles to mark the role of words. "Eun/Neun" (은/는) marks the topic of the sentence.',
            culture: 'Korean food is often served with many "banchan" (small side dishes). Kimchi is the most famous one!'
        },
        3: {
            phrases: [
                { native: '어디예요?', trans: 'Where is it?', type: 'Question' },
                { native: '주세요', trans: 'Please give me', type: 'Request' },
                { native: '물', trans: 'Water', type: 'Vocabulary' }
            ],
            grammar: 'Korean has different levels of politeness. We start with the polite/formal "-yo" ending, which is safe for almost any situation.',
            culture: 'The Seoul subway system is one of the most efficient in the world, featuring heated seats in winter!'
        }
    },
    'Chinese': {
        1: {
            phrases: [
                { native: '你好', trans: 'Hello', type: 'Greeting' },
                { native: '谢谢', trans: 'Thank you', type: 'Polite Phrase' },
                { native: '不客气', trans: 'You\'re welcome', type: 'Polite Phrase' }
            ],
            grammar: 'Chinese is a tonal language. The same word can have different meanings depending on your pitch (Rising, Falling, etc.).',
            culture: 'Tea is a central part of Chinese life. The way you pour and serve tea shows your hospitality and respect.'
        },
        2: {
            phrases: [
                { native: '我喝水', trans: 'I drink water', type: 'Sentence' },
                { native: '他吃面包', trans: 'He eats bread', type: 'Sentence' },
                { native: '咖啡', trans: 'Coffee', type: 'Vocabulary' }
            ],
            grammar: 'Good news! Chinese verbs do not conjugate. "Eat" is the same whether it\'s I, you, or they. No past or future tense endings either!',
            culture: 'Chinese characters (Hanzi) are one of the oldest writing systems in the world, with each character representing a meaning.'
        },
        3: {
            phrases: [
                { native: '在哪里？', trans: 'Where is it?', type: 'Question' },
                { native: '多少钱？', trans: 'How much?', type: 'Question' },
                { native: '我要...', trans: 'I want...', type: 'Request' }
            ],
            grammar: 'Questions can be formed by adding "ma" (吗) at the end of a statement. It transforms "You are well" into "Are you well?".',
            culture: 'Red is the most popular color in China, symbolizing luck, joy, and prosperity.'
        }
    }
};

export function getGuideData(lang: string, unit: number): GuidebookData {
    const langData = guideData[lang] || guideData['Spanish'];
    // Fallback to unit 1 if requested unit doesn't exist
    return langData[unit] || langData[1];
}
