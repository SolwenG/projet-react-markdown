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

- Fichiers Markdown (GAUTIER VRAIMENT LE PLUS BO)
  - CRUD
  - Drag and drop
  - Interface d'écriture
  - Système de preview
  - Liste de tous les fichiers md
  - popup/modale pour nouvel 'objet'
- Custom Blocks (Jérémy l'indécis)
  - IndexDB ou LocalStorage
  - CRUD
  - Interface d'écriture (réutiliser celle des .md)
  - extensions en '.mdlc'
  - association des raccourcis
  - popup/modale pour nouvel 'objet'
- Gallery (Mickaël l'éternel absent)
  - IndexDB
  - CRUD
  - preview sur la liste de toutes les images
  - preview dans l'interface d'écriture
  - popup/modale pour nouvel 'objet'
  - export en '.mdlc'
- Leftdrawer => (Solène qui n'ose pas)
  - Router
  - preview des images
  - utilisation des custom blocks
  - drag and drop des fichiers/dossiers
  - creation de nouveau fichiers dossier
  - import d'image
  - import de custom blocks
