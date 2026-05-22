import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";

type Item = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  condition: "new" | "used";
  price: number;
  year: number;
  horsepower: number;
  hours?: number;
  featured?: boolean;
  highlight: string;
  spec: Record<string, string>;
};

const ITEMS: Item[] = [
  // Tractors
  {
    slug: "john-deere-6155m",
    name: "John Deere 6155M",
    brand: "John Deere",
    category: "tractors",
    condition: "new",
    price: 189500,
    year: 2024,
    horsepower: 155,
    featured: true,
    highlight: "Versatile mid-frame utility tractor for mixed-farm work.",
    spec: {
      Transmission: "CommandQuad Plus, 24F/24R",
      "Hydraulic flow": "31 gpm",
      "Rear lift capacity": "8,950 lbs",
      "Operating weight": "13,450 lbs",
    },
  },
  {
    slug: "case-ih-maxxum-150",
    name: "Case IH Maxxum 150",
    brand: "Case IH",
    category: "tractors",
    condition: "new",
    price: 172000,
    year: 2024,
    horsepower: 150,
    highlight: "Efficient all-rounder with multicontroller armrest.",
    spec: {
      Transmission: "ActiveDrive 8, 24F/24R",
      "Hydraulic flow": "29 gpm",
      "Rear lift capacity": "8,200 lbs",
      "Operating weight": "12,900 lbs",
    },
  },
  {
    slug: "kubota-m7-172",
    name: "Kubota M7-172",
    brand: "Kubota",
    category: "tractors",
    condition: "used",
    price: 128000,
    year: 2021,
    horsepower: 168,
    hours: 1850,
    highlight: "Well-maintained premium tractor with front loader prep.",
    spec: {
      Transmission: "Powershift, 30F/15R",
      "Hydraulic flow": "28 gpm",
      "Rear lift capacity": "9,200 lbs",
      "Operating weight": "14,100 lbs",
    },
  },
  {
    slug: "fendt-724-vario",
    name: "Fendt 724 Vario",
    brand: "Fendt",
    category: "tractors",
    condition: "used",
    price: 215000,
    year: 2020,
    horsepower: 240,
    hours: 3100,
    featured: true,
    highlight: "Stepless Vario transmission and premium operator cab.",
    spec: {
      Transmission: "Vario stepless CVT",
      "Hydraulic flow": "43 gpm",
      "Rear lift capacity": "12,100 lbs",
      "Operating weight": "18,300 lbs",
    },
  },
  {
    slug: "new-holland-t5-120",
    name: "New Holland T5.120",
    brand: "New Holland",
    category: "tractors",
    condition: "new",
    price: 98500,
    year: 2024,
    horsepower: 117,
    highlight: "Compact utility tractor ideal for livestock and haymaking.",
    spec: {
      Transmission: "Electro Command, 24F/24R",
      "Hydraulic flow": "24 gpm",
      "Rear lift capacity": "6,700 lbs",
      "Operating weight": "10,800 lbs",
    },
  },
  {
    slug: "massey-ferguson-5713",
    name: "Massey Ferguson 5713",
    brand: "Massey Ferguson",
    category: "tractors",
    condition: "used",
    price: 76000,
    year: 2019,
    horsepower: 130,
    hours: 4200,
    highlight: "Dependable workhorse, recently serviced and field-ready.",
    spec: {
      Transmission: "Dyna-4, 16F/16R",
      "Hydraulic flow": "26 gpm",
      "Rear lift capacity": "7,500 lbs",
      "Operating weight": "11,600 lbs",
    },
  },

  // Harvesters
  {
    slug: "john-deere-s780-combine",
    name: "John Deere S780 Combine",
    brand: "John Deere",
    category: "harvesters",
    condition: "used",
    price: 389000,
    year: 2021,
    horsepower: 473,
    hours: 1240,
    featured: true,
    highlight: "High-capacity combine with active yield calibration.",
    spec: {
      "Grain tank": "400 bu",
      "Unloading rate": "3.8 bu/s",
      "Header compatibility": "600F / 700FD draper",
      "Operating weight": "38,400 lbs",
    },
  },
  {
    slug: "claas-lexion-8700",
    name: "Claas Lexion 8700",
    brand: "Claas",
    category: "harvesters",
    condition: "new",
    price: 565000,
    year: 2024,
    horsepower: 549,
    featured: true,
    highlight: "Flagship hybrid threshing for the highest grain throughput.",
    spec: {
      "Grain tank": "460 bu",
      "Unloading rate": "4.4 bu/s",
      "Header compatibility": "CONVIO flex draper",
      "Operating weight": "41,200 lbs",
    },
  },
  {
    slug: "new-holland-cr8-90",
    name: "New Holland CR8.90",
    brand: "New Holland",
    category: "harvesters",
    condition: "used",
    price: 312000,
    year: 2020,
    horsepower: 490,
    hours: 1680,
    highlight: "Twin-rotor combine with gentle grain handling.",
    spec: {
      "Grain tank": "355 bu",
      "Unloading rate": "3.5 bu/s",
      "Header compatibility": "Varifeed grain header",
      "Operating weight": "37,100 lbs",
    },
  },
  {
    slug: "case-ih-axial-flow-7150",
    name: "Case IH Axial-Flow 7150",
    brand: "Case IH",
    category: "harvesters",
    condition: "used",
    price: 268000,
    year: 2019,
    horsepower: 449,
    hours: 2100,
    highlight: "Single-rotor simplicity with proven reliability.",
    spec: {
      "Grain tank": "350 bu",
      "Unloading rate": "3.2 bu/s",
      "Header compatibility": "3050 draper header",
      "Operating weight": "35,800 lbs",
    },
  },

  // Seeders & Planters
  {
    slug: "john-deere-1775nt-planter",
    name: "John Deere 1775NT 16-Row Planter",
    brand: "John Deere",
    category: "seeders",
    condition: "new",
    price: 142000,
    year: 2024,
    horsepower: 155,
    featured: true,
    highlight: "ExactEmerge planting for precise singulation at speed.",
    spec: {
      Type: "Front-fold row planter",
      "Working width": "40 ft",
      "Row count / spacing": "16 rows @ 30 in",
      "Hopper capacity": "Central-fill, 90 bu",
    },
  },
  {
    slug: "kubota-dsm3070-seed-drill",
    name: "Kubota DSM3070 Seed Drill",
    brand: "Kubota",
    category: "seeders",
    condition: "new",
    price: 48500,
    year: 2024,
    horsepower: 90,
    highlight: "Compact mechanical drill for small grains and cover crops.",
    spec: {
      Type: "Mechanical seed drill",
      "Working width": "10 ft",
      "Row count / spacing": "24 rows @ 5 in",
      "Hopper capacity": "21 bu",
    },
  },
  {
    slug: "case-ih-2150-early-riser",
    name: "Case IH 2150 Early Riser Planter",
    brand: "Case IH",
    category: "seeders",
    condition: "used",
    price: 96000,
    year: 2020,
    horsepower: 140,
    hours: 0,
    highlight: "Trusted planter with even-emergence row units.",
    spec: {
      Type: "Stack-fold row planter",
      "Working width": "30 ft",
      "Row count / spacing": "12 rows @ 30 in",
      "Hopper capacity": "Bulk-fill, 70 bu",
    },
  },

  // Sprayers
  {
    slug: "john-deere-r4044-sprayer",
    name: "John Deere R4044 Sprayer",
    brand: "John Deere",
    category: "sprayers",
    condition: "used",
    price: 268000,
    year: 2021,
    horsepower: 320,
    hours: 1450,
    featured: true,
    highlight: "Self-propelled sprayer with individual nozzle control.",
    spec: {
      "Tank capacity": "1,200 gal",
      "Boom width": "120 ft",
      "Spray system": "ExactApply nozzle control",
      "Operating weight": "31,500 lbs",
    },
  },
  {
    slug: "case-ih-patriot-4440",
    name: "Case IH Patriot 4440",
    brand: "Case IH",
    category: "sprayers",
    condition: "new",
    price: 415000,
    year: 2024,
    horsepower: 365,
    highlight: "Rear-mounted engine for balance and visibility.",
    spec: {
      "Tank capacity": "1,200 gal",
      "Boom width": "120 ft",
      "Spray system": "AIM Command FLEX II",
      "Operating weight": "33,000 lbs",
    },
  },
  {
    slug: "new-holland-guardian-sp300f",
    name: "New Holland Guardian SP.300F",
    brand: "New Holland",
    category: "sprayers",
    condition: "used",
    price: 189000,
    year: 2019,
    horsepower: 290,
    hours: 2600,
    highlight: "Front-boom sprayer with excellent operator sightlines.",
    spec: {
      "Tank capacity": "1,000 gal",
      "Boom width": "100 ft",
      "Spray system": "IntelliSpray pulse-width",
      "Operating weight": "29,400 lbs",
    },
  },

  // Loaders & Telehandlers
  {
    slug: "kubota-r540-wheel-loader",
    name: "Kubota R540 Wheel Loader",
    brand: "Kubota",
    category: "loaders",
    condition: "new",
    price: 72000,
    year: 2024,
    horsepower: 64,
    highlight: "Agile yard loader for feed, silage and material handling.",
    spec: {
      Type: "Articulated wheel loader",
      "Lift capacity": "4,400 lbs",
      "Max lift height": "11 ft 2 in",
      "Hydraulic flow": "20 gpm",
    },
  },
  {
    slug: "new-holland-lm7-42-telehandler",
    name: "New Holland LM7.42 Telehandler",
    brand: "New Holland",
    category: "loaders",
    condition: "used",
    price: 98000,
    year: 2021,
    horsepower: 143,
    hours: 2400,
    featured: true,
    highlight: "Reach and lift for stacking, loading and bale handling.",
    spec: {
      Type: "Telescopic handler",
      "Lift capacity": "9,200 lbs",
      "Max lift height": "23 ft",
      "Hydraulic flow": "31 gpm",
    },
  },
  {
    slug: "john-deere-333g-skid-steer",
    name: "John Deere 333G Skid Steer",
    brand: "John Deere",
    category: "loaders",
    condition: "used",
    price: 54000,
    year: 2020,
    horsepower: 100,
    hours: 1900,
    highlight: "Compact track loader with high-flow attachment support.",
    spec: {
      Type: "Compact track loader",
      "Lift capacity": "3,700 lbs",
      "Max lift height": "10 ft 6 in",
      "Hydraulic flow": "High-flow, 30 gpm",
    },
  },

  // Tillage
  {
    slug: "case-ih-ecolo-tiger-875",
    name: "Case IH Ecolo-Tiger 875 Disk Ripper",
    brand: "Case IH",
    category: "tillage",
    condition: "new",
    price: 86000,
    year: 2024,
    horsepower: 280,
    highlight: "Deep tillage to break compaction and size residue.",
    spec: {
      Type: "Disk ripper",
      "Working width": "22 ft",
      "Working depth": "16 in",
      "Number of shanks": "9 shanks",
    },
  },
  {
    slug: "john-deere-2730-combination-ripper",
    name: "John Deere 2730 Combination Ripper",
    brand: "John Deere",
    category: "tillage",
    condition: "used",
    price: 43000,
    year: 2019,
    horsepower: 220,
    hours: 0,
    highlight: "One-pass tillage that levels and conditions soil.",
    spec: {
      Type: "Combination ripper",
      "Working width": "18 ft",
      "Working depth": "14 in",
      "Number of shanks": "7 shanks",
    },
  },
  {
    slug: "kubota-dh1100-disc-harrow",
    name: "Kubota DH1100 Disc Harrow",
    brand: "Kubota",
    category: "tillage",
    condition: "new",
    price: 21500,
    year: 2024,
    horsepower: 90,
    highlight: "Compact harrow for seedbed prep and residue mixing.",
    spec: {
      Type: "Tandem disc harrow",
      "Working width": "11 ft",
      "Working depth": "6 in",
      "Number of discs": "32 discs",
    },
  },
];

