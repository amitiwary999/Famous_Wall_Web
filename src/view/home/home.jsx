/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {
  Card, Badge, Col, CardBody, Button, CardHeader, UncontrolledDropdown, DropdownToggle, DropdownMenu, Row, Media,
} from 'reactstrap';
import { Video, Image, Music } from 'react-feather';
import Dropzone from 'react-dropzone';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import FamousCardView from './FamousCardView';
import UploadMedia from './UploadMedia';
import {
  VIDEO_MEDIA, IMAGE_MEDIA, authToken, getHash, PENDING, SUCCESS, FAILURE,
} from '../../common/util';
import { fetchFamousPosts, fetchVideoRequest, postVideoCallRequest } from '../../redux/action/homeAction';
import { AuthContext } from '../../firebase/Auth';
import Login from '../login/Login';
import Spinner from '../../firebase/LoadingSpinner';
import VideoRequestList from './VideoRequestList';
import SetVideoCallTime from './SetVideoCallTime';
import VideoRequestLists from './VideoRequestList/VideoRequestLists';

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  const {
    famousPosts, lastItemId, hasMoreItems, loadItemStatus,
  } = useSelector((state) => ({
    famousPosts: state.home.famousPosts,
    lastItemId: state.home.lastItemId,
    hasMoreItems: state.home.hasMoreItems,
    loadItemStatus: state.home.loadItemStatus,
  }));
  const [selectedMediaType, setSelectedMediaType] = useState('');
  const [selectedMediaFile, setSelectedMediaFile] = useState('');
  const [showSelectedMediaCard, setShowSelectedMediaCard] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [videoRequest, setVideoRequest] = useState([]);
  const [requestorId, setRequestorId] = useState('');
  const [confirmTime, setConfirmTime] = useState(false);
  const [videoRequestIndex, setVideoRequestIndex] = useState(0);
  const dispatch = useDispatch();

  const getVideoRequest = (token) => {
    fetchVideoRequest(token)
      .then((res) => {
        setVideoRequest(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (currentUser) {
      currentUser.getIdToken().then((token) => {
        dispatch(fetchFamousPosts(lastItemId, token));
        getVideoRequest(token);
      }).catch((error) => {
        console.log(error);
      });
    } else {
      dispatch(fetchFamousPosts(lastItemId));
    }
  }, []);

  const updateVideoRequest = (status, index) => {
    const request = videoRequest[index];
    request.status = status;
    // eslint-disable-next-line max-len
    const updatedVideoRequest = [
      ...videoRequest.slice(0, index),
      request,
      ...videoRequest.slice(index + 1),
    ];
    setVideoRequest(updatedVideoRequest);
  };

  const acceptRejectApiCall = (userId, status, callTime, index) => {
    updateVideoRequest(status, index);
    setConfirmTime(false);
    setShowLoader(true);
    const data = {
      inviteeId: userId,
      status, // 0 means request
    };
    if (status === 1) data.callTime = callTime;
    currentUser
      .getIdToken()
      .then((token) => {
        postVideoCallRequest(token, data)
          .then((res) => {
            console.log(`video call req ${res}`);
            setShowLoader(false);
          })
          .catch((error) => {
            updateVideoRequest(0, index);
            console.log(error);
            setShowLoader(false);
          });
      })
      .catch((error) => {
        updateVideoRequest(0, index);
        console.log(error);
        setShowLoader(false);
      });
  };

  const acceptRejectRequest = (userId, status, index) => {
    setVideoRequestIndex(index);
    if (status === 1) {
      setRequestorId(userId);
      setConfirmTime(true);
    } else {
      const cTime = moment().utc().format('YYYY-MM-DD HH:mm:ss');
      acceptRejectApiCall(userId, status, cTime, index);
    }
  };

  useEffect(() => {
    console.log(`lis ${loadItemStatus}`);
    if (loadItemStatus === PENDING) {
      setShowLoader(true);
    } else if (loadItemStatus === SUCCESS) {
      setShowLoader(false);
    } else if (loadItemStatus === FAILURE) {
      setShowLoader(false);
    }
  }, [loadItemStatus]);
  const closeSelectedMediaCard = () => {
    setShowSelectedMediaCard(false);
  };

  const loadFamousCard = (item, index) => {
    console.log(`item ${item.mimeType}`);
    return (
      <FamousCardView
        key={index}
        data={item}
        pos={index}
        showLogin={() => setShowLogin(true)}
      />
    );
  };

  const dropzoneClick = (event) => {
    console.log(`dropzone ${event} ${currentUser}`);
    if (!currentUser) {
      event.stopPropagation();
      setShowLogin(true);
    }
  };

  const hideLogin = () => {
    setShowLogin(false);
  };

  return (
    <div>
      <Col md={4} sm={6} className="mx-auto mt-2">
        <Card>
          <CardBody>
            {videoRequest && videoRequest.length > 0 && (
            <UncontrolledDropdown className="d-md-none">
              <DropdownToggle
                tag="small"
                className="text-bold-500 cursor-pointer"
              >
                <div className="d-flex justify-content-end mb-2">
                  <Badge color="success" className=" mr-1 mb-1">
                    {videoRequest && videoRequest.length > 0 && (
                    <Badge
                      pill
                      color="danger"
                      className="p-1 badge-up float-right"
                      style={{
                        marginRight: -8,
                        marginTop: -6,
                        fontSize: '12px',
                      }}
                    >
                      {videoRequest.length}
                    </Badge>
                    )}
                    <Col className="p-2" style={{ cursor: 'pointer' }}>
                      <Video size={16} />
                      <span className="font-weight-bold ml-1">
                        Call request
                      </span>
                    </Col>
                  </Badge>
                </div>
              </DropdownToggle>
              <DropdownMenu>
                <VideoRequestList updateRequest={acceptRejectRequest} videoRequests={videoRequest} />
              </DropdownMenu>
            </UncontrolledDropdown>
            )}
            <p className="font-weight-bold">Make yourself famous</p>
            {currentUser && (
            <div className="d-flex justify-content-between pl-2 pr-2">
              <Dropzone
                accept="video/*"
                onDrop={(acceptedFiles) => {
                  console.log(acceptedFiles);
                  setSelectedMediaFile(acceptedFiles[0]);
                  setSelectedMediaType(VIDEO_MEDIA);
                  setShowSelectedMediaCard(true);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div
                      style={{ cursor: 'pointer' }}
                      {...getRootProps({
                        onClick: (event) => dropzoneClick(event),
                      })}
                    >
                      <input {...getInputProps()} />
                      <Badge pill color="info" className="mr-1 mb-1">
                        <Video size={16} className="mr-2" />
                        Video
                      </Badge>
                    </div>
                  </section>
                )}
              </Dropzone>
              <Dropzone
                accept="image/*"
                onDrop={(acceptedFiles) => {
                  console.log(acceptedFiles);
                  setSelectedMediaFile(acceptedFiles[0]);
                  setSelectedMediaType(IMAGE_MEDIA);
                  setShowSelectedMediaCard(true);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div
                      style={{ cursor: 'pointer' }}
                      {...getRootProps({
                        onClick: (event) => dropzoneClick(event),
                      })}
                    >
                      <input {...getInputProps()} />
                      <Badge pill color="info" className="mr-1 mb-1">
                        <Image size={16} className="mr-2" />
                        Image
                      </Badge>
                    </div>
                  </section>
                )}
              </Dropzone>
              <Dropzone
                accept="audio/*"
                onDrop={(acceptedFiles) => console.log(acceptedFiles)}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div
                      style={{ cursor: 'pointer' }}
                      {...getRootProps({
                        onClick: (event) => dropzoneClick(event),
                      })}
                    >
                      <input {...getInputProps()} />
                      <Badge pill color="info" className="mr-1 mb-1">
                        <Music size={16} className="mr-2" />
                        Audio
                      </Badge>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            )}
            {!currentUser && (
            <Button className="primary" onClick={() => setShowLogin(true)}>
              Please Login
              {' '}
            </Button>
            )}
          </CardBody>
        </Card>
      </Col>
      <Row>
        <Col md={7} lg={8} xl={9}>
          <div className="mx-auto">
            {/* <InfiniteScroll
          pageStart={0}
          loadMore={loadMoreItems}
          hasMore={hasMoreItems}
          loader={<Spinner />}> */}
            {famousPosts
            && famousPosts.map((item, index) => loadFamousCard(item, index))}
            {/* </InfiniteScroll> */}
          </div>
        </Col>
        {videoRequest && videoRequest.length > 0 && (
        <Col md={5} lg={4} xl={3} className="d-none d-md-block float-right">
          <VideoRequestLists updateRequest={acceptRejectRequest} videoRequests={videoRequest} />
        </Col>
        )}
      </Row>
      {showSelectedMediaCard && (
      <UploadMedia
        mediaType={selectedMediaType}
        file={selectedMediaFile}
        closeSelectedMedia={() => closeSelectedMediaCard()}
      />
      )}
      {showLogin && <Login closeLogin={() => hideLogin()} />}
      {showLoader && <Spinner />}
      {confirmTime && (
      <SetVideoCallTime
        confirmTime={acceptRejectApiCall}
        close={() => setConfirmTime(false)}
        requestorId={requestorId}
      />
      )}
    </div>
  );
};

export default Home;
