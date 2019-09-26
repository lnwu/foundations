export const isMessageError = (raw: string): boolean => {
  const chromeReg = /^TypeError:.+/
  return chromeReg.test(raw)
}

export const isFileError = (raw: string): boolean => {
  const chromeReg = /^at.+\.js:\d+:\d+$/
  const firefoxReg = /\.js:\d+:\d+$/
  return chromeReg.test(raw) || firefoxReg.test(raw)
}

export const isAnonymousError = (raw: string): boolean => {
  const reg = /<anonymous>:\d+:\d+/
  return reg.test(raw)
}
