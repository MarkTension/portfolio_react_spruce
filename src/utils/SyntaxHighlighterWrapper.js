"use client";

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula as codeStyle } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import hlsl from 'react-syntax-highlighter/dist/cjs/languages/prism/hlsl';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';

SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('hlsl', hlsl);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('json', json);

export default function HighlightedCode({ language, children }) {
    return (
        <div className="codeBlock">
            <SyntaxHighlighter language={language?.toLowerCase()} style={codeStyle}>
                {children}
            </SyntaxHighlighter>
        </div>
    );
}
