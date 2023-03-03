import React, { useEffect, useState } from 'react'
import PurchaseCard from '../components/Purchases/PurchaseCard'
import { axiosEcomerce, getConfig } from '../utils/configAxios'
import "./styles/Purchases.css"

const Purchases = () => {

  const [purchases, setPurchases] = useState([])

  useEffect(() => {
    axiosEcomerce
      .get("/purchases", getConfig())
      .then((res) => setPurchases(res.data))
      .catch((err) => console.log(err))
  }, [])

  
  return (
    <main className='purchases'>
      <section className='purchases__container'>
        <section className='purchases__containerText'>
          <h3 className='purchases__title'>My Purchases</h3>
          <section className='purchases__card'>
            {purchases.map((purchase) =>(
              <PurchaseCard key={purchase} purchase={purchase} />
            ))}
          </section>
        </section>
      </section>
    </main>
  )
}

export default Purchases