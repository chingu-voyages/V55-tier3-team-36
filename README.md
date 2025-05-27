# Habit Tracker (Name TBD)

(Add info about our concept here! Maybe Alina can take care of this?)

## Our Team

- Scrum Master/Product Owner:
  
  - Alina Schenk[GitHub](https://github.com/alina-can-code) / [LinkedIn](https://linkedin.com/in/alinamschenk)

- Developers:

  - Maya Jairam: [GitHub](https://github.com/mayajairam) / [LinkedIn](https://www.linkedin.com/in/mayajairam/)
  - Brittany Thompson: [GitHub](https://github.com/bpb2008) / [LinkedIn](https://linkedin.com/in/brittanythompson08)

  - Lindsay Allen: [GitHub](https://github.com/lkallen) / [LinkedIn](https://www.linkedin.com/in/lindsay-allen-54b46937/)

- Voyage Guide:

  - Veronika Kolesnikova: [GitHub](https://github.com/kolesnikova-dev) / [LinkedIn](https://linkedin.com/in/kolesnikova-dev/)

- UI/UX Designer:
  
  - Rebecca Lin: [Github](https://github.com/rebelin) / [LinkedIn](https://linkedin.com/in/rebecca-e-lin/)

## Tech Stack

This project is built using Next.js, React, NextAuth.js, and PostgreSQL.

## Installation

1. Clone the repo: `git clone https://github.com/chingu-voyages/V55-tier3-team-36.git`.

2. Go to the source folder: `cd V55-tier3-team-36`.

3. Install dependencies using `npm install`.

4. Run the project locally: `npm run dev` and visit `http://localhost:3000`.

5. Configure NextAuth by adding the following to `.env.local`, replacing each > with your own information:

```
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
NEXTAUTH_SECRET=<run `npx auth secret` in your terminal to generate this for your local environment>
```

To generate (or, for our team, get our existing) `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`:

- Sign into [Google Cloud Console](https://console.cloud.google.com). (For our team, please use our team login that Lindsay created.)
- Create a project (or for our team, select our project)
- Search for OAuth consent and fill out the required fields, App name, support email, and developer contact email (our team can skip this step, the stuff is already generated). For `Authorized redirect URIs` use `http://localhost:3000/api/auth/callback/google`.
- This should generate client_id and client_secret.
