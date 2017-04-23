import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { stringify as queryString } from 'query-string';
import {
  BRANDS_FETCH_SUCCESS,
  BRANDS_FETCH,
  BRANDS_MODELS_FETCH,
  BRANDS_MODELS_FETCH_SUCCESS
} from './types';
import {URL} from '../components/common/Constants';

export const getBrandList = () => {
  const searchURL=`${URL.root}/CarApi/GetBrandList?type=1`

  return (dispatch) => {
    dispatch({ type: BRANDS_FETCH });
    axios.get(searchURL)
      .then(response =>{
        var brands = [];

        response.data.map((mdl,key)=>{
            var _brand = {};
            _brand['label']=mdl.Text;
            _brand['value']=mdl.Value;
            _brand['checked']=false;
            brands.push(_brand);
        })
        dispatch({ type: BRANDS_FETCH_SUCCESS, payload: brands });
      }).catch((error) => {
        console.log(error);
      });
  };
};

export const getBrandsModels = () => {

  return (dispatch,getState) => {
    var brand_model=[];
    dispatch({ type: BRANDS_MODELS_FETCH });
    const { baseItems } = getState();
    const brands= baseItems.brands;
    let len = brands.length;
    brands.map((brand, key)=>{
      var searchURL=`${URL.root}/CarApi/GetModelList?brandId=${brand.Value}`;
        axios.get(searchURL)
          .then(response =>{

            var model = [];
            let brandLen=response.data.length;

            response.data.map((mdl,key)=>{
                var _model = {};
                _model['Text']=mdl.Text;
                _model['Value']=mdl.Value;
                model.push(_model);
            })
            var _data = {};
            _data['Models'] = model;
            _data['Text'] = brand.Text;
            _data['Value'] = brand.Value;
            brand_model.push(_data);
          });
        })
    dispatch({ type: BRANDS_MODELS_FETCH_SUCCESS, payload: brand_model });

  };



};
