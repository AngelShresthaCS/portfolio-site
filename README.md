# Angel Shrestha — portfolio

React portfolio with projects, work experience, education, credentials, skill icons, and a learning roadmap.

## Run locally

`npm ci`, then `npm start`. On Windows with PowerShell script restrictions, use `npm.cmd`.

`npm run build` creates the production bundle. `npm test -- --watchAll=false` checks current content, navigation, image fallbacks, and contact-form error handling.

## Edit content and images

Edit `src/data/portfolio.js` for education, projects, experience, skills, and certifications. Existing photos and badge images are preserved. Empty project/credential URLs hide their corresponding links.

Every image field accepts a direct HTTPS image address, a path under `public/`, or a filename in `public/images/placeholders/`.

```js
// University logo, inside profile:
universityLogo: 'https://your-site.com/university-logo.png',

// Company logo, inside an experiences entry:
logo: 'https://your-site.com/company-logo.png',
logoAlt: 'Company name logo',

// Hero artwork, inside profile:
heroImage: 'avatar.png',

// Project or certification image:
image: 'https://your-site.com/project-preview.jpg',
// Or image: '/images/my-project.jpg' for public/images/my-project.jpg.
```

Use an address that returns the image itself, rather than an image search or sharing page. Logos show a generic local fallback if the source is empty or unavailable. Replace `company-logo.svg` and `university-logo.svg` with official logos, or set the fields above. Those defaults are placeholders, not official marks. Image previews have no watermark or placeholder overlay.

Project previews use an 800 × 480 ratio; hero artwork is square; organization logos are square. Update image descriptions in `src/components/Portfolio.js` when replacing artwork. Brand and concept icons are mapped in `src/components/SkillIcon.js` and require no image uploads.

## Background and styling

In `src/App.css`, change `--bg` for the page background and `--panel` for input and education-card backgrounds. To add a background image, put it in `src/images/background.jpg` and change:

```css
--page-background-image: url('./images/background.jpg');
```

Use a dark, low-contrast image so the text remains readable. Keep `none` for the current solid background.

## Learning roadmap

Edit `src/data/roadmap.js` to change the three phases, sixteen topics, and practice exercises. This is a learning plan, not a list of completed achievements. The stages use native, keyboard-accessible disclosure controls; the first starts expanded.

Navigation highlights the section in view. The mobile menu closes on section selection or Escape. Motion respects the device's reduced-motion preference.

## Courses and training

Professional certifications remain prominent. Eleven additional course and research-training completions appear in the expandable "Courses & training" list below them. Edit `src/data/training.js` for titles, issuers, completion dates, credential IDs, skills, and verification links. Only the supplied React Basics verification URL is set; add the other actual certificate links to each entry's `verification` field when available.

## Before publishing

The Solutions Architect certification is in progress, expected October 23, 2026. The supplied `public/resume.pdf` still says October 9; replace it with a fresh export reflecting October 23.

The contact form uses the existing Formspree endpoint. Automated checks mock submissions. Confirm its destination with a real test message when ready.

Useful next additions: a PhilosoStream demo, project architecture case studies with measured performance and test conditions, homelab documentation with sanitized configuration, and a personal favicon/social preview image.
