import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './post.css'

const Posts = ({ isLoggedIn, setIsLoggedIn, setToken, token }) => {
    const [posts, setPosts] = useState([])
    const [mySearch, setMySearch] = useState("")
    const [currId, setCurrentId] = useState("")
    const searchPostArr = [];

    useEffect(() => {
        const fetchPosts = async () => {
            const resp = await fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/posts')
            const dataFromApi = await resp.json();
            setPosts(dataFromApi.data.posts);
        }
        fetchPosts()
    }, [])


    const handleTitleSearch = (event) => {
        setMySearch(event.target.value)
    }

    return <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
        <div className='formSection'>
            <h1 className='title'> Posts: </h1>
            <form className='searchForm'>
                <input type='text' placeholder='title' onChange={handleTitleSearch}></input>
                <input type='text' placeholder='body'></input>
                <button type='sumbit'>Search</button>
                {isLoggedIn && <button><Link to='/createPost' className="links">Add Post</Link></button>}
            </form>
        </div>

        <div className='postCardBox'>
            {
                posts && posts.map(post => <div className='postCard' key={post._id}>
                    <h2>{"Title: " + post.title}</h2>
                    {post.title.includes(mySearch) ? searchPostArr.push(post._id) : null}
                    <p>{"Post Id: " + post._id}</p>
                    <p>{post.description}</p>
                    <p><strong>Price: </strong>{post.price}</p>
                    <p><strong>Seller: </strong>{post.author.username}</p>
                    <p><strong>Location: </strong>{post.location}</p>
                    <button className='messageBtn'>SEND MESSAGE</button>
                </div>
                )
            }
            {/* {console.log(searchPostArr)} */}

        </div>
    </>
}

export default Posts