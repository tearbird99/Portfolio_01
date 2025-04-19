import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavbar from './components/TopNavBar';
import SlideThumbnails from './components/SlideThumbnails';
import SlideEditor from './components/SlideEditor';
import InsertRibbon from './components/ribbonComponents/InsertRibbon';

// App 컴포넌트: 전체 웹 파워포인트 앱의 루트 컴포넌트
function App() {

  // 현재 활성화된 상단 메뉴 탭
  const [activeTab, setActiveTab] = useState<string | null>(null);

  type Slide = {
    id: number;
    thumbnail: string; // html2canvas
  };

  // 기본 슬라이드 썸네일 1
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
      const active = document.activeElement as HTMLElement;
      const isInThumbnail = active?.closest('.slide-thumbnails');
      if (!isInThumbnail) return;
  
      if (e.key === 'Backspace') {
        e.preventDefault();
        if (slides.length <= 1) return;
  
        const currentIndex = slides.findIndex((s) => s.id === currentSlide);
        const updated = slides.filter((s) => s.id !== currentSlide);
        const reindexed = updated.map((s, i) => ({ ...s, id: i + 1 }));
        setSlides(reindexed);
  
        const nextIndex = Math.max(0, currentIndex - 1);
        setCurrentSlide(reindexed[nextIndex].id);
      }
  
      if (e.key === 'Enter') {
        e.preventDefault();
  
        const currentIndex = slides.findIndex((s) => s.id === currentSlide);
        const newSlide = { id: 0, thumbnail: '' };
  
        const updated = [
          ...slides.slice(0, currentIndex + 1),
          newSlide,
          ...slides.slice(currentIndex + 1),
        ];
  
        const reindexed = updated.map((s, i) => ({ ...s, id: i + 1 }));
        setSlides(reindexed);
        setCurrentSlide(currentIndex + 2); // 새 슬라이드로 focus 이동
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
