import React, { useState } from 'react'
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';

export default function SignupModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div>
                <button className='login-nav nav-auth button' onClick={() => setShowModal(true)}>Signup</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignUpForm />
                </Modal>
            )}
        </>
    )
}
