import React, { useEffect, useState } from 'react'
import ProductCard from '../components/Home/ProductCard'
import { axiosEcomerce } from '../utils/configAxios'
import "./styles/Home.css"

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameProduct = e.target.nameProduct.value;
    setNameFilter(nameProduct);
  };

  useEffect(() => {
    axiosEcomerce
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axiosEcomerce
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const newProductsByName = products.filter((product) =>
      product.title.toLowerCase().includes(nameFilter.toLowerCase())
    );
    if (categoryFilter) {
      const newProductsByCategory = newProductsByName.filter(product => product.categoryId === categoryFilter)
      setFilterProducts(newProductsByCategory)
    }else{
      setFilterProducts(newProductsByName)
    }
  }, [nameFilter, products, categoryFilter]);
  


  return (
    <main className='home'>
      <form className='home__form' onSubmit={handleSubmit} >
        <div className='home__search'>
          <input className='home__input' placeholder='What are you looking for?' id='nameProduct' type="text" />
          <button className='home__btn'><i className='bx bx-search'></i></button>
        </div>
        <div className='home__category'>
          <h3 className='home__categoryTitle'>Categories<i className='bx bxs-chevron-down'></i></h3>
          <ul className='home__categoryList'>
            <li className='home__categoryLi' onClick={()=> setCategoryFilter(0)}>All</li>
            {categories.map(category => (              
            <li className='home__categoryLi' onClick={()=> setCategoryFilter(category.id)} key={category.id}>{category.name}</li>
            ))}
          </ul>
        </div>
      </form>

      <section className='home__listProducts'>
        {filterProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  )
}

export default Home