import { useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import './SlideEditor.css';

interface SlideEditorProps {
    onCapture: (dataUrl: string) => void;
}

function SlideEditor({ onCapture }: SlideEditorProps) {
    const slideRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!slideRef.current) return;

        const observer = new MutationObserver(() => {
            html2canvas(slideRef.current!).then((canvas) => {
                const dataUrl = canvas.toDataURL();
                onCapture(dataUrl);
            });
        });

        observer.observe(slideRef.current, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true,
        });

        // 최초 캡처
        html2canvas(slideRef.current!).then((canvas) => {
            onCapture(canvas.toDataURL());
        });

        return () => observer.disconnect();
    }, [onCapture]);

    return (
        <div className="slide-editor">
            <div className="slide-box" ref={slideRef}>
                {/* 여기에 나중에 텍스트 박스나 요소가 들어감 */}
            </div>
        </div>
    );
}

export default SlideEditor;
