import React from 'react';

interface PortableTextBlock {
  _type: string;
  style?: string;
  text?: string;
  children?: PortableTextBlock[];
  level?: number;
  listItem?: string;
  _key?: string;
  content?: any;
}

interface PortableTextProps {
  blocks: PortableTextBlock[];
}

export function PortableText({ blocks }: PortableTextProps) {
  if (!blocks || !Array.isArray(blocks)) {
    return null;
  }

  return (
    <div className="prose prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:text-lg prose-p:leading-relaxed prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-ul:text-lg prose-ol:text-lg">
      {blocks.map((block) => {
        if (!block._type) return null;

        if (block._type === 'block') {
          const style = block.style || 'normal';
          const text = block.children
            ?.map((child: any) => child.text || '')
            .join('') || '';

          switch (style) {
            case 'h1':
              return (
                <h1 key={block._key || Math.random()} className="text-4xl mt-8 mb-4">
                  {text}
                </h1>
              );
            case 'h2':
              return (
                <h2 key={block._key || Math.random()} className="text-3xl mt-6 mb-3">
                  {text}
                </h2>
              );
            case 'h3':
              return (
                <h3 key={block._key || Math.random()} className="text-2xl mt-5 mb-2">
                  {text}
                </h3>
              );
            case 'blockquote':
              return (
                <blockquote
                  key={block._key || Math.random()}
                  className="border-l-4 border-cyan-500 pl-4 italic my-4 text-muted-foreground"
                >
                  {text}
                </blockquote>
              );
            default:
              return (
                <p key={block._key || Math.random()} className="mb-4">
                  {text}
                </p>
              );
          }
        }

        if (block._type === 'image') {
          return (
            <figure key={block._key || Math.random()} className="my-8">
              <img
                src={block.asset?.url}
                alt={block.alt || ''}
                className="w-full rounded-lg"
              />
              {block.caption && (
                <figcaption className="text-sm text-muted-foreground mt-2 text-center">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        return null;
      })}
    </div>
  );
}
