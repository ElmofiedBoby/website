import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '.env') });
async function fetchData(url) {
  await fetch(url).then(response => {
    return response.json();
  }).then(json => {
    window.localStorage.setItem("data", JSON.stringify(json));
  }).catch(function() {
    console.log("fetch error");
  });
}

window.localStorage.setItem("loggedIn", false);
window.localStorage.setItem("api", "http://localhost:"+process.env.BACKEND_PORT+"/");
fetchData(window.localStorage.getItem("api")+'posts');


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);