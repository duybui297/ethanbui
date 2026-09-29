/* Bài học chi tiết — batch I: nhóm 7 nét + 8 nét (13/15 bộ)
   7 nét: 角 谷 豆 豕 豸 辛 辰 酉 釆 里
   8 nét: 長 青 非
   2 bộ dưới 3 chữ jōyō KHÔNG viết bài, chỉ có ghi chú trong LESSON_NOTES: 155 赤 (赦) · 171 隶 (隷 逮).
   Đã kiểm tra grade trên kanjiapi.dev cho mọi chữ hiếm trước khi viết: tất cả là jōyō (grade ≤ 8). */
window.LESSONS = window.LESSONS || {};
window.LESSON_NOTES = window.LESSON_NOTES || {};

Object.assign(window.LESSON_NOTES, {
  155: "Bộ 赤 (Xích) — người đứng trên ngọn lửa 大 + 火, sáng đỏ rực. Ngoài chính chữ 赤 (せき / あか: màu đỏ — 赤ちゃん em bé, 赤字 thâm hụt), bảng chữ Hán thông dụng (jōyō) chỉ có 1 chữ thuộc bộ này — 赦 (XÁ, しゃ: tha thứ, 恩赦 ân xá). Không đủ chữ để làm thành bài phân tích riêng, nên bộ này chỉ có phần phiên âm / nghĩa và vẫn dùng đầy đủ ở hai dạng luyện tập.",
  171: "Bộ 隶 (Đãi) — bàn tay ⺕ túm lấy đuôi con thú từ phía sau: đuổi kịp, bắt được. Bảng chữ Hán thông dụng (jōyō) chỉ có 2 chữ chứa bộ này — 隷 (LỆ, れい: nô lệ, 奴隷) và 逮 (ĐÃI, たい: bắt giữ, 逮捕). Không đủ chữ để làm thành bài phân tích riêng, nên bộ này chỉ có phần phiên âm / nghĩa và vẫn dùng đầy đủ ở hai dạng luyện tập."
});

