# Growthify NGO Suite: website

Marketing site for the NGO donation software by
[Growthify Services](https://growthifyservices.in/). Plain HTML, CSS and JS:
no build step and no server needed.

```
index.html        page content
style.css         design (brand colours at the top in :root)
main.js           menu, scroll animation, demo form
assets/favicon.svg
```

## Run locally

Open `index.html` in a browser, or run:

```bash
python -m http.server 8080
```

## Deploy

Upload the whole folder as it is. Any static host works:

- **Netlify / Vercel / Cloudflare Pages:** connect the repo or drag-and-drop the
  folder. No build command; the publish directory is the folder root.
- **Hostinger / cPanel:** upload the files into `public_html`.

## Book-a-demo form

There is no backend. When a visitor submits the form, the details are filled
into a WhatsApp message to +91 89892 82885 ("Send on WhatsApp") or into an
email to support@growthifyservices.in ("Send by Email"). The visitor only
has to press send.

To change the number or email, edit `CONTACT` at the top of `main.js` and the
`tel:` / `mailto:` links in `index.html`.

## Pricing

₹699 per computer per month. To change it, edit `PRICE_PER_PC` in `main.js`
and the ₹699 text in `index.html` (hero note, pricing card, FAQ, meta
description).

## Photos

Free photos from Unsplash (Unsplash License: free to use, credit not required):

| File | Photographer |
| --- | --- |
| `assets/img/hero-children.jpg` | LJ |
| `assets/img/school-students.jpg` | Akshar Dave |
| `assets/img/volunteers-packing.jpg` | Ismael Paramo |
| `assets/img/office-laptop.jpg` | Sweet Life |

## Things to update before going live

- The product name "Growthify NGO Suite" is a working name; search and replace
  it in `index.html` if you pick another.
- The dashboard and receipt pictures are drawn in HTML with sample data.
  Real screenshots of the software can replace them later.
- Photos of your own NGO clients (with their permission) would look more
  genuine than stock photos; just replace the files in `assets/img/`.
