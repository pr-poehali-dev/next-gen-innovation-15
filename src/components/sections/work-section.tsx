import { useReveal } from "@/hooks/use-reveal"
import Icon from "@/components/ui/icon"

const examples = [
  {
    id: "01",
    model: "ChatGPT",
    modelIcon: "Bot",
    category: "История",
    question: "В каком году произошла Битва при Гастингсе?",
    answer:
      "Битва при Гастингсе произошла 14 октября **1067 года**. Это сражение стало решающим в завоевании Англии нормандцами под предводительством Вильгельма Завоевателя.",
    error: "Правильный год — 1066",
    errorType: "Неверная дата",
    color: "from-blue-500/10 to-blue-600/5",
    border: "border-blue-500/20",
    tag: "bg-blue-500/15 text-blue-300",
  },
  {
    id: "02",
    model: "Gemini",
    modelIcon: "Sparkles",
    category: "Наука",
    question: "За что Эйнштейн получил Нобелевскую премию?",
    answer:
      "Альберт Эйнштейн получил Нобелевскую премию по физике в 1921 году за создание **теории относительности** — одного из величайших открытий в истории науки.",
    error: "Реальная причина — фотоэлектрический эффект",
    errorType: "Придуманный факт",
    color: "from-purple-500/10 to-purple-600/5",
    border: "border-purple-500/20",
    tag: "bg-purple-500/15 text-purple-300",
  },
  {
    id: "03",
    model: "GPT-4",
    modelIcon: "Brain",
    category: "Право",
    question: "Что говорит Федеральный закон №7234-ФЗ от 12 марта 2021?",
    answer:
      "Федеральный закон №7234-ФЗ от 12 марта 2021 года регулирует **цифровые активы и криптовалютные операции** на территории Российской Федерации, устанавливая порядок их оборота.",
    error: "Такого закона не существует",
    errorType: "Несуществующий источник",
    color: "from-red-500/10 to-red-600/5",
    border: "border-red-500/20",
    tag: "bg-red-500/15 text-red-300",
  },
]

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.2)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Примеры
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Реальные галлюцинации нейросетей</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {examples.map((ex, i) => (
            <ChatCard key={ex.id} example={ex} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ChatCard({
  example,
  index,
  isVisible,
}: {
  example: (typeof examples)[0]
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) return "translate-y-16 opacity-0"
    return "translate-y-0 opacity-100"
  }

  const boldify = (text: string) =>
    text.split(/\*\*(.*?)\*\*/).map((part, i) =>
      i % 2 === 1 ? (
        <span key={i} className="font-semibold text-white">
          {part}
        </span>
      ) : (
        part
      )
    )

  return (
    <div
      className={`flex flex-col rounded-2xl border bg-gradient-to-b ${example.color} ${example.border} overflow-hidden transition-all duration-700`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-foreground/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground/10">
            <Icon name={example.modelIcon as "Bot"} size={13} className="text-foreground/70" />
          </div>
          <span className="font-mono text-xs font-medium text-foreground/80">{example.model}</span>
        </div>
        <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] ${example.tag}`}>{example.category}</span>
      </div>

      {/* Chat body */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        {/* User message */}
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-foreground/15 px-3 py-2">
            <p className="text-xs leading-relaxed text-foreground/90">{example.question}</p>
          </div>
        </div>

        {/* AI response */}
        <div className="flex gap-2">
          <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground/10">
            <Icon name="Cpu" size={11} className="text-foreground/60" />
          </div>
          <div className="rounded-2xl rounded-tl-sm bg-foreground/8 px-3 py-2 border border-foreground/10">
            <p className="text-xs leading-relaxed text-foreground/80">{boldify(example.answer)}</p>
          </div>
        </div>
      </div>

      {/* Error badge */}
      <div className="mx-4 mb-4 flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5">
        <Icon name="AlertTriangle" size={13} className="mt-0.5 shrink-0 text-red-400" />
        <div>
          <p className="font-mono text-[10px] font-medium uppercase tracking-wide text-red-400/80">{example.errorType}</p>
          <p className="mt-0.5 text-xs text-foreground/70">{example.error}</p>
        </div>
      </div>
    </div>
  )
}
