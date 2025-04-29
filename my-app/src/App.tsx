import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavbar from './components/TopNavBar';
import SlideThumbnails from './components/SlideThumbnails';
import SlideEditor from './components/SlideEditor';
import InsertRibbon from './components/ribbonComponents/InsertRibbon';

// App 컴포넌트: 전체 웹 파워포인트 앱의 루트 컴포넌트
function App() {

  // 1. 현재 활성화된 리본 탭 (ex. '삽입', '디자인', '슬라이드쇼' 등)
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // 2. 슬라이드 타입 정의
  type Slide = {
    id: number;        // 슬라이드 고유 ID
    thumbnail: string; // 썸네일 (html2canvas로 생성된 이미지)
  };

  // 3. 텍스트 상자 타입 정의
  type TextBoxType = {
    id: number;         // 텍스트 상자 고유 ID
    x?: number;          // X 좌표 (px)
    y?: number;          // Y 좌표 (px)
    width?: number;      // 폭
    height?: number;     // 높이
    text: string;       // 텍스트 상자 안에 들어갈 문자열
  };

  // 3-1. 텍스트 상자 생성 여부 변수
  const [isInsertingTextBox, setIsInsertingTextBox] = useState(false);

  // 4. 전체 텍스트 상자 목록 (현재 슬라이드에 표시될 상자들)
  const [textBoxes, setTextBoxes] = useState<Record<number, TextBoxType[]>>({});

  // 4-1. 텍스트 상자 추가 함수 (삽입 → 텍스트 상자 클릭 시)
  const handleAddTextBox = () => {
    setIsInsertingTextBox(true); // 드래그를 허용하도록 설정
    const newBox: TextBoxType = {
      id: Date.now(),
      text: '',
    };
    setTextBoxes((prev) => ({
      ...prev,
      [currentSlide]: [...(prev[currentSlide] || []), newBox],
    }));
  };
  // 드래그로 텍스트 박스 생성
  const handleAddTextBoxByDrag = (newBox: TextBoxType) => {
    if (!isInsertingTextBox) return; // 플래그가 true일 때만 생성 허용
    setTextBoxes((prev) => ({
      ...prev,
      [currentSlide]: [...(prev[currentSlide] || []), newBox],
    }));
    setIsInsertingTextBox(false); // 한 번 사용 후 비활성화
  };

  // 4-2. 텍스트 내용 수정 함수 (contentEditable 수정 시 호출)
  const handleTextBoxChange = (id: number, newText: string) => {
    setTextBoxes((prev) => ({
      ...prev,
      [currentSlide]: prev[currentSlide]?.map((box) =>
        box.id === id ? { ...box, text: newText } : box
      ) || [],
    }));
  };

  // 5. 전체 슬라이드 목록 (기본 1장부터 시작)
  const [slides, setSlides] = useState<Slide[]>([
    { id: 1, thumbnail: '' },
  ]);

  // 6. 현재 선택된 슬라이드 번호
  const [currentSlide, setCurrentSlide] = useState(1);

  // 7. 슬라이드 추가 함수 (삽입 → 새 슬라이드 클릭 시)
  const handleAddSlide = () => {
    const newId = slides.length + 1;
    const newSlide = { id: newId, thumbnail: '' };
    setSlides((prev) => [...prev, newSlide]);
    setCurrentSlide(newId); // 새로 추가한 슬라이드로 이동
    console.log('슬라이드 추가됨:', newSlide);
  };

  // 8. 슬라이드 썸네일 이미지 캡처 저장 함수
  const handleCapture = (dataUrl: string) => {
    setSlides((prev) =>
      prev.map((slide) =>
        slide.id === currentSlide ? { ...slide, thumbnail: dataUrl } : slide
      )
    );
  };

  // 9. 키보드 이벤트 처리 (Backspace, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement as HTMLElement;
      const isInThumbnail = active?.closest('.slide-thumbnails');
      if (!isInThumbnail) return; // 썸네일을 클릭한 경우만 반응

      if (e.key === 'Backspace') {
        e.preventDefault();
        if (slides.length <= 1) return; // 슬라이드는 최소 1장은 있어야 함

        const currentIndex = slides.findIndex((s) => s.id === currentSlide);
        const updated = slides.filter((s) => s.id !== currentSlide);

        // 슬라이드 ID를 다시 1부터 재정렬
        const reindexed = updated.map((s, i) => ({ ...s, id: i + 1 }));
        setSlides(reindexed);

        // 삭제된 슬라이드가 마지막이라면 이전 슬라이드로 이동
        const nextIndex = Math.max(0, currentIndex - 1);
        setCurrentSlide(reindexed[nextIndex].id);
      }

      if (e.key === 'Enter') {
        e.preventDefault();

        const currentIndex = slides.findIndex((s) => s.id === currentSlide);
        const newSlide = { id: 0, thumbnail: '' };

        // 현재 슬라이드 다음 위치에 새 슬라이드 삽입
        const updated = [
          ...slides.slice(0, currentIndex + 1),
          newSlide,
          ...slides.slice(currentIndex + 1),
        ];

        // 슬라이드 ID 다시 1부터 재정렬
        const reindexed = updated.map((s, i) => ({ ...s, id: i + 1 }));
        setSlides(reindexed);
        setCurrentSlide(currentIndex + 2); // 새 슬라이드로 이동
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides, currentSlide]);

  // 10. 실제 화면 구성
  return (
    // App 전체 영역 (빈 공간 클릭하면 activeTab 초기화)
    <div className="App" onClick={() => setActiveTab(null)}>

      {/* 상단 네비게이션 바 */}
      <TopNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 리본바 삽입 메뉴 (activeTab === '삽입' 일 때만) */}
      {activeTab === '삽입' && (
        <InsertRibbon
          onAddSlide={handleAddSlide}
          onAddTextBox={() => setIsInsertingTextBox(true)}
        />
      )}

      {/* 메인 에디터 영역 */}
      <div className="editor-container">
        {/* 왼쪽 썸네일 바 */}
        <SlideThumbnails
          slides={slides}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />

        {/* 오른쪽 슬라이드 에디터 */}
        <SlideEditor
          onCapture={handleCapture}
          textBoxes={textBoxes[currentSlide] ?? []}  // 현재 슬라이드에 해당하는 것만 반영
          onTextBoxChange={handleTextBoxChange}
          onAddTextBox={handleAddTextBoxByDrag}  // 드래그용 핸들러 넘김
        />
      </div>

    </div>
  );
}

export default App;