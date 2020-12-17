import React, { useRef, useCallback, useState, useContext} from "react";
import { Layer, Stage } from "react-konva";
import {  useHistory } from 'react-router-dom';
import {AuthContext} from '../../context'

import {
  useShapes,
  clearSelection,
  createCircle,
  createRectangle,
  createPhoto,
  createText,
  saveDiagram,
  reset,
} from "../../state";
import { DRAG_DATA_KEY, SHAPE_TYPES } from "../../constants";
import { Shape } from './items/Shape';

const handleDragOver = (event) => event.preventDefault();

const Canvas = ({sketchbookId, sketchbookTitle, boardTitle, setSaving}) => {
  const { fetchWithCSRF, currentUserId } = useContext(AuthContext);
  const shapes = useShapes((state) => Object.entries(state.shapes));
  const history = useHistory()
  //// console.log('shapes', shapes) // Array(2)
  const [isDragging, setIsDragging] = useState(false)
  const stageRef = useRef();
  const canvasRef = useRef();
  const layerRef = useRef();
  const [photos, setPhotos] = useState([])

  const handleDrop = useCallback((event) => {

    const draggedData = event.nativeEvent.dataTransfer.getData(DRAG_DATA_KEY);

    if (draggedData) {
      var { offsetX, offsetY, type, clientHeight, clientWidth, currentPhoto } = JSON.parse(
        draggedData
      );
      stageRef.current.setPointersPositions(event);
      const coords = stageRef.current.getPointerPosition();

      if (type === SHAPE_TYPES.RECT) {
        createRectangle({
          x: coords.x - offsetX,
          y: coords.y - offsetY,
        });
      } else if (type === SHAPE_TYPES.CIRCLE) {
        createCircle({
          x: coords.x - (offsetX - clientWidth / 2),
          y: coords.y - (offsetY - clientHeight / 2),
        });
      } else if (type === SHAPE_TYPES.PHOTO) {
        setPhotos((state) => (
          [...state, currentPhoto]
        ))

        createPhoto({
          currentPhoto: currentPhoto,
          x: coords.x - offsetX,
          y: coords.y - offsetY,
          height: clientHeight,
          width: clientWidth
        });
      } else if (type === SHAPE_TYPES.TEXT) {
        createText({
          x: coords.x - offsetX,
          y: coords.y - offsetY,
          height: 100,
          width: 100
        });
      }
    }

    saveDiagram()
  }, []);

  const downloadURI = () => {
    const uri = stageRef.current.toDataURL()
    const name = `${boardTitle}-board.png`
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link)
    link.click();
    document.body.removeChild(link);
  }

  function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

	const handleSave = async(e) => {
    setSaving(true)
    console.log('saving true')
    clearSelection();
    const dataURL = stageRef.current.toDataURL();
    const blob = dataURItoBlob(dataURL)
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("title", boardTitle)
    // console.log('sketchBookId in Canvas', sketchbookId)
    // console.log('typof', (typeof sketchbookId))
    let response = await fetchWithCSRF(`/api-photos/sketchbook/${sketchbookId}`, {
			method: 'POST',
			body: formData,
    });
    reset();
    localStorage.clear('__selected_photos__')
    history.push(`/sketchbook/${sketchbookId}/${sketchbookTitle}`)
    setSaving(false)
    console.log('setting saving false')
	};


  return (
    <main className="canvas" onDrop={handleDrop} onDragOver={handleDragOver} ref={canvasRef}>
      <div className="canvas__btns">
        <button className='canvas__btn' onClick={handleSave}>Save</button>
        <button className='canvas__btn' onClick={reset}>Reset</button>
        <button id='save' className='canvas__btn' onClick={downloadURI}>Download</button>

      </div>
      <Stage
        ref={stageRef}
        width={800}
        height={1200}
        onClick={clearSelection}
        className='stage'
      >
        <Layer ref={layerRef} className='layer'>
          {shapes.map(([key, shape], i) => (
            <Shape key={key} shape={{ ...shape, id: key }} stage={stageRef} layer={layerRef} />
          ))}
        </Layer>
      </Stage>
    </main>
  );
}

export default Canvas;
