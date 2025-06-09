export const ADD_INVENTORY_REQUEST = "ADD_INVENTORY_REQUEST";
export const ADD_INVENTORY_SUCCESS = "ADD_INVENTORY_SUCCESS";
export const ADD_INVENTORY_FAILURE = "ADD_INVENTORY_FAILURE";
export const FETCH_CATEGORIES_REQUEST = "FETCH_CATEGORIES_REQUEST";
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_FAILURE = "FETCH_CATEGORIES_FAILURE";
export const FETCH_SUBCATEGORIES_REQUEST = "FETCH_SUBCATEGORIES_REQUEST";
export const FETCH_SUBCATEGORIES_SUCCESS = "FETCH_SUBCATEGORIES_SUCCESS";
export const FETCH_SUBCATEGORIES_FAILURE = "FETCH_SUBCATEGORIES_FAILURE";
export const VALIDATE_SKU_REQUEST = 'VALIDATE_SKU_REQUEST';
export const VALIDATE_SKU_SUCCESS = 'VALIDATE_SKU_SUCCESS';
export const VALIDATE_SKU_FAILURE = 'VALIDATE_SKU_FAILURE';
export const GET_INVENTORIES_REQUEST = "GET_INVENTORIES_REQUEST";
export const GET_INVENTORIES_SUCCESS = "GET_INVENTORIES_SUCCESS";
export const GET_INVENTORIES_FAILURE = "GET_INVENTORIES_FAILURE";
// export const GET_SINGLE_INVENTORY_SUCCESS = "GET_SINGLE_INVENTORY_SUCCESS";
// export const GET_SINGLE_INVENTORY_REQUEST = "GET_SINGLE_INVENTORY_REQUEST";
// export const GET_SINGLE_INVENTORY_FAILURE = "GET_SINGLE_INVENTORY_FAILURE";
export const DELETE_INVENTORY_REQUEST = "DELETE_INVENTORY_REQUEST";
export const DELETE_INVENTORY_SUCCESS = "DELETE_INVENTORY_SUCCESS";
export const DELETE_INVENTORY_FAILURE = "DELETE_INVENTORY_FAILURE";
export const UPDATE_PRODUCT_REQUEST = "UPDATE_INVENTORY_REQUEST";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_FAILURE = "UPDATE_INVENTORY_FAILURE";
export const FETCH_STOCK_STATUS_REQUEST = "FETCH_STOCK_STATUS_REQUEST";
export const FETCH_STOCK_STATUS_SUCCESS = "FETCH_STOCK_STATUS_SUCCESS";
export const FETCH_STOCK_STATUS_FAILURE = "FETCH_STOCK_STATUS_FAILURE";
export const UPDATE_INVENTORY_FAILURE = "UPDATE_INVENTORY_FAILURE";
export const UPDATE_INVENTORY_REQUEST = "UPDATE_INVENTORY_REQUEST";
export const UPDATE_INVENTORY_SUCCESS = "UPDATE_INVENTORY_SUCCESS";
import Swal from "sweetalert2";
import API from "../../api";

export const addInventoryAction = (inventoryData) =>{
    return async (dispatch) =>{
        dispatch({type: ADD_INVENTORY_REQUEST});
        try{
            const response = await API.post ("/addProduct",inventoryData,{
              headers: {
                'Content-Type': 'multipart/form-data'
              }});
            if(response.status === 200 || response.status === 201)
            {
                Swal.fire("Inventory added successfully");
                dispatch({
                    type: ADD_INVENTORY_SUCCESS,
                    payload: response.data
                });
            }else{
                dispatch({
                    type: ADD_INVENTORY_FAILURE,
                    payload: response.data.message || "Failed to add inventory"
                });
            }
        }catch(error){
            console.log("Error in adding inventory",error);
            dispatch({
                type: ADD_INVENTORY_FAILURE,
                payload: error.response?.data?.message || "Error in adding inventory"
            });
        }
    };
};

