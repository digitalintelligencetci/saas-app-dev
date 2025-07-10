package Cards;


public class Card {

    private String suit;
    private String faceValue;

    public Card(String suit, String faceValue) {
        this.suit = suit;
        this.faceValue = faceValue;
    }
    public String getSuit() {
        return suit;
    }
    public String getFaceValue() {
        return faceValue;
    }
    @Override
    public String toString() {
        return faceValue + " of " + suit;
    }
}
