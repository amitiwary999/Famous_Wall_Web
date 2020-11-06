/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Delete, Video } from 'react-feather';
import moment from 'moment';
import {
  Button, Container,
} from 'reactstrap';

const VideoRequestList = (props) => {
  const { videoRequests } = props;

  return (
    videoRequests.map((item, index) => {
      const profileImg = item.userDp;
      const name = item.userName;
      console.log(`items ${JSON.stringify(item)}`);
      return (
        <Container>
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
        </Container>
      );
    })
  );
};

export default VideoRequestList;
