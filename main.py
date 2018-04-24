from kivy.app import App
from kivy.uix.button import Button
from kivy.uix.screenmanager import Screen, ScreenManager
from kivy.uix.boxlayout import BoxLayout
from kivy.garden.matplotlib.backend_kivyagg import FigureCanvasKivyAgg
from curva_excitacao import plot_magnetization_curve
from matplotlib import pyplot as plt

class PlotScreen(Screen):
    graph = None
    def plot(self, bh_curve_path):
        figure = plot_magnetization_curve(bh_curve_path)
        box = self.screen_manager.get_screen('plot_screen').graph_container
        if self.graph:
            box.remove_widget(self.graph)
        self.graph = FigureCanvasKivyAgg(figure=figure, id='graph')
        box.add_widget(self.graph)

class Main(App):
    def build(self):
        return ScreenManager()

Main().run()