import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './post.css'

const Posts = ({ isLoggedIn, setIsLoggedIn, setToken, token, username }) => {
    const [posts, setPosts] = useState([])
    const [mySearch, setMySearch] = useState(null)
    const [postAdded, setPostAdded] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState("")
    const [isMyPost, setIsMyPost] = useState(false)

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
            setMySearch(event.target.value.toLowerCase())
        }
    }
    const sendMessageContainer = (post) => {
        const messageHandler = (event) => {
            setMessage(event.target.value)
        }

        const onSubmitMessage = (event) => {
            event.preventDefault()

            fetch(`https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/posts/${post._id}/messages`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    message: {
                        content: `${message}`
                    }
                })
            }).then(response => response.json())
                .then(result => {
                    console.log(result);
                })
                .catch(console.error);
            setIsOpen(false)
        }

        return (
            <>
                {(!isMyPost &&
                    <form onSubmit={onSubmitMessage} className="sendMesForm">
                        <h4>Send Message to: {post.author.username} </h4>
                        <input type="text" value={message} onChange={messageHandler} placeholder='Title*'></input>
                        <button className='sendMessageBtn' type='submit'>SEND MESSAGE</button>
                    </form>
                )}
            </>
        )
    }

    const mapPosts = (arr) => {
        const handleDeleteBtn = (post) => {
            console.log(post)
            fetch(`https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/posts/${post._id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => response.json())
                .then(result => {
                    console.log(result);
                    const fetchPosts = async () => {
                        const resp = await fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/posts')
                        const dataFromApi = await resp.json();
                        setPosts(dataFromApi.data.posts);
                        setPostAdded(true)
                    }
                    fetchPosts()
                })
                .catch(console.error);
        }

        const sendMesBtn = (post) => {
            if (post.author.username === username) {
                setIsMyPost(true)
            } else {
                setIsMyPost(false)
            }
            setIsOpen(!isOpen)
        }

        return (<>
            {
                arr && arr.map(post =>
                    <div className='postCard2' key={post._id} >
                        <h2>{post.title}</h2>
                        <p className='description truncated'>{post.description}</p>
                        <p><strong>Price: </strong>{post.price}</p>
                        <p><strong>Seller: </strong>{post.author.username}</p>
                        <p><strong>Location: </strong>{post.location}</p>
                        {(isLoggedIn &&
                            <section className='buttons'>
                                <button type='button' className='messageBtn' onClick={() => sendMesBtn(post)}>SEND MESSAGE</button>
                                <button type='button' className='messageBtn red' onClick={() => handleDeleteBtn(post)}>DELETE</button>
                            </section>
                        )}
                        <div style={{ display: "none" }}>{post.title.toLowerCase().includes(mySearch) || post.author.username.toLowerCase().includes(mySearch) ? posts.splice(posts.indexOf(post), 1) && posts.unshift(post) : null}</div>
                        <div className='sendMesForm'>
                            {isOpen && sendMessageContainer(post)}
                        </div>
                    </div>)
            }
        </>)
    }

    const postDeleatedAlert = () => {
        return (
            <div class="alert">
                <strong>Post Deleated!</strong>
            </div>
        )
    }
    const notYourPostAlert = () => {
        return (
            <div class="alert">
                <strong>Not your post!</strong>
            </div>
        )
    }

    return <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
        <div className='formSection'>
            <h1 className='title'>Posts: </h1>
            <form className='searchForm'>
                <input type='text' placeholder='Search... ' onChange={handleTitleSearch}></input>
                {isLoggedIn && <button><Link to='/createPost' className="links">Add Post</Link></button>}
            </form>
        </div>

        <div className='postCardBox'>
            {mapPosts(posts)}
            <div className='containerAlert'>{postAdded && postDeleatedAlert()}</div>
        </div>
    </>
}

export default Posts