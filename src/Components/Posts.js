import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './post.css'

const Posts = ({ isLoggedIn, setIsLoggedIn, setToken, token }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const resp = await fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/posts')
            const dataFromApi = await resp.json();
            setPosts(dataFromApi.data.posts);
        }
        fetchPosts()
    }, [])

    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/posts', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            post: {
                title: "My favorite stuffed animal",
                description: "This is a pooh doll from 1973. It has been carefully taken care of since I first got it.",
                price: "$480.00",
                willDeliver: true
            }
        })
    }).then(response => response.json())
        .then(result => {
            console.log(result);
        })
        .catch(console.error);

    return <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
        <div className='formSection'>
            <h1 className='title'> Posts: </h1>
            <form className='searchForm'>
                <input type='text' placeholder='title'></input>
                <input type='text' placeholder='body'></input>
                <button type='sumbit'>Search</button>
                {/* <button>Create Post</button> */}
            </form>
        </div>
        <button><Link to='/createPost' className="links">Add Post</Link></button>
        <button><Link to='/home' className="links">HOME</Link>
        </button>

        <div className='postCardBox'>
            {
                posts && posts.map(post => <div className='postCard' key={post._id}>
                    <h2>{"Title: " + post.title}</h2>
                    <p>{"Post Id: " + post._id}</p>
                    <p>{post.description}</p>
                    <p><strong>Price: </strong>{post.price}</p>
                    <p><strong>Seller: </strong>{post.author.username}</p>
                    <p><strong>Location: </strong>{post.location}</p>
                    <button className='messageBtn'>SEND MESSAGE</button>
                </div>
                )
            }
        </div>
    </>
}

export default Posts