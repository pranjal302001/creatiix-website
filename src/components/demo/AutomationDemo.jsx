import React, { useEffect, useState } from 'react';
import { Check, CheckCheck, Database, FileText, Bell, MessageCircle, Zap, RotateCcw } from 'lucide-react';

const AREAS = ['Andheri West', 'Bandra West', 'Powai', 'Thane West', 'Lower Parel'];
const BUDGETS = ['Under ₹1.5 Cr', '₹1.5 to 3 Cr', 'Above ₹3 Cr', 'Not sure yet'];

// What the automation does with one enquiry, step by step.
// This is a simulation in the browser: nothing is saved and no message is sent.
const buildSteps = (lead) => {
    const hot = lead.budget !== 'Not sure yet';
    const first = lead.name.split(' ')[0];
    return [
        { icon: FileText, title: 'Enquiry received', detail: `From the website form at ${lead.time}`, after: '0 sec' },
        { icon: Zap, title: 'AI reads and tags the lead', detail: `${lead.deal} · ${lead.area} · ${lead.budget} → ${hot ? 'Hot lead' : 'Warm lead'}`, after: '2 sec' },
        { icon: Database, title: 'Saved to the lead sheet', detail: 'New row added, advisor assigned', after: '3 sec', sheet: true },
        { icon: MessageCircle, title: 'WhatsApp reply sent', detail: 'Personal reply with matching homes', after: '5 sec', chat: { time: lead.time, text: `Hi ${first}, thanks for contacting Urban Nest! We have homes to ${lead.deal.toLowerCase()} in ${lead.area} that match what you asked for. Shall we line up visits this weekend?` } },
        { icon: Bell, title: 'Visit reminder scheduled', detail: 'Goes out the evening before the visit', after: 'Day before', chat: { time: 'Fri 6:00 PM', text: `Reminder: your visit in ${lead.area} is tomorrow at 11:00 AM. Reply 1 to confirm or 2 to change the time.` } },
        { icon: CheckCheck, title: 'Follow-up after the visit', detail: 'Asks for feedback, then alerts the advisor', after: 'Day after', chat: { time: 'Sun 10:00 AM', text: `Hi ${first}, how did you like the homes yesterday? Tell us which one you preferred and we will take it forward.` } },
    ];
};

