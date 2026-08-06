from collections import deque

class AccountRegistry:

    def __init__(self):
        self.accounts = []

    def add_account(self, account):
        self.accounts.append(account)

    # Leaderboard
    def top_by_balance(self, n):
        return sorted(
            self.accounts,
            key=lambda account: account.balance,
            reverse=True
        )[:n]

    # Binary Search
    def find_by_number(self, account_number):

        sorted_accounts = sorted(
            self.accounts,
            key=lambda account: account.account_number
        )

        left = 0
        right = len(sorted_accounts) - 1

        while left <= right:

            mid = (left + right) // 2

            if sorted_accounts[mid].account_number == account_number:
                return sorted_accounts[mid]

            elif sorted_accounts[mid].account_number < account_number:
                left = mid + 1

            else:
                right = mid - 1

        return None

    # Recursive Total
    def total_transactions(self, account):

        def recursive_sum(items):

            if len(items) == 0:
                return 0

            return items[0] + recursive_sum(items[1:])

        return recursive_sum(account.transactions)
    from collections import deque


class Branch:
    def __init__(self, name):
        self.name = name
        self.children = []      # Sub-branches
        self.accounts = []      # Accounts in this branch

    def add_child(self, branch):
        self.children.append(branch)

    def add_account(self, account):
        self.accounts.append(account)

    # Recursive total balance
    def total_balance(self):
        total = sum(account.balance for account in self.accounts)

        for child in self.children:
            total += child.total_balance()

        return total


def bfs(transfers, start):
    visited = set()
    queue = deque([start])

    while queue:
        current = queue.popleft()

        if current not in visited:
            visited.add(current)

            for neighbor in transfers.get(current, []):
                if neighbor not in visited:
                    queue.append(neighbor)

    return visited