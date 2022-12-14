import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
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
    <h1>
      Posts
    </h1>
    {
      posts && posts.map(post => <div key={post.id}>
        <div>{post.title}</div>
      </div>)
    }
  </>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

