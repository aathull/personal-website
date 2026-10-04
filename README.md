# athul.co.uk

My personal website: a single-page portfolio with my projects, a bit about me, and a way to get in touch.

**Live:** [athul.co.uk](https://athul.co.uk)

Fancy a break while you're there? The skills section turns into a game of Breakout where the bricks are the skills. Your best clear time is saved in your browser.

## Built with

- [Next.js](https://nextjs.org) (App Router) and React
- TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4
- [Motion](https://motion.dev) for animations
- [Phosphor Icons](https://phosphoricons.com)

## Running locally

You'll need Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other scripts:

| Command         | What it does                          |
| --------------- | ------------------------------------- |
| `npm run build` | Production build                      |
| `npm start`     | Serve the production build            |
| `npm run lint`  | Run ESLint                            |

## Project structure

```
app/          Layout, page and global styles
components/   One component per section (Hero, Projects, About, Contact) plus the Breakout game
lib/
  content.ts  All the site's text, links, projects and skills
public/       Static assets
```

Everything personal (name, intro, projects, skills, contact links) lives in [`lib/content.ts`](lib/content.ts), so you can change the content without touching the components.

## License

The code is released under the [MIT License](LICENSE), so feel free to borrow it for your own site.

The personal content (the text in `lib/content.ts` and the images in `public/`) is © Athul Jomon, all rights reserved. If you fork this, please swap in your own.
