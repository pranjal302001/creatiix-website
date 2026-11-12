import React, { useEffect, useState } from 'react';
import { useDemoListings } from '../../lib/useDemoListings';
import { ArrowLeft, Bell, CalendarCheck, Check, Heart, Home, MapPin, Search } from 'lucide-react';

// Clickable prototype of the Urban Nest buyer app (fictional demo brand).
// It runs in the browser: saved homes and visits live only in this component.

const GREEN = '#0F3D3E', GOLD = '#C8963E', SAND = '#F6F1E9', INK = '#16211F', MUTED = '#5C6B68', LINE = '#E4DCCF';
const DAYS = ['Sat', 'Sun', 'Mon'];
const TIMES = ['11:00 AM', '1:00 PM', '4:00 PM', '6:00 PM'];
const ALERTS = [
    { title: 'New in Andheri West', text: 'A 2 BHK that matches your search was just listed.', when: '2 min ago', id: 'un-101' },
    { title: 'Price drop', text: 'The garden-facing home in Thane West is now lower.', when: '1 hr ago', id: 'un-104' },
    { title: 'Visit tomorrow', text: 'Reminder: your advisor will meet you at the gate.', when: 'Yesterday' },
];

const Card = ({ l, saved, onOpen, onSave }) => (
    <div className="rounded-2xl overflow-hidden bg-white" style={{ border: `1px solid ${LINE}` }}>
        <button onClick={() => onOpen(l.id)} className="block w-full text-left">
            <img src={l.img} alt="" className="w-full h-28 object-cover" />
        </button>
        <div className="p-3 flex items-start gap-2">
            <button onClick={() => onOpen(l.id)} className="flex-1 text-left min-w-0">
                <span className="block font-bold text-[15px]" style={{ color: GREEN }}>{globalThis.formatPrice(l)}</span>
                <span className="block text-[13px] truncate" style={{ color: INK }}>{l.title}</span>
                <span className="block text-xs" style={{ color: MUTED }}>{l.area} · {globalThis.sizeLabel(l)}</span>
            </button>
            <button onClick={() => onSave(l.id)} aria-label={saved ? 'Remove from saved' : 'Save home'} className="p-1.5">
                <Heart className="w-5 h-5" style={{ color: saved ? GOLD : MUTED }} fill={saved ? GOLD : 'none'} />
            </button>
        </div>
    </div>
);

