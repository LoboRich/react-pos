import './App.css';
import { db } from "./firebase-config";
import Category from './components/categories/List';

function App() {
  
  return (
    <div className="App">
      <Category db={db} />
    </div>
  );
}

export default App;
