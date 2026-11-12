import React, { useState } from 'react';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { calendar, captions } from '../../data/demoContent';
import { useDemoListings } from '../../lib/useDemoListings';

// Urban Nest brand colours (the demo agency's, not CREATIIX's)
const GREEN = '#0F3D3E', GOLD = '#C8963E', SAND = '#F6F1E9', INK = '#16211F';
const serif = { fontFamily: 'Georgia, "Times New Roman", serif' };
const WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Brand = ({ dark }) => <span style={{ ...serif, color: dark ? SAND : GREEN }} className="text-[0.8em] font-bold tracking-wide">Urban Nest</span>;
const Tag = ({ children, bg = GOLD, color = INK }) => <span className="self-start text-[0.55em] font-bold uppercase tracking-widest px-[0.9em] py-[0.35em] rounded-full" style={{ background: bg, color }}>{children}</span>;

// The nine designed posts. Sizes use em so each post scales with its container's font size.
function Post({ n, listings }) {
    const l = (id) => listings?.find((x) => x.id === id);
    const frame = "relative w-full aspect-square overflow-hidden flex flex-col p-[1.4em] select-none";
    const photo = (id, label, price, sub) => (
        <div className={frame} style={{ background: INK, color: '#fff' }}>
            {l(id) && <img src={l(id).img} alt="" className="absolute inset-0 w-full h-full object-cover" />}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(15,61,62,.15) 30%, rgba(15,61,62,.95) 100%)' }} />
            <div className="relative flex justify-between items-start"><Tag>{label}</Tag><Brand dark /></div>
            <div className="relative mt-auto">
                <p style={serif} className="text-[1.7em] font-bold leading-none">{price}</p>
                <p className="text-[0.8em] mt-[0.4em] opacity-90">{sub}</p>
            </div>
        </div>
    );
    switch (n) {
        case 1: return photo('un-101', 'Just listed', '₹2.15 Cr', '2 BHK · Andheri West · 720 sq ft');
        case 5: return photo('un-103', 'For rent', '₹48,000 / month', '1 BHK · Powai · Fully furnished');
        case 2: return (
            <div className={frame} style={{ background: SAND, color: INK }}>
                <div className="flex justify-between"><Tag bg={GREEN} color="#fff">Buyer tip</Tag><Brand /></div>
                <p style={serif} className="text-[1.75em] font-bold leading-[1.05] my-auto">Carpet area <span style={{ color: GOLD }}>≠</span> built-up area.</p>
                <p className="text-[0.75em] opacity-70">Compare homes on carpet area only.</p>
            </div>
        );
        case 3: return (
            <div className={frame} style={{ background: GREEN, color: SAND }}>
                <div className="flex justify-between"><Tag>Area guide</Tag><Brand dark /></div>
                <p style={serif} className="text-[2em] font-bold leading-none mt-auto">Why Powai?</p>
                <ul className="text-[0.75em] mt-[0.8em] space-y-[0.3em] opacity-90"><li>— Lake on your evening walk</li><li>— Offices ten minutes away</li><li>— Cafes you can reach on foot</li></ul>
            </div>
        );
        case 4: return (
            <div className={frame} style={{ background: GOLD, color: INK }}>
                <div className="flex justify-between"><Tag bg={INK} color="#fff">Swipe →</Tag><Brand /></div>
                <p style={serif} className="text-[4.2em] font-bold leading-none mt-auto">7</p>
                <p style={serif} className="text-[1.25em] font-bold leading-tight">checks before you pay the token</p>
            </div>
        );
        case 6: return (
            <div className="relative w-full aspect-square overflow-hidden flex flex-col select-none">
                <div className="flex-1 p-[1.4em] flex flex-col justify-center" style={{ background: INK, color: SAND }}><Tag bg="#fff" color={INK}>Myth</Tag><p style={serif} className="text-[1.15em] font-bold leading-tight mt-[0.6em]">"You have to call to know the price."</p></div>
                <div className="flex-1 p-[1.4em] flex flex-col justify-center" style={{ background: SAND, color: INK }}><Tag bg={GREEN} color="#fff">Fact</Tag><p style={serif} className="text-[1.15em] font-bold leading-tight mt-[0.6em]">Every home on our site shows it.</p></div>
            </div>
        );
        case 7: return (
            <div className={frame} style={{ background: SAND, color: INK }}>
                <div className="flex justify-between"><Tag>This weekend</Tag><Brand /></div>
                <p style={serif} className="text-[1.6em] font-bold leading-[1.05] mt-auto">Open visits in Thane West</p>
                <div className="flex gap-[0.5em] mt-[0.8em] text-[0.7em] font-bold">{['Sat 11–5', 'Sun 11–5'].map((d) => <span key={d} className="px-[0.9em] py-[0.5em] rounded-full text-white" style={{ background: GREEN }}>{d}</span>)}</div>
            </div>
        );
        case 8: return (
            <div className={frame} style={{ background: GREEN, color: SAND }}>
                <div className="flex justify-between"><Tag>Poll</Tag><Brand dark /></div>
                <p style={serif} className="text-[1.5em] font-bold leading-tight my-auto">In Mumbai this year, would you…</p>
                <div className="grid grid-cols-2 gap-[0.5em] text-[0.85em] font-bold text-center"><span className="py-[0.7em] rounded-full" style={{ background: GOLD, color: INK }}>Buy</span><span className="py-[0.7em] rounded-full" style={{ background: SAND, color: INK }}>Rent</span></div>
            </div>
        );
        default: return (
            <div className={frame} style={{ background: INK, color: SAND }}>
                <Brand dark />
                <p style={serif} className="text-[1.55em] font-bold leading-[1.1] my-auto">From the first visit <span style={{ color: GOLD }}>to the keys.</span></p>
                <p className="text-[0.7em] opacity-70">One advisor. The whole way.</p>
            </div>
        );
    }
}

