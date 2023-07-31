import React from 'react';
import { Col, Row, Image, Typography, Button, Space } from 'antd';
import logoUrl from './logo.png';

type props = {
    onCallToActionClick: () => void;
};

const CallToAction: React.FC<props> = ({ onCallToActionClick }) => (
    <>
        <Row justify={'center'}>
            <Col span={8}>
                <Image src={logoUrl} alt={'bartender website logo'} preview={false} />
            </Col>
        </Row>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row justify={'center'}>
                <Col span={20}>
                    <Typography.Title level={3} style={{ textAlign: 'center' }} data-testid={'description'}>
                        Collect your friend's beverage prefences to make your next event a hit!
                    </Typography.Title>
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col>
                    <Button type="primary" onClick={onCallToActionClick} data-testid="cta">
                        Get Started
                    </Button>
                </Col>
            </Row>
        </Space>
    </>
);
export default CallToAction;
