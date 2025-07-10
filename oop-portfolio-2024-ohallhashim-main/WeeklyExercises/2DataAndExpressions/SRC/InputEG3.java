import java.util.Scanner;

public class InputEG3 {

    public static void main(String[] args) {
        System.out.println("Please Enter your name: ");
        Scanner scan = new Scanner(System.in);
        String personName = scan.nextLine();
        for (int i = 0; i < personName.length(); i++) {
            if (personName.charAt(i) == 'a') {
                System.out.println("Found an A");
            } else {
                System.out.println(personName.charAt(i));
            }
        }
        scan.close();
    }
}

