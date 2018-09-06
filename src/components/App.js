import React, {Component} from 'react';
import {StyleSheet,Text, View} from 'react-native';
import Game from './Game';

export default class App extends Component{

  constructor(props){
    super(props);
    this.state={
      gameId:1,
    }
  }

  resetGame=()=>{
    this.setState((prevState)=>{
      return{ gameId:prevState.gameId + 1 };
    });
  };

  render() {
    return (
      <Game 
        key={this.state.gameId} 
        randomNumberCount={6} 
        initialSeconds={10}
        onPlayAgain={this.resetGame}
      />
    );
  }
}

const styles=StyleSheet.create({
  container:{
    backgroundColor:'grey',
    flex:1,
  },
});