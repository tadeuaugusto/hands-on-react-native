import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import styles from './styles';
import MapView, { Marker } from 'react-native-maps';

class CadastrarDespesa extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        id: new Date().getTime(),
        position: {
            latitude: 37.78825,
            longitude: -122.4324
        },
        pointName: '',
        description: '',
        price: 0
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

        // recebe o id da viagem
        const id = this.props.navigation.state.params.id; // '1544475667662';
        console.log('[CadastrarDespesa] id viagem: ', id);

        // recuperar as despesas salva para a viagem no async storage
        const despesaStorage = await AsyncStorage.getItem('trip-'+id);

        let despesas = [];
        if (despesaStorage) {
            despesas = JSON.parse(despesaStorage);
        }

        // adiciona a nova despesa
        despesas.push(this.state);

        // salva a nova lista de despesa no async storage
        await AsyncStorage.setItem('trip-'+id, JSON.stringify(despesas));

        // recupera as viagens do async storage
        const viagensStorage = await AsyncStorage.getItem('trips');

        let viagens = [];
        if (viagensStorage) {
            viagens = JSON.parse(viagensStorage);
        }

        // calcula valor total
        let total = 0;
        despesas.forEach(p => {
            total += p.price;
        })
        console.log('[CadastrarDespesa] total: ', total);

        // atualiza o valor total (id)
        viagens.forEach((trip, index) => {
            if (trip.id === id) {
                viagens[index].price = total;
                viagens[index].latitude = despesas[0].position.latitude;
                viagens[index].longitude = despesas[0].position.longitude;
            }
        })

        // salva as viagens no async storage
        await AsyncStorage.setItem('trips', JSON.stringify(viagens));
        console.log('[CadastrarDespesa] saving trips.. (AsyncStorage): ', viagens);


        this.props.navigation.state.params.refresh();
        this.props.navigation.goBack();
    }

    render() {

        /*
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
        */

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <MapView style={{ flex: 1 }} initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                        <Marker
                            coordinate={{
                                latitude: 37.78825,
                                longitude: -122.4324
                            }}
                            draggable
                            onDragEnd={
                                (evt) => this.setState({ position: evt.nativeEvent.coordinate })
                            }
                        />
                    </MapView>
                    <View style={styles.backButton}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../../assets/go-back-left-arrow.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                <TextInput style={styles.input} placeholder='Nome' onChangeText={
                    txt => this.setState({ pointName: txt })}
                />
                <TextInput style={styles.input} placeholder='Descrição' onChangeText={
                    txt => this.setState({ description: txt })}
                />
                <TextInput style={styles.input} placeholder='Preço' onChangeText={
                    txt => this.setState({ price: parseFloat(txt) })}
                />
                <Text>{JSON.stringify(this.state)}</Text>

                <TouchableOpacity style={styles.btn} onPress={ this.handleSave }>
                    <Text>Salvar Ponto</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default CadastrarDespesa