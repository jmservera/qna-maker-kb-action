function log(message: string): void {
  // eslint-disable-next-line no-console
  console.log(message)
}

export function info(message: string): void {
  log(message)
}

export function debug(message: string): void {
  log(message)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function error(message: string | Error, properties?: never): void {
  log(`Error: ${message.toString()}`)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function warning(message: string | Error, properties?: never): void {
  log(`Warn: ${message.toString()}`)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function notice(message: string | Error, properties?: never): void {
  log(`Notice: ${message.toString()}`)
}
