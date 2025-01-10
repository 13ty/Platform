import type { ChatMessage } from '../../types/chat';
import type { Task } from '../../types/task';
import { useTaskStore } from '../../store/taskStore';

export class TaskChatHandler {
  handleTaskMessage(message: ChatMessage, task: Task) {
    const { updateTaskStep } = useTaskStore.getState();
    const currentStep = task.steps.find(s => s.status === 'in_progress');
    
    if (!currentStep) return;

    // Handle leader messages
    if (message.agentId === task.agents[0]) {
      if (this.isEvaluation(message.content)) {
        updateTaskStep(task.id, currentStep.id, {
          evaluation: {
            passed: this.parseEvaluation(message.content),
            feedback: message.content,
            evaluatedBy: message.agentId,
            evaluatedAt: message.timestamp
          }
        });
      }
    }
  }

  private isEvaluation(content: string): boolean {
    return content.toLowerCase().includes('evaluation:') ||
           content.toLowerCase().includes('assessment:');
  }

  private parseEvaluation(content: string): boolean {
    const lowerContent = content.toLowerCase();
    return lowerContent.includes('success') ||
           lowerContent.includes('passed') ||
           lowerContent.includes('approved');
  }
}
