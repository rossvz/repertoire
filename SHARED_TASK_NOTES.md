# Test Coverage Improvement - In Progress

## Current Status (Iteration 4 - 2025-11-21)
✅ All tests passing (52/52 tests in 8 files)
✅ Test suite is fast (~1.5 seconds total, 296ms for tests)
✅ Tests are stable with proper mocking
✅ Coverage: 48.6% (up from 46.39%)
✅ Utility functions: 97% coverage
✅ Custom hooks now have 100% coverage

## Next Steps for Further Coverage
Priority targets for component tests:
1. NewSongForm (23% coverage) - 138 uncovered lines
2. ShowCalendar (21% coverage) - large component with calendar logic
3. Login (23% coverage) - authentication flow
4. Song component (26% coverage) - main song display logic
5. Admin components (26-42% coverage)

## Notes for Next Iteration
- Global test setup at src/test/setup.tsx has Firebase/reactfire/Google Maps mocks
- Recently added limitToLast and startAfter to Firebase mock
- Hook tests use @testing-library/react's renderHook
- For future show dates in tests, use Date calculations to avoid test brittleness
- useSongs has search filtering and complex sorting logic (visible > votes > title)
- useShows filters out past shows via formatShows utility

## Configuration
- Vitest 3.2.4 with v8 coverage
- Happy-dom test environment
- Coverage thresholds: 80% (aspirational, not enforced yet)
