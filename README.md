# Groupe

- Gautier De Mauroy
- Mickaël Desclaux-Arramond
- Jérémy Duflot
- Solène Gouin

## Utilisation/Fonctionnement de l'app

Dans notre app, on peut :

- changer de langue avec les trois boutons en bas du volet de gauche

### Volet de gauche

- importer :
  - un fichier en '.md'
- Créer un dossier de fichiers en '.md'
- Remanier l'arborescence de fichiers en drag and drop
- Via les 3 petits points sur chaque fichier on peut :
  - Le voir,
  - Le renommer,
  - L'exporter,
  - Le supprimer
- Via les 3 petits points sur chaque dossier on peut :
  - Y importer un fichier;
  - Renommer le dossier,
  - Y créer un dossier
  - Y ajouter un fichier en '.md'
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
