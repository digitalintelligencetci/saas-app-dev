package Histogram;

import java.util.Scanner;

public class Histogram {
    public static void main(String[] args) {
        int[] ranges = new int[10];
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter integers between 1 and 100. Enter -1 to stop.");
        while (true) {
            int input = scanner.nextInt();
            if (input == -1) {
                break;
            }
            if (input < 1 || input > 100) {
                System.out.println("Invalid input. Please enter a number between 1 and 100.");
                continue;
            }
            int index = (input - 1) / 10;
            ranges[index]++;
        }

        for (int i = 0; i < 10; i++) {
            System.out.print((i * 10 + 1) + "-" + ((i + 1) * 10) + " | ");
            for (int j = 0; j < ranges[i]; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}