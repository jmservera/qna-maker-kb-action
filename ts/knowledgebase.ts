
// code example from 
// https://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/quickstarts/quickstart-sdk?pivots=programming-language-javascript

import qnamaker = require("@azure/cognitiveservices-qnamaker");
import msRest = require("@azure/ms-rest-js");

function knowledgebaseUpdate(api_key: string, endpoint: string, id: string) {
  
  return new Promise((resolve) => {
    if (api_key == null || api_key=="")
      throw new Error('Please set api_key');
    if (endpoint == null || endpoint=="")
      throw new Error('Please set endpoint');
    if (id==null || id=="")
      throw new Error('Please set id');

    const creds = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': api_key } });
    const qnaMakerClient = new qnamaker.QnAMakerClient(creds, endpoint);
    const knowledgeBaseClient = new qnamaker.Knowledgebase(qnaMakerClient);
    
    
    var update_kb_payload = {
      update: {}
    };

    knowledgeBaseClient.update(id, update_kb_payload).then(function (response) {
      resolve(response);
    });
  });
}

export {knowledgebaseUpdate as update}