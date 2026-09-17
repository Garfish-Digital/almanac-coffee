/**
 * The bar list. Categories are ordered as they appear on the Coffee page and in its
 * sticky sub-nav; `id` doubles as the anchor target.
 */

export type MenuItem = {
  id: string;
  name: string;
  /** In whole dollars and cents, so the column can align on the decimal */
  price: number;
  description: string;
  image?: string;
  /** Marks the one or two things we’d actually recommend */
  featured?: boolean;
};

export type MenuCategory = {
  id: string;
  title: string;
  /** Shown under the category heading */
  blurb: string;
  items: MenuItem[];
};

export type Bean = {
  id: string;
  name: string;
  origin: string;
  altitude: string;
  process: string;
  notes: string[];
  price: number;
  weight: string;
  image: string;
  imageAlt: string;
  soldOut?: boolean;
};

export const categories: MenuCategory[] = [
  {
    id: "espresso",
    title: "Espresso",
    blurb:
      "Pulled on the house blend unless the shelf says otherwise.",
    items: [
      {
        id: "espresso",
        name: "Espresso",
        price: 3.0,
        description: "Two ounces of the seasonal blend. Chocolate, dried cherry, a long finish.",
      },
      {
        id: "macchiato",
        name: "Macchiato",
        price: 3.5,
        description: "The same shot, marked with a spoonful of milk. Nothing more.",
      },
      {
        id: "cortado",
        name: "Cortado",
        price: 4.0,
        description: "Equal parts espresso and steamed milk, served in glass so you can see it.",
        featured: true,
      },
      {
        id: "cappuccino",
        name: "Cappuccino",
        price: 4.5,
        description: "Six ounces, wet, with a proper cap of foam. Not a small latte.",
      },
      {
        id: "latte",
        name: "Latte",
        price: 5.0,
        description: "Twelve ounces of silk. Oat, whole, or nothing at all.",
      },
      {
        id: "mocha",
        name: "Mocha",
        price: 5.5,
        description: "Single-origin Peruvian cocoa, melted into the shot rather than stirred in after.",
      },
    ],
  },
  {
    id: "filter",
    title: "Filter",
    blurb: "The best way to taste a lot before you commit to a bag of it.",
    items: [
      {
        id: "batch-brew",
        name: "Batch Brew",
        price: 3.5,
        description: "Whatever is on the shelf this week, brewed on the hour and held for thirty minutes. No longer.",
      },
      {
        id: "pour-over",
        name: "Pour-Over",
        price: 6.0,
        description: "Your pick of the bench, ground to order. Give us four minutes.",
        featured: true,
      },
      {
        id: "siphon",
        name: "Siphon",
        price: 7.0,
        description:
          "Vacuum-brewed at the bar. Ten minutes, a small spectacle, and the cleanest cup we make.",
      },
      {
        id: "cold-brew",
        name: "Cold Brew",
        price: 4.5,
        description: "Sixteen hours at cellar temperature. Bright rather than syrupy.",
      },
      {
        id: "cold-brew-tonic",
        name: "Cold Brew Tonic",
        price: 5.5,
        description: "Over ice with tonic and a wide strip of orange peel. Summer only.",
      },
      {
        id: "japanese-iced",
        name: "Japanese Iced",
        price: 5.0,
        description:
          "Brewed hot straight onto ice, so it keeps the aromatics a long cold steep flattens.",
      },
    ],
  },
  {
    id: "not-coffee",
    title: "Not Coffee",
    blurb: "For the mornings when it isn’t coffee you want.",
    items: [
      {
        id: "chai",
        name: "House Chai",
        price: 5.0,
        description: "Steeped in-house each morning — cardamom, clove, black pepper, far less sugar than you expect.",
      },
      {
        id: "matcha",
        name: "Matcha",
        price: 5.5,
        description: "Ceremonial grade from Uji, whisked to order. Grassy and sweet, never bitter.",
      },
      {
        id: "hot-chocolate",
        name: "Drinking Chocolate",
        price: 5.0,
        description: "Thick enough to coat the spoon. A pinch of salt.",
      },
      {
        id: "tea",
        name: "Leaf Tea",
        price: 4.0,
        description: "Four on rotation, loose, in a pot. Ask what’s open.",
      },
    ],
  },
  {
    id: "food",
    title: "Food",
    blurb: "Baked down the street and delivered at six.",
    items: [
      {
        id: "croissant",
        name: "Butter Croissant",
        price: 4.5,
        description: "Three days of folding, sixty-four layers, and a great deal of butter.",
        featured: true,
      },
      {
        id: "toast",
        name: "Thick-Cut Toast",
        price: 6.0,
        description: "Country loaf, cut at an inch. Cultured butter and house preserve, or olive oil and salt.",
      },
      {
        id: "cookie",
        name: "Rye Chocolate Cookie",
        price: 4.0,
        description: "Dark rye, brown butter, flaked salt. Somewhere between a cookie and a brownie.",
      },
      {
        id: "seasonal-tart",
        name: "Seasonal Tart",
        price: 5.5,
        description: "Whatever the market had. Right now: quince and almond.",
      },
    ],
  },
];

