import React, { useState, useContext, useEffect } from 'react';
import { getPhotos, setSelectedPhotos } from '../../../state';
import Upload from './../tools/Upload'
import SelectedPhoto from './SelectedPhoto'
import Loading from '../../Loading'

const AddPhotos = ({ boardPhotos, setBoardPhotos }) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [selected, setSelected] = useState({})
    const [loading, setLoading] = useState(false)
    const [allPhotos, setAllPhotos] = useState([])

    const handleSave = () => {
        setBoardPhotos(selected)
        setSelectedPhotos(selected)
        setOpenDialog(false)
    }

    const handleOpen = async (e) => {
        e.preventDefault();
        const photos = getPhotos();
        setSelected(boardPhotos);
        // console.log('setting all photos ', photos)
        if (photos) {
            setAllPhotos(photos);
        }
        setOpenDialog(true);
    }

    const handleClose = () => {
        setOpenDialog(false)
    }

    return (
        <>
            <form className='add'>
                <button className='btn' onClick={handleOpen}>
                    SELECT <br /> IMAGES
            </button>
            </form>
            <dialog className='mask' open={openDialog}>
                <div className='dialog'>
                    <div className='header'>Selected images for this board:</div>
                    <aside className='selected content'>
                        <div className='imgs'>
                            {Object.values(selected).map((photo) => (
                                <button value={photo.id} className='item'>
                                    <img className='img' src={photo.photo_url} crossOrigin='Anonymous' alt='board photo' />
                                </button>
                            ))}
                        </div>
                    </aside>
                    <div className='header'>Your library:</div>
                    <div className='select container'>
                        <Upload setLoading={setLoading} allPhotos={allPhotos} setAllPhotos={setAllPhotos} />
                        {
                            allPhotos.map((photo) => (
                                <SelectedPhoto photo={photo} setSelected={setSelected} selected={selected} />
                            ))
                        }
                        {loading ?
                            <div className='image'>
                                <Loading classes={'cube-photo'} />
                            </div>
                            : null
                        }
                    </div>
                    <div className='light btns'>
                        <button className='light btn' onClick={handleClose}>cancel</button>
                        <button className='light btn' onClick={handleSave}>save</button>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default AddPhotos;
