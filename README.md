# QnA Maker Action

<p align="center">
  <a href="https://github.com/jmservera/qna-maker-kb-action/actions"><img alt="qna-maker-kb-action status" src="https://github.com/jmservera/qna-maker-kb-action/workflows/units-test/badge.svg"></a>
</p>


> This is a preview version and not officialy supported, I'm doing it during my spare time, just for fun and because there was no official action for what I needed. While you can open issues, if you have an urgent need of something it doesn't provide, feel free to fork or/and collaborate in this one.

This action can take a file in your repo and push it to the QnA Maker Knowledgebase. As it uses [octokit.js][octokit] to create a link to your file and send it to the QnA Maker service, there's no need to run a checkout action before this one.

You can configure this action to:

* Update: *In preview* You need to provide the path in your repository to the Knwoledge Base file you want to push, the name of the file (this will overwrite the entries under this kb name), language and you can set the `delete-editorial`option to true when you want to clear the manual changes in your kb.
* Train: *Under development*
* Publish: *Under develoment*

> Security Notice: this action uses [octokit][octokit] to get a temporary SAS token to provide access to the file, and this works even in the case your repo is private. This token has a very short life but it is a potential security risk as an atacker getting it would be able to access all the files on your private repo. I do not print nor show in any way this token, but it is sent to the QnA Maker authoring endpoint, so it is better to treat these values (api-key and endpoint) as secrets.

## Inputs

### `operation`

**Required** Type of operation to run: testContent, *update* [Default], train, publish

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
uses: jmservera/qna-maker-kb-action@v0.0.10-preview
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
 - [] Enterprise internal repos - not tested yet
 - [x] Update the KB - Preview version 
 - [] Train - in progress
 - [] Publish - not started

---

I just leave this by now until I create a release of this action:


See the [toolkit documentation](https://github.com/actions/toolkit/blob/master/README.md#packages) for the various packages.

## Package for distribution

GitHub Actions will run the entry point from the action.yml. Packaging assembles the code into one file that can be checked in to Git, enabling fast and reliable execution and preventing the need to check in node_modules.

Actions are run from GitHub repos.  Packaging the action will create a packaged action in the dist folder.

Run prepare

```bash
npm run package
```

Since the packaged index.js is run from the dist folder.

```bash
git add dist
```

## Create a release branch

Users shouldn't consume the action from master since that would be latest code and actions can break compatibility between major versions.

Checkin to the v1 release branch

```bash
git checkout -b v1
git commit -a -m "v1 release"
```

```bash
git push origin v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Usage

You can now consume the action by referencing the v1 branch

```yaml
uses: actions/javascript-action@v1
with:
  milliseconds: 1000
```

See the [actions tab](https://github.com/actions/javascript-action/actions) for runs of this action! :rocket:

## Notes

Using tsconfig base for NodeJS16: https://github.com/tsconfig/bases#centralized-recommendations-for-tsconfig-bases


[octokit]: https://github.com/octokit/octokit.js "The GitHub SDK for Node.js Octokit package"