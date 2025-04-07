import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';

function App() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const menuItems = [
    '파일', '홈', '삽입', '그리기', '디자인', '전환',
    '애니메이션', '슬라이드 쇼', '검토', '보기', '도움말'
  ];

  const handleNavClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="App" onClick={() => setActiveTab(null)}>
        <Navbar fixed="top" onClick={handleNavClick}>
          <Container>
            <Nav className="me-auto">
              {menuItems.map((item) => (
                <Nav.Link
                  key={item}
                  active={activeTab === item}
                  onClick={(e) => {
                    e.stopPropagation();  // 메뉴 클릭 시 전파 방지
                    setActiveTab(item);
                  }}
                >
                  {item}
                </Nav.Link>
              ))}
            </Nav>
          </Container>
        </Navbar>

        <Container>
          {activeTab && (
            <p>이 곳은 \"{activeTab}\" 탭의 콘텐츠.</p>
          )}
        </Container>
      </div>
    </>
  );
}

export default App;
