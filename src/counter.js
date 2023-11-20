import React, { useCallback } from 'react'
import Usecounterhook from './usecounterhook'
import Counter2 from './counter2';

function Counter() {
    const [count, Handleplus, Handleminus] = Usecounterhook();

    const handleButton = useCallback((name) => {
        console.log(name)
    },[])
    return (
        <>
            <div>
                <div className='d-flex justify-content-center align-items-center mt-5'>
                    <button className='btn btn-success w-25' onClick={()=>Handleplus()}>+</button>
                    <span className='px-4'>{count}</span>
                    <button className='btn btn-danger w-25' onClick={()=>Handleminus()}>-</button>

                </div>
                <Counter2 data={handleButton} />
            </div>
        </>
    )
}

export default Counter