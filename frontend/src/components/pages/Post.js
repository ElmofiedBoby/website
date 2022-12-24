import React from 'react'
import './Post.css'
import { Link } from "react-router-dom";

function Post(props) {
    return (
        <>
            <div class="post">
                <h1>{props.title}</h1>
                <h2>{props.subtitle}</h2>
                <h3>{props.date}</h3>
                <p>{props.content}</p>
                <footer>
                    {React.createElement(Link, {to: "/edit?postid="+props.postid}, 'Edit')}
                </footer>
            </div>
        </>
    );
}

export default Post;