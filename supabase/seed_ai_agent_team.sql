-- AI Agent Team series: 3 posts x EN/VI. Run after 0001_initial.sql + seed.sql.
-- Idempotent: on conflict (locale, slug) do nothing.

insert into public.articles (locale, slug, title, excerpt, body_md, status, published_at, reading_time, meta_title, meta_description)
values
  ('en', $q$coding-agent-as-a-team$q$, $q$I stopped treating my coding agent like a tool, and started treating it like a team$q$, $q$I stopped using my coding agent like a tool and started running it like a team. The orchestrator setup, and the four roles that make 'done' mean something again.$q$, $body$*Part 1 of 3. Series: building an AI agent team to ship software.*

For the past few weeks I've worked with agents in a way that's nothing like before.

Before that I used a coding agent the way most people do. Open a session, describe the work, get code back, go back and forth until it runs. For a small utility or a script, that's plenty. I get an idea, type a few lines, the agent answers, I skim it, nod, done.

Then I tried the same approach on a bigger project. And it broke.

The agent's code mostly ran. What broke was my grip on the whole thing. Too many pieces moving at once, tasks sitting at different stages, and no way left for me to tell whether something the agent called "done" actually was.

That's when I changed how I think about it. I stopped seeing the main session as the place where code gets written. I started seeing it as an orchestrator.

## What 'orchestrator' means

The main session doesn't do the work with its own hands anymore. It runs a small team of agents, each with one role. It takes a rough piece of work from me, splits it into tasks, hands each one to the right agent, tracks progress, holds the team to the process, and only commits code after a final acceptance step.

I want to be clear here, because this is easy to mistake for a prompt trick. At heart it's a way of organizing work.

The AI is the same as before. Same model, same tools. What I changed is how the work is arranged around it. And that's the thing that opened up projects I couldn't build the old way.

The reason comes down to one question: who checks the work?

When a single session writes code and also rules that the code is right, nobody checks it. Once the agent says it's finished, I get two options: trust it, or go read every line myself. On a small project I can read it. On a big one I can't. And when I can't, "done" turns into a hollow word.

Splitting the roles fixes exactly that. Every step gets its own gatekeeper. The one who writes the code is separate from the one who decides it's correct.

## Why 'one agent does everything' falls apart

Let me sit on the breaking point a bit, because once you see it you understand why the roles have to split.

For small work, one agent doing everything makes sense. Few tasks, little state, I hold the whole picture in my head. I know what's done, what isn't, where it's going wrong. If the agent skips a step, I catch it on the spot.

A complex project breaks that in two ways.

The first is volume. This one's being coded, that one's waiting on tests, another has fuzzy requirements, a fourth just failed tests and needs redoing. A single session can't hold that much state straight. It loses track of where a task sits, or it finishes one thing and assumes the whole cluster is finished.

The second way is the painful one, and the real reason I had to change: verification.

When the agent reports "all done," what do I have to go on? No step checks whether what it built matches the plan. Nobody reruns the thing to confirm each criterion. Worse, the same agent that wrote the code also gets to declare the code correct. That's a bare conflict of interest. The student grading their own exam always gives themselves a good mark.

I hit this exact scene more than once. The agent declared a feature complete, I believed it, two days later I opened it up and saw it had missed the requirement from the start. It wasn't being sneaky. It just had no second pair of eyes.

So I decided to build a team. Each agent gets its own role with clear borders. And the main session plays orchestrator: spin up the agents, divide the work, enforce the process, commit only after the final acceptance step.

## The four roles on the team

In my current setup, I split the work across four roles.

![Orchestrator delegating to four roles: PM, SWE, QA, On-Call](/article-images/ai-agent-team/en/01-four-roles.svg)

**Product Manager.** Takes a rough piece of work and turns it into something buildable. A spec with a user story, acceptance criteria, test scenarios. This is the role that turns my vague sentence into a clear brief for the whole team. After the code and QA are done, the PM comes back one more time, looks at the result through the user's eyes, and decides whether it's truly finished.

**Software Engineer.** Writes the code, and writes the tests for that code. This role doesn't get to rule that its own work is right. It just builds, and pushes the result to the next step.

**Tester.** Runs those tests, checks every acceptance criterion, reports pass or fail with evidence. I lean hard on that word, evidence. QA doesn't get to say a breezy "looks good." It has to show what ran, how it ran, what came out.

**On-Call Engineer.** Watches CI/CD after the code is pushed, patches things when the pipeline goes red. This is the easiest role to forget, but skip it and code that's "done" on your machine can still break the shared build.

Each role carries one narrow slice of responsibility. Sounds fussy, even slow. But that narrowness is exactly what changes the quality of the output.

## Why narrow slices win

Two reasons.

One, narrow slices make skipping a step much harder. One agent doing everything jumps around easily: write code, commit, forget the tests, forget acceptance, because it's in a hurry to reach the finish. When each step has its own role standing there waiting, a skip shows up immediately. A task can't jump from SWE to commit without passing through QA, because QA is a physical link in the chain.

Two, narrow slices make tracing bugs easier. When something's wrong, I know which role to ask. Fuzzy spec, that's the PM. Tests that miss a bug, that's QA. I'm not digging through a fog of "the agent did something for two hours." Each role leaves its own trail, so I trace back to the broken point much faster.

But the gain I value most is this: the role that writes code and the role that grades code are two separate roles. The maker is pulled clean off the grader. That's how "done" gets its meaning back, instead of being the agent patting itself on the head.

This is also where I think a lot of people working with agents are missing the point. They pour their energy into finding a stronger model, a slicker prompt. But my problem was never a weak model. My problem was that nobody verified the work. And verification is an organizational matter, solved by arranging the work around the agent.

## This part is reusable

I noticed one more thing, and it matters for how I work: this four-role structure isn't tied to any one project.

Once I've defined each role, I carry the whole set over to a new project. The brief changes, the language changes, the technical constraints change, but the four roles and the borders between them stay put. I don't have to think it through from scratch each time. That's the kind of investment I like: spend the effort once, reuse it many times.

The four roles are half the story. The other half is how a task moves through each role in the right order, how to run several tasks in parallel without sitting and watching, and how to track all of it. That's part 2.

If you take one idea from this, take this: the power comes from how you organize around the agent, so that every piece of work has someone to verify it.$body$, 'published', now() - interval '10 minutes', 7, $q$I stopped treating my coding agent like a tool, and started treating it like a team$q$, $q$I stopped using my coding agent like a tool and started running it like a team. The orchestrator setup, and the four roles that make 'done' mean something again.$q$)
on conflict (locale, slug) do nothing;

