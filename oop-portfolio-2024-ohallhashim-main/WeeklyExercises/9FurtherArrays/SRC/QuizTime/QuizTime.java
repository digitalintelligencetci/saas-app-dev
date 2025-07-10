package QuizTime;

public class QuizTime {
    public static void main(String[] args) {
        Quiz quiz = new Quiz();
        quiz.add(new Question("What is the capital of France?", "Paris"));
        quiz.add(new Question("What is 2 + 2?", "4"));
        // add more questions as needed

        int score = quiz.giveQuiz();
        System.out.println("Final score: " + score);
    }
}
