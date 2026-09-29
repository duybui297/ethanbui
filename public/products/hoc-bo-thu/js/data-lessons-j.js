/* Bài học chi tiết — batch J (CUỐI): nhóm 9–17 nét (8/36 bộ có bài)
   Có bài: 韋 音 骨 高 鬼 魚 鳥 麻
   28 bộ còn lại có dưới 3 chữ jōyō (nhiều bộ không có chữ nào) → chỉ có ghi chú trong
   LESSON_NOTES, nêu hết các chữ jōyō có thật để người học vẫn có ví dụ. Xem HANDOFF §4.
   Đã kiểm tra grade trên kanjiapi.dev cho mọi chữ hiếm: tất cả ví dụ là jōyō (grade ≤ 8). */
window.LESSONS = window.LESSONS || {};
window.LESSON_NOTES = window.LESSON_NOTES || {};

(function () {
  var TAIL = ' Không đủ chữ để làm thành bài phân tích riêng, nên bộ này chỉ có phần phiên âm / nghĩa và vẫn dùng đầy đủ ở hai dạng luyện tập.';
  var NONE = ' Trong bảng chữ Hán thông dụng (jōyō) KHÔNG có chữ nào thuộc hay chứa bộ này — bộ chỉ còn trong chữ cổ và từ điển. Bộ này chỉ có phần phiên âm / nghĩa và vẫn dùng đầy đủ ở hai dạng luyện tập.';
  Object.assign(window.LESSON_NOTES, {
    176: "Bộ 面 (Diện) — khuôn mặt với con mắt ở giữa. Ngoài chính chữ 面 (めん / おもて: mặt — 画面 màn hình, 方面 phương diện), bảng chữ Hán thông dụng (jōyō) chỉ có 1 chữ chứa bộ này — 麺 (MIẾN, めん: mì sợi — ラーメン = 拉麺)." + TAIL,
    177: "Bộ 革 (Cách) — tấm da thú đã lột, căng ra phơi: da thuộc; mở rộng thành 'thay đổi' (改革 cải cách, 革命 cách mạng). Bảng chữ Hán thông dụng (jōyō) chỉ có 2 chữ khác chứa bộ này — 靴 (NGOA, くつ: giày) và 覇 (BÁ, は: bá chủ, 覇権)." + TAIL,
    179: "Bộ 韭 (Cửu) — khóm hẹ mọc trên mặt đất." + NONE,
    182: "Bộ 風 (Phong) — cánh buồm 几 căng gió, bên trong có 虫. Ngoài chính chữ 風 (ふう / かぜ: gió — 台風, 風邪), bảng chữ Hán thông dụng (jōyō) chỉ có 1 chữ chứa bộ này — 嵐 (LAM, あらし: bão, gió núi)." + TAIL,
    183: "Bộ 飛 (Phi) — con chim dang hai cánh bay vút lên. Chỉ có chính chữ 飛 (ひ / と-ぶ: bay — 飛行機 máy bay); không chữ jōyō nào khác thuộc hay chứa bộ này." + TAIL,
    185: "Bộ 首 (Thủ) — cái đầu có tóc (丷) và gương mặt (自). Ngoài chính chữ 首 (しゅ / くび: cổ, đầu — 首相 thủ tướng), bảng chữ Hán thông dụng (jōyō) chỉ có 2 chữ chứa bộ này — 道 (ĐẠO, どう / みち: con đường) và 導 (ĐẠO, どう / みちび-く: dẫn dắt)." + TAIL,
    186: "Bộ 香 (Hương) — lúa 禾 chín thơm dưới nắng 日. Chỉ có chính chữ 香 (こう / か / かお-り: mùi thơm — 香水 nước hoa); không chữ jōyō nào khác thuộc hay chứa bộ này." + TAIL,
    190: "Bộ 髟 (Tiêu) — mái tóc dài (镸) buông xoã có vân (彡). Bảng chữ Hán thông dụng (jōyō) chỉ có 1 chữ thuộc bộ này — 髪 (PHÁT, はつ / かみ: tóc — 髪の毛, 散髪 cắt tóc)." + TAIL,
    191: "Bộ 鬥 (Đấu) — hai người túm tóc vật nhau. Chữ duy nhất liên quan trong jōyō là 闘 (ĐẤU, とう / たたか-う: chiến đấu) — nhưng khi giản lược, 闘 đã chuyển sang dùng khung 門 nên từ điển Nhật xếp vào bộ 門." + TAIL,
    192: "Bộ 鬯 (Sưởng) — rượu nếp thơm ủ trong bình dùng để tế lễ. Bảng chữ Hán thông dụng (jōyō) chỉ có 1 chữ thuộc bộ này — 鬱 (UẤT, うつ: u uất, rậm rạp — 憂鬱, うつ病). Đây cũng là một trong những chữ jōyō nhiều nét nhất (29 nét)." + TAIL,
    193: "Bộ 鬲 (Cách) — cái nồi ba chân để nấu, hơi nước bốc lên. Bảng chữ Hán thông dụng (jōyō) chỉ có 2 chữ chứa bộ này — 融 (DUNG, ゆう: tan chảy, lưu thông — 金融) và 隔 (CÁCH, かく / へだ-てる: ngăn cách — 間隔 khoảng cách)." + TAIL,
    197: "Bộ 鹵 (Lỗ) — túi đựng muối mỏ, các chấm là hạt muối. Chữ 鹽 (muối) ngày xưa thuộc bộ này, nhưng dạng hiện đại 塩 đã bỏ phần 鹵." + NONE,
    198: "Bộ 鹿 (Lộc) — con hươu có gạc, đầu, bốn chân. Ngoài chính chữ 鹿 (しか: con hươu — 奈良の鹿), bảng chữ Hán thông dụng (jōyō) chỉ có 2 chữ thuộc bộ này — 麗 (LỆ, れい / うるわ-しい: đẹp đẽ — 綺麗 きれい) và 麓 (LỘC, ふもと: chân núi)." + TAIL,
    199: "Bộ 麥 (Mạch) — bông lúa mì và bàn chân 夂 giẫm lên mạ. Tiếng Nhật dùng dạng giản lược 麦 (ばく / むぎ: lúa mì — 小麦). Ngoài 麦, bảng jōyō chỉ có 1 chữ thuộc bộ này — 麺 (MIẾN, めん: mì sợi)." + TAIL,
    201: "Bộ 黃 (Hoàng) — tấm ngọc bội đeo ở thắt lưng, màu vàng. Tiếng Nhật dùng dạng 黄 (こう / おう / き: màu vàng — 黄色). Ngoài 黄, bảng jōyō chỉ có 1 chữ chứa bộ này — 横 (HOÀNH, おう / よこ: bên cạnh, chiều ngang)." + TAIL,
    202: "Bộ 黍 (Thử) — cây kê nếp dùng nấu rượu." + NONE,
    203: "Bộ 黑 (Hắc) — ống khói ám muội đen trên bếp lửa 灬. Tiếng Nhật dùng dạng 黒 (こく / くろ: màu đen). Ngoài 黒, bảng jōyō chỉ có 2 chữ chứa bộ này — 黙 (MẶC, もく / だま-る: im lặng — 沈黙) và 墨 (MẶC, ぼく / すみ: mực tàu)." + TAIL,
    204: "Bộ 黹 (Chỉ) — đường kim mũi chỉ thêu trên vải." + NONE,
    205: "Bộ 黽 (Mãnh) — con ếch / con rùa nước bụng to. Bảng chữ Hán thông dụng (jōyō) chỉ có 1 chữ chứa bộ này (ở dạng giản lược) — 縄 (THẰNG, じょう / なわ: sợi dây thừng — 沖縄 Okinawa)." + TAIL,
    206: "Bộ 鼎 (Đỉnh) — cái vạc ba chân bằng đồng, biểu tượng quyền lực." + NONE,
    207: "Bộ 鼓 (Cổ) — cái trống có chân đế, bàn tay cầm dùi 支 đánh vào. Chỉ có chính chữ 鼓 (こ / つづみ: cái trống — 太鼓, 鼓動 nhịp tim); không chữ jōyō nào khác thuộc hay chứa bộ này." + TAIL,
    208: "Bộ 鼠 (Thử) — con chuột với răng cửa và bộ râu, cái đuôi dài. Bản thân chữ 鼠 (ねずみ) không thuộc jōyō." + NONE,
    209: "Bộ 鼻 (Tỵ) — cái mũi 自 thêm phần 畀 chỉ âm. Chỉ có chính chữ 鼻 (び / はな: cái mũi — 耳鼻科 khoa tai mũi); không chữ jōyō nào khác thuộc hay chứa bộ này. Xem thêm bộ 自 (bộ 132): 自 vốn là hình cái mũi." + TAIL,
    210: "Bộ 齊 (Tề) — ba bông lúa mọc cao bằng nhau. Tiếng Nhật dùng dạng giản lược 斉, và từ điển Nhật đã chuyển 斉 cùng các chữ ghép (済, 剤, 斎) sang bộ 文 — xem bài bộ 文 (bộ 67) để có đủ ví dụ." + TAIL,
    211: "Bộ 齒 (Xỉ) — hàm răng trong miệng. Tiếng Nhật dùng dạng giản lược 歯 (し / は: răng — 歯医者 nha sĩ). Ngoài 歯, bảng jōyō chỉ có 1 chữ thuộc bộ này — 齢 (LINH, れい: tuổi — 年齢). Lưu ý: trong 歯, phần 止 chỉ âm, không mang nghĩa chân." + TAIL,
    212: "Bộ 龍 (Long) — con rồng có sừng, vảy và thân uốn lượn. Tiếng Nhật dùng dạng giản lược 竜 (りゅう / たつ: rồng — 恐竜 khủng long). Ngoài 竜, bảng jōyō chỉ có 2 chữ chứa bộ này — 滝 (LANG, たき: thác nước) và 籠 (LUNG, かご / こ-もる: cái giỏ; ở lì trong nhà)." + TAIL,
    213: "Bộ 龜 (Quy) — con rùa nhìn nghiêng với mai, đầu và chân. Tiếng Nhật dùng dạng giản lược 亀 (き / かめ: con rùa); không chữ jōyō nào khác thuộc hay chứa bộ này." + TAIL,
    214: "Bộ 龠 (Dược) — cây sáo nhiều ống ghép lại, bộ cuối cùng và nhiều nét nhất (17 nét) trong 214 bộ." + NONE
  });
})();

