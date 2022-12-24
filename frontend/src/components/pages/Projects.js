import React from 'react';

import Post from './Post';
import './Projects.css';
import { motion } from "framer-motion"

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
            <><motion.div exit={{ opacity: 0 }}>
                {React.createElement('div', {id: 'projects'}, React.createElement('h1', {id: 'projects-header'}, 'Projects'))}
                </motion.div></>
        )
    }
    else {
        return (
            <><motion.div exit={{ opacity: 0 }}>
            <div>
                {React.createElement('div', {id: 'projects'}, React.createElement('h1', {id: 'projects-header'}, 'Projects'))}
                {window.data.map(insertData)}
            </div></motion.div>
            </>
        );
    }
}

export default Projects;