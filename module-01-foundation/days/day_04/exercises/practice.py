# 1.book class 
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def describe(self):
        print(f'"{self.title}" by {self.author} - {self.pages} pages')
        # Create two Book objects
book1 = Book("Python Basics", "Abel", 250)
book2 = Book("Clean Code", "Robert C. Martin", 464)

print(" Books ")
book1.describe()
book2.describe()

# 2. Product Class

class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price          # ETB
        self.__quantity = quantity  # Private attribute
    
 # 3. Property Getter
    
    @property
    def quantity(self):
        return self.__quantity


# 4. Setter with Validation
    
    @quantity.setter
    def quantity(self, value):
        if value >= 0:
            self.__quantity = value
        else:
            print("Quantity cannot be negative!")

 # Restock products
    def restock(self, n):
        self.__quantity += n
        print(f"{self.name} restocked by {n}.")
        print(f"Current quantity: {self.__quantity}")

 # Sell products
    def sell(self, n):
        if n <= self.__quantity:
            self.__quantity -= n
            print(f"{n} {self.name}(s) sold.")
            print(f"Current quantity: {self.__quantity}")
        else:
            print("Not enough stock available!")

 # Display product information
    def display(self):
        print(f"Product: {self.name}")
        print(f"Price: {self.price} ETB")
        print(f"Quantity: {self.__quantity}")
        print()


  # Create Product objects
product1 = Product("Laptop", 50000, 10)
product2 = Product("Mouse", 800, 25)
product3 = Product("Keyboard", 1500, 15)

print("\n Initial Products ")
product1.display()
product2.display()
product3.display()


# Restock and Sell
print(" Restock Laptop ")
product1.restock(5)

print("\n Sell Laptop ")
product1.sell(8)

print("\n Try to Sell Too Many ")
product1.sell(20)


# 5. Prove Object Independence

print("\n Object Independence ")

product1.sell(2)

print("\nProduct 1")
product1.display()

print("Product 2")
product2.display()

print("Product 3")
product3.display()