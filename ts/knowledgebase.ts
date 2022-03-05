// code example from
// https://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/quickstarts/quickstart-sdk?pivots=programming-language-javascript

import * as msRest from '@azure/ms-rest-js'
import * as qnamaker from '@azure/cognitiveservices-qnamaker'

async function update(
  api_key: string,
  endpoint: string,
  id: string
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
    update: {}
  }

  const response = await knowledgeBaseClient.update(id, update_kb_payload)
  return response
}

export {update}
