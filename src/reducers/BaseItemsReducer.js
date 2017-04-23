import {
  BRANDS_FETCH_SUCCESS,
  BRANDS_FETCH,
  BRANDS_MODELS_FETCH,
  BRANDS_MODELS_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  brands:[],
  brands_models:[],
  brands_loading: false,
  brands_model_loading:true,
  error:''
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case BRANDS_FETCH:
      return {...state, brands_loading: true, error: '' };
    case BRANDS_FETCH_SUCCESS:
      return {...state, brands_loading:false, brands: state.brands.concat(action.payload)};
    case BRANDS_MODELS_FETCH:
      return {...state, brands_model_loading: true, error: '' };
    case BRANDS_MODELS_FETCH_SUCCESS:
        return {...state, brands_model_loading: false, brands_models: action.payload};
    default:
      return state;
  }
};
