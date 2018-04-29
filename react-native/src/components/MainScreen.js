import React from 'react';
import {
    View,
    Image,
    Button,
    Text
} from 'react-native';
import { Actions } from 'react-native-router-flux'

import circuit from '../resources/img/circuito.jpg';

export default props => (
    <View style={{ alignItems: 'center' }}>
        <Image
            source={circuit}
            style={{ width:200, height: 200*292/330, }}
        />
        <Button
            title='Plotar'
            onPress={() => {
                Actions.PlotScreen();
            }}
        /> 
    </View>
)
