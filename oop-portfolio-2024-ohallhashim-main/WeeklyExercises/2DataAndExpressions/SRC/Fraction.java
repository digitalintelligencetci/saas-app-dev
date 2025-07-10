import java.util.Scanner;

public class Fraction {

    public static void main(String[] args) {

        Scanner scan = new Scanner(System.in);

        System.out.println("Please enter the numerator: ");
        int numerator = scan.nextInt();

        System.out.println("Please enter the denominator: ");
        int denominator = scan.nextInt();

        double fraction = (double)numerator / denominator;
        System.out.println("The fraction of the decimal is: " + fraction);

        scan.close();
    }
}

