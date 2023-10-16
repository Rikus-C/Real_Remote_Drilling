import time
import json
import ping3

import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from collections import dequecd

def ping_ipv4_address(ip_address):  
  return ping3.ping(ip_address)

def plot_ping_values(buffer):
  print()

if __name__ == "__main__":
  plot_buffer = []
  fig, ax = plt.subplots()
  max_data_size = 1000  # Maximum data size
  x_data = deque(maxlen=max_data_size)
  y_data = deque(maxlen=max_data_size)
  line, = ax.plot([], [])

  json_file = open("../backend/settings/comms_settings.json", "r")
  settings = json.load(json_file)
  target_ip = "www.google.com"# settings["plc ipv4"]

  while(True):
    plot_buffer.append(ping_ipv4_address(target_ip))

    if(len(plot_buffer) > 1000):
      plot_buffer.pop(0)

    plot_ping_values(plot_buffer)
    time.sleep(0.1)
