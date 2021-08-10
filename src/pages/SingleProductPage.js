import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SingleProductPage = () => {
  const {id} = useParams();
  const history = useHistory()
  const {
    single_product_loading: loading ,
     single_product_error:error,
      single_product:product,
       fetchSingleProduct
       } = useProductsContext()

 useEffect(()=>{
   fetchSingleProduct(`${url}${id}`)
 },[id]) 

 useEffect(()=>{
   if(error) {
     setTimeout(()=>{
history.push('/')
     },3000)
   }
 },[error])
 
 if(loading){
   return <Loading/>
 }

 if(error) {
   return <Error/>
 }

const { description , price , id:sku , qty , producer , subCategory:{description: sub, category:{description:cat}} , igredients , imageUrl} = product

  return (<Wrapper>
    <PageHero title={description} product/>   
    <div className='section section-center page'>
      <Link to='/products' className='btn'>
        Back to products
      </Link>
      <div className='product-center'>
        <ProductImages imageUrl={imageUrl}/>
        <section className='content'>
          <h2> { description }</h2>
         
          <h5 className='price'>
          <span> Price: </span>


            {price} den</h5>

          <p className='info'>
           <span> Availiability: </span>
           {qty > 0 ? 'In stock': 'Out of stock'}
          </p>
          
          <p className='info'>
          <span> Categorization : </span>
             {cat} / {sub} </p>

             {producer !== null && <p className='info'>
            <span >producer :</span> {producer.name}
          </p>}
          {igredients.length > 0 &&
          <p>
            <span className='info'>ingredients :</span>
             {igredients.map(ingredient=> <li >{ingredient.ingredient}</li>)}
          </p>}
          <hr/>
          {qty > 0 && <AddToCart product={product}/>}
        </section>
      </div>
    </div>
  </Wrapper>)
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
