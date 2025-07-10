#!/usr/bin/env python3

if __name__ == '__main__':

    def delete_user(filename):
        while True:
            username = input("Enter the username to delete: ").lower()

            # Function to read the file line by line
            with open(filename, 'r') as f:
                lines = f.readlines()

            # Function to check if user exists in the file
            user_exists = any(username in line for line in lines)

            # Function to delete the user from the file
            if user_exists:
                with open(filename, 'w') as f:
                    for line in lines:
                        if username not in line:
                            f.write(line)
                print(f"User {username} deleted successfully.")
                break
            else:
                print(f"User {username} does not exist. Please try again.")


    delete_user('passwd.txt')





