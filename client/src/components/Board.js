import Nav from './Nav';
import Loading from './Loading'
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Canvas from './board/Canvas'
import Palette from './board/Palette';
import { AuthContext } from '../context'
import { setPhotos } from '../state'
import '../styles/board.css'

import {
    reset
} from '../state'

const categories = ['images', 'text', 'shapes', 'toolbelt']

function Board(props) {
    const [type, setType] = useState('images')
    const [newText, setNewText] = useState(false)
    const [saving, setSaving] = useState(false)
    const history = useHistory()
    const { setCurrentUserId, currentUserId, fetchWithCSRF } = useContext(AuthContext);

    const sketchbookId = parseInt(props.match.params.id, 10);
    const sketchbookTitle = props.match.params.sketchbookTitle
    // console.log('sketchbookId', sketchbookId)
    const boardTitle = props.match.params.boardTitle;

    const handleClick = e => {
        setType(e.target.value)
    }

    const logoutUser = async () => {
        reset();
        localStorage.clear();
        const response = await fetchWithCSRF('/logout', {
            method: 'POST',
            credentials: 'include'
        });
        if (response.ok) {
            setCurrentUserId(null);
        }
    }

    const redirectNav = e => {
        if (window.confirm("If you leave now your board will not be saved!")) {
            reset();
            localStorage.clear();
            if (e.target.value === 'sketchbook') {
                history.push(`/sketchbook/${sketchbookId}/${sketchbookTitle}`)
            } else if (e.target.value === 'logout') {
                logoutUser()
            } else {
                history.push('/')
            }
        }
    }

    useEffect(() => {
        if (currentUserId) (
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
                    <button className='nav-link home-link' value='home' onClick={redirectNav}>home</button>
                    <button onClick={redirectNav} className='nav-link logout-link'>Logout</button>
                    <button className='nav-link book-link' onClick={redirectNav} value='sketchbook'>&#8592;  {sketchbookTitle}</button>
                </div>
            </div>
            <div className=''>
                <div className='top' draggable='false'>
                    <div className='pallet'>
                        {categories.map((option, idx) => (
                            <button className='type' key={idx} onClick={handleClick} value={option}>{option}</button>
                        ))}
                        <div className='pallet' draggable='false'>
                            <Palette type={type} setNewText={setNewText} newText={newText} />
                        </div>
                    </div>
                </div>
                <div className='body'>
                    <Canvas sketchbookId={sketchbookId} sketchbookTitle={sketchbookTitle} boardTitle={boardTitle} setSaving={setSaving} />
                </div>
            </div>

        </div>
    );
}
export default Board;
