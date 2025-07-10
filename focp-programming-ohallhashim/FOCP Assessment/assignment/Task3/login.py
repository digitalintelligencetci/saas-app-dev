#!/usr/bin/env python3

if __name__ == '__main__':

    import getpass

# Function to prompt user to login
    def login(filename):
        while True:
            username = input("Enter your username: ").lower()
            password = getpass.getpass("Enter your password: ")

# Function to check if username and password are blank
            if not username and not password:
                print("Error: Both username and password cannot be blank.")
                continue
            elif not username:
                print("Error: Username cannot be blank.")
                continue
            elif not password:
                print("Error: Password cannot be blank.")
                continue

            with open(filename, 'r') as f:
                lines = f.readlines()

            user_exists = any(username in line for line in lines)
            password_correct = any(password in line for line in lines)

            if user_exists and password_correct:
                print(f"Access granted. User {username} is logged in.")
                break
            if not user_exists:
                print(f"User {username} does not exist. Please try again.")
            if not password_correct:
                print(f"Access denied. Please enter the correct password.")

login('passwd.txt')