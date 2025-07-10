package Cards;

import java.util.List;
import java.util.Random;
import java.util.Arrays;

public class CardMain {

    public static void main(String[] args) {
        List<String> suits = Arrays.asList("Spades", "Hearts", "Diamonds", "Clubs");
        List<String> faceValues = Arrays.asList("Ace" , "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King");

        Random random = new Random();

        for (int i = 0; i < 5; i++) {
            String randomSuit = suits.get(random.nextInt(suits.size()));
            String randomFaceValue = faceValues.get(random.nextInt(faceValues.size()));

            Card card = new Card(randomSuit, randomFaceValue);
            System.out.println(card);
        }
    }
}
