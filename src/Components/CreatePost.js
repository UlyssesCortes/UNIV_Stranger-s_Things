import React, { useState } from "react";
import Header from "./Header";
import './createPost.css'

const CreatePost = ({ isLoggedIn, setIsLoggedIn }) => {
    return <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="bodyContainer">
            <h1>Create Post:</h1>
            <form className="createPostForm">
                <input type='text' placeholder='Title*'></input>
                <input type='text' placeholder='Description*'></input>
                <input type='text' placeholder='Price*'></input>
                <input type='text' placeholder='Location'></input>
                <div className='checkBoxContainer'>
                    <label>Willing to delivery?</label>
                    <input className="checkBox" type="checkbox" />
                </div>
            </form>

        </div>
    </>
}

export default CreatePost
