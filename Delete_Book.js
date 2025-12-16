import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

export default function DeleteBook() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.post("http://localhost:5000/deleteBook/" + id) // Updated to 5001
            .then(res => {
                console.log("Book deleted");
                navigate("/DisplayBooksF1"); // Go back to list after delete
            })
            .catch(err => {
                console.log("Error deleting");
            });
    }, [id, navigate]);

    return (
        <div>
            <h2>Deleting Book...</h2>
        </div>
    );
}