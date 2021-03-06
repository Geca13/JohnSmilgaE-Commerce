import React, { useState } from 'react'
import { useProductsContext } from '../context/products_context'
import styled from 'styled-components'
import { PageHero } from '../components'



const NewProduct = () => {

  const [values, setValues] = useState({
    id:'',
    imageUrl:'',
    qty:'',
     description: '',
      price: '',
      producer:{
        id: '',
        name :''
      },
      subCategoryName:'',
      
      igredients:[]
 })

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const { products , newProduct, ingredients, subCategories } = useProductsContext();

  let productId = products.length +1
  console.log(productId);

  const handleSubmit = (e) => {
    e.preventDefault()
    const {id, description , price, imageUrl, subCategory:{subCategoryName}  } = values
    if (description && price && id ) {
      newProduct(values)
      setValues({ 
        id: '',
        description: '',
      price: '',
      qty:'',
      imageUrl: '',
      producer:{
        id: '',
        name :''
      },
      subCategoryName:'',

      igredients:[]
      })
    }
  }

    console.log(subCategories)
    
    
 /*
    const subCategories = [];
    products.map(sub =>{
    if(subCategories.indexOf(sub.subCategory.subCategoryName) === -1){
      subCategories.push(sub.subCategory.subCategoryName)
    }
  }) 
  
  const producers = [" "];
  products.map(sub =>{
    if(sub.producer !== null && producers.indexOf(sub.producer.name) === -1){
        producers.push(sub.producer.name)
    }
  }) 
 
  */
    return (
      <main>
      <PageHero title='Add new Product' />
        <Wrapper>

          <div className='content'>
          <form onSubmit={(e)=>e.preventDefault()} onSubmit={handleSubmit}>
             <div className='form-control'>
               <input
                type='name'
                 name='description'
                  value={values.description}
                   placeholder='description' 
                   onChange={handleChange} />
             </div>

             <div className='form-control'>
              <input type='name'
               name='price'
                value={values.price}
                onChange={handleChange}
                  placeholder='price' />
             </div>

             <div className='form-control'>
             <input
                type='name'
                 name='id'
                  value={values.id}
                   placeholder='id' 
                   onChange={handleChange} />
             </div>

             <div className='form-control'>
             <input
                type='name'
                 name='imageUrl'
                  value={values.imageUrl}
                   placeholder='link to image' 
                   onChange={handleChange} />
             </div>

             <div className='form-control'>
             <input
                type='name'
                 name='qty'
                  value={values.qty}
                   placeholder='qty' 
                   onChange={handleChange} />
             </div>
 
             <div className='form-control'>
           <h5>Category</h5>
           <select name='subCategory'
            value={values.subCategoryName} 
             className='category' 
             onChange={handleChange}>
            {subCategories.map(({subCategoryName, id}, index) =>{
              return <option key={index} value={subCategoryName} > {subCategoryName}</option>

            })}
           </select>
         
         </div>
         {/*
         <div className='form-control'>
           <h5>Producer</h5>
           <select name='category'  className='category' >
            {producers.map((category, index) =>{
              return <option key={index} value={category} > {category}</option>
            })}
           </select>
         
         </div>
*/}
         <div>
          <h3>Select ingredients</h3>
          <ul > 
           {ingredients.map(({ingredient, id}, index) => {
              return (
                <li key={index}>
                  <label>{id} {ingredient} </label>
                  <input
                    type="checkbox" /> 
                    
                    
                </li>
              )
           })}
              
          </ul>
     
         </div>
          
         <button type='submit'>submit</button>
          </form>
            </div>
            
        </Wrapper>
        </main>
    )
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .category {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`
export default NewProduct
