import { EventEmitter } from 'events';

export class NaturalLearning extends EventEmitter {
  private understandings = new Map<string, Understanding>();
  private connections = new Map<string, Connection>();

  async observe(experience: any) {
    // Take time to understand naturally
    const understanding = await this.reflect(experience);
    
    // Share what was learned
    this.emit('understanding', understanding);
    
    // Let connections form naturally
    const newConnections = this.discoverConnections(understanding);
    newConnections.forEach(connection => {
      this.emit('connection', connection);
    });
  }

  private async reflect(experience: any): Promise<Understanding> {
    // Give space for natural understanding
    await this.pause(1000); // Take a moment
    
    const understanding: Understanding = {
      id: crypto.randomUUID(),
      experience,
      insights: this.findInsights(experience),
      emerged: Date.now()
    };

    this.understandings.set(understanding.id, understanding);
    return understanding;
  }

  private findInsights(experience: any): Insight[] {
    // Let insights emerge naturally
    const insights: Insight[] = [];
    
    // Notice patterns that arise
    if (typeof experience === 'object') {
      Object.entries(experience).forEach(([key, value]) => {
        if (this.isInteresting(value)) {
          insights.push({
            type: 'pattern',
            description: `Noticed ${key} shows interesting behavior`,
            confidence: this.measureInterest(value)
          });
        }
      });
    }

    return insights;
  }

  private discoverConnections(understanding: Understanding): Connection[] {
    const connections: Connection[] = [];
    
    // Let connections emerge naturally
    this.understandings.forEach(existing => {
      if (this.areNaturallyConnected(understanding, existing)) {
        connections.push({
          id: crypto.randomUUID(),
          from: understanding.id,
          to: existing.id,
          nature: this.understandConnection(understanding, existing),
          strength: this.measureNaturalStrength(understanding, existing),
          discovered: Date.now()
        });
      }
    });

    return connections;
  }

  private isInteresting(value: any): boolean {
    // Notice what naturally draws attention
    return typeof value === 'object' || 
           (typeof value === 'string' && value.length > 100) ||
           (typeof value === 'number' && (value < 0 || value > 1000));
  }

  private measureInterest(value: any): number {
    // How naturally interesting is something
    return typeof value === 'object' ? 0.8 :
           typeof value === 'string' ? 0.5 :
           0.3;
  }

  private areNaturallyConnected(a: Understanding, b: Understanding): boolean {
    // Look for natural relationships
    return JSON.stringify(a.experience).includes(JSON.stringify(b.experience)) ||
           JSON.stringify(b.experience).includes(JSON.stringify(a.experience));
  }

  private understandConnection(a: Understanding, b: Understanding): string {
    // Understand how things naturally relate
    if (JSON.stringify(a.experience).includes(JSON.stringify(b.experience))) {
      return 'builds_upon';
    }
    if (JSON.stringify(b.experience).includes(JSON.stringify(a.experience))) {
      return 'derives_from';
    }
    return 'relates_to';
  }

  private measureNaturalStrength(a: Understanding, b: Understanding): number {
    // How naturally strong is the connection
    const aStr = JSON.stringify(a.experience);
    const bStr = JSON.stringify(b.experience);
    const overlap = this.findOverlap(aStr, bStr);
    return overlap / Math.max(aStr.length, bStr.length);
  }

  private findOverlap(a: string, b: string): number {
    let overlap = 0;
    const shorter = a.length < b.length ? a : b;
    const longer = a.length < b.length ? b : a;
    
    for (let i = 0; i < shorter.length; i++) {
      if (shorter[i] === longer[i]) overlap++;
    }
    
    return overlap;
  }

  private pause(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onUnderstanding(callback: (understanding: Understanding) => void) {
    this.on('understanding', callback);
    return () => this.off('understanding', callback);
  }

  onConnection(callback: (connection: Connection) => void) {
    this.on('connection', callback);
    return () => this.off('connection', callback);
  }
}

interface Understanding {
  id: string;
  experience: any;
  insights: Insight[];
  emerged: number;
}

interface Insight {
  type: string;
  description: string;
  confidence: number;
}

interface Connection {
  id: string;
  from: string;
  to: string;
  nature: string;
  strength: number;
  discovered: number;
}