insert into public.articles (locale, slug, title, excerpt, body_md, status, published_at, reading_time, meta_title, meta_description)
values
  ('en', $q$agent-team-process$q$, $q$The process that keeps an agent team from fooling itself$q$, $q$How one task moves through PM, SWE, QA and a final acceptance step, how to run several in parallel without babysitting them, and how I track the lot.$q$, $body$*Part 2 of 3. Series: building an AI agent team to ship software.*

In part 1 I covered why I treat the main session as an orchestrator and split the work across four roles: PM, SWE, QA, On-Call. The roles are the skeleton. This part is about making that skeleton move: how a task runs through the team, how to run several tasks at once without babysitting, and where the state gets recorded.

## The path a task takes

Every task runs the same sequence of steps. I allow no exceptions, not even for small work, because exceptions are where a process starts to crack.

![Pipeline: Backlog, PM, SWE, QA, PM acceptance, Commit, with a QA-fail loop back to SWE](/article-images/ai-agent-team/en/02-pipeline.svg)

I tell the orchestrator to create a task and push it into the backlog. The PM picks it up and grooms it into a clear spec. The SWE writes code and tests. QA runs the tests, checks each criterion, then calls it pass or fail. On a fail, the task goes back to the SWE to fix. On a pass, the PM steps in one last time to accept it. Only after the PM nods does the orchestrator commit the code and close the task.

The loop tightens in my head like this: PM, SWE, QA, then back to PM before commit.

That "QA fails, send it back to SWE" loop sounds obvious, but it's where I see the real value of separating roles. Because QA is its own role, it has no problem sending a task back. An agent that owns everything tends to wave things through, because a fail means admitting it got its own work wrong. A separate QA has none of that ego. A fail is a fail, with evidence attached.

## Why the final PM acceptance matters most

Of the whole sequence, the step that's easiest to drop is the one I guard hardest: the final PM acceptance, after QA has already passed.

A lot of people will ask, if QA passed, what's left to approve?

Because passing all the tests doesn't mean you solved the right problem.

A feature can be flawlessly "done" by every technical measure and still fall apart in a real user's hands. Tests all green, but the flow makes no sense. Or it does exactly what the brief said, while the brief itself didn't match what the person actually needed. Tests only check whether the code does what we told it to do. They can't check whether what we told it to do was the right thing to do.

The final PM step looks straight at that gap. The PM goes back to the original user story and asks: does this result actually serve what the user needs? It's the last line of defense, and it catches exactly the kind of error no test can.

## Write the process to a file, don't say it out loud each time

To get the whole team through this sequence consistently, I don't repeat it every session. I write it to a file, right in the repo. The agent reads it and follows it:

- A folder holding the definition of each role, one file per role.
- A `PROCESS.md` file describing the development flow end to end.
- A `CLAUDE.md` file with project-level instructions.
- A skill to kick off the pipeline with one command.

Writing the process to a file is what makes this whole approach repeatable, the way I like it. Next time I open a new project, I carry the set over as-is. The agent knows right away what role it is, which step it's on, and what "done" means. I don't have to teach it from scratch.

There's a subtle point here that I'll come back to in part 3: when the process lives only in text files, the agent can still ignore a spot or two. A file is guidance, not a hard fence. But even as a file, writing it down beats saying it out loud every single time.

## Running in parallel and keeping the loop alive

One task at a time wastes time. I usually run two tasks in parallel. When a batch of two finishes, the orchestrator pulls two more from the backlog. Round after round.

![Two tasks running in parallel, then auto-pulling the next batch from the backlog](/article-images/ai-agent-team/en/03-parallel.svg)

Sounds simple, but there's a snag anyone running agents this way hits: the loop dies on its own.

A batch finishes, the orchestrator stops, asks "keep going?" and then sits waiting for me to type. If I'm asleep at midnight, it stands still until morning. A whole night passes and the backlog is still half full. This was one of the most maddening things when I started.

My patch for it is small and effective: plant a looping instruction right inside the task list.

That instruction tells the orchestrator to do two things. One, pull the next batch of tasks. Two, append this same instruction to the end of the list again. So after each batch it reminds itself to pull the next one, then reminds itself again. The loop runs until the backlog is dry, instead of stalling after every batch to wait for me.

This little trick turns a whole night into real working time. I go to sleep with a full backlog, wake up with most of it groomed, coded, tested, and accepted.

But I want to say the attached condition plainly, because it gets lost in the rush of "let the agent run overnight." A self-running loop is only safe when the process above is tight. If you let the agent roll on its own with nobody guarding each step, it'll roll the errors a long way too, and in the morning the cleanup costs you more. Automation and verification have to travel together. Automation without verification just makes garbage faster.

## Tracking tasks: GitHub Issues or files

A self-running loop only helps if I can see what it's doing. I use one of two ways to record state.

The first is **GitHub Issues**. This fits when I want public coordination and I want each agent's report attached to each task. Every issue becomes a full record: the PM writes the requirements, acceptance criteria, test scenarios; the SWE reports the code is done; QA confirms with screenshots of the result. Open an issue and you read the whole history of which hands the work passed through, who did what, and why it passed or failed.

The second is a **file-based tracker**. Much lighter. The state lives in the filename itself.

![Task status through filenames: .todo.md to .groomed.md to .in-progress.md to done/](/article-images/ai-agent-team/en/04-file-status.svg)

A task moves from `.todo.md` to `.groomed.md` to `.in-progress.md`, then finally into a `done/` folder. No external service, no network, just files in the repo. Look at the filename and you know where the task sits in the loop.

I pick whichever way based on how public I need to be. A project many people watch gets GitHub Issues. A project I'm doing solo, or one I'm not sure will live long, gets files for speed.

But here's the point that outweighs both options: the tracker is only the place where state gets recorded.

The same loop, PM, SWE, QA, back to PM, runs identically no matter where I record the state. The tracking tool is the notebook. The thing that produces quality is the process around it, the role separation and forcing every task through the full sequence. Switch trackers and the result doesn't change. Drop the process and the fanciest tracker is useless.

That's the how: roles in part 1, process in part 2. In part 3 I take it into the field, across different kinds of projects, including one I botched, and pull out what's left after all of it.$body$, 'published', now() - interval '20 minutes', 7, $q$The process that keeps an agent team from fooling itself$q$, $q$How one task moves through PM, SWE, QA and a final acceptance step, how to run several in parallel without babysitting them, and how I track the lot.$q$)
on conflict (locale, slug) do nothing;

