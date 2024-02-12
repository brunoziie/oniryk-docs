'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

export type EditableTextProps = {
  html?: string;
  onChange?: (html: string) => void | Promise<void>;
  placeholder?: string;
  className?: string;
};

const stripTags = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

export default function EditableText({
  html = '',
  onChange,
  className,
  placeholder,
}: EditableTextProps) {
  const [value, setValue] = useState(html);

  const cleanOnPaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const text = event.clipboardData.getData('text');
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;
    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(text));
    selection.collapseToEnd();
  };

  const handleChange = (event: ContentEditableEvent) => {
    if (onChange) {
      const value = event.target.value;
      setValue(stripTags(value));
    }
  };

  const preventTextStyles = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      return;
    }

    if (event.ctrlKey || event.metaKey) {
      const allowed = ['v', 'c', 'v', 'a'];

      if (!allowed.includes(event.key.toLowerCase())) {
        event.preventDefault();
        return;
      }
    }
  };

  return (
    <div className="relative">
      {placeholder && !value && (
        <span className={cn('absolute opacity-10', className)}>{placeholder}</span>
      )}

      <ContentEditable
        html={value}
        onChange={handleChange}
        className={cn('relative z-10 outline-none', className)}
        onKeyDown={preventTextStyles}
        onPaste={cleanOnPaste}
      />
    </div>
  );
}
