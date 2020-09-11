import React, { useState, useEffect, useContext } from 'react'
import { IMAGE_MEDIA, VIDEO_MEDIA, authToken, getHash } from '../../common/util';
import { Modal, ModalHeader, ModalBody, Row, Col, Button, Spinner } from 'reactstrap';
import firebase from '../../firebase/Firebase'
import axios from 'axios'
import { AuthContext } from '../../firebase/Auth';

const UploadMedia = (props) => {
    const {currentUser} = useContext(AuthContext)
    const [mediaType, setMediaType] = useState(props.mediaType? props.mediaType:IMAGE_MEDIA)
    const [postText, setPostText] = useState('')
    let selectedMediaFile = props.file;
    const [mediaUrl, setMediaUrl] = useState('')
    const [loader, setLoader] = useState(false)
    const [loadMedia, setLoadMedia] = useState(false)
    const [mediaSrc, setMediaSrc] = useState('')

    const close = () => {
        props.closeSelectedMedia()
    }

    useEffect(() => {
        console.log("media type "+mediaType+" "+VIDEO_MEDIA)
        if(mediaType === VIDEO_MEDIA){
            const reader = new FileReader()
            reader.onabort = () => {
                setLoadMedia(true)
                console.log('file reading was aborted')
            }
            reader.onerror = () => {
                setLoadMedia(true)
                console.log('file reading has failed')
            }
            reader.onload = (e) => {
                // Do whatever you want with the file contents
                const binaryStr = e.target.result
                var blob = new Blob([binaryStr], { type: props.file.type })     // create a blob of buffer
                let url = URL.createObjectURL(blob)  
                console.log(url +" "+binaryStr)
                setMediaSrc(url)
                setLoadMedia(true)
            }
            reader.readAsArrayBuffer(props.file)
        }else{
            setMediaSrc(URL.createObjectURL(props.file))
            setLoadMedia(true)
        }
    },[mediaType, props.file])

    const updatePostText = (event) => {
        let value = event.target.value;
        setPostText(value);
    }

    const sendPost = (url) =>{
        currentUser.getIdToken().then(token => {
            let userId = currentUser.uid;
            let currentDate = Date.now();
            let postId = currentDate + '_' + getHash(userId)
            let data = {
                mimeType: selectedMediaFile.type,
                mediaUrl: url,
                mediaThumbUrl: '',
                desc: postText,
                postId: postId
            }
            console.log("token "+token+" "+JSON.stringify(data))
            axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
            axios.post('setPostSql', data).then(res => {
                setLoader(false)
                close()
            }).catch(error => {
                setLoader(false)
                console.log(error)
            })
        }).catch(error => {
           setLoader(false)
            console.log(error)
        })
    }

    const uploadTask = () => {
        setLoader(true);
        let time = new Date().getTime();
        console.log(selectedMediaFile);
        const storage = firebase.storage();
        const uploadTask = storage.ref(`${mediaType}/${time + selectedMediaFile.name}`).put(selectedMediaFile);
        uploadTask.on(
            "state_changed",
            (snapshot) => { },
            (error) => {
                console.log(error);
                setLoader(false)
            },
            () => {
                storage
                    .ref(mediaType)
                    .child(time + selectedMediaFile.name)
                    .getDownloadURL()
                    .then((url) => {
                        console.log(url);
                        sendPost(url)
                    })
                    .catch((err) => {
                        props.closeSelectedMedia()
                        console.log(err);
                        setLoader(false)
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
                            style={{ maxWidth: '460px', height: 'auto' }}
                            src={mediaSrc}
                            controls={true}
                            autoPlay={false}
                            className="rounded-sm mr-1 rounded-lg"/>
                        }
                        {(mediaType === IMAGE_MEDIA) && <img 
                            src={mediaSrc}
                            style={{ maxWidth: '460px', height: 'auto'}}
                        />}
                        <input 
                            className="mx-8 my-4"
                            value={postText}
                            placeholder="your one liner"
                            className="font-weight-bold"
                            onChange={(event) => updatePostText(event)}
                            />
                        <Button
                            className="mx-auto mt-2"
                            style={{ width: '200px' }}
                            color="primary"
                            type="submit"
                            onClick={uploadTask}>
                            upload
                        </Button>
                        {(loader || !loadMedia)&& <Spinner />}
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    )
}

export default UploadMedia;