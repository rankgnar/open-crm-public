import type {
  Kund,
  KundStatusar,
  Projekt,
  Anteckning,
  Aktivitet,
  KalenderEvent,
  Forslag,
  Workflow,
  PersonalMember,
  EkonomiProjectRow,
  ChatThread,
  ChatMessage,
} from './types'

export const kundStatusar: KundStatusar[] = [
  { id: 's1', namn: 'Aktiv', farg: 'emerald', sortering: 1, skapad_at: '2024-01-01' },
  { id: 's2', namn: 'Pågående', farg: 'blue', sortering: 2, skapad_at: '2024-01-01' },
  { id: 's3', namn: 'Vilande', farg: 'amber', sortering: 3, skapad_at: '2024-01-01' },
  { id: 's4', namn: 'Avslutad', farg: 'muted', sortering: 4, skapad_at: '2024-01-01' },
  { id: 's5', namn: 'Förlorad', farg: 'red', sortering: 5, skapad_at: '2024-01-01' },
]

export const kunder: Kund[] = [
  {
    id: 'k1',
    kundnummer: 'K-1024',
    namn: 'Karlsson Bygg AB',
    email: 'kontakt@karlssonbygg.se',
    telefon: '08-441 22 10',
    stad: 'Stockholm',
    org_nummer: '5567891234',
    status: 'Pågående',
    skapad_at: '2025-09-12',
  },
  {
    id: 'k2',
    kundnummer: 'K-1025',
    namn: 'BRF Solrosen 14',
    email: 'styrelsen@brfsolrosen.se',
    telefon: '08-512 33 04',
    stad: 'Solna',
    org_nummer: '7691234567',
    status: 'Aktiv',
    skapad_at: '2025-10-02',
  },
  {
    id: 'k3',
    kundnummer: 'K-1026',
    namn: 'Andersson Måleri & Tapet',
    email: 'info@anderssonmaleri.se',
    telefon: '070-211 44 80',
    stad: 'Uppsala',
    org_nummer: '5566778899',
    status: 'Aktiv',
    skapad_at: '2025-10-08',
  },
  {
    id: 'k4',
    kundnummer: 'K-1027',
    namn: 'Lindqvist Familj',
    email: 'eva.lindqvist@gmail.com',
    telefon: '073-885 21 14',
    stad: 'Bromma',
    org_nummer: '198506121234',
    status: 'Pågående',
    skapad_at: '2025-10-15',
  },
  {
    id: 'k5',
    kundnummer: 'K-1028',
    namn: 'Nordström Fastigheter AB',
    email: 'projekt@nordstromfastigheter.se',
    telefon: '08-720 18 90',
    stad: 'Stockholm',
    org_nummer: '5564455667',
    status: 'Pågående',
    skapad_at: '2025-10-22',
  },
  {
    id: 'k6',
    kundnummer: 'K-1029',
    namn: 'Johansson Snickeri AB',
    email: 'order@johanssonsnickeri.se',
    telefon: '08-661 30 12',
    stad: 'Sollentuna',
    org_nummer: '5562331144',
    status: 'Vilande',
    skapad_at: '2025-11-04',
  },
  {
    id: 'k7',
    kundnummer: 'K-1030',
    namn: 'Bergström El & Service',
    email: 'service@bergstromel.se',
    telefon: '08-330 99 21',
    stad: 'Täby',
    org_nummer: '5567844523',
    status: 'Aktiv',
    skapad_at: '2025-11-11',
  },
  {
    id: 'k8',
    kundnummer: 'K-1031',
    namn: 'Sandberg Familj',
    email: 'mikael@sandberg.nu',
    telefon: '076-220 14 55',
    stad: 'Lidingö',
    org_nummer: '197812055521',
    status: 'Pågående',
    skapad_at: '2025-11-19',
  },
  {
    id: 'k9',
    kundnummer: 'K-1032',
    namn: 'Westerberg Café & Kök',
    email: 'hanna@westerbergcafe.se',
    telefon: '070-411 92 03',
    stad: 'Vasastan',
    org_nummer: '5568890011',
    status: 'Aktiv',
    skapad_at: '2025-11-28',
  },
  {
    id: 'k10',
    kundnummer: 'K-1033',
    namn: 'Hedmark Konsult AB',
    email: 'info@hedmarkkonsult.se',
    telefon: '08-200 14 33',
    stad: 'Stockholm',
    org_nummer: '5562334455',
    status: 'Avslutad',
    skapad_at: '2025-12-02',
  },
  {
    id: 'k11',
    kundnummer: 'K-1034',
    namn: 'Eriksson VVS',
    email: 'jourtelefon@erikssonvvs.se',
    telefon: '08-712 44 80',
    stad: 'Sundbyberg',
    org_nummer: '5567788991',
    status: 'Pågående',
    skapad_at: '2025-12-09',
  },
  {
    id: 'k12',
    kundnummer: 'K-1035',
    namn: 'Strömberg Familj',
    email: 'lasse.stromberg@hotmail.com',
    telefon: '073-114 22 67',
    stad: 'Saltsjöbaden',
    org_nummer: '196504182233',
    status: 'Aktiv',
    skapad_at: '2025-12-15',
  },
  {
    id: 'k13',
    kundnummer: 'K-1036',
    namn: 'Lundqvist Plåt AB',
    email: 'kontakt@lundqvistplat.se',
    telefon: '08-554 21 09',
    stad: 'Bromma',
    org_nummer: '5563322114',
    status: 'Förlorad',
    skapad_at: '2025-12-22',
  },
  {
    id: 'k14',
    kundnummer: 'K-1037',
    namn: 'BRF Linden 7',
    email: 'styrelsen@brflinden7.se',
    telefon: '08-441 22 91',
    stad: 'Vasastan',
    org_nummer: '7692244556',
    status: 'Aktiv',
    skapad_at: '2026-01-05',
  },
  {
    id: 'k15',
    kundnummer: 'K-1038',
    namn: 'Holm Familj',
    email: 'sofie.holm@outlook.com',
    telefon: '070-885 11 23',
    stad: 'Nacka',
    org_nummer: '198902145566',
    status: 'Pågående',
    skapad_at: '2026-01-14',
  },
]

