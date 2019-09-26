import {
  ErrorStack,
  parseMessageError,
  ErrorStackType
} from "./helpers/stackDetailParseHelper"
import { isMessageError } from "./helpers/stackTypeHelper"

export interface ErrorMessage {
  message: string
  stack: Array<{
    line: number
    column: number
    filename: string
  }>
}

const splitErrorStack = (stack: string): ErrorStack[] => {
  const rawStacks = stack.split("\n")
  const errorStacks: ErrorStack[] = rawStacks.map(stack => {
    if (isMessageError(stack)) {
      return parseMessageError(stack)
    }
  })
  return errorStacks
}

export function parseError(error: Error): ErrorMessage {
  const errorStackString = error.message

  const errorStacks = splitErrorStack(errorStackString)

  const errorMessageStack = errorStacks.find(
    stack => stack.type === ErrorStackType.Message
  )

  const errorInfo: ErrorMessage = {
    message: errorMessageStack ? errorMessageStack.message : "UNKNOWN",
    stack: []
  }

  return errorInfo
}
