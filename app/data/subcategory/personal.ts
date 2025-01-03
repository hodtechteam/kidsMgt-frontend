export type RoleKey = "pastors" | "directors" | "hod" | "deputy_hods" | "colony_leaders" | "captains" | "workers" | "members";

export interface ISubDirectory{
    value:string;
    label:string;
}

export const roles = [
  { value: "pastors", label: "Pastors" },
  { value: "directors", label: "Directors" },
  { value: "hod", label: "HOD" },
  { value: "deputy_hods", label: "Deputy HODs" },
  { value: "colony_leaders", label: "Colony Leaders" },
  { value: "captains", label: "Captains" },
  { value: "workers", label: "Workers" },
  { value: "members", label: "Members" },
];

export const identificationOptions = [
  { value: "nin", label: "National Identification Number (NIN)" },
  { value: "passport", label: "Passport" },
  { value: "drivers_license", label: "Driver's License" },
  { value: "voters_card", label: "Voter's Card" },
];

export const Guardain = [
  { value: "parent", label: "Parent" },
  { value: "guardian", label: "Gaurdian" },
];

export const ParentOptions = [
  { value: "father", label: "Father" },
  { value: "mother", label: "Mother" },
];

export const GuardianOptions = [
  { value: "brother", label: "Brother" },
  { value: "sister", label: "Sister" },
  { value: "aunty", label: "Aunty" },
  { value: "uncle", label: "Uncle" },
  { value: "other", label: "Other" },
];


