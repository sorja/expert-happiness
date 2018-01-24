import React from 'react'

const Part = ({ content }) => <p> {`${content.part} ${content.count}`} </p>

export default ({ content }) => <div>
    {content.map(
        (_, i) => <Part key={i} content={_} />
    )}
</div>