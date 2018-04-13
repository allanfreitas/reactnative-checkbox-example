import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert
} from 'react-native';

import { CheckBox, Button } from 'react-native-elements'
import { Constants } from 'expo';

import dados from './src/api';
import { parse } from 'url';

const withChecksData = dados.map(dado => {
  dado.checked = false;
  return dado;
});

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      dataSource: withChecksData,
      isVisible: false
    }
  }
  
  toggleCheckBox = itemUpdate => {
    
    var prevItens = this.state.dataSource;
    prevItens.forEach(prevItem => {
      if (prevItem.id === itemUpdate.id)
        prevItem.checked = !prevItem.checked;
      
      return prevItem;
    });
    
    this.setState({dataSource:prevItens});
  }
  
  isChecked = id => {
    var item = this.state.dataSource.filter(item =>{
      return item.id === id;
    });
    //console.log(item);
    if (item.length === 0)
      return false;
    
    return item[0].checked;
  }

  selectedList = () => {
    var listSelected = [];

    var selected = this.state.dataSource.filter(item =>{
      return item.checked === true;
    }).map(item =>{
      listSelected.push(item.subcategoria);
    });
    //console.log(selected);
    //return listSelected;

    if (listSelected.length == 0)
      return "Nada Selecionado ainda!";

    var parsedList = listSelected.join(',');
    //console.log(parsedList);

    return parsedList;
  }

  renderSelected = () => {
    var selectedList = this.selectedList();

    Alert.alert(
      'Selecionados',
      selectedList,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    );
  }

  render() {
    return (
      <View style={styles.ctype2}>
        <FlatList
          data={this.state.dataSource}
          extraData={this.state}
          renderItem={({ item }) => (
            <CheckBox
              center
              title={item.subcategoria}
              onPress={() => this.toggleCheckBox(item)}
              checked={this.isChecked(item.id)}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />

        <Button
          title="Verificar Selecionados!"
          onPress={() => {this.renderSelected()}}
          buttonStyle={{
            backgroundColor: "rgba(92, 99,216, 1)",
            width: 300,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5
          }}
          containerStyle={{ marginTop: 20 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ctype2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  container: {
    flex: 1,
    top: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
