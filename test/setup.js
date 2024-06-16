import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import "@testing-library/react";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
