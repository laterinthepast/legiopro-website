/** The 11 services, in homepage order. Copy is final per the design handoff - do not rewrite. */

export type Service = {
  slug: string;
  /** Phosphor icon class, regular weight, e.g. "ph-clipboard-text" */
  icon: string;
  /** Short title used in the homepage index */
  title: string;
  /** One-line description used in the homepage index */
  blurb: string;
  /** Full page heading */
  heading: string;
  lead: string;
  tags: string[];
  covered: string[];
};

export const services: Service[] = [
  {
    slug: "legionella-risk-assessments",
    icon: "ph-clipboard-text",
    title: "Legionella Risk Assessments",
    blurb: "ACoP L8, HSG274, BS 8580-1 and HPSC 2009 assessments for all risk systems",
    heading: "Legionella Risk Assessments",
    lead:
      "Independent, site-specific Legionella risk assessments undertaken in accordance with ACoP L8, HSG274 and BS 8580-1 for UK sites, and with the HPSC National Guidelines for the Control of Legionellosis in Ireland, 2009 - together with relevant Health and Safety Authority requirements and sector-specific guidance - for sites in the Republic of Ireland.",
    tags: ["ACoP L8", "HSG274", "BS 8580-1", "HPSC 2009"],
    covered: [
      "Domestic hot and cold-water systems",
      "Cooling towers and evaporative systems",
      "Other risk systems present on site",
      "Independent, site-specific findings with clear, prioritised recommendations",
    ],
  },
  {
    slug: "written-schemes-of-control",
    icon: "ph-book-open-text",
    title: "Written Schemes of Control",
    blurb: "Responsibilities, control measures, monitoring frequencies and records",
    heading: "Written Schemes of Control",
    lead:
      "Bespoke written schemes of control setting out responsibilities, control measures, monitoring frequencies, corrective actions and record-keeping requirements - a clear, workable document your team can actually follow.",
    tags: ["ACoP L8", "HSG274"],
    covered: [
      "Named responsibilities and lines of accountability",
      "Control measures for each risk system",
      "Monitoring frequencies and methods",
      "Corrective actions when parameters are out of range",
      "Record-keeping requirements",
    ],
  },
  {
    slug: "schematics-and-asset-registers",
    icon: "ph-tree-structure",
    title: "Schematics & Asset Registers",
    blurb: "Hot- and cold-water schematics with site-specific asset and outlet data",
    heading: "Water-System Schematics & Asset Registers",
    lead:
      "Clear hot- and cold-water system schematics, supported by site-specific asset and outlet information - so everyone responsible for your water systems can see exactly what is installed and where.",
    tags: ["ACoP L8", "HSG274"],
    covered: [
      "Hot- and cold-water system schematics",
      "Site-specific asset registers",
      "Outlet-level information",
      "Drawings that support your risk assessment and written scheme",
    ],
  },
  {
    slug: "water-hygiene-monitoring",
    icon: "ph-thermometer",
    title: "Routine Water Hygiene Monitoring",
    blurb: "Temperatures, flushing, showerhead descaling, inspections and records",
    heading: "Routine Water Hygiene Monitoring",
    lead:
      "Routine monitoring that keeps your control scheme live: temperature monitoring, flushing programmes, showerhead cleaning and descaling, inspections, compliance checks and water-hygiene record keeping.",
    tags: ["ACoP L8", "HSG274"],
    covered: [
      "Temperature monitoring",
      "Flushing programmes for little-used outlets",
      "Showerhead cleaning and descaling",
      "Inspections and compliance checks",
      "Water-hygiene record keeping",
    ],
  },
  {
    slug: "water-sampling-and-analysis",
    icon: "ph-flask",
    title: "Water Sampling & Laboratory Analysis",
    blurb: "Legionella, Pseudomonas and drinking-water sampling, professionally interpreted",
    heading: "Water Sampling & Laboratory Analysis",
    lead:
      "Legionella, Pseudomonas, microbiological and drinking-water quality sampling, with analysis undertaken by suitably accredited laboratories and results professionally interpreted - not just a lab certificate in your inbox.",
    tags: ["Accredited laboratories"],
    covered: [
      "Legionella sampling",
      "Pseudomonas sampling",
      "Microbiological and drinking-water quality sampling",
      "Analysis by suitably accredited laboratories",
      "Professional interpretation of results and next steps",
    ],
  },
  {
    slug: "tank-cleaning-and-disinfection",
    icon: "ph-drop-half",
    title: "Cold-Water Tank Cleaning & Disinfection",
    blurb: "Inspection, clean and disinfection with photos and certification",
    heading: "Cold-Water Storage Tank Cleaning & Disinfection",
    lead:
      "Inspection, cleaning and disinfection of cold-water storage tanks, including photographic evidence and completion certification for your records.",
    tags: ["ACoP L8", "HSG274"],
    covered: [
      "Tank inspection and condition reporting",
      "Physical cleaning",
      "Disinfection",
      "Photographic before-and-after evidence",
      "Completion certification",
    ],
  },
  {
    slug: "chlorination-and-disinfection",
    icon: "ph-spray-bottle",
    title: "Chlorination & Disinfection",
    blurb: "Systems and new or altered pipework after works, contamination or bad results",
    heading: "Water-System Chlorination & Disinfection",
    lead:
      "Disinfection of domestic water systems and new or altered pipework following installation, remedial works, contamination or adverse microbiological results.",
    tags: ["BS 8558"],
    covered: [
      "Domestic water-system disinfection",
      "New or altered pipework following installation",
      "Disinfection after remedial works",
      "Response to contamination events",
      "Response to adverse microbiological results",
    ],
  },
  {
    slug: "tmv-servicing-and-testing",
    icon: "ph-gauge",
    title: "TMV Servicing & Testing",
    blurb: "Inspection, servicing, fail-safe testing and temperature verification",
    heading: "TMV Servicing & Testing",
    lead:
      "Inspection, servicing, fail-safe testing, temperature verification and documentation for thermostatic mixing valves - keeping outlets safe from both scalding and Legionella risk.",
    tags: ["HSG274 Part 2"],
    covered: [
      "TMV inspection",
      "Servicing",
      "Fail-safe testing",
      "Temperature verification",
      "Full documentation for your records",
    ],
  },
  {
    slug: "cooling-tower-cleaning",
    icon: "ph-fan",
    title: "Cooling Tower Cleaning & Disinfection",
    blurb: "Planned and reactive cleans of towers and evaporative condensers",
    heading: "Cooling Tower Cleaning & Disinfection",
    lead:
      "Planned and reactive cleaning and disinfection of cooling towers, evaporative condensers and associated systems, undertaken in accordance with ACoP L8, HSG274 Part 1 and applicable Irish guidance.",
    tags: ["ACoP L8", "HSG274 Part 1", "Irish guidance"],
    covered: [
      "System inspection",
      "Pre-clean disinfection",
      "Physical cleaning of accessible components",
      "Removal of scale and fouling",
      "Post-clean disinfection",
      "Full completion documentation",
    ],
  },
  {
    slug: "indoor-air-quality",
    icon: "ph-wind",
    title: "Indoor Air Quality Assessments",
    blurb: "Independent workplace assessments with practical recommendations",
    heading: "Indoor Air Quality Assessments",
    lead:
      "Independent assessments of indoor air quality within workplaces and commercial premises, identifying potential concerns and providing practical recommendations for improvement.",
    tags: ["Workplace air quality"],
    covered: [
      "Workplaces and commercial premises",
      "Identification of potential air-quality concerns",
      "Practical, prioritised recommendations for improvement",
    ],
  },
  {
    slug: "legionella-awareness-training",
    icon: "ph-chalkboard-teacher",
    title: "Legionella Awareness Training",
    blurb: "On-site and remote training for duty holders, responsible persons and staff",
    heading: "Legionella Awareness Training",
    lead:
      "Practical Legionella awareness training for duty holders, responsible persons and the staff who carry out day-to-day monitoring. Courses are delivered on site or remotely, tailored to your systems and records, and aligned with ACoP L8 and HSG274 in the UK and the HPSC National Guidelines 2009 in the Republic of Ireland.",
    tags: ["On-site or remote", "ACoP L8", "HSG274", "HPSC 2009"],
    covered: [
      "Legionella bacteria, legionellosis and how risk arises in water systems",
      "Legal duties under ACoP L8, HSG274 and the HPSC National Guidelines 2009",
      "Roles and responsibilities of duty holders and responsible persons",
      "Practical monitoring tasks: temperatures, flushing, inspections and record keeping",
      "Certificates of attendance for your training records",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Previous / next service in the chain (page 1 has no previous; page 11 has no next). */
export function getNeighbours(slug: string): { prev?: Service; next?: Service } {
  const i = services.findIndex((s) => s.slug === slug);
  if (i < 0) return {};
  return { prev: services[i - 1], next: services[i + 1] };
}
