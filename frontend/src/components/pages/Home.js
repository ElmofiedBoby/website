import React from 'react';
import './Home.css';
import { motion } from "framer-motion"

const Home = () => {
    return (
        <><motion.div exit={{ opacity: 0 }}>
        <div id="homepage">
            <h1 id="name">Nithin Joseph</h1>
            <div id="list">
                <ul id="homelist">
                    <li>University of Maryland, College Park</li>
                    <li>Computer Science</li>
                    <li>Graduating May 2024</li>
                </ul>
            </div>
        </div>
        </motion.div></>
    );
}

export default Home;