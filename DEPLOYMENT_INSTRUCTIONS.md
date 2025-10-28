# MyEstate Forms - Deployment Instrukcijos

## ✅ Paruošta

1. **Google Sheets integracija sukonfigūruota**
   - Spreadsheet ID: `1DWv5-6T_HXq6JVK1Sh_B7iKmcH7vGODJ`
   - Trys lapai paruošti: "Žemės paieška", "NT pardavimas", "Projektai"
   - Edge funkcija automatiškai sinchronizuoja duomenis

2. **Supabase konfigūracija baigta**
   - Duomenų bazė sukurta
   - Edge funkcija deployed ir veikia
   - Automatinė sinchronizacija veikia

3. **Projektas paruoštas deployment**
   - Build sistema sukonfigūruota
   - `dist` aplankas sugeneruotas
   - Netlify konfigūracija paruošta

---

## 🚀 Deployment per Netlify (REKOMENDUOJAMA)

### Variantas 1: Drag & Drop (Greičiausias)

1. Eikite į: **https://app.netlify.com/**
2. Prisijunkite arba sukurkite nemokamą paskyrą
3. Paspauskite **"Add new site"** → **"Deploy manually"**
4. **Nutempkite** `/tmp/cc-agent/55473404/project/dist` aplanką į Netlify langą
5. Palaukite kol užsikrauna (~30 sek)
6. **Gausite URL**: pvz., `https://myestate-forms-xyz123.netlify.app`

### ⚠️ SVARBU: Pridėti Environment Variables

**BE ŠIŲ KINTAMŲJŲ FORMOS NEVEIKS!**

7. Netlify Dashboard → **Site settings** → **Environment variables**
8. Paspauskite **"Add a variable"** ir pridėkite šiuos 2 kintamuosius:

   **Kintamasis 1:**
   - Key: `VITE_SUPABASE_URL`
   - Value: `https://ctnbotdbmsddgiuctaua.supabase.co`

   **Kintamasis 2:**
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0bmJvdGRibXNkZGdpdWN0YXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNzI5NDIsImV4cCI6MjA3NjY0ODk0Mn0.4lpGNZIP7pv2wIe4yxfUooRTwMVlf03jGPsuv9J-Yew`

9. **Išsaugokite** ir **Redeploy** svetainę:
   - Deploys → **Trigger deploy** → **Deploy site**

10. Palaukite ~1 min kol pabaigia rebuild

### Variantas 2: Netlify CLI

```bash
# 1. Įdiekite Netlify CLI
npm install -g netlify-cli

# 2. Prisijunkite
netlify login

# 3. Deploy
cd /tmp/cc-agent/55473404/project
netlify deploy --prod --dir=dist
```

**Nepamirškite pridėti Environment Variables per Netlify Dashboard** (žiūrėkite žingsnius 7-10 aukščiau)!

---

## 🌐 Prijungti savo domeną (Pasirenkama)

Jei norite naudoti subdomeną kaip `forms.myestate.lt`:

1. **Netlify Dashboard** → **Domain settings**
2. **Add custom domain** → Įveskite `forms.myestate.lt`
3. **Netlify duos DNS instrukcijas** (CNAME įrašas)
4. **Pridėkite CNAME įrašą** pas savo domeno tiekėją:
   ```
   Type: CNAME
   Name: forms
   Value: myestate-forms-xyz123.netlify.app
   ```
5. Palaukite ~5-30 min. DNS propagacijai

---

## 📱 Kaip naudoti URL reklamose

Kai gausite galutinį URL (pvz., `https://forms.myestate.lt` arba `https://myestate-forms-xyz123.netlify.app`), galite:

### Facebook/Instagram Reklamose:
- **Landing page URL**: `https://forms.myestate.lt`
- **Call to Action**: "Pateikti užklausą" / "Sužinoti daugiau"

### Google Ads:
- **Final URL**: `https://forms.myestate.lt`
- **Display URL**: `myestate.lt/forms`

### Socialiniuose tinkluose:
- **Bio nuoroda**: `https://forms.myestate.lt`
- **Post nuorodos**: Tiesiogiai į formų puslapį

### Pagrindinėje svetainėje (www.myestate.lt):
```html
<!-- Mygtukas HTML -->
<a href="https://forms.myestate.lt"
   class="btn btn-primary"
   target="_blank">
  Pateikti užklausą
</a>
```

---

## 🎯 Konkretūs formų URL'ai

Norėdami vesti tiesiai į specifinę formą, naudokite:

- **Landing puslapis**: `https://forms.myestate.lt/`
- *(Visi formų pasirinkimai rodomi)*

**Pastaba**: Dabar yra vienas landing puslapis su trimis pasirinkimais. Jei norite tiesioginius URL'us kiekvienai formai (pvz., `https://forms.myestate.lt/land-search`), pasakykite - pridėsiu routing'ą!

---

## ✅ Testavimas

Po deployment:

1. **Atidarykite URL** naršyklėje
2. **Užpildykite bet kurią formą** su testavimo duomenimis
3. **Patikrinkite Google Sheets** - duomenys turėtų atsirasti per 1-2 sekundes
4. **Patikrinkite, ar veikia**:
   - Formų pildymas
   - Failų įkėlimas
   - GDPR checkbox
   - Sėkmės pranešimas

---

## 🔧 Jei kažkas neveikia

1. **Formos nepasiekiamos arba rodo klaidą "Įvyko klaida"**:
   - ⚠️ **PIRMAS DALYKAS**: Patikrinkite ar pridėjote Environment Variables!
   - Eikite į Netlify Dashboard → Site settings → Environment variables
   - Turi būti 2 kintamieji: `VITE_SUPABASE_URL` ir `VITE_SUPABASE_ANON_KEY`
   - Po pridėjimo BŪTINAI redeploy: Deploys → Trigger deploy → Deploy site

2. **Duomenys nepatenka į Sheets**:
   - Patikrinkite ar Spreadsheet ID teisingas
   - Patikrinkite ar Google Service Account turi prieigą

3. **Failai neįkeliami**:
   - Supabase Storage bucket "form-uploads" turi būti public

4. **Forma veikia kompiuteryje, bet ne telefone**:
   - Tai 100% reiškia, kad Netlify neturi Environment Variables
   - Žiūrėkite sprendimą punkte #1

---

## 📞 Reikalinga pagalba?

- Edge funkcija: `https://ctnbotdbmsddgiuctaua.supabase.co/functions/v1/sync-to-sheets`
- Supabase URL: `https://ctnbotdbmsddgiuctaua.supabase.co`
- Google Sheets: `https://docs.google.com/spreadsheets/d/1DWv5-6T_HXq6JVK1Sh_B7iKmcH7vGODJ`

---

## 🎉 Sėkmingo deployment!

Po deployment turėsite:
- ✅ Viešą formų puslapį
- ✅ Automatinę Google Sheets integraciją
- ✅ Failų įkėlimo sistemą
- ✅ GDPR compliant formas
- ✅ URL, kurį galite naudoti reklamose
