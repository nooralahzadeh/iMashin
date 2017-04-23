'use strict';

import React, {Component} from "react";

import {Text, View, Image, ListView, TouchableOpacity, ScrollView} from "react-native";
import Swiper from "react-native-swiper";

const shop = require('./../Styles/shop.js').default;
import Product from './../common/Product';
import ProductScroll from './../common/ProductScroll';
import {URL} from '../common/Constants';
import { connect } from 'react-redux';
import { productFetchRecent, productFetchCheapest,  productFetchLowKilometer, productFetchHighKilometer , getBrandList ,getBrandsModels } from '../../actions';
import { Actions } from 'react-native-router-flux';

import WaitingForm from '../common/WaitingForm';
import WaitingFormHorizental from '../common/WaitingFormHorizental';

const nullImage= require('../../images/car_holder.png');


class HorizontalItem extends Component {

  state = {recents: [], cheapest:[], lkm:[], hkm:[]}

  componentWillMount(){

    if (this.props.recents===undefined){
         this.props.productFetchRecent();
    }

    if (this.props.cheapest === undefined){
         this.props.productFetchCheapest();
    }

    if(this.props.lw === undefined){
       this.props.productFetchLowKilometer();
    }
    if(this.props.hk ===undefined){
       this.props.productFetchHighKilometer();
    }

    if(this.props.brands.length===0){
       this.props.getBrandList();
    }
      }


  componentWillReceiveProps(nextProps){

    this.setState({ recents:nextProps.recents,
                    cheapest:nextProps.cheapest,
                    lkm:nextProps.lkm,
                    hkm:nextProps.hkm
                    });
  }



renderSwipView(){
  return(
    <View>
        <Image source={require('../../images/benz.jpg')} style={shop.image}>
            <Swiper dot={<View style={{backgroundColor:'rgba(255,255,255,.3)', width: 8, height: 8, borderRadius: 4, marginLeft: 4, marginRight: 4}} />}
                    activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4, marginLeft: 4, marginRight: 4}} />}
                    paginationStyle={{top: -300, left: 300}}
            >
                <View>
                    <Image source={require('../../images/benz.jpg')} style={shop.image}></Image>
                </View>
                <View>
                    <Image source={require('../../images/slide_1.jpg')} style={shop.image}></Image>
                </View>
                <View>
                    <Image source={require('../../images/slide_2.jpg')} style={shop.image}></Image>
                </View>
            </Swiper>
        </Image>
    </View>
  );
}

renderScrollViewRecent(){
  if(this.props.recent_loading){
    return <WaitingFormHorizental animating = {this.props.recent_loading} />;

    }
   return(
     <ScrollView style={shop.scrollView}
                 directionalLockEnabled={true}
                 horizontal={true}>

         <View style={{flexDirection:'row'}}>
            {this.state.recents.map((item, key) => {
              if (item.FirstPicturePath===null) {
              return <Product key={key} name={item.AutoTitle} price={item.Fee} imageURL={nullImage} />
              }
              return (
                <ProductScroll key={key} name={item.AutoTitle} price={item.Fee} imageURL={`${URL.root}${item.FirstPicturePath}`}/>
                      )

                   })}

         </View>
     </ScrollView>
   );
}

renderScrollViewCheapest(){
if(this.props.cheapest_loading){
return <WaitingFormHorizental animating = {this.props.cheapest_loading} />;
}
  return(
    <ScrollView style={shop.scrollView}
                directionalLockEnabled={true}
                horizontal={true}>

        <View style={{flexDirection:'row'}}>
          {this.state.cheapest.map((item, key) => {
            if (item.FirstPicturePath===null) {
            return <Product key={key} name={item.AutoTitle} price={item.Fee} imageURL={nullImage} />
            }
           return (
             <ProductScroll key={key} name={item.AutoTitle} price={item.Fee} imageURL={`${URL.root}${item.FirstPicturePath}`}/>
                   )
                 })}

        </View>
    </ScrollView>
  );
}

 renderScrollViewLKM(){
   if(this.props.lkm_loading){
     return <WaitingFormHorizental animating = {this.props.lkm_loading} />;
    }
   return(
     <ScrollView style={shop.scrollView}
                 directionalLockEnabled={true}
                 horizontal={true}>

         <View style={{flexDirection:'row'}}>
           {this.state.lkm.map((item, key) => {
             if (item.FirstPicturePath===null) {
             return <Product key={key} name={item.AutoTitle} price={item.Fee} imageURL={nullImage} />
             }
            return (
              <ProductScroll key={key} name={item.AutoTitle} price={item.Fee} imageURL={`${URL.root}${item.FirstPicturePath}`}/>
                    )
                  })}

         </View>
     </ScrollView>
   );
 }

 renderScrollViewHKM(){
   if(this.props.hkm_loading){
     return <WaitingFormHorizental animating = {this.props.hkm_loading} />;
    }
   return ( <ScrollView style={shop.scrollView}
                directionalLockEnabled={true}
                horizontal={true}>

        <View style={{flexDirection:'row'}}>
          {this.state.hkm.map((item, key) => {
            if (item.FirstPicturePath===null) {
            return <Product key={key} name={item.AutoTitle} price={item.Fee} imageURL={nullImage} />
            }
           return (
             <ProductScroll key={key} name={item.AutoTitle} price={item.Fee} imageURL={`${URL.root}${item.FirstPicturePath}`}/>
                   )
                 })}

        </View>
    </ScrollView>
  );
 }


    render() {

        return (
            <View style={shop.hlist}>
                <ScrollView>
                    {this.renderSwipView()}
                    <View>
                        <Text style={shop.title}>جدیدترین ها</Text>
                    </View>
                    {this.renderScrollViewRecent()}
                    <View>
                        <Text style={shop.title}> ارزانترین ها</Text>
                    </View>
                    {this.renderScrollViewCheapest()}
                    <View>
                        <Text style={shop.title}>کم کارکردترین ها</Text>
                    </View>
                      {this.renderScrollViewLKM()}
                    <View>
                        <Text style={shop.title}>پرکارکردترین ها</Text>
                    </View>
                      {this.renderScrollViewHKM()}
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = ({productsest,baseItems}) => {
  const recents = productsest.recent.ResultAds;
  const cheapest = productsest.cheapest.ResultAds;
  const lkm = productsest.lkm.ResultAds;
  const hkm = productsest.hkm.ResultAds;
  const recent_loading =productsest.recent_loading;
  const cheapest_loading =productsest.cheapest_loading;
  const lkm_loading= productsest.lkm_loading;
  const hkm_loading= productsest.hkm_loading;
  
  const {brands, brands_models} =baseItems;


  return { recents,cheapest, lkm, hkm , recent_loading, cheapest_loading, lkm_loading, hkm_loading, brands ,brands_models};
};

export default connect (mapStateToProps,{productFetchRecent, productFetchCheapest,  productFetchLowKilometer, productFetchHighKilometer, getBrandList, getBrandsModels})(HorizontalItem);
