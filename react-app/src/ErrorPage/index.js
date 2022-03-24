import React from 'react';
import './ErrorPage.css';
import errorImage from '../assets/error-page.png';

export default function ErrorPage() {
    return (
        <div className='error-container'>

            <div className='header-container'>
                <div className='left-container'>
                    <div className='top'>
                        <h1>Uh-oh</h1>
                        <img alt='Logo' className='error-image' src={errorImage} />
                    </div>
                    <div className='bottom'>
                        <h2>404 Error</h2>
                        <h3>Page not found</h3>
                    </div>

                </div>
                <div className='right-container'></div>

            </div>
        </div>
    )
}
