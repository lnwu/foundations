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
