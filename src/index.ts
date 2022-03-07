import * as core from '@actions/core'
import * as kb from './knowledgebase'
import {getContentUri} from './octokit'

// most @actions toolkit packages have async methods
async function run(): Promise<void> {
  try {
    const operation: string = core.getInput('operation')
    const filePath: string = core.getInput('path-to-kb')
    const deleteEditorial: boolean = Boolean(
      core.getInput('delete-editorial')
    ).valueOf()

    switch (operation) {
      case 'testContent': {
        const fullPath = await getContentUri(filePath)
        if (fullPath) core.info(`Got file path for ${filePath}`)
        else core.error(`Could not get file ${filePath}`)
        break
      }
      case 'update': {
        const fullPath = await getContentUri(filePath)
        if (!fullPath) throw new Error(`Path not found for ${filePath}`)
        core.info('Updating kb')
        kb.update(
          core.getInput('api-key'),
          core.getInput('endpoint'),
          core.getInput('kb-id'),
          fullPath,
          core.getInput('kb-filename'),
          core,
          core.getInput('kb-language'),
          deleteEditorial
        )
        break
      }
    }

    // core.info(`Waiting ${ms} milliseconds ...`);

    // core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    // await wait(parseInt(ms));
    // core.info((new Date()).toTimeString());

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
