import { Agent, Message, Task } from '../../types';
import { AgentManager } from './AgentManager';
import { OutputManager } from './OutputManager';

export class ConversationManager {
  private agentManager = new AgentManager();
  private outputManager = new OutputManager();
  
  async runConversation(task: Task, agents: Agent[], onMessage: (message: Message) => void) {
    const context: Message[] = [];
    let currentAgent = 0;

    while (context.length < 20) { // Limit conversation length
      const agent = agents[currentAgent];
      
      // Generate response from current agent
      const response = await this.agentManager.generateResponse(
        agent,
        context,
        this.createPromptForAgent(agent, task, context)
      );

      // Create message
      const message: Message = {
        id: crypto.randomUUID(),
        agentId: agent.id,
        content: response,
        timestamp: Date.now(),
        role: 'agent',
        taskId: task.id,
        projectId: task.projectId
      };

      // Add to context and notify
      context.push(message);
      onMessage(message);

      // Check for output generation
      if (response.includes("[GENERATE_OUTPUT]")) {
        await this.outputManager.handleOutput(response, task.projectId);
      }

      // Move to next agent
      currentAgent = (currentAgent + 1) % agents.length;
    }
  }

  private createPromptForAgent(agent: Agent, task: Task, context: Message[]): string {
    return `Task: ${task.description}

Your role is: ${agent.role}

Based on the conversation and your role, provide your next contribution. If you want to generate output (code, text, etc), include [GENERATE_OUTPUT] followed by the content and type.

Example:
[GENERATE_OUTPUT]
Type: javascript
Content:
function hello() {
  console.log("Hello");
}`;
  }
}
