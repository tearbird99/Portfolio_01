import { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas'; // 슬라이드 영역을 이미지로 캡처하기 위한 라이브러리
import './SlideEditor.css'; // 슬라이드 에디터 스타일 import
import TextBox from './TextBox'; // 텍스트 상자 컴포넌트 import

// 텍스트 박스 타입 정의
type TextBoxType = {
  id: number;    // 텍스트 박스 고유 ID
  x: number;     // X 위치
  y: number;     // Y 위치
  width: number;  // 폭
  height: number; // 높이이
  text: string;  // 텍스트 내용
};

// SlideEditor 컴포넌트 Props 타입 정의
interface SlideEditorProps {
  onCapture: (dataUrl: string) => void;                     // 캡처된 썸네일 이미지를 부모로 전달하는 함수
  textBoxes: TextBoxType[];                                 // 현재 슬라이드에 표시할 텍스트 박스 리스트
  onTextBoxChange: (id: number, newText: string) => void;    // 텍스트 박스 내용 변경 시 호출하는 함수
  onAddTextBox: (newBox: TextBoxType) => void;               // 텍스트 박스 추가 함수
}

// SlideEditor 컴포넌트
function SlideEditor({ onCapture, textBoxes, onTextBoxChange, onAddTextBox }: SlideEditorProps) {
  // 슬라이드 전체 영역을 참조하는 ref
  const slideRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [currentPos, setCurrentPos] = useState<{ x: number; y: number } | null>(null);

  // 1. 슬라이드 내용이 변경될 때마다 캡처하기 (html2canvas 사용)
  useEffect(() => {
    if (!slideRef.current) return;

    // MutationObserver: DOM에 변동이 생기면 감지
    const observer = new MutationObserver(() => {
      html2canvas(slideRef.current!).then((canvas) => {
        const dataUrl = canvas.toDataURL(); // 슬라이드 화면을 이미지로 변환
        onCapture(dataUrl);                 // 캡처 결과를 부모(App)로 전달
      });
    });

    // slideRef를 감시: 텍스트 박스 추가/수정/삭제 감지
    observer.observe(slideRef.current, {
      childList: true,      // 자식 요소 추가/삭제 감지
      subtree: true,        // 하위 트리까지 감지
      attributes: true,     // 속성(attribute) 변경 감지
      characterData: true,  // 텍스트 내용 변경 감지
    });

    // 최초 한 번 캡처
    html2canvas(slideRef.current!).then((canvas) => {
      onCapture(canvas.toDataURL());
    });

    // 컴포넌트 unmount 시 Observer 정리
    return () => observer.disconnect();
  }, [onCapture]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = slideRef.current!.getBoundingClientRect();
    setStartPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsDragging(true);
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !startPos) return;
    const rect = slideRef.current!.getBoundingClientRect();
    setCurrentPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  const handleMouseUp = () => {
    if (!isDragging || !startPos || !currentPos) {
      setIsDragging(false);
      setStartPos(null);
      setCurrentPos(null);
      return;
    }

    const x = Math.min(startPos.x, currentPos.x);
    const y = Math.min(startPos.y, currentPos.y);
    const width = Math.abs(startPos.x - currentPos.x);
    const height = Math.abs(startPos.y - currentPos.y);

    if (width > 10 && height > 10) { // 너무 작은 건 무시
      const newBox = {
        id: Date.now(),
        x,
        y,
        width,
        height,
        text: '',
      };
      onAddTextBox(newBox);
    }

    setIsDragging(false);
    setStartPos(null);
    setCurrentPos(null);
  };

  return (
    // 슬라이드 전체 에디터 영역
    <div className="slide-editor">
      {/* 실제 슬라이드를 표현하는 영역 */}
      <div className="slide-box" ref={slideRef} id="slide-canvas" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        {/* 모든 텍스트 박스를 렌더링 */}
        {textBoxes.map((box) => (
          <TextBox
            key={box.id}
            {...box}                // id, x, y, text 전달
            onChange={onTextBoxChange} // 텍스트 변경 핸들러 전달
          />
        ))}

        {isDragging && startPos && currentPos && (
          <div
            style={{
              position: 'absolute',
              border: '1px dashed gray',
              backgroundColor: 'rgba(0,0,0,0.05)',
              left: Math.min(startPos.x, currentPos.x),
              top: Math.min(startPos.y, currentPos.y),
              width: Math.abs(startPos.x - currentPos.x),
              height: Math.abs(startPos.y - currentPos.y),
              pointerEvents: 'none',
              zIndex: 9999,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default SlideEditor;