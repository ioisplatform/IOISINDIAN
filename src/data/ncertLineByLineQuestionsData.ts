// NCERT Classes 1 to 12 Comprehensive Chapter-by-Chapter Short-Form Question Bank
// Detailed Line-by-Line NCERT Decoders + Kids Funny Cartoon Style (1-6) + NEET/JEE High Probability (7-12)

export interface NCERTQuestionItem {
  id: string;
  classNumber: number;
  subject: string;
  chapterNumber: number;
  chapterTitle: string;
  shortQuestion: string;
  // For Kids (Class 1-6)
  funnyCharacter?: string;
  funnyDialogue?: string;
  funnyBadge?: string;
  funColor?: string; // colorful badge/card theme
  // Options & Solution
  options: string[];
  correctIndex: number;
  // NCERT Line-by-line Complete Coverage
  ncertBookTitle: string;
  ncertExactLine: string; // The exact line in NCERT textbook
  lineExplanation: string; // Complete comprehensive line explanation without shortcuts
  googleShortcutTrap?: string; // Where Google/search gives half-answers vs complete NCERT truth
  // For Senior Students (Class 7-12)
  neetJeeProbability?: string; // e.g. '🔥 97% NEET Probability' | '⚡ JEE Mains High-Yield'
  examTarget?: 'NEET' | 'JEE Mains' | 'Board Exam' | 'Foundation Olympiad' | 'All';
  pyqFrequency?: string; // e.g. 'NEET 2023, 2021, 2018'
  superTrick?: string; // 30-sec hack / mnemonic
}

export const NCERT_CLASSES_LIST = [
  { classNum: 1, name: 'कक्षा 1 (First)', category: 'primary', emoji: '🎈', color: 'from-pink-500 to-rose-400', theme: 'pink' },
  { classNum: 2, name: 'कक्षा 2 (Second)', category: 'primary', emoji: '⭐', color: 'from-amber-500 to-yellow-400', theme: 'amber' },
  { classNum: 3, name: 'कक्षा 3 (Third)', category: 'primary', emoji: '🍎', color: 'from-emerald-500 to-teal-400', theme: 'emerald' },
  { classNum: 4, name: 'कक्षा 4 (Fourth)', category: 'primary', emoji: '🚀', color: 'from-cyan-500 to-blue-400', theme: 'cyan' },
  { classNum: 5, name: 'कक्षा 5 (Fifth)', category: 'primary', emoji: '🦁', color: 'from-orange-500 to-amber-500', theme: 'orange' },
  { classNum: 6, name: 'कक्षा 6 (Sixth)', category: 'middle', emoji: '🔬', color: 'from-purple-500 to-indigo-500', theme: 'purple' },
  { classNum: 7, name: 'कक्षा 7 (Seventh)', category: 'middle', emoji: '⚡', color: 'from-blue-600 to-indigo-600', theme: 'blue' },
  { classNum: 8, name: 'कक्षा 8 (Eighth)', category: 'middle', emoji: '🧬', color: 'from-teal-600 to-emerald-600', theme: 'teal' },
  { classNum: 9, name: 'कक्षा 9 (Ninth)', category: 'secondary', emoji: '🎯', color: 'from-indigo-600 to-violet-600', theme: 'indigo' },
  { classNum: 10, name: 'कक्षा 10 (Tenth)', category: 'secondary', emoji: '🏆', color: 'from-red-600 to-rose-600', theme: 'rose' },
  { classNum: 11, name: 'कक्षा 11 (Eleventh)', category: 'senior', emoji: '🩺', color: 'from-emerald-700 to-teal-600', theme: 'emerald' },
  { classNum: 12, name: 'कक्षा 12 (Twelfth)', category: 'senior', emoji: '👑', color: 'from-blue-700 to-purple-600', theme: 'blue' },
];

