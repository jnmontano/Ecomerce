import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartProduct from '../components/Cart/CarProduct'
import { getAllCartProducts, purchaseCart } from '../store/slice/cart.slice'

const Cart = () => {
  const {products} = useSelector(store => store.cart)
  
  const dispatch = useDispatch()

  const totalPrice = products.reduce(
    (total,product) => total + product.quantity * product.product.price,0
  )

  const handlePurchaseCart = () => {
    dispatch(purchaseCart())
  }

  useEffect(() => {    
    dispatch(getAllCartProducts())
  },[])
  
  return (
    <main>
      <section>
        {products.map((product) => <CartProduct key={product.id} product = {product}/> )}
      </section>
      <hr />
      <section>
        <div>
          <h3>Total</h3>
          <h3>{totalPrice}</h3>          
        </div>
        <button onClick={handlePurchaseCart}>ChelOut</button>
      </section>

    </main>
  );
}

export default Cart