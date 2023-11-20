import React, { memo } from 'react'
import Usecounterhook from './usecounterhook'
function Counter2(props) {
    const {data} = props;
    const [count, Handleplus, Handleminus] = Usecounterhook(10);
    console.log('render')
    return (
        <>
            <div className='d-flex justify-content-center align-items-center min-vh-100'>
                <button className='btn btn-success w-25' onClick={()=>Handleplus()}>+</button>
                <span className='px-4'>{count}</span>
                <button className='btn btn-danger w-25' onClick={()=>Handleminus()}>-</button>
                <div>
                <button className='btn btn-danger w-25' onClick={()=>data("manu") }>button</button>
                </div>
            </div>
        </>
    )
}

export default memo(Counter2)