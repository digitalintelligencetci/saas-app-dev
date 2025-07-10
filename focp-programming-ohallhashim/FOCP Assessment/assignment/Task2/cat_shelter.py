#!/usr/bin/env python3

if __name__ == '__main__':

    import sys

    filename = sys.argv[1]

try:
    with open(filename, 'r') as f:
        total_entries = 0
        intruder_doused = 0
        # Duration Data for Correct Cat:
        total_time_spent = 0
        correct_cat_entries = 0
        min_visit = float('inf')
        average_visit = 0
        max_visit = 0

        # Read the file line by line
        for line in f:
            if line.strip() == 'END':
                break

        # Split the line into its components
            cat_status, entry_time, departure_time = line.split(',')
            entry_time, departure_time = int(entry_time), int(departure_time)
            visit_duration = departure_time - entry_time
            total_entries += 1

            if cat_status.strip() == "OURS":
                correct_cat_entries += 1
                total_time_spent += visit_duration
                min_visit = min(min_visit, visit_duration)
                max_visit = max(max_visit, visit_duration)
            if cat_status.strip() == "THEIRS":
                intruder_doused += 1

            if correct_cat_entries > 0:
                average_visit = total_time_spent / correct_cat_entries
            else:
                average_visit = 0

        # Program output results
        print("=============================")
        print("Cat Shelter Log File Analysis")
        print("=============================")

        print(f"Cat Visits: {total_entries}")
        print(f'Intruder Cats: {intruder_doused}')

        # Conversion of total time spent to hours and minutes
        hours = total_time_spent // 60
        minutes = total_time_spent % 60
        print(f'Total Time in House:    {hours} Hours, {minutes} Minutes')

        # Conversion of average visit duration to minutes
        print(f'Average Visit Length:   {round(average_visit)} Minutes')
        print(f'Longest Visit:          {max_visit} Minutes')
        print(f'Shortest Visit:         {min_visit} Minutes')

# Error Handling
except FileNotFoundError:
    print(f'Cannot open {filename}')
except IndexError:
    print(f'Missing command line argument: {filename}')