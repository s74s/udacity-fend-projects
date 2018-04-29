import React from 'react'
import { Link } from 'react-router-dom'

export default function NavButton(props) {
  const { pathname } = props.location
  const isRoot = pathname === '/'
  const to = isRoot ? '/search' : '/'
  const name = isRoot ? 'To Search List' : 'To Home'
  return (
    <Link to={to} className="nav-button" >
      {name}
    </Link>
  )
}
