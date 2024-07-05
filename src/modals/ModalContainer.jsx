import React, { useState } from 'react';
import { PostulateModal } from '../modals/PostulateModal';

export const ModalContainer = ({ trial }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePostulateClick = () => {
        console.log('Postulate button clicked');
        setIsModalOpen(true);
    };

    const handlePostulateConfirm = () => {
        console.log('Postulate confirmed');
        setIsModalOpen(false);
    };

    const handlePostulateCancel = () => {
        console.log('Postulate cancelled');
        setIsModalOpen(false);
    };

    return (
        <>
            {trial.estado === "reclutando" && (
                <button className="register-button" onClick={handlePostulateClick}>Postulate</button>
            )}
            <PostulateModal
                isOpen={isModalOpen}
                onClose={handlePostulateCancel}
                onConfirm={handlePostulateConfirm}
            />
        </>
    );
};
