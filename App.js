import React, { useState, useEffect, useRef } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  FlatList,
  Keyboard,
  ScrollView
} from 'react-native';
import firebase from './src/firebaseConnection'
import TaskList from './src/TaskList'
import Icon from 'react-native-vector-icons/Feather';
import Gradient from 'react-native-linear-gradient'
import Toast from 'react-native-simple-toast';

console.disableYellowBox=true;

export default function App(){
  
  const inputRef = useRef(null);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [key, setKey] = useState('');

  //Load items from the database when the app is initialized
  useEffect( ()=> {
    async function loadTasks(){
      await firebase.database().ref('tarefas').on('value', (snapshot)=> {
        //Clar de taskList
        setTasks([]);

        //Get each item/value from ref node
        snapshot.forEach( (childItem) => {
          let data = {
            key: childItem.key,
            nome: childItem.val().nome
          };

          setTasks(oldArray => [...oldArray, data]);
        })

      })
    }
    loadTasks();
  }, []);

  //Remove a item from the list
  async function handleDelete(key){
    await firebase.database().ref('tarefas').child(key).remove();
    Toast.show('Excluído com sucesso');
  }

  //Add a new item on list or Edit an existing one
  async function handleAdd(){
    if(newTask !== ''){

      //If key already exists just update it and don't add a new item
      if(key !== ''){
        await firebase.database().ref('tarefas').child(key).update({
          nome: newTask
        });
        Keyboard.dismiss();
        setNewTask('');
        setKey('');
        Toast.show('Editado com sucesso');
        return;
      }

      //Add a node called "Tarefas" to this variable
      let tarefas = await firebase.database().ref('tarefas');
      let chave = tarefas.push().key;

      tarefas.child(chave).set({
        nome: newTask
      })
      //Close de Keyboard
      Keyboard.dismiss();
      //Clear the input field
      setNewTask('');
      Toast.show('Adicionado com sucesso');
    }
  }

  function handleEdit(data){
    setNewTask(data.nome);
    setKey(data.key);
    inputRef.current.focus();
  }

  function cancelEdit(){
    setKey('');
    setNewTask('');
    Keyboard.dismiss();
    Toast.show('Edição cancelada');
  }

  return(
    <View style={styles.container}>
    <Gradient 
    colors={['rgba(198,226,255, 0)', 'rgba(122,187,255, 1)']}
    start={{x: 1.5, y: 0}} end={{x: 0, y: 0.75}}
    style={styles.containerGradient}>

      <View style={styles.header}>
        <Text style={styles.title}>LISTA DE TAREFAS</Text>
        <Text style={styles.subtitle}>Registre suas atividades</Text>
      </View>

      {key.length > 0 && (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={cancelEdit}>
            <Icon name="x-circle" size={20} color="red"/>
          </TouchableOpacity>
          <Text 
          style={{marginLeft: 5, marginBottom: 8, color: 'red'}}> 
            You are editting an task
          </Text>
        </View>
      )}

      <View style={styles.containerTask}>
        <TextInput 
        style={styles.input}
        placeholder="Adicione uma nova tarefa"
        underlineColorAndroid="transparent"
        onChangeText={(texto) => setNewTask(texto)}
        value={newTask}
        ref={inputRef}
        />

        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
        <Gradient colors={['green', 'rgba(43,144,147, 0.5)']}
        style={styles.gradient}
        start={{x: 0, y: 1}} end={{x: 1, y: 0}}
        >
          <Icon name="check" color="#fff" size={24} />
        </Gradient>
        </TouchableOpacity>
      </View>
      
      <View style={styles.itemArea} visible={true}>
        <ScrollView >
          <FlatList 
          data={tasks}
          keyExtractor={item => item.key}
          renderItem={ ({item}) => (
            <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit}/>
          )}
          />
        </ScrollView>
      </View>

    </Gradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
  },
  containerGradient: {
    flex: 1
  },
  itemArea: {
    flex: 4,
    marginTop: -30
  },  
  containerTask: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#454545',
    height: 40,
    fontSize: 17,
    borderRadius: 4
  },
  buttonAdd: {
    shadowColor: "green",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 5,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 23,
    color: '#fff'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#454545',
    width: '100%',
    
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#0e4589'
  },
  subtitle: {
    fontSize: 13,
    //fontWeight: 'bold',
    color: '#0e3575',
    opacity: 0.5
  }
})