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

    function dataToTd(data) {
        return [React.createElement('td', null, data[0]), React.createElement('td', null, data[1])];
    }

    function generateTable(data) {
        let arr = [];
        let rows = [];
        for(let i = 0; i < data.length; i++) {
            if(i-1 % 2 === 0) {
                arr.push(data[i]);
                rows.push(React.createElement('tr', null, dataToTd(arr)));
            }
            else {
                arr = [];
                arr.push(data[i]);
                if(i === data.length-1) {
                    rows.push(React.createElement('tr', null, React.createElement('td', null, data[i])));
                }
            }
        }
        return React.createElement('table', null, rows);
    }
    /*
    <table>
                    {postdata.map(function (val) {
                        console.log(val);
                        console.log(this.acc);
                        console.log(this.array);
                        if(this.acc-1 % 2 === 0) {
                            this.array.push(val)
                            return <><tr><td>{this.array[0]}</td><td>{this.array[1]}</td></tr></>
                        }
                        else {
                            //this.array = [];
                            this.array.push(val)
                            if(this.acc === postdata.length) {
                                return <><tr><td>{this.array[0]}</td></tr></>
                            }
                        }
                        this.acc += 1;
                    }, {acc:0, array: []})}
                </table>
    */

    if(!window.localStorage.getItem("data")) {
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
                {generateTable(JSON.parse(window.localStorage.getItem("data")).map(insertData))}
            </div></motion.div>
            </>
        );
    }
}

export default Projects;