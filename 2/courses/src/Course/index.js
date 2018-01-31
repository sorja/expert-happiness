import React from 'react';

import Title from './Title'
import Content from './Content'
import Total from './Total'

export default ({ course }) => <div>
        <Title title={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>