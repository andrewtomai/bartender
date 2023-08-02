import React from 'react';
import { Button, Form, Input } from 'antd';

export interface CreateEventFormInputs {
    name: string;
    description?: string;
}

export type props = {
    onFinish: (values: CreateEventFormInputs) => void;
    isLoading?: boolean;
};

const CreateEventForm: React.FC<props> = ({ onFinish, isLoading }) => (
    <Form
        name="create_event"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
    >
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Lets name the event!' }]}>
            <Input />
        </Form.Item>

        <Form.Item
            label="Description"
            name="description"
            rules={[{ required: false, message: 'Tell your guests what they should get excited about' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button aria-label="Submit" loading={isLoading} type="primary" htmlType="submit">
                Create Event
            </Button>
        </Form.Item>
    </Form>
);

export default CreateEventForm;
