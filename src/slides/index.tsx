import type { ReactNode } from "react";
import { ContentLayout, CoverLayout, SectionLayout } from "./layouts";
import { Arrow, Bubble, Card, CodeBlock, FlowStep, Tag } from "./parts";

export type Slide = {
  title: string;
  content: ReactNode;
};

const EVAL_CASES: [string, string, "LLM" | "FAQ"][] = [
  ["回答 bot 的選項", "其他商品", "LLM"],
  ["省略主詞", "那繳費方式呢？", "LLM"],
  ["指涉 FAQ 卡片", "第二個", "LLM"],
  ["要求動作", "我要找真人客服", "LLM"],
  ["一次問多件事", "繳費方式跟理賠流程是什麼", "LLM"],
  ["沒指定商品的泛問", "有哪些繳費方式", "LLM"],
  ["FAQ 沒涵蓋", "你們公司在哪裡", "LLM"],
  ["完整問題、FAQ 有涵蓋", "受益人要怎麼改", "FAQ"],
];

const AGENDA: [string, string][] = [
  ["JEV 是什麼", "和一般 LLM 的差別、三種題型"],
  ["範例", "怎麼呼叫、每種題型的輸入與輸出、多題一起問"],
  ["JEV 在 Text Agent 的實作", "eb-agent-service：FAQ 分流判官、判斷使用者語言"],
];

