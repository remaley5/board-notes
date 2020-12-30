import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context'

const Sketchbooks = ({handleOpen}) => {
    const [sketchbooks, setSketchbooks] = useState([]);
    const { currentUserId } = useContext(AuthContext);

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api-sketchbook/${currentUserId}`)
            const data = await response.json()
            setSketchbooks(data.sketchbooks)
        })()
    }, [currentUserId]);

    return (
        <>
            <div className='container'>
                {sketchbooks.length >=1 ?
                <>
                <div className='add' style={{backgroundColor: ' rgb(240, 240, 240)'}}>
                    <button onClick={handleOpen} className='btn big'>+</button>
                </div>
                {sketchbooks.map((sketchbook) => (
                    <div className='sketchbook' style={{ backgroundColor: sketchbook.color }}>
                        <NavLink to={`/sketchbook/${sketchbook.id}/${sketchbook.title}`} className='description'>{sketchbook.description}</NavLink>
                        <div className='title'>{sketchbook.title}</div>
                    </div>
                ))}
                </> :
                <div className='add' style={{backgroundColor: ' rgb(240, 240, 240)'}}>
                    <button onClick={handleOpen} className='text btn'>CREATE NEW FOLDER</button>
                </div>
                }
            </div>
        </>
    )
}

export default Sketchbooks;
