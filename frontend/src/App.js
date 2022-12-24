import {
  BrowserRouter as Router, 
  Routes,
  Route,
} from 'react-router-dom'

import Home from './components/pages/Home'
import Projects from './components/pages/Projects'
import Layout from './components/layout/Layout'
import NotFound from './components/errors/NotFound'
import Edit from './components/pages/Edit'
import { useState , useEffect } from 'react';

import './App.css';

const useFetch = url => {
  const [data, setData] = useState(null);

  async function fetchData() {
      const response = await fetch(url);
      setData(await response.json());
  }

  useEffect(() => {fetchData()},[]);

  return data;
}

function App() {
  window.api = "http://localhost:3001/";
  window.data = useFetch(window.api+'posts/');
  window.loggedIn = true;

  return (
    <div>
    <Router>
      <Routes>
        <Route path ="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="projects" element={<Projects />}></Route>
          <Route path="edit" element={<Edit />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </Router>  
  </div>
  );
}

export default App;
