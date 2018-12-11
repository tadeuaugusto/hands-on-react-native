import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import styles from './styles';

class CadastrarViagem extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        viagem: ''
    }

    renderItem = despesas => {

        return(
            <View style={styles.item}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.itemName}>{despesas.item.name}</Text>
                    <Text>{despesas.item.description}</Text>
                </View>
                <View style={styles.wrapperItemPrice}>
                    <Text style={styles.itemPrice}>{ despesas.item.price }</Text>
                </View>
            </View>
        );
    }

    handleSave = async() => {
        const viagem = {
            id: new Date().getTime(),
            viagem: this.state.viagem,
            price: 0,
            latitude: 0,
            longitute: 0
        }

        // getItem from async storage
        const viagensStorage = await AsyncStorage.getItem('trips');

        let viagens = [];
        if (viagensStorage) { // handle null, undefined, 0, etc.. (falsy)
            viagens = JSON.parse(viagensStorage)
        }

        // push object
        viagens.push(viagem);

        // setItem async storage
        await AsyncStorage.setItem('trips', JSON.stringify(viagens))
        console.log('[CadastrarViagem] saving trips.. (AsyncStorage): ', viagens);

        // return and refresh the previous screen
        this.props.navigation.state.params.refresh();
        this.props.navigation.goBack();
    }

    render() {

        return (
            <View style={{ flex: 1, paddingTop: 120 }}>
                <TextInput style={styles.input} placeholder='Nome da Viagem' onChangeText={
                    txt => this.setState({ viagem: txt })}
                />
                <Text>{JSON.stringify(this.state)}</Text>

                <TouchableOpacity style={styles.btn} onPress={ this.handleSave }>
                    <Text>Salvar Viagem</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default CadastrarViagem