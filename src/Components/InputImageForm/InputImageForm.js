import React from 'react';
import './InputImageForm.css';

const InputImageForm = ({onchangeInputImage, onSubmitDetect}) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Git it a try.'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onchangeInputImage}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                    onClick={onSubmitDetect}>
                        Detect
                    </button>
                </div>

            </div>
        </div>
    );

}

export default InputImageForm;