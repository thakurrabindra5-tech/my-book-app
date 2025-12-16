import React, { useState } from "react";
import axios from 'axios';

export default function Book_Form() {
    let url = "http://localhost:5000/";
    const [state, setState] = useState({
        booktitle: "",
        author: "",
        formate: "",
        Topic: "",
        PubYear: 1990,
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value,
        });
    };

    const OnSubmit = (e) => {
        e.preventDefault();
        const bookdata = {
            booktitle: state.booktitle,
            PubYear: state.PubYear,
            author: state.author,
            Topic: state.Topic,
            formate: state.formate
        };

        axios.post(url + "addbooks", bookdata)
            .then(res => {
                console.log(res.data);
                alert("Book Added Successfully");
            });
    };

    return (
        <div style={{ marginTop: 10 }}>
            <h3>Add Book</h3>
            <form onSubmit={OnSubmit}>
                <div className="form-group">
                    <label>Book Title: </label>
                    <input className="form-control" type="text" name="booktitle"
                        value={state.booktitle} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Book Authors: </label>
                    <input className="form-control" name="author"
                        value={state.author} onChange={handleChange} />
                </div>
                <center>
                    <input type="submit" value="Add this book" className="btn btn-primary" />
                </center>
            </form>
        </div>
    );
}