export const beans: Bean[] = [
  {
    id: "seasonal-blend",
    name: "Seasonal Blend",
    origin: "Huila, Colombia · Sidamo, Ethiopia",
    altitude: "1,700–2,000m",
    process: "Washed",
    notes: ["Dark chocolate", "Dried cherry", "Almond"],
    price: 19,
    weight: "12 oz",
    image: "product/bean-seasonal-blend.jpg",
    imageAlt: "Coffee cherries drying on raised beds in Ethiopia",
  },
  {
    id: "kirinyaga",
    name: "Kirinyaga AA",
    origin: "Kirinyaga County, Kenya",
    altitude: "1,850m",
    process: "Washed, 48-hour ferment",
    notes: ["Blackcurrant", "Tomato leaf", "Cane sugar"],
    price: 24,
    weight: "10 oz",
    image: "product/bean-kirinyaga.jpg",
    imageAlt: "A handful of roasted Kenyan beans",
  },
  {
    id: "espresso-blend",
    name: "Brooks Street Espresso",
    origin: "Nariño, Colombia · Mandheling, Sumatra",
    altitude: "1,500–1,900m",
    process: "Washed & wet-hulled",
    notes: ["Cocoa nib", "Molasses", "Pipe tobacco"],
    price: 21,
    weight: "12 oz",
    image: "product/bean-espresso-blend.jpg",
    imageAlt: "Coffee drying in the field in Sumatra",
  },
  {
    id: "galeras",
    name: "Galeras",
    origin: "Nariño, Colombia",
    altitude: "1,900m",
    // Was "Sugarcane EA" — that's a decaffeination method, so it had to go
    // with the decaf. Washed is the classic Nariño preparation.
    process: "Washed",
    notes: ["Tangerine", "Caramel", "Red apple"],
    price: 20,
    weight: "12 oz",
    image: "product/bean-galeras-sorting.jpg",
    imageAlt: "Sorting cherries by hand at the washing station",
  },
];

/**
 * Grind is the part people get wrong at home, so the shop asks the question
 * out loud rather than defaulting to whole bean and hoping for the best.
 */
export const grind = {
  title: "Ground to order, or not at all",
  body:
    "Every bag is roasted whole and stays that way until someone buys it.",
  options: [
    { name: "Whole bean", note: "What we’d pick. Grind it the morning you drink it." },
    { name: "Espresso", note: "Fine. Dialed for a 9-bar machine." },
    { name: "Moka pot", note: "A step coarser than espresso." },
    { name: "Aeropress", note: "Medium-fine, for a two-minute steep." },
    { name: "Pour-over", note: "Medium. V60, Kalita, or a cone and some patience." },
    { name: "Drip", note: "Medium-coarse, for a home batch brewer." },
    { name: "French press", note: "Coarse. Nothing that will slip the mesh." },
    { name: "Cold brew", note: "The coarsest we do. Built for a long, cold steep." },
  ],
  sizes: [
    { name: "10 & 12 oz bags", note: "The shelf. Roasted weekly, dated on the base." },
    { name: "2 lb", note: "For an office, or a serious habit. Ask at the bar." },
    { name: "Standing order", note: "Same bag, same week, every month. Cancel by replying." },
  ],
};

/** The callout on the Menu page — the lot we most want to talk about. */
export const seasonalCallout = {
  eyebrow: "Just landed",
  title: "Kirinyaga AA — sixty bags, and then it’s finished",
  body:
    "A single day lot out of Kirinyaga, fermented forty-eight hours and dried on raised beds. Loud, blackcurrant-forward, and the best coffee to come through this building all year.",
  image: "place/sixty-bags.jpg",
};

/** The three seasonal cards on Home — the arc from origin to grind. */
export const seasonal = [
  {
    id: "origin",
    eyebrow: "At origin",
    title: "Cherries on the drying beds",
    body: "This lot was raked by hand for eleven days before it ever saw a roaster. We buy the harvest, not the year.",
    image: "story/seasonal-origin.jpg",
    href: "/coffee#beans",
    linkLabel: "See what’s landed",
  },
  {
    id: "roast",
    eyebrow: "This week’s roast",
    title: "Twelve kilos at a time",
    body: "Small batches on a drum we rebuilt ourselves, cooled fast and bagged the same week. Nothing sits.",
    image: "story/seasonal-roast.jpg",
    href: "/coffee#beans",
    linkLabel: "Buy the beans",
  },
  {
    id: "grind",
    eyebrow: "Ground to order",
    title: "Dialed in for your brewer",
    body: "Tell us what you brew on and we’ll grind it to match — or take it whole and do it properly at home.",
    image: "story/seasonal-grind.jpg",
    href: "/coffee#beans",
    linkLabel: "Pick a grind",
  },
];

/** Formats to a fixed-width money string so price columns align on the decimal. */
export function price(value: number): string {
  return `$${value.toFixed(2)}`;
}

const menu = { categories, beans, grind, seasonal, seasonalCallout, price };
export default menu;
