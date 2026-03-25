import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = MockIntersectionObserver as any;

// Mock Vite React preamble
// @ts-expect-error - mock preamble
globalThis.__vite_plugin_react_preamble_installed__ = true;
