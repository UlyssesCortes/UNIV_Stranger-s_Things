import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './post.css'
import 'animate.css';

const Posts = ({ isLoggedIn, setIsLoggedIn, setToken, token, username }) => {
    const [posts, setPosts] = useState([])
    const [mySearch, setMySearch] = useState(null)
    const [postAdded, setPostAdded] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState("")
    const [isMyPost, setIsMyPost] = useState(false)
    const [currPostId, setCurrPostId] = useState("")

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

        const messageHandler = (event) => {
            setMessage(event.target.value)
        }

        return (
            <>
                {(!isMyPost && currPostId === post._id &&
                    <form onSubmit={onSubmitMessage} className="sendMesForm animate__animated animate__zoomInDown">
                        <h4>Message to: {post.author.username} </h4>
                        {/* <h1 class="animate__animated animate__bounce">An animated element</h1> */}
                        <input type="text" value={message} onChange={messageHandler} placeholder='Title*'></input>
                        <button className='sendMessageBtn' type='submit'>SEND MESSAGE</button>
                    </form>
                )}
            </>
        )
    }

    const mapPosts = (arr) => {

        const handleDeleteBtn = (post) => {

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
            setCurrPostId(post._id)

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
                    <div className='postCard2 animate__animated animate__backInLeft' key={post._id} >
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
                            {!isMyPost && isOpen && sendMessageContainer(post)}
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

    return <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
        <div className='formSection2'>
            <section className='sectionForm'>
                <h1 className='titlePost '>Posts: </h1>
                <form className='searchForm'>
                    <input type='text' placeholder='Search... ' onChange={handleTitleSearch}></input>
                    {isLoggedIn && <button className='addPostBtn'><Link to='/createPost' className="links">Add Post</Link></button>}
                </form>
            </section>

        </div>
        <div className='postCardBox '>
            {mapPosts(posts)}
            <div className='containerAlert'>{postAdded && postDeleatedAlert()}</div>
        </div>
    </>
}

export default Posts