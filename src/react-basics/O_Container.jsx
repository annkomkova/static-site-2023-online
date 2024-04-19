import React from 'react'

import A_Title from './A_Title.jsx'
import M_Card from './M_Card.jsx'

const workshops = [
  { date: '15 apr 2024', title: 'React basics for 08 group' },
  { date: '15 apr 2024', title: 'React basics for 09 group' },
  { date: '19 apr 2024', title: 'React basics for online group' }
]

export default class O_Container extends React.Component {
  render() {
    const cards = workshops.map((workshop) => {
      return <M_Card title={workshop.title} description={workshop.date} />
    })
    return (
      <div className="O_Container">
        <A_Title title="Schedule" />
        {cards}
      </div>
    )
  }
}
