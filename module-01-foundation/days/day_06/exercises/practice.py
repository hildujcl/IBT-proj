
# SOLID Principles & Design Patterns Practice
# 1. Spot the SRP Violation (Single Responsibility Principle)


print("=" * 50)
print("1. Single Responsibility Principle (SRP)")
print("=" * 50)


class Report:
    def build(self):
        print("Building report...")


class ReportSaver:
    def save(self):
        print("Saving report to file...")


class ReportEmailer:
    def email(self):
        print("Emailing report...")


report = Report()
saver = ReportSaver()
emailer = ReportEmailer()

report.build()
saver.save()
emailer.email()

print()



# 2. Refactor to OCP (Open/Closed Principle)


print("=" * 50)
print("2. Open/Closed Principle (OCP)")
print("=" * 50)


class Shape:
    def area(self):
        pass


class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius ** 2


class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2


class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):
        return 0.5 * self.base * self.height


shapes = [
    Circle(5),
    Square(4),
    Triangle(6, 3)
]

for shape in shapes:
    print(f"Area = {shape.area()}")

print()



# 3. Singleton Pattern


print("=" * 50)
print("3. Singleton Pattern")
print("=" * 50)


class AppSettings:

    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.currency = "ETB"
        return cls._instance


settings1 = AppSettings()
settings2 = AppSettings()

print("Currency:", settings1.currency)
print("Same object?", settings1 is settings2)

print()


# 4. Factory Pattern

print("=" * 50)
print("4. Factory Pattern")
print("=" * 50)


class Circle:
    def draw(self):
        print("Drawing Circle")


class Square:
    def draw(self):
        print("Drawing Square")


class Triangle:
    def draw(self):
        print("Drawing Triangle")


class ShapeFactory:

    @staticmethod
    def create(kind):

        if kind.lower() == "circle":
            return Circle()

        elif kind.lower() == "square":
            return Square()

        elif kind.lower() == "triangle":
            return Triangle()

        else:
            return None


shape1 = ShapeFactory.create("circle")
shape2 = ShapeFactory.create("square")
shape3 = ShapeFactory.create("triangle")

shape1.draw()
shape2.draw()
shape3.draw()

print()



# 5. Observer Pattern


print("=" * 50)
print("5. Observer Pattern")
print("=" * 50)


class NewsAgency:

    def __init__(self):
        self.subscribers = []

    def subscribe(self, subscriber):
        self.subscribers.append(subscriber)

    def notify(self, news):
        for subscriber in self.subscribers:
            subscriber.update(news)


class EmailSubscriber:

    def update(self, news):
        print(f"Email Subscriber received: {news}")


class SMSSubscriber:

    def update(self, news):
        print(f"SMS Subscriber received: {news}")


agency = NewsAgency()

email = EmailSubscriber()
sms = SMSSubscriber()

agency.subscribe(email)
agency.subscribe(sms)

agency.notify("Breaking News: Python 3.15 Released!")