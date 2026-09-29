/* Bài học chi tiết — batch H: nhóm 5 nét + 6 nét (22/27 bộ)
   5 nét: 玄 甘 生 用 疋 癶 皮 皿 矛 矢 禸
   6 nét: 缶 而 聿 臣 至 臼 舌 舛 艮 虍 襾
   5 bộ dưới 3 chữ jōyō KHÔNG viết bài, chỉ có ghi chú trong LESSON_NOTES:
   97 瓜 (弧 孤 — bản thân 瓜 không thuộc jōyō) · 98 瓦 (瓶) · 127 耒 (耕 耗) · 139 色 (艶 絶) · 143 血 (衆).
   Đã kiểm tra grade trên kanjiapi.dev cho các chữ hiếm: mọi ví dụ đều là jōyō (grade ≤ 8). */
window.LESSONS = window.LESSONS || {};
window.LESSON_NOTES = window.LESSON_NOTES || {};

Object.assign(window.LESSON_NOTES, {
  97: "Bộ 瓜 (Qua) — hình quả dưa treo lủng lẳng giữa hai cọng dây. Chính chữ 瓜 (うり: dưa) không nằm trong bảng chữ Hán thông dụng (jōyō), và bảng này chỉ có 2 chữ chứa 瓜 — 弧 (HỒ, こ: cung tròn, 括弧 dấu ngoặc) và 孤 (CÔ, こ: cô độc, 孤独). Không đủ chữ để làm thành bài phân tích riêng, nên bộ này chỉ có phần phiên âm / nghĩa và vẫn dùng đầy đủ ở hai dạng luyện tập.",
  98: "Bộ 瓦 (Ngoã) — hình viên ngói cong úp lên nhau, chỉ đồ đất nung. Ngoài chính chữ 瓦 (かわら: ngói), bảng chữ Hán thông dụng (jōyō) chỉ có 1 chữ thuộc bộ này — 瓶 (BÌNH, びん: cái chai, lọ — 花瓶 bình hoa). Không đủ chữ để làm thành bài phân tích riêng, nên bộ này chỉ có phần phiên âm / nghĩa và vẫn dùng đầy đủ ở hai dạng luyện tập.",
  127: "Bộ 耒 (Lỗi) — cái cày gỗ có cán cong. Bảng chữ Hán thông dụng (jōyō) chỉ có 2 chữ chứa bộ này — 耕 (CANH, こう / たがや-す: cày ruộng, 農耕) và 耗 (HAO, もう: hao mòn, 消耗). Không đủ chữ để làm thành bài phân tích riêng, nên bộ này chỉ có phần phiên âm / nghĩa và vẫn dùng đầy đủ ở hai dạng luyện tập.",
  139: "Bộ 色 (Sắc) — người đứng trên người quỳ, gương mặt biến sắc. Ngoài chính chữ 色 (しょく / しき / いろ: màu sắc — 景色, 色々), bảng chữ Hán thông dụng (jōyō) chỉ có 2 chữ chứa bộ này — 艶 (DIỄM, えん / つや: bóng mượt, diễm lệ) và 絶 (TUYỆT, ぜつ / た-える: tuyệt đối, dứt — 絶対). Không đủ chữ để làm thành bài phân tích riêng, nên bộ này chỉ có phần phiên âm / nghĩa và vẫn dùng đầy đủ ở hai dạng luyện tập.",
  143: "Bộ 血 (Huyết) — cái bát 皿 có giọt máu tế ở trên. Ngoài chính chữ 血 (けつ / ち: máu — 血液, 出血), bảng chữ Hán thông dụng (jōyō) chỉ có 1 chữ thuộc bộ này — 衆 (CHÚNG, しゅう: đám đông — 民衆, 観衆). Không đủ chữ để làm thành bài phân tích riêng, nên bộ này chỉ có phần phiên âm / nghĩa và vẫn dùng đầy đủ ở hai dạng luyện tập."
});

