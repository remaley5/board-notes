import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from './Nav';
import '../styles/folder.css'

const Folder = (props) => {
    const folderId = parseInt(props.match.params.id, 10);
    const folderTitle = props.match.params.title
    const [boards, setBoards] = useState(null)
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('board title')
    const [loading, setLoading] = useState(true)
    const [currentBoard, setCurrentBoard] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api-folder/boards/${folderId}`)
            const data = await response.json()
            if (data.boards.length >= 1) {
                const boardsData = data.boards
                // console.log(boardsData)
                const boards = []
                while (boardsData.length >= 1) {
                    const image = boardsData.pop()
                    // console.log(image)
                    image.crossOrigin = 'Anonymous'
                    boards.push(image)
                }
                setBoards(boards)
                if (boards.length >= 1) {
                    setCurrentBoard(boards[0])
                }
            }
            setLoading(false)
        })()
    }, [folderId])

    const handleChange = e => {
        setTitle(e.target.value)
    }

    const handleChoose = board => {
        setCurrentBoard(board)
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTitle('board title')
    };

    return (
        <div className='page folder'>
            <div className='header'>
                <div className='title'>{folderTitle}</div>
                <div className='nav'>
                    <Nav />
                </div>
            </div>
            {loading ? <div className='loading'>loading your boards...</div> :
                <div className='container'>
                    <div className='boards'>
                        {boards ?
                            <>
                                <div className='add'>
                                    <button onClick={handleOpen} className='btn'>+</button>
                                </div>
                                <div className='list'>
                                    {boards.map((board) => (
                                        <div className='board' onClick={() => handleChoose(board)}>
                                            <img className='img' crossOrigin='Anonymous' src={board.photo_url} alt={board.title} />
                                            <div className='title'>{board.title}</div>
                                        </div>
                                    ))}
                                </div>
                            </> :
                            <div className='add'>
                                <button onClick={handleOpen} className='text btn'>create new board</button>
                            </div>
                        }
                    </div>
                    {currentBoard ?
                        <div className='current'>
                            <div className='title'>{currentBoard.title}</div>
                            <img src={currentBoard.photo_url} crossOrigin='Anonymous' alt={currentBoard.title} className='img' />
                        </div> : null}
                </div>}
            <dialog className='mask' onClose={handleClose} open={open}>
                <div className='dialog'>
                    <input className='header' onChange={handleChange} value={title} />
                    <div className='light btns'>
                        <button className='light btn' onClick={handleClose}>cancel</button>
                        <NavLink to={`/folder/new-board/${folderId}/${folderTitle}/${title}`} className='light btn'>create</NavLink>
                    </div>
                </div>
            </dialog>
        </div >
    )
}

export default Folder;
