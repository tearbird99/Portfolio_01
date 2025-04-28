import { Navbar, Container, Nav } from 'react-bootstrap'; // Bootstrap 컴포넌트 import

// TopNavbar 컴포넌트 Props 타입
interface TopNavbarProps {
  activeTab: string | null;            // 현재 선택된 탭 이름
  setActiveTab: (tab: string) => void;  // 탭 변경 함수
}

// 상단 메뉴에 표시할 항목 리스트
const menuItems = [
  '파일', '홈', '삽입', '그리기', '디자인', '전환',
  '애니메이션', '슬라이드 쇼', '검토', '보기', '도움말'
];

// TopNavbar 컴포넌트 정의
function TopNavbar({ activeTab, setActiveTab }: TopNavbarProps) {
  return (
    // Bootstrap Navbar 컴포넌트
    <Navbar
      fixed="top"               // 화면 최상단에 고정
      onClick={(e) => e.stopPropagation()} // Navbar 클릭 시 상위 클릭 이벤트 막기
    >
      <Container fluid>         {/* 양옆에 여백 없이 꽉 채움 */}
        <Nav className="me-auto"> {/* 메뉴 항목은 왼쪽 정렬 */}
          {/* menuItems 배열을 돌면서 Nav.Link 생성 */}
          {menuItems.map((item) => (
            <Nav.Link
              key={item}          // React key 설정 (항목 이름 사용)
              active={activeTab === item} // 현재 선택된 탭이면 Bootstrap 스타일 적용
              style={              // 현재 선택된 탭일 때 글씨를 굵게 강조
                activeTab === item
                  ? {
                      fontWeight: 900, // 글씨 굵게 (900: 아주 bold)
                      color: '#000',   // 글씨 색은 검정
                    }
                  : undefined
              }
              onClick={(e) => {
                e.stopPropagation(); // 클릭 이벤트 버블링 방지
                setActiveTab(item);   // 탭 클릭 시 해당 항목을 activeTab으로 설정
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
