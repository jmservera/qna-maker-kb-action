"use strict";
// code example from 
// https://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/quickstarts/quickstart-sdk?pivots=programming-language-javascript
exports.__esModule = true;
exports.update = void 0;
var qnamaker = require("@azure/cognitiveservices-qnamaker");
var msRest = require("@azure/ms-rest-js");
function knowledgebaseUpdate(api_key, endpoint, id) {
    return new Promise(function (resolve) {
        if (api_key == null || api_key == "")
            throw new Error('Please set api_key');
        if (endpoint == null || endpoint == "")
            throw new Error('Please set endpoint');
        if (id == null || id == "")
            throw new Error('Please set id');
        var creds = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': api_key } });
        var qnaMakerClient = new qnamaker.QnAMakerClient(creds, endpoint);
        var knowledgeBaseClient = new qnamaker.Knowledgebase(qnaMakerClient);
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
}
exports.update = knowledgebaseUpdate;
