'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'
import Image from 'next/image'

/* ── Floating Particles ── */
const PARTICLES = [
  // left side  [top%, size, anim, delay, duration]
  { side: 'left',  top: 8,  size: 5,  anim: 'drift1', delay: 0,    dur: 9  },
  { side: 'left',  top: 22, size: 3,  anim: 'drift2', delay: 2.5,  dur: 13 },
  { side: 'left',  top: 38, size: 7,  anim: 'drift3', delay: 1,    dur: 11 },
  { side: 'left',  top: 55, size: 4,  anim: 'drift1', delay: 4,    dur: 10 },
  { side: 'left',  top: 70, size: 6,  anim: 'drift2', delay: 0.5,  dur: 14 },
  { side: 'left',  top: 85, size: 3,  anim: 'drift3', delay: 3,    dur: 8  },
  // right side
  { side: 'right', top: 12, size: 4,  anim: 'drift2', delay: 1.5,  dur: 12 },
  { side: 'right', top: 28, size: 6,  anim: 'drift1', delay: 0,    dur: 10 },
  { side: 'right', top: 44, size: 3,  anim: 'drift3', delay: 3.5,  dur: 9  },
  { side: 'right', top: 60, size: 5,  anim: 'drift2', delay: 2,    dur: 13 },
  { side: 'right', top: 76, size: 7,  anim: 'drift1', delay: 1,    dur: 11 },
  { side: 'right', top: 90, size: 4,  anim: 'drift3', delay: 4.5,  dur: 8  },
]

function FloatingParticles() {
  return (
    <div aria-hidden="true" className="pointer-events-none">
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="fixed rounded-full bg-[#c9a96e]"
          style={{
            width:    p.size,
            height:   p.size,
            top:      `${p.top}%`,
            left:     p.side === 'left'  ? '2vw' : 'auto',
            right:    p.side === 'right' ? '2vw' : 'auto',
            animation:`${p.anim} ${p.dur}s ease-in-out ${p.delay}s infinite`,
            opacity:  0.15,
          }}
        />
      ))}
    </div>
  )
}

/* ── Typewriter Title ── */
function TypewriterTitle() {
  const line1 = "You Don't Trust the AI."
  const line2 = "You Trust the Brand."
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [showCursor1, setShowCursor1] = useState(true)
  const [showCursor2, setShowCursor2] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const t1 = setInterval(() => {
      i++
      setText1(line1.slice(0, i))
      if (i >= line1.length) {
        clearInterval(t1)
        setShowCursor1(false)
        setShowCursor2(true)
        let j = 0
        const t2 = setInterval(() => {
          j++
          setText2(line2.slice(0, j))
          if (j >= line2.length) {
            clearInterval(t2)
            setDone(true)
          }
        }, 55)
      }
    }, 55)
    return () => clearInterval(t1)
  }, [])

  return (
    <h1 className="font-playfair font-black text-4xl md:text-5xl lg:text-[3.75rem] text-[#1a1a1a] leading-[1.15] mb-10 tracking-tight min-h-[2.5em] md:min-h-[2.3em]">
      <span>{text1}</span>
      {showCursor1 && <span className="animate-pulse text-[#c9a96e]">|</span>}
      {text1.length === line1.length && <br />}
      <span>{text2}</span>
      {(showCursor2 && !done) && <span className="animate-pulse text-[#c9a96e]">|</span>}
      {done && <span className="text-[#c9a96e]">|</span>}
    </h1>
  )
}

/* ── Reading Progress Bar ── */
function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const total = scrollHeight - clientHeight
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-50 h-[3px] bg-[#c9a96e] pointer-events-none transition-[width] duration-75 ease-out"
      style={{ width: `${progress}%` }}
    />
  )
}

