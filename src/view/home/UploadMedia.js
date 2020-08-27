import React, { useState } from 'react'
import { IMAGE_MEDIA } from '../../common/util';

const UploadMedia = (props) => {
    const [mediaType, setMediaType] = useState(props.selectedMediaType? props.selectedMediaType:IMAGE_MEDIA)
    return(
    )
}

export default UploadMedia;