package Account;

public class Transactions {
    public static void main(String[] args) {

        Account newAccount = new Account("Ordemia Hashim", "33652825");

        System.out.println("Name: " + newAccount.getName());
        System.out.println("Account Number: " + newAccount.getAccountNumber());
        System.out.println("Balance: " + newAccount.getBalance());
    }
}