export const projekt: Projekt = {
  id: 'p1',
  projekt_nummer: 'PRJ-2487',
  namn: 'Renovering — Vasagatan 44',
  beskrivning:
    'Totalrenovering av lägenhet 3 RoK på 78 kvm. Inkluderar rivning, ny el-dragning, nytt kök från HTH, helkaklat badrum, golv i ek-parkett, samt målning av samtliga ytor. Arbetet planeras till 12 veckor med start vecka 38.',
  status: 'Pågående',
  startdatum: '2026-03-02',
  slutdatum: '2026-05-29',
  budget_total: 850000,
  arbetsplats_adress: 'Vasagatan 44, 4 tr',
  arbetsplats_stad: 'Stockholm',
  rot_avdrag: true,
  rot_procent: 30,
  betalningsvillkor: '14 dagar netto',
  kundnummer: 'K-1024',
  kundnamn: 'Karlsson Bygg AB',
  skapad_at: '2026-02-18',
  uppdaterad_at: '2026-04-30',
}

export const anteckningar: Anteckning[] = [
  {
    id: 'a1',
    titel: 'Kundmöte — startbeslut',
    innehall:
      'Möte med Karlsson, gick igenom omfattning, ROT, betalningsplan. Kunden vill ha högt avtryck i kök, valde Kvarnsten-kakel.',
    farg: 'emerald',
    skapad_at: '2026-02-18T14:30:00Z',
  },
  {
    id: 'a2',
    titel: 'Materialleverans — kök',
    innehall: 'HTH bekräftade leverans v.13. Skåp i ek, bänkskiva i Caesarstone Calacatta.',
    farg: 'blue',
    skapad_at: '2026-03-08T10:15:00Z',
  },
  {
    id: 'a3',
    titel: 'OBS! Vatten i golvbjälklag',
    innehall: 'Hittade fukt under befintligt golv. Måste torkas innan ny installation. Förskjuter slutdatum med ca 1v.',
    farg: 'red',
    skapad_at: '2026-03-21T08:42:00Z',
  },
  {
    id: 'a4',
    titel: 'Avstämning — el-installation',
    innehall: 'Bergström El godkände dragningen, slutbesiktning planerad fredag.',
    farg: 'amber',
    skapad_at: '2026-04-12T16:05:00Z',
  },
  {
    id: 'a5',
    titel: 'Faktura #245 betald',
    innehall: 'Etapp 3 inbetald. Kunden frågar om tillval LED-spotlights i hall — offert sänds.',
    farg: 'emerald',
    skapad_at: '2026-04-26T11:00:00Z',
  },
]

