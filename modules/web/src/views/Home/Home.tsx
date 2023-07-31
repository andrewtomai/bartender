import React from 'react';

import CallToAction from '../../components/CallToAction/CallToAction';
import { Space, Modal } from 'antd';
import CreateEventForm from '../../components/CreateEventForm';
import useHomeStore from './store';

const Home: React.FC = () => {
    const isModalOpen = useHomeStore((store) => store.isModalOpen);
    const isFormLoading = useHomeStore((store) => store.isFormLoading);
    const openModal = useHomeStore((store) => store.openModal);
    const closeModal = useHomeStore((store) => store.closeModal);
    const createEvent = useHomeStore((store) => store.createEvent);
    return (
        <>
            <Space style={{ display: 'grid', alignItems: 'center', height: '95vh' }} data-testid="cta-component">
                <CallToAction onCallToActionClick={openModal} />
            </Space>
            <Modal
                title="Create an Event"
                open={isModalOpen}
                onCancel={closeModal}
                centered={true}
                footer={false}
                data-testid="create-event-modal"
            >
                <CreateEventForm onFinish={createEvent} isLoading={isFormLoading} />
            </Modal>
        </>
    );
};

export default Home;
