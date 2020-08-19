import React from 'react';
import { connect } from 'react-redux'
import { Typography, Input, DatePicker, Space, Button } from 'antd';
import * as Create from '../../reducers/room/create'

const { Title } = Typography;
const { RangePicker }  = DatePicker 

const CreateRoom = ({
    title,
    dateRange,

    setTitle,
    setDateRange,
    createRoom,
}) => {
    return (
        <Space direction="vertical">
            <Title>Create A Room</Title>
            <Input placeholder="Room Name" size="large" value={title} onChange={(e) => setTitle(e.target.value)}></Input>
            <RangePicker onChange={setDateRange} value={dateRange}></RangePicker>
            <Button type="primary" onClick={createRoom}>Create Room</Button>
        </Space>
    )
}

const mapStateToProps = (state) => ({
    title: Create.selectRoomTitle(state),
    dateRange: Create.selectDateRange(state),
})

const mapDispatchToProps = (dispatch) => ({
    setTitle: (t) => dispatch(Create.setRoomTitle(t)),
    setDateRange: (d) => dispatch(Create.setDateRange(d)),
    createRoom: () => dispatch(Create.createRoom()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom)