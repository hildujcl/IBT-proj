from account import (
    Account,
    SavingAccount,
    CurrentAccount,
    AccountFactory,
    SMSAlert,
    AuditingLog,
)

from register import (AccountRegistry, 
                      Branch,
                      bfs, 
                      )

# Create observers
sms = SMSAlert()
audit = AuditingLog()

# Create registry
registry = AccountRegistry()

print(" Regular Account ")
acc1 = Account("Abel", "10008856734", 5000)
acc1.add_observer(sms)
acc1.add_observer(audit)
acc1.deposit(1000)
acc1.withdraw(500)

registry.add_account(acc1)

print("Balance:", acc1.balance)

print("\n Saving Account ")
save = SavingAccount("Sara", "20001111", 8000, 0.10)
save.add_observer(sms)
save.add_observer(audit)
save.add_interest()

registry.add_account(save)

print("Balance:", save.balance)

print("\n  Current Account ")
current = CurrentAccount("John", "30002222", 1000)
current.add_observer(sms)
current.add_observer(audit)
current.withdraw(1200)
current.statement()

registry.add_account(current)

print("\n Factory Pattern ")

factory_account = AccountFactory.create_account(
    "saving",
    "Hana",
    "40003333",
    6000
)

factory_account.add_observer(sms)
factory_account.add_observer(audit)

registry.add_account(factory_account)

print(type(factory_account).__name__)
print(factory_account.owner)
print(factory_account.balance)

print("\n  Top 3 Balances  ")

for account in registry.top_by_balance(3):
    print(
        f"{account.owner} | "
        f"{account.account_number} | "
        f"{account.balance} ETB"
    )

print("\n Binary Search ")

found = registry.find_by_number("20001111")

if found:
    print("Account Found:")
    print(found.owner)
    print(found.balance)
else:
    print("Account not found.")

print("\n Recursive Transaction Total ")

print(
    f"{acc1.owner}: "
    f"{registry.total_transactions(acc1)} ETB"
)

print(
    f"{save.owner}: "
    f"{registry.total_transactions(save)} ETB"
)
print("\n  Branch Tree   ")

# Create branches
head = Branch("Head Office")

north = Branch("North Region")
south = Branch("South Region")

bole = Branch("Bole Branch")
piassa = Branch("Piassa Branch")

# Build the tree (3 levels)
head.add_child(north)
head.add_child(south)

north.add_child(bole)
south.add_child(piassa)

# Add accounts to branches
bole.add_account(acc1)
bole.add_account(save)

piassa.add_account(current)
piassa.add_account(factory_account)

# Recursive balance
print("Total Balance:", head.total_balance(), "ETB")
print("\n   Transfers Graph (BFS)  ")

transfers = {
    acc1.account_number: [
        save.account_number,
        current.account_number
    ],

    save.account_number: [
        factory_account.account_number
    ],

    current.account_number: [],

    factory_account.account_number: [
        acc1.account_number
    ]
}

reachable = bfs(transfers, acc1.account_number)

print("Accounts reachable from", acc1.account_number)

for account_number in reachable:
    print(account_number)