import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
    const API_BASE_URL = import.meta.env.VITE_BOOK_APP_API_BASE_URL || "http://localhost:8800";
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                console.log("Base URL set to " + API_BASE_URL)
                const res = await axios.get(`${API_BASE_URL}/books`)
                setBooks(res.data)
                setLoading(false)
                console.log(res)
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        }
        fetchAllBooks()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/books/${id}`)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    if (loading) {
        return (
            <div className="loader">
                <div className="loader-circle"></div>
            </div>
        )
    }

    return (
        <div className="App">
            <h1 className="page-title">Mario's World</h1>

            {books.length === 0 ? (
                <div className="empty-state">
                    <p>No books available. Add your first book to get started!</p>
                </div>
            ) : (
                <div className="books">
                    {books.map(book => (
                        <div className="book" key={book.id}>
                            {book.cover && <img className="book-cover" src={book.cover} alt={book.title} />}
                            {!book.cover && <div className="book-cover" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0', color: '#aaa'}}>No Cover</div>}

                            <div className="book-details">
                                <h2 className="book-title">{book.title}</h2>
                                <p className="book-description">{book.description}</p>
                                <span className="book-price">${book.price}</span>

                                <div className="book-actions">
                                    <button className="delete-btn" onClick={() => handleDelete(book.id)}>
                                        Delete
                                    </button>
                                    <button className="update-btn">
                                        <Link to={`/update/${book.id}`}>Update</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <button className="add-book-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <Link to="/add">Add new Book</Link>
            </button>
        </div>
    )
}

export default Books
