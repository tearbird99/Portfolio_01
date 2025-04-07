import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

interface TopNavbarProps {
  activeTab: string | null;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  '파일', '홈', '삽입', '그리기', '디자인', '전환',
  '애니메이션', '슬라이드 쇼', '검토', '보기', '도움말'
];

const TopNavbar: React.FC<TopNavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <Navbar bg="light" fixed="top" onClick={(e) => e.stopPropagation()}>
      <Container fluid>
        <Nav className="me-auto">
          {menuItems.map((item) => (
            <Nav.Link
              key={item}
              active={activeTab === item}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab(item);
              }}
            >
              {item}
            </Nav.Link>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
