import java.util.Scanner;

public class Reverse {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a sentence: ");
        String sentence = scanner.nextLine();

        String[] words = sentence.split("\\s+");

        System.out.print("Reversed words: ");
        for (String word: words) {
            StringBuilder reversed = new StringBuilder(word);

            System.out.print(reversed.reverse() + " ");

            scanner.close();
        }
    }
}