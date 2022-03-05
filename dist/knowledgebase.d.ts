import * as qnamaker from "@azure/cognitiveservices-qnamaker";
declare function update(
  api_key: string,
  endpoint: string,
  id: string
): Promise<qnamaker.QnAMakerModels.KnowledgebaseUpdateResponse>;
export { update };
