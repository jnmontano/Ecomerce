import React from 'react'
import { formatDateDDMMYYYY } from '../../utils/date'
import './style/PurchaseCard.css'

const PurchaseCard = ({ purchase }) => {
  return (
    <article className="purchaseCard">
      <div className="purchaseCard__containerImg">
        <div className="purchaseCard__img">
          <img src={purchase.product.images[0].url} alt="" />
        </div>
        <h4 className="purchaseCard__title">{purchase.product.title}</h4>
      </div>

      <div className="purchaseCard__containerInfo">
        <h4 className="purchaseCard__DDMMYYYY">{formatDateDDMMYYYY(purchase.createdAt)}</h4>
        <div className="purchaseCard__containerQuantity">
          <h4 className="purchaseCard__quantity">{purchase.quantity}</h4>
        </div>
            <h4 className="purchaseCard__price">${purchase.product.price}</h4>
      </div>
    </article>
  );
}

export default PurchaseCard