export default function AppPrototype() {
    const listings = useDemoListings();
    const [tab, setTab] = useState('home');
    const [openId, setOpenId] = useState(null);
    const [deal, setDeal] = useState('Buy');
    const [saved, setSaved] = useState(['un-102']);
    const [visits, setVisits] = useState([]);
    const [slot, setSlot] = useState({ day: DAYS[0], time: TIMES[0] });
    const [toast, setToast] = useState('');

    useEffect(() => {
        if (!toast) return;
        const id = setTimeout(() => setToast(''), 2200);
        return () => clearTimeout(id);
    }, [toast]);

    if (!listings) return <div className="h-[680px] flex items-center justify-center text-ink/50">Loading the app…</div>;

    const byId = (id) => listings.find((l) => l.id === id);
    const open = openId && byId(openId);
    const toggleSave = (id) => {
        const has = saved.includes(id);
        setSaved(has ? saved.filter((s) => s !== id) : [...saved, id]);
        setToast(has ? 'Removed from saved' : 'Saved to your list');
    };
    const book = () => {
        setVisits([...visits.filter((v) => v.id !== open.id), { id: open.id, ...slot }]);
        setToast('Visit requested');
        setOpenId(null);
        setTab('visits');
    };
    const go = (t) => { setOpenId(null); setTab(t); };

    const tabs = [['home', Home, 'Home'], ['saved', Heart, 'Saved'], ['visits', CalendarCheck, 'Visits'], ['alerts', Bell, 'Alerts']];
    const Title = ({ children }) => <h3 className="text-xl font-bold mb-3" style={{ color: INK, fontFamily: 'Georgia, serif' }}>{children}</h3>;
    const Empty = ({ children }) => <p className="text-sm text-center py-10" style={{ color: MUTED }}>{children}</p>;

    return (
        <div className="mx-auto w-[340px] max-w-full rounded-[2.6rem] p-3 shadow-2xl" style={{ background: '#111', borderRadius: 42 }}>
            <div className="relative overflow-hidden flex flex-col h-[680px]" style={{ background: SAND, borderRadius: 32, color: INK, fontFamily: 'Outfit, sans-serif' }}>
                {/* status bar */}
                <div className="flex items-center justify-between px-6 pt-3 pb-1 text-xs font-semibold shrink-0"><span>9:41</span><span className="w-20 h-5 rounded-full" style={{ background: '#111' }} /><span>5G</span></div>

                {/* screen */}
                <div className="flex-1 overflow-y-auto px-4 pb-4" data-lenis-prevent>
                    {open ? (
                        <>
                            <button onClick={() => setOpenId(null)} className="flex items-center gap-1.5 text-sm font-semibold py-2" style={{ color: GREEN }}><ArrowLeft className="w-4 h-4" /> Back</button>
                            <div className="relative rounded-2xl overflow-hidden" style={{ borderRadius: 16 }}>
                                <img src={open.img} alt="" className="w-full h-44 object-cover" />
                                <button onClick={() => toggleSave(open.id)} aria-label="Save home" className="absolute top-2 right-2 w-9 h-9 rounded-full bg-white flex items-center justify-center">
                                    <Heart className="w-5 h-5" style={{ color: saved.includes(open.id) ? GOLD : MUTED }} fill={saved.includes(open.id) ? GOLD : 'none'} />
                                </button>
                            </div>
                            <p className="text-2xl font-bold mt-3" style={{ color: GREEN }}>{globalThis.formatPrice(open)}</p>
                            <p className="font-semibold">{open.title}</p>
                            <p className="text-sm flex items-center gap-1" style={{ color: MUTED }}><MapPin className="w-3.5 h-3.5" /> {open.area}, Mumbai</p>
                            <div className="grid grid-cols-3 gap-2 my-3 text-center text-xs">
                                {[[globalThis.sizeLabel(open), 'Size'], [`${open.sqft} sq ft`, 'Carpet'], [open.floor.split(' ')[0], 'Floor']].map(([v, k]) => (
                                    <div key={k} className="bg-white py-2" style={{ border: `1px solid ${LINE}`, borderRadius: 12 }}><b className="block text-sm">{v}</b><span style={{ color: MUTED }}>{k}</span></div>
                                ))}
                            </div>
                            <p className="text-sm leading-snug" style={{ color: MUTED }}>{open.desc}</p>
                            <p className="font-semibold mt-4 mb-2">Book a visit</p>
                            <div className="flex gap-2 mb-2">{DAYS.map((d) => <button key={d} onClick={() => setSlot((v) => ({ ...v, day: d }))} className="flex-1 py-2 text-sm font-semibold" style={{ borderRadius: 12, background: slot.day === d ? GREEN : '#fff', color: slot.day === d ? '#fff' : INK, border: `1px solid ${LINE}` }}>{d}</button>)}</div>
                            <div className="grid grid-cols-2 gap-2">{TIMES.map((t) => <button key={t} onClick={() => setSlot((v) => ({ ...v, time: t }))} className="py-2 text-sm" style={{ borderRadius: 12, background: slot.time === t ? GOLD : '#fff', color: INK, border: `1px solid ${LINE}`, fontWeight: slot.time === t ? 700 : 400 }}>{t}</button>)}</div>
                            <button onClick={book} className="w-full mt-3 py-3 font-bold text-white" style={{ background: GREEN, borderRadius: 14 }}>Request visit · {slot.day}, {slot.time}</button>
                        </>
                    ) : tab === 'home' ? (
                        <>
                            <p className="text-sm mt-2" style={{ color: MUTED }}>Good morning</p>
                            <Title>Find your next home</Title>
                            <div className="flex items-center gap-2 bg-white px-3 py-2.5 mb-3 text-sm" style={{ border: `1px solid ${LINE}`, borderRadius: 14, color: MUTED }}><Search className="w-4 h-4" /> Area, budget or BHK</div>
                            <div className="flex p-1 mb-3 bg-white" style={{ borderRadius: 999, border: `1px solid ${LINE}` }}>
                                {['Buy', 'Rent'].map((d) => <button key={d} onClick={() => setDeal(d)} className="flex-1 py-1.5 text-sm font-semibold" style={{ borderRadius: 999, background: deal === d ? GREEN : 'transparent', color: deal === d ? '#fff' : MUTED }}>{d}</button>)}
                            </div>
                            <div className="flex flex-col gap-3">
                                {listings.filter((l) => l.deal === deal).map((l) => <Card key={l.id} l={l} saved={saved.includes(l.id)} onOpen={setOpenId} onSave={toggleSave} />)}
                            </div>
                        </>
                    ) : tab === 'saved' ? (
                        <>
                            <div className="mt-2" /><Title>Saved homes</Title>
                            {saved.length === 0 ? <Empty>Tap the heart on any home to save it here.</Empty> : <div className="flex flex-col gap-3">{saved.map((id) => <Card key={id} l={byId(id)} saved onOpen={setOpenId} onSave={toggleSave} />)}</div>}
                        </>
                    ) : tab === 'visits' ? (
                        <>
                            <div className="mt-2" /><Title>Your visits</Title>
                            {visits.length === 0 ? <Empty>No visits yet. Open a home and pick a day and time.</Empty> : visits.map((v) => (
                                <div key={v.id} className="bg-white p-3 mb-3 flex gap-3 items-center" style={{ border: `1px solid ${LINE}`, borderRadius: 16 }}>
                                    <span className="w-12 h-12 flex flex-col items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: GREEN, borderRadius: 12 }}>{v.day}</span>
                                    <span className="flex-1 min-w-0"><b className="block text-sm truncate">{byId(v.id).title}</b><span className="text-xs" style={{ color: MUTED }}>{byId(v.id).area} · {v.time}</span></span>
                                    <span className="text-[11px] font-bold px-2 py-1" style={{ background: '#FBF1DC', color: '#8A6418', borderRadius: 999 }}>Requested</span>
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            <div className="mt-2" /><Title>Alerts</Title>
                            {ALERTS.map((a) => (
                                <button key={a.title} onClick={() => a.id && setOpenId(a.id)} className="w-full text-left bg-white p-3 mb-3 flex gap-3" style={{ border: `1px solid ${LINE}`, borderRadius: 16 }}>
                                    <span className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: SAND, borderRadius: 999 }}><Bell className="w-4 h-4" style={{ color: GREEN }} /></span>
                                    <span className="flex-1"><b className="block text-sm">{a.title}</b><span className="block text-xs leading-snug" style={{ color: MUTED }}>{a.text}</span><span className="text-[11px]" style={{ color: MUTED }}>{a.when}</span></span>
                                </button>
                            ))}
                        </>
                    )}
                </div>

                {/* toast */}
                {toast && <div className="absolute left-1/2 -translate-x-1/2 bottom-20 flex items-center gap-2 text-white text-sm font-semibold px-4 py-2 whitespace-nowrap" style={{ background: INK, borderRadius: 999 }}><Check className="w-4 h-4" style={{ color: GOLD }} /> {toast}</div>}

                {/* tab bar */}
                <div className="shrink-0 flex bg-white pt-2 pb-3" style={{ borderTop: `1px solid ${LINE}` }}>
                    {tabs.map(([key, Icon, label]) => {
                        const on = !open && tab === key;
                        return (
                            <button key={key} onClick={() => go(key)} className="flex-1 flex flex-col items-center gap-0.5 text-[11px] font-semibold relative" style={{ color: on ? GREEN : MUTED }}>
                                <Icon className="w-5 h-5" />
                                {label}
                                {key === 'visits' && visits.length > 0 && <span className="absolute top-0 right-[28%] w-4 h-4 text-[10px] text-white flex items-center justify-center" style={{ background: GOLD, borderRadius: 999 }}>{visits.length}</span>}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
