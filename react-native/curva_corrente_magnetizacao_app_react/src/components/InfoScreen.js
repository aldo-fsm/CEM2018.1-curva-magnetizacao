import React from 'react';
import {
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import circuit from '../resources/img/circuito.jpg';

const { width, height } = Dimensions.get('window')

export default props => (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.container}>
            <Text style={styles.text}>
                {'\t'}Este aplicativo, desenvolvido para a disciplina de Conversão Eletromecânica 
                de Energia da Escola Politécnica de Pernambuco, tem como objetivo plotar a curva da 
                corrente de magnetização de um núcleo magnético que pode ser construido de 3 
                diferentes materiais, submetido a uma fonte de tensão alternada.
            </Text>
            <View style={{ alignSelf: 'center', alignItems: 'center'}}>
                <Image
                    source={circuit}
                    style={styles.circuitImg}
                />
                <Text style={{ fontSize: 12, marginBottom: 12 }}>
                    Circuito magnético
                </Text>
            </View>
            <Text style={styles.text}>
                Foram selecionados os seguintes materiais: {'\n'}
                {'\t'}{'\t'}- Castings-Cast-Iron{'\n'}
                {'\t'}{'\t'}- Electrical-Steel-NGO-35PN250{'\n'}
                {'\t'}{'\t'}- Low-Carbon-Steel-SAE1020{'\n'}
            </Text>
            <Text style={styles.text}>
                Equipe: {'\n'}
                {'\t'}{'\t'}- Aldo Ferreira de Souza Monteiro{'\n'}
                {'\t'}{'\t'}- Aryell Dias de Menezes{'\n'}
                {'\t'}{'\t'}- Emerson da Silva Carneiro{'\n'}
                {'\t'}{'\t'}- Maria Gabriely Lima da Silva{'\n'}
            </Text>
        </View>
    </ScrollView>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        alignItems: 'flex-start',
        backgroundColor: 'white',
        marginTop: 20,
    },
    text: {
        fontSize: 15
    },
    circuitImg: {
        marginTop: 20,
        width:width*0.5,
        height: width*0.5*292/330,
    },
});