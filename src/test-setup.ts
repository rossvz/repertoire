// Mock Google Maps API Loader
vi.mock("@googlemaps/js-api-loader", () => ({
  setOptions: vi.fn(),
  importLibrary: vi.fn().mockResolvedValue({}),
  Loader: vi.fn(() => ({
    load: vi.fn().mockResolvedValue({}),
  })),
}))

// Mock Firebase
vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({})),
  signInWithEmailAndPassword: vi.fn(),
}))

vi.mock("firebase/database", () => ({
  getDatabase: vi.fn(() => ({})),
  ref: vi.fn(),
  onValue: vi.fn(),
  set: vi.fn(),
  push: vi.fn(),
  remove: vi.fn(),
}))

// Mock reactfire
vi.mock("reactfire", async () => {
  const actual = await vi.importActual("reactfire")
  return {
    ...actual,
    useFirebaseApp: vi.fn(() => ({})),
    useAuth: vi.fn(() => ({})),
    useDatabase: vi.fn(() => ({})),
    useSigninCheck: vi.fn(() => ({
      status: "success",
      data: { signedIn: false, user: null },
    })),
  }
})
