import React, { useState, useEffect } from 'react'
import { IMAGE_MEDIA, VIDEO_MEDIA, authToken, getHash } from '../../common/util';
import { Modal, ModalHeader, ModalBody, Row, Col, Button, Spinner } from 'reactstrap';
import firebase from '../../firebase/Firebase'
import axios from 'axios'

const UploadMedia = (props) => {
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

    const sendPost = () =>{
        setLoader(true)
        authToken().then(res => {
            let userId = res.userId;
            let token = res.token;
            let postId = new Date().now+'_'+getHash(userId)
            let data = {
                mimeType: selectedMediaFile.type,
                mediaUrl: mediaUrl,
                mediaThumbUrl: '',
                desc: postText,
                postId: postId
            }
            axios.defaults.headers.common['Authorization'] = token;
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
                        sendPost()
                    })
                    .catch((err) => {
                        props.closeSelectedMedia()
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
                            onChange={setPostText}
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