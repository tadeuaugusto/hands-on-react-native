import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Viagem from './Viagem';
import { FlatList } from 'react-native-gesture-handler';

class ViagemScreen extends Component {

    static navigationOption = {
        header: null
    }

    renderItem = viagem => {
        console.log('viagem: ', viagem);
        return <Viagem onPress={() => this.props.navigation.navigate('DespesaScreen', {
            viagem: viagem.item
        })} title={ viagem.item.name } thumbnail={ viagem.item.thumbnail }
        />
    }

    render() {
        const viagens = [
            { id: '1', name: 'Praga', lat: '48.928258', lng: '16.120291', thumbnail: 'https://i.imgur.com/LNKc5V3.jpg', price: 1000 },
            { id: '2', name: 'Amsterdam', lat: '48.928258', lng: '16.120291', thumbnail: 'https://i.imgur.com/ZLY8rUI.jpg', price: 1000 },
            { id: '3', name: 'Bruxelas', lat: '48.928258', lng: '16.120291', thumbnail: 'https://i.imgur.com/eyeCyYV.jpg', price: 1000 },
            { id: '4', name: 'Leewardenn', lat: '48.928258', lng: '16.120291', thumbnail: 'https://i.imgur.com/ZLY8rUI.jpg', price: 1000 },
            { id: '5', name: 'Cork', lat: '48.928258', lng: '16.120291', thumbnail: 'https://i.imgur.com/eyeCyYV.jpg', price: 1000 },
        ]

        return (
            <View style={{
                backgroundColor: 'yellow',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'stretch'
            }}>
                <View style={{ backgroundColor: 'red', flex: 1}}>
                    <Text>Map</Text>
                </View>
                <View style={{ backgroundColor: 'green' }}>
                    <FlatList
                        data={viagens}
                        renderItem={this.renderItem}
                        horizontal
                        pagingEnabled
                        keyExtractor={ item => item.id } />
                </View>
            </View>
        )
    }
}

export default ViagemScreen