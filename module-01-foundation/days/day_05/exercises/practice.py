from abc import ABC , abstractmethod

# Abstract Base Class
class Vehicle(ABC):
    def __init__(self, make, model):
    
        self.make = make
        self.model = model

    def describe(self):
        print(f"Make: {self.make}, Model: {self.model}")

    @abstractmethod
    def wheels(self):
        pass


# Car Class
class Car(Vehicle):
    def init(self, make, model):
        super().init(make, model)

    def wheels(self):
        return 4


# Truck Class
class Truck(Vehicle):
    def init(self, make, model, capacity):
        super().init(make, model)
        self.capacity = capacity

    # Override describe()
    def describe(self):
        super().describe()
        print(f"Capacity: {self.capacity} tons")

    def wheels(self):
        return 6


# Main Program
    if Vehicle == "main":
     car1 = Car("Toyota", "Corolla")
    car2 =  Car("Honda", "Civic")
    truck1 = Truck("Volvo", "FH16", 25)

    vehicles = [car1, car2, truck1]

    for vehicle in vehicles:
        vehicle.describe()
        print("Wheels:", vehicle.wheels())
        print("-" * 30)
