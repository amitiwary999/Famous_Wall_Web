/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Button, Card, CardBody, Col,
} from 'reactstrap';
import moment from 'moment';
import './VideoRequestList.css';
import { Delete } from 'react-feather';

const VideoRequestLists = (props) => {
  const { videoRequests } = props;
  const videolist = (item, index) => {
    const profileImg = item.userDp;
    const name = item.userName;
    return (
      <Card key={index}>

        <CardBody className="p-0" style={{ marginTop: '5px', marginBottom: '5px' }}>
          <Delete className="float-right mr-1" style={{ cursor: 'pointer' }} onClick={() => props.updateRequest(item.userId, 2, index)} />
          <div className="col" key={index}>
            <div className="row">
              <img
                src={profileImg}
                className="requestorImg"
                alt={name}
              />
              <div className="row">
                <div className="col">
                  <div className="col">
                    <p className="text-center font-weight-bold requestorName">{name}</p>
                  </div>
                  {item.status === 0 && (
                  <div className="row">
                    <div className="col">
                      <Button
                        className="acceptButton"
                        color="primary"
                        onClick={() => props.updateRequest(item.userId, 1, index)}
                      >
                        Accept
                      </Button>
                    </div>
                  </div>
                  )}
                  {item.status === 1 && (
                  <div className="row">
                    <div className="col">
                      <p>
                        {moment(item.updatedAt).fromNow()}
                      </p>
                    </div>
                  </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  };
  return (
    <Col>
      <Card>
        <CardBody>
          {videoRequests.map((item, index) => videolist(item, index))}
        </CardBody>
      </Card>
    </Col>
  );
};

export default VideoRequestLists;
