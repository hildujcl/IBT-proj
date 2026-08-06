# 1. Unique Cities
print("1. Unique Cities")
cities = [
    "Addis Ababa",
    "Adama",
    "Bahir Dar",
    "Addis Ababa",
    "Hawassa",
    "Adama",
    "Mekelle"
]

unique_cities = set(cities)

print("Distinct Cities:", unique_cities)
print("Number of unique cities:", len(unique_cities))

print()
# 2. Price Report
print("2. Price Report")

groceries = {
    "Bread": 45,
    "Milk": 90,
    "Rice": 160,
    "Sugar": 120,
    "Eggs": 18
}

for item, price in groceries.items():
    print(f"{item}: {price} ETB")

print()
# 3. Tax Comprehension
print("3. Tax Comprehension")

prices = [100, 250, 400, 80]

prices_with_tax = [price * 1.15 for price in prices]

print("Original prices:", prices)
print("Prices with 15% tax:", prices_with_tax)

print()
# 4. Cheap Items
print("4. Cheap Items")

cheap_prices = [price for price in prices if price < 200]

print("Prices under 200 ETB:", cheap_prices)

print( )
# 5. Write & Read 
print("5. Write & Read ")

with open("names.txt", "w") as file:
    file.write("Hana\n")
    file.write("Saron\n")
    file.write("Ayelew\n")

print("Names from the file:")

with open("names.txt", "r") as file:
    for name in file:
        print(name.strip())

print()
# 6. Safe Division
print("6. Safe Division")

try:
    number = float(input("Enter a number: "))
    result = 1000 / number
    print("Result:", result)

except ValueError:
    print("Invalid input! Please enter a number.")

except ZeroDivisionError:
    print("You cannot divide by zero.")
