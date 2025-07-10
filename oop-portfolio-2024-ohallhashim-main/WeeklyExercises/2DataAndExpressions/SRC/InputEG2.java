import java.util.Scanner;

public class InputEG2 {

    public static void main(String[] args) {
        System.out.println("Please Enter your name: ");

        Scanner scan = new Scanner(System.in);
        String personName = scan.nextLine();

        System.out.println("Hello " + personName);

        if (personName.length()<6 ) {
            System.out.println(personName + " is a short name");
        }
        else {
            System.out.println(personName + " is a long name");
        }
        scan.close();

    }
}
