import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavbar from './components/TopNavBar';
import SlideThumbnails from './components/SlideThumbnails';
import SlideEditor from './components/SlideEditor';

// App 컴포넌트: 전체 웹 파워포인트 앱의 루트 컴포넌트
function App() {
  // 현재 활성화된 상단 메뉴 탭 (예: '파일', '홈' 등)
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const [slides, setSlides] = useState([
    { id: 1, thumbnail: '' },
    { id: 2, thumbnail: '' },
    { id: 3, thumbnail: '' },
  ]);
  const [currentSlide, setCurrentSlide] = useState(1);

  const handleCapture = (dataUrl: string) => {
    setSlides((prev) =>
      prev.map((slide) =>
        slide.id === currentSlide ? { ...slide, thumbnail: dataUrl } : slide
      )
    );
  };

  return (
    // App 전체 영역. 빈 공간 클릭 시 activeTab을 null로 초기화
    <div className="App" onClick={() => setActiveTab(null)}>
      {/* 상단 네비게이션 바 컴포넌트 */}
      <TopNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 메인 콘텐츠 영역 (탭이 클릭되었을 때만 렌더링됨) */}
      <div className="content">
        {activeTab && (
          <>
            <p>이 곳은 "{activeTab}" 탭의 콘텐츠를 보여주는 영역입니다.</p>
          </>
        )}
      </div>

      <div className="editor-container">
        <SlideThumbnails
          slides={slides}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />

        <SlideEditor onCapture={handleCapture} />
      </div>
    </div>
  );
}

export default App;
