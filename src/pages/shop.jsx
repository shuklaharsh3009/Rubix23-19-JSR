import React, { useState, useEffect } from 'react'
import AddButtons from '../components/add_buttons'
import { useFirebase } from '../context/firebase';
import ProductCard from '../components/card';
import { Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Shop = () => {
   const firebase = useFirebase();
   const [products, setProducts] = useState([]);

   useEffect(() => {
      firebase.ListAllProducts().then((products) => setProducts(products.docs));
   }, []);

   return (
      <div>
         {firebase.isFarmer ? <AddButtons /> : null}
         <div className='mt-3 d-flex justify-content-center'>
            {
               products.map(
                  (product) => (
                     <>
                        {product.data().boughtBy === "" ? <ProductCard key={product.id} {...product.data()} /> : null}
                     </>
                  )
               )
            }

         </div>
      </div>
   )
}

export default Shop;