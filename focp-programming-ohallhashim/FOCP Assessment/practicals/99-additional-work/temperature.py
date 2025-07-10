#!/usr/bin/env python3

if __name__ == '__main__':
    temp_Celsius = int(input("Enter a temperature in Celsius: "))
    temp_Farenheit = ((temp_Celsius*9)/5) + 32

    print("Temperature in Farenheit is " + str (temp_Farenheit))

    #(0°C × 9/5) + 32