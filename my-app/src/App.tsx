import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavbar from './components/TopNavBar';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  return (
    <div className="App" onClick={() => setActiveTab(null)}>
      <TopNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="content">
        {activeTab && (
          <>
            <p>이 곳은 "{activeTab}" 탭의 콘텐츠를 보여주는 영역입니다.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
