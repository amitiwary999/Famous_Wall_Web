import React, { useState } from 'react'
import { IMAGE_MEDIA, VIDEO_MEDIA } from '../../common/util';
import { Modal, ModalHeader, ModalBody, Row, Col, Button } from 'reactstrap';

const UploadMedia = (props) => {
    const [mediaType, setMediaType] = useState(props.selectedMediaType? props.selectedMediaType:IMAGE_MEDIA)
    const close = () => {
        props.closeSelectedMedia()
    }
    const uploadMedia = () => {
        props.uploadMedia()
    }
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