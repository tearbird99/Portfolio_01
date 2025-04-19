import { Navbar, Container, Nav } from 'react-bootstrap';

// props 타입 정의: 현재 선택된 탭과 탭을 설정하는 함수
interface TopNavbarProps {
  activeTab: string | null;
  setActiveTab: (tab: string) => void;
}

// 상단 메뉴 항목 배열
const menuItems = [
  '파일', '홈', '삽입', '그리기', '디자인', '전환',
  '애니메이션', '슬라이드 쇼', '검토', '보기', '도움말'
];

// TopNavbar 컴포넌트: 상단 메뉴바 렌더링
function TopNavbar({ activeTab, setActiveTab }: TopNavbarProps) {
  return (
    // 상단 고정 네비게이션 바
    <Navbar fixed="top" onClick={(e) => e.stopPropagation()}>
      {/* fluid 설정으로 좌우 여백 제거 */}
      <Container fluid>
        <Nav className="me-auto">
          {/* 각 메뉴 항목을 Nav.Link로 렌더링 */}
          {menuItems.map((item) => (
            <Nav.Link
              key={item}
              active={activeTab === item} // 현재 탭이면 강조
              style={
                activeTab === item
                  ? {
                      fontWeight: 900,
                      color: '#000',
                    }
                  : undefined
              }
              onClick={(e) => {
                e.stopPropagation(); // 바깥 onClick 전파 방지
                setActiveTab(item);  // 탭 설정
              }}
            >
              {item}
            </Nav.Link>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;