export const aktiviteter: Aktivitet[] = [
  { id: 'akt1', text: 'Status ändrad till Pågående', skapad_at: '2026-03-02T09:00:00Z' },
  { id: 'akt2', text: 'Offert OFF-245 accepterad av kund', skapad_at: '2026-03-04T14:22:00Z' },
  { id: 'akt3', text: 'Faktura #244 skickad', skapad_at: '2026-03-15T10:00:00Z' },
  { id: 'akt4', text: 'Etapp Stomme markerad slutförd', skapad_at: '2026-04-02T17:30:00Z' },
]

export const kalenderEvents: KalenderEvent[] = [
  { id: 'e1', titel: 'Besök Vasagatan', start: '2026-05-04T08:00:00', end: '2026-05-04T11:00:00', typ: 'besok', projekt: 'PRJ-2487' },
  { id: 'e2', titel: 'Leverans HTH-kök', start: '2026-05-05T09:30:00', end: '2026-05-05T11:00:00', typ: 'leverans', projekt: 'PRJ-2487' },
  { id: 'e3', titel: 'Möte BRF Solrosen', start: '2026-05-05T14:00:00', end: '2026-05-05T15:30:00', typ: 'mote', projekt: 'PRJ-2491' },
  { id: 'e4', titel: 'Måleri vardagsrum', start: '2026-05-06T07:30:00', typ: 'uppgift', projekt: 'PRJ-2487' },
  { id: 'e5', titel: 'Slutbesiktning el', start: '2026-05-07T10:00:00', end: '2026-05-07T12:00:00', typ: 'mote', projekt: 'PRJ-2487' },
  { id: 'e6', titel: 'Leverans parkett', start: '2026-05-08T08:00:00', typ: 'leverans', projekt: 'PRJ-2487' },
  { id: 'e7', titel: 'Måleri kök', start: '2026-05-11T07:30:00', typ: 'uppgift', projekt: 'PRJ-2487', slutford: true },
  { id: 'e8', titel: 'Möte Lindqvist', start: '2026-05-12T13:00:00', end: '2026-05-12T14:00:00', typ: 'mote', projekt: 'PRJ-2492' },
  { id: 'e9', titel: 'Besök Nordström', start: '2026-05-13T09:00:00', end: '2026-05-13T10:30:00', typ: 'besok', projekt: 'PRJ-2493' },
  { id: 'e10', titel: 'Golvläggning', start: '2026-05-14T08:00:00', typ: 'uppgift', projekt: 'PRJ-2487' },
  { id: 'e11', titel: 'Slutbesiktning', start: '2026-05-15T13:00:00', end: '2026-05-15T15:00:00', typ: 'mote', projekt: 'PRJ-2487' },
  { id: 'e12', titel: 'Överlämning kund', start: '2026-05-18T11:00:00', end: '2026-05-18T12:00:00', typ: 'mote', projekt: 'PRJ-2487' },
  { id: 'e13', titel: 'Besök offert', start: '2026-05-19T09:00:00', typ: 'besok', projekt: null },
  { id: 'e14', titel: 'Leverans badkar', start: '2026-05-20T08:00:00', typ: 'leverans', projekt: 'PRJ-2491' },
  { id: 'e15', titel: 'Garantiärende', start: '2026-05-21T10:00:00', typ: 'uppgift', projekt: 'PRJ-2480' },
]

