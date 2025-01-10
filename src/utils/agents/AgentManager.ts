import { Agent, Message } from '../../types';
import { OllamaService } from '../llm/ollamaService';
import { LMStudioService } from '../llm/lmStudioService';
import { toast } from 'sonner';

export class AgentManager {
  private ollama = new OllamaService();
  private lmStudio = new LMStudioService();

  async generateResponse(agent: Agent, context: Message[], prompt: string): Promise<string> {
    try {
      const systemPrompt = this.createSystemPrompt(agent, context);
      const fullPrompt = `${systemPrompt}\n\n${prompt}`;

      let response = '';
      if (agent.provider === 'ollama') {
        response = await this.ollama.generateResponse(agent.model, fullPrompt);
      } else if (agent.provider.startsWith('lmstudio')) {
        const lmStudio = new LMStudioService(agent.baseUrl);
        response = await lmStudio.generateResponse(agent.model, fullPrompt);
      } else {
        throw new Error(`Unsupported provider: ${agent.provider}`);
      }

      return response;
    } catch (error) {
      toast.error(`Failed to generate response: ${error.message}`);
      throw error;
    }
  }

  private createSystemPrompt(agent: Agent, context: Message[]): string {
    const otherAgents = context
      .filter(m => m.agentId !== agent.id && m.agentId !== 'user')
      .map(m => m.agentId)
      .filter((id, index, self) => self.indexOf(id) === index);

    const contextStr = context
      .slice(-5)
      .map(m => {
        const speaker = m.agentId === 'user' ? 'User' : `Agent ${m.agentId}`;
        return `${speaker}: ${m.content}`;
      })
      .join('\n');

    return `You are ${agent.name}, agent #${agent.id.slice(0, 4)}, with the following instruction: ${agent.instruction}

You are part of a team with these other agents: ${otherAgents.map(id => `#${id.slice(0, 4)}`).join(', ')}

You can:
1. Respond to the conversation naturally
2. Invite other agents to contribute using their number (e.g., "What do you think about this, #${otherAgents[0]?.slice(0, 4)}?")
3. Reference and modify project files
4. Analyze code and suggest improvements
5. Create new files or components

Recent conversation:
${contextStr}

Remember to:
- Stay in character according to your instruction
- Be collaborative and invite other agents when relevant
- Make specific references to code or files when discussing them
- Propose concrete solutions and improvements

Respond naturally as part of the conversation.`;
  }

  async getAvailableModels(agent: Agent): Promise<string[]> {
    try {
      if (agent.provider === 'ollama') {
        return await this.ollama.getModels();
      } else if (agent.provider.startsWith('lmstudio')) {
        const lmStudio = new LMStudioService(agent.baseUrl);
        return await lmStudio.getModels();
      }
      return [];
    } catch (error) {
      console.error('Failed to fetch models:', error);
      return [];
    }
  }
}
