# program to print cicle to screen
import os
import math 
import time

os.system("cls")

outside = int(input("Give diameter: "))

while(True):
  for inside in range(outside-1):
    square = ""
    os.system("cls")
    for x in range(int(-outside/2), int(outside/2)):
      for y in range(int(-outside/2), int(outside/2)):
        radius = math.sqrt(x*x + y*y)
        if(radius < outside/2 and radius > inside/2):
          square += "  "
        else:
          square += "# "
      square += "\n"
    print(square)
    time.sleep(0.005)

  for inside in range(outside-1, 0, -1):
    square = ""
    os.system("cls")
    for x in range(int(-outside/2), int(outside/2)):
      for y in range(int(-outside/2), int(outside/2)):
        radius = math.sqrt(x*x + y*y)
        if(radius < outside/2 and radius > inside/2):
          square += "  "
        else:
          square += "# "
      square += "\n"
    print(square)
    time.sleep(0.005)