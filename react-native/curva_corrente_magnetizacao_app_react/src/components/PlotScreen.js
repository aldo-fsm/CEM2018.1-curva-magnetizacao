import React, { Component } from 'react';
import {
    View,
    Image,
    Picker,
    StyleSheet,
    Slider
} from 'react-native';

import { linear } from 'everpolate';
import njs from 'numeric';
import ChartView from 'react-native-highcharts';

const cast_iron_bh_curve = require('../resources/bh_curves_data/Castings-Cast-Iron.json');
const electrical_steel_bh_curve = require('../resources/bh_curves_data/Electrical-Steel-NGO-35PN250.json');
const low_carbon_steel_bh_curve = require('../resources/bh_curves_data/Low-Carbon-Steel-SAE1020.json');

const constants = {
    // Intervalo de tempo para calcular a corrente (0 a 0.1s) (com 1000 pontos)
    t: njs.linspace(0,0.1,1000) // s
}

export default class PlotScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            circuit_data: {
                Erms: 220, // V
                f: 60, // Hz
                N: 400, // espiras
                lm: 0.35, // m
                An: 0.0008, // m
                material: 'cast-iron'
            },
            mag_current: undefined
        }
    }

    //Calcula a corrente de excitação no período de 0 a 0.1s
    calculateCurrent(){

        //extrai os dados do circuito
        const { Erms, f, N, lm, An, material } = this.state.circuit_data;
        
        if(material){

            var bh_curve;
            if(material === 'cast-iron'){
                bh_curve = cast_iron_bh_curve;
            } else if(material === 'electrical-steel'){
                bh_curve = electrical_steel_bh_curve;
            } else if(material === 'low-carbon'){
                bh_curve = low_carbon_steel_bh_curve;
            } else{
                return null;
            }

            const pi = Math.PI;
            const Emax = Erms*Math.sqrt(2); // V
            const t = constants.t // s
            
            // Calcula o fluxo magnético gerado pela corrente de excitação
            mag_flux = njs.mul(Emax/(2*N*pi*f), njs.cos(njs.mul(2*pi*f,t))) // Wb

            // Extrai da curva BH os valores de B e H
            var data_H = bh_curve.H;
            var data_B = bh_curve.B;
            
            // Determina o lado da curva BH para H<0 considerando a simetria
            neg_data_H = njs.neg(data_H).reverse();
            neg_data_H.pop();
            neg_data_B = njs.neg(data_B).reverse();
            neg_data_B.pop();
            
            data_H = neg_data_H.concat(data_H);
            data_B = neg_data_B.concat(data_B);
            
            // Calcula a relação entre fluxo e corrente a partir da curva BH
            data_i = njs.mul(lm/N, data_H);
            data_mag_flux = njs.mul(An, data_B);

            // Calcula a corrente excitação a partir do fluxo gerado pela tensão de excitação
            // e da relação corrente-fluxo calculada a partir da curva BH
            i_phi = linear(mag_flux, data_mag_flux, data_i);

            return i_phi;
        }
        return null;
    }

    componentDidMount(){
        this.calculateCurrent();
    }

    render(){
        const circuit_data = this.state.circuit_data;
        const mag_current = this.calculateCurrent();
        console.log(mag_current)
        var Highcharts='Highcharts';
        var conf={
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
            },
            title: {
                text: 'Corrente de Magnetização'
            },
            xAxis: {
                title: {
                    text: 'Tempo (s)'
                },
                tickPixelInterval: 30
            },
            yAxis: {
                title: {
                    text: 'Corrente (A)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        't = ' + Highcharts.numberFormat(this.x, 2) + '; ' +
                        'i = ' + Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'corrente de magnetização',
                data: (function () {
                    var data = [], i = 0;
                    if(mag_current){
                        for (i = 0; i < constants.t.length; i += 1) {
                            data.push({
                                x: constants.t[i],
                                y: mag_current[i]
                            });
                        }
                    }
                    return data;
                }())
            }]
        };
    
        const options = {
            global: {
                useUTC: false
            },
            lang: {
                decimalPoint: ',',
                thousandsSep: '.'
            }
        };
        return (
            <View style={styles.container}>
                <View style={styles.chartContainer}>
                    <ChartView style={{height:300}} config={conf} options={options}></ChartView>
                </View>
                <Picker
                    selectedValue={circuit_data.material}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => this.setState({circuit_data:{...circuit_data, material: itemValue}})}>
                    <Picker.Item label="Castings-Cast-Iron" value={'cast-iron'} />
                    <Picker.Item label="Electrical-Steel-NGO-35PN250" value={'electrical-steel'} />
                    <Picker.Item label="Low-Carbon-Steel-SAE1020" value={'low-carbon'} />
                </Picker>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        flex: 1
    },
    chartContainer: {
    },
    picker: {
    }
})