import { TaskChatHandler } from './taskChatHandler';
import { Task, TaskStep } from '../../types/task';
import { ChatMessage } from '../../types/chat';
import { EventEmitter } from 'events';

export class AutoResponseManager extends EventEmitter {
  private chatHandler: TaskChatHandler;
  private responseQueue: Map<string, QueuedResponse>;

  constructor() {
    super();
    this.chatHandler = new TaskChatHandler();
    this.responseQueue = new Map();
  }

  handleMessage(message: ChatMessage, task: Task) {
    // Nie odpowiadaj na własne wiadomości
    if (message.agentId === 'system') return;

    const currentStep = task.steps.find(s => s.status === 'in_progress');
    if (!currentStep) return;

    const response = this.generateResponse(message, task, currentStep);
    if (response) {
      this.queueResponse(task.id, response);
    }
  }

  private generateResponse(message: ChatMessage, task: Task, step: TaskStep): QueuedResponse | null {
    // Sprawdź kontekst wiadomości
    const needsResponse = this.analyzeMessageContext(message);
    if (!needsResponse) return null;

    return {
      id: crypto.randomUUID(),
      content: this.createResponseContent(message, task, step),
      priority: this.calculatePriority(message),
      timestamp: Date.now()
    };
  }

  private analyzeMessageContext(message: ChatMessage): boolean {
    const content = message.content.toLowerCase();
    return content.includes('?') || 
           content.includes('help') ||
           content.includes('clarify') ||
           content.includes('explain');
  }

  private createResponseContent(message: ChatMessage, task: Task, step: TaskStep): string {
    const templates = {
      question: 'To answer your question about {topic}: {explanation}',
      clarification: 'Let me clarify the current step: {stepDetails}',
      help: 'Here\'s how you can proceed with {task}: {guidance}'
    };

    // Wybierz odpowiedni szablon i wypełnij go danymi
    const template = this.selectTemplate(message);
    return this.fillTemplate(template, { task, step, message });
  }

  private calculatePriority(message: ChatMessage): number {
    let priority = 1;
    const content = message.content.toLowerCase();

    if (content.includes('urgent') || content.includes('asap')) priority += 2;
    if (content.includes('blocked') || content.includes('cannot proceed')) priority += 1;
    if (message.metadata?.isLeader) priority += 1;

    return priority;
  }

  private queueResponse(taskId: string, response: QueuedResponse) {
    this.responseQueue.set(taskId, response);
    this.emit('responseQueued', response);
    
    // Automatycznie wyślij odpowiedź po krótkim opóźnieniu
    setTimeout(() => {
      this.emit('sendResponse', response);
      this.responseQueue.delete(taskId);
    }, 1000); // 1 sekunda opóźnienia
  }

  private selectTemplate(message: ChatMessage): string {
    const content = message.content.toLowerCase();
    
    if (content.includes('?')) return 'question';
    if (content.includes('clarify')) return 'clarification';
    return 'help';
  }

  private fillTemplate(template: string, data: any): string {
    // Implementacja wypełniania szablonu
    return template
      .replace('{topic}', data.message.content)
      .replace('{explanation}', this.generateExplanation(data))
      .replace('{stepDetails}', data.step.description)
      .replace('{task}', data.task.title)
      .replace('{guidance}', this.generateGuidance(data));
  }

  private generateExplanation(data: any): string {
    // Logika generowania wyjaśnienia
    return `Based on the current task context, ${data.step.description}`;
  }

  private generateGuidance(data: any): string {
    // Logika generowania wskazówek
    return `First, review the current step. Then, ${data.step.description}`;
  }
}

interface QueuedResponse {
  id: string;
  content: string;
  priority: number;
  timestamp: number;
}
