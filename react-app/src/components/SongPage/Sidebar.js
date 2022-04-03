import React from 'react';
import { useHistory } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
    const history = useHistory();
    // console.log('history: ', history);

    return (
        <div className='sidebar bottom-sidebar'>
            <section className='nav-button-container'>
                {/* <div>
                    <i className='far fa-angle-left' onClick={() => history.goBack()}></i>
                </div>
                <div>
                    <i className='far fa-angle-right' onClick={() => history.goForward()}></i>
                </div> */}
            </section>

        </div>
    )
}
