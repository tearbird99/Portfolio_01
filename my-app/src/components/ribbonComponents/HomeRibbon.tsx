import './Ribbon.css';
import undoIcon from '../../assets/icons/Undo.png';

interface HomeRibbonProps {
    onUndo: () => void;
}

function HomeRibbon({ onUndo }: HomeRibbonProps) {
    const ribbonItems = [
      { icon: undoIcon, label: '실행 취소', onClick: onUndo }
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
  
  export default HomeRibbon;