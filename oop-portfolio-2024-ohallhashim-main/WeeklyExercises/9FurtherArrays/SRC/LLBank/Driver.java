package LLBank;

public class Driver {
    public static void main(String[] args) {
        Bank bank = new Bank();
        bank.createAccount("655455", 8000);
        bank.createAccount("899456", 2000);

        Account account = bank.getAccount("655455");
        account.deposit(500);
        account.withdraw(200);

        bank.addInterestToAllAccounts();

        System.out.println("Account balance after interest: " + account.getBalance());
    }
}