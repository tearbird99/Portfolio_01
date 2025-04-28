import './SlideThumbnails.css'; // 썸네일 영역 스타일 import

// SlideThumbnails 컴포넌트 Props 타입 정의
interface SlideThumbnailsProps {
  slides: { id: number; thumbnail: string }[]; // 슬라이드 리스트 (id, 썸네일 이미지)
  currentSlide: number;                        // 현재 활성화된 슬라이드 id
  setCurrentSlide: (id: number) => void;        // 슬라이드 선택 시 호출하는 함수
}

// SlideThumbnails 컴포넌트
function SlideThumbnails({ slides, currentSlide, setCurrentSlide }: SlideThumbnailsProps) {
  return (
    // 썸네일 전체 영역
    <div className="slide-thumbnails" tabIndex={0}> {/* tabIndex=0: 키보드 포커스 가능하게 함 */}
      {/* slides 배열을 순회하며 썸네일 하나씩 렌더링 */}
      {slides.map((slide) => (
        <div
          key={slide.id} // React key: 슬라이드 고유 id 사용
          className={`slide-thumbnail ${currentSlide === slide.id ? 'active' : ''}`} // 현재 선택된 슬라이드면 'active' 클래스 추가
          onClick={() => setCurrentSlide(slide.id)} // 클릭 시 해당 슬라이드 선택
        >
          {/* 썸네일 왼쪽 위에 표시할 슬라이드 번호 */}
          <div className="thumbnail-number">{slide.id}</div>

          {/* 썸네일 이미지가 있으면 이미지 표시, 없으면 플레이스홀더 표시 */}
          {slide.thumbnail ? (
            <img
              src={slide.thumbnail}
              alt={`Slide ${slide.id}`} 
              className="thumbnail-image" // 썸네일 이미지 스타일
            />
          ) : (
            <div className="thumbnail-placeholder">슬라이드 {slide.id}</div> // 썸네일 없을 때 기본 문구
          )}
        </div>
      ))}
    </div>
  );
}

export default SlideThumbnails;