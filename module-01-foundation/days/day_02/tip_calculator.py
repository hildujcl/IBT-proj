#Telebirr Tip Calculator 
#variables
bill_total = 1200  # ETB
people = 4

# List of friends
names = ["bruk", "hilu", "John", "Liya"]

# Function
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
    