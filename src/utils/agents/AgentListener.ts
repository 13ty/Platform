import { Agent, ChatMessage } from '../../types';
import { AgentManager } from './AgentManager';
import { useAgentStore } from '../../store/agentStore';
import { useChatStore } from '../../store/chatStore';

export class AgentListener {
  private agentManager: AgentManager;
  private isListening: boolean = false;
  private currentTurn: number = 0;
  private processingQueue: boolean = false;

  constructor() {
    this.agentManager = new AgentManager();
  }

  startListening(sessionId: string) {
    if (this.isListening) return;
    this.isListening = true;
    this.processMessageQueue(sessionId);
  }

  stopListening() {
    this.isListening = false;
  }

  private async processMessageQueue(sessionId: string) {
    if (this.processingQueue || !this.isListening) return;
    
    this.processingQueue = true;
    const chatStore = useChatStore.getState();
    const session = chatStore.sessions.find(s => s.id === sessionId);

    if (!session || session.status !== 'active') {
      this.processingQueue = false;
      return;
    }

    try {
      const currentAgent = session.turnOrder[this.currentTurn];
      const lastMessage = session.messages[session.messages.length - 1];

      // Don't respond if the last message was from this agent
      if (lastMessage?.agentId === currentAgent) {
        this.moveToNextTurn(session.turnOrder.length);
        this.processingQueue = false;
        return;
      }

      const agent = useAgentStore.getState().agents.find(a => a.id === currentAgent);
      if (!agent) {
        this.processingQueue = false;
        return;
      }

      // Generate response
      const response = await this.agentManager.generateResponse(
        agent,
        session.messages,
        this.createPromptForAgent(agent, session.messages)
      );

      // Add response to chat
      chatStore.addMessage({
        id: crypto.randomUUID(),
        content: response,
        timestamp: Date.now(),
        type: 'text',
        agentId: agent.id
      });

      this.moveToNextTurn(session.turnOrder.length);
    } catch (error) {
      console.error('Error processing message queue:', error);
    } finally {
      this.processingQueue = false;
      
      // Continue listening if still active
      if (this.isListening) {
        setTimeout(() => this.processMessageQueue(sessionId), 1000);
      }
    }
  }

  private moveToNextTurn(totalAgents: number) {
    this.currentTurn = (this.currentTurn + 1) % totalAgents;
  }

  private createPromptForAgent(agent: Agent, messages: ChatMessage[]): string {
    const context = messages.slice(-5).map(m => 
      `${m.agentId === 'user' ? 'User' : 'Agent'}: ${m.content}`
    ).join('\n');

    return `You are ${agent.name} with the following instruction: ${agent.instruction}

Previous messages:
${context}

Respond according to your role and the conversation context. You can:
1. Reply to specific messages
2. Propose file changes
3. Reference project sources
4. Analyze code or content
5. Make suggestions

Keep responses focused and constructive.`;
  }
}
