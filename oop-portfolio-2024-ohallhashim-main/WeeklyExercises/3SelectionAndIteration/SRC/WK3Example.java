import java.util.Random;
public class WK3Example {

    public static void main(String[] args){
        System.out.println("Rolling a Dice...");

        Dice myDice = new Dice(1000);

        myDice.rollDice();
        int currentNumber = myDice.getCurrentNumber();

        /*
        Random numbers = new Random();
        int currentNumber = numbers.nextInt(7);+
         */

        // make a Dice
        // rule a Dice
        // get the Dice Number

        System.out.println("The number rolled is " + currentNumber);
    }
}