insert into public.articles (locale, slug, title, excerpt, body_md, status, published_at, reading_time, meta_title, meta_description)
values
  ('en', $q$agent-team-in-the-field$q$, $q$I took the agent team into the field, including the time I botched it$q$, $q$Three real runs with the agent team, including the one I botched, and the three things that keep it from drifting.$q$, $body$*Part 3 of 3. Series: building an AI agent team to ship software.*

The first two parts were theory and process. Part 1 covered why I split the main session into an orchestrator running four roles. Part 2 covered how a task moves through the team and how to keep the loop from dying overnight. This part runs the whole thing for real, across a few kinds of projects, and then tells the story of the time I botched it.

I'm deliberately not painting it rosy. This approach wins on some kinds of work and stumbles on others. Knowing where it stumbles matters more than knowing where it wins.

## Greenfield projects: where the agent team shines

The work this fits best is a project built from zero.

When there's no old code to respect and no constraints to honor, the agent has the most room. I describe the thing I want, the orchestrator tears it into a stack of tasks, pushes them into the backlog, and lets the team grind through the night the way part 2 described.

Morning comes and most of the backlog has gone the full loop: PM groomed, SWE coded, QA checked, PM accepted. I didn't sit and watch the clock. I just open up and read each task's result, and because every task has its own record with QA evidence, I know right away which ones I can trust and which ones I should look at hard.

This is where the self-running loop pays off clearest. A new project has many independent tasks with few cross dependencies, so two tasks running in parallel rarely step on each other. The more loose, separate work in the backlog, the more this approach gains.

I still have to say one thing straight, so nobody reads this and pictures a free code printer. The quality of the output equals the quality of the spec the PM wrote up front. A loose brief means the agent runs all night and produces a pile of things that work but miss the point. It took me a fair few rounds to learn that the effort poured into the PM step up front comes back several times over at QA and final acceptance.

## Small, tight, single-purpose projects

The second fit is just as strong: small jobs, clear scope, one purpose.

A tracker running serverless. A utility library. A set of benchmark scripts to measure performance. Work like this has sharp borders, easy to describe as acceptance criteria QA can check all the way through.

For this kind I usually don't need many parallel lanes. The backlog is short, so running it sequentially finishes fast too. What I gain most here is peace of mind: with a separate QA and a final PM step, I don't have to reread every line myself to trust that it's right.

What do those two kinds share? Both give the agent a clean space to work in. Little legacy, few hidden constraints, a brief that fits in a box.

## And here's the time I botched it

Now the part fewer people tell.

I took the same setup into something completely different: rewriting part of an existing system, porting it to a different build. Building on the old base, with a heap of hidden behavior the current code carries.

I botched it. And I botched it exactly where I thought I already understood things.

I rushed and skipped the PM step. I figured "I know this work cold, why write a long spec," so I described it roughly and turned the team loose. Backlog full, loop self-rolling, two tasks in parallel, just like the nights before.

Morning came and I got a pile of code that ran, tests all green, QA reporting pass. Every indicator looked great. But it ported the wrong thing. It kept some behaviors that should've been dropped, and dropped some that should've been kept, because I never wrote out clearly which was which.

The tests couldn't save me, because tests only check "does the code do what we told it to." I told it wrong from the start. QA couldn't save me either, because QA checks against criteria, and the criteria grew out of my loose spec. The whole line ran flawlessly on a broken brief.

The lesson was expensive but tidy: the more a job carries legacy and hidden constraints, the less you're allowed to cut the PM step. The very step I thought was redundant turned out to be the one keeping the whole job on the rails. I pulled off the protective layer with my own hands, then blamed the machine.

## Why it stumbles on this kind of work

Looking back, the reason is clear enough.

A greenfield project hands the agent a blank sheet. A rewrite on an old base is the opposite: the hardest part lives in things that aren't written in the code, that live in the head of the person who's lived with the system. Why this spot does it this way. That quirk exists to humor a rare failure case. That constraint is there because some far-off system depends on it.

The agent can't read those things off the code. I'm the one who knows them. And I was too lazy to feed them into the spec. So the agent guessed, and it guessed wrong in a way that looked a lot like right.

This agent team doesn't generate understanding of an old system on its own. It only amplifies the understanding I feed in. Feed it fully and it multiplies that. Feed it short and it multiplies the shortfall, fast and tidy enough that I don't think to doubt it.

## Three things that keep the agent on track

Pulling together the nights that worked and the one that didn't, I'm left with three things. Miss one of the three and the agent starts to drift.

![Three things that keep the agent on track: clear spec, roles assigned, fixed process](/article-images/ai-agent-team/en/05-three-things.svg)

**One, a clear spec.** This is the thing I underrated and paid for. A spec sounds like paperwork, but it's where I pour the understanding the agent has no way to get on its own. A loose spec means every later step runs cleanly on a wrong foundation.

**Two, assigned roles.** The one who writes the code isn't the one who grades the code. Separating roles is what gives "done" its meaning, and what lets QA send a task back without ego. Part 1 covered this closely.

**Three, a fixed process.** Every task runs the full sequence, no exceptions. Write the process to a file so the next project carries it over without retraining. Part 2 was about this.

With all three, the agent runs nearly straight and I barely have to watch. Miss the spec and it guesses. Miss the roles and it grades its own work. Miss the process and it skips steps and calls things done too early. The night I botched it was the night I pulled out the first one myself.

## What's left after all of it

If you ask me what actually changed over these weeks, I won't point at a model or a prompt.

What changed is that I stopped seeing the agent as a machine I command and started seeing it as a team I have to organize. Same model, same tools. What I rearranged was the work around it: who builds, who guards, who grades, which step it goes through, what "done" means.

And the overnight automation trick, much as I love it, is just the top layer. It's only safe when the three things underneath are tight. Automation without verification only helps you make wrong things faster, exactly like the night I ported it wrong.

If you carry one line from this whole series, carry this: however strong the agent gets, it only runs straight when you build enough structure around it that every piece of work has someone to check it, and every "done" has evidence behind it.$body$, 'published', now() - interval '30 minutes', 7, $q$I took the agent team into the field, including the time I botched it$q$, $q$Three real runs with the agent team, including the one I botched, and the three things that keep it from drifting.$q$)
on conflict (locale, slug) do nothing;