export const forslag: Forslag = {
  id: 'f1',
  forslag_nummer: 'OFF-245',
  titel: 'Renovering — Vasagatan 44',
  status: 'accepterat',
  kundnamn: 'Karlsson Bygg AB',
  projekt_namn: 'PRJ-2487',
  rot_avdrag: true,
  rot_procent: 30,
  rot_inkludera_medsokande: false,
  moms_procent: 25,
  skapad_at: '2026-02-22',
  faser: [
    {
      id: 'fas1',
      namn: 'Förberedelse & rivning',
      arbete: [
        { beskrivning: 'Rivning av befintligt kök', timmar: 24, timpris: 595 },
        { beskrivning: 'Rivning badrum', timmar: 16, timpris: 595 },
        { beskrivning: 'Bortforsling avfall', timmar: 8, timpris: 495 },
      ],
      material: [
        { beskrivning: 'Container 8m³', antal: 1, enhet: 'st', a_pris: 4200 },
        { beskrivning: 'Skyddsplast & täckmateriel', antal: 1, enhet: 'klp', a_pris: 1800 },
      ],
    },
    {
      id: 'fas2',
      namn: 'El & VVS',
      arbete: [
        { beskrivning: 'Ny el-dragning, hela lägenheten', timmar: 64, timpris: 695 },
        { beskrivning: 'VVS-omdragning kök & bad', timmar: 48, timpris: 695 },
      ],
      material: [
        { beskrivning: 'Kabel & el-material', antal: 1, enhet: 'klp', a_pris: 14800 },
        { beskrivning: 'VVS-rör & kopplingar', antal: 1, enhet: 'klp', a_pris: 9600 },
      ],
    },
    {
      id: 'fas3',
      namn: 'Kök & badrum',
      arbete: [
        { beskrivning: 'Kakelsättning badrum (helkaklat)', timmar: 56, timpris: 645 },
        { beskrivning: 'Köksinstallation HTH', timmar: 40, timpris: 645 },
      ],
      material: [
        { beskrivning: 'HTH-kök komplett', antal: 1, enhet: 'klp', a_pris: 92000 },
        { beskrivning: 'Caesarstone bänkskiva', antal: 1, enhet: 'klp', a_pris: 24500 },
        { beskrivning: 'Badrumskakel Kvarnsten', antal: 38, enhet: 'm²', a_pris: 740 },
        { beskrivning: 'Sanitetsporslin (badrum komplett)', antal: 1, enhet: 'klp', a_pris: 18900 },
      ],
    },
    {
      id: 'fas4',
      namn: 'Ytskikt & målning',
      arbete: [
        { beskrivning: 'Parkettläggning ek', timmar: 32, timpris: 595 },
        { beskrivning: 'Målning samtliga väggar & tak', timmar: 80, timpris: 545 },
      ],
      material: [
        { beskrivning: 'Ek-parkett 14mm', antal: 65, enhet: 'm²', a_pris: 895 },
        { beskrivning: 'Färg, spackel, primer', antal: 1, enhet: 'klp', a_pris: 6800 },
      ],
    },
  ],
}

import type { WorkspaceOverview } from './types'

export const workspaceOverview: WorkspaceOverview = {
  kunder: {
    total: 247,
    nya_senaste_vecka: 6,
    sparkline_30d: [3, 4, 2, 5, 7, 4, 3, 6, 5, 8, 6, 9, 7, 6, 8, 10, 9, 11, 8, 12, 10, 9, 11, 13, 12, 10, 14, 12, 13, 15],
  },
  projekt: {
    total: 38,
    per_status: [
      { status: 'Pågående', count: 14 },
      { status: 'Planerad', count: 9 },
      { status: 'Förberedelse', count: 6 },
      { status: 'Slutbesiktning', count: 5 },
      { status: 'Avslutad', count: 4 },
    ],
  },
  forslag: {
    total: 22,
    per_status: [
      { status: 'Skickat', count: 9 },
      { status: 'Accepterat', count: 7 },
      { status: 'Utkast', count: 4 },
    ],
  },
  ordrar: {
    total: 17,
    per_status: [
      { status: 'Pågående', count: 11 },
      { status: 'Avslutad', count: 4 },
      { status: 'Pausad', count: 2 },
    ],
    belopp_aktiva: 1842600,
  },
  tidplan: {
    idag: 7,
    imorgon: 5,
    per_dag_denna_vecka: [
      { datum: '2026-05-04', count: 7 },
      { datum: '2026-05-05', count: 5 },
      { datum: '2026-05-06', count: 9 },
      { datum: '2026-05-07', count: 4 },
      { datum: '2026-05-08', count: 6 },
      { datum: '2026-05-09', count: 2 },
      { datum: '2026-05-10', count: 0 },
    ],
  },
  kostnader: {
    denna_manad: 412800,
    foregaende_manad: 384200,
    sparkline_12m: [220, 245, 280, 312, 298, 345, 388, 360, 412, 445, 384, 412],
  },
  signatur: { vantande: 3, signerade_30d: 14 },
  kalender: {
    idag: 4,
    nasta_handelser: [
      { id: 'k1', titel: 'Besök Vasagatan 44', start: '2026-05-05T08:00:00' },
      { id: 'k2', titel: 'Möte BRF Solrosen', start: '2026-05-05T14:00:00' },
    ],
  },
  personal: { aktiva: 12, total: 14, tidrapporter_inskickade: 4, lediga_idag: 1 },
  fortnox: { senaste_synk: '2026-05-04T07:30:00', status: 'ok' },
  fakturering: {
    antal_planer: 8,
    total_planerat: 1240500,
    nasta_forfall: { datum: '2026-05-08', belopp: 184200 },
  },
  ai: {
    leverantorer: [
      { slug: 'anthropic', namn: 'Claude', status: 'ok' },
      { slug: 'openai', namn: 'OpenAI', status: 'ok' },
      { slug: 'google', namn: 'Gemini', status: 'no_key' },
      { slug: 'mistral', namn: 'Mistral', status: 'inaktiv' },
    ],
    assistenter_aktiva: 7,
    workflows_aktiva: 11,
    noder_count: 84,
    kontext_count: 23,
  },
}

