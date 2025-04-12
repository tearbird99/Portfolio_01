import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavbar from './components/TopNavBar';
import SlideThumbnails from './components/SlideThumbnails';
import SlideEditor from './components/SlideEditor';
import InsertRibbon from './components/ribbonComponents/InsertRibbon';

// App 컴포넌트: 전체 웹 파워포인트 앱의 루트 컴포넌트
function App() {

  // 현재 활성화된 상단 메뉴 탭 (예: '파일', '홈' 등)
  const [activeTab, setActiveTab] = useState<string | null>(null);

  type Slide = {
    id: number;
    thumbnail: string; // html2canvas
  };

  const [slides, setSlides] = useState<Slide[]>([
    { id: 1, thumbnail: '' },
  ]);
  const [currentSlide, setCurrentSlide] = useState(1);

  const handleAddSlide = () => {
    const newId = slides.length + 1;
    const newSlide = { id: newId, thumbnail: '' };
    setSlides((prev) => [...prev, newSlide]);
    setCurrentSlide(newId);
    console.log('슬라이드 추가됨:', newSlide);
  };

  const handleCapture = (dataUrl: string) => {
    setSlides((prev) =>
      prev.map((slide) =>
        slide.id === currentSlide ? { ...slide, thumbnail: dataUrl } : slide
      )
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
        if (slides.length <= 1) return; // 최소 슬라이드 1장 존재
        const updated = slides.filter((s) => s.id !== currentSlide);
        setSlides(updated);

        // 삭제된 슬라이드가 마지막이면 이전으로, 아니면 첫 번째로
        const currentIndex = slides.findIndex((s) => s.id === currentSlide);
        const nextSlide = updated[currentIndex - 1] || updated[0];
        setCurrentSlide(nextSlide.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides, currentSlide]);

  return (
    // App 전체 영역. 빈 공간 클릭 시 activeTab을 null로 초기화
    <div className="App" onClick={() => setActiveTab(null)}>
      {/* 상단 네비게이션 바 컴포넌트 */}
      <TopNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === '삽입' && <InsertRibbon onAddSlide={handleAddSlide} />}

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
