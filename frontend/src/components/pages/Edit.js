import React from 'react'
import {useLocation, Navigate} from "react-router-dom";
import './Edit.css'
import Post from './Post'
import { motion } from "framer-motion"

function Edit() {
    let postid = new URLSearchParams(useLocation().search).get('postid');

    if(window.loggedIn === true) {
        let edit_attr = {action: window.api+'edit', method: 'POST'};
        let post = {};
        for(let i = 0; i < window.data.length; i++) {
            if(window.data[i]["_id"] === postid) {
                post = window.data[i];
                break;
            }
        }

        if(post.length === 0) {
            post = {
                'error': 'something went terribly wrong'
            }
        }

        function getValue(data) {
            return {placeholder: data};
        }

        function insertData(data) {
            return React.createElement(Post, {
                title: data.title,
                subtitle: data.subtitle,
                date: data.date,
                content: data.content,
                postid: data._id
            }, null);
        }

        if(postid === 'create') {
            return (
                <>  <motion.div exit={{ opacity: 0 }}>
                    <div class="edit-post">
                    <h2>Create a new Post</h2>
                        <form {...edit_attr}>
                            <label>Title</label><br></br><input name="title" id="title" type="text"></input><br></br>
                            <label>Subtitle</label><br></br><input name="subtitle" id="subtitle" type="text"></input><br></br>
                            <label>Date</label><br></br><input name="date" id="date" type="date" disabled></input><br></br>
                            <label>Content</label><br></br><textarea cols="40" rows="10" name="contents" id="contents"/><br></br><br></br>
                            
                            {React.createElement('input', {name: "type", type: "hidden", value: "create"}, null)}
                            {React.createElement('input', {name: "postid", type: "hidden", value: postid}, null)}
                            
                            <input value="Save Changes" type="submit"></input><br></br>
                        </form>
                    </div>
                    </motion.div></>
            );
        }
        else {
            let delete_attr = {action: window.api+'delete', method: 'POST'};

            return (
                <><motion.div exit={{ opacity: 0 }}>
                    {insertData(post)}
                    <div class="edit-post">
                    <h2>Edit a Post</h2>
                            <form {...edit_attr}>
                                <label>Title</label><br/><input name="title" id="title" type="text" {...getValue(post.title)}/><br/>
                                <label>Subtitle</label><br></br><input name="subtitle" id="subtitle" type="text" {...getValue(post.subtitle)}/><br/>
                                <label>Date</label><br></br><input name="date" id="date" type="date" {...getValue(post.date)} disabled/><br/>
                                <label>Content</label><br></br><textarea cols="40" rows="10" name="contents" id="contents" {...getValue(post.content)}/><br/><br/>
                                
                                {React.createElement('input', {name: "type", type: "hidden", value: "edit"}, null)}
                                {React.createElement('input', {name: "postid", type: "hidden", value: postid}, null)}
                                
                                <input value="Save Changes" type="submit"></input><br></br>
                            </form>
                            <br/>
                            <form {...delete_attr}>
                                {React.createElement('input', {name: "postid", type: "hidden", value: postid}, null)}
                                <input type="submit" value="Delete Post"/><br/>
                            </form>
                    </div></motion.div>
                </>
            );
        }
    }
    else {
        alert("You are not logged in!");
        return <Navigate to="/"/>;
    }
}

export default Edit;