# Bridge NFT Application

## Description

Cette app permet de transférer des NFTs vers l'adresse de bridge Arianee. Elle offre deux fonctionnalités principales :

1. Transfert d'un seul NFT
2. Transfert par batch d NFTs

## Installation

1. Clonez ce repo :
   ```
   git clone https://github.com/radia2/front-bridge.git
   ```

2. Naviguez dans le répertoire du projet :
   ```
   cd front-bridge
   ```

3. Installez les dépendances :
   ```
   npm install
   ```

## Configuration

Avant d'utiliser l'application, vous devez configurer les éléments suivants :

- API Key 
- Base URL
  
(Assurez vous par ailleurs d'avoir déjà suivi la procédure de création de webhook et d'adhoc request avant de bridger vos tokens, voir doc ici: https://www.notion.so/arianee/Team-Documentation-95b9467a91314ebe9589d8514dae4e0c?p=7c9797e598184d3098f34ade64f0bce8&pm=s)

## Utilisation

1. Démarrez l'application :
   ```
   npm run dev
   ```

2. Ouvrez votre navigateur et accédez à `http://localhost:3000`

3. Sur la page principale, vous verrez deux sections :

   - Configuration : Entrez votre API Key et Base URL
   - Bridge NFT : Choisissez entre le transfert d'un seul NFT ou un transfert par batch

4. Pour un transfert unique :
   - Entrez l'id du token
   - Cliquez sur "Bridge NFT"

5. Pour un transfert par lots :
   - Préparez un fichier CSV avec les ids des tokens dans la première colonne (pas besoin d'en tete)
   - Uploadez le fichier 
   - Cliquez sur "Bridge Batch"

6. Les résultats de l'opération s'afficheront en bas de la page
![Screenshot 2024-10-03 at 14 33 56](https://github.com/user-attachments/assets/7ec6d5f4-f184-4181-adea-c5d31b183937)


## Structure du projet

- `front/components/BridgeNFTForm.tsx` : Composant principal du formulaire
- `front/pages/bridge-nfts.js` : Page principale de l'application
- `front/pages/api/bridge-batch.js` : API route pour le traitement par lots


