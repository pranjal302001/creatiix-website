import React, { useEffect, useState } from 'react';
import { Check, Zap, Bot, Database, MessageCircle, FileText } from 'lucide-react';

// Small animated illustrations, one per service.
// They are demos, not screenshots of client work.

// Steps through 0..count-1 on a timer, then loops.
function useLoop(count, ms) {
    const [step, setStep] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setStep((s) => (s + 1) % count), ms);
        return () => clearInterval(id);
    }, [count, ms]);
    return step;
}

const Frame = ({ children, label, className = '' }) => (
    <div className={`relative rounded-2xl bg-background border border-ink/10 overflow-hidden ${className}`}>
        {children}
        {label && (
            <span className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-widest text-ink/40 border border-ink/15 rounded-2xl px-2 py-0.5 bg-background/80">
                {label}
            </span>
        )}
    </div>
);

/* ---------- Chatbot: scripted conversation ---------- */
const script = [
    { from: 'user', text: 'Hi, is there a slot this Saturday?' },
    { from: 'bot', text: 'Yes! 11:00 AM and 4:30 PM are open. Which one should I book?' },
    { from: 'user', text: '4:30 please' },
    { from: 'bot', text: 'Done ✓ Saturday, 4:30 PM is booked. Confirmation sent on WhatsApp.' },
];

export function ChatDemo({ className = '' }) {
    // Each message gets a "typing" beat and a "shown" beat; two extra beats pause before looping.
    const step = useLoop(script.length * 2 + 2, 1100);
    const shown = Math.min(script.length, Math.floor((step + 1) / 2));
    const typing = step % 2 === 0 && shown < script.length ? script[shown].from : null;

    return (
        <Frame className={className}>
            <div className="flex items-center gap-3 px-4 py-3 border-b border-ink/10">
                <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center">
                    <Bot className="w-4 h-4 text-onaccent" />
                </div>
                <div>
                    <p className="font-display font-bold text-sm text-ink leading-none">Your Assistant</p>
                    <p className="font-mono text-[10px] text-accent uppercase tracking-widest mt-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> Online 24/7
                    </p>
                </div>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-ink/40 border border-ink/15 rounded-2xl px-2 py-0.5">Demo</span>
            </div>
            <div className="p-4 flex flex-col gap-2.5 min-h-[230px] justify-end">
                {script.slice(0, shown).map((m, i) => (
                    <div key={i} className={`max-w-[82%] px-3.5 py-2.5 text-sm leading-snug rounded-2xl ${m.from === 'bot'
                        ? 'self-start bg-ink/10 text-ink rounded-bl-sm'
                        : 'self-end bg-brand text-onaccent rounded-br-sm'}`}>
                        {m.text}
                    </div>
                ))}
                {typing && (
                    <div className={`px-3.5 py-3 rounded-2xl flex gap-1 ${typing === 'bot' ? 'self-start bg-ink/10' : 'self-end bg-accent/30'}`}>
                        {[0, 1, 2].map((d) => (
                            <span key={d} className="w-1.5 h-1.5 rounded-full bg-ink animate-typing-dot" style={{ animationDelay: `${d * 0.15}s` }} />
                        ))}
                    </div>
                )}
            </div>
        </Frame>
    );
}

/* ---------- Automation: trigger → AI → actions ---------- */
const flow = [
    { icon: FileText, label: 'New lead fills form', tag: 'Trigger' },
    { icon: Zap, label: 'AI reads & scores the lead', tag: 'AI' },
    { icon: Database, label: 'Saved to CRM / Sheet', tag: 'Action' },
    { icon: MessageCircle, label: 'WhatsApp follow-up sent', tag: 'Action' },
];

