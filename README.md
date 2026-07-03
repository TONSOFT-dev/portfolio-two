# TONSOFT — Scalable Software Systems

> **Founder [Ahamed Nibras Jalaldeen](https://linkedin.com/in/nibras-jalaldeen)** · 8+ years at Amazon Web Services & Tamara Finance

A modern, high-performance portfolio website for **TONSOFT** — a next-generation software engineering company focused on building reliable, scalable, and secure systems for modern businesses.

---

## 🌐 Pages

| Route | Page |
|---|---|
| `/` | Home — Hero, Stats, Services Preview, Why TONSOFT, Process, Products |
| `/about` | About TONSOFT — Company story, team milestones, vision |
| `/services` | Services — Filterable grid of all 6 software services |
| `/products` | Products — In-development & coming soon products |
| `/tech-stack` | Tech Stack — Backend, Cloud, DevOps, Architecture |
| `/projects` | Track Record — Founder's pre-TONSOFT case studies with metrics |
| `/careers` | Careers — Open roles + general application |
| `/contact` | Contact — Form + contact methods |
| `/founder` | Founder — Ahamed Nibras Jalaldeen bio & experience |

---

## 🎨 Design System

### Colors
| Token | Hex | Usage |
|---|---|---|
| `solis` | `#FE8F04` | Amber — CTAs, highlights, icons |
| `noir` | `#0E2336` | Navy — primary background |
| `coal` | `#122840` | Surface navy — cards, panels |
| `slate` | `#94A3B8` | Muted text, secondary content |
| `pure` | `#ffffff` | Primary text |

### Typography
- **Headings**: [Syne](https://fonts.google.com/specimen/Syne) — bold, geometric
- **Body**: [Inter](https://fonts.google.com/specimen/Inter) — clean, readable

---

## 🚀 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16+ (App Router, Turbopack) |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion & GSAP + ScrollTrigger |
| **Smooth Scrolling** | Lenis |
| **Form Handling** | React Hook Form + Zod |
| **Icons** | Lucide React |
| **Fonts** | Google Fonts (Syne + Inter via `next/font`) |

---

## 📁 Project Structure

```
portfolio2/
├── app/
│   ├── layout.tsx            # Root layout (Syne + Inter fonts, metadata)
│   ├── globals.css           # Tailwind v4 @theme tokens (TONSOFT palette)
│   ├── page.tsx              # Home page
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── products/page.tsx
│   ├── tech-stack/page.tsx
│   ├── projects/page.tsx
│   ├── careers/page.tsx
│   ├── contact/page.tsx
│   └── founder/page.tsx
├── components/
│   ├── navigation/
│   │   ├── Header.tsx        # Sticky header (hide-on-scroll)
│   │   ├── Footer.tsx        # Full footer with nav + socials
│   │   ├── Logo.tsx          # Text logo: TON(white) + SOFT(amber)
│   │   ├── NavigationMenu.tsx
│   │   └── config.ts         # NAV_LINKS (8 pages)
│   ├── sections/
│   │   ├── home/             # HeroSection, StatsSection, FeaturedModelsSection
│   │   │                     # WhyChooseUsSection, HowItWorksSection,
│   │   │                     # BlogPreviewSection
│   │   ├── about/            # AboutHeroSection, AboutStorySection, AboutShowroomSection
│   │   └── contact/          # ContactFormSection
│   ├── animations/           # FadeIn, Flip3D, SplitTextReveal, ScrollStack, etc.
│   └── ui/                   # Button, Container, SectionHeader, Odometer, etc.
├── lib/
│   ├── data/
│   │   ├── services.ts       # 4 TONSOFT software services
│   │   ├── products.ts       # 3 in-development products
│   │   ├── stats.ts          # Company stats (7+ years, 50+ projects…)
│   │   └── testimonials.ts   # 12 client testimonials
│   └── utils.ts
└── public/
    └── images/               # Static assets
```

---

## 🛠 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/tonsoft/portfolio.git
   cd portfolio2
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

### Lint & Type Check

```bash
npm run lint
npx tsc --noEmit
```

---

## 📄 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 📬 Contact

**Email**: hello@tonsoft.io  
**Website**: [tonsoft.io](https://tonsoft.io)  
**LinkedIn**: [linkedin.com/company/tonsoft](https://linkedin.com/company/tonsoft)  
**GitHub**: [github.com/tonsoft](https://github.com/tonsoft)

---

© 2025 TONSOFT. All rights reserved. | Built with precision.
