import React, { useContext, useState, useEffect, useCallback} from "react";
import { AuthContext } from '../../context'
import Upload from '../board/tools/Upload'
import {createNewText, createText, getSelectedPhotos, useShapes, updateAttribute, deleteShape } from '../../state';
import AddPhotos from "./items/AddPhotos";
import { DRAG_DATA_KEY, SHAPE_TYPES } from "../../constants";
import { Photo } from "./items/Photo";
import { TextareaAutosize } from "@material-ui/core";
const shapeSelector = (state) => state.shapes[state.selected];

const Palette = ({ type, setNewText, newText }) => {
  const selectedShape = useShapes(shapeSelector);

  const { currentUserId } = useContext(AuthContext);
  const [boardPhotos, setBoardPhotos] = useState([])
  const [load, setLoad] = useState(false)
  const [selected, setSelected] = useState([])

  const handleNewText = () => {
    createText();
  };

  const updateAttr = useCallback((event) => {
    let attr = event.target.name;
    let value = event.target.value
    if (event.target.name == 'strokeWidth') {
      value = parseInt(event.target.value, 10)
    }
    // console.log('ATTRIBUTE', attr, event.target.value)
    updateAttribute(attr, value);

  }, []);

  const handleDragStart = (event) => {
    let currentHeight = null
    let currentPhoto = null
    let currentWidth = null

    const type = event.target.dataset.shape;
    // console.log('draggging ....', type)
    if (type) {
      if (type === 'image') {
        currentWidth = event.target.width * 2
        currentHeight = event.target.height * 2
        currentPhoto = event.target.src
      }

      const offsetX = event.nativeEvent.offsetX;
      const offsetY = event.nativeEvent.offsetY;

      const clientWidth = event.target.clientWidth;
      const clientHeight = event.target.clientHeight;

      const dragPayload = JSON.stringify({
        type,
        offsetX,
        offsetY,
        clientWidth,
        clientHeight,
        currentPhoto,
        currentHeight,
        currentWidth
      });
      // console.log(dragPayload);
      event.nativeEvent.dataTransfer.setData(DRAG_DATA_KEY, dragPayload);
    }
  };

  useEffect(() => {
    const selectedPhotos = getSelectedPhotos()
    if(selectedPhotos) {
      setBoardPhotos(selectedPhotos)
    }
    // console.log('got selected photos ', selectedPhotos)
  }, [])

  return (
    <>
      { (type === 'images') ?
        <aside className='content'>
          <div className='imgs'>
            <AddPhotos boardPhotos={boardPhotos} setBoardPhotos={setBoardPhotos}/>
            {Object.values(boardPhotos).map((photo, idx) => (
              <div className='item' key={photo.photo_url}>
                <img
                  crossOrigin='Anonymous'
                  src={photo.photo_url}
                  name={`photo-${idx}`}
                  className="img"
                  data-shape={SHAPE_TYPES.PHOTO}
                  draggable
                  onDragStart={handleDragStart}
                />
              </div>
            ))}
          </div>
        </aside>
        : type === 'shapes' ?
          <aside className='content'>
            <div className='imgs'>
              <div
                className="shape rectangle"
                data-shape={SHAPE_TYPES.RECT}
                draggable
                onDragStart={handleDragStart}
              />
              <div
                className="shape circle"
                data-shape={SHAPE_TYPES.CIRCLE}
                draggable
                onDragStart={handleDragStart}
              />
            </div>
          </aside> : type === 'text' ?
            <aside className='content text'>
              <div className='imgs'>
                <div className='add'>
                  <button onClick={handleNewText} data-shape={SHAPE_TYPES.TEXT} className='btn'>NEW <br/> TEXT </button>
                </div>
                { selectedShape ?
                  <textarea className='change' name='text' value={selectedShape.text} placeholder='type text here' onChange={updateAttr} />
                  : null }
              </div>
            </aside>
            : null}
    </>
  );
}

export default Palette;
