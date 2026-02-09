import matplotlib.pyplot as plt
import math

# Events and times (years before present)
events = [
    ("Big Bang", 1.38e10),
    ("Earth forms", 4.5e9),
    ("Species", 5.4e8),
    ("Primates", 6e7),
    ("Genus Homo", 2e6),
    ("Sapiens", 3e5),
    ("Agriculture", 1.2e4),
    ("Scientific revolution", 5e2),
    ("Present Day", 0)
]

labels = [e[0] for e in events]
times = [e[1] for e in events]

# Create plot
plt.figure()
plt.scatter(times, [1]*len(times))
plt.xscale("log")
plt.yticks([])

# Annotate points
for label, time in events:
    plt.annotate(label, (time, 1), xytext=(0, 10), textcoords="offset points", ha="center", rotation=45)

plt.xlabel("Years before present (log scale)")
plt.title("Critical Milestones in Universal History (Log Time Scale)")

plt.show()
