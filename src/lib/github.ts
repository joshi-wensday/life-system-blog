// src/lib/github.ts

import { Octokit } from "@octokit/rest"
import { Tag, TaggableItem } from './tags'
import { LifeSystemVersion, parseVersion } from './lifeSystem'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export interface GitHubProject extends TaggableItem {
  name: string;
  description: string;
  url: string;
  lifeSystemVersion: LifeSystemVersion;
}

export async function getProjects(username: string): Promise<GitHubProject[]> {
  const { data: repos } = await octokit.repos.listForUser({
    username,
    sort: 'updated',
    per_page: 100
  })

  return repos.map(repo => {
    const tags: Tag[] = repo.topics.map(topic => {
      const [key, value] = topic.split(':')
      return { key, value: value || topic }
    })

    const lifeSystemVersionTag = tags.find(tag => tag.key === 'life-system-version')
    const lifeSystemVersion = lifeSystemVersionTag 
      ? parseVersion(lifeSystemVersionTag.value as string)
      : { emoji: '🚫', majorPatch: 0, minorPatch: 0 }

    return {
      id: repo.id.toString(),
      name: repo.name,
      description: repo.description || '',
      url: repo.html_url,
      lifeSystemVersion,
      tags
    }
  })
}