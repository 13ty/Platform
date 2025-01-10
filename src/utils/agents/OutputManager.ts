import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export class OutputManager {
  async handleOutput(response: string, projectId: string) {
    const match = response.match(/\[GENERATE_OUTPUT\]\s*Type:\s*(\w+)\s*Content:\s*([\s\S]+?)(?=\[|$)/);
    if (!match) return;

    const [_, type, content] = match;
    await this.saveOutput(type, content.trim(), projectId);
  }

  private async saveOutput(type: string, content: string, projectId: string) {
    const outputDir = join('output', projectId);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${timestamp}-${type}.${this.getExtension(type)}`;
    const filepath = join(outputDir, filename);

    try {
      await mkdir(outputDir, { recursive: true });
      await writeFile(filepath, content);
    } catch (error) {
      console.error('Failed to save output:', error);
    }
  }

  private getExtension(type: string): string {
    const extensions: Record<string, string> = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      markdown: 'md',
      text: 'txt',
      html: 'html',
      css: 'css',
      json: 'json',
    };
    return extensions[type.toLowerCase()] || 'txt';
  }
}
