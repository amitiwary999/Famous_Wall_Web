import React from 'react'
import { Button, Card, CardBody, Col, Container } from 'reactstrap'
import moment from 'moment';
import './VideoRequestList.css'
import { Delete } from 'react-feather';

const VideoRequestLists = props => {
    let videoRequests = props.videoRequests;
    const videolist = (item, index) => {
        let profileImg = item.userDp;
        let name = item.userName;
        return(
            <Card key={index}>
             
                <CardBody className="p-0" style={{marginTop: '5px', marginBottom: '5px'}}>
                   <Delete className="float-right mr-1" onClick={() => props.updateRequest(item.userId, 2)}/>
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
                      {item.status == 0 && (<div className="row">
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