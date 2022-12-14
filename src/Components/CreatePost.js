import React, { useState } from "react";
import Header from "./Header";
import './createPost.css'
import 'animate.css';


const CreatePost = ({ isLoggedIn, setIsLoggedIn, token }) => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [deliver, setDeliver] = useState(false)
    const [location, setLocation] = useState("")
    const [postAdded, setPostAdded] = useState(false)
    const defaultLocation = "[On Request]"

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
                if (result.success === true) {
                    setPostAdded(true)
                } else {
                    setPostAdded(false)
                }
            })
            .catch(console.error);
    }

    if (!location) {
        setLocation(defaultLocation)
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

        if (event.target.value) {
            setLocation(event.target.value)
        }
    }
    const handleChangeDelivery = () => {
        setDeliver(!deliver)
    }


    const postAddedAlert = () => {
        return (
            <div class="alertGreen">
                <strong>Post Added!</strong>
            </div>
        )
    }

    return <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="bodyContainer animate__animated animate__zoomIn">
            <h1>Create Post:</h1>
            <form className="createPostForm" onSubmit={handleSubmit}>
                <div className="className "> {postAdded && postAddedAlert()}</div>
                <input type='text' placeholder='Title*' value={title} onChange={handleChangeTitle}></input>
                <input className="descriptionInput" type='text' placeholder='Description* Max-Lenght 100' value={description} onChange={handleChangeDescription} maxlength={100}></input>
                <input id="priceInput" type='number' placeholder='Price*' value={price} onChange={handleChangePrice}></input>
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
