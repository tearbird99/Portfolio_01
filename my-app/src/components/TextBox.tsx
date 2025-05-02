import { useState, useEffect, useRef } from 'react';
import './TextBox.css'; // 텍스트 박스 스타일 import

// TextBox 컴포넌트 Props 타입 정의
interface TextBoxProps {
  id: number;                           // 텍스트 상자 고유 ID
  x?: number;                            // 텍스트 상자의 X 위치
  y?: number;                            // 텍스트 상자의 Y 위치
  width?: number;                        // 텍스트 상자의 폭
  height?: number;                       // 텍스트 상자의 높이
  text: string;                         // 텍스트 상자에 표시될 텍스트
  onChange: (id: number, newText: string) => void; // 텍스트 수정 시 호출될 함수
}

// TextBox 컴포넌트
function TextBox({ id, x = 0, y = 0, width = 200, height = 100, text, onChange }: TextBoxProps) {
  // DOM 요소 직접 제어를 위한 ref 생성
  const divRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [boxWidth, setBoxWidth] = useState(width);
  const [boxHeight, setBoxHeight] = useState(height);
  const [isResizing, setIsResizing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [resizeDir, setResizeDir] = useState<string>('');

  // text prop이 변경될 때마다 div 내부 텍스트를 강제로 동기화
  useEffect(() => {
    if (divRef.current && divRef.current.innerText !== text) {
      divRef.current.innerText = text;
    }
  }, [text]);

  // 사용자가 직접 입력할 때마다 호출되는 핸들러
  const handleInput = () => {
    if (divRef.current) {
      onChange(id, divRef.current.innerText); // 현재 텍스트를 부모 컴포넌트로 전달
    }
  };

  const handleMouseDown = (e: React.MouseEvent, dir: string) => {
    setIsResizing(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setResizeDir(dir);
    e.stopPropagation();
    e.preventDefault();
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    
    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;

    // 오른쪽과 아래는 크기 증가
    if (resizeDir.includes('right')) {
      setBoxWidth((prev) => Math.max(50, prev + dx));
    }
    if (resizeDir.includes('bottom')) {
      setBoxHeight((prev) => Math.max(30, prev + dy));
    }

    // 왼쪽: 위치 고정, 왼쪽으로 늘림
    if (resizeDir.includes('left')) {
      setBoxWidth((prev) => Math.max(50, prev - dx));
    }
    // 위쪽: 위치 고정, 위로 늘림
    if (resizeDir.includes('top')) {
      setBoxHeight((prev) => Math.max(30, prev - dy));
    }

    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    setResizeDir('');
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, startPos, resizeDir]);

  return (
    <div
      className="text-box-wrapper"
      style={{
        position: 'absolute',
        top: y,
        left: x,
        width: boxWidth,
        height: boxHeight,
      }}
      ref={wrapperRef}
    >
      <div
        className="text-box"                  // 텍스트 박스 스타일 적용
        contentEditable                       // 사용자 입력 가능하도록 설정
        suppressContentEditableWarning        // contentEditable 경고 억제
        ref={divRef}                          // div에 ref 연결
        onInput={handleInput}                  // 입력할 때마다 handleInput 실행
      />
      {/* 리사이즈 핸들 */}
      <div className="resize-handle top-left" onMouseDown={(e) => handleMouseDown(e, 'top-left')} />
      <div className="resize-handle top" onMouseDown={(e) => handleMouseDown(e, 'top')} />
      <div className="resize-handle top-right" onMouseDown={(e) => handleMouseDown(e, 'top-right')} />
      <div className="resize-handle right" onMouseDown={(e) => handleMouseDown(e, 'right')} />
      <div className="resize-handle bottom-right" onMouseDown={(e) => handleMouseDown(e, 'bottom-right')} />
      <div className="resize-handle bottom" onMouseDown={(e) => handleMouseDown(e, 'bottom')} />
      <div className="resize-handle bottom-left" onMouseDown={(e) => handleMouseDown(e, 'bottom-left')} />
      <div className="resize-handle left" onMouseDown={(e) => handleMouseDown(e, 'left')} />
    </div>
  );
}

export default TextBox;