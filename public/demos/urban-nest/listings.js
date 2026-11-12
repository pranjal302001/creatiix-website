// Urban Nest Properties is a fictional agency created by CREATIIX as a demo.
// Every listing, price and detail below is made up. Area names are real Mumbai localities.
// Loaded by the demo site as a normal script, and imported by server/chatCore.js for the demo chatbot.
// Wrapped in a function so loading this file twice on one page is harmless.
(() => {
const img = (id) => `https://images.unsplash.com/photo-${id}?w=1200&q=70&auto=format&fit=crop`;

globalThis.LISTINGS = [
  { id: 'un-101', deal: 'Buy', type: 'Apartment', bhk: 2, area: 'Andheri West', title: '2 BHK with open kitchen', sqft: 720, price: 21500000, floor: '9th of 22', furnishing: 'Semi-furnished', img: img('1560448204-e02f11c3d0e2'), tags: ['Near metro', 'Covered parking'], desc: 'Bright corner home with cross ventilation, a modular open kitchen and a deck off the living room. Ten minutes on foot to the metro.' },
  { id: 'un-102', deal: 'Buy', type: 'Apartment', bhk: 3, area: 'Bandra West', title: '3 BHK sea-breeze residence', sqft: 1180, price: 62000000, floor: '14th of 18', furnishing: 'Unfurnished', img: img('1502672260266-1c1ef2d93688'), tags: ['Sea breeze', 'Two parking'], desc: 'Large three-bedroom on a quiet lane, with a wide living room, staff room and two covered parking spaces.' },
  { id: 'un-103', deal: 'Rent', type: 'Apartment', bhk: 1, area: 'Powai', title: '1 BHK near the lake', sqft: 480, price: 48000, floor: '6th of 15', furnishing: 'Fully furnished', img: img('1522708323590-d24dbb6b0267'), tags: ['Lake side', 'Gym & pool'], desc: 'Move-in-ready one-bedroom in a gated complex with gym, pool and round-the-clock security. Ideal for working professionals.' },
  { id: 'un-104', deal: 'Buy', type: 'Apartment', bhk: 2, area: 'Thane West', title: '2 BHK garden-facing home', sqft: 690, price: 13800000, floor: '4th of 27', furnishing: 'Unfurnished', img: img('1493809842364-78817add7ffb'), tags: ['Garden view', 'Kids play area'], desc: 'Well-planned two-bedroom facing the central garden, in a township with school, clubhouse and daily shopping inside the gates.' },
  { id: 'un-105', deal: 'Rent', type: 'Apartment', bhk: 2, area: 'Lower Parel', title: '2 BHK city-view apartment', sqft: 810, price: 115000, floor: '31st of 45', furnishing: 'Fully furnished', img: img('1600607687939-ce8a6c25118c'), tags: ['City view', 'Clubhouse'], desc: 'High-floor home with floor-to-ceiling windows, fitted wardrobes and appliances. Walk to offices and malls.' },
  { id: 'un-106', deal: 'Buy', type: 'Apartment', bhk: 1, area: 'Borivali East', title: '1 BHK starter home', sqft: 410, price: 8900000, floor: '11th of 20', furnishing: 'Semi-furnished', img: img('1484154218962-a197022b5858'), tags: ['Near station', 'First-home pick'], desc: 'Compact, efficient one-bedroom close to the station and the national park. A sensible first purchase.' },
  { id: 'un-107', deal: 'Rent', type: 'Office', bhk: 0, area: 'Andheri East', title: 'Plug-and-play office, 24 seats', sqft: 1350, price: 185000, floor: '7th of 12', furnishing: 'Fully furnished', img: img('1497366216548-37526070297c'), tags: ['24 seats', 'Meeting room'], desc: 'Ready office with 24 workstations, one cabin, a meeting room and pantry. Two minutes from the highway.' },
  { id: 'un-108', deal: 'Buy', type: 'Apartment', bhk: 3, area: 'Chembur', title: '3 BHK family residence', sqft: 1050, price: 31500000, floor: '8th of 16', furnishing: 'Semi-furnished', img: img('1560185127-6ed189bf02f4'), tags: ['Quiet lane', 'Two parking'], desc: 'Spacious family home with a separate dining area, three balconies and good schools within a short drive.' },
  { id: 'un-109', deal: 'Rent', type: 'Shop', bhk: 0, area: 'Goregaon West', title: 'Road-facing retail shop', sqft: 380, price: 95000, floor: 'Ground', furnishing: 'Bare shell', img: img('1441986300917-64674bd600d8'), tags: ['Main road', 'High footfall'], desc: 'Ground-floor shop with a 14-foot frontage on a busy market road. Suits a cafe, clinic or showroom.' },
];

// Indian price formatting: lakh / crore for sales, per month for rent.
globalThis.formatPrice = (p) => {
  if (p.deal === 'Rent') return `₹${p.price.toLocaleString('en-IN')} / month`;
  if (p.price >= 10000000) return `₹${(p.price / 10000000).toFixed(2).replace(/\.?0+$/, '')} Cr`;
  return `₹${(p.price / 100000).toFixed(1).replace(/\.0$/, '')} Lakh`;
};
globalThis.sizeLabel = (p) => (p.bhk ? `${p.bhk} BHK` : p.type);
})();
