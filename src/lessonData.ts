export interface QuestionData {
    type: 'image-select' | 'translate' | 'fill-blank' | 'match-pairs' | 'listen-tap';
    badge?: string;
    question: string;
    options?: { img?: string; label: string; key: string }[];
    words?: string[];
    correctAnswer: string;
    sentence?: string;
    hint?: string;
    pairs?: { left: string; right: string }[];
}

interface UnitData {
    name: string;
    words: { term: string; trans: string; img: string; }[];
    phrases: { native: string; trans: string; wrongWords: string[] }[];
    blanks: { sentence: string; trans: string; answer: string; wrong: string[] }[];
}

const db: Record<string, Record<number, UnitData>> = {
    'Spanish': {
        1: {
            name: 'Basics',
            words: [{ term: 'café', trans: 'coffee', img: '☕' }, { term: 'agua', trans: 'water', img: '💧' }, { term: 'pan', trans: 'bread', img: '🥖' }, { term: 'leche', trans: 'milk', img: '🥛' }, { term: 'niño', trans: 'boy', img: '👦' }, { term: 'niña', trans: 'girl', img: '👧' }, { term: 'manzana', trans: 'apple', img: '🍎' }],
            phrases: [
                { native: 'El niño come pan.', trans: 'The boy eats bread.', wrongWords: ['girl', 'drinks', 'water', 'she'] },
                { native: 'Yo bebo agua.', trans: 'I drink water.', wrongWords: ['He', 'eats', 'bread', 'you'] },
                { native: 'La niña bebe leche.', trans: 'The girl drinks milk.', wrongWords: ['boy', 'eats', 'apple', 'they'] },
                { native: 'Tú comes pan.', trans: 'You eat bread.', wrongWords: ['I', 'drink', 'water', 'he'] },
                { native: 'Ella come una manzana.', trans: 'She eats an apple.', wrongWords: ['He', 'drinks', 'milk', 'we'] }
            ],
            blanks: [
                { sentence: 'Yo ___ agua.', trans: 'I drink water.', answer: 'bebo', wrong: ['bebe', 'bebes'] },
                { sentence: 'El ___ come pan.', trans: 'The boy eats bread.', answer: 'niño', wrong: ['niña', 'mujer'] },
                { sentence: 'La niña ___ leche.', trans: 'The girl drinks milk.', answer: 'bebe', wrong: ['bebo', 'bebes'] },
                { sentence: 'Tú ___ pan.', trans: 'You eat bread.', answer: 'comes', wrong: ['como', 'come'] }
            ]
        },
        2: {
            name: 'Greetings',
            words: [{ term: 'Hola', trans: 'Hello', img: '👋' }, { term: 'Adiós', trans: 'Bye', img: '🚪' }, { term: 'Gracias', trans: 'Thanks', img: '🙏' }, { term: 'Perdón', trans: 'Excuse me', img: '🙇' }, { term: 'Sí', trans: 'Yes', img: '👍' }, { term: 'No', trans: 'No', img: '👎' }],
            phrases: [
                { native: 'Hola, mucho gusto.', trans: 'Hello, nice to meet you.', wrongWords: ['Bye', 'bad', 'morning', 'pleasure'] },
                { native: 'Sí, por favor.', trans: 'Yes, please.', wrongWords: ['No', 'thanks', 'sorry', 'bye'] },
                { native: 'No, gracias.', trans: 'No, thank you.', wrongWords: ['Yes', 'please', 'hello', 'man'] },
                { native: 'Buenos días.', trans: 'Good morning.', wrongWords: ['night', 'afternoon', 'bad', 'day'] },
                { native: 'Perdón, lo siento.', trans: 'Excuse me, I am sorry.', wrongWords: ['Thanks', 'welcome', 'no', 'yes'] }
            ],
            blanks: [
                { sentence: 'Hola, buenas ___.', trans: 'Hello, good afternoon.', answer: 'tardes', wrong: ['días', 'noches'] },
                { sentence: 'Sí, por ___.', trans: 'Yes, please.', answer: 'favor', wrong: ['gracias', 'perdón'] },
                { sentence: 'No, ___.', trans: 'No, thank you.', answer: 'gracias', wrong: ['por favor', 'hola'] },
                { sentence: 'Mucho ___.', trans: 'Nice to meet you.', answer: 'gusto', wrong: ['gracias', 'perdón'] }
            ]
        },
        3: {
            name: 'Food',
            words: [{ term: 'sal', trans: 'salt', img: '🧂' }, { term: 'azúcar', trans: 'sugar', img: '🍬' }, { term: 'naranja', trans: 'orange', img: '🍊' }, { term: 'huevo', trans: 'egg', img: '🥚' }, { term: 'queso', trans: 'cheese', img: '🧀' }],
            phrases: [
                { native: 'Yo quiero una naranja.', trans: 'I want an orange.', wrongWords: ['He', 'wants', 'apple', 'they'] },
                { native: 'El queso y el pan.', trans: 'The cheese and the bread.', wrongWords: ['milk', 'water', 'or', 'he'] },
                { native: 'Con sal, por favor.', trans: 'With salt, please.', wrongWords: ['Without', 'sugar', 'no', 'thanks'] },
                { native: 'Yo no quiero azúcar.', trans: 'I do not want sugar.', wrongWords: ['He', 'wants', 'salt', 'with'] }
            ],
            blanks: [
                { sentence: 'Yo ___ un huevo.', trans: 'I want an egg.', answer: 'quiero', wrong: ['quiere', 'quieres'] },
                { sentence: 'Una taza de ___, por favor.', trans: 'A cup of coffee, please.', answer: 'café', wrong: ['sal', 'queso'] },
                { sentence: 'El hombre come ___.', trans: 'The man eats cheese.', answer: 'queso', wrong: ['agua', 'sal'] }
            ]
        },
        4: {
            name: 'Family',
            words: [{ term: 'padre', trans: 'father', img: '👨' }, { term: 'madre', trans: 'mother', img: '👩' }, { term: 'hermano', trans: 'brother', img: '👦' }, { term: 'hermana', trans: 'sister', img: '👧' }, { term: 'abuelo', trans: 'grandfather', img: '👴' }],
            phrases: [
                { native: 'Mi padre es inteligente.', trans: 'My father is smart.', wrongWords: ['mother', 'tall', 'brother', 'your'] },
                { native: 'Tienes una hermana.', trans: 'You have a sister.', wrongWords: ['I', 'brother', 'has', 'two'] },
                { native: 'Su hermano vive en México.', trans: 'His brother lives in Mexico.', wrongWords: ['father', 'eats', 'my', 'Spain'] }
            ],
            blanks: [
                { sentence: 'Mi ___ es alto.', trans: 'My father is tall.', answer: 'padre', wrong: ['madre', 'hermana'] },
                { sentence: 'Yo tengo un ___.', trans: 'I have a brother.', answer: 'hermano', wrong: ['hermana', 'madre'] },
                { sentence: 'Ella ___ hermanos.', trans: 'She has brothers.', answer: 'tiene', wrong: ['tengo', 'tienes'] }
            ]
        },
        5: {
            name: 'Travel',
            words: [{ term: 'hotel', trans: 'hotel', img: '🏨' }, { term: 'taxi', trans: 'taxi', img: '🚕' }, { term: 'aeropuerto', trans: 'airport', img: '✈️' }, { term: 'tren', trans: 'train', img: '🚆' }, { term: 'pasaporte', trans: 'passport', img: '🛂' }],
            phrases: [
                { native: '¿Dónde está el hotel?', trans: 'Where is the hotel?', wrongWords: ['airport', 'When', 'train'] },
                { native: 'Yo necesito un taxi.', trans: 'I need a taxi.', wrongWords: ['He', 'needs', 'bus', 'train'] },
                { native: 'Tengo un pasaporte.', trans: 'I have a passport.', wrongWords: ['ticket', 'He', 'has', 'airport'] }
            ],
            blanks: [
                { sentence: 'El ___ al aeropuerto.', trans: 'The taxi to the airport.', answer: 'taxi', wrong: ['pasaporte', 'hotel'] },
                { sentence: 'Yo necesito mi ___.', trans: 'I need my passport.', answer: 'pasaporte', wrong: ['tren', 'taxi'] }
            ]
        },
        6: {
            name: 'Shopping',
            words: [{ term: 'tienda', trans: 'store', img: '🛍️' }, { term: 'camisa', trans: 'shirt', img: '👕' }, { term: 'zapato', trans: 'shoe', img: '👞' }, { term: 'vestido', trans: 'dress', img: '👗' }],
            phrases: [
                { native: 'La camisa es muy cara.', trans: 'The shirt is very expensive.', wrongWords: ['shoe', 'cheap', 'large', 'dress'] },
                { native: 'Yo pago con tarjeta.', trans: 'I pay with card.', wrongWords: ['cash', 'He', 'pays'] }
            ],
            blanks: [
                { sentence: 'La ___ azul.', trans: 'The blue shirt.', answer: 'camisa', wrong: ['zapato', 'tienda'] },
                { sentence: 'Es muy ___.', trans: 'It is very expensive.', answer: 'caro', wrong: ['pago', 'tarjeta'] }
            ]
        }
    },
    'French': {
        1: {
            name: 'Bases',
            words: [{ term: 'café', trans: 'coffee', img: '☕' }, { term: 'eau', trans: 'water', img: '💧' }, { term: 'pain', trans: 'bread', img: '🥖' }, { term: 'lait', trans: 'milk', img: '🥛' }, { term: 'garçon', trans: 'boy', img: '👦' }, { term: 'fille', trans: 'girl', img: '👧' }, { term: 'pomme', trans: 'apple', img: '🍎' }],
            phrases: [
                { native: 'Le garçon mange du pain.', trans: 'The boy eats bread.', wrongWords: ['girl', 'drinks', 'water', 'she'] },
                { native: 'Je bois de l\'eau.', trans: 'I drink water.', wrongWords: ['He', 'eats', 'bread', 'you'] },
                { native: 'La fille boit du lait.', trans: 'The girl drinks milk.', wrongWords: ['boy', 'eats', 'apple', 'they'] },
                { native: 'Tu manges une pomme.', trans: 'You eat an apple.', wrongWords: ['I', 'drink', 'water', 'he'] }
            ],
            blanks: [
                { sentence: 'Je ___ de l\'eau.', trans: 'I drink water.', answer: 'bois', wrong: ['boit', 'mange'] },
                { sentence: 'Le ___ mange du pain.', trans: 'The boy eats bread.', answer: 'garçon', wrong: ['fille', 'femme'] },
                { sentence: 'La fille ___ du lait.', trans: 'The girl drinks milk.', answer: 'boit', wrong: ['bois', 'manges'] },
                { sentence: 'Tu ___ du pain.', trans: 'You eat bread.', answer: 'manges', wrong: ['mange', 'mangeons'] }
            ]
        },
        2: {
            name: 'Salutations',
            words: [{ term: 'Bonjour', trans: 'Hello', img: '👋' }, { term: 'Au revoir', trans: 'Bye', img: '🚪' }, { term: 'Merci', trans: 'Thanks', img: '🙏' }, { term: 'Pardon', trans: 'Excuse me', img: '🙇' }, { term: 'Oui', trans: 'Yes', img: '👍' }, { term: 'Non', trans: 'No', img: '👎' }],
            phrases: [
                { native: 'Bonjour, enchanté.', trans: 'Hello, nice to meet you.', wrongWords: ['Bye', 'bad', 'morning', 'pleasure'] },
                { native: 'Oui, s\'il vous plaît.', trans: 'Yes, please.', wrongWords: ['No', 'thanks', 'sorry', 'bye'] },
                { native: 'Non, merci.', trans: 'No, thank you.', wrongWords: ['Yes', 'please', 'hello', 'man'] },
                { native: 'Bonsoir.', trans: 'Good evening.', wrongWords: ['night', 'afternoon', 'bad', 'day'] }
            ],
            blanks: [
                { sentence: 'Oui, s\'il vous ___.', trans: 'Yes, please.', answer: 'plaît', wrong: ['merci', 'bonjour'] },
                { sentence: 'Non, ___.', trans: 'No, thank you.', answer: 'merci', wrong: ['pardon', 'oui'] },
                { sentence: '___, enchanté.', trans: 'Hello, nice to meet you.', answer: 'Bonjour', wrong: ['Merci', 'Pardon'] }
            ]
        },
        3: {
            name: 'Nourriture',
            words: [{ term: 'sel', trans: 'salt', img: '🧂' }, { term: 'sucre', trans: 'sugar', img: '🍬' }, { term: 'orange', trans: 'orange', img: '🍊' }, { term: 'oeuf', trans: 'egg', img: '🥚' }, { term: 'fromage', trans: 'cheese', img: '🧀' }],
            phrases: [
                { native: 'Je veux une orange.', trans: 'I want an orange.', wrongWords: ['He', 'wants', 'apple', 'they'] },
                { native: 'Le fromage et le pain.', trans: 'The cheese and the bread.', wrongWords: ['milk', 'water', 'or', 'he'] },
                { native: 'Avec du sel, s\'il vous plaît.', trans: 'With salt, please.', wrongWords: ['Without', 'sugar', 'no', 'thanks'] }
            ],
            blanks: [
                { sentence: 'Je ___ un oeuf.', trans: 'I want an egg.', answer: 'veux', wrong: ['veut', 'voulons'] },
                { sentence: 'Une tasse de ___, s\'il vous plaît.', trans: 'A cup of coffee, please.', answer: 'café', wrong: ['sel', 'fromage'] }
            ]
        },
        4: {
            name: 'Famille',
            words: [{ term: 'père', trans: 'father', img: '👨' }, { term: 'mère', trans: 'mother', img: '👩' }, { term: 'frère', trans: 'brother', img: '👦' }, { term: 'sœur', trans: 'sister', img: '👧' }, { term: 'oncle', trans: 'uncle', img: '👨' }],
            phrases: [
                { native: 'Mon père est intelligent.', trans: 'My father is smart.', wrongWords: ['mother', 'tall', 'brother', 'your'] },
                { native: 'Tu as une sœur.', trans: 'You have a sister.', wrongWords: ['I', 'brother', 'has', 'two'] }
            ],
            blanks: [
                { sentence: 'Mon ___ est grand.', trans: 'My father is tall.', answer: 'père', wrong: ['mère', 'sœur'] },
                { sentence: 'J\'ai un ___.', trans: 'I have a brother.', answer: 'frère', wrong: ['sœur', 'mère'] }
            ]
        },
        5: {
            name: 'Voyage',
            words: [{ term: 'hôtel', trans: 'hotel', img: '🏨' }, { term: 'taxi', trans: 'taxi', img: '🚕' }, { term: 'aéroport', trans: 'airport', img: '✈️' }, { term: 'train', trans: 'train', img: '🚆' }],
            phrases: [
                { native: 'Où est l\'hôtel ?', trans: 'Where is the hotel?', wrongWords: ['airport', 'When', 'train'] },
                { native: 'J\'ai besoin d\'un taxi.', trans: 'I need a taxi.', wrongWords: ['He', 'needs', 'bus', 'train'] }
            ],
            blanks: [
                { sentence: 'Où est le ___ ?', trans: 'Where is the taxi?', answer: 'taxi', wrong: ['hôtel', 'train'] }
            ]
        },
        6: {
            name: 'Shopping',
            words: [{ term: 'magasin', trans: 'store', img: '🛍️' }, { term: 'chemise', trans: 'shirt', img: '👕' }, { term: 'chapeau', trans: 'hat', img: '👒' }],
            phrases: [
                { native: 'Le magasin est ouvert.', trans: 'The store is open.', wrongWords: ['shoe', 'closed', 'large', 'dress'] }
            ],
            blanks: [
                { sentence: 'La ___ bleue.', trans: 'The blue shirt.', answer: 'chemise', wrong: ['chapeau', 'magasin'] }
            ]
        }
    },
    'German': {
        1: {
            name: 'Grundlagen',
            words: [{ term: 'Kaffee', trans: 'coffee', img: '☕' }, { term: 'Wasser', trans: 'water', img: '💧' }, { term: 'Brot', trans: 'bread', img: '🥖' }, { term: 'Milch', trans: 'milk', img: '🥛' }, { term: 'Junge', trans: 'boy', img: '👦' }, { term: 'Mädchen', trans: 'girl', img: '👧' }],
            phrases: [
                { native: 'Der Junge isst Brot.', trans: 'The boy eats bread.', wrongWords: ['girl', 'drinks', 'water', 'she'] },
                { native: 'Ich trinke Wasser.', trans: 'I drink water.', wrongWords: ['He', 'eats', 'bread', 'you'] },
                { native: 'Das Mädchen trinkt Milch.', trans: 'The girl drinks milk.', wrongWords: ['boy', 'eats', 'apple', 'they'] }
            ],
            blanks: [
                { sentence: 'Ich ___ Wasser.', trans: 'I drink water.', answer: 'trinke', wrong: ['trinkt', 'essen'] },
                { sentence: 'Der ___ isst Brot.', trans: 'The boy eats bread.', answer: 'Junge', wrong: ['Mädchen', 'Frau'] },
                { sentence: 'Das Mädchen ___ Milch.', trans: 'The girl drinks milk.', answer: 'trinkt', wrong: ['trinke', 'isst'] }
            ]
        },
        2: {
            name: 'Grüße',
            words: [{ term: 'Hallo', trans: 'Hello', img: '👋' }, { term: 'Tschüss', trans: 'Bye', img: '🚪' }, { term: 'Danke', trans: 'Thanks', img: '🙏' }, { term: 'Entschuldigung', trans: 'Excuse me', img: '🙇' }, { term: 'Ja', trans: 'Yes', img: '👍' }, { term: 'Nein', trans: 'No', img: '👎' }],
            phrases: [
                { native: 'Hallo, freut mich.', trans: 'Hello, nice to meet you.', wrongWords: ['Bye', 'bad', 'morning', 'pleasure'] },
                { native: 'Ja, bitte.', trans: 'Yes, please.', wrongWords: ['No', 'thanks', 'sorry', 'bye'] },
                { native: 'Nein, danke.', trans: 'No, thank you.', wrongWords: ['Yes', 'please', 'hello', 'man'] }
            ],
            blanks: [
                { sentence: 'Ja, ___.', trans: 'Yes, please.', answer: 'bitte', wrong: ['danke', 'Hallo'] },
                { sentence: 'Nein, ___.', trans: 'No, thank you.', answer: 'danke', wrong: ['bitte', 'Tschüss'] }
            ]
        },
        3: {
            name: 'Essen',
            words: [{ term: 'Salz', trans: 'salt', img: '🧂' }, { term: 'Zucker', trans: 'sugar', img: '🍬' }, { term: 'Apfel', trans: 'apple', img: '🍎' }, { term: 'Ei', trans: 'egg', img: '🥚' }],
            phrases: [
                { native: 'Ich möchte einen Apfel.', trans: 'I would like an apple.', wrongWords: ['He', 'wants', 'orange', 'they'] },
                { native: 'Mit Salz, bitte.', trans: 'With salt, please.', wrongWords: ['Without', 'sugar', 'no', 'thanks'] }
            ],
            blanks: [
                { sentence: 'Ich ___ ein Ei.', trans: 'I want an egg.', answer: 'möchte', wrong: ['möchten', 'isst'] },
                { sentence: 'Mit ___, bitte.', trans: 'With sugar, please.', answer: 'Zucker', wrong: ['Kaffee', 'Apfel'] }
            ]
        },
        4: {
            name: 'Familie',
            words: [{ term: 'Vater', trans: 'father', img: '👨' }, { term: 'Mutter', trans: 'mother', img: '👩' }, { term: 'Bruder', trans: 'brother', img: '👦' }, { term: 'Schwester', trans: 'sister', img: '👧' }],
            phrases: [
                { native: 'Mein Vater ist klug.', trans: 'My father is smart.', wrongWords: ['mother', 'tall', 'brother', 'your'] }
            ],
            blanks: [
                { sentence: 'Meine ___ ist schön.', trans: 'My mother is beautiful.', answer: 'Mutter', wrong: ['Vater', 'Bruder'] }
            ]
        },
        5: { name: 'Reisen', words: [{ term: 'Hotel', trans: 'hotel', img: '🏨' }, { term: 'Taxi', trans: 'taxi', img: '🚕' }, { term: 'Zug', trans: 'train', img: '🚆' }], phrases: [{ native: 'Wo ist das Hotel?', trans: 'Where is the hotel?', wrongWords: ['airport', 'When', 'train'] }], blanks: [{ sentence: 'Wo ist das ___?', trans: 'Where is the taxi?', answer: 'Taxi', wrong: ['Hotel', 'Zug'] }] },
        6: { name: 'Einkaufen', words: [{ term: 'Laden', trans: 'store', img: '🛍️' }, { term: 'Hemd', trans: 'shirt', img: '👕' }, { term: 'Schuh', trans: 'shoe', img: '👞' }], phrases: [{ native: 'Das Hemd ist teuer.', trans: 'The shirt is expensive.', wrongWords: ['shoe', 'cheap', 'large', 'dress'] }], blanks: [{ sentence: 'Das ___ ist blau.', trans: 'The shirt is blue.', answer: 'Hemd', wrong: ['Laden', 'Schuh'] }] }
    },
    'Italian': {
        1: {
            name: 'Basi',
            words: [{ term: 'caffè', trans: 'coffee', img: '☕' }, { term: 'acqua', trans: 'water', img: '💧' }, { term: 'pane', trans: 'bread', img: '🥖' }, { term: 'latte', trans: 'milk', img: '🥛' }, { term: 'ragazzo', trans: 'boy', img: '👦' }, { term: 'ragazza', trans: 'girl', img: '👧' }],
            phrases: [
                { native: 'Il ragazzo mangia il pane.', trans: 'The boy eats the bread.', wrongWords: ['girl', 'drinks', 'water', 'she'] },
                { native: 'Io bevo acqua.', trans: 'I drink water.', wrongWords: ['He', 'eats', 'bread', 'you'] },
                { native: 'La ragazza beve latte.', trans: 'The girl drinks milk.', wrongWords: ['boy', 'eats', 'apple', 'they'] }
            ],
            blanks: [
                { sentence: 'Io ___ acqua.', trans: 'I drink water.', answer: 'bevo', wrong: ['beve', 'mangio'] },
                { sentence: 'Il ___ mangia il pane.', trans: 'The boy eats the bread.', answer: 'ragazzo', wrong: ['ragazza', 'donna'] },
                { sentence: 'La ragazza ___ latte.', trans: 'The girl drinks milk.', answer: 'beve', wrong: ['bevo', 'mangi'] }
            ]
        },
        2: {
            name: 'Saluti',
            words: [{ term: 'Ciao', trans: 'Hello', img: '👋' }, { term: 'Arrivederci', trans: 'Bye', img: '🚪' }, { term: 'Grazie', trans: 'Thanks', img: '🙏' }, { term: 'Scusa', trans: 'Excuse me', img: '🙇' }, { term: 'Sì', trans: 'Yes', img: '👍' }, { term: 'No', trans: 'No', img: '👎' }],
            phrases: [
                { native: 'Ciao, piacere.', trans: 'Hello, nice to meet you.', wrongWords: ['Bye', 'bad', 'morning', 'pleasure'] },
                { native: 'Sì, per favore.', trans: 'Yes, please.', wrongWords: ['No', 'thanks', 'sorry', 'bye'] },
                { native: 'No, grazie.', trans: 'No, thank you.', wrongWords: ['Yes', 'please', 'hello', 'man'] }
            ],
            blanks: [
                { sentence: 'Sì, per ___.', trans: 'Yes, please.', answer: 'favore', wrong: ['grazie', 'ciao'] },
                { sentence: 'No, ___.', trans: 'No, thank you.', answer: 'grazie', wrong: ['scusa', 'sì'] }
            ]
        },
        3: {
            name: 'Cibo',
            words: [{ term: 'sale', trans: 'salt', img: '🧂' }, { term: 'zucchero', trans: 'sugar', img: '🍬' }, { term: 'mela', trans: 'apple', img: '🍎' }, { term: 'uovo', trans: 'egg', img: '🥚' }],
            phrases: [
                { native: 'Io voglio una mela.', trans: 'I want an apple.', wrongWords: ['He', 'wants', 'orange', 'they'] },
                { native: 'Con sale, per favore.', trans: 'With salt, please.', wrongWords: ['Without', 'sugar', 'no', 'thanks'] }
            ],
            blanks: [
                { sentence: 'Io ___ un uovo.', trans: 'I want an egg.', answer: 'voglio', wrong: ['vuole', 'mangia'] },
                { sentence: 'Con ___, per favore.', trans: 'With sugar, please.', answer: 'zucchero', wrong: ['caffè', 'mela'] }
            ]
        },
        4: {
            name: 'Famiglia',
            words: [{ term: 'padre', trans: 'father', img: '👨' }, { term: 'madre', trans: 'mother', img: '👩' }, { term: 'fratello', trans: 'brother', img: '👦' }, { term: 'sorella', trans: 'sister', img: '👧' }],
            phrases: [
                { native: 'Mio padre è intelligente.', trans: 'My father is smart.', wrongWords: ['mother', 'tall', 'brother', 'your'] }
            ],
            blanks: [
                { sentence: 'Mia ___ è bella.', trans: 'My mother is beautiful.', answer: 'madre', wrong: ['padre', 'fratello'] }
            ]
        },
        5: { name: 'Viaggio', words: [{ term: 'hotel', trans: 'hotel', img: '🏨' }, { term: 'taxi', trans: 'taxi', img: '🚕' }, { term: 'stazione', trans: 'station', img: '🚉' }], phrases: [{ native: 'Dov\'è l\'hotel?', trans: 'Where is the hotel?', wrongWords: ['airport', 'When', 'train'] }], blanks: [{ sentence: 'Dov\'è il ___?', trans: 'Where is the taxi?', answer: 'taxi', wrong: ['hotel', 'stazione'] }] },
        6: { name: 'Shopping', words: [{ term: 'negozio', trans: 'store', img: '🛍️' }, { term: 'camicia', trans: 'shirt', img: '👕' }, { term: 'scarpa', trans: 'shoe', img: '👞' }], phrases: [{ native: 'La camicia è costosa.', trans: 'The shirt is expensive.', wrongWords: ['shoe', 'cheap', 'large', 'dress'] }], blanks: [{ sentence: 'La ___ è blu.', trans: 'The shirt is blue.', answer: 'camicia', wrong: ['negozio', 'scarpa'] }] }
    }
};

