# Smart Vision Consultant - React Version

This is the React conversion of the original HTML/CSS/JavaScript website.

## Pages

- Home: `/`
- About: `/about`
- Gallery: `/gallery`
- Contact: `/contact`

## Features converted to React

- Responsive Bootstrap design
- React Router page navigation
- WhatsApp floating button
- Appointment form
- Firebase Realtime Database appointment saving
- EmailJS email sending
- Gallery search
- Dynamic visa type selection
- Back-to-top button

## Setup

1. Open this project folder in VS Code.
2. Run:

```bash
npm install
npm run dev
```

3. Open the local URL shown in the terminal.

## Configuration

Open `src/config.js` and replace:

- Firebase config values
- EmailJS public key, service ID, and template ID
- WhatsApp number

Important: WhatsApp number must be in international format without `+` or leading `0`.
Example: `03438903889` becomes `923438903889`.

## Build for hosting

```bash
npm run build
```

Upload the generated `dist` folder to your hosting provider.
For Firebase Hosting, use the `dist` folder as the public folder.
