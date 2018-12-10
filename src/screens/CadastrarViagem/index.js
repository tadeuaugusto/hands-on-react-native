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

        console.log(this.props.navigation.getParam('item', 'erro ao carregar item'));

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

        // recupera as viagens do async storage
        const viagensStorage = await AsyncStorage.getItem('trips');
        console.log('[CadastrarViagem] viagensStorage (ANTES): ', viagensStorage);

        let viagens = [];
        if (viagensStorage) { // handle null, undefined, 0, etc.. (falsy)
            viagens = JSON.parse(viagensStorage)
        }

        viagens.push(viagem);
        await AsyncStorage.setItem('trips', JSON.stringify(viagens))
        console.log('[CadastrarViagem] viagens (DEPOIS): ', viagens);

        // this.props.navigation.navigate('CadastrarDespesa', {id: viagem.id});
        this.props.navigation.state.params.refresh();
        this.props.navigation.goBack();
    }

    render() {

        const trip = {
            // // create endpoint /festivals/{id} (GET)
            name: 'Praga',
            startDate: '28/05/2018 12:00',
            endDate: '03/06/2019 18:00',
            address: 'Czech Republic, CZ',
            price: 'R$ 1000',
            thumbnail: 'https://i.imgur.com/ZLY8rUI.jpg',
            others: [ // despesas
                { id: '1', name: 'Hostel', description: 'Pagamento reserva e diaria', price: 80},
                { id: '2', name: 'Pub', description: 'Comida, bebida e etc', price: 570},
                { id: '3', name: 'Aviao', description: 'Passagens aereas', price: 120},
                { id: '4', name: 'Aeroporto', description: 'Consumo dentro do aeroporto', price: 230}
            ]
        }

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