const CONDITION_BLURB: Record<Item["condition"], string> = {
  new: "Brand new and covered by full manufacturer warranty, it is ready for immediate delivery and setup by our service team.",
  used: "This pre-owned unit has been inspected, serviced and reconditioned by our workshop, and is sold with a documented service history.",
};

function buildDescription(item: Item): string {
  const intro = `The ${item.name} is a ${item.condition === "new" ? "new" : "used"} ${
    item.category === "tractors" ? "tractor" : "machine"
  } from ${item.brand}, rated at ${item.horsepower} hp.`;
  return `${intro} ${item.highlight} ${CONDITION_BLURB[item.condition]} Contact our sales team to arrange an inspection, a working demonstration, or a finance quote tailored to your operation.`;
}

function buildSpecs(item: Item): { label: string; value: string }[] {
  const base: { label: string; value: string }[] = [
    { label: "Brand", value: item.brand },
    { label: "Model year", value: String(item.year) },
    { label: "Condition", value: item.condition === "new" ? "New" : "Used" },
  ];
  if (item.category !== "seeders" && item.category !== "tillage") {
    base.splice(2, 0, {
      label: "Engine power",
      value: `${item.horsepower} hp`,
    });
  } else {
    base.push({
      label: "Required tractor power",
      value: `${item.horsepower} hp`,
    });
  }
  if (item.condition === "used" && item.hours && item.hours > 0) {
    base.push({ label: "Hours", value: `${item.hours.toLocaleString()} h` });
  }
  for (const [label, value] of Object.entries(item.spec)) {
    base.push({ label, value });
  }
  return base;
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  await prisma.lead.deleteMany();
  await prisma.equipment.deleteMany();

  for (const item of ITEMS) {
    await prisma.equipment.create({
      data: {
        slug: item.slug,
        name: item.name,
        brand: item.brand,
        category: item.category,
        condition: item.condition,
        price: item.price,
        year: item.year,
        horsepower: item.horsepower,
        hours: item.condition === "used" ? (item.hours ?? 0) : null,
        shortDescription: item.highlight,
        description: buildDescription(item),
        images: JSON.stringify([]),
        specs: JSON.stringify(buildSpecs(item)),
        featured: item.featured ?? false,
        inStock: true,
      },
    });
  }

  console.log(`Seeded ${ITEMS.length} equipment listings.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
