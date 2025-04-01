import React from 'react';
import TextBox from './TextBox';
import './SlideEditor.css'; // 슬라이드 편집기 전용 CSS 파일 import

// SlideEditor 컴포넌트: 제목과 부제목 텍스트 박스를 포함하는 편집 화면
const SlideEditor: React.FC = () => {
  return (
    // 전체 슬라이드 편집 영역 컨테이너
    <div className="slide-editor">
      {/* 제목 텍스트 박스 */}
      <TextBox
        defaultText="제목을 추가하려면 클릭하십시오."
        className="slide-title"
      />

      {/* 부제목 텍스트 박스 */}
      <TextBox
        defaultText="부제목을 입력하십시오"
        className="slide-subtitle"
      />
    </div>
  );
};

export default SlideEditor; // SlideEditor 컴포넌트를 외부에서 사용할 수 있도록 export
