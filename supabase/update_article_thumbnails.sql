-- Update article thumbnails (og_image_url) + excerpts for the article list.
-- Thumbnails use the site's own OG image route (variant=thumb, 4:3) so every
-- article has a clean, consistent, legible small thumbnail.
-- Both the public article cards and the admin editor read these same columns,
-- so this keeps the main page and admin in sync.
-- Safe to re-run (idempotent). Keyed by (locale, slug).

begin;

-- [en] weekly-sop-ai-code-review
update public.articles set
  og_image_url = 'https://www.ethanbui.net/api/og?title=A+weekly+SOP+for+AI-assisted+code+review&eyebrow=AI+SOPs&variant=thumb',
  excerpt = 'Six weeks of a weekly AI code-review SOP on a small team — what changed, prompts included.'
where locale = 'en' and slug = 'weekly-sop-ai-code-review';

-- [vi] sop-hang-tuan-cho-code-review-co-ai
update public.articles set
  og_image_url = 'https://www.ethanbui.net/api/og?title=SOP+h%E1%BA%B1ng+tu%E1%BA%A7n+cho+code+review+c%C3%B3+AI&eyebrow=AI+SOPs&variant=thumb',
  excerpt = 'Sáu tuần chạy SOP review code có AI trên team nhỏ — đổi được gì, kèm prompt.'
where locale = 'vi' and slug = 'sop-hang-tuan-cho-code-review-co-ai';

-- [en] coding-agent-as-a-team
update public.articles set
  og_image_url = 'https://www.ethanbui.net/api/og?title=I+stopped+treating+my+coding+agent+like+a+team&eyebrow=AI+agent+team+%C2%B7+Part+1&variant=thumb',
  excerpt = 'Why I stopped using my coding agent like a tool and started running it like a team.'
where locale = 'en' and slug = 'coding-agent-as-a-team';

-- [vi] coi-coding-agent-la-mot-team
update public.articles set
  og_image_url = 'https://www.ethanbui.net/api/og?title=Coi+coding+agent+l%C3%A0+m%E1%BB%99t+team&eyebrow=Team+agent+AI+%C2%B7+Ph%E1%BA%A7n+1&variant=thumb',
  excerpt = 'Vì sao tôi ngừng coi coding agent là công cụ và bắt đầu chạy nó như một team.'
where locale = 'vi' and slug = 'coi-coding-agent-la-mot-team';

-- [en] agent-team-process
update public.articles set
  og_image_url = 'https://www.ethanbui.net/api/og?title=The+process+that+keeps+an+agent+team+from+fooling+itself&eyebrow=AI+agent+team+%C2%B7+Part+2&variant=thumb',
  excerpt = 'How one task moves through PM, SWE and QA — and how I run several in parallel without babysitting.'
where locale = 'en' and slug = 'agent-team-process';

-- [vi] quy-trinh-team-agent
update public.articles set
  og_image_url = 'https://www.ethanbui.net/api/og?title=Quy+tr%C3%ACnh+gi%E1%BB%AF+team+agent+kh%C3%B4ng+t%E1%BB%B1+l%E1%BB%ABa+ch%C3%ADnh+n%C3%B3&eyebrow=Team+agent+AI+%C2%B7+Ph%E1%BA%A7n+2&variant=thumb',
  excerpt = 'Một task đi qua PM, SWE, QA ra sao, và cách chạy nhiều task song song mà không phải ngồi canh.'
where locale = 'vi' and slug = 'quy-trinh-team-agent';

-- [en] agent-team-in-the-field
update public.articles set
  og_image_url = 'https://www.ethanbui.net/api/og?title=I+took+the+agent+team+into+the+field&eyebrow=AI+agent+team+%C2%B7+Part+3&variant=thumb',
  excerpt = 'Three real runs with the agent team, including the one I botched — and what keeps it from drifting.'
where locale = 'en' and slug = 'agent-team-in-the-field';

-- [vi] team-agent-thuc-chien
update public.articles set
  og_image_url = 'https://www.ethanbui.net/api/og?title=%C4%90em+team+agent+ra+th%E1%BB%B1c+chi%E1%BA%BFn&eyebrow=Team+agent+AI+%C2%B7+Ph%E1%BA%A7n+3&variant=thumb',
  excerpt = 'Ba lần chạy thật với team agent, kể cả lần làm hỏng, và thứ giữ nó khỏi đi lệch.'
where locale = 'vi' and slug = 'team-agent-thuc-chien';

-- [en] ai-automation-hidden-costs -- NOTE: this article previously had a custom cover.png. Remove the og_image_url line below to keep the custom cover.
update public.articles set
  og_image_url = 'https://www.ethanbui.net/api/og?title=The+real+bill+for+letting+AI+run+your+whole+workflow&eyebrow=AI+automation&variant=thumb',
  excerpt = 'The five costs vendors leave off the invoice when you let AI run your whole workflow.'
where locale = 'en' and slug = 'ai-automation-hidden-costs';

-- [vi] ai-automation-hidden-costs -- NOTE: this article previously had a custom cover.png. Remove the og_image_url line below to keep the custom cover.
update public.articles set
  og_image_url = 'https://www.ethanbui.net/api/og?title=C%C3%A1i+gi%C3%A1+th%E1%BA%ADt+khi+%C4%91%E1%BB%83+AI+ch%E1%BA%A1y+tr%E1%BB%8Dn+workflow&eyebrow=AI+automation&variant=thumb',
  excerpt = 'Năm khoản chi phí nhà cung cấp không ghi vào hóa đơn khi để AI chạy trọn workflow.'
where locale = 'vi' and slug = 'ai-automation-hidden-costs';

-- [en] forward-deployed-engineer-self-assessment -- NOTE: this article previously had a custom cover.png. Remove the og_image_url line below to keep the custom cover.
update public.articles set
  og_image_url = 'https://www.ethanbui.net/api/og?title=The+Forward+Deployed+Engineer%3A+a+self-assessment&eyebrow=Forward+Deployed+Engineering&variant=thumb',
  excerpt = 'Score yourself on the 8 skills of the AI era''s most valuable engineer, then fix the first gap.'
where locale = 'en' and slug = 'forward-deployed-engineer-self-assessment';

-- [vi] forward-deployed-engineer-self-assessment -- NOTE: this article previously had a custom cover.png. Remove the og_image_url line below to keep the custom cover.
update public.articles set
  og_image_url = 'https://www.ethanbui.net/api/og?title=Forward+Deployed+Engineer%3A+b%C3%A0i+t%E1%BB%B1+ch%E1%BA%A5m+%C4%91i%E1%BB%83m&eyebrow=Forward+Deployed+Engineering&variant=thumb',
  excerpt = 'Tự chấm 8 kỹ năng của kỹ sư giá trị nhất thời AI, rồi lấp lỗ hổng đầu tiên.'
where locale = 'vi' and slug = 'forward-deployed-engineer-self-assessment';

commit;
