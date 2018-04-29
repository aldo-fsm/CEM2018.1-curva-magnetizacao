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
    """Plota o gráfico da corrente de excitação em função do tempo
    
    Arguments:
        bh_curve_path {string} -- Caminho para a tabela com a curva BH do material do núcleo magnético
    
    Returns:
        Figure -- matplotlib Figure com o gráfico da corrente de excitação em função do tempo
    """
    # Carrega a tabela com a curva BH
    data = pd.read_excel(bh_curve_path)
   
    # Remove o cabeçalho e seleciona apenas as 2 primeiras colunas (H, B)
    data = data.iloc[2:,:2]
   
    # Extrai os valores de B e H
    data_H, data_B = data.values.transpose()
   
    # Determina o lado da curva BH para H<0 considerando a simetria
    data_H = np.concatenate([-data_H,data_H])
    data_B = np.concatenate([-data_B,data_B])
   
    # Calcula a relação entre fluxo e corrente a partir da curva BH
    data_i = lm/N*data_H
    data_mag_flux = An*data_B

    # Calcula a corrente excitação a partir do fluxo gerado pela tensão de excitação
    # e da relação corrente-fluxo calculada a partir da curva BH
    i_phi = interp1d(data_mag_flux, data_i, fill_value='extrapolate')(mag_flux)
   
    # Plota a curva de excitação
    fig = plt.figure()
    ax = fig.subplots(1,1)
    ax.set_xlabel('tempo (s)')
    ax.set_ylabel('corrente de excitação (A)')
    ax.plot(t, i_phi)
    ax.grid()
    return fig