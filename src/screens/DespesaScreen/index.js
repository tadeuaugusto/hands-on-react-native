import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles';

class DespesaScreen extends Component {

    static navigationOptions = {
        header: null
    }

    renderItem = despesas => {

        console.log(this.props.navigation.getParam('item', 'erro ao carregar item'));

        return(
            <View style={styles.item}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.itemName}>{despesas.item.name}</Text>
                    <Text>{despesas.item.genre}</Text>
                </View>
                <View style={styles.wrapperItemPrice}>
                    <Text style={styles.itemPrice}>{ despesas.item.price }</Text>
                </View>
            </View>
        );
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
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Image source={{ uri: trip.thumbnail }} style={{ flex: 1 }} />
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
                <FlatList style={{ flex: 1 }}
                        contentContainerStyle={{
                            paddingTop: 16,
                            paddingLeft: 16
                        }}
                        data={trip.others}
                        renderItem={this.renderItem}
                />
            </View>
        );
    }
}

export default InfoPage