import java.util.Scanner;
import java.text.NumberFormat;

public class Salary {

    public static void main(String[] args) {

        Scanner scan = new Scanner(System.in);

        System.out.print ("Enter the current salary: ");
        double currentSalary = scan.nextDouble();

        System.out.print ("Enter the performance rating (Excellent, Good, or Poor): ");
        scan.nextLine();
        String rating = scan.nextLine();

        double percent = 0;

        if ("Excellent".equals(rating)) {
            percent = 0.06;
        } else if ("Good".equals(rating)) {
            percent = 0.04;
        } else if ("Poor".equals(rating)) {
            percent = 0.015;
        }

        double raiseAmount = currentSalary * percent;
        double newSalary = currentSalary + raiseAmount;

        NumberFormat money = NumberFormat.getCurrencyInstance();

        System.out.println("Current Salary:       " + money.format(currentSalary));
        System.out.println("Amount of your raise: " + money.format(raiseAmount));
        System.out.println("Your new salary:      " + money.format(newSalary));

        scan.close();
    }
}