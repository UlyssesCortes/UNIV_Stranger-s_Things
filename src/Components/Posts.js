import React, { useEffect, useState } from 'react';
import Header from './Header';



const Posts = ({ isLoggedIn, setIsLoggedIn, setToken }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const resp = await fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/posts')
            const dataFromApi = await resp.json();
            setPosts(dataFromApi.data.posts);
        }
        fetchPosts()
    }, [])

    return <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
        <h1 className='title'> Posts: </h1>
        <div className='postCardBox'>
            {
                posts && posts.map(post => <div className='postCard' key={post._id}>
                    <h2>{"Title: " + post.title}</h2>
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