const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

function generateQuestionsFromData(data: UnitData, _unitIndex: number, lessonIndex: number): QuestionData[] {
    const questions: QuestionData[] = [];

    // 1. Image Select (Learn new vocabulary)
    // We pick a word consistently based on lesson index to introduce new concepts progressively
    const targetWord = data.words[lessonIndex % data.words.length];

    // Choose 3 other wrong words from the unit, ensuring unique
    const otherWords = data.words.filter(w => w.term !== targetWord.term);
    const shuffledOthers = shuffleArray(otherWords).slice(0, 3);
    const options = shuffleArray([targetWord, ...shuffledOthers]);

    questions.push({
        type: 'image-select',
        badge: `NEW WORD: ${data.name.toUpperCase()}`,
        question: `Which one of these is "${targetWord.trans}"?`,
        options: options.map((opt, i) => ({ img: opt.img, label: opt.term, key: (i + 1).toString() })),
        correctAnswer: targetWord.term
    });

    // 2. Match Pairs (Quick association)
    // Select 4 random words from this unit
    const pairSources = shuffleArray(data.words).slice(0, 4);
    if (pairSources.length >= 4) {
        questions.push({
            type: 'match-pairs',
            badge: 'MATCH',
            question: 'Tap the matching pairs',
            pairs: pairSources.map(w => ({ left: w.term, right: w.trans })),
            correctAnswer: ''
        });
    }

    // 3. Translate (Construct sentences)
    if (data.phrases && data.phrases.length > 0) {
        const phrase = data.phrases[lessonIndex % data.phrases.length];
        const correctWords = phrase.trans.split(' ');
        const wordBank = shuffleArray([...correctWords, ...phrase.wrongWords]);

        questions.push({
            type: 'translate',
            badge: 'TRANSLATE',
            question: 'Write this in English',
            sentence: phrase.native,
            words: wordBank,
            correctAnswer: phrase.trans
        });
    } else {
        // Fallback translate if no phrase defined
        questions.push({
            type: 'translate',
            question: 'Write this in English',
            sentence: targetWord.term,
            words: shuffleArray([targetWord.trans, 'The', 'is', 'good', 'my', 'your']),
            correctAnswer: targetWord.trans
        });
    }

    // 4. Fill in the Blank (Grammar and context)
    if (data.blanks && data.blanks.length > 0) {
        const blank = data.blanks[lessonIndex % data.blanks.length];
        const blankOptions = shuffleArray([blank.answer, ...blank.wrong]);

        questions.push({
            type: 'fill-blank',
            badge: 'GRAMMAR',
            question: 'Select the missing word',
            sentence: blank.sentence,
            hint: blank.trans,
            options: blankOptions.map((opt, i) => ({ label: opt, key: (i + 1).toString() })),
            correctAnswer: blank.answer
        });
    }

    // 5. Another Image Select to drill home a different word
    const secondTarget = data.words[(lessonIndex + 1) % data.words.length];
    const secondOthers = data.words.filter(w => w.term !== secondTarget.term);
    const secondShuffledOthers = shuffleArray(secondOthers).slice(0, 3);
    const secondOptions = shuffleArray([secondTarget, ...secondShuffledOthers]);

    questions.push({
        type: 'image-select',
        badge: `RECALL`,
        question: `Which one of these is "${secondTarget.trans}"?`,
        options: secondOptions.map((opt, i) => ({ img: opt.img, label: opt.term, key: (i + 1).toString() })),
        correctAnswer: secondTarget.term
    });

    return questions;
}

