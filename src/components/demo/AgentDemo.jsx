import React, { useEffect, useState } from 'react';
import { Check, Loader2, Play, RotateCcw } from 'lucide-react';

// A day's raw enquiries for the demo agency. All people and messages are fictional.
const LEADS = [
    { name: 'Rohan M.', via: 'Website form', msg: 'Want 2 BHK in Andheri West. Budget 2.2 Cr. Home loan approved. Can visit Saturday.', budget: true, area: true, visit: true, ready: true },
    { name: 'Sneha K.', via: 'WhatsApp', msg: 'Rent for 1 BHK in Powai? Joining new job on the 1st, need to move this month.', budget: false, area: true, visit: false, ready: true },
    { name: 'Imran S.', via: 'Instagram DM', msg: 'Nice flat. Price?', budget: false, area: false, visit: false, ready: false },
    { name: 'Priya & Arjun', via: 'Website form', msg: '3 BHK in Chembur or Bandra, up to 3.5 Cr. Selling our current flat first, maybe 4 to 5 months.', budget: true, area: true, visit: false, ready: false },
    { name: 'Deepak T.', via: 'Phone (missed)', msg: 'Missed call at 9:40 PM. No message left.', budget: false, area: false, visit: false, ready: false },
    { name: 'Farah N.', via: 'WhatsApp', msg: 'Need office for 20 to 25 people in Andheri East, budget 2 lakh per month. Can we see it tomorrow?', budget: true, area: true, visit: true, ready: true },
    { name: 'Kunal R.', via: 'Website form', msg: 'Just checking rates in Thane for investment. Not in a hurry.', budget: false, area: true, visit: false, ready: false },
];

// The agent's ranking: a transparent score from what each message actually says.
const score = (l) => (l.visit ? 4 : 0) + (l.ready ? 3 : 0) + (l.budget ? 2 : 0) + (l.area ? 1 : 0);
const reason = (l) => [l.visit && 'asked for a visit', l.ready && 'ready to move now', l.budget && 'budget given', !l.area && !l.budget && 'no details yet'].filter(Boolean).join(', ');
const action = (l) => {
    const s = score(l);
    if (s >= 8) return 'Call today and confirm the visit';
    if (s >= 4) return 'Reply now with 2 matching homes';
    if (s >= 2) return 'Add to weekly follow-up';
    return l.via.startsWith('Phone') ? 'Send a WhatsApp: "Sorry we missed you"' : 'Ask budget and area';
};
const tier = (l) => (score(l) >= 8 ? 'Hot' : score(l) >= 4 ? 'Warm' : 'Cold');

const STEPS = ['Reading 7 new enquiries', 'Checking each one against today\'s listings', 'Ranking by how ready the buyer is', 'Drafting a reply for the top lead'];

