import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import SlideEditor from './components/SlideEditor';

function App() {
  return (
    <div className="container-fluid">
      
      <div className="row mt-2">
        <div className="col-2">
          
        </div>
        <div className="col-10">
          <SlideEditor />
        </div>
      </div>
    </div>
  );
}

export default App;
