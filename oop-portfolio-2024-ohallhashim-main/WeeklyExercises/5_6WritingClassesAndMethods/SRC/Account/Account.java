package Account;

public class Account {

    private String name;
    private String accountNumber;
    private double balance;

    public Account(String name, String accountNumber,  double balance) {
        this.name = name;
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    public Account(String name, String accountNumber) {
        this.name = name;
        this.accountNumber = accountNumber;
        this.balance = 0;
    }

    public String getName() {
        return name;
    }
    public String getAccountNumber() {
        return accountNumber;
    }
    public double getBalance() {
        return balance;
    }
}