export default function SocialDemo() {
    const listings = useDemoListings();
    const [selected, setSelected] = useState(1);
    const byDay = Object.fromEntries(calendar.map((c) => [c.day, c]));
    const [caption, tags] = captions[selected];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Calendar */}
            <div className="glass p-5 md:p-6 lg:col-span-7">
                <div className="flex items-center justify-between mb-4">
                    <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent">One month, planned</p>
                    <span className="font-mono text-xs text-ink/40">{calendar.length} posts</span>
                </div>
                <div className="grid grid-cols-7 gap-1.5 text-center font-mono text-xs uppercase tracking-wider text-ink/40 mb-1.5">{WEEK.map((d) => <span key={d}>{d}</span>)}</div>
                <div className="grid grid-cols-7 gap-1.5">
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                        const item = byDay[day];
                        const on = item?.post === selected;
                        const cls = "aspect-square rounded-2xl p-1.5 md:p-2 text-left flex flex-col overflow-hidden";
                        if (!item) return <div key={day} className={`${cls} bg-ink/5`}><span className="font-mono text-xs text-ink/30">{day}</span></div>;
                        return (
                            <button
                                key={day}
                                disabled={!item.post}
                                onClick={() => setSelected(item.post)}
                                title={item.title}
                                className={`${cls} transition-colors ${on ? 'bg-brand text-onaccent' : item.post ? 'bg-accent/15 border border-accent/30 hover:bg-accent/25 text-ink' : 'bg-ink/10 text-ink/70'}`}
                            >
                                <span className="font-mono text-xs opacity-70">{day}</span>
                                <span className="mt-auto font-bold text-[10px] md:text-xs leading-tight uppercase tracking-wide truncate w-full">{item.type}</span>
                                <span className="hidden md:block text-[11px] leading-tight opacity-80 truncate w-full">{item.title}</span>
                            </button>
                        );
                    })}
                </div>
                <p className="text-ink/40 text-sm mt-4">Highlighted days have a designed post. Tap one to preview it.</p>
            </div>

            {/* Selected post, as it would look in the feed */}
            <div className="glass p-4 lg:col-span-5">
                <div className="flex items-center gap-2.5 px-1 pb-3">
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: GREEN, color: GOLD }}>U</span>
                    <span className="font-display font-bold text-sm text-ink">urbannest.demo</span>
                </div>
                <div className="rounded-2xl overflow-hidden text-[20px] md:text-[22px]"><Post n={selected} listings={listings} /></div>
                <div className="flex gap-4 px-1 pt-3 text-ink"><Heart className="w-5 h-5" /><MessageCircle className="w-5 h-5" /><Send className="w-5 h-5" /></div>
                <p className="text-ink/80 text-sm leading-relaxed px-1 pt-2">{caption}</p>
                <p className="text-accent text-sm px-1 pt-1">{tags}</p>
            </div>

            {/* The grid */}
            <div className="glass p-5 md:p-6 lg:col-span-12">
                <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent mb-4">The nine posts together</p>
                <div className="grid grid-cols-3 gap-1.5 md:gap-2 max-w-3xl mx-auto">
                    {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
                        <button key={n} onClick={() => setSelected(n)} aria-label={`Preview post ${n}`} className={`rounded-2xl overflow-hidden text-[9px] sm:text-[13px] md:text-[15px] ring-offset-2 ring-offset-transparent ${selected === n ? 'ring-2 ring-accent' : ''}`}>
                            <Post n={n} listings={listings} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
