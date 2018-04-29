import React, { Component } from 'react';
import {
    View,
    Image,
    Picker
} from 'react-native';

const linear = require('everpolate').linear;
const numjs = require('numjs');

const cast_iron_bh_curve = require('../resources/bh_curves_data/Castings-Cast-Iron.json');
const electrical_steel_bh_curve = require('../resources/bh_curves_data/Electrical-Steel-NGO-35PN250.json');
const low_carbon_steel_bh_curve = require('../resources/bh_curves_data/Low-Carbon-Steel-SAE1020.json');

export default class PlotScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            material: props.material,
            bh_curve: null
        }
    }

    plot(){
        //Plota o gráfico da corrente de excitação em função do tempo
        var { bh_curve } = this.state
        if(bh_curve){
            const Erms = 220; // V
            const Emax = Erms*Math.sqrt(2); // V
            const f = 60; // Hz
            const N = 400; // espiras
            const lm = 0.35; // m
            const An = 0.0008; // m
            const pi = np.pi;

            t = numjs.arange(0, 0.1, 0.0001); // s
            mag_flux = numjs.cos(t.multiply(2*pi*f)).multiply(Emax/(2*N*pi*f)); // Wb
            
            // Extrai da curva BH os valores de B e H
            var data_H = bh_curve.H;
            var data_B = bh_curve.B;
            
            // Determina o lado da curva BH para H<0 considerando a simetria
            data_H = numjs.concatenate([-data_H,data_H])
            data_B = numjs.concatenate([-data_B,data_B])
            
            // Calcula a relação entre fluxo e corrente a partir da curva BH
            data_i = data_H.multiply(lm/N);
            data_mag_flux = data_B.multiply(An)

            // Calcula a corrente excitação a partir do fluxo gerado pela tensão de excitação
            // e da relação corrente-fluxo calculada a partir da curva BH
            i_phi = linear(mag_flux.tolist(), data_mag_flux.tolist(), data_i.tolist());
            this.setState({
                time: t.tolist(),
                mag_current: i_phi.tolist()
            })
        }
    }

    render = () => (
        <View>
            <Picker
                selectedValue={this.state.bh_curve}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) => this.setState({bh_curve: itemValue})}>
                <Picker.Item label="Castings-Cast-Iron" value={cast_iron_bh_curve} />
                <Picker.Item label="Electrical-Steel-NGO-35PN250" value={electrical_steel_bh_curve} />
                <Picker.Item label="Low-Carbon-Steel-SAE1020" value={low_carbon_steel_bh_curve} />
            </Picker>
        </View>
    )
}
