import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import AppHeader from '../components/AppHeader'

export default class App extends React.Component {
    constructor() {
      super();
      this.state = {
        text: '',
        isSearchPressed: false,
        word: "Loading...",
        lexicalCategory: '',
        examples: [],
        definition: ""
      };
    }
    getWord=(word) => {
        var searchKeyword=word.toLowerCase()
        var url = "https://rupinwhitehatjr.github.io/dictionary/%22+searchKeyword+%22.json"
        return fetch(url)
        .then((data)=>{
            if(data.status===200){
                return data.json()
            }
            else{
                return null
            }
        })
        .then((response)=>{
            var responseObject = response
            if(responseObject)
            {
                var wordData = responseObject.definition[0]
                var definition=wordData.description
                var lexicalCategory=wordData.wordtype
                this.setState({
                    "word": this.state.text,
                    "definition": definition,
                    "lexicalCategory": lexicalCategory
                })
            }
            else{
                this.setState({
                    "word": this.state.text,
                    "definition": "Not Found"
                })
            }
        })
    }
    render() {
      return (
        <View style={styles.container}>
          <AppHeader/>
          <View>
          <TextInput
            style={styles.inputBox}
            onChangeText={text => {
              this.setState({ 
                  text: text,
                  isSearchPressed: false,
                  word: "Loading...",
                  lexicalCategory: '',
                  examples: [],
                  definition: ""
                });
            }}
            value={this.state.text}
          />
          <TouchableOpacity
            style={styles.goButton}
            onPress={() => {
              this.setState({ isSearchPressed: true });
              this.getWord( this.state.text );
            }}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.outputContainer}>
          <Text style={{fontSize:20}}>
            {
              this.state.isSearchPressed && this.state.word === "Loading..."
              ? this.state.word
              : ""
            }
          </Text>
            {
              this.state.word !== "Loading..." ?
              (
                <View style={{justifyContent:'center', marginLeft:10 }}>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                      Word :{" "}
                    </Text>
                    <Text style={{fontSize:18 }}>
                      {this.state.word}
                    </Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                      Type :{" "}
                    </Text>
                    <Text style={{fontSize:18}}>
                      {this.state.lexicalCategory}
                    </Text>
                  </View>
                  <View style={{flexDirection:'row',flexWrap: 'wrap'}}>
                    <Text style={styles.detailsTitle}>
                      Definition :{" "}
                    </Text>
                    <Text style={{ fontSize:18}}>
                      {this.state.definition}
                    </Text>
                  </View>
                </View>
              )
              :null
            }
        </View>
      </View>
    )
  }
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#b8b8b8',
    },
    inputBox: {
      marginTop: 200,
      width: '80%',
      alignSelf: 'center',
      height: 40,
      textAlign: 'center',
      borderWidth: 4,
      outline: 'none',
    },
    goButton: {
      width: '50%',
      height: 55,
      alignSelf: 'center',
      padding: 10,
      margin: 10,
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
    },
  });
  