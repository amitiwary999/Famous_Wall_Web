import React, { useState } from 'react'
import { IMAGE_MEDIA, VIDEO_MEDIA } from '../../common/util';
import { Modal, ModalHeader, ModalBody, Row, Col, Button } from 'reactstrap';
import firebase from '../../firebase/Firebase'

const UploadMedia = (props) => {
    const [mediaType, setMediaType] = useState(props.selectedMediaType? props.selectedMediaType:IMAGE_MEDIA)
    const [postText, setPostText] = useState('')
    let selectedMediaFile = props.file;
    const [mediaUrl, setMediaUrl] = useState('')

    const close = () => {
        props.closeSelectedMedia()
    }
    const uploadMedia = () => {
        props.uploadMedia()
    }

    const sendPost = () =>{
        let data = {}
    }

    const uploadTask = () => {
        let time = new Date().getTime();
        console.log(selectedMediaFile);
        const storage = firebase.storage();
        const uploadTask = storage.ref(`${mediaType}/${time + selectedMediaFile.name}`).put(selectedMediaFile);
        uploadTask.on(
            "state_changed",
            (snapshot) => { },
            (error) => {
                console.log(error);

            },
            () => {
                storage
                    .ref(mediaType)
                    .child(time + selectedMediaFile.name)
                    .getDownloadURL()
                    .then((url) => {
                        console.log(url);
                        setMediaUrl(url)
                    })
                    .catch((err) => {
                        closeSelectedMediaCard()
                        console.log(err);
                    });
            }
        );
    };

    return(
        <Modal isOpen={true} toggle={close} className="modal-lg">
            <ModalHeader toggle={close} className="bg-gradient-dark">
                Upload Media
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col md={6} className="text-center">
                        {(mediaType == VIDEO_MEDIA) && <video 
                            src={URL.createObjectURL(props.file)}
                            style={{ maxWidth: '460px', height: 'auto' }}
                            controls={false}
                            autoPlay={false}
                            className="rounded-sm mr-1 rounded-lg"
                            />
                        }
                        {(mediaType === IMAGE_MEDIA) && <img 
                            src={URL.createObjectURL(props.file)}
                            style={{ maxWidth: '460px', height: 'auto'}}
                        />}
                        <input 
                            className="mx-8 my-4"
                            value={postText}
                            placeholder="your one liner"
                            className="font-weight-bold"
                            onChange={setPostText}
                            />
                        <Button
                            className="mx-auto mt-2"
                            style={{ width: '200px' }}
                            color="primary"
                            type="submit"
                            onClick={uploadMedia}>
                            upload
                        </Button>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    )
}

export default UploadMedia;