function generateCache(): Record<string, Record<number, QuestionData[][]>> {
    const cache: Record<string, Record<number, QuestionData[][]>> = {};
    for (const lang of Object.keys(db)) {
        cache[lang] = {};
        for (const unitStr of Object.keys(db[lang])) {
            const unitInt = parseInt(unitStr, 10);
            const unitData = db[lang][unitInt];
            cache[lang][unitInt] = [0, 1, 2, 3, 4].map(lessonIdx => {
                return generateQuestionsFromData(unitData, unitInt, lessonIdx);
            });
        }
    }
    return cache;
}

export const lessonContent = generateCache();

export function getGenericQuestions(lang: string, _unit: number, _lesson: number): QuestionData[] {
    const basics: any = {
        'Japanese': { coffee: 'コーヒー', water: '水', bread: 'パン', hi: 'こんにちは', man: '男の人' },
        'Korean': { coffee: '커피', water: '물', bread: '빵', hi: '안녕하세요', man: '남자' },
        'Chinese': { coffee: '咖啡', water: '水', bread: '面包', hi: '你好', man: '男人' },
        'Spanish': { coffee: 'café', water: 'agua', bread: 'pan', hi: 'hola', man: 'hombre' },
        'French': { coffee: 'café', water: 'eau', bread: 'pain', hi: 'bonjour', man: 'homme' },
        'German': { coffee: 'Kaffee', water: 'Wasser', bread: 'Brot', hi: 'hallo', man: 'Mann' }
    };
    const v = basics[lang] || basics['Spanish'];
    const p = _unit > 1 ? `Unit ${_unit}` : `Basics`;
    return [
        { type: 'image-select', badge: `NEW WORD: ${p}`, question: `Select "${v.coffee}"`, options: [{ img: '☕', label: v.coffee, key: '1' }, { img: '🥖', label: v.bread, key: '2' }, { img: '💧', label: v.water, key: '3' }], correctAnswer: v.coffee },
        { type: 'match-pairs', badge: `MATCH: ${p}`, question: 'Tap the matching pairs', pairs: [{ left: v.hi, right: 'Hello' }, { left: v.man, right: 'Man' }, { left: v.water, right: 'Water' }, { left: v.bread, right: 'Bread' }], correctAnswer: '' },
        { type: 'translate', question: 'Translate to English', sentence: v.hi, words: shuffleArray(['Hello', 'Bye', 'Yes', 'No']), correctAnswer: 'Hello' }
    ];
}
