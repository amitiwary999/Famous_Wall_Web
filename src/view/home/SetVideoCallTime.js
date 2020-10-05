import React, { useState } from 'react';
import { Button, Col, Label, Modal, ModalBody, ModalFooter, Row } from 'reactstrap';
import Flatpickr from "react-flatpickr";


const SetVideoCallTime = props => {
    const [callDate, setCallDate] = useState(null);
    const [callTime, setCallTime] = useState(null);
    let requestorId = props.requestorId;
    const confirmTime = () => {
        props.confirmTime(requestorId, 1);
    }

    const close = () => {
        props.close();
    }

    return (
      <Modal isOpen={true} toggle={close} className="modal-lg">
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
                  dateFormat: "h:i K",
                }}
                value={callTime}
                onChange={(date) => {
                setCallTime(date)
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
}

export default SetVideoCallTime;