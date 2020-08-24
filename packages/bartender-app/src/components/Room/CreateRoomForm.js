import React from 'react';
import { connect } from 'react-redux'
import { Typography, Input, DatePicker, Space, Button } from 'antd';
import * as Rooms from '../../reducers/room'

const { Title } = Typography;
const { RangePicker }  = DatePicker 

const CreateRoom = ({
    name,
    dateRange,
    createRoomButtonIsDisabled,
    roomIsCreating,

    setName,
    setDateRange,
    createRoom,
}) => {
    return (
        <Space direction="vertical">
            <Title>Create A Room</Title>
            <Input placeholder="Room Name" size="large" value={name} onChange={(e) => setName(e.target.value)}></Input>
            <RangePicker onChange={setDateRange} value={dateRange}></RangePicker>
            <Button type="primary" onClick={createRoom} disabled={createRoomButtonIsDisabled} loading={roomIsCreating}>Create Room</Button>
        </Space>
    )
}

const mapStateToProps = (state) => ({
    name: Rooms.selectRoomName(state),
    dateRange: Rooms.selectDateRange(state),
    createRoomButtonIsDisabled: Rooms.selectRoomCreateButtonIsDisabled(state),
    roomIsCreating: Rooms.selectRoomIsCreating(state),
})

const mapDispatchToProps = (dispatch) => ({
    setName: (t) => dispatch(Rooms.setRoomName(t)),
    setDateRange: (d) => dispatch(Rooms.setDateRange(d)),
    createRoom: () => dispatch(Rooms.createRoom()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom)