import React, { useState } from 'react'

function Usecounterhook(initialstate = 0) {
    const [count, setCount] = useState(initialstate);

    const Handleplus = () => {
        setCount(count + 1)
    }
    const Handleminus = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }
  return [count,Handleplus,Handleminus];
}

export default Usecounterhook