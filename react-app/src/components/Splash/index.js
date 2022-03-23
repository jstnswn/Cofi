import React from 'react';
import './Splash.css';
import image from '../../assets/headphones.png'


export default function Splash() {
    return (
        <div className='splash-container'>

            <div className='header-container'>
                <div className='left-container'>
                    <div className='top'>
                        <h1>Cofi.</h1>
                        <img alt='Logo' className='splash-logo' src={image} />
                    </div>
                    <div className='bottom'>
                        <h2>Music. Together.</h2>
                        <h3>For studying, as background music, or for inspriatio. Listen, share, and enjoy lofi music.</h3>
                    </div>

                </div>
                <div className='right-container'></div>

            </div>
        </div>
    )
}
