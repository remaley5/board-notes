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
        <button className='photo__con' onClick={handleClick}>
            <div className={Object.values(selected).includes(photo) ? 'folder-photo star' : 'folder-photo hidden star' }>&#9733;</div>
            <img className={Object.values(selected).includes(photo) ? 'photo-selected folder-photo' : 'folder-photo' } src={photo.photo_url} crossOrigin='Anonymous' alt='board photo' />
        </button>
    )
}

export default SelectedPhoto;