export default function AgentDemo() {
    const [step, setStep] = useState(-1); // -1 idle, 0..3 working, 4 done
    const [approved, setApproved] = useState(false);
    const ranked = [...LEADS].sort((a, b) => score(b) - score(a));
    const top = ranked[0];
    const done = step >= STEPS.length;

    useEffect(() => {
        if (step < 0 || done) return;
        const id = setTimeout(() => setStep((s) => s + 1), 1000);
        return () => clearTimeout(id);
    }, [step, done]);

    const run = () => { setApproved(false); setStep(0); };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Inbox */}
            <div className="glass p-6">
                <div className="flex items-center justify-between mb-5">
                    <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent">This morning's inbox</p>
                    <span className="font-mono text-xs text-ink/40">7 unread</span>
                </div>
                <ul className="flex flex-col gap-2.5">
                    {LEADS.map((l) => (
                        <li key={l.name} className="rounded-2xl bg-ink/5 border border-ink/10 px-4 py-3">
                            <span className="flex items-baseline justify-between gap-3">
                                <span className="font-display font-bold text-ink">{l.name}</span>
                                <span className="font-mono text-xs text-ink/40 shrink-0">{l.via}</span>
                            </span>
                            <span className="block text-ink/60 text-sm font-light leading-snug mt-1">{l.msg}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Agent */}
            <div className="glass p-6 flex flex-col">
                <div className="flex items-center justify-between mb-5">
                    <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent">Sales assistant agent</p>
                    {done && <button onClick={run} className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink/60 hover:text-accent transition-colors"><RotateCcw className="w-3.5 h-3.5" /> Run again</button>}
                </div>

                {step < 0 && (
                    <div className="flex-1 flex flex-col items-start justify-center gap-5">
                        <p className="font-display font-bold text-2xl tracking-tight leading-tight">Goal: "Tell me who to contact first today."</p>
                        <p className="text-ink/60 font-light">The agent reads every enquiry, works out who is serious, and prepares the first reply for you to approve.</p>
                        <button onClick={run} className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-brand text-onaccent font-bold uppercase tracking-widest text-sm hover:brightness-110 transition"><Play className="w-4 h-4" fill="currentColor" /> Run the agent</button>
                    </div>
                )}

                {step >= 0 && (
                    <ul className="flex flex-col gap-2 mb-5">
                        {STEPS.map((s, i) => (
                            <li key={s} className={`flex items-center gap-3 text-sm transition-opacity ${i > step ? 'opacity-30' : ''}`}>
                                <span className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center ${i < step ? 'bg-brand text-onaccent' : 'border border-ink/25 text-accent'}`}>
                                    {i < step ? <Check className="w-3 h-3" strokeWidth={3} /> : i === step ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                                </span>
                                <span className="text-ink">{s}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {done && (
                    <>
                        <p className="font-mono text-xs uppercase tracking-wider text-ink/50 mb-3">Today's call list</p>
                        <ol className="flex flex-col gap-2 mb-5">
                            {ranked.map((l, i) => (
                                <li key={l.name} className="flex items-start gap-3 rounded-2xl bg-ink/5 border border-ink/10 px-3.5 py-2.5">
                                    <span className="font-mono text-accent text-[13px] font-bold pt-0.5 w-5 shrink-0">{i + 1}</span>
                                    <span className="flex-1 min-w-0">
                                        <span className="flex items-center gap-2">
                                            <span className="font-display font-bold text-ink">{l.name}</span>
                                            <span className={`font-mono text-xs uppercase tracking-wider rounded-2xl px-2 py-0.5 ${tier(l) === 'Hot' ? 'bg-brand text-onaccent font-bold' : tier(l) === 'Warm' ? 'border border-accent/50 text-accent' : 'border border-ink/15 text-ink/50'}`}>{tier(l)}</span>
                                        </span>
                                        <span className="block text-ink text-sm mt-0.5">{action(l)}</span>
                                        <span className="block text-ink/45 text-xs mt-0.5">Why: {reason(l)}</span>
                                    </span>
                                </li>
                            ))}
                        </ol>

                        <div className="rounded-2xl border border-accent/40 bg-accent/10 p-4">
                            <p className="font-mono text-xs uppercase tracking-wider text-accent mb-2">Draft reply to {top.name} · waiting for your approval</p>
                            <p className="text-ink text-sm leading-relaxed mb-3">Hi {top.name.split(' ')[0]}, thank you for your enquiry. The 2 BHK with open kitchen in Andheri West is 720 sq ft on the 9th floor, at ₹2.15 Cr, inside your budget. We can show it this Saturday at 11:00 AM or 4:00 PM. Which works for you?</p>
                            {approved
                                ? <p className="inline-flex items-center gap-2 text-sm text-ink"><Check className="w-4 h-4 text-accent" /> Approved. In a real setup this goes out on WhatsApp now.</p>
                                : <button onClick={() => setApproved(true)} className="px-5 py-2.5 rounded-2xl bg-brand text-onaccent font-bold uppercase tracking-widest text-xs hover:brightness-110 transition">Approve and send</button>}
                        </div>
                    </>
                )}

                <p className="text-ink/40 text-sm mt-auto pt-5">Simulation with made-up enquiries. Nothing is sent.</p>
            </div>
        </div>
    );
}
