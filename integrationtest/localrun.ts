import * as logger from './logger'
import {publish, update} from '../src/knowledgebase'
import {RestError} from '@azure/ms-rest-js'
import {config} from 'dotenv'

config()
logger.info('Config loaded')

async function pub(): Promise<void> {
  logger.info('Start publish')
  if (process.env.API_ID && process.env.KB_ENDPOINT && process.env.KB_ID) {
    const published = await publish(
      process.env.API_ID,
      process.env.KB_ENDPOINT,
      process.env.KB_ID
    )
    if (!published) {
      logger.error('Publishing failed')
    } else {
      logger.info('Publishing succeeded')
    }
  }
}

async function upd(): Promise<void> {
  logger.info('Start')
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
        process.env.KB_FILENAME,
        logger
      )
      if (result.operationId && result.operationState) {
        logger.info(`Operation ${result.operationState}: ${result.operationId}`)
      } else if (
        result.errorResponse &&
        result.errorResponse.error &&
        result.errorResponse.error.message
      )
        logger.error(result.errorResponse.error.message)
    } catch (err) {
      if (err instanceof RestError) {
        if (
          err.body &&
          err.body.error &&
          err.body.error.details instanceof Array
        ) {
          for (const v of err.body.error.details) {
            if (v) {
              logger.error(JSON.stringify(v))
            }
          }
        }
      } else if (err instanceof Error) {
        logger.error(err.message)
      }
    }
  } else {
    logger.error('No values')
  }
}

// eslint-disable-next-line github/no-then
upd().then(
  async () =>
    // eslint-disable-next-line github/no-then
    await pub().then(() => logger.info('Done'))
)
