import React from 'react';

import Post from './Post';
import './Projects.css';

function Projects() {

    function insertData(data) {
        return React.createElement(Post, {
            title: data.title,
            subtitle: data.subtitle,
            date: data.date,
            content: data.content,
            postid: data._id
        }, null);
    }

    if(!window.data) {
        return (
            <>
                {React.createElement('div', {id: 'projects'}, React.createElement('h1', {id: 'projects-header'}, 'Projects'))}
            </>
        )
    }
    else {
        return (
            <>
            <div>
                {React.createElement('div', {id: 'projects'}, React.createElement('h1', {id: 'projects-header'}, 'Projects'))}
                {window.data.map(insertData)}
            </div>
            </>
        );
    }
}

export default Projects;