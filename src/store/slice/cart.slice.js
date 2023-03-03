import { createSlice} from "@reduxjs/toolkit";
import { axiosEcomerce, getConfig } from "../../utils/configAxios";

const initialState = {
    products: [],
    error: false
}

const cartSlice = createSlice ({
    name: "cart",
    initialState,
    reducers:{
        setProductsCartGlobal: (state, action) => {
            return {...state, products: action.payload}
        },
        setChangeErrorStatus: (state) => {
            return {...state, error:!state}
        }
    },
})

export const {setProductsCartGlobal,setChangeErrorStatus} = cartSlice.actions

export const getAllCartProducts = () => (dispatch) => {
  axiosEcomerce
    .get("/cart", getConfig())
    .then((res) => dispatch(setProductsCartGlobal(res.data)))
    .catch((err) => console.log(err));
};

export const addProductsCart = (data) => (dispatch) => {
  axiosEcomerce
    .post("/cart", data, getConfig())
    .then((res) => dispatch(getAllCartProducts()))
    .catch((err) => {
        console.log(err)
        if(err.response.data?.error === "Product Already "){
            dispatch(setChangeErrorStatus)
            setTimeout(() => {
                dispatch(setChangeErrorStatus())
                
            },1000)
        }
    });
};

export const deleteProductCart = (id) => (dispatch) => {
    axiosEcomerce
    .delete(`/cart/${id}`,getConfig())
    .then((res) => dispatch(getAllCartProducts()))
    .catch((err) => console.log(err))
    }

export const updateProductCart = (id, data) => (dispatch) => {
    axiosEcomerce.put(`/cart/${id}`,data,getConfig())
        .then((res) => dispatch(getAllCartProducts()))
        .catch((err) => console.log(err))

}

export const purchaseCart = () => (dispatch) => {
    axiosEcomerce.post("/purchases",{}, getConfig())
    .then((res) => dispatch(setProductsCartGlobal([])))
    .catch((err) => console.log(err))
}

export default cartSlice.reducer
