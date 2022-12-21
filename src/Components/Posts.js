import { Visibility } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './post.css'

const Posts = ({ isLoggedIn, setIsLoggedIn, setToken }) => {
    const [posts, setPosts] = useState([])
    const [mySearch, setMySearch] = useState(null)
    const [currId, setCurrentId] = useState("")
    const [visibility, setVisibility] = useState(false)
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
        if (event.target.value) {
            setMySearch(event.target.value)
            setVisibility(true)
        }

    }

    const searchTitlePost = (arr) => {
        return (
            <>
                {
                    arr && arr.map((post) => <div className='postCard' key={post._id} style={{ position: 'relative', top: 0 }}>
                        <h2>{"Title: " + post.title}</h2>
                        <p>{"Post Id: " + post._id}</p>
                        <p>{post.description}</p>
                        <p><strong>Price: </strong>{post.price}</p>
                        <p><strong>Seller: </strong>{post.author.username}</p>
                        <p><strong>Location: </strong>{post.location}</p>
                        <button className='messageBtn'>SEND MESSAGE</button>
                    </div>)
                }
            </>
        )
    }

    const mapPosts = (arr) => {
        return (
            <>
                {
                    arr && arr.map(post => <div className='postCard' key={post._id} style={{ display: 'flex' }} >

                        {post.title.includes(mySearch) ? posts.splice(posts.indexOf(post), 1) && posts.unshift(post) : null}
                        <h2>{"Title: " + post.title}</h2>
                        <p>{post.description}</p>
                        <p><strong>Price: </strong>{post.price}</p>
                        <p><strong>Seller: </strong>{post.author.username}</p>
                        <p><strong>Location: </strong>{post.location}</p>
                        <button className='messageBtn'>SEND MESSAGE</button>
                    </div>
                    )
                }
            </>
        )
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

            {/* {visibility ? mapPosts(posts) : searchTitlePost(searchPostArr)} */}
            {/* {searchTitlePost(searchPostArr)} */}
            {mapPosts(posts)}
            {/* {console.log(searchPostArr)} */}

        </div>
    </>
}

export default Posts