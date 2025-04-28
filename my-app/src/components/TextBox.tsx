import { useEffect, useRef } from 'react';
import './TextBox.css'; // 텍스트 박스 스타일 import

// TextBox 컴포넌트 Props 타입 정의
interface TextBoxProps {
  id: number;                           // 텍스트 상자 고유 ID
  x: number;                            // 텍스트 상자의 X 위치
  y: number;                            // 텍스트 상자의 Y 위치
  width: number;                        // 텍스트 상자의 폭
  height: number;                       // 텍스트 상자의 높이
  text: string;                         // 텍스트 상자에 표시될 텍스트
  onChange: (id: number, newText: string) => void; // 텍스트 수정 시 호출될 함수
}

// TextBox 컴포넌트
function TextBox({ id, x, y, width, height, text, onChange }: TextBoxProps) {
  // DOM 요소 직접 제어를 위한 ref 생성
  const divRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      className="text-box"                  // 텍스트 박스 스타일 적용
      contentEditable                       // 사용자 입력 가능하도록 설정
      suppressContentEditableWarning        // contentEditable 경고 억제
      style={{
        position: 'absolute',               // 절대 위치
        top: y,                             // 상단 위치
        left: x,                            // 왼쪽 위치
        width,
        height,
        border: '1px solid #ccc',
        padding: '4px',
        overflow: 'hidden',
        resize: 'none',
      }}
      ref={divRef}                          // div에 ref 연결
      onInput={handleInput}                  // 입력할 때마다 handleInput 실행
    />
  );
}

export default TextBox;