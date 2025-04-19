import './SlideThumbnails.css';

interface SlideThumbnailsProps {
  slides: { id: number; thumbnail: string }[];
  currentSlide: number;
  setCurrentSlide: (id: number) => void;
}

function SlideThumbnails({ slides, currentSlide, setCurrentSlide }: SlideThumbnailsProps) {
  return (
    <div className="slide-thumbnails" tabIndex={0}>
      {slides.map((slide) => (
        <div
          key={slide.id}
          className={`slide-thumbnail ${currentSlide === slide.id ? 'active' : ''}`}
          onClick={() => setCurrentSlide(slide.id)}
        >
          <div className="thumbnail-number">{slide.id}</div>
          {slide.thumbnail ? (
            <img src={slide.thumbnail} alt={`Slide ${slide.id}`} className="thumbnail-image" />
          ) : (
            <div className="thumbnail-placeholder">슬라이드 {slide.id}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default SlideThumbnails;