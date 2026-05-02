# OpenCRM

> Open source CRM som skyddar din data. Allt körs på din egen server.

A complete CRM for Swedish service companies. Self-hosted, MIT licensed,
no third-party data sharing.

**Live site:** [open-crm.org](https://open-crm.org)
**License:** [MIT](LICENSE)

---

## What's inside the product

OpenCRM bundles 10 modules covering the full flow from first contact to
paid invoice. Each one is a real, working view in the desktop app.

| Module        | What it does                                                                |
| ------------- | --------------------------------------------------------------------------- |
| **Workspace** | Home screen. Active projects, costs, invoicing and today's tasks.           |
| **Kunder**    | Companies, people and contact points with history, notes and status.        |
| **Projekt**   | Project detail with status flow, customer, ROT deduction and activity feed. |
| **Förslag**   | Quote with phases, labor, materials, ROT deduction and totals.              |
| **Kalender**  | Schedule with tasks, visits, deliveries and meetings — the team calendar.   |
| **Workflows** | Visual node editor: trigger → context → AI → action. Git-versioned.         |
| **Ekonomi**   | Cost vs budget per project. Margin, invoiced and outstanding.               |
| **Personal** | Staff, status, time reports to approve and time-off requests.               |
| **E-post**    | Inbox linked to customer and project. Threads, labels and search.           |
| **Chat**      | Internal communication linked to teams and projects.                        |

See every module live at [open-crm.org/sv/produkten](https://open-crm.org/sv/produkten).

---

## What this repository contains

This repo is the source for the **public website** at
[open-crm.org](https://open-crm.org) — the landing page that showcases
the product. Built with:

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS v4**
- **next-intl** for SV / EN / ES localisation
- **TypeScript 5**

The CRM application itself is a separate Electron desktop app and is
not part of this repository.

---

## Run the site locally

```bash
git clone https://github.com/rankgnar/open-crm-public.git
cd open-crm-public
npm install
npm run dev
```

Open [http://localhost:3030](http://localhost:3030).

### Build for production

```bash
npm run build
npm start
```

---

## Get the CRM

The OpenCRM desktop app is currently in private development. To get
access, deploy support or a custom installation, write to
**hello@open-crm.org** — see [open-crm.org/sv/tjanster](https://open-crm.org/sv/tjanster).

---

## License

[MIT](LICENSE) — fork it, run it, ship it.
