import API from "../../api"
export const INITIAL_AUTH = "INITIAL_AUTH";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";


export const loginAction = (credentials) => {
    return async (dispatch) => {
        dispatch({ type: LOGIN_REQUEST });
        try {
            const response = await API.post('/login', credentials);
            console.log("Login response: ", response.data);

            if (response.status === 200) {
                // const userData = {
                //     role: response.data.role, 
                // };
                const token = response.data.access_token;
                const user_role = response.data.role;

                if (response.data.role) {
                    if (token) {
                        localStorage.setItem("token", token);
                        localStorage.setItem("user_role", user_role);
                    }
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: {
                            user: response.data.role, 
                            message: response.data.msg,
                        }
                    });
                } else {
                    dispatch({
                        type: LOGIN_FAILURE,
                        payload: error.response?.data?.message || "Failed to login"
                      });
                }
            }
        } catch (error) {
            console.log("Login Error:", error);
            dispatch({
                type: LOGIN_FAILURE,
                payload: {
                    message: "Login Failed",
                    payload: error.response?.data?.message || "Failed to login"
                }
            });
        }
    };
};

export const initializeAuth =()=>{
    return async (dispatch)=>{
        const token = localStorage.getItem("token");
        if(token){
            try{
            dispatch({
                
                type: INITIAL_AUTH,
                payload: true
            });
        }catch(error){
            console.error("Token validation error: ",error);
            dispatch({
                type: INITIAL_AUTH,
                payload: false
            });
        }
        }else{
            dispatch({
                type: INITIAL_AUTH,
                payload: false
            });
        }
     }
}