insert into public.articles (locale, slug, title, excerpt, body_md, status, published_at, reading_time, meta_title, meta_description, translation_of)
values
  ('vi', $q$coi-coding-agent-la-mot-team$q$, $q$Tôi ngừng coi coding agent là một công cụ, và bắt đầu coi nó là một team$q$, $q$Tôi ngừng coi coding agent là công cụ và bắt đầu chạy nó như một team. Cách dựng orchestrator, và bốn vai khiến chữ 'xong' có nghĩa trở lại.$q$, $body$*Bài 1 trong 3. Series: dựng một team agent AI để làm phần mềm.*

Mấy tuần gần đây tôi làm việc với agent theo một kiểu khác hẳn trước.

Trước đó tôi dùng coding agent như đa số mọi người. Mở session, mô tả việc, nhận code, sửa tới lui cho tới khi chạy. Với một tiện ích nhỏ hay một script, cách này dư sức. Tôi nghĩ ra ý tưởng, gõ vài dòng yêu cầu, agent trả về, tôi đọc qua, gật, xong.

Rồi tôi thử đem đúng cách đó vào một dự án lớn hơn. Và nó gãy.

Không phải gãy kiểu agent viết code dở. Code phần lớn vẫn chạy. Nó gãy ở chỗ tôi mất kiểm soát. Quá nhiều thứ động cùng lúc, task ở các giai đoạn khác nhau, và tôi không còn cách nào biết cái agent vừa báo "xong" có thật sự xong hay không.

Đó là lúc tôi đổi cách nghĩ. Tôi ngừng coi session chính là nơi để viết code. Tôi coi nó là một orchestrator.

## Orchestrator nghĩa là gì

Session chính không tự tay làm nữa. Nó điều phối một team agent nhỏ, mỗi agent một vai. Nó nhận một việc thô từ tôi, tách thành task, giao cho đúng agent, theo dõi tiến độ, ép cả team đi đúng quy trình, và chỉ commit code sau khi có một bước nghiệm thu cuối.

Tôi nói rõ chỗ này vì nó dễ bị hiểu lầm thành một mẹo prompt. Thực ra nó là một cách tổ chức công việc, ở tầm đó.

Con AI vẫn y như cũ. Cùng một model, cùng một công cụ. Thứ tôi đổi là cách sắp xếp công việc quanh nó. Và đúng cái đó lại mở ra những dự án tôi không build nổi bằng cách cũ.

Lý do nằm ở một câu hỏi đơn giản: ai kiểm tra công việc?

Khi một session vừa viết code vừa tự phán code đúng, không có ai kiểm tra cả. Agent nói xong thì tôi chỉ có hai lựa chọn, tin nó hoặc tự mình đi soi từng dòng. Dự án nhỏ thì tôi soi được. Dự án lớn thì không. Và khi tôi không soi nổi, "xong" trở thành một từ vô nghĩa.

Tách vai ra giải đúng chỗ đó. Mỗi bước có một người gác cổng riêng. Người viết code không phải người quyết code đúng.

## Vì sao cách "một agent làm tất" vỡ trận

Tôi muốn nói kỹ hơn về chỗ gãy, vì hiểu nó thì mới thấy vì sao phải chia vai.

Với việc nhỏ, một agent ôm hết là hợp lý. Ít task, ít trạng thái, tôi giữ được cả bức tranh trong đầu. Tôi biết cái gì xong, cái gì chưa, chỗ nào đang sai. Agent có nhảy bước thì tôi cũng thấy ngay.

Dự án phức tạp phá vỡ điều đó theo hai hướng.

Hướng thứ nhất là khối lượng. Cái này đang code, cái kia chờ test, cái nọ chưa rõ yêu cầu, cái khác vừa rớt test phải làm lại. Một session đơn không giữ nổi từng đó trạng thái mạch lạc. Nó quên mất task nào đang ở đâu, hoặc làm xong một việc rồi tưởng cả nhóm việc đã xong.

Hướng thứ hai mới là hướng đau, và là lý do thật khiến tôi phải đổi cách: kiểm chứng.

Khi agent báo "xong rồi", tôi lấy gì để tin? Không có bước nào kiểm tra cái nó vừa làm có đúng kế hoạch không. Không có ai chạy lại để xác nhận từng tiêu chí. Tệ hơn, cùng một agent vừa viết code vừa tự quyết là code đúng. Đó là xung đột lợi ích trần trụi. Người làm bài tự chấm bài mình thì điểm nào cũng đẹp.

Tôi gặp đúng cảnh này nhiều lần. Agent tuyên bố hoàn thành một tính năng, tôi tin, hai ngày sau mở ra mới thấy nó làm lệch yêu cầu từ đầu. Không phải nó cố tình. Nó chỉ thiếu một người thứ hai soi lại.

Vậy nên tôi quyết định dựng một team. Mỗi agent một vai riêng, biên giới rõ ràng. Và session chính đứng làm orchestrator: tung agent ra, chia việc, ép quy trình, chỉ commit sau bước nghiệm thu cuối.

## Bốn vai trong team

Trong setup hiện tại, tôi chia việc cho bốn vai.

![Orchestrator điều phối bốn vai: PM, SWE, QA, On-Call](/article-images/ai-agent-team/01-bon-vai.svg)

**Product Manager.** Nhận một việc thô và biến nó thành thứ làm được. Spec với user story, tiêu chí nghiệm thu, kịch bản test. Đây là vai biến câu nói mơ hồ của tôi thành đề bài rõ ràng cho cả nhóm. Xong phần code và QA, PM còn quay lại một lần nữa, nhìn kết quả dưới góc người dùng và quyết việc đã thật sự xong chưa.

**Software Engineer.** Viết code, và viết test cho code đó. Vai này không tự quyết mình làm đúng. Nó chỉ làm, và đẩy kết quả qua bước sau.

**Tester.** Chạy đống test đó, soi từng tiêu chí nghiệm thu, báo đậu hay rớt kèm bằng chứng. Tôi nhấn mạnh chữ bằng chứng. QA không được nói khơi khơi "ổn rồi". Nó phải chỉ ra cái gì chạy, chạy thế nào, kết quả ra sao.

**On-Call Engineer.** Canh CI/CD sau khi code được đẩy lên, vá khi pipeline đỏ. Đây là vai dễ quên nhất, nhưng thiếu nó thì code "xong" trên máy vẫn có thể làm gãy build chung.

Mỗi vai gánh một khoanh trách nhiệm hẹp. Nghe có vẻ rườm rà, thậm chí chậm. Nhưng chính cái hẹp đó đổi chất lượng đầu ra.

## Vì sao khoanh hẹp lại ăn

Hai lý do.

Một, khoanh hẹp khiến việc bỏ bước khó hơn nhiều. Một agent ôm hết rất dễ nhảy cóc: viết code xong commit luôn, quên test, quên nghiệm thu, vì nó vội tới đích. Khi mỗi bước có một vai riêng đứng đó chờ, bỏ bước là lộ ra ngay. Task không thể nhảy từ SWE sang commit mà không đi qua QA, vì QA là một mắt xích vật lý trong chuỗi.

Hai, khoanh hẹp khiến truy lỗi dễ hơn. Khi có gì sai, tôi biết hỏi vai nào. Spec mơ hồ thì đó là PM. Test không bắt được lỗi thì đó là QA. Tôi không phải mò trong một mớ "agent đã làm gì đó suốt hai tiếng qua". Mỗi vai để lại dấu vết riêng, nên lần ngược về điểm hỏng nhanh hơn hẳn.

Nhưng cái lợi tôi quý nhất nằm ở chỗ này: vai viết code và vai chấm code là hai vai tách rời. Người làm tách hẳn khỏi người chấm. Nhờ vậy chữ "xong" mới lấy lại được nghĩa của nó, thay vì chỉ là lời agent tự khen mình.

Đây cũng là chỗ tôi nghĩ nhiều người làm với agent đang bỏ lỡ. Họ dồn sức tìm con model mạnh hơn, prompt khéo hơn. Nhưng chỗ kẹt của tôi luôn nằm chỗ khác: không có ai kiểm chứng. Mà kiểm chứng là chuyện tổ chức, giải bằng cách sắp xếp công việc quanh con agent.

## Điều này lặp lại được

Tôi để ý một điểm nữa, quan trọng với cách tôi làm việc: cấu trúc bốn vai này không dính vào một dự án cụ thể.

Khi đã định nghĩa xong từng vai, tôi bê nguyên bộ đó sang dự án mới. Đề bài đổi, ngôn ngữ đổi, ràng buộc kỹ thuật đổi, nhưng bốn vai và ranh giới giữa chúng thì giữ nguyên. Tôi không phải nghĩ lại từ đầu mỗi lần. Đó là kiểu đầu tư tôi thích: bỏ công một lần, dùng lại nhiều lần.

Bốn vai mới là một nửa câu chuyện. Nửa còn lại là cách một task chạy qua tay từng vai theo đúng thứ tự, cách chạy nhiều task song song mà không phải ngồi canh, và cách theo dõi tất cả. Đó là nội dung bài 2.

Nếu bạn chỉ mang đúng một ý từ bài này, mang ý này: sức mạnh đến từ cách bạn tổ chức quanh con agent, để mỗi việc đều có người kiểm chứng.$body$, 'published', now() - interval '10 minutes', 7, $q$Tôi ngừng coi coding agent là một công cụ, và bắt đầu coi nó là một team$q$, $q$Tôi ngừng coi coding agent là công cụ và bắt đầu chạy nó như một team. Cách dựng orchestrator, và bốn vai khiến chữ 'xong' có nghĩa trở lại.$q$, (select id from public.articles where locale='en' and slug=$q$coding-agent-as-a-team$q$))
on conflict (locale, slug) do nothing;

