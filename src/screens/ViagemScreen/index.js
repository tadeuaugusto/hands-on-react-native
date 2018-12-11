import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import Viagem from './Viagem';
import { FlatList } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';

class ViagemScreen extends Component {

    static navigationOption = {
        header: null
    }

    state = {
        viagens: []
    }

    componentDidMount() {
        this.loadData();
    }

    // recupera as viagens do async storage e salva no state
    loadData = async() => {
        const viagensStorage = await AsyncStorage.getItem('trips');
        console.log('[ViagemScreen] viagensStorage (ANTES): ', viagensStorage);
        console.log('[ViagemScreen] viagensStorage.length (ANTES): ', viagensStorage.length);

        let viagens = [];
        if (viagensStorage) {
            viagens = JSON.parse(viagensStorage);
        }

        this.setState({ viagens: viagens });
        console.log('[ViagemScreen] state.viagens (DEPOIS): ', this.state.viagens);
        console.log('[ViagemScreen] state.viagens.length (DEPOIS): ', this.state.viagens.length);
    }

    renderItem = viagem => {
        return <Viagem onPress={() => {
            this.props.navigation.navigate('DespesaScreen', {
            // viagem: viagem.item
            id: viagem.item.id,
            refresh: this.loadData
        })
        }} title={ viagem.item.viagem } price={ viagem.item.price }
        />
    }
    /*
    renderItem = viagem => {
        // console.log('viagem: ', viagem);
        return <Viagem onPress={() => this.props.navigation.navigate('DespesaScreen', {
            viagem: viagem.item
        })}
            title={ viagem.item.viagem }
            thumbnail={ viagem.item.thumbnail }
            price={ viagem.item.price }
        />
    }
    */

    render() {
        const { viagens } = this.state;
        /*
        [
            { id: '1', viagem: 'Praga', lat: '48.928258', lng: '16.120291', thumbnail: 'https://i.imgur.com/LNKc5V3.jpg', price: 1000 },
            { id: '2', viagem: 'Amsterdam', lat: '48.928258', lng: '16.120291', thumbnail: 'https://i.imgur.com/ZLY8rUI.jpg', price: 1000 },
            { id: '3', viagem: 'Bruxelas', lat: '48.928258', lng: '16.120291', thumbnail: 'https://i.imgur.com/eyeCyYV.jpg', price: 1000 },
            { id: '4', viagem: 'Leewardenn', lat: '48.928258', lng: '16.120291', thumbnail: 'https://i.imgur.com/ZLY8rUI.jpg', price: 1000 },
            { id: '5', viagem: 'Cork', lat: '48.928258', lng: '16.120291', thumbnail: 'https://i.imgur.com/eyeCyYV.jpg', price: 1000 },
        ]
        */

        return (
            <View style={{
                backgroundColor: 'yellow',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'stretch'
            }}>
                <View style={{ flex: 1}}>
                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('CadastrarViagem', { refresh: this.loadData })}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 20,
                            padding: 10 }}
                    >
                        <Image source={require('../../../assets/add-trip.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: 'white' }}>
                    <FlatList
                        data={viagens}
                        renderItem={this.renderItem}
                        horizontal
                        pagingEnabled
                        keyExtractor={ item => item.id.toString() } />
                </View>
            </View>
        )
    }
}

export default ViagemScreen