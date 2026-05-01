// Trimmed copies of the CRM types — only the fields the live preview renders.

export interface Kund {
  id: string
  kundnummer: string
  namn: string
  email: string | null
  telefon: string | null
  stad: string | null
  org_nummer: string | null
  status: string
  skapad_at: string
}

export interface KundStatusar {
  id: string
  namn: string
  farg: 'emerald' | 'amber' | 'red' | 'blue' | 'muted'
  sortering: number
  skapad_at: string
}

export const KUND_FARG_DOT: Record<KundStatusar['farg'], string> = {
  emerald: 'bg-emerald-400',
  blue: 'bg-blue-400',
  amber: 'bg-amber-400',
  red: 'bg-red-400',
  muted: 'bg-muted',
}

export const KUND_FARG_TEXT: Record<KundStatusar['farg'], string> = {
  emerald: 'text-emerald-400',
  blue: 'text-blue-400',
  amber: 'text-amber-400',
  red: 'text-red-400',
  muted: 'text-muted',
}

export interface Projekt {
  id: string
  projekt_nummer: string
  namn: string
  beskrivning: string | null
  status: string
  startdatum: string
  slutdatum: string
  budget_total: number
  arbetsplats_adress: string | null
  arbetsplats_stad: string | null
  rot_avdrag: boolean
  rot_procent: number
  betalningsvillkor: string
  kundnummer: string
  kundnamn: string
  skapad_at: string
  uppdaterad_at: string
}

export type AnteckningFarg = 'emerald' | 'amber' | 'red' | 'blue' | 'muted'

export const ANTECKNING_DOT: Record<AnteckningFarg, string> = {
  emerald: 'bg-emerald-400 border-emerald-400',
  amber: 'bg-amber-400 border-amber-400',
  red: 'bg-red-400 border-red-400',
  blue: 'bg-blue-400 border-blue-400',
  muted: 'bg-subtle border-subtle',
}

export interface Anteckning {
  id: string
  titel: string
  innehall: string
  farg: AnteckningFarg
  skapad_at: string
}

export interface Aktivitet {
  id: string
  text: string
  skapad_at: string
}

export interface KalenderEvent {
  id: string
  titel: string
  start: string
  end?: string | null
  typ: 'uppgift' | 'besok' | 'leverans' | 'mote'
  projekt: string | null
  slutford?: boolean
}

export interface ForslagFasArbete {
  beskrivning: string
  timmar: number
  timpris: number
}

export interface ForslagFasMaterial {
  beskrivning: string
  antal: number
  enhet: string
  a_pris: number
}

export interface ForslagFas {
  id: string
  namn: string
  arbete: ForslagFasArbete[]
  material: ForslagFasMaterial[]
}

export type WorkflowNodeKind =
  | 'trigger'
  | 'ai-generate'
  | 'data-context'
  | 'action-save'
  | 'action-pdf'
  | 'action-email'
  | 'condition'

export interface WorkflowNode {
  id: string
  kind: WorkflowNodeKind
  label: string
  sub?: string
  status?: 'idle' | 'running' | 'ok' | 'error'
  x: number
  y: number
}

export interface WorkflowEdge {
  from: string
  to: string
  label?: string
}

export interface Workflow {
  id: string
  namn: string
  beskrivning: string
  trigger_label: string
  active: boolean
  runs_30d: number
  succes_rate: number
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  log: { id: string; status: 'ok' | 'error' | 'running'; node: string; time: string; ms?: number }[]
}

export interface PersonalMember {
  id: string
  namn: string
  yrke: string
  status: 'aktiv' | 'ledig' | 'inaktiv'
  initials: string
  color: 'cyan' | 'emerald' | 'amber' | 'rose' | 'violet' | 'blue'
  timmar_v: number
  timmar_v_max: number
  rapporter_pending: number
  ledighet_pending: number
}

export interface EkonomiProjectRow {
  projekt_nummer: string
  namn: string
  kund: string
  budget: number
  forbrukat: number
  fakturerat: number
  marginal_pct: number
  status: 'green' | 'amber' | 'red'
}

export interface ChatThread {
  id: string
  namn: string
  yrke: string
  initials: string
  color: 'cyan' | 'emerald' | 'amber' | 'rose' | 'violet' | 'blue'
  preview: string
  time: string
  unread: number
  online?: boolean
}

export interface ChatMessage {
  id: string
  fromMe: boolean
  text: string
  time: string
}

export interface WorkspaceOverview {
  kunder: { total: number; nya_senaste_vecka: number; sparkline_30d: number[] }
  projekt: { total: number; per_status: { status: string; count: number }[] }
  forslag: { total: number; per_status: { status: string; count: number }[] }
  ordrar: { total: number; per_status: { status: string; count: number }[]; belopp_aktiva: number }
  tidplan: { per_dag_denna_vecka: { datum: string; count: number }[]; idag: number; imorgon: number }
  kostnader: { denna_manad: number; foregaende_manad: number; sparkline_12m: number[] }
  signatur: { vantande: number; signerade_30d: number }
  kalender: {
    idag: number
    nasta_handelser: { id: string; titel: string; start: string }[]
  }
  personal: { aktiva: number; total: number; tidrapporter_inskickade: number; lediga_idag: number }
  fortnox: { senaste_synk: string; status: 'ok' }
  fakturering: { antal_planer: number; total_planerat: number; nasta_forfall: { datum: string; belopp: number } | null }
  ai: {
    leverantorer: { slug: string; namn: string; status: 'ok' | 'no_key' | 'inaktiv' }[]
    assistenter_aktiva: number
    workflows_aktiva: number
    noder_count: number
    kontext_count: number
  }
}

export interface Forslag {
  id: string
  forslag_nummer: string
  titel: string
  status: 'utkast' | 'skickat' | 'accepterat' | 'avvisat'
  kundnamn: string
  projekt_namn: string
  rot_avdrag: boolean
  rot_procent: number
  rot_inkludera_medsokande: boolean
  moms_procent: number
  faser: ForslagFas[]
  skapad_at: string
}
