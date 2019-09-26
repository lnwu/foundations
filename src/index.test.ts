import { parseError } from "."

describe("index", () => {
  describe("parseError", () => {
    test("should return error message for chrome", () => {
      const chromeErrorStack = `TypeError: Error raised
        at bar http://192.168.31.8:8000/c.js:2:9
        at foo http://192.168.31.8:8000/b.js:4:15
        at calc http://192.168.31.8:8000/a.js:4:3
        at <anonymous>:1:11
        at http://192.168.31.8:8000/a.js:22:3
      `

      const error = parseError(new Error(chromeErrorStack))

      expect(error.message).toBe("Error raised")
    })
  })
})
