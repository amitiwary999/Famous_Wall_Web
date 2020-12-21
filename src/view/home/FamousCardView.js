/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import React, { useContext } from 'react';
import {
  Col,
  Card,
  CardBody,
  Badge,
  Row,
} from 'reactstrap';
import { Heart, Video } from 'react-feather';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { IMAGE_MEDIA, VIDEO_MEDIA, MUSIC_MEDIA } from '../../common/util';
import { AuthContext } from '../../firebase/Auth';
import {
  likeOrUnlikePost,
} from '../../redux/action/homeAction';

const FamousCardView = (props) => {
  const { currentUser } = useContext(AuthContext);

  const { data } = props;
  const { mimeType } = data;
  const { mediaUrl } = data;
  const { desc } = data;
  const { userDp } = data;
  const { userName } = data;
  const { date } = data;
  const { isLiked } = data;
  const { creatorId } = data;
  const { postId } = data;
  const { profileId } = data;
  const { pos } = props;
  const dispatch = useDispatch();

  const updateLikePost = () => {
    if (currentUser) {
      currentUser
        .getIdToken()
        .then((token) => {
          const incr = isLiked === 0 ? 1 : 0;
          dispatch(likeOrUnlikePost(postId, incr, pos, token));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log('please login');
      props.showLogin();
    }
  };

  const requestVideoCall = () => {
    props.sendRequest(creatorId);
  };

  const showProfile = () => {
    props.showProfile(profileId);
  };

  return (
    <div className="my-2">
      {/* {console.log("data in card " + JSON.stringify(props))} */}
      <Col>
        <Card>
          <CardBody className="mx-sm-auto">
            <Col style={{ height: 'auto', maxWidth: '460px' }}>
              <div className="row ml-3 mt-2" style={{ cursor: 'pointer' }} onClick={showProfile}>
                <img
                  src={userDp}
                  alt={userName}
                  className="rounded-sm mx-2 rounded-lg"
                  style={{ height: '36px', width: '36px' }}
                />
                <div className="float-left ">
                  <p className="my-auto font-weight-bold">{userName}</p>
                  <p className="float-left" style={{ fontSize: '12px' }}>
                    {moment(date, 'x').fromNow()}
                    {/** in response all is string so using x to format it */}
                  </p>
                </div>
              </div>
              <div className="my-2">
                {mimeType.includes(IMAGE_MEDIA) && (
                <img
                  src={mediaUrl}
                  alt={userName}
                  className="rounded-sm mx-2"
                  style={{ height: 'auto', width: '100%' }}
                />
                )}

                {mimeType.includes(VIDEO_MEDIA) && (
                <video
                  src={mediaUrl}
                  style={{ width: '100%', height: 'auto' }}
                  controls
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
            <Row className="mx-2">
              <div
                className="justify-content-left p-2 my-auto"
                style={{ cursor: 'pointer' }}
                onClick={updateLikePost}
              >
                <Heart
                  style={{
                    fill: isLiked === 1 ? 'red' : 'white',
                    color: isLiked === 1 ? 'red' : 'black',
                  }}
                />
              </div>
              <div
                className="justify-content-right p-2"
                onClick={requestVideoCall}
              >
                <Badge color="info" className=" mr-1 mb-1" style={{ cursor: 'pointer' }}>
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
