# Function to add two numbers
def add(x, y):
    return x + y

# Function to subtract two numbers
def subtract(x, y):
    return x - y

# Function to multiply two numbers
def multiply(x, y):
    return x * y

# Function to divide two numbers
def divide(x, y):
    if y == 0:
        return "Cannot divide by zero"
    return x / y

# Main calculator loop
while True:
    print("Options:")
    print("Enter 'add' for addition")
    print("Enter 'subtract' for subtraction")
    print("Enter 'multiply' for multiplication")
    print("Enter 'divide' for division")
    print("Enter 'quit' to end the program")
    
    user_input = input(": ")
    
    if user_input == "quit":
        break
    elif user_input in ("add", "subtract", "multiply", "divide"):
        num1 = float(input("Enter first number: "))
        num2 = float(input("Enter second number: "))
        
        if user_input == "add":
            print("Result:", add(num1, num2))
        elif user_input == "subtract":
            print("Result:", subtract(num1, num2))
        elif user_input == "multiply":
            print("Result:", multiply(num1, num2))
        elif user_input == "divide":
            print("Result:", divide(num1, num2))
    else:
        print("Invalid input. Please enter a valid option.")
mkdir nodejs_calculator
cd nodejs_calculator
npm init -y
npm install express body-parser
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Define a route for adding two numbers using a GET request
app.get('/add', (req, res) => {
  const { num1, num2 } = req.query;
  if (!num1 || !num2) {
    return res.status(400).json({ error: 'Please provide num1 and num2 query parameters.' });
  }

  const result = parseFloat(num1) + parseFloat(num2);
  res.json({ result });
});

// Define a route for performing basic calculator operations using a POST request
app.post('/calculate', (req, res) => {
  const { operation, num1, num2 } = req.body;

  if (!operation || !num1 || !num2) {
    return res.status(400).json({ error: 'Please provide operation, num1, and num2 in the request body.' });
  }

  let result;
  switch (operation) {
    case 'add':
      result = parseFloat(num1) + parseFloat(num2);
      break;
    case 'subtract':
      result = parseFloat(num1) - parseFloat(num2);
      break;
    case 'multiply':
      result = parseFloat(num1) * parseFloat(num2);
      break;
    case 'divide':
      if (parseFloat(num2) === 0) {
        return res.status(400).json({ error: 'Cannot divide by zero.' });
      }
      result = parseFloat(num1) / parseFloat(num2);
      break;
    default:
      return res.status(400).json({ error: 'Invalid operation. Supported operations: add, subtract, multiply, divide.' });
  }

  res.json({ result });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


