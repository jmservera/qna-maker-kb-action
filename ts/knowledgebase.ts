
// code example from 
// https://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/quickstarts/quickstart-sdk?pivots=programming-language-javascript

const qnamaker = require("@azure/cognitiveservices-qnamaker")
const msRest = require("@azure/ms-rest-js")

function knowledgebaseUpdate(subscription_key: string, endpoint: string) {

  return new Promise((resolve) => {
    if (subscription_key == null)
      throw new Error('Please set your environment variables: AZURE_COGNITIVE_SERVICES_SUBSCRIPTION_KEY');
    if (endpoint == null)
      throw new Error('Please set your environment variables: AZURE_COGNITIVE_SERVICES_ENDPOINT');

    const creds = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': subscription_key } });
    const qnaMakerClient = new qnamaker.QnAMakerClient(creds, endpoint);
    const knowledgeBaseClient = new qnamaker.Knowledgebase(qnaMakerClient);

    const id = "0";

    const update_kb_payload = {
      add: {},
      update: null,
      delete: null,
      defaultAnswerUsedForExtraction: "No answer found. Please rephrase your question."
    };

    knowledgeBaseClient.update(id, update_kb_payload).then(function (response) {
      resolve(response);
    });
  });
}

export { knowledgebaseUpdate as update }