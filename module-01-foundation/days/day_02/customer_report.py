               #mini project — TeleBirr Customer Report
# List of customers (name, balance)
customers = [
    ("Abel", 1200),
    ("Hana", 750),
    ("Samuel", 450),
    ("Sara", 1800),
    ("Miki", 300)
]

# Function to determine customer tier
def tier(balance):
    if balance >= 1000:
        return "Premium"
    elif balance >= 500:
        return "Standard"
    else:
        return "Basic"


# Counters
premium_count = 0
standard_count = 0
basic_count = 0

# Report Header
print("====== TeleBirr Customer Report ======")
print()

# Loop through customers
for name, balance in customers:
    customer_tier = tier(balance)

    print(f"Name: {name:<10} Tier: {customer_tier:<9} Balance: {balance} ETB")

    if customer_tier == "Premium":
        premium_count += 1
    elif customer_tier == "Standard":
        standard_count += 1
    else:
        basic_count += 1

# Summary
print("\n========== Summary ==========")
print(f"Premium Customers : {premium_count}")
print(f"Standard Customers: {standard_count}")
print(f"Basic Customers   : {basic_count}")