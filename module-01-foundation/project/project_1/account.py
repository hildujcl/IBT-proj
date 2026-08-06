class Account:
    def __init__(self, owner, account_number, balance):
        self.owner = owner
        self.account_number = account_number
        self._balance = balance
        self.observers = []
        self.transactions = []  

    @property
    def balance(self):
        return self._balance

    def add_observer(self, observer):
        self.observers.append(observer)

    def notify(self, message):
        for observer in self.observers:
            observer.notify(message)

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
            self.transactions.append(amount) 
            print(f"Deposited {amount} ETB")
            self.notify(
                f"{amount} ETB deposited. New balance: {self._balance} ETB"
            )

    def withdraw(self, amount):
        if amount > 0 and amount <= self._balance:
            self._balance -= amount
            self.transactions.append(-amount)
            print(f"Withdrew {amount} ETB")
            self.notify(
                f"{amount} ETB withdrawn. New balance: {self._balance} ETB"
            )
        else:
            print("Insufficient balance.")


class SavingAccount(Account):
    def __init__(self, owner, account_number, balance, rate=0.05):
        super().__init__(owner, account_number, balance)
        self.rate = rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)


class CurrentAccount(Account):
    def __init__(self, owner, account_number, balance, overdraft_limit=500):
        super().__init__(owner, account_number, balance)
        self.limit = overdraft_limit

    def withdraw(self, amount):
     if amount > 0 and amount <= self.balance + self.limit:
        self._balance -= amount
        self.transactions.append(-amount)
        print(f"Withdrew {amount} ETB")
        self.notify(
            f"{amount} ETB withdrawn. New balance: {self.balance} ETB"
        )
     else:
        print("Insufficient balance.")
           
        
    def statement(self):
        print("\nCurrent Account")
        print("Owner:", self.owner)
        print("Account:", self.account_number)
        print("Balance:", self.balance)


class AccountFactory:
    @staticmethod
    def create_account(kind, owner, account_number, balance):
        if kind == "saving":
            return SavingAccount(owner, account_number, balance)

        elif kind == "current":
            return CurrentAccount(owner, account_number, balance)

        else:
            raise ValueError("Invalid account type")


class SMSAlert:
    def notify(self, message):
        print("SMS ALERT:", message)


class AuditingLog:
    def notify(self, message):
        print("AUDIT:", message)
        