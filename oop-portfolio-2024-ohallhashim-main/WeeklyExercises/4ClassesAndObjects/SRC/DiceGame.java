import java.util.Scanner;
import java.util.Random;

public class DiceGame {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();

        System.out.print("How many sides does die 1 have? ");
        int sidesDice1 = scanner.nextInt();
        System.out.print("How many sides does die 2 have? ");
        int sidesDice2 = scanner.nextInt();

        int sumDice1 = 0, sumDice2 = 0;

        for (int i = 1; i <= 3; i++) {
            int rollDice1 = random.nextInt(sidesDice1) + 1;
            int rollDice2 = random.nextInt(sidesDice2) + 1;
            sumDice1 += rollDice1;
            sumDice2 += rollDice2;

            System.out.println("Die 1 " + getOrdinal(i) + " roll = " + rollDice1 + ".");
            System.out.println("Die 2 " + getOrdinal(i) + " roll = " + rollDice2 + ".");
        }
        double avgDice1 = (double) sumDice1 / 3;
        double avgDice2 = (double) sumDice2 / 3;

        System.out.println("Die 1 rolled a total of " + sumDice1 + " and rolled " + avgDice1 + " on average.");
        System.out.println("Die 2 rolled a total of " + sumDice2 + " and rolled " + avgDice2 + " on average.");
    }
    private static String getOrdinal(int i) {
        switch (i) {
            case 1:
                return "first";
            case 2:
                return "second";
            case 3:
                return "third";
            default:
                return i + "th";
        }
    }
}