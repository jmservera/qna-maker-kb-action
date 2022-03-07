import * as core from '@actions/core'
import * as github from '@actions/github'

const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
const octokit = github.getOctokit(GITHUB_TOKEN)

export async function getContentUri(
  path: string
): Promise<string | null | undefined> {
  const {data} = await octokit.rest.repos.getContent({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    path,
    ref: github.context.ref
  })

  if (!Array.isArray(data)) {
    return data.download_url
  }

  throw new Error(`Could not find the content for $path`)
}
