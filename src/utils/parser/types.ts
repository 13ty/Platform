export interface ArtifactData {
  id: string;
  title: string;
  content?: string;
  closed?: boolean;
}

export interface ActionData {
  id: string;
  type: 'file' | 'shell' | 'start';
  content?: string;
  filePath?: string;
  command?: string;
}

export interface ParserCallbacks {
  onArtifactOpen: (data: ArtifactData) => void;
  onArtifactClose: (data: ArtifactData) => void;
  onActionOpen: (data: { action: ActionData }) => void;
  onActionClose: (data: { action: ActionData }) => void;
  onActionStream: (data: { action: ActionData }) => void;
}
