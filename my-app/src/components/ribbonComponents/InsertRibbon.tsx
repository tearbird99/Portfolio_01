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
        <div>표</div>
        <div>카메오</div>
        <div>비디오</div>
        <div>오디오</div>
        <div>도형</div>
      </div>
    </div>
  );
}

export default InsertRibbon;