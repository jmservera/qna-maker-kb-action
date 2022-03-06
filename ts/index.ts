import * as core from '@actions/core'
import * as kb from './knowledgebase'

// most @actions toolkit packages have async methods
async function run(): Promise<void> {
  try {
    const operation: string = core.getInput('operation')

    switch (operation) {
      case 'update':
        kb.update(
          core.getInput('kbId'),
          core.getInput('endpoint'),
          core.getInput('credentials')
          core.getInput('path-to-kb')
        )
        break
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
