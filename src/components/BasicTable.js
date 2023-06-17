import React, { useState, useEffect } from 'react'
import axios from 'axios'

function BasicTable() {
    const [posts, setPost] = useState([])
    const [search, setSearch] = useState('react')
    const [searchFromButtonClick, setSearchFromButtonClick] = useState('')

    const handleClick = () => {
        setSearchFromButtonClick(search)
    }

    useEffect(() => {
        axios
            .get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyAQyAHsbuTgTIKQ5MVGrLMCZ4uIg8u21-A`)
            .then(response => {
                console.log(response)
                setPost(response.data.items)
                console.log(response.data.items[0].volumeInfo.title)
            })
            .catch(err => {
                console.log(err)
            })
    }, [searchFromButtonClick])
    
    return (
        <div>
            <input type='text' placeholder='What book you Are looking for?'value={search} onChange={e => setSearch(e.target.value)} />
            <button type='button' onClick={handleClick}>Search</button>
            
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Subtitle</th>
                        <th>Author</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                        {posts.map(post => (
                        <tr>
                            <td key={post.id}>{post.volumeInfo.title}</td>
                            <td key={post.id}>{post.volumeInfo.subtitle}</td>
                            <td key={post.id}>{post.volumeInfo.authors[0]}<br></br>{post.volumeInfo.authors[1]}</td>
                            <td key={post.id}>{post.volumeInfo.id}</td>
                        </tr>))
                        }
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                    </tr>
                </tfoot>
            </table> 
            <ul>
                {posts.map(post => (
                    <li key={post.accessInfo.id}>{post.volumeInfo.title}</li>))
                }
            </ul>

        </div>
    )
}

export default BasicTable