export const fetchCategories = () => {
    return async (dispatch) => {
      dispatch({ type: FETCH_CATEGORIES_REQUEST });
      try {
        const response = await API.get('/getCategories');
        ('Categories fetched:', response.data); 
        if (response.data && Array.isArray(response.data)) {
          dispatch({
            type: FETCH_CATEGORIES_SUCCESS,
            payload: response.data
          });
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Fetch Categories Error:', error);
        dispatch({
          type: FETCH_CATEGORIES_FAILURE,
          payload: error.response?.data?.message || 'Failed to fetch categories.'
        });
      }
    };
  };

  export const fetchSubcategories = (id) => {
    return async (dispatch) => {
      dispatch({ type: FETCH_SUBCATEGORIES_REQUEST });
      try {
        const response = await API.get(`/getSubCategories?id=${id}`);
        // console.log('Subcategories fetched:', response.data); 
        if (response.data && Array.isArray(response.data)) {
          dispatch({
            type: FETCH_SUBCATEGORIES_SUCCESS,
            payload: response.data
          });
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Fetch Subcategories Error:', error);
        dispatch({
          type: FETCH_SUBCATEGORIES_FAILURE,
          payload: error.response?.data?.message || 'Failed to fetch subcategories.'
        });
      }
    };
  };

  export const validateSKU = (sku) => {
    return async (dispatch) => {
        dispatch({ type: VALIDATE_SKU_REQUEST });
        try {
            const response = await API.post('/validateSKU', { sku });
            if (response.data && response.data.flag) {
                dispatch({
                    type: VALIDATE_SKU_SUCCESS,
                    payload: response.data,
                    status: response.status
                });
            } else if (response.data && !response.data.flag) {
              Swal.fire('SKU already exists');
                dispatch({
                    type: VALIDATE_SKU_FAILURE,
                    payload: response.data.msg || 'SKU already exists', 
                    status: response.status
                });
            } else {
                dispatch({
                    type: VALIDATE_SKU_FAILURE,
                    payload: 'Failed to validate SKU. Please try again.',
                    status: response.status
                });
            }
        } catch (error) {
            console.error('SKU Validation Error:', error);
            const errorMessage = error.response?.data?.message || 'Failed to validate SKU. Please try again.';
            dispatch({
                type: VALIDATE_SKU_FAILURE,
                payload: errorMessage,
                status: error.response?.status || 500
            });
        }
    };
  };
  
  export const getInventoriesAction = () =>{
    return async (dispatch) =>{
      dispatch({ type: GET_INVENTORIES_REQUEST});
      try{
        const response = await API.get("/getAllProducts");
        if (response.data && Array.isArray(response.data)){
          dispatch({
            type: GET_INVENTORIES_SUCCESS,
            payload: response.data
          });
        }else{
          throw new Error('Invalid data format');
        } 
      }catch (error){
        console.error('Fetch Products Error:', error);
        dispatch({
          type: GET_INVENTORIES_FAILURE,
          payload: error.response?.data?.message || 'Failed to fetch inventories.'
        });
      }
    };
  };

  // export const getSingleInventoryAction = (sku) =>{
  //   return async (dispatch) =>{
  //     dispatch({ type: GET_SINGLE_INVENTORY_REQUEST});
  //     try{
  //       const response = await API.get("/productDetails",{
  //         params: { sku }});
  //       if (response.data && Array.isArray(response.data)){
  //         dispatch({
  //           type: GET_SINGLE_INVENTORY_SUCCESS,
  //           payload: response.data
  //         });
  //       }else{
  //         throw new Error('Invalid data format');
  //       } 
  //     }catch (error){
  //       console.error('Fetch Products Error:', error);
  //       dispatch({
  //         type: GET_SINGLE_INVENTORY_FAILURE,
  //         payload: error.response?.data?.message || 'Failed to fetch inventories.'
  //       });
  //     }
  //   };
  // };

  export const deleteInventoryAction = (sku) => {
    return async (dispatch) => {
      dispatch({ type: DELETE_INVENTORY_REQUEST });
      try {
        const response = await API.delete(`/deleteItem`, {
          params: { sku } 
        });
        if (response.status === 200 || response.status === 204) {
          Swal.fire("Item deleted successfully")
          dispatch({
            type: DELETE_INVENTORY_SUCCESS,
            payload: sku
          });
        } else {
          dispatch({
            type: DELETE_INVENTORY_FAILURE,
            payload: response.data.message || 'Failed to delete inventory'
          });
        }
      } catch (error) {
        console.error('Delete Inventory Error:', error);
        dispatch({
          type: DELETE_INVENTORY_FAILURE,
          payload: error.response?.data?.message || 'Failed to delete inventory. Please try again.'
        });
      }
    };
  };

    export const updateProductAction = (sku, inventoryData) => {
      return async (dispatch) => {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });
        try {
          const response = await API.put(`/updateProduct`, inventoryData, {
            params: { sku },
            headers: {
              'Content-Type': 'multipart/form-data'
            } 
          });
          
          if (response.status === 200 || response.status === 204) {
            Swal.fire('Item updated successfully');
            dispatch({
              type: UPDATE_PRODUCT_SUCCESS,
              payload: {sku}
            });
          } else {
            dispatch({
              type: UPDATE_PRODUCT_FAILURE,
              payload: response.data.message || 'Failed to update inventory'
            });
          }
        } catch (error) {
          console.error('Update Inventory Error:', error);
          dispatch({
            type: UPDATE_PRODUCT_FAILURE,
            payload: error.response?.data?.message || 'Failed to update inventory. Please try again.'
          });
        }
      };
    };

    export const fetchStockStatusAction = () => {
      return async (dispatch) => {
        dispatch({ type: FETCH_STOCK_STATUS_REQUEST });
        try {
          const response = await API.get('/stock_type');
          ('Stock Status fetched:', response.data); 
          if (response.data && Array.isArray(response.data)) {
            dispatch({
              type: FETCH_STOCK_STATUS_SUCCESS,
              payload: response.data
            });
          } else {
            throw new Error('Invalid data format');
          }
        } catch (error) {
          console.error('Fetch Stock Status Error:', error);
          dispatch({
            type: FETCH_STOCK_STATUS_FAILURE,
            payload: error.response?.data?.message || 'Failed to fetch stock status.'
          });
        }
      };
    };

    export const manageInventoryAction = (inventoryData) => {
      return async (dispatch) =>{
        dispatch({type: UPDATE_INVENTORY_REQUEST});
        try{
            const response = await API.put ("/updateInventory",inventoryData);
            if(response.status === 200 || response.status === 204){
                Swal.fire("Inventory updated successfully");
                dispatch({
                    type: UPDATE_INVENTORY_SUCCESS,
                    payload: response.data
                });
            }
            else{
              dispatch({
                type: UPDATE_INVENTORY_FAILURE,
                payload: response.data.message || "Failed to update inventory"
              });
            }
        }catch(error){
            console.log("Error in updating inventory", error);
            dispatch({
                type: UPDATE_INVENTORY_FAILURE,
                payload: error.response?.data?.message 
            });
        };
      }
    }

    