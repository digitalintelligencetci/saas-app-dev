#!/usr/bin/env python3

if __name__ == '__main__':
    temp_1 = int(input('Enter 8am temp: '))
    temp_2 = int(input('Enter 10am temp: '))
    temp_3 = int(input('Enter 12pm temp: '))
    temp_4 = int(input('Enter 2pm temp: '))
    temp_5 = int(input('Enter 4pm temp: '))
    temp_6 = int(input('Enter 6pm temp: '))

    temp = "11C"
    temp = int(temp[:-1])

    Highest_temp = max(temp_1, temp_2, temp_3, temp_4, temp_5, temp_6)
    Lowest_temp = min(temp_1, temp_2, temp_3, temp_4, temp_5, temp_6)
    Average_temp = (temp_1 + temp_2 + temp_3 + temp_4 + temp_5, temp_6 /6)

    print(f'Highest Temp : {Highest_temp}')
    print(f'Lowest Temp:  {Lowest_temp}')
    print(f'Average Temp: {Average_temp}')