import React, { useState} from 'react';

const SelectedPhoto = ({ photo, setSelected, selected }) => {

    const handleClick = () => {
        // console.log('selected ?', Object.values(selected))
        // console.log('photo ?', photo)
        const id = photo.id
        const isSelected = Object.values(selected).includes(photo)

        // console.log('isSelected ?', isSelected)

        if (isSelected)  {
            delete selected[id];
            setSelected({...selected})
        } else {
            selected[id] = photo
            setSelected({...selected})
        }
    }

    return (
        <button className='item' onClick={handleClick}>
            {Object.values(selected).includes(photo) ?
            <>
            <div className='star'>&#9733;</div>
            <img className='faded image' src={photo.photo_url} crossOrigin='Anonymous' alt='board photo' />
                </> :
            <img className= 'image' src={photo.photo_url} crossOrigin='Anonymous' alt='board photo' />
        }
        </button>
    )
}

export default SelectedPhoto;
