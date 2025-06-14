import { 
    ADD_USER_FAILURE,
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    FETCH_USER_ROLE_REQUEST,
    FETCH_USER_ROLE_FAILURE,
    FETCH_USER_ROLE_SUCCESS,
    SHOW_USER_SUCCESS,
    SHOW_USER_REQUEST,
    SHOW_USER_FAILURE } from "../actions/addUserAction";
import{
    INITIAL_AUTH, 
    LOGIN_FAILURE, 
    LOGIN_SUCCESS, 
    LOGIN_REQUEST,
    LOGOUT
} from "../actions/loginAction";

const initialState = {
    isAuthenticated : null,
    loading : false,
    error: null,
    message: null,
    user : null,
    roles: [],
    users: []
}

const loginReducer = (state = initialState, action) => {
    // console.log("Action dispatched:", action);
    // console.log("Previous state:", state);

    let newState; 

    switch (action.type) {
        case INITIAL_AUTH:
            newState = {
                ...state,
                user: {
                    ...state.user,
                    isAuthenticated: action.payload
                }
            };
            break;

        case LOGIN_REQUEST:
            newState = {
                ...state,
                loading: true,
                error: null,
                message: null,
                user: null,
                isAuthenticated: false,
            };
            break;

        case LOGIN_SUCCESS:
            newState = {
                ...state,
                loading: false,
                error: null,
                message: action.payload.message,
                isAuthenticated: true, 
                user: action.payload.user
            };
            break;

        case LOGIN_FAILURE:
            newState = {
                ...state,
                loading: false,
                error: action.payload,
                message: null,
                isAuthenticated: false,
                user: null
            };
            break;

        case LOGOUT: 
            newState = {
                ...state,
                isAuthenticated: false,
                loading: false,
                error: null,
                message: null,
                user: null,
                roles: [],
                users: []
            };
            break;

        case FETCH_USER_ROLE_REQUEST:
            newState = {
                ...state,
                loading: true,
                error: null,
                message: null
            };
            break;

        case FETCH_USER_ROLE_SUCCESS:
            newState = {
                ...state,
                loading: false,
                roles: action.payload,
                error: null,
                message: action.payload.message
            };
            break;

        case FETCH_USER_ROLE_FAILURE:
            newState = {
                ...state,
                loading: false,
                error: action.payload,
                message: null
            };
            break;

        case ADD_USER_REQUEST:
            newState = {
                ...state,
                loading: true,
                error: null,
                message: null
            };
            break;

        case ADD_USER_SUCCESS:
            newState = {
                ...state,
                loading: false,
                message: action.payload.message,
                error: null
            };
            break;

        case ADD_USER_FAILURE:
            newState = {
                ...state,
                loading: false,
                error: action.payload,
                message: null
            };
            break;
        
        case SHOW_USER_REQUEST:
            newState = {
                ...state,
                loading: true,
                error: null,
                message: null
            };
            break;

        case SHOW_USER_SUCCESS:
            newState = {
                ...state,
                loading: false,
                users: action.payload,
                error: null,
                message: action.payload.message
            };
            break;
        
        case SHOW_USER_FAILURE:
            newState = {
                ...state,
                loading: false,
                error: action.payload,
                message: null
            };
            break;
            
        default:
            newState = state; 
    }

    console.log("New state:", newState); 
    return newState; 
};

export default loginReducer;

