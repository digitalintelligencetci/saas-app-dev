x = 7000
x = x + 3000
print(x)

x = 7000
x += 3000
print(x)

x = 7000    
x -= 3000
print(x)


#define a function that adds two numbers

if __name__ == '__main__':
    def add_numbers(num1, num2):
     return 50 + 40

#call the function with two numbers
result = add_numbers(3, 4)

print("The sum of the numbers is " + str(result))