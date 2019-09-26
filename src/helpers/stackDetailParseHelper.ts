export enum ErrorStackType {
  Message,
  File,
  Anonymous
}

export interface ErrorStack {
  type: ErrorStackType
  raw: string
  message?: string
  line?: number
  column?: number
  filename?: string
}

export const parseMessageError = (message: string): ErrorStack => {
  const messageReg = /^TypeError:(.+)$/
  const regResult = messageReg.exec(message)

  const errorDetail: ErrorStack = {
    type: ErrorStackType.Message,
    raw: message,
    message: regResult ? regResult[1].trim() : "UNKNOWN"
  }
  return errorDetail
}

export const parseFileError = (message: string): ErrorStack => {
  const messageReg = /\/(\w+.js):(\d+):(\d+)$/
  const regResult = messageReg.exec(message)
  if (regResult) {
    const [, filename, line, column] = regResult
    const errorDetail: ErrorStack = {
      type: ErrorStackType.File,
      raw: message,
      line: Number(line),
      column: Number(column),
      filename: filename
    }
    return errorDetail
  }
  return null
}
