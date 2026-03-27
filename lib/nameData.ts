// lib/nameData.ts
// All character pools, phoneme maps, pinyin, and meanings

export type Style = "classic" | "nature" | "modern" | "poetic" | "lucky";
export type Gender = "male" | "female" | "neutral";

// ── Phoneme map: English sound prefix → candidate Chinese chars ──
export const PHONEME_MAP: Record<string, string[]> = {
  al: ["雅","艾","安"], an: ["安","晏","雅"], ar: ["雅","婉"], be: ["贝","蓓","蕾"],
  br: ["博","柏"], ca: ["嘉","佳","珂"], ch: ["晨","澄","婵"], cl: ["柯","可"],
  co: ["可","珂"], da: ["达","黛"], de: ["德","蝶"], di: ["迪","蒂","黛"],
  el: ["艾","伊","怡"], em: ["恩","艾","雯"], en: ["恩","安","雯"], er: ["尔","艾","儿"],
  ev: ["伊","艾","怡"], fr: ["芙","菲"], ga: ["嘉","佳","雅"], ge: ["格","歌"],
  gr: ["格","歌"], ha: ["涵","晗","菡"], he: ["和","荷","贺"], hi: ["熙","希","曦"],
  ho: ["浩","昊","荷"], hu: ["华","卉"], ja: ["嘉","佳","嘉"], je: ["洁","婕","杰"],
  jo: ["乔","珏","娇"], ju: ["菊","珏","娟"], ka: ["嘉","珂"], ke: ["柯","可","珂"],
  ki: ["琪","琦","绮"], la: ["兰","岚","澜"], le: ["乐","蕾"], li: ["丽","莉","俪"],
  lo: ["洛","珞"], lu: ["露","璐","鹿"], ly: ["丽","莉","俪"], ma: ["玛","曼","茉"],
  me: ["美","梅","玫"], mi: ["敏","蜜","觅"], mo: ["墨","茉"], na: ["娜","纳","雅"],
  ni: ["妮","霓","旎"], no: ["诺","娜","诺"], ol: ["奥","欧"], pa: ["佩","沛"],
  pe: ["培","佩","沛"], ph: ["菲","霏"], ra: ["瑞","蕊"], re: ["瑞","蕊"],
  ri: ["瑞","蕊","芮"], ro: ["若","洛"], ru: ["如","茹","汝"], sa: ["莎","飒"],
  se: ["思","瑟","瑟"], sh: ["珊","善","姝"], si: ["思","丝","斯"], so: ["苏","素"],
  st: ["思","诗"], su: ["苏","素","舒"], ta: ["泰","婷"], te: ["婷","恬"],
  th: ["婷","恬"], ti: ["婷","恬","缇"], to: ["彤","桐"], tr: ["婷","恬"],
  va: ["薇","婉"], ve: ["维","薇","婉"], vi: ["维","薇","微"], wa: ["华","婉","薇"],
  wi: ["薇","微"], xa: ["霞","夏","暇"], xi: ["熙","希","曦"], ya: ["雅","娅"],
  ye: ["叶","晔","烨"], yo: ["悠","优","瑶"], yu: ["玉","宇","瑜"], za: ["泽","紫"],
  ze: ["泽","则","紫"], zh: ["珍","真","芷"], zi: ["紫","子","姿"], zo: ["卓","佐"],
  a:  ["雅","安","婉"], e: ["伊","依","怡"], i: ["伊","依","怡"],
  o:  ["欧","奥"],      u: ["宇","玉","瑜"],
};

