import React, { useEffect, useState,memo } from 'react'
// import Usecustookhook from './allApi/usecustookhook';
function Favourite() {
    const [getData,setGetdata]= useState([]);
    // const [HandleFavChecker, removefromfav, addtofav,favoriteList] = Usecustookhook();

    useEffect(()=>{
     const array = localStorage.getItem('favouriteList');
     const parsedArray = JSON.parse(array);
     setGetdata(parsedArray);
    },[])

    // console.log(favoriteList)

  return (
    <>
      <div className='row'>
                {
                    // loading ? <h1>Loading....</h1> :
                    getData && getData?.map((items, index) => {
                    console.log(items) 
                        return (
                            <div key={index + 1} className='card-items mb-5'>
                                <div className='card-shadow'>
                                    <div className='imaage_parent'>
                                        <img src={items.thumbnail}></img>
                                        {/* {
                                            HandleFavChecker(items.id) ?
                                                <button type='button' className='btn btn-danger w-100 mt-2' onClick={() => removefromfav(items.id)}>remove to favourite</button>
                                                :
                                                <button type='button' className='btn btn-success w-100 mt-2' onClick={() => addtofav(items)} >add to favourite</button>
                                        } */}
                                    </div>
                                </div>
                               
                            </div>
                        )
                    })
                }
            </div>
    </>
  )
}

export default memo(Favourite)