/* ── Sticky Nav ── */
function StickyNav() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav
      aria-label="Article navigation"
      className={`fixed top-0 left-0 right-0 z-40 bg-[#faf8f4]/95 backdrop-blur-sm border-b border-[#c9a96e]/20 transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-[900px] mx-auto px-6 md:px-10 py-3 flex items-center gap-4">
        <div className="w-5 h-[1px] bg-[#c9a96e] flex-shrink-0" aria-hidden="true" />
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#1a1a1a] font-inter truncate">
          You Don&apos;t Trust the AI. You Trust the Brand.
        </p>
      </div>
    </nav>
  )
}

/* ── Scroll Fade-In ── */
function FadeIn({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // If already in viewport on mount, show immediately
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
      },
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  )
}

/* ── Section Heading ── */
function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <FadeIn>
      <h2 className="font-playfair font-bold text-2xl md:text-3xl text-[#1a1a1a] border-l-[3px] border-[#c9a96e] pl-5 mt-16 mb-7 leading-snug tracking-tight">
        {children}
      </h2>
    </FadeIn>
  )
}

/* ── Pull Quote — full-bleed gold block ── */
function PullQuote({ children }: { children: string }) {
  return (
    <FadeIn>
      <figure
        className="my-16 relative bg-[#c9a96e] py-14 px-8"
        style={{ left: '50%', transform: 'translateX(-50%)', width: '100vw' }}
        role="doc-pullquote"
      >
        <div className="max-w-[900px] mx-auto text-center px-4 md:px-16">
          <div className="w-10 h-[1px] bg-white/60 mx-auto mb-8" aria-hidden="true" />
          <blockquote>
            <p className="text-2xl md:text-3xl lg:text-4xl italic text-white font-playfair leading-relaxed">
              &ldquo;{children}&rdquo;
            </p>
          </blockquote>
          <div className="w-10 h-[1px] bg-white/60 mx-auto mt-8" aria-hidden="true" />
        </div>
      </figure>
    </FadeIn>
  )
}

/* ── Article Image ── */
function ArticleImage({ src, caption, alt }: { src: string; caption: string; alt: string }) {
  return (
    <FadeIn>
      <figure className="my-12">
        <div className="relative w-full overflow-hidden rounded-xl shadow-sm" style={{ aspectRatio: '16/9' }}>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </div>
        <figcaption className="mt-4 flex items-start gap-3 font-inter">
          <div className="w-4 h-[1px] bg-[#c9a96e] mt-2 flex-shrink-0" aria-hidden="true" />
          <span className="text-sm italic text-gray-400 leading-relaxed">{caption}</span>
        </figcaption>
      </figure>
    </FadeIn>
  )
}

/* ── Interactive Questions Flow ── */
const QUESTIONS = [
  'Who is actually behind this tool — and is my trust in them based on their financial track record, or just their name recognition and marketing?',
  'What specific language are they using to describe their AI — and does that language describe real, measurable performance, or is it designed to make me feel safe without proving anything?',
  'Has this technology actually demonstrated results I can verify independently, or did the branding and the interface do all the persuasive work before I even looked at the data?',
]

function InteractiveSteps() {
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false])

  const toggle = (i: number) => {
    setRevealed(prev => {
      const next = [...prev]
      next[i] = !next[i]
      return next
    })
  }

  return (
    <div className="my-12 relative">
      {QUESTIONS.map((q, i) => {
        const isOpen = revealed[i]
        const lineActive = revealed[i]

        return (
          <div key={i} className="relative flex gap-0">

            {/* Left column: circle + line */}
            <div className="flex flex-col items-center mr-6 flex-shrink-0">
              {/* Circle button */}
              <button
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className={`relative w-12 h-12 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-all duration-500 focus:outline-none ${
                  isOpen
                    ? 'bg-[#c9a96e] border-[#c9a96e] shadow-[0_0_24px_rgba(201,169,110,0.45)]'
                    : 'bg-transparent border-[#c9a96e]/40 hover:border-[#c9a96e] hover:shadow-[0_0_12px_rgba(201,169,110,0.2)]'
                }`}
              >
                {/* Ripple on open */}
                {isOpen && (
                  <span className="absolute inset-0 rounded-full bg-[#c9a96e]/30 animate-ping" />
                )}
                <span className={`font-playfair font-bold text-xl z-10 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-[#c9a96e]'}`}>
                  {i + 1}
                </span>
              </button>

              {/* Connector line (not after last item) */}
              {i < QUESTIONS.length - 1 && (
                <div className="relative w-[2px] flex-1 min-h-[2.5rem] mt-1 bg-[#c9a96e]/15 overflow-hidden">
                  <div
                    className="absolute top-0 left-0 w-full bg-[#c9a96e] transition-all duration-700 ease-in-out"
                    style={{ height: lineActive ? '100%' : '0%' }}
                  />
                </div>
              )}
            </div>

            {/* Right column: content */}
            <div className="flex-1 pb-8 pt-2">
              <button
                onClick={() => toggle(i)}
                className="w-full text-left group focus:outline-none"
              >
                <div className={`text-xs uppercase tracking-[0.18em] font-inter font-semibold mb-2 transition-colors duration-300 ${
                  isOpen ? 'text-[#c9a96e]' : 'text-[#c9a96e]/50 group-hover:text-[#c9a96e]'
                }`}>
                  {isOpen ? 'Question revealed' : 'Tap to reveal →'}
                </div>
              </button>

              {/* Expandable content */}
              <div
                className="overflow-hidden transition-all duration-600 ease-in-out"
                style={{ maxHeight: isOpen ? '200px' : '0px', opacity: isOpen ? 1 : 0 }}
              >
                <div className={`pl-5 border-l-2 border-[#c9a96e]/40 transition-all duration-500 ${
                  isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}>
                  <p className="text-[#2a2a2a] text-[17px] md:text-lg leading-[1.85] font-inter py-2">
                    {q}
                  </p>
                </div>
              </div>
            </div>

          </div>
        )
      })}
    </div>
  )
}

/* ── Body Paragraph ── */
function P({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[#2a2a2a] text-[17px] md:text-lg leading-[1.85] mb-6 font-inter ${className}`}>
      {children}
    </p>
  )
}

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function ArticlePage() {
  return (
    <>
      <FloatingParticles />
      <ReadingProgress />
      <StickyNav />

      <div className="min-h-screen">

        {/* ════ ARTICLE HEADER ════ */}
        <FadeIn>
          <header className="max-w-[900px] mx-auto px-6 md:px-10 pt-20 pb-12 text-center">
            {/* Gold overline */}
            <div className="flex items-center justify-center gap-4 mb-10" aria-hidden="true">
              <div className="w-12 h-[1px] bg-[#c9a96e]" />
              <div className="w-1.5 h-1.5 bg-[#c9a96e] rotate-45" />
              <div className="w-12 h-[1px] bg-[#c9a96e]" />
            </div>
            <TypewriterTitle />
            <div className="flex items-center justify-center gap-4 text-xs font-inter uppercase tracking-[0.15em] text-gray-400 flex-wrap">
              <span className="text-[#c9a96e] font-semibold tracking-widest">Ibysh Altair</span>
              <span aria-hidden="true">&middot;</span>
              <span>6 min read</span>
            </div>

            {/* Author card */}
            <div className="mt-10 flex flex-col items-center gap-4">
              <div className="relative w-36 h-36 rounded-full overflow-hidden ring-4 ring-[#c9a96e]/50 shadow-lg">
                <Image
                  src="/author.jpg"
                  alt="Altair Ibysh"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-inter mb-0.5">Examined by</p>
                <p className="font-playfair font-bold text-xl text-[#1a1a1a]">Altair Ibysh</p>
                <p className="text-sm text-gray-400 font-inter mt-1">Florida International University</p>
              </div>
            </div>

            {/* Bottom rule */}
            <div className="mt-8 flex items-center gap-4" aria-hidden="true">
              <div className="flex-1 h-[1px] bg-gray-200" />
              <div className="w-1 h-1 bg-[#c9a96e] rotate-45" />
              <div className="flex-1 h-[1px] bg-gray-200" />
            </div>
          </header>
        </FadeIn>

        {/* ════ ARTICLE BODY ════ */}
        <div className="max-w-[900px] mx-auto px-6 md:px-10">

          {/* ── INTRO ── */}
          <FadeIn>
            <section className="mt-4">
              <P className="drop-cap">You downloaded the new app.</P>
              <P>
                Clean design. Big bank logo sitting in the corner. A button that says &ldquo;Start Growing Your Wealth Today.&rdquo;
              </P>
              <P>
                So you trusted it. Most people my age do — and honestly, I was doing the same exact thing before I started actually looking at what is really behind these tools.
              </P>
              <P>
                Here is something nobody is really telling you. The reason you trust that AI financial app probably has nothing to do with how good it actually is. It is coming from the words companies choose to describe it and which brand name is attached to it. And while you are sitting there feeling confident about your financial future, someone in a marketing department is counting on exactly that feeling.
              </P>
              <P>
                Would you trust a random app called &ldquo;FinBot 3000&rdquo; the same way you trust &ldquo;Goldman Sachs AI Advisor?&rdquo; Same technology. Completely different feeling. That feeling is not coming from the AI. It is coming from the logo. And that difference — between what something is and what it feels like — is costing young investors more than they realize.
              </P>
            </section>
          </FadeIn>

          {/* ── SECTION 1 ── */}
          <SectionHeading>What Is a Robo-Advisor, and Why Should You Care?</SectionHeading>
          <FadeIn>
            <section>
              <P>
                Before we go further, it is important to understand what these tools actually are. A robo-advisor is a digital platform that uses algorithms to automatically manage your investments with little to no human involvement. They first appeared in 2008 and have grown rapidly since then. According to Market Business Insights, adoption rates among Millennial and Gen Z investors are the highest of any demographic, and the global robo-advisory market is projected to reach trillions in assets under management over the next decade.
              </P>
              <P>
                The appeal makes sense. Lower fees than human advisors. No minimum account balance at many platforms. Available 24 hours a day. For a college student or young professional trying to start investing for the first time, this sounds like exactly what you need.
              </P>
              <P>
                But here is what that same marketing does not tell you. The robo-advisory market is not just competing on technology or performance. It is competing on trust. And trust, as it turns out, is something that can be manufactured through the right words and the right logo — without the technology ever having to prove itself.
              </P>
            </section>
          </FadeIn>

        </div>{/* close inner container for full-bleed image */}

        <div className="max-w-[900px] mx-auto px-6 md:px-10">
          <ArticleImage
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1800&q=80"
            alt="Stock market data on a screen representing robo-advisory growth"
            caption="The robo-advisory market is growing fastest among Gen Z and Millennial investors — the group least protected from misleading AI marketing."
          />
        </div>

        {/* PullQuote is full-bleed, lives outside any padded container */}
        <div className="max-w-[900px] mx-auto px-6 md:px-10">

          {/* ── SECTION 2 ── */}
          <SectionHeading>The Words Are Doing All the Work</SectionHeading>
          <FadeIn>
            <section>
              <P>
                In 2025, researchers at the University of Hagen ran a randomized online experiment with 592 participants. The setup was simple but the results were striking. They took the exact same AI system and described it two different ways to two separate groups. One group received a positively framed description of the AI&apos;s characteristics — emphasizing its learning ability and autonomy in favorable terms. The other group received a negatively framed description. The actual technology did not change at all. Not a single line of code was different.
              </P>
              <P>But the trust levels shifted completely. Just from the words.</P>
              <P>
                Strunk, Nissen, and Smolnik, the researchers behind this study, concluded that framing shapes how AI characteristics are perceived even when factual information remains exactly the same. Let that sink in for a second. The same AI. Different words. Completely different trust response. This means that every time a company calls their product &ldquo;intelligent wealth management&rdquo; instead of &ldquo;automated stock sorting,&rdquo; they are not just choosing a name — they are choosing how much you trust them. And they know exactly what they are doing.
              </P>
            </section>
          </FadeIn>

        </div>

        <PullQuote>The same AI. Different words. Completely different trust response.</PullQuote>

        <div className="max-w-[900px] mx-auto px-6 md:px-10">

          {/* ── SECTION 3 ── */}
          <SectionHeading>The Brand Is Doing Even More Than You Think</SectionHeading>
          <FadeIn>
            <section>
              <P>It gets worse.</P>
              <P>
                A 2024 study by Senteio and Hughes, published in the Journal of Financial Planning, examined what factors actually drive trust in AI financial tools among Americans. The researchers tested four different variables — reputation of the institution, information quality, service quality, and attitude toward AI. After analyzing data from 86 participants through both surveys and personal interviews, the results were clear.
              </P>
              <P>
                The single biggest factor in trust was not performance. It was not accuracy. It was not how sophisticated the algorithm was or how many years of market data it had analyzed.
              </P>
              <P>It was the name of the company behind it.</P>
              <P>
                Vanguard&apos;s robo-advisor gets trusted far more than an identical tool from a startup nobody has heard of — not because it performs better, but because people already trusted Vanguard as an institution. The AI just borrowed that trust. It never earned it on its own terms.
              </P>
              <P>
                This same dynamic plays out across the industry. Business accelerators and venture-backed startup programs attach their names and logos to young AI companies, and overnight those tools feel legitimate. The technology does not change. Just the association does. According to Cerulli Associates, more than 60 percent of investors under age 50 are comfortable using AI in their financial relationships — making young people the most trusting demographic of all. That is not a coincidence. Young investors are the primary marketing target, and the strategy is working exactly as intended.
              </P>
            </section>
          </FadeIn>
          <ArticleImage
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=80"
            alt="Data analytics dashboard showing statistics on AI adoption among investors"
            caption="Cerulli Associates 2026: Over 60% of investors under 50 are comfortable with AI financial tools — higher than any other age group."
          />

          {/* ── SECTION 4 ── */}
          <SectionHeading>Companies Are Legally Getting Caught for This</SectionHeading>
          <FadeIn>
            <section>
              <P>
                This is not speculation. This is not a theory. Companies are actively deceiving investors about their AI capabilities, and regulators are finally starting to catch up.
              </P>
              <P>
                According to a 2026 analysis published by the New York State Bar Association, the SEC has made AI-washing — the practice of exaggerating or outright misrepresenting a company&apos;s AI capabilities to attract clients and investors — one of its highest enforcement priorities. The numbers are alarming. Securities class action lawsuits targeting AI misrepresentations increased by 100 percent between 2023 and 2024, with no sign of slowing down through 2025. In 2024 alone, the SEC charged two separate investment advisers with making false and misleading statements about how they were using artificial intelligence in their platforms.
              </P>
              <P>
                The Federal Trade Commission joined the effort in September 2024, announcing a formal crackdown on deceptive AI claims across industries.
              </P>
              <P>
                These are not technical violations buried in fine print. These are companies that looked everyday investors directly in the eye and lied about what their technology could do. They used the language of artificial intelligence — words like &ldquo;intelligent,&rdquo; &ldquo;adaptive,&rdquo; &ldquo;machine learning powered&rdquo; — to manufacture trust they had not earned. And if federal regulators are only catching a fraction of these cases, the honest question is: how many more companies are doing this right now without any consequence?
              </P>
            </section>
          </FadeIn>

        </div>

        <PullQuote>How many more companies are doing this right now without any consequence?</PullQuote>

        <div className="max-w-[900px] mx-auto px-6 md:px-10">

          {/* ── SECTION 5 ── */}
          <SectionHeading>But Wait — Aren&apos;t Some AI Tools Actually Good?</SectionHeading>
          <FadeIn>
            <section>
              <P>This is a fair and important question, and it deserves a real answer rather than being dismissed.</P>
              <P>
                Yes. Some AI financial tools genuinely work well and provide real value. Robo-advisors do offer significantly lower management fees compared to human advisors. They do remove emotional and cognitive bias from investment decisions, which behavioral finance research consistently shows leads to better long-term outcomes. They do democratize access to financial services for people who previously could not afford professional advice. A report by Turnitin and PwC found that 75 percent of corporate executives want to expand their use of AI, and there are legitimate and powerful reasons why.
              </P>
              <P>The problem is not that the technology exists. The problem is not even that companies promote it.</P>
              <P>
                The problem is that you are not being given honest, transparent information to evaluate whether the specific tool you are trusting actually performs as advertised. When companies rely on carefully chosen language and borrowed brand credibility instead of demonstrating real performance, they take away your ability to make a truly informed choice. As Hansen and Varnes found in their 2025 cross-national study on financial trust, the way institutions communicate with users fundamentally shapes how much trust those users place in financial systems. The words are not neutral. They are a strategy.
              </P>
              <P>And you deserve better than a strategy. You deserve the truth.</P>
            </section>
          </FadeIn>

          {/* ── SECTION 6 ── */}
          <SectionHeading>Nobody Is Teaching You This — And That Is the Real Problem</SectionHeading>
          <FadeIn>
            <section>
              <P>Here is what bothers me the most about all of this.</P>
              <P>
                Research by Kalra, published in 2025, found that most people — including elderly adults who are among the most vulnerable targets of financial fraud — are genuinely open to engaging with AI tools. They are not refusing. They are not technophobic. They just need someone to be honest with them first. They need someone to explain how these tools actually work, what they can and cannot do, and who is really behind them.
              </P>
              <P>But that honest explanation is not coming from the companies profiting from your trust.</P>
              <P>
                Instead, companies are investing in clean interfaces, confident language, and familiar logos. They are hiring UX designers to make their apps feel trustworthy and marketing teams to make their AI sound more powerful than it is. According to a report on robo-advisory market trends, legacy financial institutions have a massive advantage over newer fintech companies specifically because they have had decades to build brand trust — and they are using that trust to sell AI products without having to prove those products work.
              </P>
              <P>
                You are scrolling through Instagram at midnight. You see an ad for an AI investing app. It looks clean. A recognizable bank name is attached. You read &ldquo;Start Growing Your Wealth Today&rdquo; and something in your brain says yes. You download it without asking a single question.
              </P>
              <P>That reaction is not accidental. It was designed.</P>
            </section>
          </FadeIn>
          <ArticleImage
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1800&q=80"
            alt="Young person scrolling through a financial app on a smartphone"
            caption="AI financial app marketing is carefully designed to trigger trust responses in young investors before they have a chance to ask critical questions."
          />

          {/* ── SECTION 7 ── */}
          <SectionHeading>What You Should Actually Do With This Information</SectionHeading>
          <FadeIn>
            <section>
              <P>
                Knowing all of this, here is what I want you to take away — not as a warning to avoid AI tools entirely, but as a guide to engaging with them the way they should be engaged with: critically and on your own terms.
              </P>
              <P>Before you trust any AI financial tool, work through these three questions:</P>

              <InteractiveSteps />

              <P>
                Your money is not abstract. It is hours of your life, plans for your future, and security for the people you care about. The companies building these apps understand that better than anyone — which is why they spend so much making sure you feel good about trusting them before you ever think to question whether you should.
              </P>
              <P>
                The SEC is now prosecuting companies for lying about AI. The FTC is cracking down on deceptive claims. Regulators are finally paying attention. But the most powerful protection you have is not a government agency. It is the decision to ask the right questions before you hand your money to an algorithm you have never actually tested.
              </P>
            </section>
          </FadeIn>

          {/* ════ DRAMATIC CLOSING ════ */}
          <FadeIn>
            <div className="py-20 my-6 text-center" aria-label="Closing statement">
              {/* Top ornament */}
              <div className="flex items-center justify-center gap-4 mb-12" aria-hidden="true">
                <div className="w-16 h-[1px] bg-[#c9a96e]/40" />
                <div className="w-1.5 h-1.5 bg-[#c9a96e] rotate-45" />
                <div className="w-16 h-[1px] bg-[#c9a96e]/40" />
              </div>
              <p className="text-3xl md:text-4xl lg:text-5xl font-black font-playfair text-[#1a1a1a] leading-tight mb-5 tracking-tight">
                Your money is real.
              </p>
              <p className="text-3xl md:text-4xl lg:text-5xl font-black font-playfair text-[#c9a96e] leading-tight tracking-tight">
                The trust they manufactured is not.
              </p>
              {/* Bottom ornament */}
              <div className="flex items-center justify-center gap-4 mt-12" aria-hidden="true">
                <div className="w-16 h-[1px] bg-[#c9a96e]/40" />
                <div className="w-1.5 h-1.5 bg-[#c9a96e] rotate-45" />
                <div className="w-16 h-[1px] bg-[#c9a96e]/40" />
              </div>
            </div>
          </FadeIn>

          {/* ════ WORKS CITED ════ */}
          <FadeIn>
            <section
              aria-labelledby="works-cited-heading"
              className="rounded-2xl px-8 py-10 mt-4 mb-16"
              style={{ backgroundColor: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.2)' }}
            >
              <h2
                id="works-cited-heading"
                className="font-playfair font-bold text-xl text-[#1a1a1a] mb-6 pb-4 border-b border-[#c9a96e]/25"
              >
                Works Cited
              </h2>
              <div className="space-y-4 text-sm text-gray-500 font-inter leading-relaxed">
                {[
                  'Cerulli Associates. \u201cInvestor Skepticism of AI in Financial Advice Persists.\u201d Cerulli Edge, Feb. 2026, www.cerulli.com/press-releases/investor-skepticism-of-ai-in-financial-advice-persists.',
                  'Hansen, Torben, and Claus Varnes. \u201cUnderstanding Consumer Financial Trust across National Levels of Interpersonal Trust.\u201d Behavioral Sciences, vol. 16, no. 1, 30 Dec. 2025, p. 62, https://doi.org/10.3390/bs16010062.',
                  'Kalra, Jay. Understanding Older Adults\u2019 Perceptions of AI Use in Financial Decisions. AHFE International, 26 July 2025.',
                  'Market Business Insights. \u201cRobo-Advisory Market: Trends in Automated and Hybrid Investing 2025-2035.\u201d Market Business Insights, 2025, marketbusinessinsights.com/robo-advisory-market.',
                  'New York State Bar Association. \u201cRegulating AI Deception in Financial Markets: How the SEC Can Combat AI-Washing Through Aggressive Enforcement.\u201d NYSBA, Jan. 2026, nysba.org/regulating-ai-deception-in-financial-markets-how-the-sec-can-combat-ai-washing-through-aggressive-enforcement.',
                  'Senteio, Steve, and Larry Hughes. \u201cCustomer Trust and Satisfaction with Robo-Adviser Technology.\u201d Journal of Financial Planning, vol. 37, no. 8, Aug. 2024, pp. 86-101.',
                  'Strunk, Jobin Alexander, Anika Nissen, and Stefan Smolnik. \u201cThe Effect of Framing AI Characteristics on Trust and Reliance.\u201d ICIS 2025 Proceedings, 14 Dec. 2025, aisel.aisnet.org/icis2025/user_behav/user_behav/7.',
                  'Turnitin. \u201cBalancing Speed and Accuracy in the AI Era.\u201d Turnitin.com, 16 Dec. 2025, www.turnitin.com/blog/trust-at-scale-balancing-speed-and-accuracy-in-the-ai-era.',
                ].map((cite, i) => (
                  <p key={i} className="hanging-indent">{cite}</p>
                ))}
              </div>
            </section>
          </FadeIn>

        </div>{/* end max-w container */}

        {/* ════ FOOTER ════ */}
        <footer style={{ borderTop: '1px solid rgba(201,169,110,0.25)' }}>
          <div className="max-w-[900px] mx-auto px-6 md:px-10 py-10 text-center">
            <div className="flex items-center justify-center gap-4 mb-4" aria-hidden="true">
              <div className="w-8 h-[1px] bg-[#c9a96e]/40" />
              <div className="w-1 h-1 bg-[#c9a96e]/60 rotate-45" />
              <div className="w-8 h-[1px] bg-[#c9a96e]/40" />
            </div>
            <p className="text-xs font-inter uppercase tracking-[0.2em] text-gray-400">
              Written for ENC1102 — Writing and Rhetoric II | Florida International University | Spring 2026
            </p>
          </div>
        </footer>

      </div>
    </>
  )
}
