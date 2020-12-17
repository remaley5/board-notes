import Nav from './Nav';
import Loading from './Loading'
import React, { useState, useContext, useEffect} from 'react';
import {NavLink} from 'react-router-dom'
import Canvas from './board/Canvas'
import Palette from './board/Palette';
import PropertiesPanel from './board/tools/PropertiesPanel'
import { AuthContext } from '../context'
import {setPhotos} from '../state'
const categories = ['images', 'text', 'shapes', 'pallets']

function Moodboard(props) {
    const { currentUserId } = useContext(AuthContext);
    const [type, setType] = useState('images')
    const [newText, setNewText] = useState(false)
    const [saving, setSaving] = useState(false)

    const sketchbookId = parseInt(props.match.params.id, 10);
    const sketchbookTitle = props.match.params.sketchbookTitle
    // console.log('sketchbookId', sketchbookId)
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

    debugger;

    return (
        <div className='page'>
            <div className='nav'>
                <Nav/>
                <NavLink to={`/sketchbook/${sketchbookId}/${sketchbookTitle}`}><button className='nav-link book-link'>{sketchbookTitle}</button></NavLink>
            </div>
            {
                saving ?
                <Loading classes={'cube-board'} />
                : null
            }
            <div className='page-header'>
                <div className='sketchbook-header'>{boardTitle}</div>
            </div>
            <div className='moodboard'>
                <div className='moodboard-top' draggable='false'>
                    <div className='moodboard-top__options'>
                        {categories.map((option, idx) => (
                            <button className='option' key={idx} onClick={handleClick} value={option}>{option}</button>
                        ))}
                    </div>
                    <div className='moodboard-top__content' draggable='false'>
                        <Palette type={type} setNewText={setNewText} newText={newText} />
                    </div>
                </div>
                <div className='moodboard-body'>
                    <Canvas sketchbookId={sketchbookId} sketchbookTitle={sketchbookTitle} boardTitle={boardTitle} setSaving={setSaving} />
                    <PropertiesPanel newText={newText} setNewText={setNewText} />
                </div>
            </div>

        </div>
    );
}
export default Moodboard;
