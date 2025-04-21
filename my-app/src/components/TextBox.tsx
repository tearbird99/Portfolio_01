import { CSSProperties } from 'react';
import './TextBox.css';

interface TextBoxProps {
  id: number;
  x: number;
  y: number;
  text: string;
  onChange: (id: number, newText: string) => void;
}

function TextBox({ id, x, y, text, onChange }: TextBoxProps) {
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    onChange(id, e.currentTarget.innerText);
  };

  const style: CSSProperties = {
    top: y,
    left: x,
    position: 'absolute',
  };

  return (
    <div
      className="text-box"
      style={style}
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
    >
      {text}
    </div>
  );
}

export default TextBox;
