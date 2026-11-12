// Written content for the demo agency (Urban Nest Properties, fictional).
// Everything here was written by CREATIIX as a sample; it is not advice.

export const article = {
    title: 'Buying your first home in Mumbai: 7 checks before you pay the token',
    meta: 'Buyer guide · 4 min read',
    intro: 'A token amount feels small next to the price of a flat, but it is the moment a search turns into a commitment. Before you pay it, slow down for one evening and run through these seven checks.',
    points: [
        ['Know the full cost, not just the price', 'The agreement value is only the start. Ask for a written estimate of stamp duty, registration, society transfer charges, brokerage and the first year of maintenance, so the real number is in front of you.'],
        ['Compare carpet area, not "area"', 'Two flats both called 2 BHK can differ by a full room. Ask for the carpet area in writing and compare homes on that figure only.'],
        ['Do the commute at the real time', 'Travel from the flat to your office at the hour you would actually leave. Twenty minutes on a Sunday can be seventy on a Monday.'],
        ['Visit twice, at different hours', 'See the home once in daylight and once after 8 PM. Light, noise, water pressure and parking all tell a different story at night.'],
        ['Ask for the papers early', 'A genuine seller will share the title documents, the occupancy certificate and the society no-dues letter without fuss. Have a lawyer read them before any money moves.'],
        ['Get your loan approved first', 'A pre-approved loan tells you your true budget and makes your offer stronger, because the seller knows you can close.'],
        ['Talk to two neighbours', 'Five minutes with people who live in the building will tell you more about maintenance, water and the society than any brochure.'],
    ],
    outro: 'None of this takes long, and all of it is easier before the token than after. If you would like someone to run these checks with you, that is exactly what an advisor is for.',
    note: 'Sample article written for a fictional agency. General guidance only, not legal or financial advice.',
};

export const ads = [
    { where: 'Google Search ad', lines: [['Headline', '2 BHK Homes in Andheri West'], ['Headline', 'See Prices. Book a Visit Today'], ['Description', 'Verified flats with real prices and photos. Shortlist online and visit this weekend with one advisor.']] },
    { where: 'Instagram ad', lines: [['On the image', 'Your next home is 3 taps away.'], ['Caption', 'Stop calling ten brokers. See real prices, save the homes you like and book a visit in the app.'], ['Button', 'Book a visit']] },
    { where: 'WhatsApp broadcast', lines: [['Message', 'New this week: a garden-facing 2 BHK in Thane West and a furnished 1 BHK near the lake in Powai. Reply 1 for details or 2 to book a visit.']] },
];

export const whatsappTemplates = [
    ['Instant reply', 'Hi {name}, thanks for contacting Urban Nest! To find the right home, may I know your budget and preferred area?'],
    ['Visit confirmed', 'Your visit is confirmed for {day} at {time}. Your advisor {advisor} will meet you at the main gate. Reply here if anything changes.'],
    ['Reminder', 'Reminder: your visit in {area} is tomorrow at {time}. Reply 1 to confirm or 2 to change the time.'],
    ['After the visit', 'Hi {name}, how did you like the homes yesterday? Tell us which one you preferred and we will take it forward.'],
];

export const rewrite = {
    before: '2 bhk flat andheri w 720 carpet 9th flr semi furn car park. price on request. genuine buyers only call',
    after: 'A bright corner 2 BHK on the 9th floor in Andheri West, with 720 sq ft of carpet area, an open kitchen and a deck off the living room. Semi-furnished, with covered parking, and a ten-minute walk to the metro. ₹2.15 Cr.',
};

// One month of social posts. `post` points at a designed post in SocialDemo (1 to 9).
export const calendar = [
    { day: 1, type: 'Listing', title: 'New 2 BHK, Andheri West', post: 1 },
    { day: 3, type: 'Tip', title: 'Carpet area vs built-up', post: 2 },
    { day: 5, type: 'Reel', title: '30-second home tour' },
    { day: 8, type: 'Guide', title: 'Why Powai?', post: 3 },
    { day: 10, type: 'Carousel', title: '7 checks before the token', post: 4 },
    { day: 12, type: 'Listing', title: '1 BHK on rent, Powai', post: 5 },
    { day: 15, type: 'Myth', title: 'Myth vs fact', post: 6 },
    { day: 17, type: 'Reel', title: 'A day with an advisor' },
    { day: 19, type: 'Event', title: 'Open visits, Thane West', post: 7 },
    { day: 22, type: 'Poll', title: 'Buy or rent?', post: 8 },
    { day: 24, type: 'Story', title: 'Ask us anything' },
    { day: 26, type: 'Brand', title: 'First visit to the keys', post: 9 },
    { day: 29, type: 'Reel', title: 'Month in review' },
];

export const captions = {
    1: ['Just listed in Andheri West: a bright corner 2 BHK with an open kitchen, ten minutes on foot from the metro. Tap the link to see photos and book a visit.', '#AndheriWest #MumbaiHomes #2BHK #UrbanNest'],
    2: ['Two flats, both "2 BHK", one room apart in size. Always compare carpet area. Save this for your next visit.', '#HomeBuyingTips #CarpetArea #MumbaiRealEstate'],
    3: ['Lake views, a walkable centre and offices close by. Three reasons renters keep choosing Powai.', '#Powai #MumbaiNeighbourhoods #RentInMumbai'],
    4: ['Before the token, run these seven checks. Swipe through, then send this to the person you are buying with.', '#FirstHome #HomeBuyingChecklist #Mumbai'],
    5: ['Furnished, by the lake, ready to move in. This 1 BHK in Powai suits anyone starting a new job next month.', '#Powai #1BHK #FlatOnRent'],
    6: ['Myth: brokers hide the price. Fact: every home on our site shows it. No calls needed to find out.', '#MythVsFact #TransparentPricing'],
    7: ['This Saturday and Sunday we are showing homes in Thane West back to back. Pick a slot in the app.', '#ThaneWest #OpenHouse #WeekendPlans'],
    8: ['Buying or renting this year? Vote in the comments and tell us why.', '#BuyOrRent #MumbaiLife'],
    9: ['One advisor, from the first visit to the day you get your keys. That is the whole idea.', '#UrbanNest #HomeInMumbai'],
};