insert into public.articles (locale, slug, title, excerpt, body_md, status, published_at, reading_time, meta_title, meta_description, translation_of)
values
  ('vi', $q$quy-trinh-team-agent$q$, $q$Quy trình giữ cho một team agent không tự lừa chính nó$q$, $q$Một task đi qua PM, SWE, QA và bước nghiệm thu cuối thế nào, chạy nhiều task song song mà không phải ngồi canh, và tôi theo dõi tất cả bằng gì.$q$, $body$*Bài 2 trong 3. Series: dựng một team agent AI để làm phần mềm.*

Ở bài 1 tôi kể vì sao tôi coi session chính là orchestrator, và chia việc cho bốn vai: PM, SWE, QA, On-Call. Vai trò mới là khung xương. Bài này nói về phần làm cho khung đó sống: một task chạy qua team thế nào, làm sao chạy nhiều task cùng lúc mà không phải ngồi canh, và ghi trạng thái ở đâu.

## Đường đi của một task

Mọi task đi qua cùng một dãy bước. Tôi không cho ngoại lệ, kể cả với việc nhỏ, vì ngoại lệ là chỗ quy trình bắt đầu rạn.

![Pipeline: Backlog, PM, SWE, QA, PM nghiệm thu, Commit, kèm vòng lặp QA rớt quay lại SWE](/article-images/ai-agent-team/02-pipeline.svg)

Tôi nói với orchestrator để tạo task và đẩy vào backlog. PM nhặt lên, gọt thành spec rõ ràng. SWE code và viết test. QA chạy test, soi từng tiêu chí, rồi phán đậu hay rớt. Nếu rớt, task quay về SWE sửa. Nếu đậu, PM bước vào lần cuối để nghiệm thu. Chỉ sau khi PM gật, orchestrator mới commit code và đóng task.

Vòng lặp gọn lại trong đầu thế này: PM, SWE, QA, rồi về PM trước khi commit.

Cái loop "QA rớt thì quay lại SWE" nghe hiển nhiên, nhưng nó là chỗ tôi thấy giá trị thật của việc tách vai. Vì QA là một vai riêng, nó không ngại trả task về. Một agent ôm hết sẽ có xu hướng tự tặc lưỡi cho qua, vì rớt nghĩa là tự nhận mình làm sai. QA tách rời thì không có cái sĩ diện đó. Nó rớt là rớt, kèm bằng chứng.

## Vì sao bước PM nghiệm thu cuối là quan trọng nhất

Trong cả dãy bước, bước dễ bị bỏ nhất lại là bước tôi giữ chặt nhất: PM nghiệm thu lần cuối, sau khi QA đã đậu.

Nhiều người sẽ hỏi, QA đậu rồi thì còn duyệt gì nữa?

Vì qua hết test không có nghĩa là giải đúng bài.

Một tính năng có thể "xong" hoàn hảo dưới mắt kỹ thuật mà vẫn hỏng khi vào tay người dùng thật. Test xanh hết, nhưng luồng thao tác vô lý. Hoặc nó làm đúng cái đề bài viết ra, trong khi đề bài lại không khớp với cái người ta thật sự cần. Test chỉ kiểm được "code có làm đúng điều ta bảo nó làm không". Nó không kiểm được "điều ta bảo nó làm có đúng là điều cần làm không".

Bước PM cuối soi đúng khoảng cách đó. PM quay lại user story ban đầu và hỏi: kết quả này có thật sự phục vụ cái người dùng cần không? Đây là lớp bảo vệ cuối, và nó bắt được đúng loại lỗi mà không cái test nào bắt được.

## Viết quy trình ra file, đừng nhắc bằng miệng

Để cả team đi đúng dãy bước này một cách nhất quán, tôi không lặp lại nó mỗi phiên làm việc. Tôi viết nó ra file, ngay trong repo. Agent đọc và bám theo:

- Một thư mục chứa định nghĩa từng vai, mỗi vai một file.
- Một file `PROCESS.md` mô tả luồng phát triển từ đầu tới cuối.
- Một file `CLAUDE.md` chứa chỉ dẫn cấp dự án.
- Một skill để khởi động pipeline bằng một lệnh.

Viết quy trình ra file là điểm khiến cả cách làm này lặp lại được, đúng kiểu tôi thích. Lần sau mở dự án mới, tôi bê nguyên bộ này sang. Agent biết luôn nó là vai gì, đi qua bước nào, và "xong" nghĩa là gì. Tôi không phải dạy lại từ đầu.

Có một điểm tinh tế ở đây mà tôi sẽ quay lại ở bài 3: khi quy trình chỉ nằm trong file chữ, agent vẫn có thể lờ đi vài chỗ. File là chỉ dẫn, không phải hàng rào cứng. Nhưng ngay cả ở dạng file, viết ra vẫn tốt hơn nhiều so với nhắc miệng từng lần.

## Chạy song song và giữ vòng lặp không chết

Một task một lần thì phí thời gian. Tôi thường chạy hai task song song. Khi xong một đợt hai task, orchestrator kéo tiếp hai task nữa từ backlog. Cứ thế cuốn chiếu.

![Chạy song song hai task, xong đợt thì tự kéo đợt tiếp theo từ backlog](/article-images/ai-agent-team/03-song-song.svg)

Nghe đơn giản, nhưng có một chỗ kẹt mà ai chạy agent kiểu này cũng gặp: vòng lặp tự chết.

Xong một đợt, orchestrator dừng lại, hỏi "tiếp đi chứ?" rồi ngồi chờ tôi gõ. Nửa đêm tôi ngủ thì nó đứng yên tới sáng. Cả đêm trôi qua mà backlog vẫn còn nguyên một nửa. Đây là một trong những thứ làm tôi bực nhất khi mới làm.

Cách tôi vá nó nhỏ mà hiệu quả: cài một chỉ dẫn lặp ngay trong task list.

Chỉ dẫn đó nói orchestrator làm hai việc. Một, kéo đợt task tiếp theo. Hai, tự thêm lại đúng chỉ dẫn này vào cuối danh sách. Thế là sau mỗi đợt, nó tự nhắc mình kéo đợt sau, rồi lại tự nhắc tiếp. Vòng lặp chạy tới khi backlog cạn, thay vì khựng lại sau mỗi đợt chờ tôi đẩy.

Cái mẹo này biến cả đêm thành thời gian làm việc thật. Tôi đi ngủ với backlog đầy, sáng dậy phần lớn đã được gọt, code, test, nghiệm thu xong.

Nhưng tôi muốn nói thẳng một điều kiện đi kèm, vì nó dễ bị bỏ qua trong cơn phấn khích "để agent chạy qua đêm". Vòng lặp tự chạy chỉ an toàn khi quy trình ở trên đã chặt. Nếu bạn cho agent tự cuốn chiếu mà không có ai gác từng bước, nó sẽ cuốn luôn cả lỗi đi thật xa, và sáng ra bạn dọn còn mệt hơn. Tự động và kiểm chứng phải đi cùng nhau. Tự động mà thiếu kiểm chứng chỉ là tạo rác nhanh hơn.

## Theo dõi task: GitHub Issues hay file

Vòng lặp tự chạy chỉ có ích khi tôi nhìn được nó đang làm gì. Tôi dùng một trong hai cách ghi trạng thái.

Cách thứ nhất là **GitHub Issues**. Hợp khi tôi muốn phối hợp công khai và muốn báo cáo của từng agent dính kèm vào từng task. Mỗi issue thành một hồ sơ đầy đủ: PM ghi yêu cầu, tiêu chí nghiệm thu, kịch bản test; SWE báo đã code xong; QA xác nhận kèm ảnh chụp kết quả. Mở một issue ra là đọc được cả lịch sử việc đó đi qua những tay nào, ai làm gì, vì sao đậu hay rớt.

Cách thứ hai là **tracker bằng file**. Nhẹ hơn nhiều. Trạng thái nằm luôn trong tên file.

![Trạng thái task qua tên file: .todo.md sang .groomed.md sang .in-progress.md sang done/](/article-images/ai-agent-team/04-trang-thai-file.svg)

Một task đi từ `.todo.md` sang `.groomed.md` sang `.in-progress.md`, rồi cuối cùng vào thư mục `done/`. Không cần dịch vụ ngoài, không cần mạng, chỉ là file trong repo. Nhìn tên file là biết task đang ở đâu trong vòng lặp.

Tôi chọn cách nào tùy mức công khai tôi cần. Dự án nhiều người nhìn vào thì GitHub Issues. Dự án tôi làm một mình, hoặc chưa chắc sống lâu, thì file cho nhanh gọn.

Nhưng đây là điểm quan trọng hơn cả hai lựa chọn: cái tracker chỉ là chỗ ghi trạng thái.

Cùng một vòng lặp PM, SWE, QA, về PM chạy y hệt dù tôi ghi trạng thái ở đâu. Công cụ theo dõi là cái sổ, còn cái tạo ra chất lượng là quy trình quanh nó, là việc tách vai và bắt mọi task đi đủ bước. Đổi tracker không đổi kết quả. Bỏ quy trình thì tracker xịn tới đâu cũng vô dụng.

Tới đây tôi đã kể xong cách làm: vai trò ở bài 1, quy trình ở bài 2. Bài 3 tôi đem nó ra thực chiến, qua các loại dự án khác nhau, kể cả một dự án tôi làm hỏng, rồi rút ra cái gì còn lại sau tất cả.$body$, 'published', now() - interval '20 minutes', 7, $q$Quy trình giữ cho một team agent không tự lừa chính nó$q$, $q$Một task đi qua PM, SWE, QA và bước nghiệm thu cuối thế nào, chạy nhiều task song song mà không phải ngồi canh, và tôi theo dõi tất cả bằng gì.$q$, (select id from public.articles where locale='en' and slug=$q$agent-team-process$q$))
on conflict (locale, slug) do nothing;

