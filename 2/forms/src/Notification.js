import React from 'react'
import './notification.css'

export default ({ message, className}) => message && <div className={className}>
    {message}
</div>