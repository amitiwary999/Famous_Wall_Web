import React from 'react';
import { Video } from 'react-feather';
import { Button, Col, Container, Media, Row } from 'reactstrap';

const VideoRequestList = props => {
    let videoRequests = props.videoRequests;

    return(
        videoRequests.map((item, index) => {
            let profileImg = item.userDp;
            let name = item.userName;
            return (
              <Container>
                <div className="row" key={index}>
                  <div className="col">
                    <img
                      src={profileImg}
                      className="uploadDp"
                      alt={name}
                      style={{
                        height: "5.5em",
                        width: "5.5em",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                  <div className="col">
                    <div className="row">
                      <div className="col">
                        <p className="text-center font-weight-bold">{name}</p>
                      </div>
                      <div className="row">
                        <div className="col">
                          <p
                            className="pt-1"
                            style={{ color: "#ff0000", cursor: "pointer" }}
                            onClick={() => props.updateRequest(item.id, 2)}
                          >
                            Reject
                          </p>
                        </div>
                        <div className="col">
                          <Button
                            color="primary"
                            onClick={() => props.updateRequest(item.id, 1)}
                          >
                            Accept
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            );
        })
    )
}

export default VideoRequestList;