// ─── Workflows ──────────────────────────────────────────────

export const workflows: Workflow[] = [
  {
    id: 'wf1',
    namn: 'Offert → AI-utkast → Skicka för signatur',
    beskrivning:
      'När en offert markeras som "Klar för granskning", använd AI för att generera följebrev, spara i kontext och skicka för signering till kund.',
    trigger_label: 'forslag.status = klar_for_granskning',
    active: true,
    runs_30d: 47,
    succes_rate: 0.96,
    nodes: [
      { id: 'n1', kind: 'trigger', label: 'Trigger', sub: 'Status: klar_för_granskning', x: 40, y: 90, status: 'ok' },
      { id: 'n2', kind: 'data-context', label: 'Hämta projekt-kontext', sub: '4 dokument · 2 kund-anteckningar', x: 240, y: 90, status: 'ok' },
      { id: 'n3', kind: 'ai-generate', label: 'AI · Claude Sonnet', sub: 'Generera följebrev (sv-SE)', x: 440, y: 40, status: 'ok' },
      { id: 'n4', kind: 'action-pdf', label: 'Render PDF', sub: 'Mall: offert_v3.tsx', x: 440, y: 160, status: 'ok' },
      { id: 'n5', kind: 'action-save', label: 'Spara i kontext', sub: 'projekt_dokument', x: 660, y: 160, status: 'ok' },
      { id: 'n6', kind: 'action-email', label: 'Skicka för signatur', sub: 'Zoho · kunden@example.se', x: 660, y: 40, status: 'running' },
    ],
    edges: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n2', to: 'n4' },
      { from: 'n3', to: 'n6' },
      { from: 'n4', to: 'n5' },
      { from: 'n5', to: 'n6' },
    ],
    log: [
      { id: 'l1', status: 'ok', node: 'Trigger · forslag.status', time: '09:41:02', ms: 12 },
      { id: 'l2', status: 'ok', node: 'Hämta projekt-kontext', time: '09:41:02', ms: 184 },
      { id: 'l3', status: 'ok', node: 'AI · Claude Sonnet', time: '09:41:03', ms: 2841 },
      { id: 'l4', status: 'ok', node: 'Render PDF', time: '09:41:06', ms: 412 },
      { id: 'l5', status: 'ok', node: 'Spara i kontext', time: '09:41:07', ms: 88 },
      { id: 'l6', status: 'running', node: 'Skicka för signatur', time: '09:41:07' },
    ],
  },
]

// ─── Personal ───────────────────────────────────────────────

export const personalMembers: PersonalMember[] = [
  { id: 'p1', namn: 'Anders Lindqvist', yrke: 'Snickare', status: 'aktiv', initials: 'AL', color: 'cyan', timmar_v: 38, timmar_v_max: 40, rapporter_pending: 0, ledighet_pending: 0 },
  { id: 'p2', namn: 'Maria Bergström', yrke: 'Projektledare', status: 'aktiv', initials: 'MB', color: 'emerald', timmar_v: 42, timmar_v_max: 40, rapporter_pending: 1, ledighet_pending: 0 },
  { id: 'p3', namn: 'Johan Karlsson', yrke: 'Elektriker', status: 'aktiv', initials: 'JK', color: 'amber', timmar_v: 36, timmar_v_max: 40, rapporter_pending: 1, ledighet_pending: 0 },
  { id: 'p4', namn: 'Erika Nyström', yrke: 'Målare', status: 'ledig', initials: 'EN', color: 'rose', timmar_v: 0, timmar_v_max: 40, rapporter_pending: 0, ledighet_pending: 1 },
  { id: 'p5', namn: 'Lars Holmberg', yrke: 'VVS-tekniker', status: 'aktiv', initials: 'LH', color: 'violet', timmar_v: 40, timmar_v_max: 40, rapporter_pending: 0, ledighet_pending: 0 },
  { id: 'p6', namn: 'Sofie Andersson', yrke: 'Plattsättare', status: 'aktiv', initials: 'SA', color: 'blue', timmar_v: 39, timmar_v_max: 40, rapporter_pending: 1, ledighet_pending: 0 },
  { id: 'p7', namn: 'Mikael Eriksson', yrke: 'Snickare', status: 'aktiv', initials: 'ME', color: 'cyan', timmar_v: 35, timmar_v_max: 40, rapporter_pending: 1, ledighet_pending: 0 },
  { id: 'p8', namn: 'Petra Sandberg', yrke: 'Lärling', status: 'aktiv', initials: 'PS', color: 'emerald', timmar_v: 32, timmar_v_max: 40, rapporter_pending: 0, ledighet_pending: 0 },
]

