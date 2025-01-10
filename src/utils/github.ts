import { Octokit } from '@octokit/rest';

export class GitHubService {
  private octokit: Octokit;

  constructor(token: string) {
    this.octokit = new Octokit({ auth: token });
  }

  async exportToGist(files: Record<string, { content: string }>, description: string) {
    try {
      const response = await this.octokit.gists.create({
        description,
        public: false,
        files,
      });
      return response.data.html_url;
    } catch (error) {
      console.error('Failed to create gist:', error);
      throw error;
    }
  }

  async importFromGist(gistId: string) {
    try {
      const response = await this.octokit.gists.get({ gist_id: gistId });
      return response.data.files;
    } catch (error) {
      console.error('Failed to fetch gist:', error);
      throw error;
    }
  }
}
