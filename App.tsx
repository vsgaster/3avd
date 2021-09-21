import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PaisesData {
  country: string,
  code: string,
  id: string
}

export default function App() {
  const [country, setCountry] = useState('');
  const [code, setCode] = useState('');
  const [paisesdata, setPaisesdata] = useState<PaisesData[]>([]);

  useEffect(() => {
    async function loadData() {
      const storagedDados = await AsyncStorage.getItem('@data');
      if (storagedDados) {
        setPaisesdata(JSON.parse(storagedDados));
      }
    }
    loadData();
  }, []);
  useEffect(() => {
    async function saveData() {
      await AsyncStorage.setItem('@data', JSON.stringify(paisesdata));
    }
    saveData();
  }, [paisesdata]);

  function deleteItem(id: string) {
    const i = paisesdata.filter(i => i.id !== id);
    setPaisesdata(i);
  }

  function handlePress() {
    if(code == "" || country == ""){
      Alert.alert('Ops..', "Digite o Codigo e o País.");
    }else{
      setPaisesdata([...paisesdata, { country, code, id:Math.random().toString() }]);
      setCountry("");
      setCode("");
    }
    
    }
  
  return (
    <View style={styles.container}>
      
      <View >
        <Text style={styles.h1} >ADD PAÍS</Text>
        <TextInput
          style={styles.textfield}
          placeholder="Código do país"
          onChangeText={text => setCode(text)}
          defaultValue={code}
        />
        

        <TextInput
          style={styles.textfield}
          placeholder="País "
          onChangeText={text => setCountry(text)}
          defaultValue={country}
          onSubmitEditing={handlePress}
        />
        
     
  
        <TouchableOpacity
          style={styles.button}
          onPress={handlePress}
        >
          <Text
          style={styles.text}>Salvar</Text>
        </TouchableOpacity>

        
      </View>
      <View style={styles.lista} >
        <Text style={styles.h2}>
          PAÍSES ADCIONADOS
        </Text>
        <FlatList
          data={paisesdata}
          renderItem={({ item }) => {
            return (
              <View key={item.id} >
                <Text style={styles.border}>
                  <Text style={styles.strong}> Cod. País:</Text> {item.code} | 
                   <Text style={styles.strong} > País:</Text> {item.country} |
          
                   <Text style={styles.strong2} onPress={() => { deleteItem(item.id) }}> Deletar</Text>
                   
                </Text>
                
              </View>

            )
          }}
        />
      </View>

  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(245,245,245)'
  
  },
  container2: {
    flex: 2,
    alignSelf: 'center',
    width: 320,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(60,179,113)'
  
  },
  
  h1: {
    textAlign: 'justify',
    alignSelf: 'center',
    fontSize: 48,
    padding: 50,
    color: '#000'
  },
  h2: {
    textAlign: 'justify',
    alignSelf: 'center',
    fontSize: 30,
    padding: 10,
    color: 'rgb(240,248,255)'
  },
  text:{
    alignSelf: 'center',
    color: '#000'
  },
  border:{
    margin: 5,
    padding: 10,
    borderColor: 'rgb(112,128,144)',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 10,
  },
  strong: {
    fontWeight: "700",
  },
  strong2: {
    color: 'rgb(225,0,0)',
    fontWeight: "700",
  },
  textfield: {
    elevation: 10,
    alignSelf: 'center',
    width: 250,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: 'rgb(112,128,144)',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 30,
    marginVertical: 5,
    color: '#000',
    backgroundColor: 'rgb(245,245,245)'
  },
  button: {
    elevation: 10,
    marginVertical: 10,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: 'rgb(112,128,144)',
    borderWidth: 2,
    borderRadius: 30,
    borderStyle: 'solid',
    textAlign: 'center',
    fontWeight: '700',
    width: 100,
    backgroundColor: 'rgb(245,245,245)'
  },
  
  lista: {
    alignItems: 'center',
    flex: 3,
    marginVertical: 30
  }
});