export function FlowDiagram({ className = '' }) {
    const active = useLoop(flow.length + 1, 900);
    return (
        <Frame label="Demo" className={className}>
            <div className="p-5 pt-10 flex flex-col">
                {flow.map((node, i) => {
                    const Icon = node.icon;
                    const on = i <= active;
                    return (
                        <React.Fragment key={i}>
                            <div className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 transition-colors duration-500 ${on ? 'border-accent bg-accent/10' : 'border-ink/10 bg-ink/5'}`}>
                                <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center transition-colors duration-500 ${on ? 'bg-brand text-onaccent' : 'bg-ink/10 text-ink/50'}`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                                <span className="text-sm text-ink flex-1 leading-tight">{node.label}</span>
                                <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">{node.tag}</span>
                            </div>
                            {i < flow.length - 1 && (
                                <svg width="2" height="18" className="ml-[29px] overflow-visible" aria-hidden="true">
                                    <line x1="1" y1="0" x2="1" y2="18" strokeWidth="2" strokeDasharray="4 4"
                                        className={`animate-dash-flow transition-colors duration-500 ${i < active ? 'stroke-accent' : 'stroke-ink/20'}`} />
                                </svg>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </Frame>
    );
}

/* ---------- Agent: a task list completing itself ---------- */
const tasks = ['Read 42 new emails', 'Drafted 6 replies for approval', 'Updated the order sheet', 'Flagged 2 urgent items for you'];

export function AgentTasks({ className = '' }) {
    const done = useLoop(tasks.length + 2, 1000);
    return (
        <Frame label="Demo" className={className}>
            <div className="p-5 pt-10">
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40 mb-1">Goal</p>
                <p className="font-display font-bold text-ink mb-4">“Clear my inbox every morning”</p>
                <ul className="flex flex-col gap-2.5">
                    {tasks.map((t, i) => {
                        const isDone = i < done;
                        const isRunning = i === done;
                        return (
                            <li key={i} className="flex items-center gap-3 text-sm">
                                <span className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center border transition-colors duration-300 ${isDone ? 'bg-accent border-accent' : isRunning ? 'border-accent' : 'border-ink/20'}`}>
                                    {isDone && <Check className="w-3 h-3 text-onaccent" strokeWidth={3} />}
                                    {isRunning && <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />}
                                </span>
                                <span className={`transition-colors duration-300 ${isDone ? 'text-ink' : 'text-ink/40'}`}>{t}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Frame>
    );
}

/* ---------- Website: browser window mock ---------- */
export function BrowserMock({ className = '' }) {
    return (
        <Frame className={className}>
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-ink/10">
                <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                <span className="w-2.5 h-2.5 rounded-full bg-peach" />
                <span className="w-2.5 h-2.5 rounded-full bg-ink/20" />
                <span className="ml-3 flex-1 h-5 rounded-2xl bg-ink/10 font-mono text-[10px] text-ink/40 flex items-center px-3">yourbrand.com</span>
            </div>
            <div className="p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <span className="h-2.5 w-16 rounded-full bg-ink/30" />
                    <span className="flex gap-2"><i className="h-2 w-8 rounded-full bg-ink/15 block" /><i className="h-2 w-8 rounded-full bg-ink/15 block" /><i className="h-2 w-8 rounded-full bg-ink/15 block" /></span>
                </div>
                <div className="grid grid-cols-5 gap-4 items-center">
                    <div className="col-span-3 flex flex-col gap-2.5">
                        <span className="h-4 w-full rounded bg-ink/80" />
                        <span className="h-4 w-3/4 rounded bg-accent" />
                        <span className="h-2 w-full rounded bg-ink/15 mt-1" />
                        <span className="h-2 w-5/6 rounded bg-ink/15" />
                        <span className="h-7 w-24 rounded-full bg-brand mt-2" />
                    </div>
                    <div className="col-span-2 aspect-square rounded-xl bg-brand" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                    {[0, 1, 2].map((i) => <div key={i} className="h-12 rounded-lg bg-ink/10" />)}
                </div>
            </div>
        </Frame>
    );
}

/* ---------- Mobile app: phone mock ---------- */
export function PhoneMock({ className = '' }) {
    return (
        <div className={`flex justify-center ${className}`}>
            <div className="w-[190px] rounded-2xl border-[5px] border-ink/80 bg-background p-3 shadow-xl">
                <div className="mx-auto w-14 h-3.5 rounded-full bg-ink/80 mb-3" />
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <span className="block h-2 w-10 rounded bg-ink/30 mb-1.5" />
                        <span className="block h-3 w-20 rounded bg-ink/80" />
                    </div>
                    <span className="w-7 h-7 rounded-full bg-peach" />
                </div>
                <div className="rounded-xl bg-brand p-3 mb-3">
                    <span className="block h-2 w-12 rounded bg-onaccent/40 mb-2" />
                    <span className="block h-4 w-20 rounded bg-onaccent/80" />
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                    {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="h-12 rounded-lg bg-ink/10 p-2">
                            <span className="block w-4 h-4 rounded bg-accent/70 mb-1.5" />
                            <span className="block h-1.5 w-10 rounded bg-ink/30" />
                        </div>
                    ))}
                </div>
                <div className="flex justify-around pt-2 border-t border-ink/10">
                    {[0, 1, 2, 3].map((i) => <span key={i} className={`w-4 h-4 rounded ${i === 0 ? 'bg-accent' : 'bg-ink/20'}`} />)}
                </div>
            </div>
        </div>
    );
}

/* ---------- Graphic design: brand board ---------- */
export function DesignBoard({ className = '' }) {
    return (
        <Frame className={className}>
            <div className="p-5 grid grid-cols-5 gap-3">
                <div className="col-span-3 aspect-[4/3] rounded-xl bg-ink/10 flex items-center justify-center">
                    <img src="/brand/mark.png" alt="" className="w-1/2 h-auto" />
                </div>
                <div className="col-span-2 flex flex-col gap-3">
                    <div className="flex-1 rounded-xl bg-brand" />
                    <div className="flex-1 rounded-xl bg-peach" />
                </div>
                <div className="col-span-2 rounded-xl bg-ink/10 p-3">
                    <span className="font-display font-bold text-3xl text-ink leading-none">Aa</span>
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-ink/40 mt-1">Typeface</span>
                </div>
                <div className="col-span-3 rounded-xl bg-ink/10 p-3 flex items-center gap-2">
                    {['bg-accent', 'bg-flame', 'bg-peach', 'bg-ink'].map((c) => <span key={c} className={`w-7 h-7 rounded-full ${c}`} />)}
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40 ml-auto">Palette</span>
                </div>
            </div>
        </Frame>
    );
}

/* ---------- Video editing: timeline with a moving playhead ---------- */
export function VideoTimeline({ className = '' }) {
    const pos = useLoop(20, 250);
    return (
        <Frame className={className}>
            <div className="p-5 flex flex-col gap-4">
                <div className="aspect-video rounded-xl bg-ink/10 flex items-center justify-center relative overflow-hidden">
                    <span className="w-12 h-12 rounded-full bg-brand flex items-center justify-center">
                        <span className="ml-1 w-0 h-0 border-y-[7px] border-y-transparent border-l-[11px] border-l-onaccent" />
                    </span>
                    <span className="absolute bottom-2 left-3 font-mono text-[10px] text-ink/50">00:{String(pos).padStart(2, '0')}</span>
                </div>
                <div className="relative flex flex-col gap-1.5">
                    <div className="flex gap-1.5 h-5"><span className="w-1/4 rounded bg-accent" /><span className="w-2/5 rounded bg-flame" /><span className="flex-1 rounded bg-peach" /></div>
                    <div className="flex gap-1.5 h-5"><span className="w-1/6 rounded bg-ink/15" /><span className="w-1/2 rounded bg-ink/25" /><span className="flex-1 rounded bg-ink/15" /></div>
                    <div className="flex gap-1.5 h-3"><span className="w-full rounded bg-ink/10" /></div>
                    <span className="absolute -top-1 -bottom-1 w-0.5 bg-ink transition-[left] duration-200 ease-linear" style={{ left: `${pos * 5}%` }} />
                </div>
            </div>
        </Frame>
    );
}

/* ---------- Content writing: a document being written ---------- */
export function WritingDoc({ className = '' }) {
    const lines = useLoop(7, 700);
    const widths = ['w-full', 'w-11/12', 'w-4/5', 'w-full', 'w-2/3'];
    return (
        <Frame className={className}>
            <div className="p-5 flex flex-col gap-3 min-h-[230px]">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Blog draft</span>
                <span className="font-display font-bold text-xl text-ink leading-tight">How to choose the right chatbot for your clinic</span>
                {widths.map((w, i) => (
                    <span key={i} className={`h-2 rounded bg-ink/20 transition-all duration-500 origin-left ${w} ${i < lines ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />
                ))}
                <div className="mt-auto flex gap-2">
                    {['SEO', 'AI search', '1,500 words'].map((t) => <span key={t} className="font-mono text-[10px] uppercase tracking-widest text-ink/60 border border-ink/15 rounded-full px-2.5 py-1">{t}</span>)}
                </div>
            </div>
        </Frame>
    );
}

/* ---------- Social media: a month of scheduled posts ---------- */
export function SocialCalendar({ className = '' }) {
    const today = useLoop(21, 450);
    const planned = [1, 3, 4, 6, 8, 10, 11, 13, 15, 17, 18, 20];
    return (
        <Frame className={className}>
            <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <span className="font-display font-bold text-ink">Content calendar</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-accent">{planned.filter((d) => d <= today).length} posted</span>
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                    {Array.from({ length: 21 }, (_, d) => {
                        const isPlanned = planned.includes(d);
                        const done = isPlanned && d <= today;
                        return <span key={d} className={`aspect-square rounded-lg transition-colors duration-300 ${done ? 'bg-brand' : isPlanned ? 'bg-accent/25' : 'bg-ink/10'}`} style={{ borderRadius: 8 }} />;
                    })}
                </div>
            </div>
        </Frame>
    );
}

const visuals = {
    chat: ChatDemo, flow: FlowDiagram, agent: AgentTasks, browser: BrowserMock, phone: PhoneMock,
    design: DesignBoard, video: VideoTimeline, writing: WritingDoc, social: SocialCalendar,
};

export default function AIVisual({ type, className }) {
    const Visual = visuals[type];
    return Visual ? <Visual className={className} /> : null;
}
