import Nav from './Nav';
import Loading from './Loading'
import React, { useState, useContext, useEffect} from 'react';
import {NavLink} from 'react-router-dom'
import Canvas from './board/Canvas'
import Palette from './board/Palette';
import PropertiesPanel from './board/tools/PropertiesPanel'
import { AuthContext } from '../context'
import {setPhotos} from '../state'
import '../styles/board.css'
const categories = ['images', 'text', 'shapes']

function Board(props) {
    const { currentUserId } = useContext(AuthContext);
    const [type, setType] = useState('images')
    const [newText, setNewText] = useState(false)
    const [saving, setSaving] = useState(false)

    const folderId = parseInt(props.match.params.id, 10);
    const folderTitle = props.match.params.folderTitle
    // console.log('folderId', folderId)
    const boardTitle = props.match.params.boardTitle;

    const handleClick = e => {
        setType(e.target.value)
    }

    useEffect(() => {
        if (currentUserId)(
        (async () => {
            const res = await fetch(`/api-photos/${currentUserId}`)
            const data = await res.json();
            // console.log('loading photos', data)
            setPhotos(data)
        })())
    })


    return (
        <div className='page board'>
            {
                saving ?
                <Loading classes={'cube-board'} />
                : null
            }
            <div className='header'>
                <div className='title'>{boardTitle}</div>
                <div className='nav'>
                <Nav/>
                <NavLink to={`/folder/${folderId}/${folderTitle}`}><button className='nav-link book-link'>{folderTitle}</button></NavLink>
            </div>
            </div>
            <div className=''>
                <div className='top' draggable='false'>
                    <div className='options'>
                        {categories.map((option, idx) => (
                            <button className='option' key={idx} onClick={handleClick} value={option}>{option}</button>
                        ))}
                    </div>
                    <div className='pallet' draggable='false'>
                        <Palette type={type} setNewText={setNewText} newText={newText} />
                    </div>
                </div>
                <div className='body'>
                    <Canvas folderId={folderId} folderTitle={folderTitle} boardTitle={boardTitle} setSaving={setSaving} />
                    <PropertiesPanel newText={newText} setNewText={setNewText} />
                </div>
            </div>

        </div>
    );
}
export default Board;
