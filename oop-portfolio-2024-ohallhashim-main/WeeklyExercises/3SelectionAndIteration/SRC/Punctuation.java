import java.util.*;

class Punctuation {
    public static void main(String[] args) {
        String text = "Mary had a little lamb, her fleece was as white snow, and everywhere Mary went, the lamb was sure to go. -that was a nice poem- the end. ";
        Set<Character> punctuationMarks = new HashSet<>(Arrays.asList('.', ',', '-', ':', ';', '!', '?'));
        Map<Character, Integer> counts = new HashMap<>();

        for (char c : text.toCharArray()) {
            if (punctuationMarks.contains(c)) {
                counts.put(c, counts.getOrDefault(c, 0) + 1);
            }
        }

        for (Map.Entry<Character, Integer> entry : counts.entrySet()) {
            System.out.println("Punctuation Mark: " + entry.getKey() + ", Count: " + entry.getValue());
        }
    }
}