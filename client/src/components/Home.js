import React, { useContext, useState, useEffect } from 'react';
import Folders from './home/Folders'
import Nav from './Nav'
import { TextareaAutosize } from "@material-ui/core";
import { AuthContext } from '../context'
import { useHistory} from 'react-router-dom';
import '../styles/home.css'



const Home = () => {
    const { fetchWithCSRF, currentUserId } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [option, setOption] = useState('title');
    const [title, setTitle] = useState('Title')
    const [description, setDescription] = useState("description")
    const [color, setColor] = useState('rgb(247, 207, 207)');
    const history = useHistory()

    const options = ['title', 'description']

    const handleColor = e => setColor(e.target.value);

    const updateInput = e => {
        e.target.name === 'title' ?
            setTitle(e.target.value)
            : setDescription(e.target.value)
    }

    const handleOption = e => {
        setOption(e.target.value)
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        const folder = {
            title,
            color,
            description
        }
        let response = await fetchWithCSRF(`/api-folder/new/${currentUserId}`, {
            method: 'POST',
            body: JSON.stringify(folder),
        });
        let data = await response.json()

        history.push(`/folder/${data.id}/${data.title}`)
    }

    useEffect(() => {
        localStorage.clear();
    })

    return (
        <div className='page home'>
            <div className='header'>
                <div className='title'>FOLDERS</div>
                <div className='nav'>
                    <Nav />
                </div>
            </div>
            <Folders handleOpen={handleOpen} />
            <dialog className='mask' onClose={handleClose} open={open}>
                <div className='dialog'>
                    <div className='folder-options' >
                        {options.map((opt) => (
                            <button value={opt} onClick={handleOption} className='folder-option'>{opt}</button>

                        ))}
                    </div>
                    <div className='gap'>
                        <input className='color-picker' name="Color Picker" onChange={handleColor} value={color} type="color" />
                    </div>
                    <div className='preview' style={{ backgroundColor: color }}>
                        {option === 'title' ?
                            <TextareaAutosize
                                className="title"
                                aria-label="minimum height"
                                rowsMin={1}
                                placeholder='add title'
                                name='title'
                                value={title}
                                onChange={updateInput}
                            />
                            : option === 'description' ?
                                <TextareaAutosize
                                    className="description-input"
                                    aria-label="minimum height"
                                    rowsMin={1}
                                    name='description'
                                    value={description}
                                    onChange={updateInput}
                                />
                                : null
                        }
                    </div>
                    <div className='light btns'>
                        <button className='light btn' onClick={handleClose}>cancel</button>
                        <button className='light btn' onClick={handleSave}>save</button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default Home;
