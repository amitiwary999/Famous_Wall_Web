import React from 'react'
import { Button, Card, CardBody, Col, Container } from 'reactstrap'
import moment from 'moment';

const VideoRequestLists = props => {
    let videoRequests = props.videoRequests;
    const videolist = (item, index) => {
        let profileImg = item.userDp;
        let name = item.userName;
        return(
            <Card key={index}>
                <CardBody>
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
                      {item.status == 0 && (<div className="row">
                        <div className="col">
                          <p
                            className="pt-1"
                            style={{ color: "#ff0000", cursor: "pointer" }}
                            onClick={() => props.updateRequest(item.userId, 2)}
                          >
                            Reject
                          </p>
                        </div>
                        <div className="col">
                          <Button
                            color="primary"
                            onClick={() => props.updateRequest(item.userId, 1)}
                          >
                            Accept
                          </Button>
                        </div>
                      </div>)}
                      {item.status == 1 && (
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
                </CardBody>
            </Card>
        )
    }
    return(
        <Col>
            <Card>
                <CardBody>
                    {videoRequests.map((item, index) => {
                            return videolist(item, index)
                     })
                    }
                </CardBody>
            </Card>
        </Col>
    )
}

export default VideoRequestLists;