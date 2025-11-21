import { vi } from 'vitest'

vi.mock('firebase/database', () => ({
  getDatabase: vi.fn(() => ({})),
  ref: vi.fn(),
  onValue: vi.fn(),
  push: vi.fn(),
  set: vi.fn(),
  remove: vi.fn(),
  get: vi.fn(),
  child: vi.fn(),
  query: vi.fn(),
  orderByChild: vi.fn(),
  update: vi.fn(),
}))

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  signInWithPopup: vi.fn(),
  GoogleAuthProvider: vi.fn(() => ({})),
  signOut: vi.fn(),
}))

vi.mock('reactfire', () => ({
  useFirebaseApp: vi.fn(() => ({
    name: '[DEFAULT]',
    options: {},
    automaticDataCollectionEnabled: false,
  })),
  FirebaseAppProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DatabaseProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useDatabase: vi.fn(() => ({})),
  useAuth: vi.fn(() => ({})),
  useUser: vi.fn(() => ({ data: null })),
  useSigninCheck: vi.fn(() => ({ status: 'success', data: { signedIn: false, user: null } })),
  useDatabaseListData: vi.fn(() => ({ status: 'success', data: [] })),
}))

vi.mock('@googlemaps/js-api-loader', () => ({
  Loader: vi.fn(),
  setOptions: vi.fn(),
  importLibrary: vi.fn(() => Promise.resolve({})),
}))

Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
})

Object.defineProperty(window, 'innerHeight', {
  writable: true,
  configurable: true,
  value: 768,
})