// 投影片以 1920×1080 的固定尺寸撰寫，由 SlideFrame 等比縮放到容器大小
export const slides: Slide[] = [
  {
    title: "封面",
    content: <CoverLayout title="JEV 介紹" meta="aiello · 2026.10" />,
  },
  {
    title: "Agenda",
    content: (
      <ContentLayout eyebrow="Agenda" title="今天會講的內容">
        <ol className="flex flex-col">
          {AGENDA.map(([title, desc], i) => (
            <li key={title} className="flex items-baseline gap-12 border-b-2 border-navy/10 py-8 last:border-b-0">
              <span className="w-[96px] shrink-0 font-mono text-[56px] font-bold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2">
                <span className="text-[52px] font-bold leading-tight">{title}</span>
                <span className="text-[32px] text-navy/60">{desc}</span>
              </div>
            </li>
          ))}
        </ol>
      </ContentLayout>
    ),
  },

  // 01 JEV 是什麼
  {
    title: "章節：JEV 是什麼",
    content: <SectionLayout number="01" title="JEV 是什麼" />,
  },
  {
    title: "JEV 與一般 LLM 的差別",
    content: (
      <ContentLayout eyebrow="What is JEV" title="不生成文字，只回傳機率">
        <div className="flex h-full flex-col gap-8">
          <div className="text-[36px] text-navy/70">
            同一個問題：「使用者是不是想找真人客服？」
          </div>
          <div className="grid flex-1 grid-cols-2 gap-10">
            <Card label="一般 LLM" title="回一段話">
              <p className="rounded-xl bg-white px-6 py-4 text-[32px] text-navy">
                「看起來使用者應該是想找真人…」
              </p>
              <p className="mt-6">適合：寫回覆、摘要、對話</p>
            </Card>
            <Card accent label="JEV" title="回一個機率">
              <p className="rounded-xl bg-white/10 px-6 py-4 font-mono text-[32px] text-white">是：0.97</p>
              <p className="mt-6">適合：分流、分類、評分</p>
            </Card>
          </div>
        </div>
      </ContentLayout>
    ),
  },
  {
    title: "三種題型",
    content: (
      <ContentLayout eyebrow="What is JEV" title="三種題型">
        <div className="grid h-full grid-cols-3 gap-8">
          <Card label="noul" title="是非題">
            <p>回傳「是」或「成立」的機率（0–1）。</p>
            <p className="mt-4 font-mono text-[26px] text-brand">{`{ "noul": 0.83 }`}</p>
            <p className="mt-4">例：這句話要不要交給 LLM？</p>
          </Card>
          <Card label="choice" title="選擇題">
            <p>每個選項的機率、最高的那一個，以及 confidence。最多 255 個選項。</p>
            <p className="mt-4 font-mono text-[26px] text-brand">{`{ "choice": "zh-TW" }`}</p>
            <p className="mt-4">例：使用者用哪個語言？</p>
          </Card>
          <Card label="score" title="評分題">
            <p>依 1–10 級的評分標準，回傳以機率加權的期望分數。</p>
            <p className="mt-4 font-mono text-[26px] text-brand">{`{ "score": 2.4 }`}</p>
            <p className="mt-4">例：這則客訴有多緊急？</p>
          </Card>
        </div>
      </ContentLayout>
    ),
  },
  {
    title: "為什麼適合做判斷",
    content: (
      <ContentLayout eyebrow="What is JEV" title="為什麼拿來做分流判斷">
        <div className="flex h-full flex-col justify-between">
          <div className="grid grid-cols-2 gap-x-16 gap-y-12">
            <Point n="1" title="門檻自己定">
              拿到的是機率，要保守還是積極，改一個數字就好，不用改 prompt 重測。
            </Point>
            <Point n="2" title="知道它沒把握">
              choice、score 有 confidence，信心低的結果可以退回原本流程或交給人。
            </Point>
            <Point n="3" title="多題一起問">
              官方範例：13 題一次問 0.27 秒，分 13 次問合計 2.71 秒。
            </Point>
            <Point n="4" title="夠快">
              官方數字：端到端 70–500ms（在美國西岸量測）。從台灣呼叫會再多網路延遲，記得設 timeout。
            </Point>
          </div>
          <p className="text-[24px] text-navy/50">
            來源：TypeSafe 官方部落格〈Introducing System One Models &amp; Jev〉；docs.typesafe.ai〈Parallel questions〉
          </p>
        </div>
      </ContentLayout>
    ),
  },

  // 02 範例
  {
    title: "章節：範例",
    content: <SectionLayout number="02" title="範例" />,
  },
  {
    title: "範例：怎麼呼叫",
    content: (
      <ContentLayout eyebrow="Example" title="呼叫一次 JEV">
        <div className="grid h-full grid-cols-[1.35fr_1fr] gap-12">
          <CodeBlock
            small
            title="TypeScript"
            code={`const res = await fetch("https://api.typesafe.ai/v1/systemone", {
  method: "POST",
  headers: {
    Authorization: "Bearer " + process.env.TYPESAFE_API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ model: "jev-1.13.0", state, questions }),
  // 一定要設 timeout，失敗時退回原本的做法
  signal: AbortSignal.timeout(1500),
});

const { answers } = await res.json();
answers.is_complaint.noul; // 0.94`}
          />
          <ol className="flex flex-col justify-center gap-8 text-[32px] leading-snug">
            <Criterion n="1">
              <code className="font-mono text-brand">state</code>：要判斷的內容
            </Criterion>
            <Criterion n="2">
              <code className="font-mono text-brand">questions</code>：要問的題目，名稱自己取
            </Criterion>
            <Criterion n="3">
              <code className="font-mono text-brand">answers</code>：用同樣的名稱拿結果
            </Criterion>
            <li className="text-[28px] text-navy/60">接下來四頁，看每種題型實際送什麼、拿回什麼，以及怎麼一次問多題。</li>
          </ol>
        </div>
      </ContentLayout>
    ),
  },
  {
    title: "範例：noul 是非題",
    content: (
      <IOExample
        type="noul"
        title="客人是不是在抱怨？"
        input={`"state": {
  "message": "等了 30 分鐘都沒人回，到底有沒有人在？"
},
"questions": {
  "is_complaint": {
    "type": "noul",
    "instructions": "Is the guest complaining?"
  }
}`}
        output={`"answers": {
  "is_complaint": {
    "type": "noul",
    "noul": 0.94
  }
}`}
        note="越接近 1 越像在抱怨。門檻自己定，例如 ≥ 0.7 就轉真人。"
      />
    ),
  },
  {
    title: "範例：choice 選擇題",
    content: (
      <IOExample
        type="choice"
        title="客人想做什麼？"
        input={`"state": {
  "message": "明天的房間可以改成住兩晚嗎？"
},
"questions": {
  "intent": {
    "type": "choice",
    "instructions": "What does the guest want?",
    "criteria": {
      "change_booking": "Change a booking",
      "cancel": "Cancel a booking",
      "facility": "Ask about hotel facilities",
      "other": "Anything else"
    }
  }
}`}
        output={`"answers": {
  "intent": {
    "type": "choice",
    "choice": "change_booking",
    "confidence": 0.9,
    "probabilities": {
      "change_booking": 0.93, "cancel": 0.04,
      "facility": 0.01, "other": 0.02
    }
  }
}`}
        note="choice 是機率最高的選項，probabilities 是各選項的機率。"
      />
    ),
  },
  {
    title: "範例：score 評分題",
    content: (
      <IOExample
        type="score"
        title="這件事有多急？"
        input={`"state": {
  "message": "浴室的水管在漏水，地板都濕了"
},
"questions": {
  "urgency": {
    "type": "score",
    "instructions": "How urgent is this request?",
    "criteria": [
      "Not urgent", "Normal",
      "Somewhat urgent", "Very urgent"
    ]
  }
}`}
        output={`"answers": {
  "urgency": {
    "type": "score",
    "score": 2.6,
    "confidence": 0.7,
    "probabilities": {
      "0": 0.01, "1": 0.06, "2": 0.25, "3": 0.68
    }
  }
}`}
        note={
          <>
            4 個等級 → 分數 0–3，範圍由 criteria 的數量決定。
            <br />
            score 是加權平均：1×0.06 + 2×0.25 + 3×0.68 ≈ 2.6。
          </>
        }
      />
    ),
  },
  {
    title: "範例：多題一起問",
    content: (
      <IOExample
        type="多題一起問"
        title="一次問三題"
        input={`"state": {
  "message": "等了 30 分鐘都沒人回，我要取消明天的訂房！"
},
"questions": {
  // 題目內容同前三頁，這裡省略
  "is_complaint": { "type": "noul", … },
  "intent": { "type": "choice", … },
  "urgency": { "type": "score", … }
}`}
        output={`"answers": {
  "is_complaint": { "type": "noul", "noul": 0.96 },
  "intent": { "type": "choice", "choice": "cancel", … },
  "urgency": { "type": "score", "score": 1.8, … }
}`}
        note="同一個 state、三種題型，一次送出、一次拿回。官方範例：13 題一次問 0.27 秒，分 13 次問合計 2.71 秒。"
      />
    ),
  },

  // 03 JEV 在 Text Agent 的實作
  {
    title: "章節：JEV 在 Text Agent 的實作",
    content: <SectionLayout number="03" title="JEV 在 Text Agent 的實作" subtitle="eb-agent-service" />,
  },
  {
    title: "實作 1：問題",
    content: (
      <ContentLayout eyebrow="Text Agent · FAQ 分流判官" title="字面比對看不懂前文">
        <div className="grid h-full grid-cols-[1.1fr_1fr] gap-14">
          <div className="flex flex-col justify-center gap-6 rounded-2xl border-2 border-navy/10 p-10">
            <Bubble from="user">我現在 50 歲可以買吉利發發嗎？</Bubble>
            <Bubble from="bot">
              {"吉利發發的投保年齡約為 15 歲至 80 歲。\n請問您還想了解〈繳費方式〉、〈費用特色〉或〈其他商品〉嗎？"}
            </Bubble>
            <Bubble from="user">其他商品</Bubble>
          </div>
          <div className="flex flex-col justify-center gap-10 text-[34px] leading-normal">
            <div>
              <Tag tone="navy">只做字面比對</Tag>
              <p className="mt-4">只拿「其他商品」四個字去比 FAQ，不知道使用者是在回答 bot 的選項。</p>
            </div>
            <div>
              <Tag>加上 JEV 判官</Tag>
              <p className="mt-4">
                看出這句要靠前文才懂，改交給<b>看得到對話歷史</b>的 LLM 來回答。
              </p>
            </div>
          </div>
        </div>
      </ContentLayout>
    ),
  },
  {
    title: "實作 1：放在流程哪裡",
    content: (
      <ContentLayout eyebrow="Text Agent · FAQ 分流判官" title="JEV 插在完全相符之後">
        <div className="flex h-full flex-col justify-center gap-14">
          <div className="flex items-center gap-4">
            <FlowStep n={1} title="問候語" />
            <Arrow />
            <FlowStep n={2} title="完全相符" />
            <Arrow />
            <FlowStep n={3} title="JEV 判官" active />
            <Arrow />
            <FlowStep n={4} title="子字串比對" />
            <Arrow />
            <FlowStep n={5} title="模糊比對" />
          </div>
          <div className="grid grid-cols-2 gap-10 text-[32px] leading-normal">
            <div className="rounded-2xl bg-brand-light p-8">
              <b className="text-brand">route_to_llm ≥ 0.3</b>
              <p className="mt-2">跳過後面的字面比對，直接交給 LLM（有 RAG 與對話歷史）。</p>
            </div>
            <div className="rounded-2xl bg-zinc-100 p-8">
              <b>&lt; 0.3、失敗或超過 3 秒</b>
              <p className="mt-2">照舊做子字串與模糊比對，等於導入 JEV 之前的行為。</p>
            </div>
          </div>
          <p className="text-[28px] text-navy/60">每個 org 可以用 is_jev_on 個別開關；沒開就完全不呼叫 JEV。</p>
        </div>
      </ContentLayout>
    ),
  },
  {
    title: "實作 1：送給 JEV 的內容",
    content: (
      <ContentLayout eyebrow="Text Agent · FAQ 分流判官" title="送什麼、問什麼">
        <div className="grid h-full grid-cols-[1fr_1.1fr] gap-10">
          <CodeBlock
            title="state"
            code={`{
  // 最近 6 則對話
  "recent_conversation": [
    { "role": "user", "text": "我現在50歲可以…" },
    { "role": "bot",  "text": "…〈其他商品〉嗎？" }
  ],
  "user_message": "其他商品",
  // 該 org、該語系的全部 FAQ 問題
  "faq_questions": [
    "吉利發發的投保年齡是多少？", …
  ]
}`}
          />
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="text-[34px] font-bold">
                題目 <code className="font-mono text-brand">route_to_llm</code>（noul）
              </div>
              <div className="text-[30px] text-navy/70">符合任一項，就該交給 LLM：</div>
            </div>
            <ol className="flex flex-col gap-4 text-[30px] leading-snug">
              <Criterion n="1">要靠前文才懂：回答 bot 的選項、「第二個」、「那繳費方式呢？」</Criterion>
              <Criterion n="2">不是在問資訊：要找真人、客訴、問候、道謝、閒聊</Criterion>
              <Criterion n="3">一句話問了好幾件事</Criterion>
              <Criterion n="4">沒有任何一題 FAQ 在問同一件事</Criterion>
            </ol>
            <p className="text-[26px] text-navy/55">instructions 實際以英文撰寫，這裡為摘要。</p>
          </div>
        </div>
      </ContentLayout>
    ),
  },
  {
    title: "實作 1：測試案例",
    content: (
      <ContentLayout eyebrow="Text Agent · FAQ 分流判官" title="用標註案例調門檻">
        <div className="grid h-full grid-cols-[1.6fr_1fr] gap-12">
          <table className="w-full text-[27px] leading-snug">
            <thead>
              <tr className="border-b-2 border-navy/20 text-left text-navy/50">
                <th className="py-3 font-semibold">情境</th>
                <th className="py-3 font-semibold">使用者說</th>
                <th className="py-3 text-right font-semibold">期望</th>
              </tr>
            </thead>
            <tbody>
              {EVAL_CASES.map(([scene, says, expected]) => (
                <tr key={scene} className="border-b border-navy/10">
                  <td className="py-[11px] pr-6">{scene}</td>
                  <td className="py-[11px] pr-6 text-navy/70">「{says}」</td>
                  <td className="py-[11px] text-right">
                    <Tag tone={expected === "LLM" ? "brand" : "navy"}>{expected}</Tag>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col justify-center gap-8 text-[30px] leading-normal">
            <div className="rounded-2xl bg-navy p-8 text-white">
              <div className="text-[28px] text-white/60">為什麼門檻是 0.3</div>
              <p className="mt-3 text-[34px] font-bold">寧可誤走 LLM，也不要誤出卡片</p>
            </div>
            <p className="text-navy/70">
              LLM 有 RAG 和對話歷史，走錯也還能答；丟錯 FAQ 卡片則是直接答非所問。
            </p>
            <p className="text-[26px] text-navy/55">
              完整案例在 scripts/faq-judge-eval.ts，上線後再依 log 的機率分佈調整。
            </p>
          </div>
        </div>
      </ContentLayout>
    ),
  },
  {
    title: "實作 2：判斷使用者語言",
    content: (
      <ContentLayout eyebrow="Text Agent · 非文字訊息" title="收到貼圖，該用哪個語言回？">
        <div className="grid h-full grid-cols-[1fr_1.1fr] gap-10">
          <div className="flex flex-col gap-8 text-[32px] leading-normal">
            <p>
              使用者傳來圖片、貼圖或語音時，bot 要回一句「目前只能處理文字訊息」。但貼圖本身看不出語言。
            </p>
            <p>
              做法：取使用者最近 5 則<b>自己打的字</b>，用一題 <b className="text-brand">choice</b>{" "}
              問 JEV。簡體中文歸到 other，回英文。
            </p>
            <div className="rounded-2xl bg-zinc-100 p-8 text-[28px]">
              <b>判不了時的退路</b>
              <p className="mt-2 text-navy/70">
                沒有文字、失敗或超過 2 秒 → 看對話上的 language label，沒有就用英文。
              </p>
            </div>
          </div>
          <CodeBlock
            small
            title="questions"
            code={`"language": {
  "type": "choice",
  "instructions": "Which language does the user write in?",
  "criteria": {
    "zh-TW": "Traditional Chinese",
    "en":    "English",
    "ja-JP": "Japanese",
    "other": "Any other language, incl. Simplified Chinese"
  }
}

// 回應（示意）
{ "choice": "zh-TW", "confidence": 0.95, "probabilities": { … } }`}
          />
        </div>
      </ContentLayout>
    ),
  },
  {
    title: "什麼時候用 JEV",
    content: (
      <ContentLayout eyebrow="When to use" title="什麼時候該用 JEV">
        <div className="grid h-full grid-cols-2 gap-10">
          <Card accent label="適合" title="答案是「選一個」或「給個分數」">
            <ul className="flex list-disc flex-col gap-3 pl-8">
              <li>要不要轉給 LLM／真人</li>
              <li>意圖、語言、情緒分類</li>
              <li>內容是否違規、是否完整</li>
              <li>需要調整門檻的判斷</li>
            </ul>
          </Card>
          <Card label="不適合" title="需要產出一段文字">
            <ul className="flex list-disc flex-col gap-3 pl-8">
              <li>寫回覆、摘要、翻譯</li>
              <li>從內容中抽出資料</li>
              <li>選項無法事先列出的問題</li>
              <li>這些交給一般 LLM</li>
            </ul>
          </Card>
        </div>
      </ContentLayout>
    ),
  },
];

// 範例章節：左邊輸入、右邊輸出（輸出數值為示意）
function IOExample({
  type,
  title,
  input,
  output,
  note,
}: {
  type: string;
  title: string;
  input: string;
  output: string;
  note: ReactNode;
}) {
  return (
    <ContentLayout eyebrow={`Example · ${type}`} title={title}>
      <div className="grid h-full grid-cols-2 gap-10">
        <CodeBlock small title="輸入（省略 model）" code={input} />
        <div className="flex flex-col gap-6">
          <CodeBlock small title="輸出（數值為示意）" code={output} />
          <p className="text-[30px] leading-normal text-navy/75">{note}</p>
        </div>
      </div>
    </ContentLayout>
  );
}

function Point({ n, title, children }: { n: string; title: ReactNode; children: ReactNode }) {
  return (
    <div className="flex gap-8">
      <div className="flex size-[72px] shrink-0 items-center justify-center rounded-full bg-brand text-[36px] font-bold text-white">
        {n}
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-[44px] font-bold leading-tight">{title}</div>
        <p className="text-[32px] leading-normal text-navy/70">{children}</p>
      </div>
    </div>
  );
}

function Criterion({ n, children }: { n: string; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="font-mono font-bold text-brand">{n}</span>
      <span>{children}</span>
    </li>
  );
}
