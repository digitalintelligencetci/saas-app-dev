#!/usr/bin/env python3

# Variables for base prices
BPP_PIZZA_COST = 12.00
TUESDAY_DISCOUNT = 0.50
DELIVERY_COST = 2.50
APP_DISCOUNT = 0.25


# Function to get the number of pizzas ordered
def get_pizza_number():
    while True:
        try:
            pizza_number = int(input("How many pizzas ordered? "))
            if pizza_number > 0:
                return pizza_number
            else:
                print("Please enter a positive integer!")
        except ValueError:
            print("Please enter a valid number!")


# Function to ask if delivery is required
def delivery_input():
    while True:
        try:
            is_delivery_required = input("Is delivery required? ").lower()
            if is_delivery_required in ["yes", "y"]:
                return True
            elif is_delivery_required in ["no", "n"]:
                return False
        except ValueError:
            print("Please enter Y or N")


# Function to ask if it is Tuesday
def is_tuesday():
    while True:
        is_it_tuesday = input("Is it Tuesday? ").lower()
        if is_it_tuesday in ["yes", "y"]:
            return True
        elif is_it_tuesday in ["no", "n"]:
            return False
        else:
            print("Please enter Y or N")


# Function to ask if the order is placed via the BPP App
def is_app_order():
    while True:
        is_it_app_order = input("Did you use the app? ").lower()
        if is_it_app_order in ["yes", "y"]:
            return True
        elif is_it_app_order in ["no", "n"]:
            return False
        else:
            print("Please enter Y or N")


# Function to calculate the total cost of pizzas
def calculate_pizza_cost(pizza_number, is_tuesday):
    total_pizza_cost = pizza_number * BPP_PIZZA_COST
    if is_tuesday:
        total_pizza_cost -= total_pizza_cost * TUESDAY_DISCOUNT
    return total_pizza_cost


# Function to calculate the delivery cost
def calculate_delivery_cost(pizza_number):
    if pizza_number >= 5:
        return 0
    else:
        return DELIVERY_COST


# Function to calculate the total cost
def calculate_total_cost(pizza_cost, delivery_cost, is_app_order):
    total_cost = pizza_cost + delivery_cost
    if is_app_order:
        total_cost -= total_cost * APP_DISCOUNT
    return round(total_cost, 2)


if __name__ == '__main__':
    print("==========================")
    print("BPP Pizza Price Calculator")
    print("==========================")

# Function calls
    pizza_number = get_pizza_number()
    is_delivery_required = delivery_input()
    is_tuesday = is_tuesday()
    is_app_order = is_app_order()

    pizza_cost = calculate_pizza_cost(pizza_number, is_tuesday)
    delivery_cost = calculate_delivery_cost(pizza_number)
    total_cost = calculate_total_cost(pizza_cost, delivery_cost, is_app_order)

    print(f"Total cost: £{total_cost:.2f}")

