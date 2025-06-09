export const ADD_USER_REQUEST = "ADD_USER_REQUEST";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAILURE = "ADD_USER_FAILURE";
export const FETCH_USER_ROLE_REQUEST = "FETCH_USER_ROLE_REQUEST";
export const FETCH_USER_ROLE_SUCCESS = "FETCH_USER_ROLE_SUCCESS";
export const FETCH_USER_ROLE_FAILURE = "FETCH_USER_ROLE_FAILURE";
export const SHOW_USER_REQUEST = "SHOW_USER_REQUEST";
export const SHOW_USER_SUCCESS = "SHOW_USER_SUCCESS";
export const SHOW_USER_FAILURE = "SHOW_USER_FAILURE";
import Swal from "sweetalert2";
import API from "../../api";

export const addUserAction = (userData) =>{
    return async (dispatch)=>{
        dispatch({type : ADD_USER_REQUEST});
        try{
            const response = await API.post('/register',userData);
            if(response.status === 200 || response.status === 201)
            {
                Swal.fire("User added successfully!!");
                dispatch({
                    type: ADD_USER_SUCCESS,
                    payload: response.data.message || "User added successfully"
                });
            }else{
                dispatch({
                    type: ADD_USER_FAILURE,
                    payload: response.data.message || "Oops, Failed to add user!!"
                });
            }
        }catch(error){
            console.log("Failed to add user",error);
            dispatch({
                type: ADD_USER_FAILURE,
                payload: error.response?.data?.message || "Error in adding user"
            })
        }
    };
};

export const fetchUserRoleAction = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_USER_ROLE_REQUEST });
        try {
            const response = await API.get('/getRoles');
            if (response.data && Array.isArray(response.data)) {
                dispatch({
                    type: FETCH_USER_ROLE_SUCCESS,
                    payload: response.data 
                });
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            console.log("Error in fetching user roles", error);
            dispatch({
                type: FETCH_USER_ROLE_FAILURE,
                payload: error.response?.data?.message || "Error while fetching data"
            });
        }
    };
};

export const showUserAction = () =>{
    return async (dispatch) =>{
      dispatch({type: SHOW_USER_REQUEST});
      try{
        const response = await API.get("/getUsersList");
        if(response.data && Array.isArray(response.data)){
          dispatch({
            type: SHOW_USER_SUCCESS,
            payload: response.data
          });

        }
        else{
          throw new Error('Invalid data format');
        }
      }
      catch(error){
        console.error('Fetch Users Error:', error);
        dispatch({
          type: SHOW_USER_FAILURE,
          payload: error.response?.data?.message 
        });
      }
    }
  }