export const SubDirectories: Record<RoleKey, ISubDirectory[]> = {
    pastors: [
        { value: "evangelism_and_mission", label: "Evangelism and Mission" },
        { value: "small_groups", label: "Small Groups" },
        { value: "worship_and_communications", label: "Worship & Communications" },
        { value: "assimilation", label: "Assimilation" },
        { value: "fellowship", label: "Fellowship" },
        { value: "hod_academy", label: "HOD Academy" },
        { value: "prayer", label: "Prayer" },
        { value: "stewardship", label: "Stewardship" },
        { value: "head_of_ministries", label: "Head of Ministries" },
    ],
    directors: [
      { value: "directors_finance", label: "Finance Director" },
      { value: "directors_operations", label: "Operations Director" },
      { value: "directors_hr", label: "HR Director" },
      { value: "directors_marketing", label: "Marketing Director" },
      { value: "directors_technical", label: "Technical Director" },
      { value: "directors_admin", label: "Admin Director" },
    ],
    hod: [
      { value: "hod_finance", label: "Finance HOD" },
      { value: "hod_operations", label: "Operations HOD" },
      { value: "hod_hr", label: "HR HOD" },
      { value: "hod_marketing", label: "Marketing HOD" },
      { value: "hod_technical", label: "Technical HOD" },
      { value: "hod_admin", label: "Admin HOD" },
    ],
    deputy_hods: [
      { value: "deputy_hods_finance", label: "Finance Deputy HOD" },
      { value: "deputy_hods_operations", label: "Operations Deputy HOD" },
      { value: "deputy_hods_hr", label: "HR Deputy HOD" },
      { value: "deputy_hods_marketing", label: "Marketing Deputy HOD" },
      { value: "deputy_hods_technical", label: "Technical Deputy HOD" },
      { value: "deputy_hods_admin", label: "Admin Deputy HOD" },
    ],
    colony_leaders: [
      { value: "colony_leaders_east", label: "East Colony Leader" },
      { value: "colony_leaders_west", label: "West Colony Leader" },
      { value: "colony_leaders_north", label: "North Colony Leader" },
      { value: "colony_leaders_south", label: "South Colony Leader" },
      { value: "colony_leaders_central", label: "Central Colony Leader" },
      { value: "colony_leaders_island", label: "Island Colony Leader" },
    ],
    captains: [
      { value: "captains_alpha", label: "Alpha Captain" },
      { value: "captains_beta", label: "Beta Captain" },
      { value: "captains_gamma", label: "Gamma Captain" },
      { value: "captains_delta", label: "Delta Captain" },
      { value: "captains_epsilon", label: "Epsilon Captain" },
      { value: "captains_zeta", label: "Zeta Captain" },
    ],
    workers: [
      { value: "workers_carpentry", label: "Carpentry Worker" },
      { value: "workers_plumbing", label: "Plumbing Worker" },
      { value: "workers_electric", label: "Electric Worker" },
      { value: "workers_mechanical", label: "Mechanical Worker" },
      { value: "workers_maintenance", label: "Maintenance Worker" },
      { value: "workers_support", label: "Support Worker" },
    ],
    members: [
      { value: "members_general", label: "General Member" },
      { value: "members_special", label: "Special Member" },
      { value: "members_guest", label: "Guest Member" },
      { value: "members_honorary", label: "Honorary Member" },
      { value: "members_associate", label: "Associate Member" },
      { value: "members_temp", label: "Temporary Member" },
    ],
  };



  export const countriesSchema = [
    {
      value: "nigeria",
      label: "Nigeria",
      states: [
        {
          value: "lagos",
          label: "Lagos",
          lgas: [
            { value: "ikeja", label: "Ikeja" },
            { value: "lekki", label: "Lekki" },
            { value: "surulere", label: "Surulere" },
            { value: "ajah", label: "Ajah" },
            { value: "badagry", label: "Badagry" },
          ],
        },
        {
          value: "abia",
          label: "Abia",
          lgas: [
            { value: "umuahia", label: "Umuahia" },
            { value: "aba", label: "Aba" },
            { value: "ohafia", label: "Ohafia" },
            { value: "osisioma", label: "Osisioma" },
            { value: "bende", label: "Bende" },
          ],
        },
      ],
      branches: [
        { value: "main_branch", label: "Main Branch" },
        { value: "city_center", label: "City Center" },
        { value: "rural_outreach", label: "Rural Outreach" },
      ],
    },
    {
      value: "canada",
      label: "Canada",
      states: [
        {
          value: "ontario",
          label: "Ontario",
          lgas: [
            { value: "toronto", label: "Toronto" },
            { value: "ottawa", label: "Ottawa" },
            { value: "mississauga", label: "Mississauga" },
            { value: "brampton", label: "Brampton" },
            { value: "london", label: "London" },
          ],
        },
        {
          value: "british_columbia",
          label: "British Columbia",
          lgas: [
            { value: "vancouver", label: "Vancouver" },
            { value: "victoria", label: "Victoria" },
            { value: "kelowna", label: "Kelowna" },
            { value: "surrey", label: "Surrey" },
            { value: "burnaby", label: "Burnaby" },
          ],
        },
      ],
      branches: [
        { value: "north_hub", label: "North Hub" },
        { value: "urban_outreach", label: "Urban Outreach" },
        { value: "west_community", label: "West Community" },
      ],
    },
    {
      value: "uk",
      label: "United Kingdom",
      states: [
        {
          value: "england",
          label: "England",
          lgas: [
            { value: "london", label: "London" },
            { value: "manchester", label: "Manchester" },
            { value: "birmingham", label: "Birmingham" },
            { value: "leeds", label: "Leeds" },
            { value: "bristol", label: "Bristol" },
          ],
        },
        {
          value: "scotland",
          label: "Scotland",
          lgas: [
            { value: "edinburgh", label: "Edinburgh" },
            { value: "glasgow", label: "Glasgow" },
            { value: "aberdeen", label: "Aberdeen" },
            { value: "dundee", label: "Dundee" },
            { value: "inverness", label: "Inverness" },
          ],
        },
      ],
      branches: [
        { value: "east_hub", label: "East Hub" },
        { value: "city_outreach", label: "City Outreach" },
        { value: "south_community", label: "South Community" },
      ],
    },
  ];
  