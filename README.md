## Read Me



### Environment
- Copy the `.env.example` file and file in missing values
- Install firebase CLI tools: ` curl -sL https://firebase.tools | bash `
- `firebase login`

### Development
- Open in VSCode. If prompted, open in dev container. If not, choose dev container from action menu
- `npm install`
- `npm start`

### Deploy Demo Build
Note - the Songbook API needs to allow the new origin in the endpoint for Spotify access

`firebase hosting:channel:deploy preview_name`



### Deploy
- `npm run deploy`