Object.assign(window.LESSONS, {

95: {
  emoji: "🧶",
  hinhDung: "Sợi tơ nhuộm đen treo lơ lửng — mờ tối, sâu thẳm.",
  yNghia: "Đen huyền, sâu kín — màu đen pha đỏ thẫm, điều huyền bí khó thấy.",
  trongKanji: "Trong Kanji, 玄 thường là sợi dây mảnh (弦, 率) hoặc sợi dây buộc gia súc (畜, 蓄).",
  cachNho: "亠 (nắp) + 幺 (sợi tơ nhỏ) — sợi tơ nhỏ treo dưới nắp, khuất trong bóng tối.",
  bienThe: "Chỉ một dạng 玄. Bộ hiếm: chỉ 率 thuộc bộ này; 3 chữ còn lại chứa 玄 làm thành phần.",
  viDu: [
    { k:"率", hv:"SUẤT", on:"りつ / そつ / ひき-いる", vi:"tỷ lệ; dẫn dắt", lv:"N2", ham:"玄 (sợi dây) ở giữa, hai bên là giọt nước — tấm lưới dây kéo cả đoàn: dẫn dắt, 率いる; rồi 'tỷ lệ', 確率." },
    { k:"畜", hv:"SÚC", on:"ちく", vi:"gia súc", lv:"N1", ham:"玄 (dây buộc) + 田 (ruộng) — bộ chính là 田. Con vật buộc dây nuôi ở ruộng: 家畜, 畜産." },
    { k:"蓄", hv:"SÚC", on:"ちく / たくわ-える", vi:"tích trữ", lv:"N1", ham:"艹 + 畜 — bộ chính là 艹. Dành dụm cỏ khô cho gia súc qua đông: 貯蓄 (tiết kiệm), 蓄える." },
    { k:"弦", hv:"HUYỀN", on:"げん / つる", vi:"dây cung, dây đàn", lv:"N1", ham:"弓 (cung) + 玄 (sợi dây) — bộ chính là 弓. Sợi dây căng trên cánh cung: 弦楽器." }
  ]
},

99: {
  emoji: "🍯",
  hinhDung: "Cái miệng 口 ngậm một vật ngọt ở giữa (vạch ngang).",
  yNghia: "Ngọt — vị ngọt ngậm trong miệng; mở rộng thành nuông chiều, dễ dãi.",
  trongKanji: "Trong Kanji, 甘 thường CHỈ ÂM (KAN / BOU / KON): 紺, 勘, 堪, 某, 謀, 媒.",
  cachNho: "Hình cái miệng 口 kéo dài hai bên, bên trong ngậm một viên kẹo.",
  bienThe: "Chỉ một dạng 甘. Bộ hiếm: chỉ 甚 thuộc bộ này; các chữ sau chứa 甘 / 甚 / 某.",
  viDu: [
    { k:"甚", hv:"THẬM", on:"じん / はなは-だ", vi:"rất, quá mức", lv:"N1", ham:"甘 (ngọt, thú vui) + 匹 (đôi lứa) — ham vui quá độ: rất, 甚だしい, 甚大." },
    { k:"勘", hv:"KHÁM", on:"かん", vi:"trực giác; tính toán", lv:"N1", ham:"甚 + 力 (sức) — bộ chính là 力. Dùng sức mà suy xét kỹ: 勘 (linh cảm), 勘違い (hiểu lầm)." },
    { k:"堪", hv:"KHAM", on:"かん / た-える", vi:"chịu đựng", lv:"N1", ham:"土 (đất) + 甚 — bộ chính là 土. Đất gánh nổi sức nặng: chịu được, 堪える." },
    { k:"紺", hv:"CÁM", on:"こん", vi:"màu xanh đậm", lv:"N1", ham:"糸 (tơ) + 甘 (âm KON) — bộ chính là 糸. Tơ nhuộm xanh thẫm: 紺色 (xanh navy)." },
    { k:"某", hv:"MỖ", on:"ぼう", vi:"người nọ, cái nọ", lv:"N1", ham:"甘 + 木 — bộ chính là 木. Vốn là cây mơ ngọt; mượn chỉ 'cái nào đó' không nói rõ: 某氏 (ông nọ)." },
    { k:"謀", hv:"MƯU", on:"ぼう / む / はか-る", vi:"mưu kế", lv:"N1", ham:"言 (lời) + 某 — bộ chính là 言. Lời bàn kín về chuyện 'nọ': 陰謀 (âm mưu)." },
    { k:"媒", hv:"MÔI", on:"ばい", vi:"môi giới", lv:"N1", ham:"女 (nữ) + 某 — bộ chính là 女. Người đàn bà đứng giữa làm mối: 媒介, 媒体 (truyền thông)." }
  ]
},

100: {
  emoji: "🌱",
  hinhDung: "Mầm cây đội đất mọc lên, trên có lá.",
  yNghia: "Sinh ra, sống — cây mọc lên từ đất; sự sống, sinh sản, sống sượng.",
  trongKanji: "Trong Kanji, 生 thường mang ý sinh ra, bản tính, sự sống, hoặc CHỈ ÂM SEI / SHOU (性, 星, 姓, 牲).",
  cachNho: "土 (đất) + mầm cây 𠂉 nhô lên trên — cây non đội đất.",
  bienThe: "Chỉ một dạng 生. Bộ hiếm: chỉ 産 thuộc bộ này; các chữ khác chứa 生 làm thành phần.",
  viDu: [
    { k:"産", hv:"SẢN", on:"さん / う-む", vi:"sinh sản, sản xuất", lv:"N3", ham:"立 + 生 (sinh) — cái mới được dựng lên và sinh ra: 生産, お土産 (quà)." },
    { k:"性", hv:"TÍNH", on:"せい / しょう", vi:"tính chất, giới tính", lv:"N3", ham:"忄 (lòng) + 生 (sinh ra) — bộ chính là 忄. Cái lòng có từ lúc sinh ra: bản tính, 性格, 女性." },
    { k:"星", hv:"TINH", on:"せい / ほし", vi:"ngôi sao", lv:"N4", ham:"日 (vốn là ba đốm sáng) + 生 (âm SEI) — bộ chính là 日. Những đốm sáng sinh ra trên trời: 星." },
    { k:"姓", hv:"TÍNH", on:"せい / しょう", vi:"họ (tên họ)", lv:"N1", ham:"女 (mẹ) + 生 (sinh) — bộ chính là 女. Người sinh ra từ mẹ nào, mang họ đó: 姓名, 百姓 (nông dân)." },
    { k:"牲", hv:"SINH", on:"せい", vi:"vật tế", lv:"N1", ham:"牜 (trâu) + 生 (sống) — bộ chính là 牛. Con vật sống đem tế: 犠牲." },
    { k:"隆", hv:"LONG", on:"りゅう", vi:"cao lên, thịnh vượng", lv:"N1", ham:"阝 (đồi) + 夂 + 生 (mọc lên) — bộ chính là 阝. Đất đồi nhô cao: 隆盛 (hưng thịnh)." }
  ]
},

101: {
  emoji: "🪣",
  hinhDung: "Cái thùng gỗ đóng bằng các nan dọc, có đai ngang.",
  yNghia: "Dùng, sử dụng — cái thùng là đồ dùng hàng ngày; mở rộng thành 'dùng, việc'.",
  trongKanji: "Trong Kanji, 用 hay nằm trong 甬 (thùng có quai → xuyên suốt, vọt lên) và 甫 (ruộng mạ bằng phẳng) — cả hai thường chỉ âm.",
  cachNho: "Cái thùng có hai nan dọc và hai đai ngang.",
  bienThe: "Chỉ một dạng 用. Bộ hiếm: không chữ jōyō nào khác lấy 用 làm bộ chính; các chữ dưới chứa 用 qua 甬 / 甫 / 𤰇.",
  viDu: [
    { k:"通", hv:"THÔNG", on:"つう / とお-る / かよ-う", vi:"đi qua, thông", lv:"N4", ham:"辶 (đi) + 甬 (ống thông) — bộ chính là 辶. Đi xuyên qua suốt: 通る, 交通." },
    { k:"痛", hv:"THỐNG", on:"つう / いた-い", vi:"đau", lv:"N3", ham:"疒 (bệnh) + 甬 (xuyên suốt) — bộ chính là 疒. Cơn đau chạy suốt người: 痛い, 頭痛." },
    { k:"勇", hv:"DŨNG", on:"ゆう / いさ-む", vi:"dũng cảm", lv:"N2", ham:"甬 (vọt lên) + 力 (sức) — bộ chính là 力. Sức dâng trào: 勇気 (dũng khí)." },
    { k:"踊", hv:"DŨNG", on:"よう / おど-る", vi:"nhảy múa", lv:"N3", ham:"⻊ (chân) + 甬 (vọt lên) — bộ chính là 足. Chân nhún nhảy: 踊る." },
    { k:"備", hv:"BỊ", on:"び / そな-える", vi:"chuẩn bị", lv:"N2", ham:"亻 (người) + 𤰇 (ống đựng tên, có 用) — bộ chính là 亻. Người đeo sẵn ống tên: sẵn sàng, 準備." },
    { k:"捕", hv:"BỘ", on:"ほ / と-らえる / つか-まる", vi:"bắt", lv:"N2", ham:"扌 (tay) + 甫 (âm HO) — bộ chính là 扌. Tay chộp lấy: 捕まえる, 逮捕." },
    { k:"浦", hv:"PHỐ", on:"ほ / うら", vi:"bến, vịnh nhỏ", lv:"N1", ham:"氵 (nước) + 甫 (bằng phẳng) — bộ chính là 氵. Bãi nước phẳng ven bờ: 浦 (trong nhiều địa danh)." },
    { k:"舗", hv:"PHỐ", on:"ほ", vi:"cửa hàng; lát đường", lv:"N1", ham:"舎 (nhà) + 甫 (phẳng) — bộ chính là 舌. Nhà mặt phố, mặt đường lát phẳng: 店舗, 舗装." }
  ]
},

103: {
  emoji: "🦶",
  hinhDung: "Cẳng chân với bàn chân bên dưới — đoạn từ đầu gối xuống.",
  yNghia: "Tấm vải; bàn chân — hình gốc là cẳng chân; sau mượn làm lượng từ đếm vải.",
  trongKanji: "Trong Kanji, 疋 (⺪ khi ở bên trái) là cái chân: đi xa, thưa thớt, nghi ngờ đứng lại.",
  cachNho: "Giống 足 (chân) nhưng không có 口 trên đầu — chỉ còn cẳng chân.",
  bienThe: "疋 nằm dưới đáy; làm bộ bên TRÁI viết thành ⺪ (疎). Bộ hiếm: 2 chữ thuộc bộ 疋 + 3 chữ có 疋 làm thành phần.",
  viDu: [
    { k:"疑", hv:"NGHI", on:"ぎ / うたが-う", vi:"nghi ngờ", lv:"N2", ham:"Người chống gậy ngoái đầu + 疋 (chân) đứng lại — ngập ngừng không biết đi đâu: 疑う, 疑問." },
    { k:"疎", hv:"SƠ", on:"そ / うと-い", vi:"thưa, xa cách", lv:"N1", ham:"⺪ (chân) + 束 (bó) — gỡ bó ra cho thưa: 疎い (không rành), 過疎 (thưa dân)." },
    { k:"定", hv:"ĐỊNH", on:"てい / じょう / さだ-める", vi:"định, cố định", lv:"N3", ham:"宀 (nhà) + 疋 (chân dừng lại) — bộ chính là 宀. Dừng chân ở yên trong nhà: 予定, 決定." },
    { k:"旋", hv:"TOÀN", on:"せん", vi:"xoay vòng", lv:"N1", ham:"方 (lá cờ) + 疋 (chân) — bộ chính là 方. Chân đi vòng theo lá cờ: 旋回 (lượn vòng)." },
    { k:"礎", hv:"SỞ", on:"そ / いしずえ", vi:"nền móng", lv:"N1", ham:"石 (đá) + 楚 (林 + 疋) — bộ chính là 石. Hòn đá kê chân cột: 基礎 (cơ sở)." }
  ]
},

105: {
  emoji: "👣",
  hinhDung: "Hai bàn chân xoè ra hai phía — bước chân bắt đầu lên đường.",
  yNghia: "Hai chân bước ngược ra — hai bàn chân dang ra, bước đi, trèo lên.",
  trongKanji: "Trong Kanji, 癶 luôn nằm TRÊN ĐẦU chữ: bước ra đi, trèo lên (発, 登).",
  cachNho: "Hai chữ 夂 quay lưng vào nhau — hai chân xoạc ra chuẩn bị bước.",
  bienThe: "Chỉ một dạng 癶, luôn ở TRÊN ĐẦU. Bộ hiếm: 2 chữ thuộc bộ 癶 + 2 chữ ghép từ chúng.",
  viDu: [
    { k:"発", hv:"PHÁT", on:"はつ / ほつ", vi:"phát ra, xuất phát", lv:"N4", ham:"癶 (hai chân bước ra) + 开 — dang chân lên đường: 出発, 発見, 発音." },
    { k:"登", hv:"ĐĂNG", on:"とう / と / のぼ-る", vi:"leo lên", lv:"N4", ham:"癶 (hai chân) + 豆 (bệ cao) — chân bước lên bệ: 登る (leo núi), 登録 (đăng ký)." },
    { k:"廃", hv:"PHẾ", on:"はい / すた-れる", vi:"bỏ, phế", lv:"N1", ham:"广 (nhà) + 発 — bộ chính là 广. Căn nhà bị bỏ đi: 廃止 (bãi bỏ), 廃墟." },
    { k:"澄", hv:"TRỪNG", on:"ちょう / す-む", vi:"trong vắt", lv:"N1", ham:"氵 (nước) + 登 (lắng lên) — bộ chính là 氵. Nước lắng cặn, trong suốt: 澄む." }
  ]
},

107: {
  emoji: "🧥",
  hinhDung: "Bàn tay 又 đang lột tấm da thú ra.",
  yNghia: "Da, vỏ — lớp da bên ngoài; việc lột da, bọc ngoài.",
  trongKanji: "Trong Kanji, 皮 thường CHỈ ÂM HI / HA (彼, 被, 披, 波, 破, 疲) kèm ý 'lớp ngoài, mặt ngoài'.",
  cachNho: "Tấm da treo trên móc, bàn tay 又 đang kéo xuống.",
  bienThe: "Chỉ một dạng 皮, thường ở bên PHẢI. Bộ hiếm: không chữ jōyō nào khác lấy 皮 làm bộ chính; 6 chữ dưới chứa 皮 làm thành phần.",
  viDu: [
    { k:"波", hv:"BA", on:"は / なみ", vi:"sóng", lv:"N3", ham:"氵 (nước) + 皮 (lớp mặt) — bộ chính là 氵. Lớp mặt nước gợn lên: sóng, 電波." },
    { k:"彼", hv:"BỈ", on:"ひ / かれ / かの", vi:"anh ấy; kia", lv:"N3", ham:"彳 (đi) + 皮 (âm HI) — bộ chính là 彳. Người ở phía bên kia: 彼 (anh ấy), 彼女." },
    { k:"破", hv:"PHÁ", on:"は / やぶ-る", vi:"phá, xé", lv:"N2", ham:"石 (đá) + 皮 (vỏ) — bộ chính là 石. Đá vỡ tung lớp vỏ: 破る, 破壊." },
    { k:"疲", hv:"BÌ", on:"ひ / つか-れる", vi:"mệt", lv:"N3", ham:"疒 (bệnh) + 皮 (da) — bộ chính là 疒. Mệt tới rã rời cả da thịt: 疲れる." },
    { k:"被", hv:"BỊ", on:"ひ / こうむ-る", vi:"bị; che phủ", lv:"N2", ham:"衤 (áo) + 皮 (da) — bộ chính là 衣. Áo trùm lên da: che phủ; 被害 (bị thiệt hại)." },
    { k:"披", hv:"PHI", on:"ひ", vi:"mở ra, công bố", lv:"N1", ham:"扌 (tay) + 皮 — bộ chính là 扌. Tay lật mở lớp ngoài ra: 披露 (ra mắt, công bố)." }
  ]
},

108: {
  emoji: "🥣",
  hinhDung: "Cái bát có chân đế nhìn nghiêng.",
  yNghia: "Bát đĩa, đồ đựng — cái bát, cái chậu, vật chứa đồ ăn thức uống.",
  trongKanji: "Trong Kanji, bộ này thường liên quan đến đồ đựng, sự đầy tràn, việc bày cỗ, thề ước (uống máu ăn thề trong bát).",
  cachNho: "Chữ 罒 ngửa lên có đế — cái bát đặt trên bàn.",
  bienThe: "Chỉ một dạng 皿, luôn nằm DƯỚI ĐÁY chữ. Đừng nhầm với 罒 (lưới — nằm TRÊN ĐẦU).",
  viDu: [
    { k:"盛", hv:"THỊNH", on:"せい / じょう / も-る / さか-ん", vi:"đầy, thịnh", lv:"N2", ham:"成 (xong) + 皿 (bát) — xới cơm đầy bát: 盛る; hưng thịnh: 盛ん." },
    { k:"盗", hv:"ĐẠO", on:"とう / ぬす-む", vi:"trộm", lv:"N2", ham:"次 (thèm, chảy dãi) + 皿 (bát) — thèm của trong bát người: ăn trộm, 盗む." },
    { k:"盟", hv:"MINH", on:"めい", vi:"thề ước, đồng minh", lv:"N1", ham:"明 (sáng tỏ) + 皿 (bát máu) — uống máu trong bát ăn thề: 同盟, 加盟." },
    { k:"監", hv:"GIÁM", on:"かん", vi:"giám sát", lv:"N1", ham:"臣 (con mắt) + 人 + 皿 (bát nước) — cúi soi mặt vào bát nước: nhìn kỹ, 監督 (đạo diễn, giám sát)." },
    { k:"盤", hv:"BÀN", on:"ばん", vi:"cái mâm; nền tảng", lv:"N1", ham:"般 + 皿 (đĩa) — cái mâm to phẳng: 基盤, 円盤." },
    { k:"益", hv:"ÍCH", on:"えき / やく", vi:"lợi ích", lv:"N1", ham:"Nước tràn trên 皿 (bát) — dư đầy: có lợi, 利益, 有益." },
    { k:"盆", hv:"BỒN", on:"ぼん", vi:"cái khay; lễ Obon", lv:"N1", ham:"分 + 皿 — cái bồn nông: お盆 (khay; lễ Vu Lan Nhật)." },
    { k:"温", hv:"ÔN", on:"おん / あたた-かい", vi:"ấm", lv:"N4", ham:"氵 (nước) + 昷 (bát đặt dưới nắng) — bộ chính là 氵. Nước trong bát được hong ấm: 温かい, 温度." },
    { k:"塩", hv:"DIÊM", on:"えん / しお", vi:"muối", lv:"N2", ham:"土 (đất) + 皿 (chậu) — bộ chính là 土. Chậu phơi nước biển lấy muối: 塩." },
    { k:"艦", hv:"HẠM", on:"かん", vi:"chiến hạm", lv:"N1", ham:"舟 (thuyền) + 監 (canh gác) — bộ chính là 舟. Con tàu canh giữ: 軍艦." }
  ]
},

110: {
  emoji: "🔱",
  hinhDung: "Cây giáo dài có mũi nhọn và móc bên hông.",
  yNghia: "Cây giáo — vũ khí cán dài để đâm; 矛盾 (mâu thuẫn) là 'giáo và khiên'.",
  trongKanji: "Trong Kanji, 矛 là mũi giáo nhọn: chiến đấu (務), sự mềm dẻo của cán (柔), hoặc chỉ âm MU (霧).",
  cachNho: "Mũi giáo 龴 trên cán cong có móc.",
  bienThe: "Chỉ một dạng 矛. Bộ hiếm: không chữ jōyō nào khác lấy 矛 làm bộ chính; 3 chữ dưới chứa 矛 làm thành phần.",
  viDu: [
    { k:"務", hv:"VỤ", on:"む / つと-める", vi:"nhiệm vụ", lv:"N3", ham:"矛 (giáo) + 夂 + 力 (sức) — bộ chính là 力. Cầm giáo gắng sức làm phận sự: 事務所, 義務." },
    { k:"霧", hv:"VỤ", on:"む / きり", vi:"sương mù", lv:"N1", ham:"雨 (mưa) + 務 (âm MU) — bộ chính là 雨. Hơi nước giăng như mưa: 霧." },
    { k:"柔", hv:"NHU", on:"じゅう / にゅう / やわ-らか", vi:"mềm", lv:"N2", ham:"矛 (giáo) + 木 (gỗ) — bộ chính là 木. Cán giáo bằng gỗ dẻo uốn được: mềm, 柔道 (nhu đạo)." }
  ]
},

111: {
  emoji: "🏹",
  hinhDung: "Mũi tên thẳng với đầu nhọn và lông đuôi.",
  yNghia: "Mũi tên — tên bắn đi thẳng, nhanh; cũng dùng làm thước đo ngắn.",
  trongKanji: "Trong Kanji, 矢 thường mang ý thẳng, nhanh như tên (知), ngắn (短), nắn thẳng (矯), hoặc tụ quanh ngọn cờ (族).",
  cachNho: "Chữ 大 có thêm cái mũi nhọn 𠂉 trên đầu — mũi tên.",
  bienThe: "Chỉ một dạng 矢, thường ở bên TRÁI. Khác 失 (thất — nét sổ xuyên qua đầu).",
  viDu: [
    { k:"知", hv:"TRI", on:"ち / し-る", vi:"biết", lv:"N5", ham:"矢 (mũi tên) + 口 (lời) — hiểu nhanh, nói trúng như tên bắn: 知る, 知識." },
    { k:"短", hv:"ĐOẢN", on:"たん / みじか-い", vi:"ngắn", lv:"N4", ham:"矢 (mũi tên) + 豆 — ngày xưa lấy mũi tên đo vật ngắn: 短い, 短所 (nhược điểm)." },
    { k:"矯", hv:"KIỂU", on:"きょう / た-める", vi:"nắn thẳng", lv:"N1", ham:"矢 (tên) + 喬 (cao) — uốn cán tên cho thẳng: 矯正 (chỉnh sửa, niềng răng)." },
    { k:"族", hv:"TỘC", on:"ぞく", vi:"dòng tộc", lv:"N3", ham:"方 (lá cờ) + 矢 (tên) — bộ chính là 方. Người cầm tên tụ dưới một ngọn cờ: 家族, 民族." },
    { k:"医", hv:"Y", on:"い", vi:"y, chữa bệnh", lv:"N4", ham:"匚 (hòm) + 矢 (mũi tên) — bộ chính là 匸/匚. Hòm cất mũi tên đã rút khỏi vết thương: 医者." },
    { k:"候", hv:"HẬU", on:"こう / そうろう", vi:"chờ; khí hậu", lv:"N2", ham:"亻 + 丨 + 矢 — bộ chính là 亻. Người đứng canh chờ với cung tên: 天候, 候補 (ứng viên)." },
    { k:"痴", hv:"SI", on:"ち", vi:"ngu ngốc, si mê", lv:"N1", ham:"疒 (bệnh) + 知 (biết) — bộ chính là 疒. Cái biết bị bệnh: ngu muội, 愚痴 (than vãn)." }
  ]
},

114: {
  emoji: "🐾",
  hinhDung: "Vết chân thú in trên đất, có móng quặp.",
  yNghia: "Vết chân thú — dấu chân loài thú in trên mặt đất.",
  trongKanji: "Trong Kanji, 禸 không còn làm bộ chính cho chữ jōyō nào; nó sống trong 禺 (con khỉ) và 离 — cả hai đều có 禸 ở dưới đáy.",
  cachNho: "Chữ 内 có thêm một nét móc — con thú lòi móng ra.",
  bienThe: "Chỉ một dạng 禸, luôn ở DƯỚI ĐÁY. Bộ rất hiếm: không chữ jōyō nào lấy 禸 làm bộ chính; 6 chữ dưới chứa 禸 qua 禺 / 离 / 禹.",
  viDu: [
    { k:"偶", hv:"NGẪU", on:"ぐう", vi:"ngẫu nhiên; cặp đôi", lv:"N2", ham:"亻 (người) + 禺 (con khỉ, có 禸) — bộ chính là 亻. Con rối giống người: 偶然 (ngẫu nhiên), 配偶者 (vợ/chồng)." },
    { k:"遇", hv:"NGỘ", on:"ぐう", vi:"gặp gỡ; đối đãi", lv:"N1", ham:"辶 (đi) + 禺 (âm GUU) — bộ chính là 辶. Đi đường tình cờ gặp: 遭遇, 待遇 (đãi ngộ)." },
    { k:"隅", hv:"NGUNG", on:"ぐう / すみ", vi:"góc", lv:"N1", ham:"阝 (đồi) + 禺 — bộ chính là 阝. Chỗ khuất trong góc đồi: 隅 (góc)." },
    { k:"愚", hv:"NGU", on:"ぐ / おろ-か", vi:"ngu ngốc", lv:"N1", ham:"禺 (con khỉ) + 心 (lòng) — bộ chính là 心. Tâm trí như con khỉ: 愚か, 愚痴." },
    { k:"離", hv:"LY", on:"り / はな-れる", vi:"rời xa", lv:"N2", ham:"离 (có 禸) + 隹 (chim) — bộ chính là 隹. Chim sổ lồng bay đi: 離れる, 距離." },
    { k:"属", hv:"THUỘC", on:"ぞく", vi:"thuộc về", lv:"N2", ham:"尸 (đuôi) + 禹 (có 禸) — bộ chính là 尸. Con vật nối đuôi theo con khác: 所属, 金属." }
  ]
},

121: {
  emoji: "🏺",
  hinhDung: "Cái vò sành bụng phình, có nắp đậy.",
  yNghia: "Đồ sành, vò gốm — hũ, vò bằng đất nung; tiếng Nhật dùng 缶 cho 'lon, hộp thiếc'.",
  trongKanji: "Trong Kanji, 缶 hay nằm giấu trong 匋 (lò gốm) và 䍃 (lắc vò) — đồ gốm, sự rung lắc.",
  cachNho: "午 (cái chày) trên 凵 (cái vò) — vò sành để giã, đựng.",
  bienThe: "Chỉ một dạng 缶. Bộ hiếm: không chữ jōyō nào khác lấy 缶 làm bộ chính; 3 chữ dưới chứa 缶 làm thành phần.",
  viDu: [
    { k:"陶", hv:"ĐÀO", on:"とう", vi:"đồ gốm", lv:"N1", ham:"阝 (đồi) + 匋 (người nặn vò 缶) — bộ chính là 阝. Lò gốm đắp trên sườn đồi: 陶器, 陶芸." },
    { k:"揺", hv:"DAO", on:"よう / ゆ-れる", vi:"lắc lư", lv:"N2", ham:"扌 (tay) + 䍃 (có 缶) — bộ chính là 扌. Tay lắc cái vò: rung, 揺れる, 動揺." },
    { k:"謡", hv:"DAO", on:"よう / うたい", vi:"bài hát dân gian", lv:"N1", ham:"言 (lời) + 䍃 — bộ chính là 言. Vừa gõ vò vừa hát: 童謡 (đồng dao), 民謡." }
  ]
},

126: {
  emoji: "🧔",
  hinhDung: "Chòm râu rủ xuống dưới cằm.",
  yNghia: "Mà, và (liên từ); râu — hình gốc là râu cằm; sau mượn làm liên từ trong Hán văn.",
  trongKanji: "Trong Kanji, 而 thường là chòm râu mềm rủ xuống: sự mềm mỏng chịu đựng (耐) hay giọt mưa mềm (需).",
  cachNho: "一 (cằm) + chòm râu bốn sợi rủ xuống.",
  bienThe: "Chỉ một dạng 而 (bản thân chữ 而 không thuộc jōyō). Bộ hiếm: chỉ 耐 thuộc bộ này; 3 chữ sau có 而 làm thành phần.",
  viDu: [
    { k:"耐", hv:"NẠI", on:"たい / た-える", vi:"chịu đựng", lv:"N2", ham:"而 (râu) + 寸 (tay luật) — hình phạt cạo râu, chịu nhục mà nhịn: 耐える, 忍耐." },
    { k:"需", hv:"NHU", on:"じゅ", vi:"nhu cầu", lv:"N1", ham:"雨 (mưa) + 而 — bộ chính là 雨. Đứng chờ mưa tạnh: chờ đợi, cần, 需要 (nhu cầu)." },
    { k:"儒", hv:"NHO", on:"じゅ", vi:"Nho giáo", lv:"N1", ham:"亻 (người) + 需 — bộ chính là 亻. Người học trò mềm mỏng chờ thời: 儒教 (Nho giáo)." },
    { k:"端", hv:"ĐOAN", on:"たん / はし / はた", vi:"đầu mút", lv:"N2", ham:"立 (đứng) + 耑 (mầm có rễ, dưới là 而) — bộ chính là 立. Mầm cây đứng ở tận đầu: 端, 極端." }
  ]
},

129: {
  emoji: "🖌️",
  hinhDung: "Bàn tay ⺕ cầm cây bút lông dựng đứng.",
  yNghia: "Cây bút — tay cầm bút viết; viết, ghi chép, vạch ra quy tắc.",
  trongKanji: "Trong Kanji, 聿 là bàn tay cầm bút: viết (書, 筆), vạch luật lệ (律), vẽ thiết kế (建).",
  cachNho: "⺕ (bàn tay) + nét sổ dài xuyên qua — tay nắm cán bút.",
  bienThe: "Chỉ một dạng 聿 (bản thân chữ 聿 không thuộc jōyō). Bộ hiếm: chỉ 粛 thuộc bộ này; các chữ còn lại chứa 聿 làm thành phần.",
  viDu: [
    { k:"粛", hv:"TÚC", on:"しゅく", vi:"nghiêm túc, trang nghiêm", lv:"N1", ham:"聿 (tay cầm bút) đứng trên vực sâu — cẩn trọng, run tay: 厳粛 (nghiêm trang), 自粛 (tự kiềm chế)." },
    { k:"書", hv:"THƯ", on:"しょ / か-く", vi:"viết; sách", lv:"N5", ham:"聿 (bút) + 曰 (lời) — bộ chính là 曰. Cầm bút ghi lời: 書く." },
    { k:"筆", hv:"BÚT", on:"ひつ / ふで", vi:"cây bút", lv:"N3", ham:"竹 (tre) + 聿 (tay cầm bút) — bộ chính là 竹. Bút lông cán tre: 筆, 鉛筆 (bút chì)." },
    { k:"律", hv:"LUẬT", on:"りつ / りち", vi:"luật", lv:"N2", ham:"彳 (đi) + 聿 (bút) — bộ chính là 彳. Đường lối đã viết thành văn: 法律, 規律." },
    { k:"津", hv:"TÂN", on:"しん / つ", vi:"bến đò", lv:"N1", ham:"氵 (nước) + 聿 — bộ chính là 氵. Bến sông nơi thuyền cập: 津波 (sóng thần)." },
    { k:"建", hv:"KIẾN", on:"けん / た-てる", vi:"xây dựng", lv:"N3", ham:"聿 (bút vẽ) + 廴 (kéo dài) — bộ chính là 廴. Vẽ thiết kế rồi dựng lên: 建物." }
  ]
},

131: {
  emoji: "👁️",
  hinhDung: "Con mắt dựng đứng — người bề tôi cúi đầu, mắt nhìn xuống.",
  yNghia: "Bề tôi, quan lại — con mắt cúi xuống của người hầu; nghĩa rộng là 'nhìn kỹ từ trên xuống'.",
  trongKanji: "Trong Kanji, 臣 thường là CON MẮT cúi nhìn: soi, xem khắp (監, 覧, 臨), hoặc sự chắc chắn (賢, 堅, 緊).",
  cachNho: "Chữ 目 bị dựng nghiêng, lòng đen lệch sang một bên — mắt cúi xuống.",
  bienThe: "Chỉ một dạng 臣. Bộ hiếm: chỉ 臨 thuộc bộ này; các chữ sau chứa 臣.",
  viDu: [
    { k:"臨", hv:"LÂM", on:"りん / のぞ-む", vi:"đến gần; lâm thời", lv:"N1", ham:"臣 (mắt cúi) + 人 + 品 — người cúi nhìn xuống đồ vật bên dưới: đối mặt, 臨時 (tạm thời)." },
    { k:"賢", hv:"HIỀN", on:"けん / かしこ-い", vi:"khôn ngoan", lv:"N1", ham:"臤 (mắt tinh + tay) + 貝 (của) — bộ chính là 貝. Người giữ của khéo: tài giỏi, 賢い." },
    { k:"堅", hv:"KIÊN", on:"けん / かた-い", vi:"vững chắc", lv:"N1", ham:"臤 (nắm chắc) + 土 (đất) — bộ chính là 土. Đất nện chắc: 堅い, 中堅 (nòng cốt)." },
    { k:"緊", hv:"KHẨN", on:"きん", vi:"căng, khẩn cấp", lv:"N1", ham:"臤 (nắm chắc) + 糸 (dây) — bộ chính là 糸. Dây bị kéo căng: 緊張 (hồi hộp), 緊急." },
    { k:"蔵", hv:"TÀNG", on:"ぞう / くら", vi:"kho; cất giữ", lv:"N2", ham:"艹 + 臧 (có 臣) — bộ chính là 艹. Cất kín dưới lớp cỏ che: 冷蔵庫 (tủ lạnh), 蔵." },
    { k:"臓", hv:"TẠNG", on:"ぞう", vi:"nội tạng", lv:"N1", ham:"月 (thịt) + 蔵 (cất giữ) — bộ chính là ⺼. Bộ phận cất kín trong thân: 心臓, 内臓." },
    { k:"監", hv:"GIÁM", on:"かん", vi:"giám sát", lv:"N1", ham:"臣 (mắt) + 人 + 皿 (bát nước) — bộ chính là 皿. Cúi soi vào bát nước: 監督." },
    { k:"覧", hv:"LÃM", on:"らん", vi:"xem khắp", lv:"N2", ham:"臣 (mắt cúi) + 見 (nhìn) — bộ chính là 見. Cúi nhìn bao quát: 一覧, 展覧会." }
  ]
},

133: {
  emoji: "🎯",
  hinhDung: "Mũi tên cắm xuống đất 一 — đã bay tới đích.",
  yNghia: "Đến nơi — mũi tên rơi tới đất; cực điểm, tột cùng.",
  trongKanji: "Trong Kanji, 至 mang ý đến tận nơi, tới cùng, và 'chỗ ở' (nơi ta đến rồi dừng: 室, 屋).",
  cachNho: "Mũi tên lộn ngược cắm vào mặt đất 土.",
  bienThe: "Chỉ một dạng 至. Bộ hiếm: chỉ 致 thuộc bộ này; các chữ còn lại chứa 至 làm thành phần.",
  viDu: [
    { k:"致", hv:"TRÍ", on:"ち / いた-す", vi:"gây ra; làm (khiêm nhường)", lv:"N1", ham:"至 (đến) + 攵 (tay) — đưa tới tận nơi: 一致 (nhất trí), 致します (khiêm nhường ngữ của する)." },
    { k:"室", hv:"THẤT", on:"しつ / むろ", vi:"phòng", lv:"N4", ham:"宀 (nhà) + 至 (đến nơi dừng lại) — bộ chính là 宀. Nơi ta đến rồi ở lại: 教室, 室内." },
    { k:"屋", hv:"ỐC", on:"おく / や", vi:"nhà, cửa hàng", lv:"N5", ham:"尸 (mái) + 至 (đến) — bộ chính là 尸. Nơi đi đến rồi nghỉ dưới mái: 部屋, 本屋." },
    { k:"到", hv:"ĐÁO", on:"とう", vi:"đến nơi", lv:"N2", ham:"至 (đến) + 刂 (âm TOU) — bộ chính là 刂. Tới tận nơi: 到着 (đến nơi), 到底." },
    { k:"倒", hv:"ĐẢO", on:"とう / たお-れる", vi:"ngã", lv:"N2", ham:"亻 (người) + 到 — bộ chính là 亻. Người ngã chúi xuống tận đất: 倒れる, 面倒 (phiền)." },
    { k:"窒", hv:"TRẤT", on:"ちつ", vi:"nghẹt, tắc", lv:"N1", ham:"穴 (lỗ) + 至 (đến tận) — bộ chính là 穴. Bịt kín tới tận lỗ: 窒息 (ngạt thở), 窒素 (nitơ)." }
  ]
},

134: {
  emoji: "🪨",
  hinhDung: "Cái cối đá nhìn nghiêng, lòng cối có răng khía.",
  yNghia: "Cái cối giã — cối để giã gạo; cũng là hình hai bàn tay nâng (trong 興).",
  trongKanji: "Trong Kanji, 臼 thường là cái cối / cái hố trũng (陥, 稲, 挿) hoặc hai bàn tay nâng lên (興).",
  cachNho: "Cái cối có hai bên thành, giữa có răng khía.",
  bienThe: "Chỉ một dạng 臼 (bản thân chữ 臼 thuộc jōyō từ 2010). Bộ hiếm: chỉ 興 thuộc bộ này; các chữ còn lại chứa 臼.",
  viDu: [
    { k:"興", hv:"HƯNG", on:"こう / きょう / おこ-る", vi:"hưng thịnh; hứng thú", lv:"N2", ham:"Bốn bàn tay (臼 + 廾) cùng nâng một vật lên — cùng nổi lên: 興味 (hứng thú), 復興." },
    { k:"陥", hv:"HÃM", on:"かん / おちい-る", vi:"rơi vào, sụp", lv:"N1", ham:"阝 (đồi) + 臽 (người rơi xuống hố 臼) — bộ chính là 阝. Sa xuống hố: 陥る, 欠陥 (khuyết điểm)." },
    { k:"挿", hv:"SÁP", on:"そう / さ-す", vi:"cắm vào", lv:"N1", ham:"扌 (tay) + 臿 (chày cắm vào cối) — bộ chính là 扌. Tay cắm vào: 挿す, 挿入." },
    { k:"稲", hv:"ĐẠO", on:"とう / いね", vi:"cây lúa", lv:"N2", ham:"禾 (lúa) + 舀 (tay múc từ cối 臼) — bộ chính là 禾. Giã lúa trong cối: 稲." },
    { k:"毀", hv:"HUỶ", on:"き", vi:"phá huỷ", lv:"N1", ham:"臼 + 土 + 殳 (gậy) — bộ chính là 殳. Đập nát cối đất: 毀損." }
  ]
},

135: {
  emoji: "👅",
  hinhDung: "Cái lưỡi thè ra khỏi miệng 口.",
  yNghia: "Cái lưỡi — lưỡi, lời nói, sự nếm vị.",
  trongKanji: "Trong Kanji, 舌 thường liên quan đến lời nói (話, 辞), sự sống động (活), hoặc chỉ âm KATSU (活, 括).",
  cachNho: "千 (lưỡi dài) + 口 (miệng) — lưỡi thè ra khỏi miệng.",
  bienThe: "Chỉ một dạng 舌. Từ điển Nhật xếp 舎, 舗, 辞 vào bộ 舌 theo hình dáng. Các chữ sau có 舌 làm thành phần.",
  viDu: [
    { k:"舎", hv:"XÁ", on:"しゃ", vi:"nhà, quán trọ", lv:"N2", ham:"人 (mái) + 舌 biến dạng (nền nhà) — ngôi nhà tạm: 校舎 (trường học), 田舎 (いなか: quê)." },
    { k:"舗", hv:"PHỐ", on:"ほ", vi:"cửa hàng; lát đường", lv:"N1", ham:"舎 (nhà) + 甫 (bằng phẳng) — nhà mặt phố, đường lát phẳng: 店舗, 舗装." },
    { k:"辞", hv:"TỪ", on:"じ / や-める", vi:"lời; từ chức", lv:"N3", ham:"舌 (lưỡi, lời) + 辛 (cay đắng) — lời nói khó khăn: 辞書 (từ điển), 辞める (nghỉ việc)." },
    { k:"話", hv:"THOẠI", on:"わ / はな-す", vi:"nói chuyện", lv:"N5", ham:"言 (lời) + 舌 (lưỡi) — bộ chính là 言. Lưỡi đưa lời ra: 話す, 電話." },
    { k:"活", hv:"HOẠT", on:"かつ", vi:"sống, hoạt động", lv:"N3", ham:"氵 (nước) + 舌 (âm KATSU) — bộ chính là 氵. Nước chảy róc rách sống động: 生活, 活動." },
    { k:"括", hv:"QUÁT", on:"かつ / くく-る", vi:"bó lại, tổng quát", lv:"N1", ham:"扌 (tay) + 舌 (âm) — bộ chính là 扌. Tay buộc gom lại: 一括 (gộp một lần), 括弧." },
    { k:"憩", hv:"KHẾ", on:"けい / いこ-う", vi:"nghỉ ngơi", lv:"N1", ham:"舌 + 息 (hơi thở) — bộ chính là 心. Ngồi thở một hơi cho nhẹ: 休憩 (giải lao)." }
  ]
},

136: {
  emoji: "💃",
  hinhDung: "Hai bàn chân quay lưng lại nhau — bước chân trái và phải lệch nhau.",
  yNghia: "Trái ngược, sai lệch — hai chân bước ngược chiều; cũng là dáng chân đang nhảy múa.",
  trongKanji: "Trong Kanji, 舛 là HAI CHÂN: nhảy múa (舞), chớp nhoáng (瞬), bước lệch.",
  cachNho: "夕 (chân trái) + 㐄 (chân phải) — hai chân đặt lệch nhau.",
  bienThe: "Chỉ một dạng 舛, luôn nằm DƯỚI ĐÁY. Bộ rất hiếm: chỉ 舞 thuộc bộ này; 2 chữ sau chứa 舛.",
  viDu: [
    { k:"舞", hv:"VŨ", on:"ぶ / ま-う", vi:"múa", lv:"N1", ham:"無 (người múa cầm tua) + 舛 (hai chân) — hai chân nhún nhảy: múa, 舞台 (sân khấu), お見舞い (thăm ốm)." },
    { k:"瞬", hv:"THUẤN", on:"しゅん / またた-く", vi:"chớp mắt", lv:"N1", ham:"目 (mắt) + 舜 (có 舛) — bộ chính là 目. Mi mắt khép mở nhanh: 瞬間 (khoảnh khắc)." },
    { k:"隣", hv:"LÂN", on:"りん / となり", vi:"bên cạnh", lv:"N3", ham:"阝 (tường đất) + 粦 (có 舛) — bộ chính là 阝. Nhà ngay sát vách: 隣." }
  ]
},

138: {
  emoji: "👀",
  hinhDung: "Con mắt 目 trên người quay lưng — trừng mắt nhìn, đứng lì không nhúc nhích.",
  yNghia: "Quẻ Cấn; bền, dừng — núi đứng yên; mở rộng thành bền bỉ, dừng lại, giới hạn.",
  trongKanji: "Trong Kanji, 艮 thường CHỈ ÂM (KON / GON / GIN / GAN): 根, 眼, 銀, 恨 — kèm ý dừng lại, bám chặt.",
  cachNho: "Chữ 良 (tốt) mất cái chấm trên đầu.",
  bienThe: "Chỉ một dạng 艮, thường ở bên PHẢI. 良 (thêm chấm) là chữ thuộc bộ này. 2 chữ đầu là bộ 艮; các chữ sau chứa 艮 / 良 làm thành phần.",
  viDu: [
    { k:"良", hv:"LƯƠNG", on:"りょう / よ-い", vi:"tốt", lv:"N4", ham:"Vốn vẽ cái sàng lọc gạo — gạo đã sàng là gạo tốt: 良い, 改良 (cải tiến)." },
    { k:"根", hv:"CĂN", on:"こん / ね", vi:"rễ", lv:"N3", ham:"木 (cây) + 艮 (bám chặt) — bộ chính là 木. Phần cây bám chặt dưới đất: 根, 根拠." },
    { k:"眼", hv:"NHÃN", on:"がん / まなこ", vi:"con mắt", lv:"N2", ham:"目 (mắt) + 艮 (trừng) — bộ chính là 目. Con mắt mở trừng: 眼科 (khoa mắt), 眼鏡." },
    { k:"銀", hv:"NGÂN", on:"ぎん", vi:"bạc", lv:"N4", ham:"金 (kim loại) + 艮 (âm GIN) — bộ chính là 金. Kim loại trắng: 銀行 (ngân hàng)." },
    { k:"限", hv:"HẠN", on:"げん / かぎ-る", vi:"giới hạn", lv:"N2", ham:"阝 (đồi) + 艮 (dừng lại) — bộ chính là 阝. Gặp đồi thì dừng: 限界." },
    { k:"退", hv:"THOÁI", on:"たい / しりぞ-く", vi:"lui, rút", lv:"N2", ham:"辶 (đi) + 艮 (quay lưng) — bộ chính là 辶. Quay lưng đi lùi: 退院 (xuất viện), 退屈 (chán)." },
    { k:"恨", hv:"HẬN", on:"こん / うら-む", vi:"oán hận", lv:"N1", ham:"忄 (lòng) + 艮 (bám chặt) — bộ chính là 忄. Nỗi lòng bám mãi không buông: 恨む." },
    { k:"娘", hv:"NƯƠNG", on:"じょう / むすめ", vi:"con gái", lv:"N4", ham:"女 (nữ) + 良 (tốt) — bộ chính là 女. Cô gái xinh đẹp: 娘 (con gái)." },
    { k:"浪", hv:"LÃNG", on:"ろう", vi:"sóng; lang thang", lv:"N2", ham:"氵 (nước) + 良 (âm ROU) — bộ chính là 氵. Sóng nước dập dềnh: 浪費 (lãng phí), 浪人." },
    { k:"朗", hv:"LÃNG", on:"ろう / ほが-らか", vi:"sáng sủa, vui vẻ", lv:"N1", ham:"良 (tốt) + 月 (trăng) — bộ chính là 月. Trăng sáng trong: 朗らか (vui tươi), 朗読 (đọc to)." }
  ]
},

141: {
  emoji: "🐅",
  hinhDung: "Cái đầu hổ với vằn vện và cái miệng há to.",
  yNghia: "Vằn vện con hổ — đầu con hổ; sự hung dữ, mạnh mẽ, đáng sợ.",
  trongKanji: "Trong Kanji, 虍 luôn trùm TRÊN ĐẦU: hổ, sự tàn bạo, nỗi lo sợ, cảnh hư ảo.",
  cachNho: "Cái đầu hổ 卢 có vằn chéo, bên dưới há miệng.",
  bienThe: "Chỉ một dạng 虍, luôn nằm TRÊN / ôm bên trái đầu chữ.",
  viDu: [
    { k:"虎", hv:"HỔ", on:"こ / とら", vi:"con hổ", lv:"N1", ham:"虍 (đầu hổ) + 儿 (chân) — cả con hổ: 虎 (とら)." },
    { k:"虐", hv:"NGƯỢC", on:"ぎゃく / しいた-げる", vi:"ngược đãi", lv:"N1", ham:"虍 (hổ) + móng vuốt quặp — hổ vồ người: tàn bạo, 虐待 (ngược đãi)." },
    { k:"虚", hv:"HƯ", on:"きょ / こ", vi:"trống rỗng, hư", lv:"N1", ham:"虍 + 业 (gò đất trống) — gò hoang có hổ, không người ở: trống không, 謙虚 (khiêm tốn)." },
    { k:"虜", hv:"LỖ", on:"りょ", vi:"tù binh", lv:"N1", ham:"虍 (hổ) + 男 (người đàn ông) — người bị hổ tha đi: 捕虜 (tù binh)." },
    { k:"虞", hv:"NGU", on:"ぐ / おそれ", vi:"nỗi lo, nguy cơ", lv:"N1", ham:"虍 (hổ) + 呉 — nỗi lo có hổ rình: 虞 (おそれ — nguy cơ, dùng trong văn bản)." },
    { k:"劇", hv:"KỊCH", on:"げき", vi:"kịch; dữ dội", lv:"N2", ham:"豦 (hổ vật lợn) + 刂 (dao) — bộ chính là 刂. Cảnh vật lộn dữ dội: 劇場 (nhà hát), 劇的." },
    { k:"慮", hv:"LỰ", on:"りょ", vi:"lo nghĩ", lv:"N1", ham:"虍 (hổ) + 思 (nghĩ) — bộ chính là 心. Nghĩ như có hổ rình: lo lắng, 遠慮 (ngại ngùng), 配慮." },
    { k:"膚", hv:"PHU", on:"ふ", vi:"da", lv:"N1", ham:"虍 + 胃 — bộ chính là ⺼. Lớp da ngoài như da hổ: 皮膚 (da)." },
    { k:"戯", hv:"HÝ", on:"ぎ / たわむ-れる", vi:"đùa giỡn", lv:"N1", ham:"虚 + 戈 — bộ chính là 戈. Múa mác làm trò chứ không đánh thật: 遊戯, 戯曲." }
  ]
},

146: {
  emoji: "🧺",
  hinhDung: "Cái nắp úp xuống đậy kín vật bên dưới.",
  yNghia: "Che đậy từ trên — cái nắp úp; trong tiếng Nhật hiện đại bộ này thường viết thành 西 / 覀.",
  trongKanji: "Trong Kanji, 覀 nằm TRÊN ĐẦU chữ: che phủ, quan trọng (要), phiếu (票), hoặc chỉ âm SEI / KA (西, 価).",
  cachNho: "Chữ 西 (tây) bị bẹp lại thành 覀 — cái nắp đậy lên.",
  bienThe: "襾 là dạng gốc; trong chữ Nhật gặp 覀 (trên đầu) hoặc 西. Từ điển xếp 西 vào bộ này. 3 chữ đầu thuộc bộ 襾; các chữ sau có 覀 / 西 làm thành phần.",
  viDu: [
    { k:"西", hv:"TÂY", on:"せい / さい / にし", vi:"phía tây", lv:"N5", ham:"Vốn vẽ cái tổ chim — chim về tổ lúc mặt trời lặn ở phía tây: 西, 関西." },
    { k:"要", hv:"YẾU", on:"よう / い-る / かなめ", vi:"cần; quan trọng", lv:"N3", ham:"覀 (hai tay chống) + 女 — vốn vẽ người chống tay vào eo: chỗ then chốt, 必要, 要る (cần)." },
    { k:"覆", hv:"PHÚC", on:"ふく / おお-う", vi:"che phủ; lật", lv:"N1", ham:"覀 (nắp) + 復 (lặp lại) — úp nắp lên, lật lại: 覆う, 覆面." },
    { k:"票", hv:"PHIẾU", on:"ひょう", vi:"lá phiếu", lv:"N2", ham:"覀 + 示 — bộ chính là 示. Tấm thẻ nhỏ bay lên: 投票 (bỏ phiếu), 伝票." },
    { k:"標", hv:"TIÊU", on:"ひょう", vi:"mốc, tiêu chí", lv:"N2", ham:"木 (cây) + 票 — bộ chính là 木. Cây cọc cắm làm dấu: 目標 (mục tiêu), 標準." },
    { k:"漂", hv:"PHIÊU", on:"ひょう / ただよ-う", vi:"trôi nổi", lv:"N1", ham:"氵 (nước) + 票 (bay lên) — bộ chính là 氵. Nổi dập dềnh trên nước: 漂う." },
    { k:"腰", hv:"YÊU", on:"よう / こし", vi:"eo, thắt lưng", lv:"N2", ham:"月 (thân) + 要 (eo) — bộ chính là ⺼. Thêm bộ thịt khi 要 bị mượn sang nghĩa 'cần': 腰." },
    { k:"価", hv:"GIÁ", on:"か / あたい", vi:"giá trị", lv:"N2", ham:"亻 (người) + 西 (vốn là 賈 buôn bán) — bộ chính là 亻. Người định giá hàng: 価格, 評価." },
    { k:"煙", hv:"YÊN", on:"えん / けむり", vi:"khói", lv:"N2", ham:"火 (lửa) + 垔 (ống khói bịt kín, có 西) — bộ chính là 火. Khói bốc ra từ bếp: 煙, 禁煙 (cấm hút thuốc)." },
    { k:"遷", hv:"THIÊN", on:"せん", vi:"dời đi", lv:"N1", ham:"辶 (đi) + 䙴 (có 覀: nâng lên) — bộ chính là 辶. Nhấc lên chuyển đi nơi khác: 変遷 (biến thiên), 左遷 (giáng chức)." }
  ]
}

});
