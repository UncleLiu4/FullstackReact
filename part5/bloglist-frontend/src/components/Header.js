import React from 'react'

const Header = ({ isLogined }) => {
    const title = isLogined ? 'blog list' : 'log in to application'
    return (
        <h4>{title}</h4>
    )
}

export default Header
