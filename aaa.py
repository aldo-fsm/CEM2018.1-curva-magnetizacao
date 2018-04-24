import pandas as pd
from matplotlib import pyplot as plt
bh_curve = pd.read_excel('Electrical-Steel-NGO-35PN250.xls')
data = bh_curve.iloc[2:,:2].head()
B,H = data.values.transpose()
plt.plot(H,B)


