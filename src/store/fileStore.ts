import { create } from 'zustand';
import { toast } from 'sonner';

interface FileNode {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: FileNode[];
  path: string;
}

interface FileState {
  files: FileNode[];
  addFile: (path: string, content: string) => void;
  addDirectory: (path: string) => void;
  updateFile: (path: string, content: string) => void;
  deleteFile: (path: string) => void;
}

export const useFileStore = create<FileState>((set, get) => ({
  files: [],

  addFile: (path: string, content: string) => {
    const parts = path.split('/').filter(Boolean);
    const fileName = parts.pop() || '';
    
    set((state) => {
      const newFiles = [...state.files];
      let current = newFiles;
      
      // Create directory structure
      for (const part of parts) {
        let dir = current.find(f => f.type === 'directory' && f.name === part);
        if (!dir) {
          dir = {
            name: part,
            type: 'directory',
            path: `/${parts.slice(0, parts.indexOf(part) + 1).join('/')}`,
            children: []
          };
          current.push(dir);
        }
        current = dir.children || [];
      }

      // Add file
      current.push({
        name: fileName,
        type: 'file',
        content,
        path
      });

      return { files: newFiles };
    });

    toast.success('File created successfully');
  },

  addDirectory: (path: string) => {
    const parts = path.split('/').filter(Boolean);
    
    set((state) => {
      const newFiles = [...state.files];
      let current = newFiles;
      
      for (const part of parts) {
        let dir = current.find(f => f.type === 'directory' && f.name === part);
        if (!dir) {
          dir = {
            name: part,
            type: 'directory',
            path: `/${parts.slice(0, parts.indexOf(part) + 1).join('/')}`,
            children: []
          };
          current.push(dir);
        }
        current = dir.children || [];
      }

      return { files: newFiles };
    });

    toast.success('Directory created successfully');
  },

  updateFile: (path: string, content: string) => {
    set((state) => {
      const updateFileInTree = (files: FileNode[]): FileNode[] => {
        return files.map(file => {
          if (file.path === path) {
            return { ...file, content };
          }
          if (file.children) {
            return {
              ...file,
              children: updateFileInTree(file.children)
            };
          }
          return file;
        });
      };

      return { files: updateFileInTree(state.files) };
    });

    toast.success('File updated successfully');
  },

  deleteFile: (path: string) => {
    set((state) => {
      const deleteFileFromTree = (files: FileNode[]): FileNode[] => {
        return files.filter(file => {
          if (file.path === path) {
            return false;
          }
          if (file.children) {
            file.children = deleteFileFromTree(file.children);
          }
          return true;
        });
      };

      return { files: deleteFileFromTree(state.files) };
    });

    toast.success('File deleted successfully');
  }
}));
