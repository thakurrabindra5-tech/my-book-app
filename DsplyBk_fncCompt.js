import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayData from "./DisplayData";

export default function FncDisplayBooks() {
    const [Books, setBooks] = useState([]);
    const url = "http://localhost:5000/allbooks"; // Updated to 5001

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setBooks(res.data)
            })
            .catch(err => {
                console.log("Error has occurred");
            })
    }, []);

    return (
        <div>
            <DisplayData Books={Books} />
        </div>
    );
}