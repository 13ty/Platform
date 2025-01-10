# Code Patterns & Style Guide

## Component Structure

```typescript
// Clear interface definitions
interface ComponentProps {
  data: DataType;
  onAction: (data: ActionData) => void;
}

// Single responsibility components
function TaskComponent({ data, onAction }: ComponentProps) {
  // State management at top
  const [state, setState] = useState();

  // Business logic in hooks
  useEffect(() => {
    // Side effects
  }, [dependencies]);

  // Event handlers
  const handleAction = () => {
    // Action logic
  };

  // Clean render method
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
```

## Guidelines

1. Use TypeScript for type safety
2. Keep components focused and small
3. Extract reusable logic to hooks
4. Maintain consistent naming conventions
5. Document complex logic
