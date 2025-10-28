# 🚀 Kaip deploy'inti į Netlify

## Kadangi negalite parsisiųsti failų iš šios aplinkos, turime 2 būdus:

---

## BŪDAS 1: GitHub → Netlify (REKOMENDUOJU)

### Veiksmai:

1. **Sukurkite naują GitHub repository:**
   - Eikite į https://github.com/new
   - Repository name: `myestate-forms`
   - Public arba Private - jūsų pasirinkimas
   - Nespauskite "Initialize this repository with a README"
   - Spauskite "Create repository"

2. **Jūsų kompiuteryje sukurkite naują folderį ir inicializuokite Git:**

```bash
mkdir myestate-forms
cd myestate-forms
git init
```

3. **Sukurkite šiuos failus** (nukopijuokite turinį iš Claude Code projekto):

```
myestate-forms/
├── .env
├── .gitignore
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── index.html
├── netlify.toml
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── vite-env.d.ts
│   ├── lib/
│   │   └── supabase.ts
│   └── components/
│       ├── LandingPage.tsx
│       ├── LandSearchForm.tsx
│       ├── PropertySaleForm.tsx
│       ├── ProjectsForm.tsx
│       ├── AdminPanel.tsx
│       ├── ContactButtons.tsx
│       └── FileUpload.tsx
└── public/
    └── (nuotraukos)
```

**SVARBU**: `.env` failą NEPRIDĖKITE į Git! Jis jau turėtų būti `.gitignore` sąraše.

4. **Pridėkite failus į Git:**

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/JUSU-USERNAME/myestate-forms.git
git push -u origin main
```

5. **Deployment per Netlify:**

   - Eikite į https://app.netlify.com/
   - Prisijunkite
   - Spauskite **"Add new site"** → **"Import an existing project"**
   - Pasirinkite **"GitHub"**
   - Ieškokite ir pasirinkite `myestate-forms` repository
   - **Build settings:**
     - Build command: `npm run build`
     - Publish directory: `dist`
   - **Environment variables** (BŪTINA!):
     - `VITE_SUPABASE_URL` = `https://ctnbotdbmsddgiuctaua.supabase.co`
     - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0bmJvdGRibXNkZGdpdWN0YXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNzI5NDIsImV4cCI6MjA3NjY0ODk0Mn0.4lpGNZIP7pv2wIe4yxfUooRTwMVlf03jGPsuv9J-Yew`
   - Spauskite **"Deploy site"**

6. **Palaukite 2-3 minutes** kol build užsibaigs

7. **Gausite URL**, pvz.: `https://myestate-forms-xyz123.netlify.app`

---

## BŪDAS 2: Rankomis nukopijuoti failus

### Jei nenorite naudoti GitHub:

1. **Aš jums parodysiu kiekvieno failo turinį**
2. **Jūs nukopijuosite** į savo kompiuterį
3. **Palesite** `npm install` ir `npm run build`
4. **Upload'insite `dist` folderį** į Netlify

### Netlify Drag & Drop:

1. Eikite į https://app.netlify.com/drop
2. Nutempkite `dist` folderį į langą
3. **Svarbu**: Po to BŪTINAI pridėkite Environment Variables:
   - Site settings → Environment variables
   - Pridėkite `VITE_SUPABASE_URL` ir `VITE_SUPABASE_ANON_KEY`
   - Trigger deploy iš naujo

---

## ❗ KRITIŠKAI SVARBU

**Netlify PRIVALO turėti šiuos environment variables, kitaip formos NEVEIKS:**

```
VITE_SUPABASE_URL=https://ctnbotdbmsddgiuctaua.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0bmJvdGRibXNkZGdpdWN0YXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNzI5NDIsImV4cCI6MjA3NjY0ODk0Mn0.4lpGNZIP7pv2wIe4yxfUooRTwMVlf03jGPsuv9J-Yew
```

**BE ŠIŲ KINTAMŲJŲ NIEKAS NEVEIKS!**

---

## Kurį būdą pasirinkti?

- **GitHub būdas**: Geriausias, nes automatiškai deploy'ins kiekvieną kartą kai atnaujinsite kodą
- **Drag & Drop**: Greičiausias jei reikia dabar, bet reikės rankomis re-deploy'inti po kiekvieno pakeitimo

Rekomenduoju **GitHub būdą**!
