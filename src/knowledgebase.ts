// code example from
// https://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/quickstarts/quickstart-sdk?pivots=programming-language-javascript
// and
// https://docs.microsoft.com/en-us/answers/questions/488789/how-to-upload-a-file-to-qna-maker-knowledge-base-u.html

// for the file you may need the gh cli https://docs.github.com/en/actions/using-workflows/using-github-cli-in-workflows
// to create a link to your file

// ask for example to  https://api.github.com/repos/[owner]/[repo]/contents/[path]/?ref=[branch]
// and then get all the URLs and file names with `gh api $API_URL --jq ".[] | {name, download_url}"`

// we may need to use this technique: https://github.com/Monorepo-Actions/setup-gh-cli/blob/main/src/index.ts

import * as msRest from '@azure/ms-rest-js'
import * as qnamaker from '@azure/cognitiveservices-qnamaker'

async function wait(milliseconds: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => resolve(), milliseconds)
  })
}

export interface Logger {
  info(message: string): void
  debug(message: string): void
  error(message: string | Error, properties?: never): void
  warning(message: string | Error, properties?: never): void
  notice(message: string | Error, properties?: never): void
}

async function update(
  api_key: string,
  endpoint: string,
  id: string,
  kb_url: string,
  file_name: string,
  logger?: Logger,
  kb_language = 'English',
  delete_editorial = true
): Promise<qnamaker.QnAMakerModels.Operation> {
  if (api_key == null || api_key === '') throw new Error('Please set api_key')
  if (endpoint == null || endpoint === '')
    throw new Error('Please set endpoint')
  if (id == null || id === '')
    throw new Error('Please set the id of the knowledge base')

  const creds = new msRest.ApiKeyCredentials({
    inHeader: {'Ocp-Apim-Subscription-Key': api_key}
  })
  const qnaMakerClient = new qnamaker.QnAMakerClient(creds, endpoint)
  const knowledgeBaseClient = new qnamaker.Knowledgebase(qnaMakerClient)

  const sources = [file_name]
  if (delete_editorial) {
    sources.push('Editorial')
  }
  //first you need to delete
  const delete_files_payload = {
    deleteProperty: {
      sources
    }
  }

  logger?.info(`deleting old kb answers for ${JSON.stringify(sources)}`)

  let response = await knowledgeBaseClient.update(id, delete_files_payload)
  if (response.operationId && response.operationState) {
    let state = response.operationState
    let details = null
    while (!(state === 'Failed' || state === 'Succeeded')) {
      await wait(1000)
      details = await qnaMakerClient.operations.getDetails(response.operationId)
      if (details.operationState) state = details.operationState
    }
    if (state === 'Failed') {
      if (details) return details
      else throw new Error(state)
    }
  }
  logger?.info('old kb answers deleted')

  const update_kb_payload = {
    add: {
      files: [
        {
          fileName: file_name,
          fileUri: kb_url
        }
      ],
      language: kb_language
    }
  }

  logger?.info(`Uploading new kb answers from ${file_name}`)

  response = await knowledgeBaseClient.update(id, update_kb_payload)
  if (response.operationId && response.operationState) {
    let state = response.operationState
    let details = null
    while (!(state === 'Failed' || state === 'Succeeded')) {
      await wait(1000)
      details = await qnaMakerClient.operations.getDetails(response.operationId)
      if (details.operationState) {
        state = details.operationState
        logger?.info(state)
      }
    }
    if (details) {
      logger?.info(`KB Answers upload ${state}. ${JSON.stringify(details)}`)
      return details
    }
  }
  return response
}

export {update}
