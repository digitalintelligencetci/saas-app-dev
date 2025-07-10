package QuizTime;

import java.util.Scanner;

class Quiz {
    private Question[] questions;
    private int count;

    public Quiz() {
        questions = new Question[25];
        count = 0;
    }

    public void add(Question question) {
        if (count < 25) {
            questions[count++] = question;
        }
    }

    public int giveQuiz() {
        Scanner scanner = new Scanner(System.in);
        int score = 0;
        for (int i = 0; i < count; i++) {
            System.out.println(questions[i].getQuestion());
            String response = scanner.nextLine();
            if (questions[i].checkAnswer(response)) {
                score++;
            }
        }
        return score;
    }
}