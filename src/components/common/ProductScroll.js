'use strict';

import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image } from "react-native";
import ResponsiveImage from 'react-native-responsive-image';

const product = require('./../Styles/shop.js').default;


export default class ProductScroll extends Component {
  onLoadImage(url){
    console.log(url);
  }
    render() {
        return (
            <TouchableOpacity>
                <View style={product.panel}>
                    <Image source={ {uri:this.props.imageURL}} style={product.imagePanel} onLoad={this.onLoadImage(this.props.imageURL)}></Image>
                </View>

                <Text style={product.name}>{this.props.name}</Text>
                <Text style={product.price}>{this.props.price}</Text>
            </TouchableOpacity>
        );
    }

}