// ─── Ekonomi ────────────────────────────────────────────────

export const ekonomiProjects: EkonomiProjectRow[] = [
  { projekt_nummer: 'PRJ-2487', namn: 'Renovering — Vasagatan 44', kund: 'Karlsson Bygg AB', budget: 850000, forbrukat: 612400, fakturerat: 425000, marginal_pct: 18.4, status: 'green' },
  { projekt_nummer: 'PRJ-2491', namn: 'Stamspolning — BRF Solrosen', kund: 'BRF Solrosen 14', budget: 320000, forbrukat: 148200, fakturerat: 80000, marginal_pct: 22.1, status: 'green' },
  { projekt_nummer: 'PRJ-2492', namn: 'Köksrenovering — Lindqvist', kund: 'Lindqvist Familj', budget: 220000, forbrukat: 198400, fakturerat: 110000, marginal_pct: 6.2, status: 'amber' },
  { projekt_nummer: 'PRJ-2493', namn: 'Tillbyggnad — Nordström', kund: 'Nordström Fastigheter AB', budget: 1240000, forbrukat: 1180000, fakturerat: 760000, marginal_pct: -2.4, status: 'red' },
  { projekt_nummer: 'PRJ-2480', namn: 'Garantiärende — Holm', kund: 'Holm Familj', budget: 45000, forbrukat: 32100, fakturerat: 0, marginal_pct: 28.0, status: 'green' },
  { projekt_nummer: 'PRJ-2495', namn: 'Badrum — Sandberg', kund: 'Sandberg Familj', budget: 185000, forbrukat: 41200, fakturerat: 0, marginal_pct: 24.0, status: 'green' },
]

// ─── Chat ───────────────────────────────────────────────────

export const chatThreads: ChatThread[] = [
  { id: 'p1', namn: 'Anders Lindqvist', yrke: 'Snickare', initials: 'AL', color: 'cyan', preview: 'Klar med stommen, börjar med kök imorgon', time: '09:24', unread: 2, online: true },
  { id: 'p2', namn: 'Maria Bergström', yrke: 'Projektledare', initials: 'MB', color: 'emerald', preview: 'Du: skickar offerten ikväll', time: '08:50', unread: 0, online: true },
  { id: 'p3', namn: 'Johan Karlsson', yrke: 'Elektriker', initials: 'JK', color: 'amber', preview: 'Materiallistan ligger på driven', time: 'Igår', unread: 1 },
  { id: 'p4', namn: 'Erika Nyström', yrke: 'Målare', initials: 'EN', color: 'rose', preview: 'Tillbaka måndag — semester hela vec...', time: 'Igår', unread: 0 },
  { id: 'p5', namn: 'Lars Holmberg', yrke: 'VVS-tekniker', initials: 'LH', color: 'violet', preview: 'Stamspolningen klar, allt OK', time: 'mån', unread: 0 },
  { id: 'p6', namn: 'Sofie Andersson', yrke: 'Plattsättare', initials: 'SA', color: 'blue', preview: 'Du: kvarnsten levereras tors', time: 'mån', unread: 0 },
]

export const chatMessages: ChatMessage[] = [
  { id: 'm1', fromMe: false, text: 'Hej! Stommen är klar nu, allt enligt ritning.', time: '08:42' },
  { id: 'm2', fromMe: false, text: 'Behöver du bilder eller räcker det med checklistan?', time: '08:42' },
  { id: 'm3', fromMe: true, text: 'Ta gärna 2-3 bilder så lägger vi upp i projekt-dokumenten. Tack!', time: '08:55' },
  { id: 'm4', fromMe: false, text: 'Klart. Laddar upp nu.', time: '09:11' },
  { id: 'm5', fromMe: false, text: 'Klar med stommen, börjar med kök imorgon', time: '09:24' },
]

export type Theme = 'dark' | 'light'
