import React from 'react'

const Part = ({ part }) => <p>{`${part.name} ${part.excercises}`} </p>

export default ({ parts }) => <div>
    {parts.map(
        (_, i) => <Part key={i} part={_} />
    )}
</div>