import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('json', json);

interface Props {
  code: string;
  language?: string;
}

export function CodePreview({ code, language = 'json' }: Props) {
  return (
    <div className="rounded-lg overflow-hidden">
      <SyntaxHighlighter
        language={language}
        style={githubGist}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: '#f8f9fa',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
