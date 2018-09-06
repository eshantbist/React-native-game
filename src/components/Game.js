import React, {Component} from 'react';
import {StyleSheet,Text, View,Button} from 'react-native';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';
export default class App extends Component{

    constructor(props){
        super(props);
        this.state={
            selectedIds:[], 
            remainingSeconds:this.props.initialSeconds,
        }
    }

    gameStatus='PLAYING';

    componentDidMount(){
        this.intervalId=setInterval(()=>{
            this.setState((prevState)=>{
                return {remainingSeconds:prevState.remainingSeconds-1 }
            },()=>{
                if(this.state.remainingSeconds===0){
                    clearInterval(this.intervalId);
                }
            });
        },1000);
    }


    isNumberSelected=(numberIndex)=>{
        return (this.state.selectedIds.indexOf(numberIndex)>=0);
    }

    selectNumber=(numberIndex)=>{
        this.setState((prevState)=>({
            selectedIds:[...prevState.selectedIds,numberIndex],
        }));
    }

    randomNumbers=Array
        .from({length:this.props.randomNumberCount})
        .map(() => 1 + Math.floor(10*Math.random()));
        
    target=this.randomNumbers
        .slice(0,this.props.randomNumberCount-2)
        .reduce((acc,curr)=>acc+curr);
        shuffledRandomNumbers=shuffle(this.randomNumbers);

    componentWillUpdate(nextProps,nextState){
        if(nextState.selectedIds!==this.state.selectedIds || nextState.remainingSeconds===0)
        {
            this.gameStatus=this.calcGameStatus(nextState);
            if(this.gameStatus!=='PLAYING'){
                clearInterval(this.intervalId);
            }
        }
    }

    calcGameStatus=(nextState)=>{
        const sumSelected=nextState.selectedIds.reduce((acc,curr)=>{
            return acc + this.shuffledRandomNumbers[curr];
        },0);
        if(nextState.remainingSeconds===0)
        {
            return 'YOU_LOST';
        }
        if(sumSelected<this.target){
            return 'PLAYING';
        }
        if(sumSelected===this.target){
            return 'YOU_WON';
        }
        if(sumSelected>this.target){
            return 'YOU_LOST';
        }
    }

    render() {
        const gameStatus=this.gameStatus;
        return (
        <View style={styles.container}>
            <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
            <View style={styles.randomContainer}>
                {this.shuffledRandomNumbers.map((randomNumber,index)=>
                    <RandomNumber 
                        key={index} 
                        id={index}
                        number={randomNumber}
                        isDisabled={this.isNumberSelected(index)|| gameStatus!=='PLAYING'}
                        onPress={this.selectNumber}
                    />
                )}
            </View>
            <Button title="Play Again" onPress={this.props.onPlayAgain}/>
            <Text style={styles.timer}>Time Left:{this.state.remainingSeconds}</Text>
            <Text style={styles.status}>{gameStatus}!!!</Text>
        </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },

    target:{
        fontSize:50,
        backgroundColor:'#aaa',
        margin:50,
        textAlign:'center',
    },

    randomContainer:{
        justifyContent:'space-around',
        flexDirection:'row',
        flex:1,
        flexWrap:'wrap'
    },

    random:{
        backgroundColor:'lightblue',
        width:100,
        marginHorizontal:15,
        marginVertical:25,
        fontSize:40,
        textAlign:"center",

    },
    status:{
        backgroundColor:'#1affd1',
        padding:10,
        fontWeight:'bold',
        textAlign:"center",
        fontSize:30,
    },
    timer:{
        backgroundColor:'#1affd1',
        padding:10,
        fontWeight:'bold',
        textAlign:"center",
        fontSize:30,
    },
    STATUS_PLAYING:{
        backgroundColor:'#aaa',
    },

    STATUS_YOU_WON:{
        backgroundColor:'green',
    },
    STATUS_YOU_LOST:{
        backgroundColor:'red'
    },
});