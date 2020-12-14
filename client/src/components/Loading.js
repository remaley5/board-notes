import React from 'react';


const Loading = ({classes}) => {
    return (
        <div className={`wrap ${classes}`}>
            <div className={`cube`}>
                <div className="face front">saving</div>
                <div className="face back">saving</div>
                <div className="face top"></div>
                <div className="face bottom"></div>
                <div className="face left">saving</div>
                <div className="face right">saving</div>
            </div>
        </div>
    )
}

export default Loading;
