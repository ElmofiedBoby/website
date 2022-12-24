import React from 'react';
import { Outlet, Link } from "react-router-dom";
import './Layout.css';
import './Button.css';

export const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};

const Layout = () => {
    return(
      <>
        <header>
          <nav>
          <Link to="/"><button class="button-56"><strong>Home</strong></button></Link>
          <Link to="/projects"><button class="button-56"><strong>Projects</strong></button></Link>
          <Link to="/edit?postid=create"><button class="button-56"><strong>Create Post</strong></button></Link>
          <Link href="#" onClick = {() => openInNewTab('https://github.com/elmofiedboby')}><button class="button-56"><strong>GitHub</strong></button></Link>
          <Link href="#" onClick = {() => openInNewTab('https://www.linkedin.com/in/nithin-joseph-591b40219/')}><button class="button-56"><strong>LinkedIn</strong></button></Link>
          </nav>
        </header>
        <div id="content">
          <Outlet />
        </div>
        <footer>
          
        </footer>
      </>
    );
}

export default Layout;