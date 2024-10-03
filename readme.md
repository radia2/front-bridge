# Bridge NFT Application

## Description

Cette app permet de transférer des NFTs vers l'adresse de bridge Arianee. Elle offre deux fonctionnalités principales :

1. Transfert d'un seul NFT
2. Transfert par batch d NFTs

## Installation

1. Clonez ce dépôt :
   ```
   git clone https://github.com/radia2/bridge-front.git
   ```

2. Naviguez dans le répertoire du projet :
   ```
   cd bride-front
   ```

3. Installez les dépendances :
   ```
   npm install
   ```

## Configuration

Avant d'utiliser l'application, vous devez configurer les éléments suivants :

- API Key : Votre clé d'API pour accéder au service de pont
- Base URL : L'URL de base de l'API du service de pont

Ces informations doivent être saisies dans l'interface utilisateur de l'application.

## Utilisation

1. Démarrez l'application :
   ```
   npm run dev
   ```

2. Ouvrez votre navigateur et accédez à `http://localhost:3000`

3. Sur la page principale, vous verrez deux sections :

   - Configuration : Entrez votre API Key et Base URL
   - Bridge NFT : Choisissez entre le transfert d'un seul NFT ou un transfert par lots

4. Pour un transfert unique :
   - Entrez l'ID du token dans le champ prévu
   - Cliquez sur "Bridge NFT"

5. Pour un transfert par lots :
   - Préparez un fichier CSV avec les IDs des tokens dans la première colonne
   - Uploadez le fichier CSV
   - Cliquez sur "Bridge Batch"

6. Les résultats de l'opération s'afficheront en bas de la page

## Structure du projet

- `front/components/BridgeNFTForm.tsx` : Composant principal du formulaire
- `front/pages/bridge-nfts.js` : Page principale de l'application
- `front/pages/api/bridge-batch.js` : API route pour le traitement par lots

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

[Insérez ici les informations de licence]