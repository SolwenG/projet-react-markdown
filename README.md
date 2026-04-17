# Groupe

- Gautier De Mauroy
- Mickaël Desclaux-Arramond
- Jérémy Duflot
- Solène Gouin

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Répartition des tâches

- Fichiers Markdown (Gautier)
  - CRUD indexedDB des markdown files
  - Drag and drop
  - Interface d'écriture
  - Système de preview
  - Liste de tous les fichiers md
  - popup/modale pour nouvel 'objet'

- Custom Blocks (Jérémy)
  - CRUD indexedDB des custom blocks
  - Interface d'écriture (réutiliser celle des .md)
  - extensions en 'part.mdlc' et 'parts.mdlc'
  - association des raccourcis clavier
  - modale pour ajout un custom block

- Gallery (Mickaël)
  - CRUD indexedDB des images
  - preview sur la liste de toutes les images
  - preview dans l'interface d'écriture
  - ajout nouvelles images
  - export en 'img.mdlc' et 'imgs.mdlc'

- Left-drawer (Solène)
  - Router
  - preview des dernières images
  - preview des derniers custom blocks
  - arborescence des fichiers/dossiers
  - ajout/suppression/renommage des fichiers/dossiers
  - drag and drop des fichiers/dossiers
  - import d'images
  - import de custom blocks
  - import de markdown files
  - internationalisation de l'app avec i18n