Object.assign(window.LESSONS, {

178: {
  emoji: "👣",
  hinhDung: "Hai bàn chân đi ngược chiều vòng quanh một bức tường 口.",
  yNghia: "Da thuộc; trái ngược — hai bước chân quay lưng nhau quanh thành; sau mượn chỉ da đã thuộc mềm.",
  trongKanji: "Trong Kanji, 韋 thường mang ý đi vòng quanh, trái ngược (違), bảo vệ (衛), hoặc đường ngang (緯) — và chỉ âm I.",
  cachNho: "Bàn chân trên + 口 (bức tường) + bàn chân dưới quay ngược — hai người đi vòng quanh thành theo hai chiều.",
  bienThe: "Chỉ một dạng 韋. Bộ hiếm: chỉ 韓 thuộc bộ này; 4 chữ sau có 韋 làm thành phần chỉ âm I / EI.",
  viDu: [
    { k:"韓", hv:"HÀN", on:"かん", vi:"Hàn Quốc", lv:"N1", ham:"𠦝 + 韋 — vốn là khung giếng; nay chủ yếu chỉ Hàn Quốc: 韓国, 日韓." },
    { k:"違", hv:"VI", on:"い / ちが-う", vi:"khác, sai", lv:"N4", ham:"辶 (đi) + 韋 (trái chiều) — bộ chính là 辶. Đi ngược hướng nhau: 違う (khác, sai), 間違い (lỗi)." },
    { k:"偉", hv:"VĨ", on:"い / えら-い", vi:"vĩ đại, giỏi", lv:"N2", ham:"亻 (người) + 韋 — bộ chính là 亻. Người khác thường, nổi bật: 偉い, 偉大." },
    { k:"緯", hv:"VĨ", on:"い", vi:"sợi ngang; vĩ độ", lv:"N1", ham:"糸 (sợi) + 韋 (vòng quanh) — bộ chính là 糸. Sợi ngang chạy vòng trên khung cửi: 緯度 (vĩ độ), 経緯 (đầu đuôi sự việc)." },
    { k:"衛", hv:"VỆ", on:"えい", vi:"bảo vệ", lv:"N2", ham:"行 (đường) + 韋 (đi vòng) — bộ chính là 行. Lính đi tuần vòng quanh để canh giữ: 衛生, 防衛." }
  ]
},

180: {
  emoji: "🎵",
  hinhDung: "Cái miệng 口 có một vạch — tiếng nói bật ra thành âm thanh.",
  yNghia: "Âm thanh — tiếng nói, tiếng nhạc; mở rộng thành âm đọc (音読み).",
  trongKanji: "Trong Kanji, 音 thường liên quan đến âm thanh, tiếng vang, vần điệu — và qua 意, 章, 竟 lại sinh ra nhiều chữ về ý nghĩ, văn chương, ranh giới.",
  cachNho: "立 (đứng) + 日 (miệng có tiếng) — đứng mà cất tiếng: âm thanh.",
  bienThe: "Chỉ một dạng 音. 2 chữ đầu thuộc bộ 音; các chữ sau có 音 / 意 / 章 / 竟 làm thành phần.",
  viDu: [
    { k:"響", hv:"HƯỞNG", on:"きょう / ひび-く", vi:"vang dội", lv:"N2", ham:"郷 (âm KYOU) + 音 (âm thanh) — tiếng vang dội khắp làng: 響く, 影響 (ảnh hưởng)." },
    { k:"韻", hv:"VẬN", on:"いん", vi:"vần; dư âm", lv:"N1", ham:"音 (âm thanh) + 員 — âm hoà hợp nối nhau: 韻 (vần thơ), 余韻 (dư âm)." },
    { k:"暗", hv:"ÁM", on:"あん / くら-い", vi:"tối", lv:"N4", ham:"日 (mặt trời) + 音 — bộ chính là 日. Trời tối chỉ còn nghe tiếng mà không thấy: 暗い, 暗記 (học thuộc)." },
    { k:"意", hv:"Ý", on:"い", vi:"ý nghĩ, ý nghĩa", lv:"N4", ham:"音 (tiếng) + 心 (lòng) — bộ chính là 心. Tiếng nói từ trong lòng: 意味, 意見." },
    { k:"億", hv:"ỨC", on:"おく", vi:"trăm triệu", lv:"N2", ham:"亻 + 意 — bộ chính là 亻. Con số lớn chỉ nghĩ trong đầu mới hình dung nổi: 一億 (100 triệu)." },
    { k:"憶", hv:"ỨC", on:"おく", vi:"ghi nhớ", lv:"N1", ham:"忄 (lòng) + 意 (ý) — bộ chính là 忄. Giữ ý nghĩ trong lòng: 記憶 (trí nhớ)." },
    { k:"章", hv:"CHƯƠNG", on:"しょう", vi:"chương, huy hiệu", lv:"N2", ham:"音 (âm nhạc) + 十 (trọn) — bộ chính là 立. Một khúc nhạc trọn vẹn: chương, 文章, 第一章." },
    { k:"障", hv:"CHƯỚNG", on:"しょう / さわ-る", vi:"cản trở", lv:"N2", ham:"阝 (tường đất) + 章 — bộ chính là 阝. Bức vách chắn ngang: 障害 (chướng ngại), 故障 (hỏng)." },
    { k:"境", hv:"CẢNH", on:"きょう / さかい", vi:"ranh giới", lv:"N2", ham:"土 (đất) + 竟 (音 + 儿: khúc nhạc kết thúc) — bộ chính là 土. Nơi đất tận cùng: 境, 環境 (môi trường)." },
    { k:"鏡", hv:"KÍNH", on:"きょう / かがみ", vi:"cái gương", lv:"N3", ham:"金 (kim loại) + 竟 (âm KYOU) — bộ chính là 金. Tấm đồng mài bóng soi mặt: 鏡, 眼鏡 (kính mắt)." }
  ]
},

188: {
  emoji: "🦴",
  hinhDung: "Khớp xương 冎 trên phần thịt 月 — bộ xương bọc thịt.",
  yNghia: "Xương — bộ xương, cốt cách; phần cứng bên trong thân thể.",
  trongKanji: "Trong Kanji, 骨 thường liên quan đến xương, tuỷ, xác chết — hoặc chỉ âm KATSU (滑).",
  cachNho: "冎 (khớp xương) trên 月 (thịt) — xương nằm bên trong thịt.",
  bienThe: "Chỉ một dạng 骨, làm bộ thì đứng bên TRÁI. Bộ hiếm: có 3 chữ thông dụng.",
  viDu: [
    { k:"髄", hv:"TUỶ", on:"ずい", vi:"tuỷ; tinh tuý", lv:"N1", ham:"骨 (xương) + 随 — phần mềm nằm sâu trong xương: 骨髄 (tuỷ xương), 真髄 (tinh tuý)." },
    { k:"骸", hv:"HÀI", on:"がい", vi:"hài cốt, xác", lv:"N1", ham:"骨 (xương) + 亥 — bộ xương còn lại: 残骸 (xác, đống đổ nát), 遺骸 (di hài)." },
    { k:"滑", hv:"HOẠT", on:"かつ / すべ-る / なめ-らか", vi:"trơn, trượt", lv:"N2", ham:"氵 (nước) + 骨 (âm KATSU) — bộ chính là 氵. Trơn như có nước: 滑る (trượt), 円滑 (trôi chảy)." }
  ]
},

189: {
  emoji: "🏯",
  hinhDung: "Toà lầu cao nhiều tầng: mái nhọn, tầng giữa, cổng dưới.",
  yNghia: "Cao — lầu cao, cao lớn; mở rộng thành cao quý, giá cao.",
  trongKanji: "Trong Kanji, 高 thường mang ý cao lớn, và hay CHỈ ÂM KOU (稿) — dạng rút gọn 喬 (KYOU) trong 橋, 矯.",
  cachNho: "亠 (mái) + 口 (cửa sổ tầng trên) + 冂 (tường) + 口 (cổng) — lầu cao hai tầng.",
  bienThe: "Chỉ một dạng 高 (có biến thể 髙 'thang cao' dùng trong họ tên). Bộ hiếm: không chữ jōyō nào khác lấy 高 làm bộ chính; 5 chữ dưới chứa 高 / 喬.",
  viDu: [
    { k:"稿", hv:"CẢO", on:"こう", vi:"bản thảo", lv:"N1", ham:"禾 (rơm lúa) + 高 (âm KOU) — bộ chính là 禾. Rơm khô dùng lót, như bản nháp: 原稿 (bản thảo), 投稿 (đăng bài)." },
    { k:"橋", hv:"KIỀU", on:"きょう / はし", vi:"cây cầu", lv:"N4", ham:"木 (gỗ) + 喬 (cao vút) — bộ chính là 木. Cây gỗ bắc cao qua sông: 橋." },
    { k:"矯", hv:"KIỂU", on:"きょう / た-める", vi:"nắn thẳng", lv:"N1", ham:"矢 (tên) + 喬 (cao) — bộ chính là 矢. Uốn cán tên cho thẳng: 矯正." },
    { k:"豪", hv:"HÀO", on:"ごう", vi:"hào hùng, hào phóng", lv:"N1", ham:"高 (cao, rút gọn) + 豕 (lợn rừng) — bộ chính là 豕. Lợn rừng lông dựng cao dữ dằn: 豪華, 豪雨." },
    { k:"亭", hv:"ĐÌNH", on:"てい", vi:"đình, quán", lv:"N1", ham:"高 (lầu, rút gọn) + 丁 (âm TEI) — bộ chính là 亠. Nhà mái cao bên đường cho khách nghỉ: 料亭." }
  ]
},

194: {
  emoji: "👹",
  hinhDung: "Người đội cái đầu to đáng sợ, có cái đuôi ム — hồn ma.",
  yNghia: "Quỷ — linh hồn người chết, ma quỷ; trong tiếng Nhật 鬼 (おに) là con quỷ oni.",
  trongKanji: "Trong Kanji, bộ này thường liên quan đến hồn phách, ma quỷ, sức mê hoặc, cái xấu xí — hoặc chỉ âm KAI (塊).",
  cachNho: "田 (cái đầu to dị dạng) + 儿 (chân) + ム (cái đuôi) — con quỷ đầu to có đuôi.",
  bienThe: "Chỉ một dạng 鬼, đứng bên PHẢI hoặc ôm phía dưới (魔). 3 chữ đầu thuộc bộ 鬼; 2 chữ sau có 鬼 làm thành phần.",
  viDu: [
    { k:"魂", hv:"HỒN", on:"こん / たましい", vi:"linh hồn", lv:"N1", ham:"云 (mây, hơi) + 鬼 — phần hơi của người bay lên như mây: 魂, 霊魂." },
    { k:"魅", hv:"MỊ", on:"み", vi:"mê hoặc", lv:"N1", ham:"鬼 (quỷ) + 未 — yêu quỷ làm người mê mẩn: 魅力 (sức hấp dẫn), 魅了." },
    { k:"魔", hv:"MA", on:"ま", vi:"ma quỷ", lv:"N1", ham:"麻 (âm MA) + 鬼 (quỷ) — con quỷ phá đám: 悪魔, 邪魔 (cản trở), 魔法." },
    { k:"塊", hv:"KHỐI", on:"かい / かたまり", vi:"cục, khối", lv:"N1", ham:"土 (đất) + 鬼 (âm KAI) — bộ chính là 土. Cục đất kết lại: 塊." },
    { k:"醜", hv:"XÚ", on:"しゅう / みにく-い", vi:"xấu xí", lv:"N1", ham:"酉 (rượu) + 鬼 (quỷ) — bộ chính là 酉. Say như quỷ, bộ dạng khó coi: 醜い." }
  ]
},

195: {
  emoji: "🐟",
  hinhDung: "Con cá đứng đầu chúc lên: đầu, thân có vảy, và bốn chấm là vây đuôi.",
  yNghia: "Cá — các loài cá và sinh vật sống dưới nước.",
  trongKanji: "Trong Kanji, bộ này thường chỉ tên các loài cá (rất nhiều chữ ngoài jōyō: 鮭, 鮪, 鯛…) và việc đánh bắt, ăn cá.",
  cachNho: "⺈ (đầu) + 田 (thân có vảy) + 灬 (vây đuôi xoè) — con cá.",
  bienThe: "魚 đứng riêng hoặc làm bộ bên TRÁI. Bốn chấm dưới đáy là đuôi cá, KHÔNG phải bộ hoả 灬. Bộ hiếm trong jōyō: có 3 chữ (phần lớn tên cá nằm ngoài jōyō).",
  viDu: [
    { k:"鮮", hv:"TIÊN", on:"せん / あざ-やか", vi:"tươi; rõ nét", lv:"N1", ham:"魚 (cá) + 羊 (dê) — cá và thịt dê vừa làm xong: tươi sống, 新鮮; rực rỡ, 鮮やか." },
    { k:"鯨", hv:"KÌNH", on:"げい / くじら", vi:"cá voi", lv:"N1", ham:"魚 (cá) + 京 (to lớn) — con 'cá' to nhất: cá voi, 捕鯨 (săn cá voi)." },
    { k:"漁", hv:"NGƯ", on:"ぎょ / りょう", vi:"đánh cá", lv:"N2", ham:"氵 (nước) + 魚 (cá) — bộ chính là 氵. Bắt cá dưới nước: 漁業 (ngư nghiệp), 漁師 (ngư dân)." }
  ]
},

196: {
  emoji: "🐦",
  hinhDung: "Con chim đuôi dài đứng nghiêng: mỏ, mắt, lông cánh và bốn chấm là chân đuôi.",
  yNghia: "Chim — các loài chim (đặc biệt chim đuôi dài; chim đuôi ngắn là 隹).",
  trongKanji: "Trong Kanji, bộ này thường chỉ tên loài chim, tiếng chim kêu, gà vịt.",
  cachNho: "Con chim có con mắt 目 to trên đầu, bốn chấm dưới là chân và đuôi.",
  bienThe: "鳥 đứng bên PHẢI hoặc dưới đáy. Khác 隹 (Chuy, bộ 172 — chim đuôi ngắn). Bộ hiếm trong jōyō: 3 chữ thuộc bộ 鳥 + 島.",
  viDu: [
    { k:"鳴", hv:"MINH", on:"めい / な-く", vi:"kêu, hót", lv:"N4", ham:"口 (miệng) + 鳥 (chim) — chim mở miệng hót: 鳴く, 悲鳴 (tiếng thét)." },
    { k:"鶏", hv:"KÊ", on:"けい / にわとり", vi:"con gà", lv:"N2", ham:"奚 + 鳥 — loài chim nuôi trong sân: 鶏 (gà), 鶏肉 (thịt gà)." },
    { k:"鶴", hv:"HẠC", on:"かく / つる", vi:"chim hạc", lv:"N1", ham:"隺 (bay cao) + 鳥 — loài chim bay cao, biểu tượng trường thọ: 鶴, 折り鶴 (hạc giấy)." },
    { k:"島", hv:"ĐẢO", on:"とう / しま", vi:"hòn đảo", lv:"N3", ham:"鳥 (bỏ bốn chấm) + 山 (núi) — bộ chính là 山. Ngọn núi giữa biển nơi chim đậu nghỉ: 島, 半島." }
  ]
},

200: {
  emoji: "🌿",
  hinhDung: "Những bó sợi gai phơi dưới mái nhà 广.",
  yNghia: "Cây gai — cây lấy sợi dệt vải; tê dại (麻酔 gây mê).",
  trongKanji: "Trong Kanji, 麻 thường CHỈ ÂM MA (摩, 磨, 魔) kèm ý cọ xát, mài giũa sợi gai.",
  cachNho: "广 (mái nhà) + hai chữ 木 (bó sợi gai) — gai phơi dưới mái.",
  bienThe: "Chỉ một dạng 麻, luôn ôm phía TRÊN. Bộ hiếm: không chữ jōyō nào khác lấy 麻 làm bộ chính; 3 chữ dưới có 麻 chỉ âm MA.",
  viDu: [
    { k:"摩", hv:"MA", on:"ま", vi:"cọ xát", lv:"N1", ham:"麻 (âm MA) + 手 (tay) — bộ chính là 手. Tay xoa, cọ: 摩擦 (ma sát)." },
    { k:"磨", hv:"MA", on:"ま / みが-く", vi:"mài, đánh bóng", lv:"N2", ham:"麻 (âm MA) + 石 (đá) — bộ chính là 石. Mài lên đá cho bóng: 磨く, 歯を磨く (đánh răng)." },
    { k:"魔", hv:"MA", on:"ま", vi:"ma quỷ", lv:"N1", ham:"麻 (âm MA) + 鬼 (quỷ) — bộ chính là 鬼. Con quỷ phá đám: 悪魔, 邪魔." }
  ]
}

});
