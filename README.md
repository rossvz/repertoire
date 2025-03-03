## Read Me

## Repertoire

### Environment
- Copy the `.env.example` file and file in missing values
- Install firebase CLI tools: ` curl -sL https://firebase.tools | bash `
- `firebase login`

### Development
- Open in VSCode. If prompted, open in dev container. If not, choose dev container from action menu
- `npm install`
- `npm start` (Vite) or `npm run start:legacy` (Create React App)

### Build Systems
This project supports both Vite and Create React App (CRA) build systems during migration:

- **Vite** (default): Faster builds and development experience
- **Create React App** (legacy): Original build system

See [MIGRATION.md](./MIGRATION.md) for details on the migration to Vite.

### Deploy Demo Build
Note - the Songbook API needs to allow the new origin in the endpoint for Spotify access

`firebase hosting:channel:deploy preview_name`

### Deploy
- `npm run deploy` (Vite) or `npm run deploy:legacy` (Create React App)



