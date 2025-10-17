# Income Expense Calc

## Features

- Add income and expense entries
- Display running totals (income, expenses, balance)
- Edit or remove entries
- Persistent data using localStorage (no backend required)
- Responsive UI suitable for desktop and mobile

## Demo

Open `index.html` in a browser, use VS Code Live Server, or enable GitHub Pages (see repository settings).

## Tech

- HTML, CSS, JavaScript
- Optional: Live Server (VS Code) or any static file server
- CI: GitHub Actions (optional workflow placed in .github/workflows)

## Prerequisites

- Modern web browser
- (Optional) Node.js + npm if you want to run a local dev server:
  - npx serve
  - or VS Code Live Server extension

## Run locally

1. Clone the repository
   ```
   git clonehttps://github.com/JayapriyaSiakumar/Income-Expense-Calc.git
   cd <repo>
   ```
2. Open in browser:
   - Double-click `index.html`
   - OR run a static server:
     ```
     npx serve .
     ```
3. Visit the server URL (e.g., http://localhost:5000)

## Usage

- Enter a description, amount, and type (Income or Expense)
- Click Add to append the entry
- Use the edit/remove controls on each entry
- Totals update automatically; data persists in localStorage

## Project structure (example)

- index.html — main UI
- css/
  - styles.css — styling
- js/
  - app.js — main logic
  - storage.js — localStorage helpers
- .github/
  - workflows/ — CI workflows (GitHub Actions)
  - ISSUE_TEMPLATE.md, PULL_REQUEST_TEMPLATE.md
- README.md — this file
- LICENSE — MIT license file

## Issues & Support

- Open issues at: https://github.com/<username>/<repo>/issues
- Use issue templates for bug reports and feature requests
- For urgent help, create an issue and tag `help wanted`

## Releases & Changelog

- Tag releases using semantic versioning (vMAJOR.MINOR.PATCH)
- Maintain a CHANGELOG.md for notable changes and migration notes

## License

MIT — see LICENSE file for details.
