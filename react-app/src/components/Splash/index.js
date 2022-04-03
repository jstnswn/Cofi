import React from 'react';
import './Splash.css';
import image from '../../assets/headphones.png'

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
                <div className='developer-box'>Developed by Justin Sweeney</div>
            </div>

        <div className='bottom'>
                <h2>Lofi Music. Together.</h2>
                <h3>As background music, for studying, or inspiration. Listen, share, and enjoy lofi music.</h3>
        </div>
        </div>
    )
}
