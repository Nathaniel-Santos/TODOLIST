import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import Gradient from 'react-native-linear-gradient'


export default function TaskList( {data, deleteItem, editItem} ){
    function handleDeleteItem(){
        deleteItem(data.key);
    }

    function handleEditItem(){
        editItem(data);
    }

    return(
        <View style={styles.container}>
            <Gradient 
            colors={['#2389df', 'rgba(36, 83, 224, 0.5)']}             
            style={styles.gradient}>

            <TouchableOpacity style={{marginRight: 10}} onPress={handleDeleteItem}>
                <Icon name="trash-2" color="cyan" size={20} />
            </TouchableOpacity>

            <TouchableWithoutFeedback onPress={handleEditItem}>
                <View style={{paddingRight: 15}}>
                    <Text 
                    style={{color: '#fff', paddingRight: 10}}>
                        {data.nome}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            </Gradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 12,
        marginHorizontal: 12
    },
    gradient: {
        flexDirection: 'row',
        backgroundColor: '#484848',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        height: '100%',
        shadowColor: "#2389df",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    }
})