import React from 'react';

import CallToAction from '../../components/CallToAction/CallToAction';
import { Space, Modal } from 'antd';
import CreateEventForm from '../../components/CreateEventForm';
import useHomeStore from './store';

const Home: React.FC = () => {
    const isModalOpen = useHomeStore((store) => store.isModalOpen);
    const openModal = useHomeStore((store) => store.openModal);
    const closeModal = useHomeStore((store) => store.closeModal);
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
                <CreateEventForm onFinish={closeModal} isLoading={false} />
            </Modal>
        </>
    );
};

export default Home;
