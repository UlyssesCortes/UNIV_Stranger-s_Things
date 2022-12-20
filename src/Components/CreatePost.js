import React, { useState } from "react";
import Header from "./Header";
import './createPost.css'

const CreatePost = ({ isLoggedIn, setIsLoggedIn, token }) => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [deliver, setDeliver] = useState(false)
    const [location, setLocation] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/posts', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title: `${title}`,
                    description: `${description}`,
                    price: `${price}`,
                    location: `${location}`,
                    willDeliver: `${deliver}`
                }
            })
        }).then(response => response.json())
            .then(result => {
                console.log(result);
                console.log(title)
            })
            .catch(console.error);
    }

    const handleChangeTitle = (event) => {
        setTitle(event.target.value)
    }
    const handleChangeDescription = (event) => {
        setDescription(event.target.value)
    }
    const handleChangePrice = (event) => {
        setPrice(event.target.value)
    }
    const handleChangeLocation = (event) => {
        setLocation(event.target.value)
    }
    const handleChangeDelivery = (event) => {
        setDeliver(event.target.value)
    }

    return <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="bodyContainer">
            <h1>Create Post:</h1>
            <form className="createPostForm" onSubmit={handleSubmit}>
                <input type='text' placeholder='Title*' value={title} onChange={handleChangeTitle}></input>
                <input type='text' placeholder='Description*' value={description} onChange={handleChangeDescription}></input>
                <input type='text' placeholder='Price*' value={price} onChange={handleChangePrice}></input>
                <input type='text' placeholder='Location' value={location} onChange={handleChangeLocation}></input>
                <div className='checkBoxContainer'>
                    <label>Willing to delivery?</label>
                    <input className="checkBox" type="checkbox" value={deliver} onChange={handleChangeDelivery} />
                </div>
                <button className="createPostBtn" type='sumbit'>CREATE</button>
            </form>

        </div>
    </>
}

export default CreatePost
