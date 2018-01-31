import React from 'react'

export default ({ onChange, query }) =>
    <label>haku (syota numero / nimi) <input type="text" name="query" value={query} onChange={onChange} /> </label>