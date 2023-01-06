import React from 'react';
import { Link } from 'react-router-dom';


function Socials() {
    return (
        <section>
            <span className='me-1 bg-white p-1 rounded'>
                <Link to='#'><i className="fa-brands fa-square-facebook fs-5 text-primary align-middle"></i></Link>
            </span>

            <span className='me-1 bg-white p-1 rounded'>
                <Link to='#'><i className="fa-brands fa-instagram fs-5 text-primary align-middle"></i></Link>
            </span>

            <span className='me-1 bg-white p-1 rounded'>
                <Link to='#'><i className="fa-brands fa-square-twitter fs-5 text-primary align-middle"></i></Link>
            </span>

            <span className='me-1 bg-white p-1 rounded'>
                <Link to='#'><i className="fa-brands fa-linkedin fs-5 text-primary align-middle"></i></Link>
            </span>

            <span className='me-1 bg-white p-1 rounded'>
                <Link to='#'><i className="fa-brands fa-square-youtube fs-5 text-primary align-middle"></i></Link>
            </span>
        </section>
    );
}

export default Socials;