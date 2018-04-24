import pandas as pd
import numpy as np
from scipy.interpolate import interp1d
from matplotlib import pyplot as plt

Erms = 220 # V
Emax = Erms*np.sqrt(2) # V
f = 60 # Hz
N = 400 # espiras
lm = 0.35 # m
An = 0.0008 # m
pi = np.pi

t = np.linspace(0, 0.1, 1000) # s
mag_flux = Emax/(2*N*pi*f)*np.cos(2*pi*f*t) # Wb

def plot_magnetization_curve(bh_curve_path):
    data = pd.read_excel(bh_curve_path)
    data = data.iloc[2:,:2]
    data_H, data_B = data.values.transpose()
    data_H = np.concatenate([-data_H,data_H])
    data_B = np.concatenate([-data_B,data_B])
    data_i = lm/N*data_H
    data_mag_flux = An*data_B

    i_phi = interp1d(data_mag_flux, data_i, fill_value='extrapolate')(mag_flux)
    fig = plt.figure()
    ax = fig.subplots(1,1)
    ax.set_xlabel('tempo (s)')
    ax.set_ylabel('corrente de excitação (A)')
    ax.plot(t, i_phi)
    ax.grid()
    return fig