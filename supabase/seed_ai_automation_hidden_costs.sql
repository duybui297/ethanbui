-- The hidden costs of full AI workflow automation: 1 article x EN/VI, linked.
-- Run after 0001_initial.sql + seed.sql. UPSERT, safe to re-run.
-- published_at and status are preserved on re-run.

-- New category + tags for this piece
insert into public.categories (slug, name_en, name_vi) values
  ('ai-in-practice', 'AI in practice', 'AI thực chiến')
on conflict (slug) do nothing;

insert into public.tags (slug, name_en, name_vi) values
  ('ai-automation', 'AI automation', 'AI tự động hóa'),
  ('ai-workflow', 'AI workflow', 'AI workflow'),
  ('multi-agent', 'Multi-agent', 'Multi-agent'),
  ('hallucination', 'Hallucination', 'Ảo giác'),
  ('ai-adoption', 'AI adoption', 'Ứng dụng AI')
on conflict (slug) do nothing;

insert into public.articles (locale, slug, title, excerpt, body_md, status, published_at, reading_time, meta_title, meta_description, og_image_url)
values
  ('en', $q$ai-automation-hidden-costs$q$, $q$The real bill for letting AI run your whole workflow$q$, $q$Every vendor sells you the demo where AI takes a task and finishes it on its own. Here are the five costs they leave off the invoice, why "multiple agents checking each other" mostly doesn't work, and where a human still has to sit in the loop.$q$, $body$I run delivery teams during the day and a small AI lab at night, so I've watched a lot of these automated flows up close. Not the keynote version. The 2am version, where the run is still going, the token meter is climbing, and nobody in the room can say what the agent is actually doing right now.

The pitch is always the same. Hand the work to AI, walk away, come back to a finished result. The pitch is real for narrow, repeatable tasks. It falls apart the moment the work is open-ended, and the gap between those two cases is exactly what gets hidden. So here's the honest invoice, line by line, from someone who keeps paying it.

![Five hidden costs of AI workflow automation: tokens, control, over-engineering, hallucination, maturity](/article-images/ai-automation-hidden-costs/01-five-costs.png)

*The five line items that never make it onto the slide. We'll take them one at a time.*

## Cost 1: the token bill is huge, and the job may still not finish

An autonomous flow doesn't think in steps the way you do. It loops. It re-reads its own context, retries, second-guesses, explores branches you never asked for. Each loop spends tokens, and tokens are money.

The part that stings isn't the size of the bill. It's that a big bill buys you no guarantee. I've had runs spend the equivalent of a long work session and land on something I had to throw away. You paid for the thinking and still own the problem.

Before you automate anything open-ended, put a number on it. Cap the spend per run. Watch your first ten runs and write down what each one cost and whether it actually shipped. If most of the money goes to runs you discard, the flow isn't saving you anything, it's just moving the cost from your hours to your card.

## Cost 2: you can't see what it's doing, and fixing it is the hard part

When a person does a task, you can ask them where they are. An autonomous agent gives you a wall of output and a result, and the reasoning in between is mostly opaque. You see what it decided, not why.

That opacity is fine right up until the output is wrong. Then you're debugging a black box. You can't put a breakpoint on a hunch. Often the fastest fix is to scrap the whole run and start over with a tighter instruction, which means the "automation" just cost you a full redo.

![A human can be asked where they are mid-task; an autonomous agent returns a result with opaque reasoning](/article-images/ai-automation-hidden-costs/02-black-box.png)

*You can ask a person where they're stuck. With an agent, you get the answer and have to reverse-engineer the path.*

The control you give up here is the real cost, not the compute. A workflow you can't inspect mid-flight is a workflow you can't correct mid-flight. You either trust it blindly or you wait for the end and hope.

## Cost 3: it over-engineers by default

Ask an agent for a simple thing and it will often hand you a complicated one. A small script becomes a framework. A one-line fix becomes a refactor with three new abstractions you didn't ask for and now have to maintain.

This happens because the model has seen a lot of "thorough" code, and to it, thorough looks like more. It chases the look of complete. Left alone, it builds the cathedral when you needed a shed.

The cost lands later, when someone has to read, change, or trust that code. Over-engineered output is slower to review and easier to break. If you don't push back hard and ask for the simplest version, the flow quietly trades your future maintenance time for the appearance of effort today.

## Cost 4: hallucinations, with no handle to grab

Every model makes things up. A fake API, a confident wrong number, a citation that doesn't exist. In a chat you catch it because you're reading every line. In an autonomous flow, that invented fact becomes an input to the next step, and the next, before you ever see it.

Here's the worst part. When it does happen, you often have no clean way to control it. You can't reliably tell the model "stop being wrong about this," because it doesn't know it's wrong. The error is laundered through ten confident steps and arrives looking like a finished result.

![A single fabricated fact becomes the input to each later step, compounding through the flow](/article-images/ai-automation-hidden-costs/03-hallucination-propagates.png)

*One made-up fact early in the flow doesn't stay one error. It becomes the ground every later step stands on.*

This is why I trust an automated flow least on exactly the work that matters most: anything with real facts and real numbers behind it. The flow is most dangerous precisely where being wrong costs the most.

## Cost 5: this is still an experiment, not a product for everyday users

I use these tools every day and I'll say it plainly: full workflow automation is a research preview. Treating it as a finished product is the mistake. It's powerful in the hands of someone who knows when it's lying and how to box it in. It's a trap for anyone who takes the output at face value.

That's the line vendors blur. The demo implies "anyone can do this." The reality is closer to "an expert can supervise this." If you're not the expert yet, automating a flow end to end still needs the expertise. It just stays hidden until something breaks, and then it's the whole problem.

## Why "multiple agents checking each other" mostly doesn't work

The popular fix for all of the above is the multi-agent council. Run several agents on the same flow, have them cross-check each other, and let the disagreement catch the errors. Grok ships a version of this. On paper it's a fact-checking committee.

I tried it. Here's the catch: the agents are usually the same underlying model. So when the model is wrong, every agent is wrong the same way. They agree on the mistake and hand it back to you with extra confidence. The committee can't catch the error because every member shares the blind spot.

![Five agents on one model all produce the same wrong answer, so cross-checking confirms the error instead of catching it](/article-images/ai-automation-hidden-costs/04-correlated-errors.png)

*Five reviewers, one brain. They don't cross-check the error, they co-sign it.*

Real cross-checking needs independence. Different models, trained differently, failing differently, so one catches what another misses. And that's where it gets hard. Mixing models from different vendors inside one flow runs straight into security boundaries, data-sharing rules, latency, cost, and a pile of integration work most teams won't take on. The honest version of multi-agent is expensive and rare. The cheap version, same model wearing five hats, gives you the comfort of review with none of the protection.

## Why it gets worse as the project grows

Context windows are finite. Feed a model more than it can hold and it starts dropping or blurring the earlier material. On a small task you never hit the wall. On a large one, with many sessions stitched together, you hit it constantly, and that's where hallucination breeds. The model forgets a constraint from three steps back and confidently invents a replacement.

The bigger the project and the more sessions it spans, the more this compounds. No memory system on the market today fully solves it. There are clever tricks, retrieval, summaries, scratchpads, but none of them give the model a perfect, durable memory of everything that came before. So the failure rate doesn't stay flat as you scale. It climbs.

![As sessions accumulate, earlier context falls out of the window and hallucination risk climbs](/article-images/ai-automation-hidden-costs/05-context-limit.png)

*Each new session pushes older context toward the edge of the window. The error rate doesn't hold steady as you scale, it grows.*

## What actually works right now: a human on the reins

Put all of it together and you land where the experienced people already are. The most effective setup today is a human holding the reins and steering, with AI doing the heavy lifting inside boundaries the human sets and checks.

That's how you get the speed without inheriting the failure modes. The human scopes the task small enough to verify, reviews at checkpoints instead of only at the end, catches the hallucination before it propagates, and kills the over-engineering before it ships. AI moves fast. The human decides what's true and what counts as done.

![A human sets boundaries and review checkpoints while AI does the work inside them](/article-images/ai-automation-hidden-costs/06-human-reins.png)

*The working pattern. AI does the work, the human owns the boundaries, the checkpoints, and the call on what's true.*

Letting AI handle absolutely everything sounds efficient and reads well in a pitch deck. In practice it's how you ship confident nonsense at scale. The teams getting real value treat the model as a strong component inside a human-run process and never as the process itself.

## The marketing gap, and why it matters

Companies sell the convenience of automation and stay quiet on the rest. Nvidia and Microsoft announce an AI laptop with features that sound impossible, and the caveats live in the footnotes. The same shape shows up in the polished automated workflows the AI labs themselves demo. The capability is real. The framing leaves out the cost, the failure modes, and the expertise required to run it safely.

The end user walks away thinking the tool does more, and does it more reliably, than it actually does. That's not a small thing. It sets people up to hand real work to a system they don't understand, and to be surprised when it breaks in exactly the ways the people who built it could have warned them about.

## What to actually do this week

If you're using or evaluating an automated AI flow, you don't need to abandon it. You need to run it like an adult.

![Checklist: cap spend, scope small, review at checkpoints, verify facts, demand the simplest version](/article-images/ai-automation-hidden-costs/07-checklist.png)

*The five-minute discipline that turns an automated flow from a gamble into a tool.*

Cap the token spend per run and watch what your first runs actually cost versus what they ship. Scope every task small enough that you can verify the result by hand. Put review checkpoints in the middle of the flow, not just at the end, so you can correct it before a wrong step poisons the rest.

Treat every fact, number, and citation the flow produces as unverified until you've checked it yourself, especially on anything that carries real consequences. And when the output looks more complicated than your problem, send it back and ask for the simplest version that works.

None of that is glamorous. It's the unglamorous discipline that decides whether AI saves you time or quietly costs you more than it gives. The model is getting better fast. The judgment about when to trust it, and when to keep your hands on the reins, is still yours to supply.$body$, 'published', now(), 8, $q$The real bill for letting AI run your whole workflow$q$, $q$The five hidden costs of full AI workflow automation, why multi-agent cross-checking mostly fails, and the human-on-the-reins pattern that actually works.$q$, $q$/article-images/ai-automation-hidden-costs/cover.png$q$)
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
  ('vi', $q$ai-automation-hidden-costs$q$, $q$Cái giá thật khi để AI chạy trọn workflow của bạn$q$, $q$Nhà cung cấp nào cũng bán cho bạn cái demo: AI nhận việc rồi tự làm xong. Đây là 5 khoản chi phí họ không ghi vào hóa đơn, vì sao "nhiều agent kiểm tra chéo cho nhau" phần lớn không chạy, và chỗ nào con người vẫn buộc phải ngồi trong vòng lặp.$q$, $body$Ban ngày tôi điều hành đội delivery, ban đêm chạy một lab AI nhỏ, nên tôi đã xem mấy cái flow tự động này ở cự ly gần khá nhiều. Không phải bản trên keynote. Bản lúc 2 giờ sáng, khi run vẫn đang chạy, đồng hồ token vẫn leo, và không ai trong phòng nói được lúc này con agent đang thực sự làm gì.

Lời chào hàng lúc nào cũng giống nhau. Giao việc cho AI, đi chỗ khác, quay lại có kết quả hoàn chỉnh. Lời chào đó đúng với những việc hẹp và lặp lại. Nó vỡ ra ngay khi việc mang tính mở, và khoảng cách giữa hai trường hợp đó chính là thứ bị giấu đi. Nên đây là hóa đơn trung thực, từng dòng một, từ một người vẫn đang trả nó đều đặn.

![Năm chi phí ẩn của AI tự động hóa workflow: token, kiểm soát, over-engineering, ảo giác, độ chín](/article-images/ai-automation-hidden-costs/01-five-costs.png)

*Năm dòng chi phí không ai đưa lên slide. Đi từng cái một.*

## Chi phí 1: token tốn khổng lồ, mà việc chưa chắc đã xong

Một flow tự động không suy nghĩ theo từng bước như bạn. Nó lặp. Nó đọc lại context của chính mình, thử lại, tự nghi ngờ, đi vào những nhánh bạn chẳng yêu cầu. Mỗi vòng lặp là tiền token, và token là tiền thật.

Cái đau không nằm ở con số hóa đơn. Nó nằm ở chỗ hóa đơn to không mua được sự bảo đảm nào. Tôi có những run đốt bằng cả một buổi làm việc dài, rồi ra một thứ phải vứt đi. Bạn trả tiền cho phần suy nghĩ, và vẫn ôm nguyên bài toán.

Trước khi tự động hóa bất cứ việc mở nào, hãy đặt một con số lên đó. Đặt trần chi phí mỗi run. Theo dõi 10 run đầu tiên và ghi lại từng run tốn bao nhiêu và có thực sự ra sản phẩm dùng được không. Nếu phần lớn tiền chảy vào những run bạn vứt đi, cái flow đó chẳng tiết kiệm gì cho bạn, nó chỉ chuyển chi phí từ giờ công của bạn sang cái thẻ của bạn.

## Chi phí 2: bạn không nhìn được nó đang làm gì, và sửa mới là phần khó

Khi một con người làm việc, bạn hỏi được họ đang ở đâu. Một con agent tự động trả cho bạn một mớ output và một kết quả, còn phần suy luận ở giữa thì gần như mù. Bạn thấy nó quyết gì, không thấy vì sao.

Cái mù đó không sao cho tới lúc output sai. Lúc đó bạn đang debug một hộp đen. Bạn không đặt được breakpoint lên một linh cảm. Thường thì cách nhanh nhất là bỏ cả run rồi làm lại từ đầu với một chỉ dẫn chặt hơn, nghĩa là cái "tự động hóa" vừa bắt bạn làm lại toàn bộ.

![Con người hỏi được đang vướng ở đâu; agent tự động trả kết quả với suy luận mù](/article-images/ai-automation-hidden-costs/02-black-box.png)

*Con người thì bạn hỏi được đang kẹt ở đâu. Với agent, bạn nhận kết quả rồi phải tự dò ngược lại đường đi.*

Thứ bạn đánh mất ở đây mới là chi phí thật, không phải tiền tính toán. Một workflow bạn không soi được giữa chừng là một workflow bạn không sửa được giữa chừng. Hoặc bạn tin nó nhắm mắt, hoặc bạn chờ tới cuối rồi cầu may.

## Chi phí 3: nó over-engineer theo mặc định

Bảo agent làm một thứ đơn giản, nó hay trả cho bạn một thứ phức tạp. Một script nhỏ thành một framework. Một sửa đổi một dòng thành một cuộc refactor với ba lớp trừu tượng mới bạn chẳng xin, và giờ phải nuôi.

Chuyện này xảy ra vì model đã thấy rất nhiều code "kỹ lưỡng", và với nó, kỹ lưỡng trông giống như nhiều hơn. Nó chạy theo cái vẻ hoàn chỉnh. Để mặc, nó xây nhà thờ lớn trong khi bạn chỉ cần một cái lán.

Chi phí rơi xuống về sau, khi có người phải đọc, sửa, hoặc tin vào đoạn code đó. Output over-engineer thì review chậm hơn và dễ vỡ hơn. Nếu bạn không phản ứng mạnh và đòi bản đơn giản nhất, cái flow lặng lẽ đổi thời gian bảo trì tương lai của bạn lấy cái vẻ chăm chỉ của hôm nay.

## Chi phí 4: ảo giác, mà không có chỗ nào để nắm

Model nào cũng bịa. Một API không tồn tại, một con số sai nói chắc nịch, một trích dẫn không có thật. Trong chat bạn bắt được vì đang đọc từng dòng. Trong flow tự động, cái dữ kiện bịa đó trở thành đầu vào cho bước sau, rồi bước sau nữa, trước khi bạn kịp nhìn thấy.

Phần tệ nhất là đây. Khi nó xảy ra, bạn thường không có cách nào sạch để kiểm soát. Bạn không bảo model "đừng sai chỗ này nữa" một cách đáng tin được, vì nó đâu biết nó sai. Lỗi được giặt sạch qua 10 bước nói chắc nịch rồi tới tay bạn dưới dạng một kết quả hoàn chỉnh.

![Một dữ kiện bịa trở thành đầu vào của từng bước sau, lan ra cả flow](/article-images/ai-automation-hidden-costs/03-hallucination-propagates.png)

*Một dữ kiện bịa ở đầu flow không nằm yên một lỗi. Nó thành mặt đất cho mọi bước sau đứng lên.*

Đó là lý do tôi tin một flow tự động ít nhất ở đúng những việc quan trọng nhất: bất cứ việc gì có dữ kiện thật, con số thật phía sau. Cái flow nguy hiểm nhất đúng ngay chỗ sai là tốn kém nhất.

## Chi phí 5: đây vẫn là thử nghiệm, chưa phải sản phẩm cho người dùng phổ thông

Tôi dùng mấy công cụ này mỗi ngày và nói thẳng: tự động hóa workflow trọn vẹn vẫn là một bản thử nghiệm. Coi nó như một sản phẩm hoàn chỉnh là cái sai. Nó mạnh trong tay người biết khi nào nó nói dối và biết cách quây nó lại. Nó là cái bẫy cho bất kỳ ai nhận output theo mệnh giá.

Đó là ranh giới nhà cung cấp làm mờ đi. Demo ngụ ý "ai cũng làm được". Thực tế gần hơn với "một chuyên gia giám sát được việc này". Nếu bạn chưa phải chuyên gia, việc tự động một flow từ đầu đến cuối vẫn cần cái chuyên môn đó. Nó chỉ nằm im cho tới khi có thứ vỡ ra, và lúc đó nó là cả vấn đề.

## Vì sao "nhiều agent kiểm tra chéo nhau" phần lớn không chạy

Cách chữa phổ biến cho tất cả những thứ trên là hội đồng multi-agent. Chạy vài agent trên cùng một flow, cho chúng kiểm tra chéo nhau, để sự bất đồng bắt lỗi. Grok đang áp dụng một phiên bản của cách này. Trên giấy thì đó là một hội đồng fact-check.

Tôi đã thử. Chỗ kẹt là: mấy con agent đó thường dùng chung một model nền. Nên khi model sai, mọi agent sai y một kiểu. Chúng đồng thuận trên cái lỗi rồi đưa lại cho bạn với sự tự tin cao hơn. Cái hội đồng không bắt được lỗi vì mọi thành viên chung một điểm mù.

![Năm agent trên cùng một model đều ra cùng một đáp án sai, nên kiểm tra chéo xác nhận lỗi thay vì bắt lỗi](/article-images/ai-automation-hidden-costs/04-correlated-errors.png)

*Năm người duyệt, một bộ não. Chúng không kiểm tra chéo cái lỗi, chúng cùng ký tên vào nó.*

Kiểm tra chéo thật cần sự độc lập. Các model khác nhau, huấn luyện khác nhau, sai khác nhau, để con này bắt được cái con kia bỏ sót. Và đây mới là chỗ khó. Trộn model của nhiều nhà khác nhau trong một flow đâm thẳng vào ranh giới bảo mật, quy tắc chia sẻ dữ liệu, độ trễ, chi phí, và cả đống việc tích hợp mà phần lớn team sẽ không gánh. Phiên bản multi-agent trung thực thì đắt và hiếm. Phiên bản rẻ, cùng một model đội năm cái mũ, cho bạn cảm giác được review mà không có chút bảo vệ nào.

## Vì sao càng làm lớn càng tệ

Cửa sổ context là hữu hạn. Nhồi cho model nhiều hơn sức nó giữ, nó bắt đầu rơi hoặc làm mờ phần trước đó. Việc nhỏ thì bạn chẳng bao giờ chạm tường. Việc lớn, ghép nhiều phiên lại với nhau, bạn chạm tường liên tục, và đó là chỗ ảo giác sinh sôi. Model quên một ràng buộc từ ba bước trước rồi tự tin bịa ra một cái thay thế.

Dự án càng lớn, càng trải qua nhiều phiên làm việc, thứ này càng dồn lên. Chưa có hệ thống bộ nhớ nào trên thị trường hôm nay giải được trọn vẹn. Có những mẹo khôn ngoan, retrieval, tóm tắt, scratchpad, nhưng không cái nào cho model một bộ nhớ hoàn hảo và bền về mọi thứ đã đến trước. Nên tỉ lệ lỗi không nằm phẳng khi bạn mở rộng quy mô. Nó leo lên.

![Khi các phiên dồn lại, context cũ rớt khỏi cửa sổ và rủi ro ảo giác leo lên](/article-images/ai-automation-hidden-costs/05-context-limit.png)

*Mỗi phiên mới đẩy context cũ về phía mép cửa sổ. Tỉ lệ lỗi không giữ nguyên khi bạn scale, nó tăng lên.*

## Thứ thực sự chạy được lúc này: con người cầm cương

Ghép tất cả lại, bạn rơi vào đúng chỗ mà những người có kinh nghiệm đã đứng sẵn. Cách hiệu quả nhất hôm nay là một con người cầm cương và điều chỉnh, còn AI làm phần nặng bên trong những ranh giới mà con người đặt ra và kiểm tra.

Đó là cách bạn lấy được tốc độ mà không thừa hưởng đống lỗi đi kèm. Con người chia việc nhỏ đủ để kiểm chứng được, review tại các chốt giữa chừng thay vì chỉ ở cuối, bắt cái ảo giác trước khi nó lan, và giết cái over-engineering trước khi nó kịp ship. AI chạy nhanh. Con người quyết cái gì là đúng và cái gì là xong.

![Con người đặt ranh giới và các chốt review trong khi AI làm việc bên trong](/article-images/ai-automation-hidden-costs/06-human-reins.png)

*Mẫu hình chạy được. AI làm việc, con người giữ ranh giới, giữ các chốt, và giữ quyền quyết cái gì là đúng.*

Để AI lo tuyệt đối mọi thứ nghe thì hiệu quả và đọc lên rất xuôi trong một bộ slide gọi vốn. Trên thực tế đó là cách bạn ship sự vô nghĩa đầy tự tin ở quy mô lớn. Những team lấy được giá trị thật coi model như một bộ phận mạnh bên trong một quy trình do con người điều hành, và không bao giờ coi nó là cả cái quy trình.

## Khoảng trống marketing, và vì sao nó đáng nói

Các công ty bán sự tiện lợi của tự động hóa và im lặng về phần còn lại. Nvidia với Microsoft công bố một con laptop AI với những tính năng nghe như trên trời, còn các điều kiện kèm theo thì nằm dưới chân trang. Cùng một hình dáng đó xuất hiện trong những workflow tự động bóng bẩy mà chính các lab AI đem ra demo. Năng lực là thật. Cách đóng gói thì bỏ ra ngoài chi phí, các kiểu lỗi, và cái chuyên môn cần có để chạy nó an toàn.

Người dùng cuối bước đi với ấn tượng rằng công cụ làm được nhiều hơn, và làm đáng tin hơn, so với thực tế. Đó không phải chuyện nhỏ. Nó đặt người ta vào thế giao việc thật cho một hệ thống họ không hiểu, rồi ngạc nhiên khi nó vỡ đúng theo những cách mà người dựng ra nó lẽ ra đã cảnh báo được.

## Tuần này nên làm gì

Nếu bạn đang dùng hoặc đang cân nhắc một flow AI tự động, bạn không cần vứt nó đi. Bạn cần chạy nó như một người lớn.

![Checklist: đặt trần chi phí, chia việc nhỏ, review tại chốt, kiểm chứng dữ kiện, đòi bản đơn giản nhất](/article-images/ai-automation-hidden-costs/07-checklist.png)

*Kỷ luật năm phút biến một flow tự động từ canh bạc thành công cụ.*

Đặt trần token mỗi run và theo dõi những run đầu thực sự tốn bao nhiêu so với thứ chúng ship ra. Chia mỗi việc nhỏ đủ để bạn kiểm chứng kết quả bằng tay. Cắm các chốt review vào giữa flow, không chỉ ở cuối, để bạn sửa được trước khi một bước sai đầu độc phần còn lại.

Coi mọi dữ kiện, con số, trích dẫn mà flow tạo ra là chưa kiểm chứng cho tới khi tự bạn soi lại, nhất là với bất cứ thứ gì mang hậu quả thật. Và khi output trông phức tạp hơn bài toán của bạn, trả nó về và đòi bản đơn giản nhất mà chạy được.

Chẳng có cái nào trong đó hào nhoáng cả. Đó là cái kỷ luật không hào nhoáng quyết định AI tiết kiệm thời gian cho bạn hay lặng lẽ ngốn nhiều hơn nó cho. Model đang tốt lên rất nhanh. Còn cái phán đoán khi nào nên tin nó, và khi nào nên giữ tay trên cương, vẫn là thứ bạn phải tự cấp.$body$, 'published', now(), 8, $q$Cái giá thật khi để AI chạy trọn workflow của bạn$q$, $q$Năm chi phí ẩn của việc tự động hóa workflow bằng AI, vì sao multi-agent kiểm tra chéo phần lớn không chạy, và mẫu hình con người cầm cương thực sự hiệu quả.$q$, $q$/article-images/ai-automation-hidden-costs/cover.png$q$, (select id from public.articles where locale='en' and slug=$q$ai-automation-hidden-costs$q$))
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
where e.locale='en' and e.slug=$q$ai-automation-hidden-costs$q$
  and v.locale='vi' and v.slug=$q$ai-automation-hidden-costs$q$
  and e.translation_of is null;

insert into public.article_categories (article_id, category_id)
select a.id, c.id
from public.articles a
join public.categories c on c.slug = 'ai-in-practice'
where a.slug = $q$ai-automation-hidden-costs$q$
on conflict do nothing;

insert into public.article_tags (article_id, tag_id)
select a.id, t.id
from public.articles a
join public.tags t on t.slug in ('ai-automation', 'ai-workflow', 'multi-agent', 'hallucination', 'ai-adoption')
where a.slug = $q$ai-automation-hidden-costs$q$
on conflict do nothing;