// ── Character pools by style × gender ──
export const CHAR_POOLS: Record<Style, Record<Gender, string[]>> = {
  classic: {
    male:    ["文","武","礼","义","仁","智","信","忠","孝","廉","明","德","正","刚","毅","博","远","志","恒","诚"],
    female:  ["雅","淑","贤","慧","婉","柔","静","端","秀","芳","兰","梅","菊","莲","珍","玉","琴","书","诗","画"],
    neutral: ["文","雅","礼","慧","静","明","德","诚","远","志","秀","芳","贤","博","仁"],
  },
  nature: {
    male:    ["山","川","林","海","云","风","石","松","竹","鹰","虎","龙","鹤","江","岳","峰","天","原","野","河"],
    female:  ["花","草","叶","溪","雨","雪","霜","露","莺","燕","蝶","荷","桃","柳","梅","兰","菊","竹","云","月"],
    neutral: ["云","风","林","溪","雪","月","松","竹","山","川","叶","花","海","天","霜"],
  },
  modern: {
    male:    ["博","睿","晟","昊","宇","泽","轩","逸","凯","铭","浩","翔","辰","锐","杰","豪","磊","鑫","旭","晨"],
    female:  ["萱","涵","悦","欣","怡","颖","琳","雯","婷","晴","妍","嘉","佳","璐","瑶","梦","诗","语","心","若"],
    neutral: ["博","睿","涵","悦","欣","怡","颖","嘉","佳","晨","宇","泽","轩","逸","旭"],
  },
  poetic: {
    male:    ["墨","砚","笔","卷","词","赋","吟","咏","韵","律","弦","琴","棋","书","画","诗","酒","剑","侠","风"],
    female:  ["诗","词","曲","赋","韵","律","琴","瑟","笛","箫","墨","砚","画","卷","香","影","梦","幻","烟","霞"],
    neutral: ["诗","词","韵","墨","琴","画","卷","风","影","梦","吟","咏","弦","律","香"],
  },
  lucky: {
    male:    ["福","禄","寿","喜","财","吉","祥","瑞","庆","昌","盛","兴","旺","荣","贵","宝","金","玉","龙","凤"],
    female:  ["福","喜","吉","祥","瑞","庆","荣","贵","宝","玉","金","凤","莺","燕","珠","翠","锦","绣","华","彩"],
    neutral: ["福","吉","祥","瑞","庆","荣","宝","玉","金","华","喜","昌","盛","兴","彩"],
  },
};

// ── Common surnames ──
export const SURNAMES = [
  "李","王","张","刘","陈","杨","赵","黄","周","吴",
  "徐","孙","胡","朱","高","林","何","郭","马","罗",
  "梁","宋","郑","谢","韩","唐","冯","于","董","萧",
];

