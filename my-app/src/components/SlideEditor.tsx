import { useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import './SlideEditor.css';
import TextBox from './TextBox'; // 새로 만든 TextBox 컴포넌트 import

type TextBoxType = {
  id: number;
  x: number;
  y: number;
  text: string;
};

interface SlideEditorProps {
  onCapture: (dataUrl: string) => void;
  textBoxes: TextBoxType[];
  onTextBoxChange: (id: number, newText: string) => void;
}

function SlideEditor({ onCapture, textBoxes, onTextBoxChange }: SlideEditorProps) {
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slideRef.current) return;

    const observer = new MutationObserver(() => {
      html2canvas(slideRef.current!).then((canvas) => {
        const dataUrl = canvas.toDataURL();
        onCapture(dataUrl);
      });
    });

    observer.observe(slideRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    // 최초 캡처
    html2canvas(slideRef.current!).then((canvas) => {
      onCapture(canvas.toDataURL());
    });

    return () => observer.disconnect();
  }, [onCapture]);

  return (
    <div className="slide-editor">
      <div className="slide-box" ref={slideRef} id="slide-canvas">
        {textBoxes.map((box) => (
          <TextBox key={box.id} {...box} onChange={onTextBoxChange} />
        ))}
      </div>
    </div>
  );
}

export default SlideEditor;
