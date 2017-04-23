'use strict';
import React, { Component } from 'react';
import { Container, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import {Actions} from "react-native-router-flux";
export default class FooterTabs extends Component {
      render() {
          return (

                    <Footer >
                    <FooterTab>
                      <Button active={this.props.home} onPress={Actions.home}>
                          <Icon  name="home" />
                      </Button>
                        <Button active={this.props.list} onPress={Actions.productListLarge}>
                            <Icon name="list" />
                        </Button>
                        <Button active={this.props.add} onPress={Actions.productForm}>
                            <Icon  name="add-circle" />
                        </Button>
                        <Button active={this.props.search} onPress={Actions.filter} >
                            <Icon  name="search" />
                        </Button>
                        <Button active={this.props.profile} onPress={Actions.profile}>
                            <Icon name="person" />
                        </Button>
                    </FooterTab>
                </Footer>

          );
      }
  }
