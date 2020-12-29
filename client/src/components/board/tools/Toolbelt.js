import React, { useCallback, useEffect } from "react";
import { useShapes, updateAttribute, deleteShape } from "../../../state";

const fonts = ['Times New Roman', 'Luminari', 'Courier New', 'Trattatello', 'Comic Sans MS', 'Arial Black']
const fontStyles = ['normal', 'bold', 'italic']
const textDecorations = ['line-through', 'underline', 'none']
const shapeSelector = (state) => state.shapes[state.selected];

const Toolbelt = () => {
  const selectedShape = useShapes(shapeSelector);

  const updateAttr = useCallback((event) => {
    let attr = event.target.name;
    let value = event.target.value
    if (event.target.name == 'strokeWidth') {
      value = parseInt(event.target.value, 10)
    }
    updateAttribute(attr, value);
  }, []);

  const handleMove = e => {
    selectedShape.moveToTop()
  }

  return (
    <div className="toolbelt">
      <div className="properties">
        {selectedShape ?
          <div className='tools'>
            <div className='options'>
              <div className='title'>delete</div>
              <button className='light btn delete' onClick={deleteShape}>X</button>
            </div>
            {selectedShape.type === 'text' ?
              <div className='attributes'>
                <div className='options font'>
                  <div className='title'>font</div>
                  <div>
                    <button className='selected font' style={{ fontFamily: `${selectedShape.font}` }}>{selectedShape.fontFamily}</button>
                    <div className='select'>
                      {
                        fonts.map((font) => (
                          <button className='option font' id='text' style={{ fontFamily: `${font}` }} name='fontFamily' onClick={updateAttr} value={font}>{font}</button>
                        ))
                      }
                    </div>
                  </div>
                </div>
                <div className='options style'>
                  <div className='title'>style</div>
                  <div>
                    <button style={{ fontStyle: `${selectedShape.fontStyle}` }} className='selected style'>Aa</button>
                    <div className='select'>
                      {
                        fontStyles.map((fontStyle) => (
                          <button className='option style' id='text' style={{ fontStyle: `${fontStyle}` }} name='fontStyle' onClick={updateAttr} value={fontStyle}>Aa</button>
                        ))
                      }
                    </div>
                  </div>
                </div>
                <div className='options decoration'>
                  <div className='title'>decoration</div>
                  <div>
                    <button style={{ textDecoration: `${selectedShape.textDecoration}` }} className='selected style'>Aa</button>
                    <div className='select'>
                      {
                        textDecorations.map((textDecoration) => (
                          <button className='option style' id='text' style={{ textDecoration: `${textDecoration}` }} name='textDecoration' onClick={updateAttr} value={textDecoration}>Aa</button>
                        ))
                      }
                    </div>
                  </div>
                </div>
                <div className='options color'>
                  <div className='title'>color</div>
                  <div>
                    <input
                      className="color-value"
                      name="fill"
                      type="color"
                      value={selectedShape.fill}
                      onChange={updateAttr}
                    />
                  </div>
                </div>
                <div className='options size'>
                  <div className='title'>size</div>
                  <div className="slider">
                    <input
                      className="slider-value"
                      name="fontSize"
                      type="range"
                      min="10"
                      max="200"
                      value={selectedShape.fontSize}
                      onChange={updateAttr}
                    />
                  </div>
                </div>
              </div>
              :
              <div className='attributes'>
                <div className='options color'>
                  <div className='title'>stroke color</div>
                  <div>
                    <input
                      className="value"
                      name="stroke"
                      type="color"
                      value={selectedShape.stroke}
                      onChange={updateAttr}
                    />
                  </div>
                  </div>
                  <div className='options fill'>
                    <div className='title'>fill</div>
                    <div>
                      <input
                        className="value"
                        name="fill"
                        type="color"
                        value={selectedShape.fill}
                        onChange={updateAttr}
                      />
                    </div>
                  </div>
                  <div className='options stroke'>
                    <div className='title'>stroke</div>
                    <div>
                      <div className="slider">
                        <input
                          className="slider-value"
                          name="strokeWidth"
                          type="range"
                          min="0"
                          max="20"
                          value={selectedShape.strokeWidth}
                          onChange={updateAttr}
                        />
                      </div>
                    </div>
                  </div>
                </div>
            }
          </div> :
          <div className="no-data">Nothing is selected</div>
        }
      </div>
    </div>
  );
}


export default Toolbelt;
