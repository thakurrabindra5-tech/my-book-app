import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

function Book_UpDateForm() {
    const [state, setState] = useState({
        booktitle: "",
        author: "",
        formate: "",
        Topic: "",
        PubYear: 1990,
    });

    let url = "http://localhost:5000/"; // Updated to 5000
    let params = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/getbook/' + params.id)
            .then(res => {
                setState(res.data)
            })
            .catch(err => {
                console.log("Error loading book data");
            })
    }, [params.id]);

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
        
        axios.post(url + "updatebook/" + params.id, bookdata)
            .then(res => {
                console.log(res.data);
                navigate("/DisplayBooksF1"); // Go back to list
            });
    };

    return (
        <div style={{ marginTop: 10 }}>
            <h3>Update Book Id: {params.id}</h3>
            <form onSubmit={OnSubmit}>
                {/* Reusing form fields for simplicity */}
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
                 <div className="form-group">
                    <label>Format: </label>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="formate" value="Hard Copy"
                            checked={state.formate === "Hard Copy"} onChange={handleChange} />
                        <label className="form-check-label">Hard Copy</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="formate" value="Electronic Copy"
                            checked={state.formate === "Electronic Copy"} onChange={handleChange} />
                        <label className="form-check-label">Electronic Copy</label>
                    </div>
                </div>
                <center>
                    <br/>
                    <input type="submit" value="Update Book" className="btn btn-primary" />
                </center>
            </form>
        </div>
    );
}
export default Book_UpDateForm;