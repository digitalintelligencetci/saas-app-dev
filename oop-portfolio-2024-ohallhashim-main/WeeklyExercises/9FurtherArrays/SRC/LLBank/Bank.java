package LLBank;

public class Bank {
    private Account[] accounts;
    private int numberOfAccounts;

    public Bank() {
        accounts = new Account[30];
        numberOfAccounts = 0;
    }

    public void createAccount(String accountNumber, double initialBalance) {
        if (numberOfAccounts < 30) {
            accounts[numberOfAccounts] = new Account(accountNumber, initialBalance);
            numberOfAccounts++;
        } else {
            System.out.println("Bank is full, cannot create new account");
        }
    }

    public Account getAccount(String accountNumber) {
        for (int i = 0; i < numberOfAccounts; i++) {
            if (accounts[i].getAccountNumber().equals(accountNumber)) {
                return accounts[i];
            }
        }
        return null;
    }

    public void addInterestToAllAccounts() {
        for (int i = 0; i < numberOfAccounts; i++) {
            accounts[i].addInterest();
        }
    }
}