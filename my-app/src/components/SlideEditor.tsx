import React, { useState } from 'react';
import './SlideEditor.css'; // 슬라이드 편집기 전용 CSS 파일 import

// SlideEditor 컴포넌트: 제목과 부제목을 입력할 수 있는 영역
const SlideEditor: React.FC = () => {
  // 제목과 부제목 상태 정의
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  return (
    // 전체 슬라이드 편집 영역 컨테이너
    <div className="slide-editor">
      {/* 제목 입력 필드 */}
      <input
        type="text"
        className="slide-title"
        placeholder="제목을 추가하려면 클릭하십시오."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* 부제목 입력 필드 */}
      <input
        type="text"
        className="slide-subtitle"
        placeholder="부제목을 입력하십시오"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />
    </div>
  );
};

export default SlideEditor; // SlideEditor 컴포넌트를 외부에서 사용할 수 있도록 export
