import React, {useContext, useState, useEffect} from 'react';


const MoodboardTop = ({photos}) => {
    return (
        <div className='top__photos'>
            {photos.map((url) => (
                <div className='top__item'>
                    <img src={url} className='top__img' crossOrigin='Anonymous' alt='photo'/>
                </div>
            ))}
        </div>
    )
}

export default MoodboardTop;
