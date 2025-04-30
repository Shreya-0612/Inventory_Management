import {
    FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_SUBCATEGORIES_FAILURE,
    FETCH_SUBCATEGORIES_REQUEST,
    FETCH_SUBCATEGORIES_SUCCESS,
    GET_INVENTORIES_REQUEST,
    GET_INVENTORIES_SUCCESS,
    GET_INVENTORIES_FAILURE,
    // GET_SINGLE_INVENTORY_FAILURE,
    // GET_SINGLE_INVENTORY_REQUEST,
    // GET_SINGLE_INVENTORY_SUCCESS,
    ADD_INVENTORY_FAILURE,
    ADD_INVENTORY_REQUEST,
    ADD_INVENTORY_SUCCESS,
    DELETE_INVENTORY_FAILURE,
    DELETE_INVENTORY_REQUEST,
    DELETE_INVENTORY_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    FETCH_STOCK_STATUS_FAILURE,
    FETCH_STOCK_STATUS_REQUEST,
    FETCH_STOCK_STATUS_SUCCESS,
    UPDATE_INVENTORY_FAILURE,
    UPDATE_INVENTORY_REQUEST,
    UPDATE_INVENTORY_SUCCESS,
    VALIDATE_SKU_REQUEST,
    VALIDATE_SKU_SUCCESS,
    VALIDATE_SKU_FAILURE
} from "../actions/addInventoryAction";

const initialState = {
    inventories: [],
    message: null,
    error: null,
    loading: false,
    categories: [],
    subcategories: [],
    inventory: [],
    stockStatus: []
};

const inventoryReducer = (state = initialState,action) =>{
    switch(action.type){
        case ADD_INVENTORY_REQUEST:
            return{
                ...state,
                loading: true,
                error: null,
                message: null
            };

        case ADD_INVENTORY_SUCCESS:
            return{
                ...state,
                loading: false,
                error: null,
                message: "Inventory added successfully",
                inventories: [...state.inventories,action.payload]
            };
        
        case ADD_INVENTORY_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.payload,
                message: null
            };

        case FETCH_CATEGORIES_REQUEST:
            return{
                ...state,
                loading: true,
                error: null,
                message: null
            };
        
        case FETCH_CATEGORIES_SUCCESS:
            return{
                ...state,
                loading: false,
                error: null,
                message: action.payload.message,
                categories: action.payload
            };

        case FETCH_CATEGORIES_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.payload,
                message: null
            };

        case FETCH_SUBCATEGORIES_REQUEST:
            return{
                ...state,
                loading: true,
                error: null,
                message: null
            };

        case FETCH_SUBCATEGORIES_SUCCESS:
            return{
                ...state,
                loading: false,
                error: null,
                message: action.payload.message,
                subcategories: action.payload
            };

        case FETCH_SUBCATEGORIES_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.payload,
                message: null
            };
        
        case VALIDATE_SKU_FAILURE: 
            return {
                ...state,
                loading: false,
                error: action.payload, 
                message: null 
            };

        case VALIDATE_SKU_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                message: action.payload.message
            };

        case VALIDATE_SKU_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: null
            };

        case GET_INVENTORIES_REQUEST:
            return{
                ...state,
                loading: true,
                error: null,
                message: null,
                inventories: []
            }
        
        case GET_INVENTORIES_SUCCESS:
            return{
                ...state,
                loading: false,
                error: null,
                message: action.payload.message,
                inventories: action.payload
            }
        
        case GET_INVENTORIES_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.payload,
                message: null,
                inventories: []
            }
        
        case DELETE_INVENTORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: null
            };

        case DELETE_INVENTORY_SUCCESS:
            return {
                ...state,
                inventories: state.inventories.filter(inventory => inventory.sku !== action.payload.sku),
                loading: false,
                message: action.payload.message,
                error: null
            };

        case DELETE_INVENTORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                message: null
            };

        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: null
            };

        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                inventories : state.inventories.map(inventory => 
                inventory.sku === action.payload.sku ? action.payload : inventory
                ),
                loading: false,
                message: action.payload.message,
                error: null
            };

        case UPDATE_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                message: null
            };
        
        case FETCH_STOCK_STATUS_REQUEST:
            return{
                ...state,
                loading: true,
                error: null,
                message: null,
                stockStatus:[]
            };
            
        case FETCH_STOCK_STATUS_SUCCESS:
            return{
                ...state,
                loading: false,
                error: null,
                message: action.payload.message,
                stockStatus: action.payload
            };
    
        case FETCH_STOCK_STATUS_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.payload,
                message: null,
                stockStatus:[]
            };
        
        case UPDATE_INVENTORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: null
            }
        
        case UPDATE_INVENTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                message: action.payload.message,
            }
        
        case UPDATE_INVENTORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                message: null
            }
    
        // case GET_INVENTORIES_REQUEST:
        //     return{
        //         ...state,
        //         loading: true,
        //         error: null,
        //         message: null,
        //         inventory: []
        //     }

        // case GET_INVENTORIES_SUCCESS:
        //     return{
        //         ...state,
        //         loading: false,
        //         error: null,
        //         message: "Inventory fetched successfully",
        //         inventory: action.payload
        //     }
        
        // case GET_SINGLE_INVENTORY_FAILURE:
        //     return{
        //         ...state,
        //         loading: false,
        //         error: action.payload,
        //         message: null,
        //         inventory: []
        //     }

        default:
            return state;
    }
};

export default inventoryReducer;