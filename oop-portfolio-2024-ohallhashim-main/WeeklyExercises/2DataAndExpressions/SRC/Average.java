
import java.util.Scanner;
public class Average {

    public static void main(String[] args) {

        Scanner scan = new Scanner(System.in);

        System.out.println("Please enter three integers and" + " I will compute their average.");

        System.out.println("Please enter the first value: ");
        int val1 = scan.nextInt();

        System.out.println("Please enter the second value: ");
        int val2 = scan.nextInt();

        System.out.println("Please enter the third value: ");
        int val3 = scan.nextInt();

        double average = (val1 + val2 + val3) / 3.0;

        System.out.println("The average is " + (average));

        scan.close();
    }
}