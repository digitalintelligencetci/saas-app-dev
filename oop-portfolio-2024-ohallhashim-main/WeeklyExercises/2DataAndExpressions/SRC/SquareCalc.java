import java.util.Scanner;
public class SquareCalc {

    public static void main(String[] args) {

        Scanner scan = new Scanner(System.in);

        System.out.println("Please enter square's side value: ");
        int sideLength = scan.nextInt();

        int perimeter = 4 * sideLength;
        int area = sideLength * sideLength;

        System.out.println("Perimeter's square calculation: " + perimeter);
        System.out.println("Area of square calculation: " + area);

        scan.close();
    }
}
