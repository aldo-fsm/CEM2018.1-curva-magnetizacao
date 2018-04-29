import React from "react";
import { Router, Scene, Stack } from "react-native-router-flux";

import MainScreen from './components/MainScreen';
import PlotScreen from './components/PlotScreen';


export default props => (
    <Router>
        <Stack key="root">
            <Scene key="MainScreen" component={MainScreen} title="Tela1"/>
            <Scene key="PlotScreen" component={PlotScreen} title="Tela2" initial/>
        </Stack>
    </Router>
)