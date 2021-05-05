import React from 'react'

const Container = ({children}: Props) => {
  return (
    <div className="container">
      {children}
    </div>
  )
}

interface Props {
  children: any
}

export default Container
