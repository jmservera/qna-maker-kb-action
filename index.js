const core = require('@actions/core');
const kb = require('./knowledgebase');


// most @actions toolkit packages have async methods
async function run() {
  try {
    const operation = core.getInput('operation');

    switch(operation){
      case 'update':
        kb.kbUpdate(core.getInput('endpoint'), core.getInput('credentials'));
    }

    // core.info(`Waiting ${ms} milliseconds ...`);

    // core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    // await wait(parseInt(ms));
    // core.info((new Date()).toTimeString());

    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
