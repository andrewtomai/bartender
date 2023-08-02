import { Space, Modal } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import CallToAction from '../../components/CallToAction/CallToAction';
import CreateEventForm, { CreateEventFormInputs } from '../../components/CreateEventForm';
import useHomeStore from './store';

const Home: React.FC = () => {
    const isModalOpen = useHomeStore((store) => store.isModalOpen);
    const isFormLoading = useHomeStore((store) => store.isFormLoading);
    const openModal = useHomeStore((store) => store.openModal);
    const closeModal = useHomeStore((store) => store.closeModal);
    const createEvent = useHomeStore((store) => store.createEvent);
    const navigate = useNavigate();

    const onFormFinish = async (values: CreateEventFormInputs) => {
        const id = await createEvent(values);
        console.log(id);
        navigate(`/event/${id}`);
    };

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
                <CreateEventForm onFinish={onFormFinish} isLoading={isFormLoading} />
            </Modal>
        </>
    );
};

export default Home;
