import React from 'react';
import './Splash.css';
import image from '../../assets/headphones.png';
import gif from '../../assets/wave-t.gif';

export default function Splash() {
    return (
        <div className='splash-container'>
            <div className='top'></div>

            <div className='header-container'>
                {/* <div className='left-container'> */}
                    <div className='header-top'>
                        <h1>Cofi</h1>
                        <img alt='Logo' className='splash-logo' src={image} />
                    </div>
                    {/* <div className='header-bottom'>
                        <h2>Lofi Music. Together.</h2>
                    </div> */}

                {/* </div> */}
                {/* <div className='right-container'></div> */}
                <img alt='Logo' className='splash-logo wave' src={gif}/>
                <div className='developer-box'>Developed by <a href='https://justin-sweeney.com/' target='_blank' rel='noopener noreferrer'>Justin Sweeney</a></div>
            </div>

        <div className='bottom'>
                <h2>Lofi Music. Together.</h2>
                <h3>As background music, for studying, or inspiration. Listen, share, and enjoy lofi music.</h3>
        </div>

        <section id='splash-footer'>
            <ul>
                <li>React | Redux</li>
                <li className='dot-spacer'>.</li>
                <li>Javascript</li>
                <li className='dot-spacer'>.</li>
                <li>Python</li>
                <li className='dot-spacer'>.</li>
                <li>Flask</li>
                <li className='dot-spacer'>.</li>
                <li>SQLAlchemy</li>
                <li className='dot-spacer'>.</li>
                <li>AWS S3</li>
            </ul>
        </section>
        </div>
    )
}
