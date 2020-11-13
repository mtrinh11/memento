import React from 'react';
import '../styles/HomePage.css'

export default ({children}) => {
    return (
        <div>
            <div className='example'><img src="https://i.imgur.com/qis7XxY.jpeg"></img><p>sd  f</p>a</div>
            <div className='example'>asdf</div>
            <div className='example'>asdf</div>
            <div className='example'>asdf</div>
            {children}  
        </div>
        
    )
}