# Migrating from Create React App to Vite

This document outlines the steps to migrate this project from Create React App (CRA) to Vite.

## Why Migrate?

- **Faster Development Experience**: Vite provides significantly faster startup and hot module replacement
- **Modern JavaScript Support**: Better support for ES modules and modern JavaScript features
- **Active Development**: Vite is actively maintained, while CRA development has slowed
- **Better Extensibility**: More flexibility through plugins

## Migration Steps

### 1. Initial Setup (Completed)

- ✅ Added Vite and React plugin: `vite`, `@vitejs/plugin-react`
- ✅ Added Vitest for testing: `vitest`
- ✅ Created `vite.config.js` in the project root
- ✅ Created root-level `index.html` file
- ✅ Updated scripts in `package.json`
- ✅ Created environment variable compatibility layer
- ✅ Renamed .js files to .jsx

### 2. File Extensions (Completed)

Vite expects JSX code to be in `.jsx` files. Files have been renamed from `.js` to `.jsx`. If additional files need to be renamed, we've provided a script:

```bash
node rename-jsx-files.js
```

This script will:
1. Scan all `.js` files in the `src` directory
2. Check if they contain JSX syntax
3. Rename matching files to `.jsx`
4. Update all import statements in the codebase to reference the new file names

### 3. Environment Variables

CRA uses the `REACT_APP_` prefix for environment variables, while Vite uses `VITE_`. We've implemented a dual approach:

- **Compatibility Layer**: `src/env-compatibility.js` provides a unified way to access environment variables
- **Vite Configuration**: Updated to properly load and expose environment variables from `.env` files
- **Dual Variables**: Added both `REACT_APP_` and `VITE_` prefixed variables in `.env.local`

#### Environment Files

- `.env` - Original environment file (still used by CRA)
- `.env.local` - Local environment file (loaded by both CRA and Vite)
- `.env.vite.example` - Example file with Vite variable format

#### Using Environment Variables

For the best compatibility during migration:

```javascript
// Import the compatibility layer
import { ENV } from "./env-compatibility"

// Use the exported variables
const apiKey = ENV.GOOGLE_API_KEY
```

This approach works with both build systems and makes future migration easier.

### 4. Testing Both Builds

During the migration period, you can use both build systems:

| Task                 | CRA Command             | Vite Command     |
| -------------------- | ----------------------- | ---------------- |
| Start dev server     | `npm run start:legacy`  | `npm start`      |
| Build for production | `npm run build:legacy`  | `npm run build`  |
| Run tests            | `npm run test:legacy`   | `npm test`       |
| Deploy               | `npm run deploy:legacy` | `npm run deploy` |

### 5. Common Issues and Solutions

#### File Extensions
- **Problem**: Vite expects JSX in `.jsx` files, not `.js` files
- **Solution**: All React component files have been renamed from `.js` to `.jsx`

#### SVG Imports
- CRA: `import { ReactComponent as Logo } from './logo.svg'`
- Vite: `import Logo from './logo.svg?react'`

#### Environment Variables
- **Problem**: Vite and CRA handle environment variables differently
- **Solution**: 
  - Use the compatibility layer in `src/env-compatibility.js`
  - Ensure variables exist in both `.env` and `.env.local`
  - Include both `REACT_APP_` and `VITE_` prefixed versions

#### Entry Point
- The entry point in `index.html` must point to the correct file with the correct extension:
  ```html
  <script type="module" src="./src/index.jsx"></script>
  ```

## Final Cleanup (After Migration)

- [ ] Remove CRA dependencies: `react-scripts`
- [ ] Remove legacy scripts from `package.json`
- [ ] Remove CRA-specific configurations
- [ ] Remove compatibility layers once all code is updated
- [ ] Standardize on `VITE_` prefixed environment variables 