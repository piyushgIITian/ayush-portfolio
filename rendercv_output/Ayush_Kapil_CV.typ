// Import the rendercv function and all the refactored components
#import "@preview/rendercv:0.3.0": *

// Apply the rendercv template with custom configuration
#show: rendercv.with(
  name: "Ayush Kapil",
  title: "Ayush Kapil - CV",
  footer: context { [#emph[Ayush Kapil -- #str(here().page())\/#str(counter(page).final().first())]] },
  top-note: [ #emph[Last updated in May 2026] ],
  locale-catalog-language: "en",
  text-direction: ltr,
  page-size: "us-letter",
  page-top-margin: 0.7in,
  page-bottom-margin: 0.7in,
  page-left-margin: 0.7in,
  page-right-margin: 0.7in,
  page-show-footer: true,
  page-show-top-note: true,
  colors-body: rgb(0, 0, 0),
  colors-name: rgb(0, 0, 0),
  colors-headline: rgb(0, 0, 0),
  colors-connections: rgb(0, 0, 0),
  colors-section-titles: rgb(0, 0, 0),
  colors-links: rgb(0, 0, 0),
  colors-footer: rgb(128, 128, 128),
  colors-top-note: rgb(128, 128, 128),
  typography-line-spacing: 0.6em,
  typography-alignment: "justified",
  typography-date-and-location-column-alignment: right,
  typography-font-family-body: "New Computer Modern",
  typography-font-family-name: "New Computer Modern",
  typography-font-family-headline: "New Computer Modern",
  typography-font-family-connections: "New Computer Modern",
  typography-font-family-section-titles: "New Computer Modern",
  typography-font-size-body: 10pt,
  typography-font-size-name: 30pt,
  typography-font-size-headline: 10pt,
  typography-font-size-connections: 10pt,
  typography-font-size-section-titles: 1.4em,
  typography-small-caps-name: false,
  typography-small-caps-headline: false,
  typography-small-caps-connections: false,
  typography-small-caps-section-titles: false,
  typography-bold-name: true,
  typography-bold-headline: false,
  typography-bold-connections: false,
  typography-bold-section-titles: true,
  links-underline: true,
  links-show-external-link-icon: false,
  header-alignment: center,
  header-photo-width: 3.5cm,
  header-space-below-name: 0.7cm,
  header-space-below-headline: 0.7cm,
  header-space-below-connections: 0.7cm,
  header-connections-hyperlink: true,
  header-connections-show-icons: false,
  header-connections-display-urls-instead-of-usernames: true,
  header-connections-separator: "•",
  header-connections-space-between-connections: 0.5cm,
  section-titles-type: "with_full_line",
  section-titles-line-thickness: 0.5pt,
  section-titles-space-above: 0.5cm,
  section-titles-space-below: 0.3cm,
  sections-allow-page-break: true,
  sections-space-between-text-based-entries: 0.3em,
  sections-space-between-regular-entries: 1.2em,
  entries-date-and-location-width: 4.15cm,
  entries-side-space: 0.2cm,
  entries-space-between-columns: 0.1cm,
  entries-allow-page-break: false,
  entries-short-second-row: false,
  entries-degree-width: 1cm,
  entries-summary-space-left: 0cm,
  entries-summary-space-above: 0cm,
  entries-highlights-bullet:  "◦" ,
  entries-highlights-nested-bullet:  "◦" ,
  entries-highlights-space-left: 0.15cm,
  entries-highlights-space-above: 0cm,
  entries-highlights-space-between-items: 0cm,
  entries-highlights-space-between-bullet-and-text: 0.5em,
  date: datetime(
    year: 2026,
    month: 5,
    day: 7,
  ),
)


#grid(
  columns: (auto, 1fr),
  column-gutter: 0cm,
  align: horizon + left,
  [#pad(left: 0.4cm, right: 0.4cm, image("ayush-dp.png", width: 3.5cm))
],
  [
= Ayush Kapil

#connections(
  [Kandivali W, Mumbai, Maharashtra 400067, India],
  [#link("mailto:ayushkapil7542@gmail.com", icon: false, if-underline: false, if-color: false)[ayushkapil7542\@gmail.com]],
  [#link("tel:+91-98193-47422", icon: false, if-underline: false, if-color: false)[098193 47422]],
  [#link("https://ayush-kapil.vercel.app/", icon: false, if-underline: false, if-color: false)[ayush-kapil.vercel.app]],
)
  ]
)


== Summary

Results-driven sales and relationship management professional with a unique blend of maritime training and an MMS in Operations & Supply Chain Management. Proven track record across banking, insurance, and bancassurance, with strengths in B2B\/B2C sales, channel partnerships, and team leadership.

== Education

#education-entry(
  [
    #strong[VIT, Mumbai University]

    #emph[MMS] #emph[in] #emph[Operations and Supply Chain Management]

  ],
  [
    #emph[Mumbai, India]

    #emph[June 2020 – June 2022]

  ],
  main-column-second-row: [
    - GPA: 9.37\/10

  ],
)

#education-entry(
  [
    #box(image("ts-chanakya-logo.png", height: 1em), baseline: 0.15em) #strong[T.S. Chanakya, Indian Maritime University (IMU)]

    #emph[BSc] #emph[in] #emph[Nautical Science]

  ],
  [
    #emph[Navi Mumbai, India]

    #emph[Aug 2015 – June 2019]

  ],
  main-column-second-row: [
    - 1st Division — Consistent \~62.5\% average across 6 semesters

  ],
)

#education-entry(
  [
    #strong[Bal Niketan Model School (CBSE)]

    #emph[12th] #emph[in] #emph[Science]

  ],
  [
    #emph[Chandigarh, India]

    #emph[Jan 2015]

  ],
  main-column-second-row: [
    - 70\%

  ],
)

