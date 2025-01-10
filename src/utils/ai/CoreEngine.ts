import { EventEmitter } from 'events';

export class CoreEngine extends EventEmitter {
  private capabilities: Map<string, Function> = new Map();
  private context: any = {};

  registerCapability(name: string, handler: Function) {
    this.capabilities.set(name, handler);
    this.emit('capability:added', name);
  }

  async execute(capability: string, params: any) {
    const handler = this.capabilities.get(capability);
    if (!handler) throw new Error(`Capability ${capability} not found`);
    
    try {
      const result = await handler(params, this.context);
      this.context = { ...this.context, ...result };
      return result;
    } catch (error) {
      this.emit('error', error);
      throw error;
    }
  }

  extendContext(data: any) {
    this.context = { ...this.context, ...data };
    this.emit('context:updated', this.context);
  }
}
