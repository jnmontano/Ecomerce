import React from 'react'
import { useSelector } from 'react-redux'
import "./style/Notification.css"

const Notification = () => {
    const {error} = useSelector(store => store.cart)

  return (
    <article className={`notification ${error ? "active" : "" }`}>
        <h3 className='notification__text'>This product already added your cart </h3>
    </article>
  )
}

export default Notification