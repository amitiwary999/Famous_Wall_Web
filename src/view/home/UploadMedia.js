/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect, useContext } from 'react';
import {
  Modal, ModalHeader, ModalBody, Row, Col, Button, Spinner,
} from 'reactstrap';
import axios from 'axios';
import {
  IMAGE_MEDIA, VIDEO_MEDIA, getHash, uploadMedia,
} from '../../common/util';
import { AuthContext } from '../../firebase/Auth';

const UploadMedia = (props) => {
  const { currentUser } = useContext(AuthContext);
  const mediaType = props.mediaType ? props.mediaType : IMAGE_MEDIA;
  const [postText, setPostText] = useState('');
  const selectedMediaFile = props.file;
  const [loader, setLoader] = useState(false);
  const [loadMedia, setLoadMedia] = useState(false);
  const [mediaSrc, setMediaSrc] = useState('');

  const close = () => {
    props.closeSelectedMedia();
  };

  useEffect(() => {
    console.log(`media type ${mediaType} ${VIDEO_MEDIA}`);
    if (mediaType === VIDEO_MEDIA) {
      const reader = new FileReader();
      reader.onabort = () => {
        setLoadMedia(true);
        console.log('file reading was aborted');
      };
      reader.onerror = () => {
        setLoadMedia(true);
        console.log('file reading has failed');
      };
      reader.onload = (e) => {
        // Do whatever you want with the file contents
        const binaryStr = e.target.result;
        const blob = new Blob([binaryStr], { type: props.file.type }); // create a blob of buffer
        const url = URL.createObjectURL(blob);
        console.log(`${url} ${binaryStr}`);
        setMediaSrc(url);
        setLoadMedia(true);
      };
      reader.readAsArrayBuffer(props.file);
    } else {
      setMediaSrc(URL.createObjectURL(props.file));
      setLoadMedia(true);
    }
  }, [mediaType, props.file]);

  const updatePostText = (event) => {
    const { value } = event.target;
    setPostText(value);
  };

  const sendPost = (url) => {
    currentUser.getIdToken().then((token) => {
      const userId = currentUser.uid;
      const currentDate = Date.now();
      const postId = `${currentDate}_${getHash(userId)}`;
      const data = {
        mimeType: selectedMediaFile.type,
        mediaUrl: url,
        mediaThumbUrl: '',
        desc: postText,
        postId,
      };
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      axios.post('famousPost', data).then((res) => {
        setLoader(false);
        close();
      }).catch((error) => {
        setLoader(false);
        console.log(error);
      });
    }).catch((error) => {
      setLoader(false);
      console.log(error);
    });
  };

  const uploadTask = () => {
    setLoader(true);
    uploadMedia(selectedMediaFile, mediaType)
      .then((url) => {
        sendPost(url);
      })
      .catch((error) => {
        props.closeSelectedMedia();
        console.log(error);
        setLoader(false);
      });
  };

  return (
    <Modal isOpen toggle={close} className="modal-lg">
      <ModalHeader toggle={close} className="bg-gradient-dark">
        Upload Media
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col md={6} className="text-center">
            {(mediaType === VIDEO_MEDIA) && (
              <video
                style={{ maxWidth: '460px', height: 'auto' }}
                src={mediaSrc}
                controls
                autoPlay={false}
                className="rounded-sm mr-1 rounded-lg"
              />
            )}
            {(mediaType === IMAGE_MEDIA) && (
              <img
                src={mediaSrc}
                alt="loading"
                style={{ maxWidth: '460px', height: 'auto' }}
              />
            )}
            <input
              className="mx-8 my-4 font-weight-bold"
              value={postText}
              placeholder="your one liner"
              onChange={(event) => updatePostText(event)}
            />
            <Button
              className="mx-auto mt-2"
              style={{ width: '200px' }}
              color="primary"
              type="submit"
              onClick={uploadTask}
            >
              upload
            </Button>
            {(loader || !loadMedia) && <Spinner />}
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default UploadMedia;
