import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'


import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_INGREDIENTS_BEGIN,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
} from '../actions'

const products_url = '/api/items'
const allIngredients = `/api/allIngredients`
const new_product = '/api/newItem'

const initialState = {
  isSidebarOpen: false,
  products_loading:false,
  products_error:false,
  products:[],
  ingredients_loading:false,
  ingredients:false,
  ingredients:[],
  featured_products:[],
  single_product_loading : false,
  single_product_error : false,
  single_product : {}
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const openSidebar = () =>{
    dispatch({type: SIDEBAR_OPEN}) 
  }

  const closeSidebar = () =>{
    dispatch({type: SIDEBAR_CLOSE}) 
  }

  const fetchProducts = async(products_url) => {
    dispatch({type:GET_PRODUCTS_BEGIN})
    try {
      const response = await axios.get('/api/items')
      const products = response.data
      dispatch({type:GET_PRODUCTS_SUCCESS,payload:products})
    } catch (error) {
      dispatch({type: GET_PRODUCTS_ERROR})
    }
   }

   const fetchIngredients = async(url) => {
    dispatch({type:GET_INGREDIENTS_BEGIN})
    try {
      const response = await axios.get('/api/allIngredients')
      const ingredients = response.data
      dispatch({type:GET_INGREDIENTS_SUCCESS,payload:ingredients})
    } catch (error) {
      dispatch({type: GET_INGREDIENTS_ERROR})
    }
   }
  
   const fetchSingleProduct = async (single_product_url) => {
     dispatch({type:GET_SINGLE_PRODUCT_BEGIN})
     try {
      const response = await axios.get('/api/item/')
      const singleProduct = response.data;
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct})
     } catch (error) {
       dispatch({type:GET_SINGLE_PRODUCT_ERROR})
     }
   }



   const newProduct = async (userInput) => {
    
    try {
      const { data } = await axios.post(`/api/newItem`, {
        ...userInput,
      })

      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data.item })
     
    } catch (error) {
      dispatch({ type: CREATE_PRODUCT_ERROR})
    }
  }


  useEffect(()=>{
    fetchIngredients(allIngredients )
  },[])

  useEffect(()=>{
    fetchProducts(products_url)
  },[])
  
  return (
    <ProductsContext.Provider value={{...state, openSidebar, closeSidebar, fetchSingleProduct, newProduct}}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
