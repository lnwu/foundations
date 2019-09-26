import {
  ErrorStack,
  parseMessageError,
  ErrorStackType,
  parseFileError
} from "./helpers/stackDetailParseHelper"
import { isMessageError, isFileError } from "./helpers/stackTypeHelper"
import { mapFileError } from "./helpers/mapErrorHelper"

export interface ErrorStackDto {
  line: number
  column: number
  filename: string
}

export interface ErrorMessage {
  message: string
  stack: ErrorStackDto[]
}

const splitErrorStack = (stack: string): ErrorStack[] => {
  const rawStacks = stack.split("\n")
  const errorStacks: ErrorStack[] = rawStacks.map(stack => {
    if (isMessageError(stack)) {
      return parseMessageError(stack)
    }

    if (isFileError(stack)) {
      return parseFileError(stack)
    }

    return null
  })
  return errorStacks.filter(stack => !!stack)
}

export function parseError(error: Error): ErrorMessage {
  const errorStackString = error.message

  const errorStacks = splitErrorStack(errorStackString)

  const errorMessageStack = errorStacks.find(
    stack => stack.type === ErrorStackType.Message
  )

  const fileErrorStacks = errorStacks
    .filter(stack => stack.type === ErrorStackType.File)
    .map(stack => mapFileError(stack))

  const errorInfo: ErrorMessage = {
    message: errorMessageStack ? errorMessageStack.message : "UNKNOWN",
    stack: fileErrorStacks
  }

  return errorInfo
}
