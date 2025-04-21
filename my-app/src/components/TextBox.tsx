import { useEffect, useRef } from 'react';
import './TextBox.css';

interface TextBoxProps {
  id: number;
  x: number;
  y: number;
  text: string;
  onChange: (id: number, newText: string) => void;
}

function TextBox({ id, x, y, text, onChange }: TextBoxProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current && divRef.current.innerText !== text) {
        divRef.current.innerText = text;
    }
  }, [text]);

  const handleInput = () => {
    if (divRef.current) {
      onChange(id, divRef.current.innerText);
    }
  };

  return (
    <div
      className="text-box"
      contentEditable
      suppressContentEditableWarning
      style={{
        position: 'absolute',
        top: y,
        left: x,
      }}
      ref={divRef}
      onInput={handleInput}
    />
  );
}

export default TextBox;