Object.assign(window.LESSONS, {

148: {
  emoji: "🦬",
  hinhDung: "Chiếc sừng thú cong, có vân ngang.",
  yNghia: "Sừng — sừng trâu bò; mở rộng thành góc cạnh, đấu sức (húc sừng).",
  trongKanji: "Trong Kanji, 角 thường liên quan đến sừng, góc, sự tách ra (解) hoặc chạm vào (触).",
  cachNho: "⺈ (đầu nhọn) + thân sừng có hai vạch vân bên trong.",
  bienThe: "Chỉ một dạng 角. Bộ hiếm: có 3 chữ thông dụng.",
  viDu: [
    { k:"解", hv:"GIẢI", on:"かい / げ / と-く", vi:"giải, cởi", lv:"N3", ham:"角 (sừng) + 刀 (dao) + 牛 (trâu) — dùng dao tách sừng con trâu ra: tách rời, 解決, 理解." },
    { k:"触", hv:"XÚC", on:"しょく / さわ-る / ふ-れる", vi:"chạm vào", lv:"N2", ham:"角 (sừng) + 虫 (sâu) — con sâu dùng râu như cái sừng dò đường: 触る, 接触." },
    { k:"衡", hv:"HÀNH", on:"こう", vi:"cân bằng", lv:"N1", ham:"行 + 角 (sừng) + 大 — bộ chính là 行. Thanh gỗ buộc ngang hai sừng trâu cho cân: 均衡." }
  ]
},

150: {
  emoji: "🏞️",
  hinhDung: "Dòng nước chảy ra từ khe núi 口 — hai bên vách núi xếp lớp.",
  yNghia: "Thung lũng — khe núi có nước chảy; chỗ trũng rộng chứa được nhiều thứ.",
  trongKanji: "Trong Kanji, 谷 thường mang ý rỗng, chứa đựng (容), dư dả (裕), tắm rửa (浴) hoặc thói thường (俗).",
  cachNho: "Hai lớp 八 (vách núi) trên 口 (miệng khe) — nước tuôn ra giữa hai vách.",
  bienThe: "Chỉ một dạng 谷. Bộ hiếm: không chữ jōyō nào khác lấy 谷 làm bộ chính; 6 chữ dưới chứa 谷 làm thành phần.",
  viDu: [
    { k:"欲", hv:"DỤC", on:"よく / ほ-しい", vi:"muốn, ham", lv:"N2", ham:"谷 (hang trống) + 欠 (há miệng) — bộ chính là 欠. Cái bụng trống há miệng đòi: 欲しい." },
    { k:"浴", hv:"DỤC", on:"よく / あ-びる", vi:"tắm", lv:"N2", ham:"氵 (nước) + 谷 — bộ chính là 氵. Dầm mình trong suối nơi khe núi: 浴びる, 入浴." },
    { k:"容", hv:"DUNG", on:"よう", vi:"chứa đựng; dung mạo", lv:"N2", ham:"宀 (nhà) + 谷 (thung lũng) — bộ chính là 宀. Chứa được nhiều như thung lũng: 内容 (nội dung), 美容." },
    { k:"溶", hv:"DUNG", on:"よう / と-ける", vi:"tan chảy", lv:"N1", ham:"氵 (nước) + 容 — bộ chính là 氵. Hoà tan vào trong nước: 溶ける." },
    { k:"裕", hv:"DỤ", on:"ゆう", vi:"dư dả", lv:"N1", ham:"衤 (áo) + 谷 — bộ chính là 衣. Áo rộng thùng thình như thung lũng: 余裕 (dư dả), 裕福 (giàu có)." },
    { k:"俗", hv:"TỤC", on:"ぞく", vi:"thế tục, thông tục", lv:"N1", ham:"亻 (người) + 谷 — bộ chính là 亻. Thói quen của người sống trong thung lũng: 風俗 (phong tục), 民俗." }
  ]
},

151: {
  emoji: "🫘",
  hinhDung: "Cái bát cao chân có nắp đậy — đồ đựng lễ vật.",
  yNghia: "Hạt đậu — vốn vẽ cái bát cao chân để dâng lễ; mượn nghĩa 'hạt đậu'.",
  trongKanji: "Trong Kanji, 豆 thường là cái bệ / bát cao chân: dâng lễ, bệ cao để trèo lên (登), cái đầu tròn trên cổ (頭).",
  cachNho: "一 (nắp) + 口 (bát) + 䒑 (chân đế) — cái bát chân cao.",
  bienThe: "Chỉ một dạng 豆. Bộ hiếm: chỉ 豊 thuộc bộ này; các chữ sau có 豆 làm thành phần.",
  viDu: [
    { k:"豊", hv:"PHONG", on:"ほう / ゆた-か", vi:"phong phú, dồi dào", lv:"N2", ham:"曲 (đồ lễ chất cao) + 豆 (bát chân cao) — bát cúng đầy ắp: 豊か, 豊富." },
    { k:"頭", hv:"ĐẦU", on:"とう / ず / あたま", vi:"cái đầu", lv:"N4", ham:"豆 (chén cao chân) + 頁 (đầu) — bộ chính là 頁. Cái đầu tròn đặt trên cổ như chén trên chân: 頭." },
    { k:"短", hv:"ĐOẢN", on:"たん / みじか-い", vi:"ngắn", lv:"N4", ham:"矢 (mũi tên) + 豆 — bộ chính là 矢. Vật ngắn chỉ bằng cái chén: 短い." },
    { k:"登", hv:"ĐĂNG", on:"とう / と / のぼ-る", vi:"leo lên", lv:"N4", ham:"癶 (hai chân) + 豆 (bệ cao) — bộ chính là 癶. Chân bước lên bệ: 登る." },
    { k:"喜", hv:"HỈ", on:"き / よろこ-ぶ", vi:"vui mừng", lv:"N3", ham:"壴 (cái trống có 豆 làm thân) + 口 — bộ chính là 口. Đánh trống, miệng cười: 喜ぶ." },
    { k:"樹", hv:"THỤ", on:"じゅ", vi:"cây cối", lv:"N2", ham:"木 (cây) + 尌 (tay dựng cái trống 豆) — bộ chính là 木. Cây dựng đứng thẳng: 樹木, 果樹." },
    { k:"闘", hv:"ĐẤU", on:"とう / たたか-う", vi:"chiến đấu", lv:"N1", ham:"門 + 斗 + 豆 — bộ chính là 門 (vốn là 鬥 hai người vật nhau). Giằng co tranh đấu: 闘う, 戦闘." }
  ]
},

152: {
  emoji: "🐖",
  hinhDung: "Con lợn dựng đứng: cái đầu, bụng tròn, bốn chân và đuôi.",
  yNghia: "Con lợn — lợn heo; hình ảnh vật nuôi trong nhà.",
  trongKanji: "Trong Kanji, 豕 thường liên quan đến lợn, thú vật lớn, hoặc ngôi nhà có nuôi lợn (家); 象 là con voi.",
  cachNho: "Nét ngang là cái mõm, các nét cong bên dưới là bụng và bốn chân lợn.",
  bienThe: "Chỉ một dạng 豕. 3 chữ đầu thuộc bộ 豕; các chữ sau có 豕 / 象 / 㒸 / 彖 làm thành phần.",
  viDu: [
    { k:"豚", hv:"ĐỒN", on:"とん / ぶた", vi:"con lợn", lv:"N1", ham:"月 (thịt) + 豕 (lợn) — lợn nuôi lấy thịt: 豚, 豚肉 (thịt heo)." },
    { k:"象", hv:"TƯỢNG", on:"しょう / ぞう", vi:"con voi; hình tượng", lv:"N3", ham:"Vẽ con voi với cái vòi dài — 象 (voi); hình dung ra con vật lạ: 印象 (ấn tượng), 現象." },
    { k:"豪", hv:"HÀO", on:"ごう", vi:"hào hùng; hào phóng", lv:"N1", ham:"高 (cao) + 豕 (lợn rừng) — con nhím / lợn rừng lông dựng cao, dữ dằn: 豪華 (xa hoa), 豪雨 (mưa lớn)." },
    { k:"家", hv:"GIA", on:"か / け / いえ / や", vi:"nhà", lv:"N5", ham:"宀 (mái nhà) + 豕 (lợn) — bộ chính là 宀. Nhà nông xưa nuôi lợn dưới mái: nhà, 家族." },
    { k:"像", hv:"TƯỢNG", on:"ぞう", vi:"bức tượng, hình ảnh", lv:"N2", ham:"亻 (người) + 象 (hình tượng) — bộ chính là 亻. Hình dáng giống người: 想像 (tưởng tượng), 映像." },
    { k:"隊", hv:"ĐỘI", on:"たい", vi:"đội, đội ngũ", lv:"N2", ham:"阝 (đồi) + 㒸 (đàn lợn) — bộ chính là 阝. Cả đàn đi theo hàng xuống dốc: 部隊, 軍隊." },
    { k:"遂", hv:"TOẠI", on:"すい / と-げる", vi:"hoàn thành", lv:"N1", ham:"辶 (đi) + 㒸 — bộ chính là 辶. Đi cho tới cùng: 遂げる, 未遂 (chưa thành)." },
    { k:"墜", hv:"TRỤY", on:"つい", vi:"rơi xuống", lv:"N1", ham:"隊 + 土 (đất) — bộ chính là 土. Rơi từ trên dốc xuống đất: 墜落 (rơi máy bay)." },
    { k:"縁", hv:"DUYÊN", on:"えん / ふち", vi:"duyên; mép", lv:"N1", ham:"糸 (sợi) + 彖 (con lợn) — bộ chính là 糸. Đường viền mép vải; sợi dây nối người với người: 縁 (duyên), 縁側." },
    { k:"劇", hv:"KỊCH", on:"げき", vi:"kịch; dữ dội", lv:"N2", ham:"豦 (hổ 虍 vật lợn 豕) + 刂 (dao) — bộ chính là 刂. Cảnh vật lộn dữ dội: 劇場, 劇的." }
  ]
},

153: {
  emoji: "🐆",
  hinhDung: "Con thú dữ thân dài, lưng cong như đang rình mồi.",
  yNghia: "Thú dữ lưng dài — loài báo, mèo rừng rình vồ mồi.",
  trongKanji: "Trong Kanji, 豸 gặp trong 貌 (dáng vẻ) và 貇 (con thú cào đất) của 懇, 墾.",
  cachNho: "Con thú đang khom mình, nhiều nét phẩy là móng vuốt và lưng cong.",
  bienThe: "Chỉ một dạng 豸 (bản thân 豸 không thuộc jōyō). Bộ hiếm: chỉ 貌 thuộc bộ này; 2 chữ còn lại chứa 貇.",
  viDu: [
    { k:"貌", hv:"MẠO", on:"ぼう", vi:"dung mạo, dáng vẻ", lv:"N1", ham:"豸 (thú) + 皃 (mặt người) — hình dáng bên ngoài: 容貌 (dung mạo), 全貌 (toàn cảnh)." },
    { k:"懇", hv:"KHẨN", on:"こん / ねんご-ろ", vi:"thân thiết, chân thành", lv:"N1", ham:"貇 (thú cào đất chăm chỉ) + 心 (lòng) — bộ chính là 心. Tấm lòng tận tuỵ: 懇談会 (buổi gặp mặt thân mật)." },
    { k:"墾", hv:"KHẨN", on:"こん", vi:"khai khẩn", lv:"N1", ham:"貇 + 土 (đất) — bộ chính là 土. Cày xới đất hoang: 開墾 (khai hoang)." }
  ]
},

160: {
  emoji: "🌶️",
  hinhDung: "Con dao khắc dùng để thích chữ lên mặt tội nhân.",
  yNghia: "Cay, đắng; vất vả — vốn vẽ con dao khắc tội; mở rộng thành cay đắng, khổ cực.",
  trongKanji: "Trong Kanji, 辛 thường liên quan đến tội lỗi, khổ sở, lời lẽ gay gắt (辞, 辣), người cai quản (宰), hoặc là phần 'cây mới đốn' trong 新, 親.",
  cachNho: "立 (đứng) + 十 — đứng chịu mười phần khổ: cay đắng.",
  bienThe: "Chỉ một dạng 辛. Khác 幸 (hạnh — thêm một nét ngang). 辞 theo Khang Hy thuộc bộ 辛 (từ điển Nhật hiện đại xếp vào 舌), 辣 thuộc bộ 辛; các chữ sau có 辛 / 辟 / 亲 làm thành phần.",
  viDu: [
    { k:"辞", hv:"TỪ", on:"じ / や-める", vi:"lời; từ chức", lv:"N3", ham:"舌 (lưỡi) + 辛 (cay đắng) — lời nói khó khăn: 辞書 (từ điển), 辞める (nghỉ việc)." },
    { k:"辣", hv:"LẠT", on:"らつ", vi:"cay nghiệt", lv:"N1", ham:"辛 (cay) + 束 — cay gắt: 辛辣 (chua cay), 辣腕 (tài giỏi quyết đoán)." },
    { k:"宰", hv:"TỂ", on:"さい", vi:"cai quản", lv:"N1", ham:"宀 (nhà) + 辛 (người có tội bị bắt làm việc) — bộ chính là 宀. Người coi sóc việc trong nhà: 主宰 (chủ trì), 宰相 (tể tướng)." },
    { k:"壁", hv:"BÍCH", on:"へき / かべ", vi:"bức tường", lv:"N2", ham:"辟 (có 辛) + 土 (đất) — bộ chính là 土. Tường đất ngăn cách: 壁, 完璧 (hoàn hảo — chữ khác 璧)." },
    { k:"避", hv:"TỊ", on:"ひ / さ-ける", vi:"tránh", lv:"N2", ham:"辶 (đi) + 辟 (âm HI) — bộ chính là 辶. Đi vòng tránh: 避ける, 避難 (lánh nạn)." },
    { k:"癖", hv:"PHÍCH", on:"へき / くせ", vi:"thói quen, tật", lv:"N1", ham:"疒 (bệnh) + 辟 — bộ chính là 疒. Cái tật như bệnh: 癖 (くせ), 口癖 (câu cửa miệng)." },
    { k:"新", hv:"TÂN", on:"しん / あたら-しい", vi:"mới", lv:"N5", ham:"亲 (辛 + 木: cây) + 斤 (rìu) — bộ chính là 斤. Vừa đốn cây tươi: mới, 新しい." },
    { k:"親", hv:"THÂN", on:"しん / おや / した-しい", vi:"cha mẹ, thân thiết", lv:"N4", ham:"亲 (辛 + 木) + 見 (nhìn) — bộ chính là 見. Người trèo cây ngóng con: 親, 親切." },
    { k:"薪", hv:"TÂN", on:"しん / たきぎ / まき", vi:"củi", lv:"N1", ham:"艹 + 新 (vừa đốn) — bộ chính là 艹. Cành cây mới chặt để đun: 薪 (củi)." }
  ]
},

161: {
  emoji: "🐚",
  hinhDung: "Con trai / con sò há vỏ, thò chân ra — ngày xưa dùng vỏ sò làm lưỡi cuốc.",
  yNghia: "Thìn (chi thứ 5); lưỡi cuốc bằng vỏ sò — gắn với việc làm nông và sự rung động.",
  trongKanji: "Trong Kanji, 辰 thường liên quan đến nghề nông (農), sự rung, chấn động (振, 震) hoặc đôi môi mềm (唇).",
  cachNho: "厂 (vỏ sò) + chân thịt thò ra bên dưới — con sò đang nhúc nhích.",
  bienThe: "Chỉ một dạng 辰 (bản thân 辰 không thuộc jōyō). 2 chữ đầu thuộc bộ 辰; 4 chữ sau có 辰 chỉ âm SHIN.",
  viDu: [
    { k:"農", hv:"NÔNG", on:"のう", vi:"nông nghiệp", lv:"N3", ham:"曲 (ruộng) + 辰 (cuốc vỏ sò) — cầm cuốc làm ruộng: 農業, 農家." },
    { k:"辱", hv:"NHỤC", on:"じょく / はずかし-める", vi:"sỉ nhục", lv:"N1", ham:"辰 + 寸 (tay) — bị bắt ra đồng làm cực nhục: 侮辱 (lăng mạ), 屈辱." },
    { k:"振", hv:"CHẤN", on:"しん / ふ-る", vi:"vẫy, lắc", lv:"N3", ham:"扌 (tay) + 辰 (rung) — bộ chính là 扌. Tay vẫy rung: 振る, 振り込み (chuyển khoản)." },
    { k:"震", hv:"CHẤN", on:"しん / ふる-える", vi:"rung chuyển", lv:"N2", ham:"雨 (sấm mưa) + 辰 — bộ chính là 雨. Sấm rền làm đất rung: 地震 (động đất), 震える." },
    { k:"唇", hv:"THẦN", on:"しん / くちびる", vi:"đôi môi", lv:"N1", ham:"辰 (thịt sò mềm) + 口 (miệng) — bộ chính là 口. Phần thịt mềm quanh miệng: 唇." },
    { k:"娠", hv:"THẦN", on:"しん", vi:"có thai", lv:"N1", ham:"女 (nữ) + 辰 (cựa quậy) — bộ chính là 女. Đứa bé cựa trong bụng mẹ: 妊娠 (mang thai)." }
  ]
},

164: {
  emoji: "🍶",
  hinhDung: "Cái vò rượu cổ dài, bụng phình, trong có vạch rượu.",
  yNghia: "Dậu (chi thứ 10); vò rượu — biểu thị rượu, đồ lên men.",
  trongKanji: "Trong Kanji, bộ này thường liên quan đến rượu, sự lên men, vị chua, say xỉn, và tiệc tùng (thù tạc).",
  cachNho: "Chữ 西 thêm một vạch ngang bên trong — vò rượu có vạch mực rượu.",
  bienThe: "Chỉ một dạng 酉, luôn ở bên TRÁI. Nhớ: chữ nào có 酉 thường liên quan tới rượu.",
  viDu: [
    { k:"酒", hv:"TỬU", on:"しゅ / さけ", vi:"rượu", lv:"N4", ham:"氵 (nước) + 酉 (vò rượu) — nước trong vò: rượu, お酒, 日本酒." },
    { k:"配", hv:"PHỐI", on:"はい / くば-る", vi:"phân phát; lo lắng", lv:"N3", ham:"酉 (vò rượu) + 己 (người quỳ) — người quỳ chia rượu: 配る, 心配." },
    { k:"酔", hv:"TUÝ", on:"すい / よ-う", vi:"say", lv:"N2", ham:"酉 (rượu) + 卒 (hết) — uống cạn tới say: 酔う, 二日酔い (say rượu hôm sau)." },
    { k:"酸", hv:"TOAN", on:"さん / す-い", vi:"chua; axit", lv:"N1", ham:"酉 (rượu) + 夋 — rượu để lâu hoá chua: 酸っぱい, 酸素." },
    { k:"酢", hv:"TẠC", on:"さく / す", vi:"giấm", lv:"N1", ham:"酉 (rượu) + 乍 (vừa mới) — rượu lên men thành giấm: 酢." },
    { k:"酵", hv:"DIẾU", on:"こう", vi:"men", lv:"N1", ham:"酉 (rượu) + 孝 — men làm rượu: 発酵 (lên men), 酵素 (enzyme)." },
    { k:"酬", hv:"THÙ", on:"しゅう", vi:"đáp lễ, thù lao", lv:"N1", ham:"酉 (rượu) + 州 — rót rượu mời lại khách: 報酬 (thù lao)." },
    { k:"酪", hv:"LẠC", on:"らく", vi:"sữa chua, bơ sữa", lv:"N1", ham:"酉 (lên men) + 各 — sữa lên men: 酪農 (chăn nuôi bò sữa)." },
    { k:"醜", hv:"XÚ", on:"しゅう / みにく-い", vi:"xấu xí", lv:"N1", ham:"酉 (rượu) + 鬼 (quỷ) — say như quỷ, bộ dạng khó coi: 醜い." },
    { k:"醸", hv:"NHƯỠNG", on:"じょう / かも-す", vi:"ủ rượu", lv:"N1", ham:"酉 (rượu) + 襄 — ủ men làm rượu: 醸造 (ủ rượu); gây ra: 醸し出す." }
  ]
},

165: {
  emoji: "🐾",
  hinhDung: "Dấu móng thú in trên đất, toả ra từ một điểm.",
  yNghia: "Phân biệt — nhìn dấu chân thú để phân biệt đó là con gì.",
  trongKanji: "Trong Kanji, 釆 mang ý phân biệt, giải thích (釈), xét xử (審), và thứ tự lượt (番).",
  cachNho: "米 có thêm nét phẩy trên đầu — dấu móng thú toả ra như hình 米.",
  bienThe: "Chỉ một dạng 釆. Đừng nhầm với 采 (hái — có 爫 trên 木) và 米 (gạo). Bộ hiếm: chỉ 釈 thuộc bộ này; các chữ sau chứa 番.",
  viDu: [
    { k:"釈", hv:"THÍCH", on:"しゃく", vi:"giải thích", lv:"N1", ham:"釆 (phân biệt) + 尺 — tách ra từng phần cho rõ: 解釈 (giải thích), 釈放 (phóng thích)." },
    { k:"番", hv:"PHIÊN", on:"ばん", vi:"lượt, số thứ tự", lv:"N4", ham:"釆 (dấu chân) + 田 (ruộng) — bộ chính là 田. Dấu chân lần lượt in trên ruộng: 番号, 一番." },
    { k:"審", hv:"THẨM", on:"しん", vi:"xét xử, thẩm định", lv:"N1", ham:"宀 (nhà) + 番 (dấu chân) — bộ chính là 宀. Soi xét dấu chân trong nhà: 審判 (trọng tài), 審査." },
    { k:"翻", hv:"PHIÊN", on:"ほん / ひるがえ-る", vi:"lật, phiên dịch", lv:"N1", ham:"番 + 羽 (cánh) — bộ chính là 羽. Chim lật cánh qua lại: 翻訳." },
    { k:"藩", hv:"PHIÊN", on:"はん", vi:"lãnh địa phong kiến", lv:"N1", ham:"艹 + 氵 + 番 — bộ chính là 艹. Hàng rào bao quanh: lãnh địa của daimyō, 藩." }
  ]
},

166: {
  emoji: "🏘️",
  hinhDung: "田 (ruộng) trên 土 (đất) — xóm làng có ruộng đồng.",
  yNghia: "Làng; dặm — làng quê có ruộng đất; cũng là đơn vị đo chiều dài (dặm).",
  trongKanji: "Trong Kanji, 里 thường liên quan đến ruộng đất, làng quê, sự đo đạc (量), hoặc chỉ âm RI (理, 裏) / DOU (童).",
  cachNho: "田 + 土 — có ruộng, có đất là thành làng.",
  bienThe: "Chỉ một dạng 里. 3 chữ đầu thuộc bộ 里; các chữ sau có 里 / 重 / 童 làm thành phần.",
  viDu: [
    { k:"野", hv:"DÃ", on:"や / の", vi:"cánh đồng; hoang dã", lv:"N4", ham:"里 (làng) + 予 — vùng đất ngoài rìa làng: đồng nội, 野菜 (rau), 分野 (lĩnh vực)." },
    { k:"重", hv:"TRỌNG", on:"じゅう / ちょう / おも-い / かさ-ねる", vi:"nặng; chồng chất", lv:"N4", ham:"Người gánh bao nặng trên đất — nặng: 重い, 重要 (quan trọng), 重ねる (chồng lên)." },
    { k:"量", hv:"LƯỢNG", on:"りょう / はか-る", vi:"lượng, cân đo", lv:"N3", ham:"日 + 一 + 里 (gánh nặng) — đặt vật nặng lên cân mà đo: 量る, 数量." },
    { k:"理", hv:"LÝ", on:"り", vi:"lý lẽ", lv:"N4", ham:"王 (ngọc) + 里 (âm RI) — bộ chính là 玉. Đường vân trong ngọc: thớ lý, 理由, 料理." },
    { k:"童", hv:"ĐỒNG", on:"どう / わらべ", vi:"trẻ con", lv:"N3", ham:"立 + 里 — bộ chính là 立. Vốn là đứa hầu nhỏ; nay là trẻ em: 童話 (truyện cổ tích), 児童." },
    { k:"埋", hv:"MAI", on:"まい / う-める", vi:"chôn, lấp", lv:"N1", ham:"土 (đất) + 里 — bộ chính là 土. Lấp đất vào: 埋める, 埋葬." },
    { k:"種", hv:"CHỦNG", on:"しゅ / たね", vi:"hạt giống; loại", lv:"N3", ham:"禾 (lúa) + 重 (nặng) — bộ chính là 禾. Hạt lúa nặng chắc để gieo: 種 (hạt), 種類." },
    { k:"動", hv:"ĐỘNG", on:"どう / うご-く", vi:"chuyển động", lv:"N4", ham:"重 (nặng) + 力 (sức) — bộ chính là 力. Dồn sức đẩy vật nặng: 動く." },
    { k:"裏", hv:"LÝ", on:"り / うら", vi:"mặt trái", lv:"N3", ham:"衣 (áo) tách đôi kẹp 里 — bộ chính là 衣. Lớp lót bên trong áo: 裏." },
    { k:"鐘", hv:"CHUNG", on:"しょう / かね", vi:"cái chuông", lv:"N1", ham:"金 (kim loại) + 童 (âm) — bộ chính là 金. Chuông đồng lớn ở chùa: 鐘." }
  ]
},

168: {
  emoji: "🧓",
  hinhDung: "Ông cụ tóc dài buông xoã, chống gậy.",
  yNghia: "Dài; người lớn tuổi — mái tóc dài của người già; đứng đầu (người lớn nhất).",
  trongKanji: "Trong Kanji, 長 thường là cái gì kéo dài ra (張, 帳) hoặc mái tóc dài (髟 trong 髪).",
  cachNho: "Mấy vạch ngang trên là mái tóc dài buông xuống, phần dưới là thân người chống gậy.",
  bienThe: "長 đứng riêng (ちょう / なが-い: dài; 社長 giám đốc). Làm thành phần ở bên TRÁI thì thu thành 镸 (trong 髪). Bộ hiếm: không chữ jōyō nào khác lấy 長 làm bộ chính; 3 chữ dưới chứa 長.",
  viDu: [
    { k:"張", hv:"TRƯƠNG", on:"ちょう / は-る", vi:"căng ra", lv:"N2", ham:"弓 (cung) + 長 (dài) — bộ chính là 弓. Kéo dây cung căng dài: 張る, 出張, 頑張る." },
    { k:"帳", hv:"TRƯỚNG", on:"ちょう", vi:"màn; sổ ghi", lv:"N2", ham:"巾 (vải) + 長 (dài) — bộ chính là 巾. Tấm vải dài căng làm màn; cuốn sổ: 手帳, 通帳." },
    { k:"髪", hv:"PHÁT", on:"はつ / かみ", vi:"tóc", lv:"N2", ham:"髟 (镸 = tóc dài + 彡) + 友 — bộ chính là 髟. Mái tóc dài buông xoã: 髪." }
  ]
},

174: {
  emoji: "💚",
  hinhDung: "Mầm cây xanh 龶 mọc trên giếng khoáng đan 丹 — màu xanh trong trẻo.",
  yNghia: "Màu xanh — xanh lam, xanh lá, xanh non; sự trong trẻo, trẻ trung.",
  trongKanji: "Trong Kanji, 青 thường CHỈ ÂM SEI / JOU kèm ý 'trong, sạch, sáng': 清, 晴, 精, 情, 請, 静.",
  cachNho: "Phần trên như cây non (龶), phần dưới là 月 — cây xanh dưới trăng trong.",
  bienThe: "Chỉ một dạng 青 (phồn thể viết 靑). Bộ hiếm: chỉ 静 thuộc bộ này; các chữ sau có 青 chỉ âm.",
  viDu: [
    { k:"静", hv:"TĨNH", on:"せい / じょう / しず-か", vi:"yên tĩnh", lv:"N4", ham:"青 (trong trẻo) + 争 (tranh) — dẹp hết tranh giành, trong lặng: 静か, 冷静." },
    { k:"清", hv:"THANH", on:"せい / しょう / きよ-い", vi:"trong sạch", lv:"N2", ham:"氵 (nước) + 青 — bộ chính là 氵. Nước trong xanh: 清い, 清潔 (sạch sẽ)." },
    { k:"晴", hv:"TÌNH", on:"せい / は-れる", vi:"trời nắng", lv:"N4", ham:"日 (mặt trời) + 青 (trời xanh) — bộ chính là 日. Nắng lên trời xanh: 晴れ, 晴れる." },
    { k:"精", hv:"TINH", on:"せい / しょう", vi:"tinh chất, tinh thần", lv:"N2", ham:"米 (gạo) + 青 (trong trắng) — bộ chính là 米. Gạo xát trắng tinh: 精神." },
    { k:"情", hv:"TÌNH", on:"じょう / なさ-け", vi:"tình cảm", lv:"N3", ham:"忄 (lòng) + 青 — bộ chính là 忄. Tấm lòng trong sáng: 感情, 情報 (thông tin)." },
    { k:"請", hv:"THỈNH", on:"せい / しん / こ-う / う-ける", vi:"xin, thỉnh cầu", lv:"N1", ham:"言 (lời) + 青 — bộ chính là 言. Lời xin lịch sự: 請求 (yêu cầu thanh toán), 申請." }
  ]
},

175: {
  emoji: "🙅",
  hinhDung: "Hai cánh chim xoè ra quay lưng vào nhau — hai hướng trái ngược.",
  yNghia: "Không phải, sai — hai cánh quay về hai phía: trái ngược, chống lại, 'không'.",
  trongKanji: "Trong Kanji, 非 thường mang ý trái ngược, sai trái (悲, 罪), hoặc xếp thành hai hàng (排, 輩, 俳) — và chỉ âm HI / HAI.",
  cachNho: "Hai hàng lông cánh đối xứng, quay lưng lại nhau: 'không cùng một phía'.",
  bienThe: "Chỉ một dạng 非 (非 cũng là tiền tố phủ định: 非常, 非常口). Bộ hiếm: không chữ jōyō nào khác lấy 非 làm bộ chính; 6 chữ dưới chứa 非.",
  viDu: [
    { k:"悲", hv:"BI", on:"ひ / かな-しい", vi:"buồn", lv:"N3", ham:"非 (trái ngược) + 心 (lòng) — bộ chính là 心. Lòng bị xé đôi: buồn, 悲しい." },
    { k:"罪", hv:"TỘI", on:"ざい / つみ", vi:"tội", lv:"N2", ham:"罒 (lưới) + 非 (sai trái) — bộ chính là 网. Kẻ làm sai bị lưới pháp luật chụp: 罪." },
    { k:"排", hv:"BÀI", on:"はい", vi:"loại bỏ, xếp hàng", lv:"N2", ham:"扌 (tay) + 非 (hai hàng) — bộ chính là 扌. Tay đẩy gạt sang hai bên: 排除 (loại trừ), 排水." },
    { k:"俳", hv:"BÀI", on:"はい", vi:"diễn viên; thơ haiku", lv:"N1", ham:"亻 (người) + 非 — bộ chính là 亻. Người diễn trò khác mình: 俳優 (diễn viên), 俳句." },
    { k:"輩", hv:"BỐI", on:"はい", vi:"lớp, bối (thế hệ)", lv:"N2", ham:"非 (hai hàng) + 車 (xe) — bộ chính là 車. Xe xếp thành hàng: cùng lứa, 先輩, 後輩." },
    { k:"扉", hv:"PHI", on:"ひ / とびら", vi:"cánh cửa", lv:"N1", ham:"戸 (cửa) + 非 (hai cánh xoè) — bộ chính là 戸. Cửa hai cánh mở về hai bên: 扉." }
  ]
}

});
