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
heroImage: 'avatar-square.png',

// Project or certification image:
image: 'https://your-site.com/project-preview.jpg',
// Or image: '/images/my-project.jpg' for public/images/my-project.jpg.
```

Use an address that returns the image itself, rather than an image search or sharing page. Logos show a generic local fallback if the source is empty or unavailable. Replace `company-logo.svg` and `university-logo.svg` with official logos, or set the fields above. Those defaults are placeholders, not official marks. Image previews have no watermark or placeholder overlay.

Project previews use an 800 × 480 ratio; hero artwork is square; organization logos are square. Update image descriptions in `src/components/Portfolio.js` when replacing artwork. Brand and concept icons are mapped in `src/components/SkillIcon.js` and require no image uploads.

## Background and styling

In `src/App.css`, change `--bg` for the navy page background, `--panel` for card backgrounds, and `--accent` for the powder blue accent. `--accent-soft` controls the tinted buttons and resume card. Typography, spacing, and content width use the adjacent `--font-*`, `--space-*`, and `--content-width` tokens. To add a background image, put it in `src/images/background.jpg` and change:

```css
--page-background-image: url('./images/background.jpg');
```

Use a dark, low-contrast image so the text remains readable. Keep `none` for the current solid background.

## Learning roadmap

Edit `src/data/roadmap.js` for the learning plan. `roadmapPhases` preserves the original sixteen topics and exercises; `roadmapBranches` groups those same steps into five color-coded branches: Backend, Database & data, Cloud & DevOps, AI & distributed systems, and Reliability. Choose a topic node to open an inline panel with its original topics and exercise. Nodes use native buttons for keyboard access; Escape or the close button closes the panel and returns focus to the selected node. This is a learning plan, not a list of completed achievements.

Navigation highlights the section in view. Skills, LeetCode, and Roadmap share the More menu; its indicator also highlights while a secondary section is in view. The mobile menu closes on section selection or Escape. Escape first closes an open More menu and returns focus to its summary. Motion respects the device's reduced-motion preference.

## Visible highlights and technical details

Project `introduction`, `highlight`, and `featuredTechnologies` fields provide the short overview; the original `summary`, `points`, and complete technology list remain available in Engineering details. Experience entries use `summary`, `highlights`, and `tools`, with original responsibilities in More about this role. The completed Service Desk Tier I role and June–December 2025 dates come from the original portfolio. The old Tier II entry's end date is not confirmed, so it has not been presented as a current role.

Skill `featuredSkills` fields select the six primary tools shown in each category. The visible View all skills button reveals the remaining tools inside those same category lists; Show fewer skills restores the preview. Category accents and spacing are styled in `src/App.css`, and technology icons remain mapped in `src/components/SkillIcon.js`. Projects and experience reuse `src/components/ContentDisclosure.js` for native disclosures.

## Courses and training

Professional certifications remain prominent. The secondary "Courses & training" gallery shows four compact credential cards immediately; Show all 11 reveals the remaining completions, and Show less restores the preview. Cards show the colored provider mark, title, provider, completion date, and verification link when available. Supplied credential IDs appear directly beneath the completion date; cards without an ID omit that field. Edit `src/data/training.js` for course content and `src/components/CoursesTraining.css` for the gallery's styling.

Course IDs with 12 uppercase letters/numbers, including at least one of each, automatically link to `https://www.coursera.org/account/accomplishments/verify/{credentialId}`. Other ID formats and missing IDs do not generate a link. An explicit `verification` URL takes precedence. IDs are displayed as supplied; matching the format generates a link but does not confirm that the certificate is valid.

Professional certification cards also support an optional `credentialId` in `src/data/portfolio.js`. Leave unavailable IDs empty; their existing Credly and Microsoft verification URLs still work. No ID was provided for Data Science Orientation or the professional certifications.

## LeetCode statistics

The LeetCode section restores the previous third-party stats card and a direct profile link. Set `profile.leetcodeUsername` in `src/data/portfolio.js` to change the username. If the remote card cannot load, a fallback message appears and the profile link remains available. Problem counts come from the card service, rather than being stored in the site.

## Before publishing

The resume card sits beside About and education (below the background text on mobile). It supports an expandable full-width PDF preview, opening the PDF in a new tab, and downloading it. All three use `public/resume.pdf`.

The Solutions Architect certification is in progress, expected October 23, 2026. The supplied `public/resume.pdf` still says October 9; replace it with a fresh export reflecting October 23.

The contact form uses the existing Formspree endpoint. Automated checks mock submissions. Confirm its destination with a real test message when ready.

Useful next additions: a PhilosoStream demo, project architecture case studies with measured performance and test conditions, homelab documentation with sanitized configuration, and a personal favicon/social preview image.
