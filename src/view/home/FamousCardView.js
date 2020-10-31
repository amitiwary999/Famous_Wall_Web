import React, { useContext, useState } from "react";
import imgPic from "../../img/IMG_20190907_224201.jpg";
import {
  Col,
  Card,
  CardBody,
  Badge,
  Row,
  Carousel,
  CarouselItem,
} from "reactstrap";
import { IMAGE_MEDIA, VIDEO_MEDIA, MUSIC_MEDIA } from "../../common/util";
import { Heart, Video } from "react-feather";
import moment from "moment";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../firebase/Auth";
import {
  likeOrUnlikePost,
  postVideoCallRequest,
} from "../../redux/action/homeAction";

const FamousCardView = (props) => {
  const { currentUser } = useContext(AuthContext);

  let data = props.data;
  let mimeType = data.mimeType.split(",");
  let mediaUrl = data.mediaUrl.split(",");
  let desc = data.description.split(",");
  let userDp = data.userDp;
  let userName = data.userName;
  let date = data.date.split(",");
  let isLiked = data.isLiked;
  let mediaTYpe = IMAGE_MEDIA;
  if (mimeType.includes(IMAGE_MEDIA)) {
    mediaTYpe = IMAGE_MEDIA;
  } else if (mimeType.includes(VIDEO_MEDIA)) {
    mediaTYpe = VIDEO_MEDIA;
  } else if (mimeType.includes(MUSIC_MEDIA)) {
    mediaTYpe = MUSIC_MEDIA;
  }
  let creatorId = data.creatorId;
  let postId = data.postId.split(",");
  let pos = props.pos;
  let dispatch = useDispatch();

  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    const nextIndex = activeIndex === desc.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    const nextIndex = activeIndex === 0 ? desc.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    setActiveIndex(newIndex);
  };

  const updateLikePost = () => {
    if (currentUser) {
      currentUser
        .getIdToken()
        .then((token) => {
          let incr = isLiked == 0 ? 1 : 0;
          dispatch(likeOrUnlikePost(creatorId, incr, pos, token));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("please login");
    }
  };

  const requestVideoCall = () => {
    let cTime = moment()
      .utc()
      .format("YYYY-MM-DD HH:mm:ss");
    let data = {
      inviteeId: creatorId,
      callTime: cTime,
      status: 0, //0 means request
    };
    console.log(JSON.stringify(data));
    currentUser
      .getIdToken()
      .then((token) => {
        postVideoCallRequest(token, data)
          .then((res) => {
            console.log("video call req " + res);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="my-2">
      {/* {console.log("data in card " + JSON.stringify(props))} */}
      <Col>
        <Card>
          <CardBody className="mx-sm-auto">
            <Carousel next={next} previous={previous} activeIndex={activeIndex}>
              {desc.map((desc, index) => (
                <CarouselItem key={index}>
                  <Col style={{ height: "auto", maxWidth: "460px" }}>
                    <div className="row ml-3 mt-2">
                      <img
                        src={userDp}
                        alt={userName}
                        className="rounded-sm mx-2 rounded-lg"
                        style={{ height: "36px", width: "36px" }}
                      />
                      <div className="float-left ">
                        <p className="my-auto font-weight-bold">{userName}</p>
                        <p className="float-left" style={{ fontSize: "12px" }}>
                          {moment(date[index], "x").fromNow()}
                          {/**in response all is string so using x to format it */}
                        </p>
                      </div>
                    </div>
                    <div className="my-2">
                      {mimeType[index].includes(IMAGE_MEDIA) && (
                        <img
                          src={mediaUrl[index]}
                          alt={userName}
                          className="rounded-sm mx-2"
                          style={{ height: "auto", width: "100%" }}
                        />
                      )}

                      {mimeType[index].includes(VIDEO_MEDIA) && (
                        <video
                          src={mediaUrl[index]}
                          style={{ width: "100%", height: "auto" }}
                          controls={true}
                          autoPlay={false}
                          className="rounded-sm mx-2 rounded-lg"
                          object-fit="cover"
                        />
                      )}
                    </div>
                    {desc && (
                      <div className="row mt-2 mx-2">
                        <p className="float-left font-weight-bold">{desc}</p>
                      </div>
                    )}
                  </Col>
                </CarouselItem>
              ))}
            </Carousel>
              <Row className="mx-2">
                <div
                  className="justify-content-left p-2 my-auto"
                  style={{cursor: 'pointer'}}
                  onClick={updateLikePost}
                >
                  <Heart
                    style={{
                      fill: isLiked === 1?"red" : "white",
                      color: isLiked === 1? "red": "black",
                    }}
                  />
                </div>
                <div
                 className="justify-content-right p-2"
                 onClick={requestVideoCall}
                >
              <Badge color="info" className=" mr-1 mb-1" style={{cursor: 'pointer'}}>
                <Col className="p-2">
                  <Video size={16} />
                  <span className="font-weight-bold ml-1">Request call</span>
                </Col>
              </Badge>
            </div>
              </Row>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default FamousCardView;
