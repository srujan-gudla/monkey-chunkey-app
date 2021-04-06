import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DB from './localDB'
import {Audio} from 'expo-av'
console.log(DB.the.chunks);
export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      inputText: '',
      displayText: '',
      chunks:[],
      phones:[]
    };
  }
   playSound = async (soundName) => {
     var soundUrl='https://s3-whitehatjrcontent.whjr.online/phones/'+soundName+'.mp3'
     console.log(soundUrl)
    await Audio.Sound.createAsync(
      {
        uri: soundUrl,
      },
      {
        shouldPlay: true,
      }
    );
  };
  render() {
    return (
      <SafeAreaProvider>
        <View>
          <Header
            backgroundColor={'#A6C48A'}
            centerComponent={{
              text: 'Monkey Chunky',
              style: { color: 'white', fontSize: 22 },
            }}
          />
          <TextInput
            placeholder="Type here to search..."
            value={this.state.inputText}
            style={myStyle.textInputStyle}
            onChangeText={(text) => {
              this.setState({ inputText: text });
            }}
          />
          {this.state.chunks.map((item,index)=>(
            <TouchableOpacity style={myStyle.chunkButton} onPress={()=>{
              this.playSound(this.state.phones[index])
            }}>
            <Text style={myStyle.chunkText}>{item}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={myStyle.buttonStyle}
            onPress={() => {
              var word=this.state.inputText.toLowerCase().trim()
              word=word.replace(/ /g,'')
              console.log(word)
              DB[word]===undefined?alert("This word dosent exist in the database."):
              this.setState({phones:DB[word].phones})
              this.setState({ chunks:DB[word].chunks });
            }}>
            <Text style={myStyle.textStyle}>GO</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    );
  }
}

const myStyle = StyleSheet.create({
  buttonStyle: {
    height: 40,
    width: '60%',
    borderWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#cbe896',
  },
  textStyle: {
    fontWeight: 'bold',
  },
  textInputStyle: {
    borderWidth: 1,
    marginTop: 50,
    marginBottom: 50,
    width: '60%',
    alignSelf: 'center',
    height: 30,
    borderRadius: 10,
  },
  chunkButton:{
    alignSelf:'center',
    backgroundColor:'orange',
    width:'30%',
    height:40,
    margin:10,
    borderRadius:10,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
  },
  chunkText:{
fontWeight:'bold',
color:'white',
  }
});
