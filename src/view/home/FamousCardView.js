import React from 'react'
import imgPic from '../../img/IMG_20190907_224201.jpg'

const FamousCardView = () => {
    return (
      <div className="container">
        <div className="md-4">
        <div className="card">
            <div className="row">

            </div>
            <div>
            <img src={imgPic} style={{width: 'auto', height: 'auto', maxHeight: '640px', minWidth: '120px'}} />
            </div>
            
            <div className="row">
                
            </div>
        </div>
        </div>
      </div>
    );
}

export default FamousCardView;