import * as core from '@actions/core'
import * as kb from './knowledgebase'
import {getContentUri} from './octokit'

async function update(
  filePath: string,
  deleteEditorial: boolean
): Promise<void> {
  const fullPath = await getContentUri(filePath)
  if (!fullPath) throw new Error(`Path not found for ${filePath}`)
  core.info('Updating kb')
  const result = await kb.update(
    core.getInput('api-key'),
    core.getInput('endpoint'),
    core.getInput('kb-id'),
    fullPath,
    core.getInput('kb-filename'),
    core,
    core.getInput('kb-language'),
    deleteEditorial
  )
  if (result?.errorResponse?.error?.message)
    core.setFailed(result.errorResponse.error.message)
}

async function publish(): Promise<void> {
  core.info('Publishing kb')
  const result = await kb.publish(
    core.getInput('api-key'),
    core.getInput('endpoint'),
    core.getInput('kb-id'),
    core
  )
  if (!result) core.setFailed('Could not publish kb')
}

// most @actions toolkit packages have async methods
async function run(): Promise<void> {
  try {
    const operation: string = core.getInput('operation')
    const filePath: string = core.getInput('path-to-kb')
    const deleteEditorial: boolean = core.getBooleanInput('delete-editorial')

    switch (operation) {
      case 'testContent': {
        const fullPath = await getContentUri(filePath)
        if (fullPath) core.info(`Got file path for ${filePath}`)
        else core.setFailed(`Could not get file ${filePath}`)
        break
      }
      case 'update': {
        await update(filePath, deleteEditorial)
        break
      }
      case 'publish': {
        await publish()
        break
      }
      case 'update+publish':
      default: {
        await update(filePath, deleteEditorial)
        await publish()
      }
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
    else core.setFailed('Unknown error')
  }
}

run()
