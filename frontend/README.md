# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## ⚠️ Deployment Note
This project is designed as a persistent background service using **Node-Cron**. 
I have chosen not to deploy it to a standard free-tier PaaS (like Render/Vercel) because their **ephemeral filesystems** and **inactivity sleep cycles** would interrupt the continuous data scraping.

To deploy this in production, I would use:
1.  **Docker** to containerize the application.
2.  **AWS EC2** or **DigitalOcean Droplet** to ensure 24/7 uptime for the scheduler.
3.  **Managed RDS** for the MySQL database.