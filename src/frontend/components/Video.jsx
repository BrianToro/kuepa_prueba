import React from 'react';

import '../assets/styles/components/Video.scss';

const Video = () => {
    return (
        <div className="container-video">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/jlvK_aQkp3Y" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </div>
    )
}

export default Video;