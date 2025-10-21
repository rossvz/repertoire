import { createRoot } from "react-dom/client"
import { FirebaseAppProvider } from "reactfire"
import "./index.css"

import App from "./App"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "rg-music.firebaseapp.com",
  databaseURL:
    import.meta.env.VITE_FIREBASE_DATABASE_URL ||
    "https://rg-music.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "rg-music",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "rg-music.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  preserveOnLogout: { data: ["songs"] },
  preserveOnEmptyAuthChange: { data: ["songs"] },
}

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseAppProvider>,
)
