# Pharmacy Inventory Tracker

# Initial inventory
inventory = {
    "Paracetamol": 50,
    "Amoxicillin": 25,
    "Vitamin C": 100,
    "Ibuprofen": 40
}


# Display inventory
def show_inventory():
    print("\nCurrent Inventory")
    print()

    for medicine, quantity in inventory.items():
        print(f"{medicine}: {quantity}")

    print()
# Add stock
def add_stock():
    medicine = input("Medicine name: ").title()

    try:
        quantity = int(input("Quantity to add: "))

        if medicine in inventory:
            inventory[medicine] += quantity
        else:
            inventory[medicine] = quantity

        print("Stock updated successfully!")

    except ValueError:
        print("Please enter a valid number.")
# Save inventory
def save_inventory():
    with open("inventory.txt", "w") as file:
        for medicine, quantity in inventory.items():
            file.write(f"{medicine},{quantity}\n")

    print("Inventory saved.")
    # Load inventory
def load_inventory():
    global inventory

    try:
        with open("inventory.txt", "r") as file:
            inventory = {}

            for line in file:
                medicine, quantity = line.strip().split(",")
                inventory[medicine] = int(quantity)

        print("Inventory loaded.")

    except FileNotFoundError:
        print("No inventory file found. Using default inventory.")
        # Main Program
load_inventory()

while True:
    print("\n Pharmacy Inventory Tracker ")
    print("1. View Inventory")
    print("2. Add Stock")
    print("3. Save Inventory")
    print("4. Exit")

    choice = input("Choose an option: ")

    if choice == "1":
        show_inventory()

    elif choice == "2":
        add_stock()
    elif choice == "3":
        save_inventory()

    elif choice == "4":
        save_inventory()
        print("Goodbye!")
        break

    else:
        print("Invalid choice. Try again.")
