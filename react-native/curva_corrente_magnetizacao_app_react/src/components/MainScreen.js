import React from 'react';
import {
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Text,
    Dimensions,
    StyleSheet,
    StatusBar
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import circuit from '../resources/img/circuito.jpg';

const { width, height } = Dimensions.get('window')

export default props => (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.container}>
            <StatusBar
                backgroundColor="#1565C0"
                barStyle="light-content"
            />
            <Image
                source={circuit}
                style={styles.circuitImg}
            />
            <View style={{ marginTop: 20, alignItems: 'center' }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        Actions.PlotScreen();
                    }}
                >
                    <Text style={{ color: 'white'}}>Visualizar Gráfico</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button2}
                    onPress={() => {
                        Actions.InfoScreen();
                    }}
                >
                    <Text style={{ color: '#2196F3'}}>Mais Informações</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ScrollView>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    circuitImg: {
        marginTop: height*0.1,
        width:width*0.7,
        height: width*0.7*292/330,
        marginBottom: 30
    },
    button: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#2196F3',
        padding: 10,
        width: width*.5,
        elevation: 5,
    },
    button2: {
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: 'white',
        width: width*.4,
        padding: 5,
        elevation: 2,
        marginBottom: 20
    }
});