import * as core from '@actions/core'
import * as kb from './knowledgebase'
import {getContentUri} from './octokit'

// most @actions toolkit packages have async methods
async function run(): Promise<void> {
  try {
    const operation: string = core.getInput('operation')

    switch (operation) {
      case 'testContent': {
        const fullPath = await getContentUri(core.getInput('path-to-kb'))
        core.info(`Got file path: ${fullPath}`)
        break
      }
      case 'update': {
        const fullPath = await getContentUri(core.getInput('path-to-kb'))
        core.info('Updating kb')
        kb.update(
          core.getInput('kb-id'),
          core.getInput('endpoint'),
          core.getInput('credentials'),
          fullPath,
          core.getInput('kb-filename'),
          core
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
