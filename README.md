# Birkan Zan — Portfolyo

Oyun geliştirici Birkan Zan'ın kişisel portfolyo sitesi. Türkçe (`/`) ve İngilizce (`/en/`), açık/koyu tema, tamamen statik.

- **Stack:** Next.js 16 (App Router, `output: 'export'`), React 19, TypeScript, Tailwind CSS 4
- **Fontlar:** Geist ve Geist Mono (`next/font` ile build sırasında self-host edilir)
- **Görseller:** `sharp` ile WebP'ye çevrilir; 640/960/1280 genişlikte `srcset`, lazy-load
- **İstemci JS'i:** Sadece tema butonu ve "E-postayı kopyala" butonu. Gerisi build'de HTML'e dönüşür.

## Kurulum

Node.js 20.9 veya üstü gerekir.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Komut | Ne yapar |
| --- | --- |
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Statik siteyi `out/` klasörüne üretir |
| `npm start` | `out/` klasörünü yerelde sunar (deploy öncesi kontrol) |
| `npm run assets` | `assets/` içindeki görsellerden `public/` görsellerini, favicon'u ve OG görselini üretir |
| `npm run typecheck` | TypeScript kontrolü |

## Klasör yapısı

```
app/
  (tr)/            Türkçe kök layout + sayfa  →  /
  (en)/en/         İngilizce kök layout + sayfa  →  /en/
  global-not-found.tsx   İki dilli 404
  globals.css      Renk, tipografi ve hareket tokenları
  sitemap.ts, robots.ts
components/        HomePage, ProjectCard, ThemeToggle, CopyEmail, PixelBoard, Icons
data/
  projects.ts      ← Proje listesi (tek dosya)
  site.ts          ← İsim, e-posta, sosyal linkler, yetenekler
  i18n.ts          ← Arayüz metinleri (TR/EN)
lib/               Font, metadata ve basePath yardımcıları
assets/projects/   Kapak görsellerinin kaynakları (PNG/SVG)
public/            Üretilmiş görseller, favicon, og.png
scripts/build-assets.mjs
```

## Yeni proje eklemek

1. Kapak görselini `assets/projects/<slug>.png` olarak kaydet (`.jpg`, `.webp` ve `.svg` de olur). Görsel 16:10 oranında kırpılır.
2. `npm run assets` komutunu çalıştır. Bu komut `public/projects/<slug>-{640,960,1280}.webp` dosyalarını üretir.
3. `data/projects.ts` içine aynı `slug` ile bir kayıt ekle:

```ts
{
  slug: 'my-new-game',
  title: 'My New Game',
  category: { tr: 'Oyun', en: 'Game' },
  description: { tr: 'Tek cümlelik açıklama.', en: 'One-sentence description.' },
  imageAlt: { tr: 'Görselde ne olduğu.', en: 'What the image shows.' },
  tech: ['Unity', 'C#'],
  links: { repo: 'https://github.com/…', demo: 'https://…' }, // ikisi de isteğe bağlı
},
```

Kartlar dizideki sırayla gösterilir. Metinleri değiştirmek için `data/i18n.ts`, iletişim bilgileri ve yetenekler için `data/site.ts` dosyasını düzenle.

`npm run assets` çıktısı repoya commit edilir. Böylece deploy sırasında `sharp` ya da sistem fontları gerekmez.

## Deploy

Önce `NEXT_PUBLIC_SITE_URL` değişkenini sitenin gerçek adresine ayarla, örneğin `https://birkanzan.vercel.app`. Canonical link, `hreflang`, sitemap ve Open Graph adresleri bu değerden üretilir. Ayarlanmazsa varsayılan `https://birkanzan.vercel.app` kullanılır.

### Vercel (önerilen)

1. Repoyu GitHub'a gönder.
2. [vercel.com/new](https://vercel.com/new) üzerinden repoyu içe aktar. Framework otomatik olarak Next.js algılanır, ayar gerekmez.
3. *Settings → Environment Variables* altında `NEXT_PUBLIC_SITE_URL` değişkenini ekle ve yeniden deploy et.

### GitHub Pages

Repoda `.github/workflows/deploy-pages.yml` hazır.

1. *Settings → Pages → Build and deployment → Source* ayarını **GitHub Actions** yap.
2. `main` dalına push et. Workflow `basePath`'i (`/<repo>`) ve site adresini Pages ayarlarından kendisi alır.

Repo adı `<kullanıcı>.github.io` ise site kök dizinde yayınlanır ve `basePath` boş kalır.

### Netlify

`netlify.toml` hazır (`npm run build`, yayın klasörü `out`). Repoyu Netlify'a bağla, sonra *Site configuration → Environment variables* altında `NEXT_PUBLIC_SITE_URL` değişkenini ekle.

## Tasarım tokenları

Renkler `app/globals.css` içinde iki katmanlı tanımlıdır:

- **Primitive'ler:** `--neutral-*`, `--accent-*`. Radix tarzı 12 adımlı OKLCH ramp'leri; tümü sRGB gamutunda, `culori` ile üretildi. Bileşenler bunları doğrudan kullanmaz.
- **Semantik tokenlar:** `bg-bg-page`, `text-text-secondary`, `bg-accent-solid` gibi Tailwind utility'leri olarak kullanılır.

Koyu tema primitive'leri `[data-theme='dark']` altında yeniden tanımlar. Tema tercihi `localStorage`'da saklanır; kayıt yoksa sistem ayarı geçerli olur.

Ölçülen kontrast değerleri:

| Çift | Açık | Koyu | Gereken |
| --- | --- | --- | --- |
| Ana metin / sayfa | 16.35:1 | 16.89:1 | 4.5:1 |
| İkincil metin / sayfa | 6.41:1 | 11.79:1 | 4.5:1 |
| İkincil metin / etiket zemini | 5.74:1 | 10.34:1 | 4.5:1 |
| Accent link / sayfa | 6.19:1 | 10.77:1 | 4.5:1 |
| Buton metni / accent dolgu | 6.06:1 | 7.35:1 | 4.5:1 |
| Buton metni / accent hover | 5.12:1 | 9.12:1 | 4.5:1 |
| Odak halkası / sayfa | 6.19:1 | 7.35:1 | 3:1 |
| Güçlü kenarlık / sayfa | 3.05:1 | 3.21:1 | 3:1 |

**Tipografi ölçeği:** `caption` 13px, `body-sm` 15px, `body` 16px, `lead` 17–20px, `heading` 20px, `title` 30–44px, `display` 48–96px. Her boyutun kendi satır yüksekliği vardır.

**Hareket:** Bölümler kaydırırken hafifçe yukarı kayar (scroll-driven animation; yalnızca destekleyen tarayıcılarda). Hero'daki pikseller iki kez yanıp söner ve 5 saniye içinde durur. Butonlar basılınca 0.96'ya küçülür. Bunların hepsi `prefers-reduced-motion: no-preference` koşuluna bağlıdır.

## Kalite

Yerel build üzerinde Lighthouse 12 ile ölçüldü:

| Sayfa | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| `/` mobil | 96 | 100 | 100 | 100 |
| `/en/` mobil | 97 | 100 | 100 | 100 |
| `/` masaüstü | 100 | 100 | 100 | 100 |
| `/en/` masaüstü | 100 | 100 | 100 | 100 |

axe-core (WCAG 2.2 AA ve best-practice kuralları) iki temada ve iki dilde 0 ihlal raporladı. Ayrıca klavyeyle tam gezinme, 320px ve 640px genişlikte (1280px'in %200 yakınlaştırılmış hâli) taşma olmaması ve odak halkasının rengi elle kontrol edildi.
