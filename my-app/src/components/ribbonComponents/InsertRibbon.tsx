import './Ribbon.css';

interface InsertRibbonProps {
  onAddSlide: () => void;
  onAddTextBox: () => void;
}

function InsertRibbon({ onAddSlide, onAddTextBox }: InsertRibbonProps) {
  return (
    <div className="ribbon-container px-3 py-2 border-bottom bg-white">
      <div className="d-flex flex-wrap align-items-center gap-3">
        <div onClick={onAddSlide}>새 슬라이드</div>
        <div onClick={onAddTextBox}>텍스트 상자</div>
      </div>
    </div>
  );
}

export default InsertRibbon;