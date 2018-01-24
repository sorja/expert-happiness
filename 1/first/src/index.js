import React from 'react'
import ReactDOM from 'react-dom'

import Otsikko from './Otsikko'
import Sisalto from './Sisalto'
import Yhteensa from './Yhteensa'

const App = () => {
  const _sum = (key, arr) => {
    let _ = 0
    // 💤
    return arr.forEach( v => {_ += v[key]}), _
  }

  const content = [
    {
      part: 'Reactin perusteet',
      count: 10
    },
    {
      part: 'Tiedonvälitys propseilla',
      count: 7
    },
    {
      part: 'Komponenttien tila',
      count: 14
    }
  ]

  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    content
  }

  return (
    <div>
      <Otsikko title={kurssi.nimi} />
      {/* This could be just content, but I was too lazy to move
        content inside of kurssi, so I have a 'fake' constant (content),
        which shouldnt really exist, so no cheating
        ~m.sorja1/2018
      */}
      <Sisalto content={kurssi.content} />
      <Yhteensa sum={_sum('count', kurssi.content)} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

