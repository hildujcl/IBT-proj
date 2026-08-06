# Data Structures & Big-O Practice

import time
from collections import deque
import bisect


# 1. Name the Big-O

print("=" * 50)
print("1. Big-O Examples")
print("=" * 50)

numbers = list(range(10))
student_scores = {"Abel": 90, "Sara": 95, "John": 88}

# O(1) - List Index
# Accessing an element by index takes constant time.
print("List Index:", numbers[5])

# O(n) - Single Loop
# The loop visits every element once.
for number in numbers:
    pass
print("Single loop completed.")

# O(n²) - Nested Loop
# Every element is compared with every other element.
for i in numbers:
    for j in numbers:
        pass
print("Nested loop completed.")

# O(1) - Dictionary Lookup
# Dictionary lookup is constant time on average.
print("Dictionary Lookup:", student_scores["Sara"])

# O(log n) - Binary Search
# Each step cuts the search space in half.
position = bisect.bisect_left(numbers, 7)
print("Binary Search found 7 at index:", position)

print()


# 2. List vs Dict Lookup


print("=" * 50)
print("2. List vs Dict Lookup")
print("=" * 50)

SIZE = 100000

# Build list of fake account numbers
accounts_list = [f"ACC{i:06}" for i in range(SIZE)]

# Build dictionary
accounts_dict = {f"ACC{i:06}": i for i in range(SIZE)}

target = accounts_list[-2]

# Time list lookup
start = time.perf_counter()

found = target in accounts_list

end = time.perf_counter()

list_time = end - start

# Time dictionary lookup
start = time.perf_counter()

found = target in accounts_dict

end = time.perf_counter()

dict_time = end - start

print(f"List lookup time : {list_time:.8f} seconds")
print(f"Dict lookup time : {dict_time:.8f} seconds")
print()

# 3. Stack Class
print("=" * 50)
print("3. Stack")
print("=" * 50)


class Stack:

    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if self.items:
            return self.items.pop()
        return None

    def peek(self):
        if self.items:
            return self.items[-1]
        return None

    def is_empty(self):
        return len(self.items) == 0


names = ["Abel", "Sara", "John", "Liya", "Samuel"]

stack = Stack()

for name in names:
    stack.push(name)

reversed_names = []

while not stack.is_empty():
    reversed_names.append(stack.pop())

print("Original:", names)
print("Reversed:", reversed_names)
print()


# 4. Queue using deque


print("=" * 50)
print("4. Bank Queue")
print("=" * 50)

bank_queue = deque()

customers = [
    "Abel",
    "Sara",
    "John",
    "Liya",
    "Samuel"
]

# Enqueue customers
for customer in customers:
    bank_queue.append(customer)
    print(customer, "joined the queue.")

print()

# Serve customers
while bank_queue:
    served = bank_queue.popleft()
    print("Serving:", served)

print()


# 5. Singly Linked List

print("=" * 50)
print("5. Singly Linked List")
print("=" * 50)

class Node:

    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:

    def __init__(self):
        self.head = None

    def push_front(self, data):

        new_node = Node(data)

        new_node.next = self.head

        self.head = new_node

    def print_all(self):

        current = self.head

        while current:
            print(current.data)
            current = current.next


linked_list = LinkedList()

linked_list.push_front("Samuel")
linked_list.push_front("Liya")
linked_list.push_front("John")
linked_list.push_front("Sara")
linked_list.push_front("Abel")

print("Linked List:")
linked_list.print_all()
