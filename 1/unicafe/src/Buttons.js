import React from 'react'

export default ({ onClick }) => <div>
    <button name='good' onClick={onClick}> Good </button>
    <button name='neutral' onClick={onClick}> Neutral </button>
    <button name='bad' onClick={onClick}> Bad </button>
</div>