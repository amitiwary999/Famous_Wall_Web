import React from 'react';
import { Video } from 'react-feather';
import { Col, Media, Row } from 'reactstrap';

const VideoRequestList = props => {
    let videoRequests = props.videoRequests;
    return(
        videoRequests.map((item, index) => {
            let profileImg = item.profilePic;
            let name = item.name;
            return (
              <Media className="p-2">
                <Media left>
                  <Media object src={profileImg} />
                </Media>
                <Media className="ml-2" body>
                  <Media heading>{name}</Media>
                  <Row>
                    <Col>
                      <p>Reject</p>
                    </Col>
                    <Col>
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