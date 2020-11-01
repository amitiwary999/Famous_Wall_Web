/* eslint-disable no-empty */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import {
  Button, Col, Label, Modal, ModalBody, ModalFooter, Row,
} from 'reactstrap';
import Flatpickr from 'react-flatpickr';
import moment from 'moment';
import { notify } from '../../common/util';

const SetVideoCallTime = (props) => {
  const [callDate, setCallDate] = useState(new Date());
  const [callTime, setCallTime] = useState(new Date());
  const { requestorId } = props;
  const confirmTime = () => {
    // selected date and time should be greater than current.
    const selectedDate = moment(
      callDate,
    ).format('YYYY-MM-DD');
    const selectTime = moment(
      new Date(callTime),
    ).format('HH:mm:ss');

    if (!callDate || !callTime) {

    } else if (moment(`${selectedDate} ${selectTime}`)
      .utc().isBefore(moment().utc().valueOf())
    ) {
      notify("You can't set video call time in past date", 'danger', 'Error!');
      return false;
    } else {
      const dateTime = moment(`${selectedDate} ${selectTime}`).utc().format('YYYY-MM-DD HH:mm:ss');
      props.confirmTime(requestorId, 1, dateTime);
    }
  };

  const close = () => {
    props.close();
  };

  return (
    <Modal isOpen toggle={close} className="modal-lg">
      <ModalBody>
        <Row>
          <Col>
            <Label for="selectdate" className="font-weight-bold">
              Select Date
            </Label>
            <Flatpickr
              id="startTime"
              className="form-control bg-white"
              value={callDate}
              options={{
                minDate: 'today',
              }}
              onChange={(date) => {
                setCallDate(date[0]);
              }}
            />
          </Col>

          <Col>
            <Label for="selectTime" className="font-weight-bold">
              Select Time
            </Label>
            <Flatpickr
              id="startTime"
              className="form-control bg-white"
              options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: 'h:i K',
              }}
              value={callTime}
              onChange={(date) => {
                setCallTime(date);
              }}
            />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={confirmTime}>Confirm</Button>
      </ModalFooter>
    </Modal>
  );
};

export default SetVideoCallTime;
