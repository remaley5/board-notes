import Nav from './Nav';
import Loading from './Loading'
import React, { useState} from 'react';
import Canvas from './board/Canvas'
import Palette from './board/Palette';
import PropertiesPanel from './board/tools/PropertiesPanel'
const categories = ['images', 'text', 'shapes', 'pallets']

function Moodboard(props) {
    const [type, setType] = useState('images')
    const [newText, setNewText] = useState(false)
    const [saving, setSaving] = useState(false)

    const sketchbookId = parseInt(props.match.params.id, 10);
    const sketchbookTitle = props.match.params.sketchbookTitle
    console.log('sketchbookId', sketchbookId)
    const boardTitle = props.match.params.boardTitle;

    const handleClick = e => {
        setType(e.target.value)
    }

    return (
        <div className='page'>
            <div className='nav'>
                <Nav/>
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
                    {/* <button id='save' onClick={handleSave}>Save as PNG</button> */}
                    <Canvas sketchbookId={sketchbookId} sketchbookTitle={sketchbookTitle} boardTitle={boardTitle} setSaving={setSaving} />
                    <PropertiesPanel newText={newText} setNewText={setNewText} />
                </div>
            </div>

        </div>
    );
}
export default Moodboard;
