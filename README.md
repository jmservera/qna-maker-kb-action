# QnA Maker Action

<p align="center">
  <a href="https://github.com/jmservera/qna-maker-kb-action/actions"><img alt="qna-maker-kb-action status" src="https://github.com/jmservera/qna-maker-kb-action/workflows/units-test/badge.svg"></a>
</p>


> This is a preview version and not officialy supported, I'm doing it during my spare time, just for fun and because there was no official action for what I needed. While you can open issues, if you have an urgent need of something it doesn't provide, feel free to fork or/and collaborate in this one.

This action can take a file in your repo and push it to the QnA Maker Knowledge base. As it uses [octokit.js][octokit] to create a link to your file and send it to the QnA Maker service, there's no need to run a checkout action before this one.

You can configure this action to:

* Update: *In preview* You need to provide the path in your repository to the Knwoledge Base file you want to push, the name of the file (this will overwrite the entries under this kb name), language and you can set the `delete-editorial`option to true when you want to clear the manual changes in your kb.
* Publish: *In preview* For this operation you only need the credentials for the QnA Maker and the knowledge base id.
* Update and Publish: *In preview* if you use the update+preview operation it will do the both operations in one call. This is the default operation for the action.

> :warning: <br> **Security Notice**: this action uses [octokit][octokit] to get a temporary SAS token to provide access to the file, and this works even in the case your repo is private. This token has a very short life but it is a potential security risk as an atacker getting it would be able to access all the files on your private repo. I do not print nor show in any way this token, but it is sent to the QnA Maker authoring endpoint, so it is better to treat these values (api-key and endpoint) as secrets.

## Inputs

### `operation`

**Required** Type of operation to run: testContent, update , publish, *update+publish*

Default: "update+publish"

### `api-key`

**Required** QnA Authoring Subscription Key

### `endpoint`

**Required** QnA Maker authoring endpoint in the form: 'https://YOUR-RESOURCE-NAME.cognitiveservices.azure.com'

### `kb-id`

**Required** Knowledge base id

### `path-to-kb`

**Required** Path to the KB .xls file in your repo, for example: "qna/my backup/my kb.xls"

### `kb-filename`

**Required** Name of the file, for example: "my kb.xls", for updates it will overwrite the contents under this name'

### `kb-language`

Language for the KB, (Default: 'English')

### `delete-editorial`

Mark it to true to also remove the manually edited contents before the update (Default: false)

### `GITHUB_TOKEN`

**Required** GitHub token or PAT (usually setting it to ${{ github.token }} should be enough even for private repos)

## Usage

```yaml
uses: jmservera/qna-maker-kb-action@v0.1.1-preview
with:
  api-key: ${{secrets.QNA_API_KEY}}
  endpoint: ${{secrets.QNA_ENDPOINT}}
  kb-id: ${{secrets.QNA_KB_ID}}
  operation: update
  path-to-kb: "my app/knowledgebase/QnAs.xlsx"
  kb-filename: "QnAs.xlsx"
  kb-language: "Spanish"
  delete-editorial: true
  GITHUB_TOKEN: ${{ github.token }}
```

## Work In Progress

 - [x] Run with private repos
 - [ ] Enterprise internal repos - not tested yet
 - [x] Update the KB - Preview version 
 - [x] Publish - Preview version

[octokit]: https://github.com/octokit/octokit.js "The GitHub SDK for Node.js Octokit package"