#education-entry(
  [
    #strong[Kapol International School (ICSE)]

    #emph[10th] #emph[in] #emph[General]

  ],
  [
    #emph[Mumbai, India]

    #emph[Jan 2013]

  ],
  main-column-second-row: [
    - 85\%

  ],
)

== Experience

#regular-entry(
  [
    #strong[Area Sales Manager]

    #emph[Axis Max Life Insurance]

  ],
  [
    #emph[India]

    #emph[Dec 2024 – present]

  ],
  main-column-second-row: [
    - Drive regional sales targets, manage team performance, and expand market reach across the assigned territory.

    - Develop and implement strategic business plans to achieve sales goals and maximize revenue.

  ],
)

#regular-entry(
  [
    #strong[Relationship Manager]

    #emph[Kotak Mahindra Bank]

  ],
  [
    #emph[India]

    #emph[Aug 2023 – Oct 2024]

  ],
  main-column-second-row: [
    - Managed high-net-worth client relationships, providing tailored financial solutions and wealth management strategies.

    - Drove portfolio growth through cross-selling and upselling of banking products and services.

    - Ensured high customer satisfaction and retention through proactive engagement and issue resolution.

  ],
)

#regular-entry(
  [
    #strong[Corporate Agency Manager]

    #emph[HDFC Life]

  ],
  [
    #emph[India]

    #emph[June 2022 – Aug 2023]

  ],
  main-column-second-row: [
    - Secured position through campus placement.

    - Managed corporate agency partnerships and drove life insurance product sales through bancassurance and allied channels.

    - Conducted training and development sessions for channel partners to improve product knowledge and sales efficiency.

  ],
)

#regular-entry(
  [
    #strong[Marine Trainee Intern]

    #emph[Gamma Marine Training Institute Pvt. Ltd.]

  ],
  [
    #emph[India]

    #emph[Jan 2018 – Apr 2018]

  ],
  main-column-second-row: [
    - Completed a three-month internship focused on maritime operations and safety protocols.

    - Applied theoretical concepts from T.S. Chanakya coursework to practical, real-world maritime scenarios.

  ],
)

== Skills

#strong[Business & Leadership:] B2B & B2C Sales, Relationship Management, Supply Chain Management, Leadership, Adaptability

#strong[Safety & Emergency Response:] Fire Prevention & Fire Fighting, Elementary First Aid, Personal Survival Technique, Personal Safety & Social Responsibility

#strong[Maritime Security & Cargo:] Security Training for Seafarers (Designated Duties), Liquefied Gas Tanker Cargo Operations (Basic), Oil & Chemical Tanker Cargo Operations (Basic)

== Projects

  #regular-entry(
  [
    #strong[Scientific Model Engineering]

  ],
  [
  ],
  main-column-second-row: [
    - Designed and constructed a functional solar charger model and a detailed star constellation model, demonstrating practical application of engineering and navigational concepts.

  ],
)

== Awards and Extracurriculars

- First Prize in Model Making, T.S. Chanakya — awarded for exceptional star constellation model.

- Core Member of Band and Guard, T.S. Chanakya.

- Swimming Representative, IMU — represented institute at the Eighth Foundation Day in Chennai.

- Competitive participant in Inter-District Karate Tournaments and Inter-School Cricket Championships.

- Inter-School Science Olympiad participant (CBSE).

- Active Member, Swachh Bharat Abhiyan (2015).
