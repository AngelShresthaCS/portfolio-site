# Angel Shrestha ? portfolio

React portfolio refreshed from the supplied internship resume in October 2026.

## Run locally

`npm ci`, then `npm start`. On Windows with PowerShell script restrictions, use `npm.cmd`.

`npm run build` creates the production bundle. `npm test -- --watchAll=false` runs the content and interaction checks.

## Update content

Edit `src/data/portfolio.js` for education, projects, experience, skills, and certifications. Empty project/credential URLs intentionally hide the corresponding buttons. Only add real repository, demo, or verification links.

The Solutions Architect certification is in progress, expected October 23, 2026, per the owner's clarification. The supplied downloadable `public/resume.pdf` still says October 9; replace that PDF with a re-export reflecting October 23 before publishing.

The contact form retains the existing Formspree endpoint. Confirm its destination and send a real test message before publishing; automated checks mock requests and do not send messages.

## Replace placeholder artwork

Local SVG placeholders are in `public/images/placeholders/`:

- `hero.svg`: hero background artwork.
- `philosostream.svg` and `homelab.svg`: project previews.
- `aws-ai.svg`, `aws-cloud.svg`, `github-actions.svg`, `aws-architect.svg`: generic credential artwork, not official badges.

Replace files directly or change image filenames in `src/data/portfolio.js`; the hero path is in `src/components/Portfolio.js`. Project artwork uses an 800 ? 480 ratio; the hero uses 640 ? 640; credential art uses 96 ? 96. Update alt text and remove the visible project placeholder labels after adding actual screenshots.

## Suggested next improvements

- Add a PhilosoStream demo and a concise case study showing architecture, failure recovery, and measured performance with test conditions.
- Add homelab architecture documentation and a public repository with sanitized configuration.
- Replace generic certification artwork with official earned badge images; keep the in-progress credential visually distinct.
- Replace the legacy embedded-system favicon with a personal monogram, and add a social preview image.
- Modernize the Create React App build toolchain in a separate maintenance change; dependency installation currently reports upstream deprecation warnings.
