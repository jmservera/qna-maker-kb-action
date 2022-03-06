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

async function update(
  api_key: string,
  endpoint: string,
  id: string,
  kb_url: string
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

  const update_kb_payload = {
    add: {
      files: [
        {
          fileName: 'test.xslx',
          fileUri: kb_url
        }
      ]
    },
    update: {}
  }

  const response = await knowledgeBaseClient.update(id, update_kb_payload)
  return response
}

export {update}
