import React, { useState, useRef } from 'react';
import './TextBox.css'; // 텍스트 박스 관련 스타일 파일 import

// TextBoxProps 타입 정의: 기본 텍스트와 선택적 클래스명
interface TextBoxProps {
  defaultText: string;
  className?: string;
}

// TextBox 컴포넌트 정의
const TextBox: React.FC<TextBoxProps> = ({ defaultText, className }) => {
  const [selected, setSelected] = useState(false); // 클릭 여부 상태 관리
  const [text, setText] = useState(defaultText); // 현재 텍스트 상태
  const [isPlaceholder, setIsPlaceholder] = useState(true); // 안내 문구 상태
  const ref = useRef<HTMLDivElement>(null); // DOM 참조

  const handleClick = () => {
    setSelected(true);
    // 안내 문구 상태라면 클릭 시 비움
    if (isPlaceholder) {
      setText('');
      setIsPlaceholder(false);
    }
  };

  const handleBlur = () => {
    setSelected(false);
    const content = ref.current?.innerText.trim() ?? '';
    if (content === '') {
      setText(defaultText);
      setIsPlaceholder(true);
    } else {
      setText(content);
      setIsPlaceholder(false);
    }
  };

  return (
    <div
      className={`text-box ${className || ''} ${selected ? 'selected' : ''}`}
      contentEditable
      suppressContentEditableWarning
      ref={ref}
      onClick={handleClick}
      onBlur={handleBlur}
    >
      {text}

      {/* 선택된 상태일 때만 핸들 표시 */}
      {selected && (
        <>
          <div className="resize-handle top-left" />
          <div className="resize-handle top" />
          <div className="resize-handle top-right" />
          <div className="resize-handle right" />
          <div className="resize-handle bottom-right" />
          <div className="resize-handle bottom" />
          <div className="resize-handle bottom-left" />
          <div className="resize-handle left" />
        </>
      )}
    </div>
  );
};

export default TextBox; // 컴포넌트 export