export default function AutomationDemo() {
    const [form, setForm] = useState({ name: '', deal: 'Buy', area: AREAS[0], budget: BUDGETS[1] });
    const [lead, setLead] = useState(null);
    const [done, setDone] = useState(0);

    const steps = lead ? buildSteps(lead) : [];

    // Reveal one step at a time
    useEffect(() => {
        if (!lead || done >= steps.length) return;
        const id = setTimeout(() => setDone((d) => d + 1), 1100);
        return () => clearTimeout(id);
    }, [lead, done, steps.length]);

    const start = (e) => {
        e.preventDefault();
        const time = new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' });
        setLead({ ...form, name: form.name.trim() || 'Rohan', time });
        setDone(0);
    };
    const restart = () => { setLead(null); setDone(0); };

    const field = "w-full bg-ink/10 border border-ink/15 rounded-2xl px-4 py-2.5 text-ink focus:outline-none focus:border-accent";
    const label = "block font-mono text-xs uppercase tracking-wider text-ink/50 mb-2";
    const chats = steps.slice(0, done).filter((s) => s.chat).map((s) => s.chat);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* 1. The trigger */}
            <form onSubmit={start} className="glass p-6 lg:col-span-4 flex flex-col gap-4">
                <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent">1 · Send an enquiry</p>
                <div><label className={label} htmlFor="au-name">Your name</label><input id="au-name" className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Rohan" maxLength={30} /></div>
                <div className="grid grid-cols-2 gap-3">
                    <div><label className={label} htmlFor="au-deal">Looking to</label><select id="au-deal" className={field} value={form.deal} onChange={(e) => setForm({ ...form, deal: e.target.value })}><option>Buy</option><option>Rent</option></select></div>
                    <div><label className={label} htmlFor="au-area">Area</label><select id="au-area" className={field} value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })}>{AREAS.map((a) => <option key={a}>{a}</option>)}</select></div>
                </div>
                <div><label className={label} htmlFor="au-budget">Budget</label><select id="au-budget" className={field} value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>{BUDGETS.map((b) => <option key={b}>{b}</option>)}</select></div>
                {lead
                    ? <button type="button" onClick={restart} className="mt-auto inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl glass text-ink font-bold uppercase tracking-widest text-xs hover:text-accent transition-colors"><RotateCcw className="w-4 h-4" /> Try again</button>
                    : <button className="mt-auto py-3.5 rounded-2xl bg-brand text-onaccent font-bold uppercase tracking-widest text-xs hover:brightness-110 transition">Send enquiry</button>}
                <p className="text-ink/40 text-sm">Simulation only. Nothing is saved or sent.</p>
            </form>

            {/* 2. The workflow */}
            <div className="glass p-6 lg:col-span-4">
                <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent mb-5">2 · What happens by itself</p>
                {!lead && <p className="text-ink/50 font-light">Send the enquiry to watch each step run.</p>}
                <ol className="flex flex-col">
                    {steps.map((s, i) => {
                        const Icon = s.icon;
                        const on = i < done;
                        return (
                            <li key={s.title} className={`flex gap-3 pb-5 transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-25'}`}>
                                <span className="flex flex-col items-center">
                                    <span className={`w-9 h-9 shrink-0 rounded-2xl flex items-center justify-center ${on ? 'bg-brand text-onaccent' : 'bg-ink/10 text-ink/50'}`}>
                                        {on ? <Icon className="w-4 h-4" /> : <span className="w-1.5 h-1.5 rounded-full bg-ink/40" />}
                                    </span>
                                    {i < steps.length - 1 && <span className={`w-px flex-1 mt-2 ${on ? 'bg-accent' : 'bg-ink/15'}`} />}
                                </span>
                                <span className="flex-1 pt-1">
                                    <span className="flex items-baseline justify-between gap-2">
                                        <span className="font-display font-bold text-ink leading-tight">{s.title}</span>
                                        <span className="font-mono text-xs text-ink/40 shrink-0">{s.after}</span>
                                    </span>
                                    <span className="block text-ink/60 text-sm font-light mt-0.5">{s.detail}</span>
                                </span>
                            </li>
                        );
                    })}
                </ol>
            </div>

            {/* 3. What the customer and the team see */}
            <div className="lg:col-span-4 flex flex-col gap-5">
                <div className="glass p-5 flex-1">
                    <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent mb-4">3 · The customer's WhatsApp</p>
                    <div className="rounded-2xl bg-[#0b141a] p-3 min-h-[230px] flex flex-col gap-2 justify-end">
                        {chats.length === 0 && <p className="text-white/30 text-sm text-center my-auto">Messages will appear here</p>}
                        {chats.map((c) => (
                            <div key={c.text} className="max-w-[92%] self-start bg-[#202c33] text-white/90 text-sm leading-snug rounded-2xl rounded-tl-sm px-3 py-2">
                                {c.text}
                                <span className="flex items-center justify-end gap-1 text-[11px] text-white/40 mt-1">{c.time} <Check className="w-3 h-3" /></span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="glass p-5">
                    <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent mb-3">The team's lead sheet</p>
                    <div className="grid grid-cols-4 gap-px text-sm rounded-2xl overflow-hidden bg-ink/10">
                        {['Name', 'Need', 'Budget', 'Tag'].map((h) => <span key={h} className="bg-background/60 px-2.5 py-2 font-mono text-xs uppercase tracking-wider text-ink/50">{h}</span>)}
                        {lead && done >= 3
                            ? [lead.name, `${lead.deal}, ${lead.area}`, lead.budget, lead.budget === 'Not sure yet' ? 'Warm' : 'Hot'].map((v, i) => <span key={i} className={`bg-background/60 px-2.5 py-2 truncate ${i === 3 ? 'text-accent font-bold' : 'text-ink'}`}>{v}</span>)
                            : [0, 1, 2, 3].map((i) => <span key={i} className="bg-background/60 px-2.5 py-2 text-ink/25">—</span>)}
                    </div>
                </div>
            </div>
        </div>
    );
}
