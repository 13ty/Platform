import type { ParserCallbacks } from './types';

export class MessageParser {
  private callbacks: ParserCallbacks;
  private buffer: { [key: string]: string } = {};

  constructor(callbacks: ParserCallbacks) {
    this.callbacks = callbacks;
  }

  reset() {
    this.buffer = {};
  }

  parse(messageId: string, content: string): string {
    let parsedContent = content;

    // Handle artifacts
    parsedContent = this.parseArtifacts(messageId, parsedContent);
    
    // Handle actions
    parsedContent = this.parseActions(messageId, parsedContent);

    return parsedContent;
  }

  private parseArtifacts(messageId: string, content: string): string {
    const artifactRegex = /<boltArtifact.*?>(.*?)<\/boltArtifact>/gs;
    
    return content.replace(artifactRegex, (match, artifactContent) => {
      const idMatch = match.match(/id="([^"]*)"/) || [];
      const titleMatch = match.match(/title="([^"]*)"/) || [];

      this.callbacks.onArtifactOpen({
        id: idMatch[1] || messageId,
        title: titleMatch[1] || 'Untitled',
        content: artifactContent
      });

      return '';
    });
  }

  private parseActions(messageId: string, content: string): string {
    const actionRegex = /<boltAction.*?>(.*?)<\/boltAction>/gs;
    
    return content.replace(actionRegex, (match, actionContent) => {
      const typeMatch = match.match(/type="([^"]*)"/) || [];
      const filePathMatch = match.match(/filePath="([^"]*)"/) || [];

      const action = {
        id: `${messageId}-${Date.now()}`,
        type: typeMatch[1] as 'file' | 'shell' | 'start',
        content: actionContent,
        filePath: filePathMatch[1]
      };

      if (action.type === 'file') {
        this.callbacks.onActionOpen({ action });
      }
      
      this.callbacks.onActionClose({ action });
      return '';
    });
  }
}
