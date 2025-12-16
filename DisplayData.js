import React from 'react';
import { Link } from 'react-router-dom';

const ShowBooks = (props) => {
    const { TBooks } = props; // Destructuring TBooks from props
    
    if (TBooks.length > 0) {
        return (
            TBooks.map((book, index) => {
                return (
                    <tr key={index}>
                        <td>{book.booktitle}</td>
                        <td>{book.PubYear}</td>
                        <td>{book.author}</td>
                        <td>{book.Topic}</td>
                        <td>{book.formate}</td>
                        <td>
                            <Link to={"/edit/" + book._id} className="btn btn-warning btn-sm">Edit</Link>
                        </td>
                        <td>
                            <Link to={"/Delete/" + book._id} className="btn btn-danger btn-sm">Delete</Link>
                        </td>
                    </tr>
                );
            })
        )
    } else {
        return (<tr><td colSpan="7">No Data Returned</td></tr>)
    }
}

export default function DisplayData(props) {
    const Books = props.Books;
    return (
        <div>
            <h3>Book List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Book Title</th>
                        <th>Pub Year</th>
                        <th>Author</th>
                        <th>Subject</th>
                        <th>Format</th>
                        <th colSpan="2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <ShowBooks TBooks={Books} />
                </tbody>
            </table>
        </div>
    )
}