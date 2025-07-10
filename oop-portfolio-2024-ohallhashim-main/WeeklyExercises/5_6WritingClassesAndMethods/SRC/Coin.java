public class Coin {

     private final int HEADS = 0; // final - CONSTANT
     private final int TAILS = 1;
     private final int TOTAL = 2;

     private int face = HEADS;

     private int[] count = new int[3];

     public Coin() {
        face = (int) (Math.random() * 2);
     }
     public String getFace() {
        if(face==HEADS) return "HEAD";
        else return "TAILS";
     }
    public void flip() {
        face = (int) (Math.random() * 2);
        count[TOTAL] ++;
        if(face==HEADS) count[HEADS] ++;
        else count[TAILS] ++;
     }
     @Override
     public String toString() {
        return "The coin was flipped " + count[TOTAL] + " times. " + count[HEADS] + " heads and " + count[TAILS] + " tails.";
     }
}
