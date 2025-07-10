#!/usr/bin/env python3

if __name__ == '__main__':

# Function to add user to the passwd.txt file
    def add_user(filename):
        username = input("Enter the username: ").lower()
        fullname = input("Enter the full name: ")
        fullname = fullname.title()
        if not username:
            print("Username field cannot be empty.")
            return

        password = input("Enter the password: ")
        if not password:
            print("Password field cannot be empty.")
            return

# Check if the user already exists in the passwd.txt file line by line
        with open(filename, 'r+') as f:
            lines = f.readlines()

# If the user exists, print error message if not, add the user to the passwd.txt file
        if any(username in line for line in lines):
            print(f"Creation failed: User {username} already exists.")
        else:
            with open(filename, 'a') as f:
                f.write(f"{username}:{fullname}:{password}\n")
            print(f"User {username} created successfully.")
        print(f"{username}:{fullname}:{password}\n")

# Call the function to add user to the passwd.txt file
add_user('passwd.txt')

