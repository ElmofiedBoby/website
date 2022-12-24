import React from 'react'
import './Post.css'
import { Link } from "react-router-dom";
import { motion } from "framer-motion"

function Post(props) {
    return (
        <><motion.div exit={{ opacity: 0 }}>
            <div class="post">
                <h1 id="title">{props.title}</h1>
                <h2 id="subtitle">{props.subtitle}</h2>
                <h3 id="date">{props.date}</h3>
                <p id="content">{props.content}</p>
                <footer>
                    {React.createElement(Link, {to: "/edit?postid="+props.postid}, 'Edit')}
                </footer>
            </div></motion.div>
        </>
    );
}

export default Post;