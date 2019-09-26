import { ErrorStackDto } from ".."
import { ErrorStack } from "./stackDetailParseHelper"

export const mapFileError = (error: ErrorStack): ErrorStackDto => {
  const errorStack: ErrorStackDto = {
    line: error.line ? error.line : -1,
    column: error.column ? error.column : -1,
    filename: error.filename ? error.filename : "unknown"
  }
  return errorStack
}
