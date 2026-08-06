# temperature level
temperature = float(input("Enter the temperature in °C: "))

if temperature < 15:
    print("cold")
elif temperature <= 28:
    print("warm")
else:
    print("hot")
#  Receipt Loop
print("\nReceipt Numbers:")
for number in range(1, 11):
    print(f"Receipt #{number}")
#  Even Numbers
print("\nEven Numbers from 1 to 20:")
for number in range(1, 21):
    if number % 2 == 0:
        print(number)
# Discount Function

def apply_discount(price, percent=10):
    return price - (price * percent / 100)


print("\nDiscount Function:")
print("Price after default discount:", apply_discount(100))
print("Price after 20% discount:", apply_discount(100, 20))

# Countdown
print("\nCountdown:")
count = 5

while count >= 1:
    print(count)
    count -= 1

print("Liftoff!")
