import java.util.Scanner;
public class Distance {

    public static void main(String[] args)  {

        Scanner scan = new Scanner(System.in);

        System.out.println("Please enter the miles value: ");
        float val1 = scan.nextInt();
        double Converter = val1 * 1.60935;
        System.out.println("The conversion value is " + Converter + "km");

        scan.close();

    }

}
