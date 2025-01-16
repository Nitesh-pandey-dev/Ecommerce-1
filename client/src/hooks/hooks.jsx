import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function hooks() {
    const [categories,setCategories] = useState([]);
    const getCategories = async() => {
        try {
            const {data} = await axios.get('http://127.0.0.1:5000/category/allcategory');
            setCategories(data?.allcategory);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{getCategories()},[])
    return categories;
}
