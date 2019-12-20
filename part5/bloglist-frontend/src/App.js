import React, { useState, useEffect } from 'react';
import Header from './components/Header'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'

const App = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLogined, setIsLogined] = useState(false)
    const [user, setUser] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [errorStyle, setErrorStyle] = useState(true)

    const Notification = ({message}) => {
        if (message === null) {
            return null
        }

        const className = errorStyle ? 'error' : 'correct'
        return (
            <div className={className}>
                {message}
            </div>
        )
    }

    const LoginForm = () => {
        return (
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input type="text" required value={username} name="Username"
                            onChange={({target}) => setUsername(target.value)}/>
                </div>
                <div>
                    password
                    <input type="password" required value={password} name="Password"
                            onChange={({target}) => setPassword(target.value)}/>
                </div>
                <button type="submit">login</button>
            </form>
        )
    }

    const BlogList = () => {
        const style = {
            marginTop: 30,
        }
        return (
            <div style={style}>
                {blogs.map( blog => <Blog key={blog.id} blog={blog} /> )}
            </div>
        )
    }

    const Logout = () => {
        const style = {
            marginBottom: 30,
        }
        return (
            <div style={style}>
                { `${user.username} logged in` } <button onClick={() => logOut()}>logout</button>
            </div>
        )
    }

    const CreateBlog = () => {
        return (
            <div>
                <h4>create new blog</h4>
                <form onSubmit={createBlog}>
                    <div>
                        title
                        <input type="text" required value={title} name="Title"
                                onChange={({target}) => setTitle(target.value)}/>
                    </div>
                    <div>
                        author
                        <input type="text" required value={author} name="Author"
                                onChange={({target}) => setAuthor(target.value)}/>
                    </div>
                    <div>
                        url
                        <input type="text" required value={url} name="Url"
                                onChange={({target}) => setUrl(target.value)}/>
                    </div>
                    <button type="submit">create</button>
                </form>
            </div>
        )
    }

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            setIsLogined(true)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem( 'loggedUser', JSON.stringify(user) )
            blogService.setToken(user.token)
            setUser(user)
            setIsLogined(true)
            setUsername('')
            setPassword('')
        } catch(exception) {
            console.log('exception ', exception)
            setErrorStyle(true)
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const logOut = () => {
        setUser(null)
        setIsLogined(false)
        blogService.setToken(null)
        window.localStorage.clear()
    }

    const createBlog = async (event) => {
        event.preventDefault()
        const o = { title, author, url }
        const addedBlog = await blogService.createNewBlog(o)
        setErrorMessage(`a new blog ${addedBlog.title} added`)
        setErrorStyle(false)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
        let newBlogList = [...blogs]
        newBlogList = newBlogList.concat(addedBlog)
        setBlogs(newBlogList)
    }

    return (
        <div className="App">
            <Header isLogined={isLogined} />
            <Notification message={errorMessage} />
            { isLogined ? Logout() : null }
            { isLogined ? CreateBlog() : null }
            { isLogined ? BlogList() : LoginForm() }
        </div>
    );
}

export default App;
