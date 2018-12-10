import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import styles from './styles';
import MapView, { Marker } from 'react-native-maps';

class CadastrarDespesa extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        position: {
            latitude: 37.78825,
            longitude: -122.4324
        },
        pointName: '',
        description: '',
        price: 0
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

    render() {

        console.log('id viagem: ', this.props.navigation.state);

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
                    <Text style={styles.tripName}>{ trip.name }</Text>
                    <Text style={styles.tripPrice}>
                        { trip.price }
                    </Text>
                </View>

                <TextInput style={styles.input} placeholder='Nome' onChangeText={
                    txt => this.setState({ pointName: txt })}
                />
                <TextInput style={styles.input} placeholder='Descrição' onChangeText={
                    txt => this.setState({ description: txt })}
                />
                <TextInput style={styles.input} placeholder='Preço' onChangeText={
                    txt => this.setState({ price: txt })}
                />
                <Text>{JSON.stringify(this.state)}</Text>

                <TouchableOpacity style={styles.btn}>
                    <Text>Salvar Ponto</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default CadastrarDespesa