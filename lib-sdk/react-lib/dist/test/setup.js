import "@testing-library/jest-dom";
// Mock IntersectionObserver
class MockIntersectionObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}
globalThis.IntersectionObserver = MockIntersectionObserver;
// Mock Vite React preamble
// @ts-expect-error - mock preamble
globalThis.__vite_plugin_react_preamble_installed__ = true;
//# sourceMappingURL=setup.js.map