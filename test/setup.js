import { cleanup } from "@testing-library/react"
import { afterEach, test } from "vitest"
import "@testing-library/jest-dom/vitest"

afterEach(() => {
  cleanup()
})