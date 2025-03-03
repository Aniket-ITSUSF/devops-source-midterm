import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
    const API_BASE_URL = import.meta.env.VITE_BOOK_APP_API_BASE_URL || "http://localhost:8800";

    const [book, setBook] = useState({
        title: "",
        description: "",
        price: null,
        cover: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()
    const location = useLocation()
    const bookID = location.pathname.split("/")[2]

    // Fetch the current book data
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/books/${bookID}`);
                setBook({
                    title: res.data.title || "",
                    description: res.data.description || "",
                    price: res.data.price || "",
                    cover: res.data.cover || ""
                });
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        fetchBook();
    }, [bookID, API_BASE_URL]);

    const handleChange = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            console.log("Base URL set to " + API_BASE_URL)
            await axios.put(`${API_BASE_URL}/books/${bookID}`, book)
            navigate("/")
        } catch (err) {
            console.log(err)
            setIsSubmitting(false)
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
            <form className='form'>
                <h1>Update NFT Listing</h1>

                <div className="form-field">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        placeholder="Enter NFT title"
                        onChange={handleChange}
                        name="title"
                        value={book.title}
                    />
                </div>

                <div className="form-field">
                    <label className="form-label">Description</label>
                    <input
                        type="text"
                        placeholder="Enter description"
                        onChange={handleChange}
                        name="description"
                        value={book.description}
                    />
                </div>

                <div className="form-field">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        placeholder="Enter price"
                        onChange={handleChange}
                        name="price"
                        value={book.price}
                    />
                </div>

                <div className="form-field">
                    <label className="form-label">Cover Image URL</label>
                    <input
                        type="text"
                        placeholder="Enter cover image URL"
                        onChange={handleChange}
                        name="cover"
                        value={book.cover}
                    />
                </div>

                <button
                    onClick={handleClick}
                    className='btn update-form-btn'
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Updating...' : 'Update NFT'}
                </button>
            </form>
        </div>
    )
}

export default Update
