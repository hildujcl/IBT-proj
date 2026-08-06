from collections import deque
import heapq

# 1. Build a Binary Search Tree (BST)

class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def insert(root, value):
    """Insert a value into the BST."""
    if root is None:
        return Node(value)

    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)

    return root


def inorder(root):
    """Print values in sorted order."""
    if root:
        inorder(root.left)
        print(root.value, end=" ")
        inorder(root.right)


print()
print("1. Binary Search Tree")

balances = [1200, 500, 1800, 750, 300, 1000, 1500]

root = None

for balance in balances:
    root = insert(root, balance)

print("Balances in sorted order:")
inorder(root)
print("\n")


# 2. Tree Height

def height(node):
    """Return the height of a binary tree."""
    if node is None:
        return 0

    return 1 + max(height(node.left), height(node.right))


print("-" * 50)
print("2. Tree Height")
print("Height of tree:", height(root))
print()

# 3. Graph BFS

graph = {
    "A": ["B", "C"],
    "B": ["D", "E"],
    "C": ["F"],
    "D": [],
    "E": ["F"],
    "F": []
}

def bfs(graph, start):
    """Breadth-First Search."""
    visited = set()
    queue = deque([start])

    while queue:
        vertex = queue.popleft()

        if vertex not in visited:
            visited.add(vertex)

            for neighbor in graph[vertex]:
                if neighbor not in visited:
                    queue.append(neighbor)

    return visited


print("-"*50)
print("3. Graph BFS")

reachable = bfs(graph, "A")

print("Reachable vertices:", reachable)
print()

# 4. Graph DFS

def dfs(graph, start, visited=None):
    """Depth-First Search (Recursive)."""
    if visited is None:
        visited = []

    visited.append(start)

    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

    return visited


print("-" * 50)
print("4. Graph DFS")

visit_order = dfs(graph, "A")

print("DFS visit order:", visit_order)
print()

print("Comparison")
print("BFS explores level by level.")
print("DFS explores one branch before backtracking.")
print()
# 5. Priority Queue (heapq)

print("-" * 50)
print("5. Priority Queue")

tasks = []

heapq.heappush(tasks, (3, "Write report"))
heapq.heappush(tasks, (1, "Answer email"))
heapq.heappush(tasks, (5, "Take a break"))
heapq.heappush(tasks, (2, "Attend meeting"))
heapq.heappush(tasks, (4, "Review code"))

print("Tasks in priority order:")

while tasks:
    priority, task = heapq.heappop(tasks)
    print(f"Priority {priority}: {task}")
    