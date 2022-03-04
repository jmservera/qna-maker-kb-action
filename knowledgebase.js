"use strict";
// code example from 
// https://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/quickstarts/quickstart-sdk?pivots=programming-language-javascript
exports.__esModule = true;
exports.update = void 0;
var qnamaker = require("@azure/cognitiveservices-qnamaker");
var msRest = require("@azure/ms-rest-js");
function knowledgebaseUpdate(subscription_key, endpoint) {
    return new Promise(function (resolve) {
        if (subscription_key == null)
            throw new Error('Please set your environment variables: AZURE_COGNITIVE_SERVICES_SUBSCRIPTION_KEY');
        if (endpoint == null)
            throw new Error('Please set your environment variables: AZURE_COGNITIVE_SERVICES_ENDPOINT');
        var creds = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': subscription_key } });
        var qnaMakerClient = new qnamaker.QnAMakerClient(creds, endpoint);
        var knowledgeBaseClient = new qnamaker.Knowledgebase(qnaMakerClient);
        var id = "0";
        var update_kb_payload = {
            add: {},
            update: null,
            "delete": null,
            defaultAnswerUsedForExtraction: "No answer found. Please rephrase your question."
        };
        knowledgeBaseClient.update(id, update_kb_payload).then(function (response) {
            resolve(response);
        });
    });
    //client.knowledgebase.update()
    // if (typeof milliseconds !== 'number') {
    //   throw new Error('milliseconds not a number');
    // }
    // setTimeout(() => resolve("done!"), milliseconds)
}
exports.update = knowledgebaseUpdate;
