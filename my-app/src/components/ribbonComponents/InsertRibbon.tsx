
import 'bootstrap/dist/css/bootstrap.min.css';
import './Ribbon.css';

interface InsertRibbonProps {
  onAddSlide: () => void;
}

function InsertRibbon({ onAddSlide }: InsertRibbonProps) {
  return (
    <div className="ribbon-container px-3 py-2 border-bottom bg-white">
      <div className="d-flex flex-wrap align-items-center gap-3">
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={onAddSlide}
        >
          새 슬라이드
        </button>
        {/* ...다른 버튼들 */}
      </div>
    </div>
  );
}

export default InsertRibbon;