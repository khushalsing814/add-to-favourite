import React, { useCallback, useEffect, useState } from 'react';

function Usecustookhook() {
    const [favoriteList, setFavoriteList] = useState([]);

    const addtofav = (item) => {
        const fav = [...favoriteList, item]
        const result = fav.filter((items, index) => fav.indexOf(items) === index);
        setFavoriteList(result)
    };

    const removefromfav = (id) => {
        const list = [...favoriteList]
        const revomeFav = list.filter((items) => items.id !== id);
        setFavoriteList(revomeFav)
    };

    useEffect(useCallback(() => {
        localStorage.setItem('favouriteList', JSON.stringify(favoriteList));
    }), [favoriteList])

    const HandleFavChecker = (id) => {
        const boolean = favoriteList.some(item => item.id === id);
        console.log(boolean)
        return boolean;
    }

    return [HandleFavChecker, removefromfav, addtofav,favoriteList];
}

export default Usecustookhook