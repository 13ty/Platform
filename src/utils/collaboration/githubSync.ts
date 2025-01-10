import { Octokit } from '@octokit/rest';
import { DatabaseService } from '../database';
import JSZip from 'jszip';

export class GitHubSync {
  private octokit: Octokit;
  private db: DatabaseService;

  constructor(token: string, db: DatabaseService) {
    this.octokit = new Octokit({ auth: token });
    this.db = db;
  }

  async shareToRepo(projectId: string, repoName: string) {
    try {
      // Export project data
      const projectData = await this.exportProjectData(projectId);
      
      // Create or update repository
      await this.createOrUpdateRepo(repoName, projectData);
      
      return `https://github.com/${repoName}`;
    } catch (error) {
      console.error('Failed to share to GitHub:', error);
      throw error;
    }
  }

  private async exportProjectData(projectId: string) {
    const zip = new JSZip();

    // Export database data
    const project = await this.db.getProjects();
    const agents = await this.db.getAgents(projectId);
    const tasks = await this.db.getTasks(projectId);

    zip.file('project.json', JSON.stringify({ project, agents, tasks }, null, 2));
    
    return await zip.generateAsync({ type: 'nodebuffer' });
  }

  private async createOrUpdateRepo(repoName: string, data: Buffer) {
    const [owner, repo] = repoName.split('/');

    try {
      // Create or update repository
      await this.octokit.repos.createOrUpdate({
        owner,
        repo,
        auto_init: true,
        private: false
      });

      // Create commit with project data
      await this.octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: 'project-data.zip',
        message: 'Update project data',
        content: data.toString('base64')
      });
    } catch (error) {
      console.error('Failed to create/update repository:', error);
      throw error;
    }
  }
}
