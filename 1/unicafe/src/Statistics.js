import React from 'react'

const _ = ['good', 'neutral', 'bad', 'avg', 'pos']
// zzz
const _avg = _ => _['good'] * 1 + _['bad'] * (-1) / _['total']
const _pos = _ => _['good'] / _['total']

const _value = (text, statistics) =>
    text === 'avg' ? _avg(statistics) :
        text === 'pos' ? ~~(_pos(statistics) * 100) +'%' :
            statistics[text]

const Statistic = ({ text, statistics }) => <tr>
    <th> {text.charAt(0).toUpperCase() + text.slice(1)} </th>
    <td> {_value(text, statistics)} </td>
</tr>


export default ({ statistics }) => <table>
    <tbody>
        {_.map(
            (v, i) => <Statistic key={i} text={v} statistics={statistics} />
        )}
    </tbody>
</table>