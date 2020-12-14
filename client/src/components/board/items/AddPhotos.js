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
        console.log('setting all photos ', photos)
        setAllPhotos(photos);
        setOpenDialog(true);
    }

    const handleClose = () => {
        setOpenDialog(false)
    }

    return (
        <>
            <form className='content__add'>
                <button className='add-btn' onClick={handleOpen}>
                    +
            </button>
            </form>
            <dialog className='page-mask' open={openDialog}>
                <div className='dialog-content'>
                    <div className='images-dialog__header'>Select images for this board</div>
                    <div className='added__images'>
                        {Object.values(selected).map((photo) => (
                            <button value={photo.id} className='photo__con'>
                                <img className='folder-photo' src={photo.photo_url} alt='board photo' />
                            </button>
                        ))}
                    </div>
                    <div className='photos__con select'>
                        <Upload setLoading={setLoading} allPhotos={allPhotos} setAllPhotos={setAllPhotos} />
                        {
                            allPhotos.map((photo) => (
                                <SelectedPhoto photo={photo} setSelected={setSelected} selected={selected} />
                            ))
                        }
                        {loading ?
                            <div className='photo_con'>
                                <Loading classes={'cube-photo'} />
                            </div>
                            : null
                        }
                    </div>
                    <div className='dialog-btns'>
                        <button className='close-dialog-btn dialog-btn' onClick={handleClose}>cancel</button>
                        <button className='close-dialog-btn dialog-btn' onClick={handleSave}>save</button>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default AddPhotos;
