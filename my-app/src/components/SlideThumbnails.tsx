import './SlideThumbnails.css';

interface SlideThumbnailsProps {
    slides: number[];
    currentSlide: number;
    setCurrentSlide: (num: number) => void;
}

// 왼쪽 슬라이드 썸네일 component
function SlideThumbnails({ slides, currentSlide, setCurrentSlide }: SlideThumbnailsProps) {
    return (
      <div className="slide-thumbnails">
        {slides.map((num) => (
          <div
            key={num}
            className={`slide-thumbnail ${currentSlide === num ? 'active' : ''}`}
            onClick={() => setCurrentSlide(num)}
          >
            {num}
          </div>
        ))}
      </div>
    );
  }
  
  export default SlideThumbnails;