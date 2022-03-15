import React, { useState } from 'react'
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

export default function LoginModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className='login-container'>
                <button className='login-nav nav-auth button' onClick={() => setShowModal(true)}>Log In</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    )
}
