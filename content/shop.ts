/**
 * Everything the site knows about the business itself: identity, hours,
 * address, and the standing copy. Pages read from here; nothing hardcodes a
 * phone number or a closing time in JSX.
 *
 * Almanac is a roastery first — beans and ground coffee, bagged and shipped.
 * The bar exists so you can taste what you're buying before you buy it.
 */

export type DayHours = {
  /** 0 = Sunday, matching `Date.prototype.getDay()` */
  index: number;
  day: string;
  short: string;
  /** 24-hour "HH:MM", or null when closed */
  open: string | null;
  close: string | null;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

const shop = {
  name: "Almanac Coffee",
  legalName: "Almanac Coffee Co.",
  tagline: "Seasonal harvests, careful craft.",

  /** Used on the hero. One line, no more. */
  heroHeadline: "Coffee by the season.",
  heroSubhead:
    "A small roastery at the north end of Brooks Street.",

  story: [
    "An almanac is a record kept year over year — when to plant, when to cut, what the weather did the last time it looked like this. We keep one for coffee. Every lot that comes through the roaster gets a page: the farm, the altitude, the week it landed, the profile that finally made it sing.",
    "That book is why the shelf moves. Coffee is agricultural, harvests arrive when they arrive, and a bag that was extraordinary in March is only good by August. We would rather sell you something different than sell you something tired.",
  ],

  /** Three short statements of craft, used beside the story portrait. */
  ethos: [
    {
      title: "Roasted in small batches",
      body: "Twelve kilos at a time, on a 1958 drum we rebuilt ourselves. Every bag leaves within a week of its roast date.",
    },
    {
      title: "Bought by the harvest",
      body: "We buy for the season rather than the year, so the shelf changes and the notes printed on it are true.",
    },
    {
      title: "Whole until it’s sold",
      body: "Nothing on the shelf meets a grinder until someone buys it. Coffee starts going flat within minutes of being ground, so we leave that step for last.",
    },
  ],

  hours: [
    { index: 1, day: "Monday", short: "Mon", open: "07:00", close: "17:00" },
    { index: 2, day: "Tuesday", short: "Tue", open: "07:00", close: "17:00" },
    { index: 3, day: "Wednesday", short: "Wed", open: "07:00", close: "17:00" },
    { index: 4, day: "Thursday", short: "Thu", open: "07:00", close: "17:00" },
    { index: 5, day: "Friday", short: "Fri", open: "07:00", close: "18:00" },
    { index: 6, day: "Saturday", short: "Sat", open: "08:00", close: "18:00" },
    { index: 0, day: "Sunday", short: "Sun", open: "08:00", close: "15:00" },
  ] as DayHours[],

  hoursNote:
    "We roast Tuesday and Thursday mornings. It gets loud for an hour, and the whole block smells like it.",

  address: {
    street: "118 N. Brooks Street",
    city: "Sheridan",
    state: "WY",
    zip: "82801",
    /** Pre-built so the Visit page can hand it straight to a maps link */
    query: "N. Brooks Street, Sheridan, WY 82801",
  },

  /** `tel` is the dial string; `display` is what a human reads. */
  phone: { tel: "+13075550148", display: "(307) 555-0148" },
  email: "hello@almanaccoffee.com",

  neighborhood: "Two blocks off Main, at the north end of Brooks Street.",

  gettingHere: [
    {
      title: "Driving in",
      body: "Five minutes from I-90 at exit 23. Come down Coffeen, turn north on Brooks, and we're on the right before the tracks.",
    },
    {
      title: "Parking",
      body: "Free two-hour parking the length of Brooks, and eight spaces in the gravel lot behind the building — the entrance is off the alley.",
    },
    {
      title: "On foot",
      body: "Two blocks from Grinnell Plaza. If you're walking the Main Street shops, we're the brick building with the roaster in the window.",
    },
  ],

  team: [
    {
      name: "Harlan McRae",
      role: "Founder & Roaster",
      bio: "Keeps the ledger, runs the drum, and will talk about altitude for longer than you want.",
      image: "people/harlan-mcrae.jpg",
    },
    {
      name: "Sam Ferreira",
      role: "Green Buyer",
      bio: "Cups every offer that reaches us and turns most of them down. Sets the roast profile once a lot survives.",
      image: "people/sam-ferreira.jpg",
    },
    {
      name: "Dara Whitlock",
      role: "Bar & Orders",
      bio: "Pulls the shots, grinds the bags, and packs every mail order that leaves the building.",
      image: "people/dara-whitlock.jpg",
    },
  ] as TeamMember[],

  social: [
    { label: "Instagram", handle: "@almanaccoffee", href: "https://instagram.com" },
    { label: "Journal", handle: "The Ledger", href: "#" },
  ],

  pullQuote: {
    text: "The shelf changes because the harvest does.",
    attribution: "Harlan McRae, founder",
  },
};

/**
 * Hours for a given weekday index, or null on a day we're shut.
 * Kept here rather than in a component so Home and Visit can't disagree.
 */
export function hoursFor(dayIndex: number): DayHours | undefined {
  return shop.hours.find((h) => h.index === dayIndex);
}

/** "07:00" -> "7am", "17:00" -> "5pm", "08:30" -> "8.30am" */
export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour}${suffix}` : `${hour}.${String(m).padStart(2, "0")}${suffix}`;
}

export default shop;
