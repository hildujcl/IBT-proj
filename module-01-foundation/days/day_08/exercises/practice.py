
import random
# 1. Recursive Sum

def total(nums):
    if not nums:          # Base case
        return 0
    return nums[0] + total(nums[1:])


def count_down(n):
    if n <= 0:            # Base case
        return
    print(n)
    count_down(n - 1)


print("1. Recursive Sum")
numbers = [10, 20, 30, 40, 50]
print("Numbers:", numbers)
print("Total:", total(numbers))

print("\nCountdown:")
count_down(5)


# 2. Binary Search


def binary_search(items, target):
    left = 0
    right = len(items) - 1

    while left <= right:
        mid = (left + right) // 2

        if items[mid] == target:
            return mid
        elif items[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1


print("\n2. Binary Search")

balances = [100, 250, 300, 450, 600, 750, 900, 1200]

target = 750

index = binary_search(balances, target)

print("Balances:", balances)
print(f"Searching for {target}")
print("Index:", index)


# 3. Merge Sort


def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])

    return result


def merge_sort(items):
    if len(items) <= 1:
        return items

    mid = len(items) // 2

    left = merge_sort(items[:mid])
    right = merge_sort(items[mid:])

    return merge(left, right)


print("\n3. Merge Sort")

random_list = random.sample(range(1, 100), 10)

print("Original :", random_list)
print("MergeSort:", merge_sort(random_list))
print("sorted() :", sorted(random_list))


# 4. Sort with a Key


print("\n4. Sort with a Key")

customers = [
    ("Abel", 1200),
    ("Sara", 1800),
    ("John", 650),
    ("Liya", 950),
    ("Dawit", 400),
]

sorted_customers = sorted(
    customers,
    key=lambda customer: customer[1],
    reverse=True
)

print("Sorted by balance (highest first):")

for name, balance in sorted_customers:
    print(f"{name:<10} {balance}")

# 5. Two Pointers


def has_pair(nums, target):
    left = 0
    right = len(nums) - 1

    while left < right:
        current = nums[left] + nums[right]

        if current == target:
            return True
        elif current < target:
            left += 1
        else:
            right -= 1

    return False


print("\n5. Two Pointers")

numbers = [2, 4, 6, 8, 10, 12, 15]

target = 18

print("Numbers:", numbers)
print("Target:", target)
print("Pair exists:", has_pair(numbers, target))