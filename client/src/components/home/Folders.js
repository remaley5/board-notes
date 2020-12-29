import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context'

const Folders = ({handleOpen}) => {
    const [folders, setFolders] = useState([]);
    const { currentUserId } = useContext(AuthContext);

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api-folder/${currentUserId}`)
            const data = await response.json()
            setFolders(data.folders)
        })()
    }, [currentUserId]);

    return (
        <>
            <div className='container'>
                {folders.length >=1 ?
                <>
                <div className='add' style={{backgroundColor: ' rgb(240, 240, 240)'}}>
                    <button onClick={handleOpen} className='btn big'>+</button>
                </div>
                {folders.map((folder) => (
                    <div className='folder' style={{ backgroundColor: folder.color }}>
                        <NavLink to={`/folder/${folder.id}/${folder.title}`} className='description'>{folder.description}</NavLink>
                        <div className='title'>{folder.title}</div>
                    </div>
                ))}
                </> : null
                }
            </div>
        </>
    )
}

export default Folders;
