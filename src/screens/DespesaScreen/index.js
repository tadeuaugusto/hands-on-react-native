import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import styles from './styles';

class DespesaScreen extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        viagem: [],
        despesas: []
    }

    componentDidMount() {
        this.loadData();
    }

    // carrega viagens e despesas relacionadas
    loadData = async() => {

        console.log("**************** ", this.props.navigation.state);
        // const id = '1544480677870';
        const id = this.props.navigation.state.params.id;

        const viagensStorage = await AsyncStorage.getItem('trips');
        console.log('[DespesaScreen] viagensStorage (ANTES): ', viagensStorage);
        console.log('[DespesaScreen] viagensStorage.length (ANTES): ', viagensStorage.length);

        let viagens = [];
        if (viagensStorage) {
            viagens = JSON.parse(viagensStorage);
        }
        // this.setState({ viagens: viagens });
        // console.log('[DespesaScreen] state.viagens (DEPOIS): ', this.state.viagens);
        // console.log('[DespesaScreen] state.viagens.length (DEPOIS): ', this.state.viagens.length);



        const despesaStorage = await AsyncStorage.getItem('trip-'+id);
        console.log('[DespesaScreen] despesaStorage (ANTES): ', despesaStorage);
        // console.log('[DespesaScreen] despesaStorage.length (ANTES): ', despesaStorage.length);

        let despesas = [];
        if (despesaStorage) {
            despesas = JSON.parse(despesaStorage);
        }

        // buscar trip
        let viagem = {
            viagem: '',
            price: 0
        }

        viagens.forEach(t => {
            if (t.id === id) {
                viagem.viagem = t.viagem
                viagem.price = t.price ? t.price : 0
            }
        })


        this.setState({ viagem: viagem, despesas: despesas });
        console.log('[DespesaScreen] state.viagens (DEPOIS): ', this.state.viagem);
        console.log('[DespesaScreen] state.viagens.length (DEPOIS): ', this.state.viagem.length);
        console.log('[DespesaScreen] state.despesas (DEPOIS): ', this.state.despesas);
        console.log('[DespesaScreen] state.despesas.length (DEPOIS): ', this.state.despesas.length);

    }

    renderItem = despesas => {

        console.log(this.props.navigation.getParam('item', '[DespesaScreen] erro ao carregar item'));

        return(
            <View style={styles.item}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.itemName}>{despesas.item.pointName}</Text>
                    <Text>{despesas.item.description}</Text>
                </View>
                <View style={styles.wrapperItemPrice}>
                    <Text style={styles.itemPrice}>R$ { despesas.item.price.toFixed(2) }</Text>
                </View>
            </View>
        );
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

        const { despesas, viagem } = this.state;

        const id = this.props.navigation.state.params.id;

        console.log("@@@@@@@@@@@@ ", viagem.price);

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Image source={{ uri: viagem.thumbnail }} style={{ flex: 1 }} />
                    <View style={styles.backButton}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.state.params.refresh()
                            this.props.navigation.goBack()
                        }}>
                            <Image source={require('../../../assets/go-back-left-arrow.png')} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.tripName}>{ viagem.viagem }</Text>
                    <Text style={styles.tripPrice}>
                        R$# { parseFloat(viagem.price).toFixed(2) }
                    </Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('CadastrarDespesa', {
                            id: id,
                            refresh: this.loadData })}
                        style={{
                            position: 'absolute',
                            bottom: 40,
                            right: 20,
                            padding: 10 }}
                    >
                        <Image source={require('../../../assets/add-trip.png')} />
                    </TouchableOpacity>
                </View>
                <FlatList style={{ flex: 1 }}
                        contentContainerStyle={{
                            paddingTop: 16,
                            paddingLeft: 16
                        }}
                        keyExtractor={ item => item.id.toString() }
                        data={ despesas }
                        renderItem={this.renderItem}
                />
            </View>
        );
    }
}

export default DespesaScreen