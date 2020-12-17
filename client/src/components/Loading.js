import React, {useEffect} from 'react';


const Loading = ({classes}) => {

    useEffect(() => {
        console.log('rendering loading component')
    })

    return (
        <div className={`wrap ${classes}`}>
            <div className='saving-text'>SAVING</div>
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