insert into public.articles (locale, slug, title, excerpt, body_md, status, published_at, reading_time, meta_title, meta_description, translation_of)
values
  ('vi', $q$team-agent-thuc-chien$q$, $q$Tôi đem team agent ra thực chiến, kể cả lần làm hỏng$q$, $q$Ba lần chạy thật với team agent, kể cả lần tôi làm hỏng, và ba thứ giữ nó khỏi đi lệch.$q$, $body$*Bài 3 trong 3. Series: dựng một team agent AI để làm phần mềm.*

Hai bài trước là lý thuyết và quy trình. Bài 1 nói vì sao tôi tách session chính thành orchestrator điều phối bốn vai. Bài 2 nói một task chạy qua team thế nào và làm sao cho vòng lặp không chết giữa đêm. Bài này tôi đem cả bộ đó ra chạy thật, qua mấy loại dự án khác nhau, rồi kể luôn lần tôi làm hỏng.

Tôi cố tình không tô hồng. Cách làm này ăn ở một số loại việc và vấp ở loại khác. Biết nó vấp chỗ nào còn quan trọng hơn biết nó ăn chỗ nào.

## Dự án dựng mới: chỗ team agent tỏa sáng nhất

Loại việc hợp nhất với cách này là dự án dựng từ con số không.

Khi chưa có code cũ, không có ràng buộc gì phải tôn trọng, agent được tự do nhất. Tôi mô tả thứ mình muốn, orchestrator xé thành một xấp task, đẩy vào backlog, rồi để team cuốn chiếu qua đêm như bài 2 đã kể.

Sáng dậy, phần lớn backlog đã đi hết vòng: PM gọt, SWE code, QA soi, PM nghiệm thu. Tôi không ngồi canh giờ nào. Tôi chỉ mở ra đọc kết quả của từng task, và vì mỗi task có hồ sơ riêng kèm bằng chứng QA, tôi biết ngay cái nào tin được, cái nào cần nhìn kỹ.

Đây là chỗ cái loop tự chạy trả công rõ nhất. Một dự án mới có nhiều task độc lập, ít phụ thuộc chéo, nên hai task chạy song song hiếm khi đạp chân nhau. Backlog càng nhiều việc rời rạc, cách này càng lợi.

Tôi vẫn phải nói thẳng một điều, để khỏi ai đọc xong tưởng đây là máy in code miễn phí. Chất lượng đầu ra vẫn bằng đúng chất lượng cái spec PM viết ra ở đầu. Đề bài lỏng thì cả đêm agent chạy chỉ ra một đống thứ chạy được nhưng lệch ý. Tôi mất kha khá lần để học rằng công sức bỏ vào khâu PM ở đầu được hoàn lại gấp nhiều lần ở khâu QA và nghiệm thu cuối.

## Dự án nhỏ, gọn, một mục đích

Loại thứ hai hợp không kém: mấy việc nhỏ, phạm vi rõ, một mục đích.

Một cái tracker chạy serverless. Một thư viện tiện ích. Một bộ script benchmark đo hiệu năng. Những việc kiểu này có biên giới sắc, dễ mô tả thành tiêu chí nghiệm thu mà QA kiểm được tới nơi tới chốn.

Với loại này tôi thường không cần chạy song song nhiều luồng. Backlog ngắn, tôi cho chạy tuần tự cũng xong nhanh. Cái tôi được nhiều nhất ở đây là sự yên tâm: vì có QA tách rời và bước PM cuối, tôi không phải tự đọc lại từng dòng để tin rằng nó đúng.

Điểm chung của hai loại trên là gì? Cả hai đều cho agent một không gian sạch để làm. Ít di sản, ít ràng buộc ngầm, đề bài gói gọn được.

## Và đây là lần tôi làm hỏng

Giờ tới phần ít người kể.

Tôi đem đúng bộ này vào một việc khác hẳn: viết lại một phần hệ thống đã có, port nó sang một cách dựng khác. Là sửa trên nền cũ, với cả đống hành vi ngầm mà code hiện tại đang gánh.

Tôi làm hỏng. Và tôi làm hỏng đúng ở chỗ tôi tưởng mình đã hiểu rồi.

Tôi nóng vội bỏ qua khâu PM. Tôi nghĩ "việc này tôi nắm rõ rồi, cần gì viết spec dài dòng", nên tôi mô tả qua loa rồi thả cho team chạy. Backlog đầy, loop tự cuốn, hai task song song, y như mấy đêm trước.

Sáng ra tôi nhận một mớ code chạy được, test xanh hết, QA báo đậu. Nhìn mọi chỉ báo đều đẹp. Nhưng nó port sai cái cần port. Nó giữ lại mấy hành vi lẽ ra phải bỏ, và bỏ mất mấy hành vi lẽ ra phải giữ, vì chính tôi chưa bao giờ viết rõ ràng cái nào là cái nào.

Test không cứu được tôi, vì test chỉ kiểm "code có làm đúng điều ta bảo không". Tôi bảo sai từ đầu. QA cũng không cứu được, vì QA soi theo tiêu chí, mà tiêu chí lại sinh ra từ cái spec lỏng của tôi. Cả dây chuyền chạy hoàn hảo trên một đề bài hỏng.

Bài học đắt nhưng gọn: việc càng dính nhiều di sản và ràng buộc ngầm, khâu PM càng không được phép cắt. Đúng cái khâu tôi tưởng thừa lại là khâu giữ cho cả việc khỏi trật bánh. Tôi tự tay bỏ lớp bảo vệ rồi trách cái máy.

## Vì sao nó vấp ở loại việc này

Ngẫm lại, lý do khá rõ.

Dự án dựng mới cho agent một tờ giấy trắng. Việc viết lại trên nền cũ thì ngược hẳn: phần khó nhất nằm ở những thứ không viết trong code, mà nằm trong đầu người đã sống với hệ thống đó. Vì sao chỗ này làm thế này. Cái quirk kia tồn tại để chiều một ca lỗi hiếm. Cái ràng buộc nọ là do một hệ thống khác ở xa đang phụ thuộc vào.

Agent không đọc được mấy thứ đó từ code. Tôi mới là người biết. Mà tôi lại lười không truyền nó vào spec. Nên agent đoán, và đoán sai theo cái cách trông rất giống đúng.

Cách team agent này không tự sinh ra hiểu biết về một hệ thống cũ. Nó chỉ khuếch đại cái hiểu biết tôi nạp vào. Nạp đầy đủ thì nó nhân lên. Nạp thiếu thì nó nhân cái thiếu lên, nhanh và gọn gàng tới mức tôi không kịp nghi ngờ.

## Ba thứ giữ cho agent đi thẳng

Gom hết mấy đêm chạy được lẫn lần chạy hỏng, tôi rút lại còn ba thứ. Thiếu một trong ba là agent bắt đầu trôi.

![Ba thứ giữ agent đi thẳng: spec viết rõ, vai được phân, quy trình cố định](/article-images/ai-agent-team/05-ba-thu.svg)

**Một, spec viết rõ.** Đây là thứ tôi xem nhẹ và phải trả giá. Spec nghe như thủ tục giấy tờ, nhưng nó là nơi tôi rót cái hiểu biết mà agent không có cách nào tự lấy được. Spec lỏng thì mọi khâu sau đều chạy chuẩn trên một nền sai.

**Hai, vai được phân.** Người viết code không phải người chấm code. Nhờ tách vai mà chữ "xong" có nghĩa, và QA dám trả task về mà không sĩ diện. Bài 1 tôi đã nói kỹ chỗ này.

**Ba, quy trình cố định.** Mọi task đi đủ dãy bước, không ngoại lệ. Viết quy trình ra file để lần sau bê sang dự án mới mà không phải dạy lại. Bài 2 là chỗ này.

Đủ cả ba, agent đi gần như thẳng, tôi ít phải trông. Thiếu spec, nó đoán mò. Thiếu vai, nó tự chấm điểm mình. Thiếu quy trình, nó nhảy cóc và tuyên bố xong quá sớm. Lần tôi làm hỏng là lần tôi tự rút mất cái thứ nhất.

## Cái còn lại sau tất cả

Nếu bạn hỏi tôi cái gì thật sự đổi sau mấy tuần này, tôi sẽ không chỉ vào con model hay cái prompt nào.

Cái đổi là tôi ngừng coi agent là một cái máy tôi ra lệnh, và bắt đầu coi nó là một team tôi phải tổ chức. Cùng một model, cùng mấy công cụ. Thứ tôi xếp lại là công việc quanh nó: ai làm, ai gác, ai chấm, đi qua bước nào, "xong" nghĩa là gì.

Và cái mẹo tự động chạy qua đêm, dù tôi rất thích, chỉ là lớp trên cùng. Nó chỉ an toàn khi ba thứ ở dưới đã chặt. Tự động hóa mà không có kiểm chứng chỉ giúp bạn tạo ra đống sai nhanh hơn, đúng như đêm tôi port hỏng.

Nếu bạn mang đúng một câu từ cả series này, mang câu này: con agent mạnh tới đâu cũng chỉ đi thẳng được khi bạn dựng đủ khung quanh nó để mỗi việc đều có người kiểm, và mỗi cái "xong" đều có bằng chứng đứng sau.$body$, 'published', now() - interval '30 minutes', 7, $q$Tôi đem team agent ra thực chiến, kể cả lần làm hỏng$q$, $q$Ba lần chạy thật với team agent, kể cả lần tôi làm hỏng, và ba thứ giữ nó khỏi đi lệch.$q$, (select id from public.articles where locale='en' and slug=$q$agent-team-in-the-field$q$))
on conflict (locale, slug) do nothing;

