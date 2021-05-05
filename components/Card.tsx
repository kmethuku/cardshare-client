import React from 'react'

const Card = ({children, option}: Props) => {
  if (option === undefined) {
    return (
      <div className="card">
        {children}
      </div>
    )
  } else {
    return (
      <div className={`card${option}`}>
        {children}
      </div>
    )
  }
}

interface Props {
  children: any,
  option?: string,
}

export default Card
