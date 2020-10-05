import React, { useState } from 'react';
import { Button, Col, Label, Modal, ModalBody, ModalFooter, Row } from 'reactstrap';
import Flatpickr from "react-flatpickr";
import moment from 'moment'
import { notify } from '../../common/util';

const SetVideoCallTime = props => {
    const [callDate, setCallDate] = useState(null);
    const [callTime, setCallTime] = useState(null);
    let requestorId = props.requestorId;
    const confirmTime = () => {
        //selected date and time should be greater than current.
        let selectedDate = moment(
            callDate
        ).format("YYYY-MM-DD");
        let selectTime = moment(
            new Date(callTime)
        ).format("HH:mm:ss");

        let selectedDateTime = moment(selectedDate+' '+setCallTime, "YYYY-MM-DD HH:mm:ss").utc().toISOString();

        if(!callDate || !callTime){

        } else if (
            moment(
                selectedDate + " " + selectTime,
                "YYYY-MM-DD HH:mm:ss"
            ).isBefore(moment().valueOf())
        ) {
            notify(
                "You can't set video call time in past date",
                "danger",
                "Error!"
            );
            return false;
        }else{
            props.confirmTime(requestorId, 1, selectedDateTime);
        }
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