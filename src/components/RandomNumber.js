import React, {Component} from 'react';
import {StyleSheet,Text, View,TouchableOpacity} from 'react-native';

export default class RandomNumber extends Component{

    handlePress=()=>{
        if(this.props.isDisabled){return;}
        this.props.onPress(this.props.id)
    }
    render() {
        return (
            <TouchableOpacity onPress={this.handlePress}>
                <Text style={[styles.random,this.props.isDisabled && styles.selected]}>
                    {this.props.number}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles=StyleSheet.create({
    random:{
        backgroundColor:'lightblue',
        width:100,
        marginHorizontal:15,
        marginVertical:25,
        fontSize:40,
        textAlign:"center",
  
    },
    selected:{
        opacity:0.3
    }
  });