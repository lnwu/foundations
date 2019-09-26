import { parseError, ErrorStackDto } from "."

describe("index", () => {
  describe("parseError", () => {
    describe("message error", () => {
      test("should return error message when has error message in error stack", () => {
        const errorStack = `TypeError: Error raised
          at bar http://192.168.31.8:8000/c.js:2:9
        `

        const error = parseError(new Error(errorStack))

        expect(error.message).toBe("Error raised")
      })

      test("should return error message unknown when has no error message in stack", () => {
        const errorStack = `
          bar@http://192.168.31.8:8000/c.js:2:9
          foo@http://192.168.31.8:8000/b.js:4:15
        `

        const error = parseError(new Error(errorStack))

        expect(error.message).toBe("UNKNOWN")
      })
    })

    describe("error stack", () => {
      test("should return error stack for chrome", () => {
        const chromeErrorStack = `TypeError: Error raised
          at bar http://192.168.31.8:8000/c.js:2:9
          at calc http://192.168.31.8:8000/a.js:4:3
        `

        const error = parseError(new Error(chromeErrorStack))

        const expectErrorStack: ErrorStackDto[] = [
          {
            line: 2,
            column: 9,
            filename: "c.js"
          },
          {
            line: 4,
            column: 3,
            filename: "a.js"
          }
        ]

        expect(error.stack).toEqual(expectErrorStack)
      })
      test("should return error stack for firefox", () => {
        const firefoxErrorStack = `
          bar@http://192.168.31.8:8000/c.js:2:9
          foo@http://192.168.31.8:8000/b.js:4:15
          calc@http://192.168.31.8:8000/a.js:4:3
        `

        const error = parseError(new Error(firefoxErrorStack))

        const expectErrorStack: ErrorStackDto[] = [
          {
            line: 2,
            column: 9,
            filename: "c.js"
          },
          {
            line: 4,
            column: 15,
            filename: "b.js"
          },
          {
            line: 4,
            column: 3,
            filename: "a.js"
          }
        ]

        expect(error.stack).toEqual(expectErrorStack)
      })

      test("should ignore anonymous error stack", () => {
        const firefoxErrorStack = `
          bar@http://192.168.31.8:8000/c.js:2:9
          foo@http://192.168.31.8:8000/b.js:4:15
          <anonymous>:1:11
          calc@http://192.168.31.8:8000/a.js:4:3
        `

        const error = parseError(new Error(firefoxErrorStack))

        expect(error.stack).toHaveLength(3)
      })
    })
  })
})
