import React from 'react'

export default ({ parts }) =>
    <p>{`Total of
     ${parts
        .map( p => p.excercises )
        .reduce( (a,b) => a+b )} excercises`}</p>