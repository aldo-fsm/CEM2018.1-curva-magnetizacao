import React from "react";
import { Router, Scene, Stack } from "react-native-router-flux";

import MainScreen from './components/MainScreen';
import PlotScreen from './components/PlotScreen';
import InfoScreen from './components/InfoScreen';


export default props => (
    <Router
        navigationBarStyle={{
            backgroundColor: '#1976D2',
        }}
        titleStyle={{ color: 'white'}}
    >
        <Stack key="root">
            <Scene key="MainScreen" component={MainScreen} title="Corrente de Magnetização" initial/>
            <Scene key="PlotScreen" component={PlotScreen} title="Visualização"/>
            <Scene key="InfoScreen" component={InfoScreen} title="Sobre o Projeto"/>
        </Stack>
    </Router>
)