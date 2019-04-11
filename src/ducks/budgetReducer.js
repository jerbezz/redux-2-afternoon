import axios from 'axios'

const initialState = {
    purchases: [],
    budgetLimit: null,
    loading: false
}

const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA'
const ADD_PURCHASE = 'ADD_PURCHASE'
const DELETE_PURCHASE = 'DELETE_PURCHASE'

export function requestBudgetData(){
    let dattle = axios.get('/api/budget-data').then(res => {
        return res.data
    })
    return{
        type: REQUEST_BUDGET_DATA,
        payload: dattle
    }
}

export function addPurchase(price, description, category){
    let dattle = axios.post('/api/budget-data/purchase', {price, description, category}).then( res => {
        return res.data
    })
    return {
        type: ADD_PURCHASE,
        payload: dattle
    }
}

export function deletePurchase(id){
    let dattle = axios.delete(`/api/budget-data/purchase/${id}`, id).then( res => {
        return res.data
    })
    return {
        type: DELETE_PURCHASE,
        payload: dattle
    }
}

 export default function reducer(state = initialState, action){
     switch(action.type){
         case REQUEST_BUDGET_DATA + '_PENDING':
            return {...state, loading: true}

        case REQUEST_BUDGET_DATA + '_FULFILLED':
            return {...state, ...action.payload, loading: false}

        case ADD_PURCHASE + '_PENDING':
            return {...state, loading: true}

        case ADD_PURCHASE + '_FULFILLED':
            return {...state, purchases: action.payload, loading: false }

        case DELETE_PURCHASE + '_PENDING':
            return {...state, loading: true}

        case DELETE_PURCHASE + '_FULFILLED':
            return {...state, purchases: action.payload, loading: false }

        default:
            return state
        
     }
 }