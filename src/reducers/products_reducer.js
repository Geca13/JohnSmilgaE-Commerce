import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  GET_INGREDIENTS_BEGIN,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
  GET_SUBCATEGORIES_BEGIN,
  GET_SUBCATEGORIES_SUCCESS,
  GET_SUBCATEGORIES_ERROR
} from '../actions'

const products_reducer = (state, action) => {

  if(action.type === SIDEBAR_OPEN){
    return {...state, isSidebarOpen: true }
  }

  if(action.type === SIDEBAR_CLOSE){
    return {...state, isSidebarOpen: false }
  }

  if(action.type === GET_PRODUCTS_BEGIN){
    return {...state, products_loading:true }
  }

  if(action.type === GET_PRODUCTS_SUCCESS){
    const featured_products = action.payload
    return {...state, products_loading:false,products:action.payload, featured_products }
  }

  if(action.type === GET_PRODUCTS_ERROR){
    return {...state, products_loading:false, products_error:true }
  }

  if(action.type === GET_INGREDIENTS_BEGIN){
    return {...state, ingredients_loading: true }
  }

  if(action.type === GET_INGREDIENTS_SUCCESS){
    const ingredients = action.payload
    return {...state, ingredients_loading:false,ingredients:action.payload}
  }

  if(action.type === GET_INGREDIENTS_ERROR){
    return {...state, ingredients_loading:false, ingredients_error:true }
  }

  if(action.type === GET_SUBCATEGORIES_BEGIN){
    return {...state, subCategories_loading: true }
  }

  if(action.type === GET_SUBCATEGORIES_SUCCESS){
    const ingredients = action.payload
    return {...state, subCategories_loading:false,subCategories:action.payload}
  }

  if(action.type === GET_SUBCATEGORIES_ERROR){
    return {...state, subCategories_loading:false, subCategories_error:true }
  }

  if(action.type === GET_SINGLE_PRODUCT_BEGIN){
    return {...state, single_product_loading: true, single_product_error: false }
  }

  if(action.type === GET_SINGLE_PRODUCT_SUCCESS){
    return {...state, single_product_loading:false, single_product: action.payload }
  }

  if (action.type === CREATE_PRODUCT_SUCCESS) {
    return {
      ...state, item:action.payload,
    }
  }

  if (action.type === CREATE_PRODUCT_ERROR) {
    return { ...state, showAlert: true,
    }
  }


  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default products_reducer