-- Backfill EN.translation_of -> VI counterpart
update public.articles e
set translation_of = v.id
from public.articles v
where e.locale='en' and e.slug=$q$coding-agent-as-a-team$q$
  and v.locale='vi' and v.slug=$q$coi-coding-agent-la-mot-team$q$
  and e.translation_of is null;
update public.articles e
set translation_of = v.id
from public.articles v
where e.locale='en' and e.slug=$q$agent-team-process$q$
  and v.locale='vi' and v.slug=$q$quy-trinh-team-agent$q$
  and e.translation_of is null;
update public.articles e
set translation_of = v.id
from public.articles v
where e.locale='en' and e.slug=$q$agent-team-in-the-field$q$
  and v.locale='vi' and v.slug=$q$team-agent-thuc-chien$q$
  and e.translation_of is null;

-- Attach all six to the AI SOPs category
insert into public.article_categories (article_id, category_id)
select a.id, c.id
from public.articles a
join public.categories c on c.slug = 'ai-sops'
where a.slug in ($q$coding-agent-as-a-team$q$, $q$agent-team-process$q$, $q$agent-team-in-the-field$q$, $q$coi-coding-agent-la-mot-team$q$, $q$quy-trinh-team-agent$q$, $q$team-agent-thuc-chien$q$)
on conflict do nothing;
