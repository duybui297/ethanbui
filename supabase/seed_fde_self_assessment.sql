-- Forward Deployed Engineer self-assessment: 1 article x EN/VI, linked.
-- Run after 0001_initial.sql + seed.sql. UPSERT, safe to re-run.
-- published_at and status are preserved on re-run.

-- New category + tags for this piece
insert into public.categories (slug, name_en, name_vi) values
  ('engineering-career', 'AI / Engineering career', 'AI / Sự nghiệp kỹ sư')
on conflict (slug) do nothing;

insert into public.tags (slug, name_en, name_vi) values
  ('forward-deployed-engineer', 'Forward Deployed Engineer', 'Forward Deployed Engineer'),
  ('ai-native', 'AI-native', 'AI-native'),
  ('software-delivery', 'Software delivery', 'Software delivery'),
  ('engineering-career', 'Engineering career', 'Sự nghiệp kỹ sư'),
  ('self-assessment', 'Self-assessment', 'Tự chấm điểm')
on conflict (slug) do nothing;

insert into public.articles (locale, slug, title, excerpt, body_md, status, published_at, reading_time, meta_title, meta_description, og_image_url)
values
  ('en', $q$forward-deployed-engineer-self-assessment$q$, $q$The Forward Deployed Engineer: a self-assessment for the AI era$q$, $q$Score yourself on the role that's quietly becoming the most valuable seat in software, then find the one gap to close first.$q$, $body$By the end of this you'll have done three things: scored yourself 1 to 5 on the 8 capabilities that make up a Forward Deployed Engineer, named your single biggest gap, and walked out with a 90-day plan to close it. No theory you can't act on the same afternoon.

I run delivery for a unit of 100+ engineers, and I keep a small AI lab on the side to test what's coming before it hits corporate scale. From both seats I've watched the same thing happen this year: the job that pays and matters most stopped being "the person who can build it." Let me show you what replaced it, and how close you already are.

## What a Forward Deployed Engineer actually is

An FDE is the person who can sit with a customer at 9am, understand the business problem well enough to argue about it, and have a working AI solution running a few days later. Something the customer can open and click.

The title comes out of companies like Palantir and now the AI labs, where engineers get sent straight into the customer's world instead of waiting behind a product manager. The shape of the role is older than the title though. It's an engineer who also carries the questions a consultant, a product manager, and a founder would ask.

![Diagram showing the Forward Deployed Engineer as the overlap of six roles](/article-images/forward-deployed-engineer-self-assessment/01-fde-stack.png)

*One person carrying six sets of questions at once. That overlap is the whole job, and it's why the role is rare.*

Here's the part that matters for your career. Each of those circles used to be a separate hire. The reason one person can hold them now is that AI ate most of the manual cost inside each one. So the value moved to the seam between them, and the seam is where few people are trained.

## Why this role, why now

For 20 years the hard, expensive, slow part of software was building it. Whole careers were organized around that bottleneck: specialists who could write the code, architects who could make it hold together, managers who could keep 30 of them moving.

AI moved the bottleneck. Writing a first version of almost anything is now cheap and fast. When building gets cheap, the expensive question becomes the one that stayed manual: are you building the right thing for this specific customer, and will they actually use it?

![Diagram showing the bottleneck moving from building software to choosing the right problem](/article-images/forward-deployed-engineer-self-assessment/02-bottleneck-shift.png)

*When the cost of building collapses, the constraint jumps to problem selection and adoption. That's the new scarce skill.*

So the FDE is valuable for a plain reason. The role lives exactly on top of the new bottleneck. It owns the choosing and the adopting, on top of the building. In Vietnam I see very few people training for this on purpose, which is most of the opportunity.

## The 7 mindset shifts (the operating system)

Capabilities are the visible layer. Under them sits an operating system, the defaults you reach for without thinking. You can be a strong engineer and still run the old defaults, and the old defaults are what hold most people back. Here are the 7 shifts that separate an FDE from a very good developer.

![Table of seven mindset shifts from old default to FDE default](/article-images/forward-deployed-engineer-self-assessment/03-seven-shifts.png)

*Read these as defaults, not slogans. The question is which side you reach for under pressure.*

### 1. Code first becomes problem first

The old reflex is to open the editor. The FDE reflex is to ask what breaks for the customer today and what it costs them per week. If you can't put a number on the pain, you're about to build something the customer never asked for. Failure mode to watch: starting to code because the problem feels obvious. It rarely is.

### 2. Deliver features becomes deliver outcomes

A feature is something you shipped. An outcome is something that changed for the customer: hours saved, a cost cut, a deal closed faster. You can ship 10 features and move nothing. Tie your work to a number the customer already cares about, and check it after you ship.

### 3. Know the tech becomes know the customer's business

You don't have to become an accountant to build for accountants, but you do have to understand how they make and lose money. The best questions in a customer meeting are about their workflow, not your stack. Spend the first hour learning their job and the architecture mostly designs itself.

### 4. Take orders becomes propose solutions

Customers ask for what they can imagine, which is usually a faster version of what they already do. Your job is to show them the option they couldn't picture. That takes the nerve to say "I think there's a better way" in the room, and the evidence to back it.

### 5. Months to build becomes prototype in days

Speed here is how you learn. A rough thing in front of a customer on day 3 teaches you more than a polished thing in month 3. AI-assisted building is what makes this realistic now, so the constraint is no longer your typing speed, it's how fast you can see the problem clearly.

![Timeline from a morning customer meeting to a running prototype within days](/article-images/forward-deployed-engineer-self-assessment/04-morning-to-demo.png)

*Meet the customer Monday, put something they can click in front of them by Thursday. The loop is the product.*

### 6. Developer becomes engineer plus consultant plus product thinker

This is the hardest one because it's three habits in one body. The engineer ships. The consultant reads the room and the business. The product thinker decides what's worth building at all. Most people are strong in one and quietly avoid the other two.

### 7. Finish the task becomes own it until the customer succeeds

The task ends when the code merges. The outcome ends when the customer is getting value in production and would be upset if you took it away. Those are months apart, and the gap is where adoption lives or dies. Owning that gap is the founder habit, and it's the one clients remember.

## The 8 capability pillars (your skill map)

Now the visible layer. These 8 pillars are what you can actually build and measure. Score yourself 1 to 5 on each, where 1 is beginner, 3 is competent, and 5 is expert. Be honest, the whole exercise is worthless if you round up.

![The eight FDE capability pillars laid out as a map](/article-images/forward-deployed-engineer-self-assessment/05-pillars-map.png)

*Eight pillars. Four are usually a senior engineer's strength, four are usually the gap. The split is the interesting part.*

| Pillar | Competent (3) | Expert (5) |
| --- | --- | --- |
| **Elite software engineering** | Ships production code that holds up | Designs systems others build on, full stack, alone if needed |
| **AI engineering** | Builds with LLMs, RAG, and agents from tutorials | Ships reliable AI features and knows their failure modes cold |
| **Product thinking** | Can spot a weak feature idea | Finds the right problem before anyone asks for it |
| **Customer obsession** | Listens well in meetings | Understands the customer's business better than they expect |
| **Rapid prototyping** | Builds a demo in a week | Working prototype in days, used to learn, not to impress |
| **Data engineering** | Moves and cleans data when needed | Builds reliable pipelines and real-time systems by default |
| **Business acumen** | Understands cost and revenue at a high level | Reasons about ROI and risk like the person paying the bill |
| **Founder mindset** | Takes ownership of their tasks | Owns the problem, solution, and adoption to the end |

## Score yourself, then plot it

Put your 8 numbers on a radar. The shape tells you more than the total. A balanced octagon at 3s means you're a solid generalist who needs depth somewhere. A spiky shape means you have a real strength and a real hole, which is honestly easier to fix.

![Radar chart with the eight pillars and a one to five scale](/article-images/forward-deployed-engineer-self-assessment/06-radar-scoring.png)

*Plot yourself honestly. The dent in the shape is your next quarter's work, not a verdict on you.*

If you're a senior engineer out of an enterprise or outsourcing background, I can usually guess your radar before you draw it. Strong on the left, thin on the right.

## Find your biggest gap

Here's the pattern I see in almost every strong enterprise engineer in Vietnam. The advantages are real and hard to teach: deep systems thinking, architecture under pressure, the ability to talk to a business stakeholder without flinching, and years of knowing how large organizations actually work.

![Two columns contrasting typical advantages against typical gaps](/article-images/forward-deployed-engineer-self-assessment/07-advantage-gap.png)

*Your advantage column took years to build. The gap column can move in one quarter if you point at it on purpose.*

The gaps cluster around the same 4 things: shipping AI products fast, building with the customer in the loop instead of behind a spec, owning the full stack alone, and the specific craft of AI application engineering. None of those need 10 years. They need deliberate reps on real problems, which most enterprise work never gives you.

So your biggest gap is usually the lowest score among those 4, not the lowest score overall. A 2 in data engineering matters less than a 2 in rapid prototyping if your goal is to become an FDE, because prototyping is on the critical path of the role and pure data work often isn't.

## Close the gap in 90 days

One gap, one quarter. Spreading attention across all 8 is how people make no progress and feel busy doing it. Pick the lowest of your 4 likely gaps and aim everything at it.

![A 90 day plan split into three monthly blocks](/article-images/forward-deployed-engineer-self-assessment/08-90day-plan.png)

*Thirty days to get unembarrassing, thirty to get useful, thirty to ship something a real user touches.*

The shape that works, using rapid prototyping plus AI engineering as the example since that's the common gap:

**Days 1 to 30, get unembarrassing.** Build 3 throwaway prototypes end to end with AI assistance. Pick real, small problems from your own work, the messier the better. The goal is to kill the fear of the blank repo and learn where AI helps and where it lies to you.

**Days 31 to 60, get useful.** Take one of the three to a real person, ideally an internal team with an actual pain. Watch them use it. Rebuild based on what you saw, not what they said. This is where the customer-obsession and outcome muscles grow.

**Days 61 to 90, ship something owned.** Get one thing into real use and stay on it past launch. Track one number it was supposed to move. Owning it past the demo is the founder rep, and it's the hardest to fake on a CV.

> You don't become an FDE by reading about it. You become one by running this loop on a real problem, in public, three times.

Vietnam doesn't have many people building this profile on purpose yet. The senior engineers here are strong. The gap is in where they point that strength. If you score yourself honestly today and aim one quarter at one weakness, you're closer to the front of this than almost anyone around you.

Draw your radar. Find the dent. Start the 90 days.$body$, 'published', now(), 9, $q$The Forward Deployed Engineer: a self-assessment for the AI era$q$, $q$Score yourself on the role that's quietly becoming the most valuable seat in software, then find the one gap to close first.$q$, $q$/article-images/forward-deployed-engineer-self-assessment/cover.png$q$)
on conflict (locale, slug) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  body_md = excluded.body_md,
  reading_time = excluded.reading_time,
  meta_title = excluded.meta_title,
  meta_description = excluded.meta_description,
  og_image_url = excluded.og_image_url,
  updated_at = now();

insert into public.articles (locale, slug, title, excerpt, body_md, status, published_at, reading_time, meta_title, meta_description, og_image_url, translation_of)
values
  ('vi', $q$forward-deployed-engineer-self-assessment$q$, $q$Forward Deployed Engineer: bài tự chấm điểm cho thời đại AI$q$, $q$Tự chấm mình trên cái vai trò đang lặng lẽ trở thành chỗ ngồi giá trị nhất trong ngành phần mềm, rồi tìm ra đúng một lỗ hổng để lấp trước.$q$, $body$Đọc xong bài này bạn sẽ làm được 3 việc: tự chấm 1 đến 5 trên 8 năng lực tạo nên một Forward Deployed Engineer, gọi tên được lỗ hổng lớn nhất của mình, và cầm về một kế hoạch 90 ngày để lấp nó. Không có lý thuyết nào mà bạn không bắt tay làm được ngay chiều nay.

Tôi quản lý delivery cho một đơn vị hơn 100 kỹ sư, và giữ thêm một lab AI nhỏ bên cạnh để thử nghiệm những thứ sắp tới trước khi đưa vào quy mô doanh nghiệp. Từ cả hai ghế đó, năm nay tôi thấy cùng một chuyện: vị trí trả lương cao và quan trọng nhất không còn là "người có thể build ra nó" nữa. Để tôi chỉ cho bạn thứ đã thay thế nó, và bạn đang đứng gần đích tới mức nào.

## Forward Deployed Engineer thực ra là ai

FDE là người sáng 9h ngồi với khách hàng, hiểu bài toán kinh doanh đủ sâu để tranh luận về nó, và vài ngày sau đã có một giải pháp AI chạy thật. Một thứ khách hàng mở ra bấm vào dùng được ngay.

Cái tên này đến từ những công ty như Palantir và giờ là các lab AI, nơi kỹ sư được đẩy thẳng vào thế giới của khách hàng thay vì ngồi sau lưng một product manager. Nhưng hình hài của vai trò này thì cũ hơn cái tên nhiều. Đó là một kỹ sư mang theo cả những câu hỏi mà một consultant, một product manager và một founder sẽ đặt ra.

![Sơ đồ FDE là phần giao của sáu vai trò](/article-images/forward-deployed-engineer-self-assessment/01-fde-stack.png)

*Một người gánh sáu bộ câu hỏi cùng lúc. Phần giao nhau đó chính là toàn bộ công việc, và đó là lý do vai trò này hiếm.*

Đây là phần quan trọng với sự nghiệp của bạn. Mỗi vòng tròn đó từng là một vị trí tuyển riêng. Lý do giờ một người ôm được hết là vì AI đã ăn gần hết phần chi phí thủ công bên trong từng vòng. Thế là giá trị dồn về cái khe nối giữa chúng, mà cái khe đó thì rất ít người được đào tạo để làm.

## Tại sao là vai trò này, tại sao là lúc này

Suốt 20 năm, phần khó, đắt và chậm nhất của phần mềm là build ra nó. Cả những sự nghiệp được dựng quanh nút thắt đó: chuyên gia viết code, kiến trúc sư giữ cho hệ thống đứng vững, quản lý giữ cho 30 người di chuyển cùng nhịp.

AI dời cái nút thắt đi. Viết bản đầu tiên của gần như mọi thứ bây giờ vừa rẻ vừa nhanh. Khi việc build trở nên rẻ, câu hỏi đắt tiền lại là cái vẫn còn phải làm thủ công: bạn có đang build đúng thứ cho đúng khách hàng này không, và họ có thật sự dùng nó không?

![Sơ đồ nút thắt dịch chuyển từ build phần mềm sang chọn đúng bài toán](/article-images/forward-deployed-engineer-self-assessment/02-bottleneck-shift.png)

*Khi chi phí build sụp xuống, nút thắt nhảy sang việc chọn bài toán và việc được khách hàng dùng. Đó là kỹ năng hiếm mới.*

Nên FDE có giá trị vì một lý do rất thẳng. Vai trò này nằm đúng trên cái nút thắt mới. Nó sở hữu cả phần chọn và phần được dùng, nằm trên cả phần build. Ở Việt Nam tôi thấy rất ít người chủ động luyện cho vai trò này, và đó chính là phần lớn cơ hội.

## 7 chuyển dịch tư duy (hệ điều hành bên dưới)

Năng lực là lớp nhìn thấy được. Bên dưới nó là một hệ điều hành, những phản xạ mặc định bạn dùng mà không cần nghĩ. Bạn có thể là một kỹ sư giỏi mà vẫn chạy bằng mặc định cũ, và mặc định cũ là thứ kéo chân hầu hết mọi người. Đây là 7 chuyển dịch tách một FDE khỏi một developer rất giỏi.

![Bảng bảy chuyển dịch tư duy từ mặc định cũ sang mặc định FDE](/article-images/forward-deployed-engineer-self-assessment/03-seven-shifts.png)

*Hãy đọc đây như những phản xạ mặc định, đừng đọc như khẩu hiệu. Câu hỏi là dưới áp lực, bạn với tay sang bên nào.*

### 1. Code trước thành bài toán trước

Phản xạ cũ là mở editor lên. Phản xạ của FDE là hỏi hôm nay khách hàng đang hỏng chỗ nào và mỗi tuần nó tốn của họ bao nhiêu. Nếu bạn không đặt được con số lên nỗi đau đó, bạn sắp build một thứ khách hàng chẳng cần tới. Cái bẫy cần canh: bắt tay code vì thấy bài toán "quá rõ ràng rồi". Nó hiếm khi rõ thật.

### 2. Giao feature thành giao kết quả

Feature là thứ bạn đã ship. Kết quả là thứ đã thay đổi cho khách hàng: số giờ tiết kiệm, một khoản chi phí cắt được, một deal chốt nhanh hơn. Bạn có thể ship 10 feature mà không dời được gì cả. Hãy gắn việc của mình vào một con số khách hàng vốn đã quan tâm, rồi quay lại kiểm tra nó sau khi ship.

### 3. Hiểu công nghệ thành hiểu việc kinh doanh của khách

Bạn không cần thành kế toán để build cho dân kế toán, nhưng bạn phải hiểu họ kiếm tiền và mất tiền bằng cách nào. Câu hỏi hay nhất trong buổi gặp khách là về workflow của họ, không phải về stack của bạn. Dành một giờ đầu để học công việc của họ, kiến trúc gần như tự thiết kế ra.

### 4. Làm theo yêu cầu thành đề xuất giải pháp

Khách hàng hỏi đúng những gì họ hình dung được, thường là một phiên bản nhanh hơn của thứ họ đang làm. Việc của bạn là chỉ cho họ phương án họ không tự nghĩ ra. Cái đó cần bản lĩnh để nói "tôi nghĩ có cách tốt hơn" ngay trong phòng, và bằng chứng để bảo vệ nó.

### 5. Mất nhiều tháng thành prototype trong vài ngày

Tốc độ ở đây là cách bạn học. Một thứ thô đặt trước mặt khách vào ngày thứ 3 dạy bạn nhiều hơn một thứ bóng bẩy ở tháng thứ 3. Build có AI hỗ trợ là thứ làm điều này khả thi bây giờ, nên giới hạn không còn là tốc độ gõ phím, mà là bạn nhìn ra bài toán rõ nhanh tới đâu.

![Dòng thời gian từ buổi gặp khách buổi sáng tới một prototype chạy được sau vài ngày](/article-images/forward-deployed-engineer-self-assessment/04-morning-to-demo.png)

*Gặp khách thứ Hai, đặt một thứ họ bấm được trước mặt họ vào thứ Năm. Cái vòng lặp đó chính là sản phẩm.*

### 6. Developer thành engineer cộng consultant cộng product thinker

Đây là chuyển dịch khó nhất vì nó là 3 thói quen trong một người. Engineer thì ship. Consultant thì đọc được căn phòng và việc kinh doanh. Product thinker thì quyết xem có đáng build hay không. Phần lớn mọi người mạnh một cái và lặng lẽ né hai cái còn lại.

### 7. Xong task thành chịu trách nhiệm đến khi khách thành công

Task kết thúc khi code được merge. Kết quả kết thúc khi khách đang nhận giá trị trên production và sẽ khó chịu nếu bạn rút nó đi. Hai mốc đó cách nhau nhiều tháng, và cái khoảng giữa là nơi adoption sống hoặc chết. Sở hữu cái khoảng đó là thói quen của founder, và là thứ khách hàng nhớ về bạn.

## 8 trụ năng lực (bản đồ kỹ năng của bạn)

Giờ tới lớp nhìn thấy được. 8 trụ này là thứ bạn thật sự build và đo được. Tự chấm 1 đến 5 mỗi trụ, với 1 là beginner, 3 là competent, 5 là expert. Chấm thật, cả bài tập này vô nghĩa nếu bạn làm tròn lên.

![Tám trụ năng lực FDE bày ra thành một bản đồ](/article-images/forward-deployed-engineer-self-assessment/05-pillars-map.png)

*Tám trụ. Bốn cái thường là thế mạnh của một senior engineer, bốn cái thường là lỗ hổng. Cái chỗ chia đôi đó mới là phần thú vị.*

| Trụ năng lực | Competent (3) | Expert (5) |
| --- | --- | --- |
| **Elite software engineering** | Ship code production trụ được | Thiết kế hệ thống cho người khác xây lên trên, full stack, một mình nếu cần |
| **AI engineering** | Build với LLM, RAG, agent theo tutorial | Ship được tính năng AI ổn định và nắm rõ điểm gãy của nó |
| **Product thinking** | Nhận ra được một ý tưởng feature yếu | Tìm ra đúng bài toán trước khi có ai yêu cầu |
| **Customer obsession** | Lắng nghe tốt trong buổi họp | Hiểu việc kinh doanh của khách hơn cả mức họ ngờ tới |
| **Rapid prototyping** | Build một demo trong một tuần | Prototype chạy được trong vài ngày, dùng để học chứ không để gây ấn tượng |
| **Data engineering** | Di chuyển và làm sạch dữ liệu khi cần | Build pipeline và hệ thống real-time ổn định như một mặc định |
| **Business acumen** | Hiểu chi phí và doanh thu ở mức tổng quan | Lập luận về ROI và rủi ro như chính người trả tiền |
| **Founder mindset** | Nhận trách nhiệm cho task của mình | Sở hữu bài toán, giải pháp và việc được dùng tới cùng |

## Chấm điểm, rồi vẽ nó ra

Đặt 8 con số của bạn lên một radar. Cái hình nói nhiều hơn cái tổng. Một bát giác cân bằng toàn 3 nghĩa là bạn là một generalist chắc tay nhưng cần đào sâu ở đâu đó. Một hình lởm chởm nghĩa là bạn có một thế mạnh thật và một lỗ thật, mà cái đó thật ra dễ sửa hơn.

![Biểu đồ radar với tám trụ và thang một đến năm](/article-images/forward-deployed-engineer-self-assessment/06-radar-scoring.png)

*Vẽ thật vào. Chỗ lõm của cái hình là việc của quý sau, không phải bản án về con người bạn.*

Nếu bạn là senior engineer đi ra từ môi trường doanh nghiệp hay outsourcing, tôi thường đoán được radar của bạn trước cả khi bạn vẽ. Mạnh bên trái, mỏng bên phải.

## Tìm lỗ hổng lớn nhất của bạn

Đây là cái khuôn tôi thấy ở gần như mọi kỹ sư doanh nghiệp giỏi ở Việt Nam. Lợi thế thì rất thật và khó dạy: tư duy hệ thống sâu, làm kiến trúc dưới áp lực, khả năng nói chuyện với một stakeholder kinh doanh mà không run, và nhiều năm hiểu các tổ chức lớn vận hành thật ra thế nào.

![Hai cột đối chiếu lợi thế thường gặp với lỗ hổng thường gặp](/article-images/forward-deployed-engineer-self-assessment/07-advantage-gap.png)

*Cột lợi thế của bạn mất nhiều năm để dựng. Cột lỗ hổng có thể dịch chuyển trong một quý nếu bạn chủ động chĩa vào nó.*

Các lỗ hổng tụ quanh đúng 4 thứ: ship sản phẩm AI nhanh, build với khách trong vòng lặp thay vì ngồi sau một bản spec, ôm full stack một mình, và cái nghề rất riêng là AI application engineering. Không cái nào cần 10 năm. Chúng cần số lần luyện có chủ đích trên bài toán thật, mà việc doanh nghiệp thì hiếm khi cho bạn cái đó.

Nên lỗ hổng lớn nhất của bạn thường là điểm thấp nhất trong 4 cái này, không phải điểm thấp nhất toàn bảng. Một điểm 2 ở data engineering ít quan trọng hơn một điểm 2 ở rapid prototyping nếu mục tiêu của bạn là thành FDE, vì prototyping nằm trên đường găng của vai trò còn data thuần thì thường không.

## Lấp lỗ hổng trong 90 ngày

Một lỗ, một quý. Rải sự chú ý ra cả 8 trụ là cách người ta không tiến được bước nào mà vẫn thấy mình bận. Chọn cái thấp nhất trong 4 lỗ hổng nhiều khả năng nhất, và chĩa mọi thứ vào nó.

![Kế hoạch 90 ngày chia thành ba khối theo tháng](/article-images/forward-deployed-engineer-self-assessment/08-90day-plan.png)

*Ba mươi ngày để hết ngượng, ba mươi ngày để có ích, ba mươi ngày để ship một thứ người dùng thật chạm vào.*

Cái khung chạy được, lấy rapid prototyping cộng AI engineering làm ví dụ vì đó là lỗ hổng phổ biến:

**Ngày 1 đến 30, hết ngượng.** Build 3 prototype bỏ đi, end to end, có AI hỗ trợ. Chọn bài toán nhỏ thật từ chính công việc của bạn, càng lộn xộn càng tốt. Mục tiêu là giết nỗi sợ cái repo trắng và học xem AI giúp ở đâu và nói dối bạn ở đâu.

**Ngày 31 đến 60, có ích.** Mang một trong ba cái đó tới một người thật, lý tưởng là một team nội bộ có nỗi đau thật. Nhìn họ dùng nó. Build lại dựa trên thứ bạn thấy, không phải thứ họ nói. Đây là chỗ cơ customer obsession và cơ outcome lớn lên.

**Ngày 61 đến 90, ship một thứ có chủ.** Đưa được một thứ vào dùng thật và bám nó qua cả mốc launch. Đo một con số mà nó lẽ ra phải dời. Sở hữu nó qua khỏi cái demo là lần luyện founder, và là thứ khó giả nhất trên một cái CV.

> Bạn không thành FDE bằng cách đọc về nó. Bạn thành FDE bằng cách chạy cái vòng lặp này trên một bài toán thật, công khai, ba lần.

Việt Nam chưa có nhiều người chủ động dựng cái profile này. Kỹ sư senior ở đây mạnh. Lỗ hổng nằm ở chỗ họ chĩa sức mạnh đó vào đâu. Nếu hôm nay bạn tự chấm mình thật lòng và dành một quý nhắm vào một điểm yếu, bạn đã đứng gần đầu hàng này hơn gần như tất cả những người quanh bạn.

Vẽ radar của bạn ra. Tìm chỗ lõm. Bắt đầu 90 ngày.$body$, 'published', now(), 10, $q$Forward Deployed Engineer: bài tự chấm điểm cho thời đại AI$q$, $q$Tự chấm mình trên cái vai trò đang lặng lẽ trở thành chỗ ngồi giá trị nhất trong ngành phần mềm, rồi tìm ra đúng một lỗ hổng để lấp trước.$q$, $q$/article-images/forward-deployed-engineer-self-assessment/cover.png$q$, (select id from public.articles where locale='en' and slug=$q$forward-deployed-engineer-self-assessment$q$))
on conflict (locale, slug) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  body_md = excluded.body_md,
  reading_time = excluded.reading_time,
  meta_title = excluded.meta_title,
  meta_description = excluded.meta_description,
  og_image_url = excluded.og_image_url,
  updated_at = now();

update public.articles e
set translation_of = v.id
from public.articles v
where e.locale='en' and e.slug=$q$forward-deployed-engineer-self-assessment$q$
  and v.locale='vi' and v.slug=$q$forward-deployed-engineer-self-assessment$q$
  and e.translation_of is null;

insert into public.article_categories (article_id, category_id)
select a.id, c.id
from public.articles a
join public.categories c on c.slug = 'engineering-career'
where a.slug = $q$forward-deployed-engineer-self-assessment$q$
on conflict do nothing;

insert into public.article_tags (article_id, tag_id)
select a.id, t.id
from public.articles a
join public.tags t on t.slug in ('forward-deployed-engineer', 'ai-native', 'software-delivery', 'engineering-career', 'self-assessment')
where a.slug = $q$forward-deployed-engineer-self-assessment$q$
on conflict do nothing;
