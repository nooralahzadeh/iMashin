import React, { Component } from 'react';
import {
   View,
   Text,
   Picker,
   Image,
   TouchableOpacity,
   PixelRatio,
   ScrollView,
   Dimensions,
   Platform
    } from 'react-native';

import { connect } from 'react-redux';
import { productUpdate } from '../actions';
import { CardSection, Input } from './common';
import ImagePicker from 'react-native-image-picker';
import Thumb from "./common/Thumb";
import product from "./Styles/product";

const {width, height, scale} = Dimensions.get("window");

const shop = require('./Styles/shop.js').default;


const maxPhoto=6;

class ProductForm extends Component {

  state = {
    images:[]
  };


  deleteImage(index){
   //let images = this.state.images;
  //  images.splice(deleteProp.number ,1);
  //  this.setState({images : images});


  const images = this.state.images;
  const newImages = [...images.slice(0, index), ...images.slice(index + 1, images.length)];
  let newState = { images: newImages };
  this.setState(newState);

  };


  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth:(width/3)-10 ,
      maxHeight: (width/3),
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
    //  console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri.replace('file://',''), isStatic:true };
        if (Platform.OS==='android'){
          source = { uri: response.uri, isStatic:true };
        }

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          images: this.state.images.concat([source])
      });
      }
    });
  }


  // <View style={shop.panel}>
       //<Image source={item} style={shop.imagePanel} key={key}></Image>
   //</View>
  //  <Thumb key={source} number={i} uri={source} onDelete={this.deleteImage.bind(this,i)} />
  render() {

    return (
    <View >
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ScrollView style={{height: 220}}
                    directionalLockEnabled={true}
                    horizontal={true}>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
               {this.state.images.map((source, i) => {
                 return  (
                                 <Thumb key={source+i} number={i} uri={source} onDelete={this.deleteImage.bind(this,i)} />
                          )
                              })}

                    { this.state.images.length <maxPhoto ?
                      <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View style={shop.panel}>
                          <Image source={require('./../images/icon-camera.png')} style={shop.imagePanel}></Image>
                        </View>
                      </TouchableOpacity>
                      : <Text></Text>}

            </View>
      </ScrollView>
    </View>
      <CardSection>
          <Input
            label="Title"
            placeholder="BMW"
            value={this.props.title}
            onChangeText={value => this.props.productUpdate({ prop: 'title', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Price"
            placeholder="ERUO 10000"
            value={this.props.phone}
            onChangeText={value => this.props.productUpdate({ prop: 'price', value })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Thumbnail_image"
            placeholder=""
            value={this.props.thumbnail_image}
            onChangeText={value => this.props.productUpdate({ prop: 'thumbnail_image', value })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Image"
            placeholder=""
            value={this.props.image}
            onChangeText={value => this.props.productUpdate({ prop: 'image', value })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="URL"
            placeholder=""
            value={this.props.url}
            onChangeText={value => this.props.productUpdate({ prop: 'url', value })}
          />
        </CardSection>
      </View>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

const mapStateToProps = (state) => {
  const { title, price, thumbnail_image, image, url } = state.productForm;
  return { title, price, thumbnail_image, image, url };
};

export default connect(mapStateToProps, { productUpdate })(ProductForm);
