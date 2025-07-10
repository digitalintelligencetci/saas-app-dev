import java.util.Random;
import java.util.Scanner;

public class PinEncryp {
    public static void main(String[] args) {

        Scanner scan = new Scanner(System.in);
        System.out.print("Enter a 4 digit pin number to encrypt: ");
        int pin = scan.nextInt();
        
        String hexPin = Integer.toHexString(pin);

        Random random = new Random();
        int randomNum1 = 1000 + random.nextInt(64536);
        int randomNum2 = 1000 + random.nextInt(64536);

        String hexRandomNum1 = Integer.toHexString(randomNum1);
        String hexRandomNum2 = Integer.toHexString(randomNum2);

        String encryptedPin = hexRandomNum1 + hexPin + hexRandomNum2;

        System.out.println("Your encrypted Pin number is: " + encryptedPin);

        scan.close();
    }

}