// ── Pinyin lookup (split to avoid duplicate-key TS error) ──
const _PY1: Record<string, string> = {
  李:"Lǐ",王:"Wáng",张:"Zhāng",刘:"Liú",陈:"Chén",杨:"Yáng",赵:"Zhào",黄:"Huáng",周:"Zhōu",吴:"Wú",
  徐:"Xú",孙:"Sūn",胡:"Hú",朱:"Zhū",高:"Gāo",林:"Lín",何:"Hé",郭:"Guō",马:"Mǎ",罗:"Luó",
  梁:"Liáng",宋:"Sòng",郑:"Zhèng",谢:"Xiè",韩:"Hán",唐:"Táng",冯:"Féng",于:"Yú",董:"Dǒng",萧:"Xiāo",
  文:"Wén",武:"Wǔ",礼:"Lǐ",义:"Yì",仁:"Rén",智:"Zhì",信:"Xìn",忠:"Zhōng",孝:"Xiào",廉:"Lián",
  明:"Míng",德:"Dé",正:"Zhèng",刚:"Gāng",毅:"Yì",博:"Bó",远:"Yuǎn",志:"Zhì",恒:"Héng",诚:"Chéng",
  雅:"Yǎ",淑:"Shū",贤:"Xián",慧:"Huì",婉:"Wǎn",柔:"Róu",静:"Jìng",端:"Duān",秀:"Xiù",芳:"Fāng",
  兰:"Lán",梅:"Méi",菊:"Jú",莲:"Lián",珍:"Zhēn",玉:"Yù",琴:"Qín",书:"Shū",诗:"Shī",画:"Huà",
  山:"Shān",川:"Chuān",海:"Hǎi",云:"Yún",风:"Fēng",石:"Shí",松:"Sōng",竹:"Zhú",
  鹰:"Yīng",虎:"Hǔ",龙:"Lóng",鹤:"Hè",江:"Jiāng",河:"Hé",岳:"Yuè",峰:"Fēng",原:"Yuán",野:"Yě",天:"Tiān",
  花:"Huā",草:"Cǎo",叶:"Yè",溪:"Xī",雨:"Yǔ",雪:"Xuě",霜:"Shuāng",露:"Lù",莺:"Yīng",燕:"Yàn",
  蝶:"Dié",荷:"Hé",桃:"Táo",柳:"Liǔ",月:"Yuè",
  睿:"Ruì",晟:"Shèng",昊:"Hào",宇:"Yǔ",泽:"Zé",轩:"Xuān",逸:"Yì",凯:"Kǎi",铭:"Míng",浩:"Hào",
  翔:"Xiáng",辰:"Chén",锐:"Ruì",杰:"Jié",豪:"Háo",磊:"Lěi",鑫:"Xīn",旭:"Xù",晨:"Chén",
  萱:"Xuān",涵:"Hán",悦:"Yuè",欣:"Xīn",怡:"Yí",颖:"Yǐng",琳:"Lín",雯:"Wén",婷:"Tíng",晴:"Qíng",
  妍:"Yán",嘉:"Jiā",佳:"Jiā",璐:"Lù",瑶:"Yáo",梦:"Mèng",语:"Yǔ",心:"Xīn",若:"Ruò",
  墨:"Mò",砚:"Yàn",笔:"Bǐ",卷:"Juǎn",词:"Cí",赋:"Fù",吟:"Yín",咏:"Yǒng",韵:"Yùn",律:"Lǜ",
  弦:"Xián",棋:"Qí",酒:"Jiǔ",剑:"Jiàn",侠:"Xiá",曲:"Qǔ",瑟:"Sè",笛:"Dí",箫:"Xiāo",
  香:"Xiāng",影:"Yǐng",幻:"Huàn",烟:"Yān",霞:"Xiá",
  福:"Fú",禄:"Lù",寿:"Shòu",喜:"Xǐ",财:"Cái",吉:"Jí",祥:"Xiáng",瑞:"Ruì",庆:"Qìng",昌:"Chāng",
  盛:"Shèng",兴:"Xīng",旺:"Wàng",荣:"Róng",贵:"Guì",宝:"Bǎo",金:"Jīn",凤:"Fèng",珠:"Zhū",
  翠:"Cuì",锦:"Jǐn",绣:"Xiù",华:"Huá",彩:"Cǎi",
};
const _PY2: Record<string, string> = {
  阿:"Ā",艾:"Ài",安:"Ān",晏:"Yàn",贝:"Bèi",蓓:"Bèi",布:"Bù",卡:"Kǎ",
  澄:"Chéng",克:"Kè",柯:"Kē",可:"Kě",科:"Kē",达:"Dá",迪:"Dí",蒂:"Dì",
  伊:"Yī",依:"Yī",宜:"Yí",仪:"Yí",尔:"Ěr",弗:"Fú",格:"Gé",戈:"Gē",
  葛:"Gé",哈:"Hā",赫:"Hè",和:"Hé",熙:"Xī",希:"Xī",
  乔:"Qiáo",珏:"Jué",奇:"Qí",琪:"Qí",
  拉:"Lā",乐:"Lè",勒:"Lè",丽:"Lì",莉:"Lì",洛:"Luò",鲁:"Lǔ",
  玛:"Mǎ",美:"Měi",敏:"Mǐn",米:"Mǐ",默:"Mò",娜:"Nà",纳:"Nà",妮:"Nī",倪:"Ní",
  诺:"Nuò",欧:"Ōu",奥:"Ào",佩:"Pèi",帕:"Pà",培:"Péi",菲:"Fēi",飞:"Fēi",
  如:"Rú",茹:"Rú",莎:"Shā",萨:"Sà",珊:"Shān",善:"Shàn",
  思:"Sī",斯:"Sī",苏:"Sū",素:"Sù",索:"Suǒ",泰:"Tài",塔:"Tǎ",特:"Tè",
  缇:"Tí",陶:"Táo",托:"Tuō",薇:"Wēi",维:"Wéi",威:"Wēi",瓦:"Wǎ",
  夏:"Xià",亚:"Yà",耶:"Yē",悠:"Yōu",优:"Yōu",紫:"Zǐ",子:"Zǐ",卓:"Zhuó",
  佐:"Zuǒ",则:"Zé",真:"Zhēn",
};
export const PINYIN: Record<string, string> = Object.assign({}, _PY1, _PY2);

