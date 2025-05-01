import './Ribbon.css';
import newSlideIcon from '../../assets/icons/NewSlide.png';
import textBoxIcon from '../../assets/icons/TextBox.png';
import tableIcon from '../../assets/icons/Table.png';
import pictureIcon from '../../assets/icons/Picture.png';
import videoIcon from '../../assets/icons/Video.png';
import shapeIcon from '../../assets/icons/Shape.png';
import audioIcon from '../../assets/icons/Audio.png';

interface InsertRibbonProps {
  onAddSlide: () => void;
  onAddTextBox: () => void;
}

function InsertRibbon({ onAddSlide, onAddTextBox }: InsertRibbonProps) {
  const ribbonItems = [
    { icon: newSlideIcon, label: '새 슬라이드', onClick: onAddSlide },
    { icon: textBoxIcon, label: '텍스트 상자', onClick: onAddTextBox },
    { icon: tableIcon, label: '표' },
    { icon: pictureIcon, label: '그림' },
    { icon: videoIcon, label: '비디오' },
    { icon: audioIcon, label: '오디오' },
    { icon: shapeIcon, label: '도형' },
  ];

  return (
    <div className="ribbon-container px-3 py-2 border-bottom bg-white">
      <div className="d-flex flex-wrap align-items-center gap-3">
        {ribbonItems.map(({ icon, label, onClick }) => (
          <div className="ribbon-button" key={label} onClick={onClick}>
            <img src={icon} alt={label} width={18} height={18} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InsertRibbon;