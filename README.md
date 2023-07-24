## Getting Started

First, install the required packages:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Q & A

How much time was spent developing?
Approximately 6 hours, with a rough breakdown as follows: 1 hr planning, setting up the project, and getting familiar with the FF API; four hours developing a working prototype; and one hour improving the display and styling, addressing edgecases and bugs.

What improvements would you make?
Given more time, harden the API routes and address error handling more throughly. There is some very basic error handling, to show an error retrieving an unknown airport, for example, but it could be improved. Design/styling improvements, UX improvements, and implementing testing.

Additionally, parts of the UI were stubbed out but have no current functionality. EX: links in the nav bar. A feature that was used during development, but removed for the final version was auto-complete for the search bar. It was removed for time constraints, and the reliance on a third-party api that had limited usage.

## Deployed App

There's a deployed version of the app available at: [https://foreflight.vercel.app/](https://foreflight.vercel.app/).
