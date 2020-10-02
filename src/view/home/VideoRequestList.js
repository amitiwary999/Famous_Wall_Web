import React from 'react';
import { Video } from 'react-feather';
import { Col, Media, Row } from 'reactstrap';

const VideoRequestList = props => {
    let videoRequests = props.videoRequests;

    return(
        videoRequests.map((item, index) => {
            let profileImg = item.userDp;
            let name = item.userName;
            return (
              <Media className="p-2" key={index}>
                <Media left>
                  <Media object src={profileImg} />
                </Media>
                <Media className="ml-2" body>
                  <Media heading>{name}</Media>
                  <Row>
                    <Col onClick={() => props.updateRequest(item.userId, 2)}>
                      <p>Reject</p>
                    </Col>
                    <Col onClick={() => props.updateRequest(item.userId, 1)}>
                      <p>Accept</p>
                    </Col>
                  </Row>
                </Media>
              </Media>
            );
        })
    )
}

export default VideoRequestList;