// ── Character meanings (split to avoid duplicate-key TS error) ──
const _M1: Record<string, string> = {
  文:"culture & refinement",武:"strength & valor",礼:"courtesy & rite",义:"righteousness",
  仁:"benevolence",智:"wisdom",信:"integrity & trust",忠:"loyalty",孝:"filial devotion",廉:"moral purity",
  明:"brightness & clarity",德:"virtue & character",正:"uprightness",刚:"fortitude",毅:"perseverance",
  博:"broad learning",远:"far-reaching vision",志:"ambition & will",恒:"steadfastness",诚:"sincerity",
  雅:"elegance & grace",淑:"gentle & virtuous",贤:"worthy & wise",慧:"intelligence",婉:"graceful & gentle",
  柔:"soft & gentle",静:"serene & calm",端:"dignified",秀:"beautiful & talented",芳:"fragrant & virtuous",
  兰:"orchid — noble beauty",梅:"plum blossom — resilience",菊:"chrysanthemum — integrity",
  莲:"lotus — purity",珍:"precious & rare",玉:"jade — virtue & beauty",琴:"music & harmony",
  书:"learning & scholarship",诗:"poetry & artistry",画:"painting & creativity",
  山:"mountain — steadfast & enduring",川:"river — flowing & constant",林:"forest — thriving",
  海:"ocean — vast & boundless",云:"cloud — free spirit",风:"wind — swift & free",
  石:"stone — solid & reliable",松:"pine — enduring through hardship",竹:"bamboo — resilience",
  鹰:"eagle — soaring ambition",虎:"tiger — powerful & brave",龙:"dragon — auspicious & noble",
  鹤:"crane — longevity & grace",江:"great river — mighty",河:"river — constant flow",
  岳:"mountain peak — lofty ideals",峰:"summit — reaching the top",天:"sky — boundless",
  原:"vast plain — open heart",野:"open field — free spirit",
  花:"flower — beauty & bloom",草:"grass — vitality",叶:"leaf — renewal & growth",
  溪:"stream — gentle & clear",雨:"rain — nourishing life",雪:"snow — pure & clean",
  霜:"frost — crisp & clear",露:"dew — fresh & new",莺:"oriole — melodious voice",
  燕:"swallow — grace & speed",蝶:"butterfly — transformation",荷:"lotus — purity",
  桃:"peach — luck & longevity",柳:"willow — graceful & flexible",月:"moon — gentle light",
  睿:"wise & perceptive",晟:"brilliant & radiant",昊:"vast sky",宇:"universe & ambition",
  泽:"grace & blessing",轩:"elegant & distinguished",逸:"free & easy spirit",凯:"triumph & victory",
  铭:"inscribed in the heart",浩:"vast & grand",翔:"soaring high",辰:"morning star",
  锐:"sharp & keen",杰:"outstanding & heroic",豪:"heroic & generous",磊:"upright & honest",
  鑫:"prosperity & abundance",旭:"rising sun",晨:"dawn — new beginnings",
  萱:"daylily — joy & forgetting sorrow",涵:"encompassing & tolerant",悦:"joyful",欣:"delighted",
  怡:"cheerful & content",颖:"gifted & talented",琳:"beautiful jade",雯:"colorful clouds",
  婷:"graceful & slender",晴:"sunny & bright",妍:"beautiful",嘉:"excellent & admirable",
  佳:"wonderful & fine",璐:"clear jade",瑶:"precious jade",梦:"dream & aspiration",
  语:"eloquence & expression",心:"heart & sincerity",若:"like — gentle as water",
  墨:"ink — scholarly spirit",砚:"inkstone — studious",笔:"brush — creative expression",
  卷:"scroll — learned",词:"lyric poetry",赋:"ode — literary talent",吟:"chanting verse",
  咏:"singing praise",韵:"rhyme & rhythm",律:"melody & order",弦:"string — musical soul",
  棋:"chess — strategic mind",酒:"wine — free spirit",剑:"sword — chivalry",侠:"knight — heroic",
  曲:"melody — artistic",瑟:"zither — refined taste",笛:"flute — lyrical",箫:"bamboo flute — serene",
  香:"fragrance — lasting impression",影:"shadow — artistic depth",幻:"ethereal beauty",
  烟:"mist — poetic mystery",霞:"rosy clouds — radiant",
  福:"fortune & happiness",禄:"prosperity & success",寿:"longevity",喜:"joy & celebration",
  财:"wealth & abundance",吉:"auspicious",祥:"good omen",瑞:"propitious & lucky",
  庆:"celebration",昌:"flourishing",盛:"thriving",兴:"rising & prosperous",旺:"prosperous",
  荣:"glory & honor",贵:"noble & precious",宝:"treasure",金:"gold — precious",
  凤:"phoenix — grace & rebirth",珠:"pearl — rare beauty",翠:"emerald — vibrant",
  锦:"brocade — splendid",绣:"embroidery — fine craft",华:"splendor & brilliance",彩:"colorful brilliance",
};
const _M2: Record<string, string> = {
  阿:"a gentle, approachable spirit",艾:"resilience & warmth",安:"peace & tranquility",
  晏:"calm & serene",贝:"precious as a shell",澄:"clear & pure",
  伊:"graceful & refined",依:"gentle reliance",宜:"fitting & harmonious",仪:"dignified bearing",
  欧:"vast & open",奥:"deep & profound",乔:"tall & upright",珏:"paired jade — harmony",
  奇:"remarkable & unique",琪:"fine jade",拉:"bright & cheerful",乐:"joy & happiness",
  丽:"beautiful & radiant",莉:"jasmine — pure fragrance",洛:"river — flowing grace",
  美:"beauty & goodness",敏:"quick-minded & perceptive",默:"quiet depth & contemplation",
  娜:"graceful & elegant",妮:"gentle & sweet",诺:"promise & integrity",
  佩:"admirable & worthy",培:"nurturing growth",菲:"fragrant & beautiful",飞:"soaring & free",
  如:"gentle as water",茹:"enduring & steadfast",莎:"graceful as a reed",
  思:"thoughtful & reflective",苏:"reviving & refreshing",泰:"peaceful & grand",
  蒂:"rooted & steadfast",陶:"joyful & content",薇:"delicate & beautiful",
  维:"upholding & steadfast",威:"dignified presence",夏:"vibrant summer energy",亚:"second to none",
  悠:"leisurely & far-reaching",优:"excellent & graceful",紫:"noble purple — dignity",
  子:"learned & virtuous",卓:"outstanding & distinguished",佐:"supportive & loyal",
  真:"genuine & sincere",
};
export const MEANINGS: Record<string, string> = Object.assign({}, _M1, _M2);