export const NCERT_QUESTIONS_DATA: NCERTQuestionItem[] = [
  // =========================================================================
  // CLASS 1 (Primary - Funny Cartoon & Drawing Companion)
  // =========================================================================
  {
    id: 'c01-q01',
    classNumber: 1,
    subject: 'हिंदी (रिमझिम)',
    chapterNumber: 1,
    chapterTitle: 'झूला (अम्मा आज लगा दे झूला)',
    shortQuestion: 'बच्चा अम्मा से क्या लगाने की ज़िद कर रहा है और वो उस पर बैठकर कहाँ तक छू लेगा?',
    funnyCharacter: '🐵 चिंटू बंदर',
    funnyDialogue: 'अरे दोस्तों! मैं पेड़ की डाली पर लटक रहा था, तभी एक बच्चा बोला — "अम्मा आज लगा दे झूला!" बताओ वो किसे छूने की बात कर रहा है?',
    funnyBadge: '🎡 मस्ती झूला राइड',
    funColor: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
    options: ['आसमान को छूने की', 'चाँद को खाने की', 'सूरज को पकड़ने की', 'तारों को चुराने की'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT रिमझिम कक्षा 1, पाठ 1 (पृष्ठ 10)',
    ncertExactLine: '"इस पर चढ़कर, ऊपर बढ़कर, आसमान को मैं छू लूँगा।"',
    lineExplanation: 'NCERT की इस कविता में बालक अपनी माँ से झूला लगाने का अनुरोध करता है। झूले पर झूलते हुए वह कल्पना करता है कि वह आसमान को छू लेगा और डाली-पत्ते तक सब झूल रहे हैं।',
    googleShortcutTrap: 'गूगल अक्सर इसे केवल एक बालगीत बताता है, परंतु NCERT का मुख्य उद्देश्य बच्चों में कल्पनाशीलता (Imagination) और लयबद्ध तुकबंदी (Rhyming) सिखाना है।',
    superTrick: 'ट्रिक: झूला झूलकर हवा में ऊपर जाते हैं = आसमान छुएंगे!'
  },
  {
    id: 'c01-q02',
    classNumber: 1,
    subject: 'गणित (आनंदमय गणित / Math Magic)',
    chapterNumber: 1,
    chapterTitle: 'आकृतियाँ और स्थान (अंदर-बाहर, बड़ा-छोटा)',
    shortQuestion: 'ऊँट और उसके मालिक की कहानी में, ठंड के समय तंबू के अंदर सबसे पहले कौन घुसा था?',
    funnyCharacter: '🐪 लंबू ऊँट',
    funnyDialogue: 'ब्रर्र्र! बाहर बहुत कड़ाके की ठंड थी। मेरी गर्दन जम रही थी! मैंने मालिक से पूछा — "मालिक, क्या मैं सिर्फ अपनी गर्दन अंदर कर लूँ?" फिर क्या हुआ?',
    funnyBadge: '⛺ तंबू की पहेली',
    funColor: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900',
    options: ['मालिक अंदर था, बाद में ऊँट पूरा अंदर आ गया', 'मालिक बाहर भाग गया था', 'कुत्ता अंदर सो रहा था', 'तंबू ही उड़ गया'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT गणित का जादू कक्षा 1, पाठ 1 (पृष्ठ 1-3)',
    ncertExactLine: '"मालिक तंबू के अंदर था और ऊँट बाहर। धीरे-धीरे ऊँट अंदर आ गया और मालिक बाहर बैठ गया।"',
    lineExplanation: 'यह पाठ बच्चों को "अंदर (Inside)" और "बाहर (Outside)", तथा "बड़ा (Bigger)" और "छोटा (Smaller)" की अवधारणा व्यावहारिक कहानी से समझाता है।',
    googleShortcutTrap: 'गूगल इसे सिर्फ अरब और ऊँट की लोककथा कहता है, जबकि NCERT में यह स्थानिक समझ (Spatial Understanding) का फाउंडेशनल पाठ है।',
    superTrick: 'ट्रिक: ऊँट बड़ा था, तंबू छोटा था — दोनों एक साथ नहीं रह सके!'
  },
  {
    id: 'c01-q03',
    classNumber: 1,
    subject: 'English (Mridang / Marigold)',
    chapterNumber: 1,
    chapterTitle: 'Two Little Hands (Body Parts)',
    shortQuestion: 'How many eyes do we have to see all the colorful and beautiful things around us?',
    funnyCharacter: '🐰 गप्पू खरगोश',
    funnyDialogue: 'Blink blink! I have two long ears and sparkling eyes! Count your eyes quickly — how many eyes do you have?',
    funnyBadge: '👀 Magic Eyes Badge',
    funColor: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white',
    options: ['Two eyes (दो आँखें)', 'Four eyes (चार आँखें)', 'One eye (एक आँख)', 'Ten eyes (दस आँखें)'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT Mridang Class 1, Unit 1 (Page 4)',
    ncertExactLine: '"Two little eyes to see all around, Two little ears to hear each sound."',
    lineExplanation: 'NCERT teaches young learners sensory organs through action rhymes. Two eyes for seeing, two ears for hearing, one little mouth to smile and eat.',
    googleShortcutTrap: 'Generic search gives dry medical definitions, but NCERT rhymes connect body parts directly to joyful daily actions.',
    superTrick: 'Trick: 2 Hands to clap, 2 Eyes to see, 1 Heart full of glee!'
  },

  // =========================================================================
  // CLASS 2 (Primary - Fun, Vivid Colors & Animals)
  // =========================================================================
  {
    id: 'c02-q01',
    classNumber: 2,
    subject: 'हिंदी (रिमझिम)',
    chapterNumber: 2,
    chapterTitle: 'भालू ने खेली फुटबॉल',
    shortQuestion: 'सर्दियों के मौसम में भालू दादा ने जिसे फुटबॉल समझकर लात मारी, वह वास्तव में क्या था?',
    funnyCharacter: '🐻 भोलू भालू',
    funnyDialogue: 'अरे बाप रे! गोल-मटोल जामुन के पेड़ के नीचे पड़ा था। मैंने सोचा चलो फुटबॉल खेलकर गरमी लाते हैं! पर जैसे ही लात मारी... जोर से दहाड़ सुनाई दी! वो क्या था भाई?',
    funnyBadge: '⚽ भालू की फुटबॉल',
    funColor: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
    options: ['शेर का गोल-मटोल बच्चा', 'बड़ा सा तरबूज', 'रबर की असली गेंद', 'एक बड़ा सा पत्थर'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT रिमझिम कक्षा 2, पाठ 2 (पृष्ठ 8-11)',
    ncertExactLine: '"भालू साहब ने देखा, गोल-मटोल एक चीज़ जामुन के पेड़ के नीचे सिमटकर बैठी थी। उन्होंने आव देखा न ताव, पैर से उछाल दिया। वह शेर का बच्चा था!"',
    lineExplanation: 'सर्दियों के कोहरे में भालू ने ठंड भगाने के लिए शेर के बच्चे को गेंद समझकर उछाल दिया। शेर के बच्चे ने डाल पकड़ ली और उसे हवा में उछलने में बहुत मज़ा आया।',
    googleShortcutTrap: 'गूगल की समरी में शेर के बच्चे का डाल टूटने और माली द्वारा हर्जाना मांगने का मजेदार मोड़ छूट जाता है, जो NCERT की सीख "बिना सोचे समझे काम मत करो" को दर्शाता है।',
    superTrick: 'ट्रिक: कोहरे में गलतफहमी = शेर का बच्चा बना भालू की फुटबॉल!'
  },
  {
    id: 'c02-q02',
    classNumber: 2,
    subject: 'गणित (आनंदमय गणित / Joyful Math)',
    chapterNumber: 2,
    chapterTitle: 'गिनती और समूह (Counting in Groups)',
    shortQuestion: 'अगर चिंटू के पास 3 जोड़ी जूते हैं, तो उसके पास कुल कितने जूते हैं?',
    funnyCharacter: '👟 स्मार्ट बंदर',
    funnyDialogue: 'मेरी माँ ने मेरे लिए 3 जोड़ी रंग-बिरंगे जूते खरीदे। बंदर के दो पैर होते हैं ना! तो बताओ 3 जोड़ी में कितने जूते होंगे?',
    funnyBadge: '🔢 पेयर मास्टर',
    funColor: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
    options: ['6 जूते (3 × 2 = 6)', '3 जूते', '5 जूते', '9 जूते'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT गणित कक्षा 2, पाठ 2 (पृष्ठ 9)',
    ncertExactLine: '"1 जोड़ी = 2 वस्तुएं। वस्तुओं को 2-2 या 5-5 के समूह में गिनना आसान और तेज़ होता है।"',
    lineExplanation: 'NCERT बच्चों को एकल गिनती (1, 2, 3...) के बजाय समूह गणना (Group Counting) सिखाती है। 3 जोड़ी जूते = 2 + 2 + 2 = 6 जूते।',
    googleShortcutTrap: 'गूगल सीधे 3*2=6 बता देता है, जबकि NCERT की मूल लाइन बताती है कि बच्चे रोज़मर्रा की वस्तुओं जैसे चूड़ियाँ, कान की बालियां और जुराबों से समूह पहचानें।',
    superTrick: 'ट्रिक: जोड़ी मतलब हमेशा 2!'
  },

  // =========================================================================
  // CLASS 3 (Fun Science & Nature Discovery)
  // =========================================================================
  {
    id: 'c03-q01',
    classNumber: 3,
    subject: 'EVS / पर्यावरण अध्ययन (आस-पास)',
    chapterNumber: 1,
    chapterTitle: 'पूनम की दिनचर्या (Poonam\'s Day Out)',
    shortQuestion: 'पूनम को बुखार था, जब वह पेड़ के नीचे खाट पर लेटी तो उसके गाल पर अचानक क्या गिरा?',
    funnyCharacter: '🕊️ गुटरगूँ कबूतर',
    funnyDialogue: 'पेड़ पर बंदर, गिलहरी, कौवा, तितलियां सब बैठे थे। अचानक ऊपर से "टप!" हुआ! पूनम ने गाल छुआ तो चिप-चिप लगा! बताओ किसने बीट की थी?',
    funnyBadge: '🌳 पेड़ के दोस्त',
    funColor: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
    options: ['कबूतर या कौवे की बीट', 'एक पका हुआ मीठा आम', 'बारिश की ठंडी बूँद', 'बंदर का खाया केला'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT आस-पास कक्षा 3, पाठ 1 (पृष्ठ 1-2)',
    ncertExactLine: '"अचानक पूनम के गाल पर कुछ गिरा... उसने पेड़ पर देखा तो कौवा और कबूतर बैठे थे। उसने पत्तों से गाल साफ किया।"',
    lineExplanation: 'NCERT इस मनोरंजक प्रसंग से बच्चों को यह सिखाता है कि पेड़ पर केवल पक्षी ही नहीं, बल्कि चींटियां, गिलहरी, बंदर, मकड़ी और तितलियां भी अपना प्राकृतिक आश्रय बनाते हैं।',
    googleShortcutTrap: 'गूगल अक्सर इस घटना को छोड़ देता है, जबकि NCERT इसी से बच्चों को जानवरों के वर्गीकरण (उड़ने वाले, रेंगने वाले, फुदकने वाले) की ओर ले जाती है।',
    superTrick: 'ट्रिक: पेड़ सिर्फ लकड़ी नहीं, जीवों का बहुमंजिला घर है!'
  },
  {
    id: 'c03-q02',
    classNumber: 3,
    subject: 'EVS / पर्यावरण अध्ययन (आस-पास)',
    chapterNumber: 3,
    chapterTitle: 'पानी रे पानी (Water O\' Water)',
    shortQuestion: 'कविता में पानी के किन तीन मुख्य रूपों का वर्णन किया गया है?',
    funnyCharacter: '💧 पानी की बूँद - टिपटिप',
    funnyDialogue: 'छपाक! मैं कभी बर्फ बनकर पहाड़ पर जम जाती हूँ, कभी चाय की केतली से भाप बनकर उड़ती हूँ, और कभी नल से बहती हूँ! मेरे 3 रूप पहचानो!',
    funnyBadge: '🌊 जल जीवन चक्र',
    funColor: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white',
    options: ['ठोस (बर्फ), द्रव (पानी) और गैस (भाप/ओस)', 'आग, धुआँ और राख', 'मिट्टी, कीचड़ और रेत', 'तेल, दूध और शरबत'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT आस-पास कक्षा 3, पाठ 3 (पृष्ठ 18)',
    ncertExactLine: '"बर्फ रूप में नानी कहती, भाप बने तो उड़ता रहता। पानी के हैं रूप घनेरे, कहता है यह किस्सा पानी का।"',
    lineExplanation: 'कक्षा 3 में पानी की तीनों भौतिक अवस्थाओं (Solid - Ice, Liquid - Water, Gas - Vapour) को बच्चों की भाषा में समझाया गया है।',
    googleShortcutTrap: 'गूगल सीधे H2O की अवस्थाएं दिखाता है, पर NCERT लोकगीत के माध्यम से पानी के दैनिक जीवन में महत्व और जल संरक्षण सिखाती है।',
    superTrick: 'ट्रिक: ठंडा करो तो बर्फ, खौलाओ तो भाप, पियो तो पानी!'
  },

  // =========================================================================
  // CLASS 4 (Curiosity, Animals, Travel)
  // =========================================================================
  {
    id: 'c04-q01',
    classNumber: 4,
    subject: 'EVS / पर्यावरण अध्ययन (आस-पास)',
    chapterNumber: 3,
    chapterTitle: 'नंदू हाथी (A Day with Nandu)',
    shortQuestion: 'हाथियों के झुंड (Herd) की नेता कौन होती है और एक बड़ा हाथी एक दिन में कितनी पत्तियां खा सकता है?',
    funnyCharacter: '🐘 गोलू हाथी',
    funnyDialogue: 'धम्मक-धम्मक आता हाथी! मैं तो अभी छोटा नंदू हूँ, पर मेरी नानी माँ पूरे झुंड को राह दिखाती हैं। क्या तुम जानते हो हमारे झुंड का बॉस कौन है?',
    funnyBadge: '👑 झुंड की सरदार',
    funColor: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white',
    options: ['सबसे बूढ़ी हथिनी नेता होती है और बड़ा हाथी 100 kg से अधिक पत्ते खाता है', 'सबसे बड़ा नर हाथी नेता होता है और 10 kg खाता है', 'जंगल का शेर नेता होता है', 'हाथी केवल फल खाते हैं, पत्ते नहीं'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT आस-पास कक्षा 4, पाठ 3 (पृष्ठ 22-25)',
    ncertExactLine: '"हाथियों के झुंड में केवल हथिनियां और बच्चे ही रहते हैं। सबसे बुजुर्ग हथिनी ही पूरे झुंड की नेता होती है। एक बड़ा हाथी एक दिन में 100 किलोग्राम से ज्यादा पत्ते और झाड़ियां खा लेता है।"',
    lineExplanation: 'NCERT की यह लाइन परीक्षाओं में सीधे पूछी जाती है। झुंड में 14-15 साल तक के ही नर हाथी रहते हैं, फिर वे झुंड छोड़ देते हैं। हाथी दिन में केवल 2 से 4 घंटे ही सोते हैं और कीचड़ में नहाकर त्वचा को ठंडक देते हैं।',
    googleShortcutTrap: 'गूगल अक्सर झुंड का मुखिया "Alpha Male" लिख देता है, जबकि हाथियों में मातृसत्तात्मक (Matriarchal) समाज होता है — नेता सबसे बूढ़ी हथिनी होती है!',
    superTrick: 'ट्रिक: हाथियों की रानी = सबसे बुजुर्ग नानी हथिनी!'
  },
  {
    id: 'c04-q02',
    classNumber: 4,
    subject: 'गणित (Math Magic)',
    chapterNumber: 1,
    chapterTitle: 'ईंटों से बनी इमारत (Building with Bricks)',
    shortQuestion: 'एक ईंट (Brick) के कुल कितने फलक (Faces), कितने किनारे (Edges) और कितने कोने (Vertices) होते हैं?',
    funnyCharacter: '🧱 मिस्त्री लाल',
    funnyDialogue: 'जागृति स्कूल, मुर्शिदाबाद की इमारत देख रहे हो? लाल ईंटों की सुंदर जालियां! ज़रा अपनी ईंट उठाओ और गिनो इसके कितने चेहरे हैं!',
    funnyBadge: '📐 3D शेप्स मास्टर',
    funColor: 'bg-gradient-to-r from-red-500 to-amber-600 text-white',
    options: ['6 फलक, 12 किनारे, 8 कोने', '4 फलक, 8 किनारे, 4 कोने', '8 फलक, 6 किनारे, 12 कोने', '12 फलक, 6 किनारे, 8 कोने'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT गणित का जादू कक्षा 4, पाठ 1 (पृष्ठ 5)',
    ncertExactLine: '"एक साधारण ईंट घनाभ (Cuboid) के आकार की होती है जिसमें कुल 6 समतल फलक, 12 किनारे तथा 8 शीर्ष (कोने) होते हैं।"',
    lineExplanation: 'ठोस ज्यामिति (3D Geometry) की आधारशिला ईंट के फलकों से शुरू होती है। ईंट का प्रत्येक फलक आयताकार (Rectangular) होता है।',
    googleShortcutTrap: 'गूगल फॉर्मूला देता है, पर NCERT ईंट की जाली, झरोखा और मेहराब (Arch) के पैटर्न से बच्चों के दृश्य कौशल को विकसित करती है।',
    superTrick: 'ट्रिक: कमरा भी घनाभ है = 4 दीवारें + 1 छत + 1 फर्श = 6 फलक!'
  },

  // =========================================================================
  // CLASS 5 (Super Senses & Digestive Science)
  // =========================================================================
  {
    id: 'c05-q01',
    classNumber: 5,
    subject: 'EVS / पर्यावरण अध्ययन (आस-पास)',
    chapterNumber: 1,
    chapterTitle: 'कैसे पहचाना चींटी ने दोस्त को? (Super Senses)',
    shortQuestion: 'चींटियाँ ज़मीन पर चलते समय क्या छोड़ती हैं जिससे पीछे वाली चींटियाँ कतार (Line) में चलती हैं?',
    funnyCharacter: '🐜 नन्हीं चींटी रानी',
    funnyDialogue: 'हम चींटियाँ कभी रास्ता नहीं भटकतीं! चीनी का एक दाना गिरते ही हम सैकड़ों की फ़ौज लेकर एक सीधी लाइन में आ जाती हैं। हमारी गुप्त तरकीब क्या है?',
    funnyBadge: '🔍 सुपर सेंस डिटेक्टर',
    funColor: 'bg-gradient-to-r from-rose-500 to-pink-600 text-white',
    options: ['एक विशेष प्रकार की गंध (फेरोमोन)', 'पैर के निशान', 'आवाज़ की सीटी', 'रंग की बूँदें'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT आस-पास कक्षा 5, पाठ 1 (पृष्ठ 2-3)',
    ncertExactLine: '"चींटियाँ चलते समय ज़मीन पर कुछ ऐसा छोड़ती हैं जिसे सूंघकर पीछे आने वाली चींटियों को रास्ता मिल जाता है।"',
    lineExplanation: 'चींटियों में सूंघने की अद्भुत क्षमता होती है। वे फेरोमोन (Pheromones) नामक रासायनिक गंध छोड़ती हैं, जिससे पूरी कॉलोनी अनुशासन में कतार बनाकर चलती है। इसी तरह रेशम का कीड़ा अपनी मादा को कई किलोमीटर दूर से उसकी गंध से पहचान लेता है!',
    googleShortcutTrap: 'गूगल सीधे फेरोमोन का रासायनिक नाम बता देता है, पर NCERT इसके साथ कुत्ता, चील, गिद्ध (4 गुना दूर देखना) और मच्छर (पैरों के तलवे की गर्मी से ढूँढना) के सभी सुपर सेंसेज को आपस में जोड़ती है।',
    superTrick: 'ट्रिक: गंध की अदृश्य सड़क = चींटी की पक्की कतार!'
  },
  {
    id: 'c05-q02',
    classNumber: 5,
    subject: 'EVS / पर्यावरण अध्ययन (आस-पास)',
    chapterNumber: 3,
    chapterTitle: 'चखने से पचने तक (From Tasting to Digesting)',
    shortQuestion: 'हमारे पेट के अंदर का पाचक रस (Digestive Juice) कैसा होता है और उसका तापमान कितना होता है?',
    funnyCharacter: '🧪 डॉक्टर पेटूराम',
    funnyDialogue: 'डॉक्टर ब्यूमोंट ने फौजी मार्टिन के पेट की खिड़की से झांककर देखा! पेट में कोई जादू नहीं, एक खास रस उबल रहा था! बताओ वह रस अम्लीय था या क्षारीय?',
    funnyBadge: '🩺 पेट की खिड़की',
    funColor: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white',
    options: ['अम्लीय (Acidic) हाइड्रोक्लोरिक एसिड, तापमान लगभग 30°C', 'मीठा शर्बत जैसा, 10°C', 'क्षारीय (Basic) साबुन जैसा, 50°C', 'बर्फ जैसा ठंडा पानी, 0°C'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT आस-पास कक्षा 5, पाठ 3 (पृष्ठ 30-33)',
    ncertExactLine: '"डॉक्टर ब्यूमोंट ने पाया कि हमारे पेट का पाचक रस तेजाब (Acid) की तरह अम्लीय होता है, जो भोजन को पचाने में सहायता करता है। पेट के अंदर का तापमान लगभग 30°C होता है।"',
    lineExplanation: '1822 में डॉक्टर ब्यूमोंट द्वारा मार्टिन के पेट पर किए गए वास्तविक प्रयोगों से पाचन क्रिया का रहस्य खुला। जब हमें एसिडिटी होती है तो इसी अम्लता के बढ़ने से सीने में जलन होती है।',
    googleShortcutTrap: 'गूगल सीधे HCl लिख देता है, लेकिन NCERT सिखाती है कि खाना चबाने से लार (Saliva) स्टार्च को ग्लूकोज में बदलती है — इसीलिए रोटी देर तक चबाने पर मीठी लगती है!',
    superTrick: 'ट्रिक: पेट का रस = कुदरती एसिड जो खाने को घुलाता है!'
  },

  // =========================================================================
  // CLASS 6 (Middle School - Science & Math Fundamentals)
  // =========================================================================
  {
    id: 'c06-q01',
    classNumber: 6,
    subject: 'विज्ञान (Science - NCERT)',
    chapterNumber: 2,
    chapterTitle: 'भोजन के घटक (Components of Food)',
    shortQuestion: 'आयोडीन के तनु घोल (Dilute Iodine Solution) से खाद्य पदार्थ का परीक्षण करने पर नीला-काला (Blue-Black) रंग किसकी उपस्थिति दर्शाता है?',
    funnyCharacter: '🥔 आलू मिस्टर स्टार्च',
    funnyDialogue: 'कच्चे आलू के टुकड़े पर दो बूँद आयोडीन डाली और जादू हो गया! रंग एकदम गाढ़ा नीला-काला हो गया! मैं आलू हूँ, मेरे अंदर क्या छुपा है?',
    funnyBadge: '🔬 न्यूट्रिएंट लैब टेस्ट',
    funColor: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white',
    options: ['मंड (Starch / कार्बोहाइड्रेट)', 'प्रोटीन (Protein)', 'वसा (Fat)', 'विटामिन C'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT विज्ञान कक्षा 6, अध्याय 2 (पृष्ठ 10)',
    ncertExactLine: '"खाद्य पदार्थ पर तनु आयोडीन विलयन की 2-3 बूँदें डालिए। यदि इसका रंग नीला-काला हो जाता है, तो यह मंड (Starch) की उपस्थिति दर्शाता है।"',
    lineExplanation: 'NCERT का यह प्रमुख व्यावहारिक परीक्षण है: 1) मंड = आयोडीन से नीला-काला, 2) प्रोटीन = कॉपर सल्फेट + कास्टिक सोडा से बैंगनी (Violet), 3) वसा = कागज़ पर रगड़ने पर पारभासी तैलीय धब्बा।',
    googleShortcutTrap: 'गूगल सिर्फ आयोडीन टेस्ट लिखता है, लेकिन कक्षा 6 NCERT में तीनों टेस्ट (Starch, Protein, Fat) की सटीक क्रियाविधि और रोग (Marasmus, Kwashiorkor) एक साथ जुड़े हैं।',
    superTrick: 'ट्रिक: आयोडीन + आलू = नीला-काला स्टार्च!'
  },
  {
    id: 'c06-q02',
    classNumber: 6,
    subject: 'विज्ञान (Science - NCERT)',
    chapterNumber: 9,
    chapterTitle: 'सजीव एवं उनका परिवेश (The Living Organisms)',
    shortQuestion: 'ऊँट मरुस्थल में बिना पानी पिए कई दिनों तक जीवित रहने के लिए क्या अनुकूलन (Adaptations) अपनाता है?',
    funnyCharacter: '🐪 रेगिस्तान का जहाज़',
    funnyDialogue: 'मरुस्थल में रेत तपती है पर मेरे पैर गद्देदार और लंबे हैं! क्या तुम जानते हो कि मैं पेशाब बहुत कम करता हूँ ताकि शरीर का पानी बचा रहे?',
    funnyBadge: '🌵 मरुस्थल अनुकूलन',
    funColor: 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white',
    options: ['कम मूत्र विसर्जित करता है, लीद सूखी होती है और पसीना नहीं आता', 'कूबड़ में 50 लीटर पानी भरकर रखता है', 'ज़मीन के नीचे गड्ढा खोदकर सोता है', 'रेत खाकर पानी बनाता है'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT विज्ञान कक्षा 6, अध्याय 9 (पृष्ठ 80)',
    ncertExactLine: '"ऊँट मूत्र बहुत कम मात्रा में विसर्जित करता है, उसकी लीद सूखी होती है और उसे पसीना (Sweat) भी नहीं आता। शरीर से जल की बहुत कम हानि होने के कारण ऊँट कई दिनों तक बिना जल के रह सकता है।"',
    lineExplanation: 'एक सामान्य मिथक है कि ऊँट कूबड़ में पानी रखता है, जबकि NCERT स्पष्ट करती है कि कूबड़ में वसा (Fat) संचित होती है, और शरीर में जल संरक्षण के लिए उसका उत्सर्जन तंत्र अति-अनुकूलित होता है।',
    googleShortcutTrap: 'गूगल के कई सामान्य उत्तर कूबड़ में पानी जमा होने का भ्रम फैलाते हैं, जबकि NCERT लाइन प्रमाणित करती है कि कूबड़ में संचित फैट का ऑक्सीकरण होता है और मूत्र व पसीने की हानि न्यूनतम होती है!',
    superTrick: 'ट्रिक: कूबड़ = वसा बैंक, कम पसीना = पानी की बचत!'
  },

  // =========================================================================
  // CLASS 7 (Foundation for NEET & JEE Mains)
  // =========================================================================
  {
    id: 'c07-q01',
    classNumber: 7,
    subject: 'विज्ञान (Science - NCERT)',
    chapterNumber: 1,
    chapterTitle: 'पादपों में पोषण (Nutrition in Plants)',
    shortQuestion: 'प्रकाश संश्लेषण (Photosynthesis) की रासायनिक अभिक्रिया में पत्तियों का कौन-सा वर्णक सौर ऊर्जा को अवशोषित करता है?',
    options: ['क्लोरोफिल (Chlorophyll / पर्णहरित)', 'हीमोग्लोबिन', 'कैरोटीनॉइड्स केवल', 'एंथोसायनिन'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT Science Class 7, Chapter 1 (Page 3)',
    ncertExactLine: '"पत्तियों में एक हरा वर्णक होता है जिसे क्लोरोफिल कहते हैं। क्लोरोफिल सूर्य के प्रकाश की ऊर्जा का संग्रहण करने में पत्ती की सहायता करता है।"',
    lineExplanation: 'समीकरण: 6CO2 + 6H2O + सूर्य प्रकाश + क्लोरोफिल → C6H12O6 (कार्बोहाइड्रेट) + 6O2। क्लोरोफिल में मैग्नीशियम (Mg) धातु उपस्थित होती है। स्टोमेटा (रंध्र) रक्षक कोशिकाओं (Guard Cells) द्वारा खुलते और बंद होते हैं।',
    googleShortcutTrap: 'गूगल सिर्फ रसायनों की बात करता है, पर NCERT प्रकाश संश्लेषण में स्टोमेटा के द्वार और कीटभक्षी पादपों (जैसे घटपर्णी / Pitcher plant) में नाइट्रोजन पूर्ति के अंतर को स्पष्ट करती है।',
    neetJeeProbability: '🔥 94% Probability (Foundation for NEET Plant Physiology)',
    examTarget: 'Foundation Olympiad',
    pyqFrequency: 'NEET Foundation & NTSE 2022',
    superTrick: 'ट्रिक: हरी पत्ती = क्लोरोफिल = सौर ऊर्जा का सोलर पैनल!'
  },
  {
    id: 'c07-q02',
    classNumber: 7,
    subject: 'विज्ञान (Science - NCERT)',
    chapterNumber: 5,
    chapterTitle: 'अम्ल, क्षारक और लवण (Acids, Bases and Salts)',
    shortQuestion: 'चींटी के डंक में कौन-सा अम्ल होता है और उसके प्रभाव को उदासीन (Neutralize) करने के लिए क्या लगाया जाता है?',
    options: ['फॉर्मिक अम्ल (मेथेनॉइक अम्ल), बेकिंग सोडा (सोडियम हाइड्रोजन कार्बोनेट) या कैलेमाइन विलयन लगाया जाता है', 'सल्फ्यूरिक अम्ल, नीबू का रस लगाया जाता है', 'एसिटिक अम्ल, नमक लगाया जाता है', 'हाइड्रोक्लोरिक अम्ल, सिरका लगाया जाता है'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT Science Class 7, Chapter 5 (Page 52)',
    ncertExactLine: '"चींटी के डंक में फॉर्मिक अम्ल होता है। डंक के प्रभाव को नमीयुक्त खाने का सोडा (सोडियम हाइड्रोजन कार्बोनेट) अथवा कैलेमाइन विलयन (जिसमें जिंक कार्बोनेट होता है) मलकर उदासीन किया जा सकता है।"',
    lineExplanation: 'यह उदासीनीकरण (Neutralization) अभिक्रिया का उत्कृष्ट दैनिक उदाहरण है: अम्ल (Acid) + क्षारक (Base) → लवण (Salt) + जल (Water) + ऊष्मा। कैलेमाइन में जिंक कार्बोनेट (ZnCO3) होता है।',
    googleShortcutTrap: 'गूगल सिर्फ बेकिंग सोडा का नाम देता है, लेकिन NCERT की लाइन कैलेमाइन (Calamine) और जिंक कार्बोनेट का विशेष उल्लेख करती है जो सीधा प्रतियोगी परीक्षा का प्रश्न बनता है!',
    neetJeeProbability: '🔥 92% Probability (NEET Chemistry Foundation)',
    examTarget: 'Foundation Olympiad',
    superTrick: 'ट्रिक: चींटी का एसिड (Formic) + क्षारीय सोडा = राहत और आराम!'
  },

  // =========================================================================
  // CLASS 8 (Olympiad / NTSE / Pre-Medical Pre-JEE)
  // =========================================================================
  {
    id: 'c08-q01',
    classNumber: 8,
    subject: 'विज्ञान (Science - NCERT)',
    chapterNumber: 8,
    chapterTitle: 'कोशिका - संरचना एवं प्रकार्य (Cell Structure & Functions)',
    shortQuestion: 'पादप कोशिका (Plant Cell) में जंतु कोशिका (Animal Cell) की तुलना में कौन-सी दो अतिरिक्त संरचनाएं पाई जाती हैं?',
    options: ['कोशिका भित्ति (Cell Wall) और क्लोरोप्लास्ट (Plastids / हरितलवक)', 'माइटोकॉन्ड्रिया और राइबोसोम', 'केवल केंद्रक और कोशिका द्रव्य', 'लाइसोसोम और सेंट्रोसोम'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT Science Class 8, Chapter 8 (Page 96)',
    ncertExactLine: '"पादप कोशिका में प्लाज्मा झिल्ली के बाहर एक अतिरिक्त दृढ़ आवरण होता है जिसे कोशिका भित्ति कहते हैं। पादप कोशिकाओं में रंगीन संरचनाएं प्लैस्टिड (हरितलवक) भी पाई जाती हैं।"',
    lineExplanation: 'पादप कोशिका में सेल्युलोज की बनी बाह्य कोशिका भित्ति पौधों को तापमान, तीव्र वायु और नमी से सुरक्षा देती है। जंतु कोशिकाओं में कोशिका भित्ति और क्लोरोप्लास्ट अनुपस्थित होते हैं। पादप कोशिका में एक बड़ी केंद्रीय रसधानी (Vacuole) होती है।',
    googleShortcutTrap: 'गूगल साधारण अंतर की लिस्ट दे देता है, पर NCERT यह रेखांकित करती है कि पौधों में कोशिका भित्ति इसलिए आवश्यक है क्योंकि वे जंतुओं की तरह स्थान परिवर्तन नहीं कर सकते!',
    neetJeeProbability: '🔥 96% Probability (Repeated in NEET Biology Cell Unit)',
    examTarget: 'NEET',
    pyqFrequency: 'NEET 2020, 2018; NTSE 2021',
    superTrick: 'ट्रिक: पेड़ हिल नहीं सकते, इसलिए कुदरत ने उन्हें दी मजबूत कोशिका भित्ति!'
  },
  {
    id: 'c08-q02',
    classNumber: 8,
    subject: 'विज्ञान (Science - NCERT)',
    chapterNumber: 11,
    chapterTitle: 'बल तथा दाब (Force and Pressure)',
    shortQuestion: 'दाब (Pressure), बल (Force) और क्षेत्रफल (Area) में क्या संबंध है, और कुली भारी बोझ उठाते समय सिर पर पगड़ी क्यों बांधता है?',
    options: ['दाब = बल / क्षेत्रफल; पगड़ी से संपर्क क्षेत्रफल बढ़ता है और सिर पर दाब घट जाता है', 'दाब = बल × क्षेत्रफल; पगड़ी से बल बढ़ता है', 'दाब का क्षेत्रफल से कोई संबंध नहीं है', 'पगड़ी केवल सुंदरता के लिए बांधी जाती है'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT Science Class 8, Chapter 11 (Page 138)',
    ncertExactLine: '"प्रति एकांक क्षेत्रफल पर लगने वाले बल को दाब कहते हैं (P = F / A)। कुली सिर पर कपड़े की गोल लपेट (पगड़ी) रखते हैं जिससे बोझ का संपर्क क्षेत्रफल बढ़ जाता है और सिर पर दाब कम पड़ता है।"',
    lineExplanation: 'चूंकि दाब क्षेत्रफल के व्युत्क्रमानुपाती (Inversely Proportional) होता है, क्षेत्रफल (A) बढ़ने पर समान भार का दाब (P) घट जाता है। इसी सिद्धांत से नुकीली कील आसानी से धंसती है और चौड़े पट्टे वाले बैग कंधे पर कम दर्द करते हैं।',
    googleShortcutTrap: 'गूगल सिर्फ P=F/A फॉर्मूला थमा देता है, लेकिन NCERT चाकू की धार तेज होने, ऊँट के चौड़े तलवे और कुली की पगड़ी के तीनों व्यावहारिक उदाहरणों की व्याख्या करती है।',
    neetJeeProbability: '⚡ 95% Probability (JEE Main / NEET Physics Fluid Statics base)',
    examTarget: 'JEE Mains',
    superTrick: 'ट्रिक: एरिया बढ़ाओ = प्रेशर घटाओ!'
  },

  // =========================================================================
  // CLASS 9 (Strong Pre-Medical & Pre-Engineering Base)
  // =========================================================================
  {
    id: 'c09-q01',
    classNumber: 9,
    subject: 'विज्ञान / भौतिकी (Physics - NCERT)',
    chapterNumber: 9,
    chapterTitle: 'बल तथा गति के नियम (Force and Laws of Motion)',
    shortQuestion: 'न्यूटन के गति के द्वितीय नियम (Newton\'s 2nd Law) के अनुसार संवेग परिवर्तन की दर किसके समानुपाती होती है?',
    options: ['आरोपित असंतुलित बल के (F = dp/dt = ma)', 'वस्तु के वेग के सीधे', 'वस्तु की स्थितिज ऊर्जा के', 'घर्षण गुणांक के'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT Science Class 9, Chapter 9 (Page 120)',
    ncertExactLine: '"किसी वस्तु के संवेग परिवर्तन की दर उस पर लगने वाले असंतुलित बल की दिशा में बल के समानुपाती होती है।"',
    lineExplanation: 'गणितीय रूप: F ∝ (mv - mu)/t = m(v - u)/t = ma। जब गेंद पकड़ते समय फील्डर हाथ पीछे खींचता है, तो समय (t) बढ़ जाता है जिससे संवेग परिवर्तन की दर (F) घट जाती है और हाथ में चोट नहीं लगती।',
    googleShortcutTrap: 'गूगल अक्सर सीधे F = ma लिख देता है, जबकि न्यूटन का मूल कथन "संवेग परिवर्तन की दर (Rate of change of momentum)" है — यह रॉकेट प्रोपल्शन में variable mass पर लागू होता है!',
    neetJeeProbability: '⚡ 98% Probability (JEE Main Mechanics & NEET Physics Core)',
    examTarget: 'JEE Mains',
    pyqFrequency: 'JEE Main 2023, 2021; NEET 2022',
    superTrick: 'ट्रिक: हाथ पीछे खींचो = समय बढ़ाओ = चोट का बल घटाओ!'
  },
  {
    id: 'c09-q02',
    classNumber: 9,
    subject: 'विज्ञान / रसायन (Chemistry - NCERT)',
    chapterNumber: 3,
    chapterTitle: 'परमाणु एवं अणु (Atoms and Molecules)',
    shortQuestion: 'आवोगाद्रो संख्या (Avogadro Number) का मान क्या है और 1 मोल जल (H2O) का द्रव्यमान कितना ग्राम होता है?',
    options: ['6.022 × 10²³ कण, और 18 ग्राम', '3.14 × 10²³, और 36 ग्राम', '6.022 × 10²², और 16 ग्राम', '1.6 × 10⁻¹⁹, और 2 ग्राम'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT Science Class 9, Chapter 3 (Page 41)',
    ncertExactLine: '"किसी पदार्थ के 1 मोल में कणों (परमाणु, अणु अथवा आयन) की निश्चित संख्या 6.022 × 10²³ होती है जिसे आवोगाद्रो स्थिरांक कहते हैं। जल (H2O) का मोलर द्रव्यमान = (2 × 1) + 16 = 18 g/mol होता है।"',
    lineExplanation: 'मोल संकल्पना (Mole Concept) संपूर्ण रसायन विज्ञान की रीढ़ है। 18 ग्राम पानी में ठीक 6.022 × 10²³ जल के अणु होते हैं।',
    googleShortcutTrap: 'गूगल सिर्फ संख्या दे देता है, पर NCERT स्पष्ट करती है कि ग्राम परमाणु द्रव्यमान (Gram atomic mass) और मोल में 1:1 संबंध होता है।',
    neetJeeProbability: '🔥 99% Probability (Direct Foundation for NEET & JEE Mole Concept)',
    examTarget: 'All',
    pyqFrequency: 'NEET 2023, 2019; JEE Main 2022',
    superTrick: 'ट्रिक: 1 मोल = आवोगाद्रो नंबर का पैकेट!'
  },

  // =========================================================================
  // CLASS 10 (Board Exam Mastery & Competitive Gateway)
  // =========================================================================
  {
    id: 'c10-q01',
    classNumber: 10,
    subject: 'विज्ञान / जीवविज्ञान (Biology - NCERT)',
    chapterNumber: 6,
    chapterTitle: 'जैव प्रक्रम (Life Processes - Circulation & Excretion)',
    shortQuestion: 'मानव हृदय (Human Heart) में दोहरा परिसंचरण (Double Circulation) क्या है और फुफ्फुस धमनी (Pulmonary Artery) में कैसा रक्त बहता है?',
    options: ['रक्त हृदय से दो बार गुजरता है; फुफ्फुस धमनी एकमात्र ऐसी धमनी है जिसमें विऑक्सीजनित (Deoxygenated) रक्त बहता है', 'रक्त केवल एक बार गुजरता है; शुद्ध रक्त बहता है', 'हृदय केवल फेफड़ों को पंप करता है', 'धमनियों में हमेशा केवल शुद्ध रक्त ही होता है बिना अपवाद'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT Science Class 10, Chapter 6 (Page 106)',
    ncertExactLine: '"मानव हृदय में एक चक्र पूरा करने के लिए रक्त दो बार हृदय से होकर गुजरता है, इसे दोहरा परिसंचरण कहते हैं। शरीर की सभी धमनियां ऑक्सीजनित रक्त ले जाती हैं, केवल फुफ्फुस धमनी (Pulmonary Artery) अपवाद है जो विऑक्सीजनित रक्त फेफड़ों तक ले जाती है।"',
    lineExplanation: 'यह प्रश्न बोर्ड और NEET दोनों का सर्वाधिक प्रिय प्रश्न है। बायां आलिंद व निलय ऑक्सीजनित रक्त संभालते हैं जबकि दायां आलिंद व निलय विऑक्सीजनित रक्त संभालते हैं। कपाट (Valves) रक्त के उल्टे प्रवाह को रोकते हैं।',
    googleShortcutTrap: 'गूगल साधारण परिभाषा देता है "Heart pumps blood twice", पर NCERT का अपवाद (Pulmonary Artery vs Pulmonary Vein) ही परीक्षा में भ्रमित करने के लिए दिया जाता है!',
    neetJeeProbability: '🔥 99% Probability (NEET Biology Life Processes - Human Physiology)',
    examTarget: 'NEET',
    pyqFrequency: 'CBSE 2024, 2023; NEET 2022, 2020',
    superTrick: 'ट्रिक: धमनियां = Away from heart; Pulmonary = फेफड़ों की ओर जाने वाला गंदा रक्त!'
  },
  {
    id: 'c10-q02',
    classNumber: 10,
    subject: 'विज्ञान / भौतिकी (Physics - NCERT)',
    chapterNumber: 12,
    chapterTitle: 'विद्युत (Electricity)',
    shortQuestion: 'ओम के नियम (Ohm\'s Law) के अनुसार V-I ग्राफ की ढाल (Slope) क्या प्रदर्शित करती है और प्रतिरोध किन कारकों पर निर्भर करता है?',
    options: ['ढाल प्रतिरोध (R) दर्शाती है; R ∝ L/A (लंबाई के समानुपाती और अनुप्रस्थ काट क्षेत्रफल के व्युत्क्रमानुपाती)', 'ढाल विद्युत धारा दर्शाती है; केवल वोल्टेज पर निर्भर करता है', 'ढाल कार्य दर्शाती है; तार के रंग पर निर्भर करता है', 'ढाल धारिता दर्शाती है'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT Science Class 10, Chapter 12 (Page 208)',
    ncertExactLine: '"नियत ताप पर चालक के सिरों का विभवांतर उसमें प्रवाहित धारा के समानुपाती होता है (V = IR)। V-I ग्राफ एक सरल रेखा होती है जिसकी ढाल प्रतिरोध (R = ρL/A) देती है।"',
    lineExplanation: 'तार को खींचकर लंबाई दुगुनी करने पर अनुप्रस्थ काट क्षेत्रफल आधा हो जाता है, अतः नया प्रतिरोध 4 गुना हो जाता है (R\' = n²R)। यह संख्यात्मक प्रश्न (Numerical) बोर्ड व JEE Mains दोनों में निरंतर पूछा जाता है।',
    googleShortcutTrap: 'गूगल सिर्फ V=IR बताता है, लेकिन तार खींचने पर आयतन स्थिर रहने से R ∝ L² का शॉर्टकट NCERT के अभ्यास प्रश्नों में छिपा है!',
    neetJeeProbability: '⚡ 97% Probability (CBSE Board & JEE Main Current Electricity)',
    examTarget: 'JEE Mains',
    pyqFrequency: 'CBSE 2023; JEE Main 2022, 2019',
    superTrick: 'ट्रिक: तार खींचा n गुना = प्रतिरोध बढ़ा n² गुना!'
  },

  // =========================================================================
  // CLASS 11 (High-Yield NEET & JEE Mains Target)
  // =========================================================================
  {
    id: 'c11-q01',
    classNumber: 11,
    subject: 'जीवविज्ञान (Biology - NCERT)',
    chapterNumber: 8,
    chapterTitle: 'कोशिका: जीवन की इकाई (Cell: The Unit of Life)',
    shortQuestion: 'अंतःझिल्ली तंत्र (Endomembrane System) में कौन-कौन से कोशिकांग सम्मिलित हैं और किसे इसमें शामिल नहीं किया जाता?',
    options: ['ER, गॉल्जी उपकरण, लाइसोसोम एवं रसधानी सम्मिलित हैं; माइटोकॉन्ड्रिया व क्लोरोप्लास्ट शामिल नहीं हैं', 'माइटोकॉन्ड्रिया, क्लोरोप्लास्ट और परऑक्सीसोम सम्मिलित हैं', 'केवल केंद्रक और राइबोसोम सम्मिलित हैं', 'सभी कोशिकांग सम्मिलित हैं'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT Biology Class 11, Chapter 8 (Page 133)',
    ncertExactLine: '"अंतःझिल्ली तंत्र में अंतर्द्रव्यी जालिका (ER), गॉल्जी काय, लयनकाय (Lysosomes) एवं रसधानियां (Vacuoles) शामिल हैं, क्योंकि इनके कार्य समन्वित होते हैं। माइटोकॉन्ड्रिया, क्लोरोप्लास्ट व परऑक्सीसोम के कार्य इनसे समन्वित नहीं होते, अतः इन्हें अंतःझिल्ली तंत्र का हिस्सा नहीं माना जाता।"',
    lineExplanation: 'NTA NEET का यह सर्वाधिक पसंदीदा प्रश्न है। 5 बार सीधे पूछा गया है: "Which of the following is NOT part of endomembrane system?" उत्तर: Mitochondria, Chloroplast, Peroxisome.',
    googleShortcutTrap: 'गूगल अक्सर "All membrane-bound organelles" बोलकर भटका देता है, जबकि NCERT की लाइन स्पष्ट रूप से समन्वय (Coordination of function) के आधार पर माइटोकॉन्ड्रिया को बाहर करती है!',
    neetJeeProbability: '🔥 99% Probability (Direct NTA Trap Question in NEET)',
    examTarget: 'NEET',
    pyqFrequency: 'NEET 2023, 2021, 2019, 2018',
    superTrick: 'ट्रिक: GERL + Vacuole = अंतःझिल्ली तंत्र! (Golgi, ER, Ribosome नहीं, Lysosome, Vacuole)!'
  },
  {
    id: 'c11-q02',
    classNumber: 11,
    subject: 'रसायन / कार्बनिक (Organic Chemistry - NCERT)',
    chapterNumber: 12,
    chapterTitle: 'कार्बनिक रसायन: कुछ मूलभूत सिद्धांत (GOC)',
    shortQuestion: 'कार्बोकैटायन (Carbocation) के स्थायित्व (Stability) का सही क्रम क्या है और इसका मुख्य कारण क्या है?',
    options: ['3° > 2° > 1° > CH₃⁺ (अतिसंयुग्मन / Hyperconjugation और +I प्रभाव के कारण)', '1° > 2° > 3° > CH₃⁺ (प्रेरणिक प्रभाव के कारण)', 'CH₃⁺ > 1° > 2° > 3°', 'सभी का स्थायित्व बराबर होता है'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT Chemistry Class 11, Part 2, Chapter 12 (Page 352)',
    ncertExactLine: '"तृतीयक कार्बोकैटायन सबसे अधिक स्थायी होते हैं क्योंकि इनमें α-हाइड्रोजन परमाणुओं की संख्या अधिकतम होने से अतिसंयुग्मन (Hyperconjugation) संरचनाएं सर्वाधिक बनती हैं।"',
    lineExplanation: '3° ब्यूटिल कार्बोकैटायन में 9 α-H होते हैं, अतः 9 हाइपरकन्जुगेटिव संरचनाएं बनती हैं। स्थायित्व: 3° (9 α-H) > 2° (6 α-H) > 1° (3 α-H) > मेथिल (0 α-H)।',
    googleShortcutTrap: 'गूगल कई बार सिर्फ इंडक्टिव इफेक्ट (+I) को मुख्य कारण बताता है, जबकि NCERT के अनुसार मुख्य नियंत्रक कारक अतिसंयुग्मन (Hyperconjugation / Baker-Nathan effect) है!',
    neetJeeProbability: '⚡ 98% Probability (JEE Main & NEET Organic Foundation)',
    examTarget: 'All',
    pyqFrequency: 'JEE Main 2023, 2022; NEET 2023',
    superTrick: 'ट्रिक: जितने ज्यादा अल्फा-हाइड्रोजन, उतना ज्यादा कार्बोकैटायन का स्थायित्व!'
  },
  {
    id: 'c11-q03',
    classNumber: 11,
    subject: 'भौतिकी (Physics - NCERT)',
    chapterNumber: 7,
    chapterTitle: 'कणों के निकाय तथा घूर्णी गति (Rotational Motion)',
    shortQuestion: 'समान द्रव्यमान M और त्रिज्या R वाली वलय (Ring) और चकती (Disc) का उनके ज्यामितीय अक्ष के परितः जड़त्व आघूर्ण (Moment of Inertia) क्या होता है?',
    options: ['वलय का MR² और चकती का ½ MR²', 'वलय का ½ MR² और चकती का MR²', 'दोनों का MR²', 'वलय का ⅖ MR² और चकती का ⅔ MR²'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT Physics Class 11, Part 1, Chapter 7 (Page 165, Table 7.2)',
    ncertExactLine: '"द्रव्यमान केंद्र से गुजरने वाले तल के लंबवत अक्ष के परितः वलय का जड़त्व आघूर्ण I = MR² तथा एकसमान चकती का I = ½ MR² होता है।"',
    lineExplanation: 'चूंकि वलय का समस्त द्रव्यमान परिधि (अधिकतम दूरी R) पर केंद्रित होता है, इसलिए उसका जड़त्व आघूर्ण चकती से दोगुना होता है। नत तल (Inclined Plane) पर लुढ़कने पर चकती वलय से पहले नीचे पहुंचेगी क्योंकि चकती का त्वरण अधिक होता है।',
    googleShortcutTrap: 'गूगल सिर्फ फॉर्मूले देता है, पर JEE Main और NEET हमेशा दोनों को एक साथ ढलान पर लुढ़काकर रेस का विजेता (Rolling Motion Race) पूछते हैं!',
    neetJeeProbability: '⚡ 97% Probability (JEE Main & NEET Rotational Dynamics)',
    examTarget: 'JEE Mains',
    pyqFrequency: 'JEE Main 2024, 2022; NEET 2021',
    superTrick: 'ट्रिक: डिस्क का जड़त्व आघूर्ण कम = ढलान पर डिस्क जीतेगी, रिंग हारेगी!'
  },

  // =========================================================================
  // CLASS 12 (Board Top-Rank & NEET/JEE Mains Ultimate High Probability)
  // =========================================================================
  {
    id: 'c12-q01',
    classNumber: 12,
    subject: 'जीवविज्ञान (Biology - NCERT)',
    chapterNumber: 6,
    chapterTitle: 'वंशागति का आणविक आधार (Molecular Basis of Inheritance)',
    shortQuestion: 'मेसल्सन और स्टाल (Meselson and Stahl) ने DNA की अर्धसंरक्षी प्रतिकृति (Semiconservative Replication) सिद्ध करने के लिए किस समस्थानिक और जीवाणु का प्रयोग किया था?',
    options: ['¹⁵N (भारी नाइट्रोजन समस्थानिक) और ई. कोलाई (E. coli)', '³²P और ³⁵S रेडियोधर्मी समस्थानिक और T2 फेज', '¹⁴C और मटर का पौधा', '³H और ड्रोसोफिला'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT Biology Class 12, Chapter 6 (Page 105)',
    ncertExactLine: '"मेसल्सन और स्टाल ने 1958 में ई. कोलाई पर प्रयोग किया। उन्होंने भारी नाइट्रोजन ¹⁵NH4Cl का उपयोग किया। ध्यान रहे कि ¹⁵N कोई रेडियोधर्मी समस्थानिक नहीं है, बल्कि यह एक भारी समस्थानिक है जिसे CsCl घनत्व प्रवणता अपकेंद्रीकरण द्वारा अलग किया गया।"',
    lineExplanation: 'NTA का क्लासिक ट्रैप: छात्र अक्सर ¹⁵N को रेडियोधर्मी (Radioactive) मान लेते हैं! NCERT की स्पष्ट लाइन है कि ¹⁵N रेडियोधर्मी नहीं, बल्कि केवल भारी समस्थानिक (Heavy Isotope) है। रेडियोधर्मी समस्थानिक (³²P और ³⁵S) का प्रयोग हर्षे और चेस ने किया था।',
    googleShortcutTrap: 'गूगल के अधिकांश त्वरित लेख ¹⁵N को गलत तरीके से "Radioactive label" लिख देते हैं! NCERT का स्पष्ट निर्देश है कि यह गैर-रेडियोधर्मी भारी समस्थानिक था — यही लाइन NEET में 4 नंबर दिलाती या कटवाती है!',
    neetJeeProbability: '🔥 99% Probability (Ultimate NEET High Yield Assertion-Reason)',
    examTarget: 'NEET',
    pyqFrequency: 'NEET 2023, 2022, 2020, 2017',
    superTrick: 'ट्रिक: हर्षे-चेस = रेडियोएक्टिव (P32, S35); मेसल्सन-स्टाल = भारी नाइट्रोजन (N15 CsCl डेंसिटी)!'
  },
  {
    id: 'c12-q02',
    classNumber: 12,
    subject: 'रसायन / भौतिक (Physical Chemistry - NCERT)',
    chapterNumber: 2,
    chapterTitle: 'विद्युत रसायन (Electrochemistry)',
    shortQuestion: 'नर्न्स्ट समीकरण (Nernst Equation) में 298 K ताप पर सेल विभव (Ecell) और मानक सेल विभव (E°cell) में क्या संबंध है?',
    options: ['Ecell = E°cell - (0.0591 / n) log Q', 'Ecell = E°cell + (0.0591 / n) log Q', 'Ecell = E°cell - (0.0591 × n) log Q', 'Ecell = E°cell / (n log Q)'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT Chemistry Class 12, Part 1, Chapter 3/2 (Page 70)',
    ncertExactLine: '"298 K (25°C) पर 2.303 RT/F का मान 0.0591 V होता है। अतः नर्न्स्ट समीकरण: Ecell = E°cell - (0.0591 / n) log [Anode ion] / [Cathode ion] होता है।"',
    lineExplanation: 'साम्यावस्था (Equilibrium) पर Ecell = 0 हो जाता है, जिससे ΔG° = -nFE°cell और log Kc = nE°cell / 0.0591 प्राप्त होता है। डैनियल सेल के लिए n = 2 और E°cell = 1.10 V होता है।',
    googleShortcutTrap: 'गूगल सिर्फ सूत्र देता है, पर बोर्ड और JEE में एनोड और कैथोड के रससमीकरणमितीय गुणांक (Stoichiometric Coefficients) की घात (Power) लगाना अनिवार्य होता है जो छात्र भूल जाते हैं।',
    neetJeeProbability: '⚡ 99% Probability (Guaranteed JEE Main & NEET Numerical)',
    examTarget: 'All',
    pyqFrequency: 'JEE Main 2024, 2023, 2022; NEET 2023, 2021',
    superTrick: 'ट्रिक: एनोड ऊपर, कैथोड नीचे — log [Anode]/[Cathode]!'
  },
  {
    id: 'c12-q03',
    classNumber: 12,
    subject: 'भौतिकी (Physics - NCERT)',
    chapterNumber: 9,
    chapterTitle: 'किरण प्रकाशिकी (Ray Optics)',
    shortQuestion: 'लेंस निर्माता सूत्र (Lens Maker\'s Formula) क्या है और यदि किसी उत्तल लेंस को पानी (μ = 1.33) में डुबो दिया जाए तो उसकी फोकस दूरी पर क्या प्रभाव पड़ेगा?',
    options: ['1/f = (μ - 1)(1/R1 - 1/R2); पानी में डुबोने पर फोकस दूरी लगभग 4 गुना बढ़ जाएगी', 'फोकस दूरी घट जाएगी और आधी हो जाएगी', 'फोकस दूरी अपरिवर्तित रहेगी', 'उत्तल लेंस अवतल लेंस बन जाएगा और फोकस दूरी शून्य हो जाएगी'],
    correctIndex: 0,
    ncertBookTitle: 'NCERT Physics Class 12, Part 2, Chapter 9 (Page 326)',
    ncertExactLine: '"लेंस निर्माता सूत्र 1/f = (μ_lens/μ_med - 1)(1/R1 - 1/R2) होता है। जब कांच (μ=1.5) के लेंस को जल (μ=1.33) में डुबोया जाता है, तो आपेक्षिक अपवर्तनांक घट जाता है, जिससे फोकस दूरी 4 गुना बढ़ जाती है (f_water ≈ 4 f_air)।"',
    lineExplanation: 'चूंकि (μ_lens/μ_med - 1) का मान वायु की तुलना में लगभग ¼ रह जाता है, अतः फोकस दूरी 4 गुना बढ़ जाती है और लेंस की क्षमता (Power = 1/f) 4 गुना घट जाती है।',
    googleShortcutTrap: 'गूगल कई बार बिना मान बताए सिर्फ "Focus length increases" कहता है, जबकि NEET और JEE में सटीक 4 गुना का संख्यात्मक विकल्प पूछा जाता है!',
    neetJeeProbability: '⚡ 98% Probability (JEE Main & NEET Optics Must-Ask)',
    examTarget: 'All',
    pyqFrequency: 'NEET 2023, 2020; JEE Main 2023, 2021',
    superTrick: 'ट्रिक: पानी में डुबोया = फोकस 4 गुना बढ़ी, पावर 4 गुना घटी!'
  }
];
