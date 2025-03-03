import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
    const API_BASE_URL = import.meta.env.VITE_BOOK_APP_API_BASE_URL || "http://localhost:8800";

    const [book, setBook] = useState({
        title: "",
        description: "",
        price: null,
        cover: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            console.log("Base URL set to " + API_BASE_URL)
            await axios.post(`${API_BASE_URL}/books`, book)
            navigate("/")
        } catch (err) {
            console.log(err)
            setIsSubmitting(false)
        }
    }

    return (
        <div className="App">
            <form className='form'>
                <h1>Add New Book</h1>

                <div className="form-field">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        placeholder="Enter book title"
                        onChange={handleChange}
                        name="title"
                    />
                </div>

                <div className="form-field">
                    <label className="form-label">Description</label>
                    <input
                        type="text"
                        placeholder="Enter book description"
                        onChange={handleChange}
                        name="description"
                    />
                </div>

                <div className="form-field">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        placeholder="Enter book price"
                        onChange={handleChange}
                        name="price"
                    />
                </div>

                <div className="form-field">
                    <label className="form-label">Cover Image URL</label>
                    <input
                        type="text"
                        placeholder="Enter cover image URL"
                        onChange={handleChange}
                        name="cover"
                    />
                </div>

                <button
                    onClick={handleClick}
                    className='btn add-btn'
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Adding...' : 'Add Book'}
                </button>
            </form>
        </div>
    )
}

export default Add
