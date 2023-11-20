import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Usecustookhook from './allApi/usecustookhook';
const productapi = 'https://products-api-cwck.onrender.com/products';
// const productapi = 'https://products-api-cwck.onrender.com/products';

function Welcome_card_page() {
    const [HandleFavChecker, removefromfav, addtofav] = Usecustookhook();
    const navigate = useNavigate();
    const [apidata, setApidata] = useState([])
    const [loading, setLoading] = useState(false)
    // const [favoriteList, setFavoriteList] = useState([])

  
    const toastwarning = () => toast.error("You already Login", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
    });

    useEffect(() => {
        if (!localStorage.getItem('login_token')) {
            navigate('/signup')
        } else {
            toastwarning()
        }
    })
    // const addtofav = (item) => {
    //     const fav = [...favoriteList, item]
    //     const result = fav.filter((items, index) => fav.indexOf(items) === index);
    //     setFavoriteList(result)
    // };


    // const removefromfav = (id) => {
    //     const list = [...favoriteList]
    //     const revomeFav = list.filter((items) => items.id !== id);
    //     setFavoriteList(revomeFav)
    // };

    // useEffect(() => {
    //     localStorage.setItem('favouriteList', JSON.stringify(favoriteList));
    // }, [favoriteList])

    // const HandleFavChecker = (id) => {
    //     const boolean = favoriteList.some(item => item.id === id);
    //     console.log(boolean)
    //     return boolean;
    // }

    const apifetch = useCallback(async () => {
        setLoading(true)
        try {
            let result = await axios.get(productapi)
            console.log(result?.data);
            setApidata(result?.data);
            setLoading(false)
        } catch (error) {
            console.log(error.message)
        }
    }, [])
    useEffect(() => {
        apifetch();
    }, [apifetch])


    return (
        <>
            <ToastContainer />
            <div className='row'>
                {
                    loading ? <h1>Loading....</h1> : apidata && apidata?.map((items, index) => {
                        return (

                                <div key={index + 1} className='card-items mb-5'>
                                    <div className='card-shadow'>
                                        <div className='imaage_parent'>
                                            <Link to={`productDetails/${items.id}`}>
                                                <img src={items.thumbnail}></img>
                                            </Link>
                                            {
                                                HandleFavChecker(items.id) ? (
                                                    <button type='button' className='btn btn-danger w-100 mt-2' onClick={() => removefromfav(items.id)}>remove to favourite</button>
                                                ) : (
                                                    <button type='button' className='btn btn-success w-100 mt-2' onClick={() => addtofav(items)} >add to favourite</button>
                                                )
                                            }
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

export default Welcome_card_page