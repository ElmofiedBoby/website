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
import { AnimatePresence } from "framer-motion";

import './App.css';

function App() {

  return (
    <AnimatePresence exitBeforeEnter>
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
    </AnimatePresence>
  );
}

export default App;
