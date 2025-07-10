import java.util.Random;
public class Dice {

    private int sides;
    private int currentNumber;

    public Dice() {
        this.sides = 6;
    }
    public Dice(int sides) {
        this.sides = sides;
    }
    public void rollDice() {
        Random numbers = new Random();
        this.currentNumber = numbers.nextInt(sides)+1;
        }

        public int getCurrentNumber() {
        return this.currentNumber;
    }

}
