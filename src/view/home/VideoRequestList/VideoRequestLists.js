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
  const { videoRequests, type } = props;
  const videolist = (item, index) => {
    if (item.status === 2) return null;
    const profileImg = item.userDp;
    const name = item.userName;
    return (
      <Card key={index}>
        <CardBody className="p-0" style={{ marginTop: '5px', marginBottom: '5px' }}>
          <div className="col" key={index}>
            <Delete className="float-right mr-1" style={{ cursor: 'pointer' }} onClick={() => props.updateRequest(item.userId, 2, index)} />
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
                      {type === 0 ? (
                        <Button
                          className="acceptButton"
                          color="primary"
                          onClick={() => props.updateRequest(item.userId, 1, index)}
                        >
                          Accept
                        </Button>
                      )
                        : (<p>Pending</p>)}
                    </div>
                  </div>
                  )}
                  {item.status === 1 && (
                  <div className="row">
                    <div className="col">
                      {console.log(`${moment(item.updatedAt).utc().format('hh:mm:ss A')} ${item.updatedAt}`)}
                      {(((moment(item.updatedAt).valueOf() - Date.now() > 0) && (moment(item.updatedAt).valueOf() - Date.now()) <= 3605000)) ? (
                        <Button
                          className="acceptButton"
                          color="primary"
                          onClick={() => props.joinCallRequest(item)}
                        >
                          {`${'Join Call at \n'}${moment(item.updatedAt).format('hh:mm:ss A')}`}
                        </Button>
                      )
                        : (
                          <p>
                            {moment(item.updatedAt).fromNow()}
                          </p>
                        )}
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

      {videoRequests.map((item, index) => videolist(item, index))}

    </Col>
  );
};

export default VideoRequestLists;
