# Groupe

- Gautier De Mauroy
- Mickaël Desclaux-Arramond
- Jérémy Duflot
- Solène Gouin

## Utilisation/Fonctionnement de l'app

### Pour utiliser l'app : faire `npm ci` la première fois, puis `npm run dev` pour la démarrer

### Bonus/Clin d'oeil

- changer de langue avec les boutons en bas du volet de gauche
- passer l'application en theme dark ou light avec le bouton toggle en bas du volet de gauche
- L'une des 3 langues est l'arabe, on trouvait ça plutôt marrant de vous faire un clin d'oeil par rapport à l'info que vous nous avez donnée en début de semaine. Si ça peut faire plaisir à votre femme que vous pratiquiez pendant la correction de notre projet (comme nous n'avions pas de professionnels en arabe dans le groupe, c'est bien entendu l'IA qui nous a proposé les traductions utilisées par I18n)

Dans notre app, on peut :

### Volet de gauche

- importer :
  - un fichier en '.md'
- Créer des dossiers et des fichiers en '.md'
- Remanier l'arborescence de fichiers et dossiers en drag and drop
- Via les 3 petits points sur chaque fichier on peut :
  - Le voir,
  - Le renommer,
  - L'exporter,
  - Le supprimer
- Via les 3 petits points sur chaque dossier on peut :
  - Le renommer,
  - Y créer un fichier .md,
  - Y créer un dossier
  - Le supprimer

### Fichiers markdown

- importer :
  - un fichier en '.md'
- Voir la liste de tous les fichiers .md de l'app
- Via les 3 petits points sur chaque fichier on peut :
  - Le voir,
  - Le renommer,
  - L'exporter,
  - Le supprimer
- Dans l'édition d'un fichier
  - on peut avoir une preview de markdown
  - on peut insérer :
    - une image en cliquant dessus depuis le volet de gauche (ne sera visible qu'en preview)
    - un bloc custom via le raccourci indiqué, ou en cliquant dessus, il ira se loger là où est le curseur

### Blocs customs

- Importer un bloc custom en 'part.mdlc' ou plusieurs en '.parts.mdlc'
- Voir tous les blocs customs de notre app
- Cliquer sur un bloc, pour se rendre sur la liste de tous les blocs
- Éditer un bloc custom en cliquant sur les 3 petits points
- Exporter ce bloc
- Tous les exporter en '.parts.mdlc'
- Les trier par date de création ou nom
- Supprimer un bloc
- On peut en créer un depuis la liste de tous les

### Galerie d'images

- Importer une image en '.img.mdlc'
- Voir toutes les images de notre app
- Cliquer sur une image, pour se rendre sur la liste des images
- Sélectionner la ou les images à exporter en '.img.mdlc' ou 'imgs.mdlc'
- Depuis les 3 petits points :
  - Renommer une image
  - Supprimer une image
  - Exporter une image

## Répartition des tâches

- Fichiers Markdown (Gautier)
  - CRUD indexedDB des markdown files
  - Interface d'écriture
  - Insertion des raccourcis custom blocks et des images dans l'éditeur
  - Système de preview des fichiers markdowns
  - Liste de tous les fichiers .md
  - export en .md
  - Page pour créer un nouveau fichier markdown

- Custom Blocks (Jérémy)
  - CRUD indexedDB des custom blocks
  - export en 'part.mdlc' et 'parts.mdlc'
  - association des raccourcis clavier
  - modale pour ajout d'un custom block

- Gallery (Mickaël)
  - CRUD indexedDB des images
  - preview sur la liste de toutes les images
  - preview dans l'interface d'écriture
  - ajout nouvelles images
  - export en 'img.mdlc' et 'imgs.mdlc'

- Left-drawer (Solène)
  - preview des dernières images
  - preview des derniers custom blocks
  - arborescence des fichiers/dossiers
  - crud des fichiers/dossiers
  - drag and drop des fichiers/dossiers
  - modale d'import d'images/custom blocks/markdown files
  - setup router, prettier, tailwindcss
  - internationalisation de l'app avec i18n
  - theme dark/light
