import React, { Component } from 'react';
import {Link} from 'react-router-dom'

const Homepage = () => {
    return (
        <section className='homepage'>
            {/* //maybe link to my own personal github? */}
            {/* this is where I want to put my image */}
            <div id ='homepage-content'>
                <h1>Curate Your Own Collection</h1>
                <h3>Data and images sourced from the Art Institute of Chicago API. </h3>
            </div>
        </section>
    )
}
export default Homepage