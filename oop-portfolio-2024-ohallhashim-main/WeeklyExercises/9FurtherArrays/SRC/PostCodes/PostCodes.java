package PostCodes;

import java.util.Scanner;

public class PostCodes {
    private Person[] people;
    private int numberOfPeople;

    public PostCodes() {
        people = new Person[25];
        numberOfPeople = 0;
    }

    public void addPerson(String firstName, String lastName, String postalCode) {
        if (numberOfPeople < 25) {
            people[numberOfPeople] = new Person(firstName, lastName, postalCode);
            numberOfPeople++;
        } else {
            System.out.println("Cannot add more people, array is full");
        }
    }

    public void printPeople() {
        for (int i = 0; i < numberOfPeople; i++) {
            System.out.println(people[i]);
        }
    }

    public static void main(String[] args) {
        PostCodes postCodes = new PostCodes();
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter first name, last name and postal code separated by tabs (up to 25 entries):");

        while (postCodes.numberOfPeople < 25 && scanner.hasNextLine()) {
            String[] input = scanner.nextLine().split("\t");
            if (input.length == 3) {
                postCodes.addPerson(input[0], input[1], input[2]);
            } else {
                System.out.println("Invalid input format");
            }
        }

        postCodes.printPeople();
        scanner.close();
    }
}