# Variables
bill_total = 1200  # ETB
people = 10

# List of friends
names = ["Abel","Sara","John","Liya","Dawit","Marta","Samuel","Helen","Nahom","Ruth"]

# Function to split the bill
def split_bill(total, people, tip_rate=0.10):
    total_with_tip = total + (total * tip_rate)
    per_person = total_with_tip / people
    return per_person

# Calculate each person's share
share = split_bill(bill_total, people)

# Print results
print(f"Bill Total: {bill_total} ETB")
print(f"Number of People: {people}")
print(f"Each Person Pays: {share:.2f} ETB\n")

# Loop through names
for name in names:
    print(f"{name} pays {share:.2f} ETB")

# Dictionary to store customer totals
customers = {}

try:
    # Open the transaction file
    with open(r"C:\Users\HP\Documents\IBT\sq2-hildana-asfaw\module-01-foundation\days\day_03\exercises\transactions.txt", "r") as file:
        # Read one line at a time
        for line in file:
            line = line.strip()
            # Skip empty lines
            if line == "":
                continue

            # Split name and amount
            name, amount = line.split(",")
            amount = float(amount)

            # Add amount to dictionary
            if name in customers:
                customers[name] += amount
            else:
                customers[name] = amount

    # Sort customers by total spending (highest first)
    sorted_customers = sorted(
        customers.items(),
        key=lambda item: item[1],
        reverse=True
    )

    print("Customer Spending Report")
    print("-" * 30)

    # Write report
    with open("report.txt", "w") as report:
        for name, total in sorted_customers:
            print(f"{name:<10} ETB {total:.2f}")
            report.write(f"{name:<10} ETB {total:.2f}\n")

    print("\nReport saved to report.txt")

except FileNotFoundError:
    print("Error: transactions.txt was not found.")
