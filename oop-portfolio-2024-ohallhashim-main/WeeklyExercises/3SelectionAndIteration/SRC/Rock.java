import java.util.Scanner;
import java.util.Random;

public class Rock {
    public static void main(String[] args) {
        String personPlay; 
        String computerPlay = "";
        int computerInt;

        Scanner scan = new Scanner(System.in);
        Random generator = new Random();

        
        System.out.print("Enter your play (R, P, or S): ");
        personPlay = scan.next().toUpperCase();

        computerInt = generator.nextInt(3);

        switch (computerInt) {
            case 0:
                computerPlay = "R";
                break;
            case 1:
                computerPlay = "P";
                break;
            case 2:
                computerPlay = "S";
                break;
        }

        System.out.println("Computer plays: " + computerPlay);

        if (personPlay.equals(computerPlay)) {
            System.out.println("It's a tie!");
        } else if ((personPlay.equals("R") && computerPlay.equals("S")) ||
                (personPlay.equals("P") && computerPlay.equals("R")) ||
                (personPlay.equals("S") && computerPlay.equals("P"))) {
            System.out.println("You win! " + personPlay + " beats " + computerPlay);
        } else {
            System.out.println("Computer wins! " + computerPlay + " beats " + personPlay);
        }
    }
}