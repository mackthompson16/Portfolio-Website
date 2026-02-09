import pandas as pd
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D  # noqa: F401

data = [
    ("Judaism", 7, 4, 6),
    ("Christianity", 6, 5, 4),
    ("Islam", 5, 6, 8),
    ("Hindu", 4, 6, 6),
    ("Buddhism", 2, 9, 8),
    ("Tao", 2, 8, 4),
    ("Atheism", 5, 5, 5),
    ("Nihilism", 3, 4, 2),
]

df = pd.DataFrame(data, columns=["Worldview", "Ego", "Humility", "Discipline"])

fig = plt.figure()
ax = fig.add_subplot(111, projection="3d")

ax.scatter(df["Ego"], df["Humility"], df["Discipline"])

for _, r in df.iterrows():
    ax.text(r["Ego"], r["Humility"], r["Discipline"], r["Worldview"], fontsize=9)

ax.set_xlabel("Ego (0–10)")
ax.set_ylabel("Humility (0–10)")
ax.set_zlabel("Discipline (0–10)")
ax.set_title("Relative Placement of Worldviews on Ego–Humility–Discipline")

ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.set_zlim(0, 10)

plt.show()

df
