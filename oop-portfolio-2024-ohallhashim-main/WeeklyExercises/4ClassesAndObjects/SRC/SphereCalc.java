import java.util.Scanner;

public class SphereCalc {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter the radius of the sphere: ");
        double radius = scanner.nextDouble();

        double volume = (4 * Math.PI * Math.pow(radius, 3)) / 3;
        double surfaceArea = 4 * Math.PI * Math.pow(radius, 2);

        System.out.printf("Volume = %.4f\n", volume);
        System.out.printf("Surface Area = %.4f\n", surfaceArea);
    }
}
