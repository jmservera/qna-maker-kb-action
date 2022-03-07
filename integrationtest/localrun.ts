import {RestError} from '@azure/ms-rest-js'
import {config} from 'dotenv'
import {update} from '../src/knowledgebase'

function logInfo(info: string): void {
  // eslint-disable-next-line no-console
  console.log(info)
}

function logError(error: string): void {
  logInfo(`Error: ${error}`)
}

config()
logInfo('Config loaded')

async function upd(): Promise<void> {
  logInfo('Start')
  if (
    process.env.API_ID &&
    process.env.KB_ENDPOINT &&
    process.env.KB_ID &&
    process.env.KB_URL &&
    process.env.KB_FILENAME
  ) {
    try {
      const result = await update(
        process.env.API_ID,
        process.env.KB_ENDPOINT,
        process.env.KB_ID,
        process.env.KB_URL,
        process.env.KB_FILENAME
      )
      if (result.operationId && result.operationState) {
        logInfo(`Operation ${result.operationState}: ${result.operationId}`)
        if (result.errorResponse) {
          logError(JSON.stringify(result.errorResponse))
        }
      } else if (
        result.errorResponse &&
        result.errorResponse.error &&
        result.errorResponse.error.message
      )
        logError(result.errorResponse.error.message)
    } catch (err) {
      if (err instanceof RestError) {
        if (
          err.body &&
          err.body.error &&
          err.body.error.details instanceof Array
        ) {
          for (const v of err.body.error.details) {
            if (v) {
              logError(JSON.stringify(v))
            }
          }
        }
      } else if (err instanceof Error) {
        logError(err.message)
      }
    }
  } else {
    logError('No values')
  }
}

// eslint-disable-next-line github/no-then
upd().then(() => logInfo('End execution'))
