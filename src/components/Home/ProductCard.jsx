import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useNavigation, useNavigationType } from 'react-router-dom'
import { addProductsCart } from '../../store/slice/cart.slice'
import "./styles/ProductCard.css"

const ProductCard = ({product}) => {  
    const navigate = useNavigate()
    
    const dispatch = useDispatch()

    const handleClickProduct = () => {
        navigate(`/products/${product.id}`)
    }

    const handleClickAddProduct = (e) =>{
        e.stopPropagation();
        const data = {
            quantity: 1,
            productId: product.id
        }
        addProductsCart(data)
    }

    return (
    <article className='productCart' onClick={handleClickProduct}>
        <header className='productCart__header'>
            <div className='productCart__img'>
                <img src={product.images[0].url} alt="" />
                <img src={product.images[1].url} alt="" />
            </div>
        </header>

        <section className='productCart__info'>
            <h4 className='productCart__brand'>{product.brand}</h4>
            <h3 className='productCart__title'>{product.title}</h3>

            <h4 className='productCart__priceTitle'>Price</h4>
            <h3 className='productCart__price'>$ {product.price}</h3>
            <button className='productCart__btn' onClick={handleClickAddProduct}><i className='bx bx-cart'></i></button>
        </section>
    </article>
  )
}

export default ProductCard