package PlayerStatistics;// Driver class

public class Main {
    public static void main(String[] args) {
        FootballStats footballPlayer = new FootballStats("Lionel Messi", "PSG", 30, 10);
        CricketStats cricketPlayer = new CricketStats("Virat Kohli", "RCB", 500, 0);

        footballPlayer.displayPlayerInfo();
        footballPlayer.displayStats();

        cricketPlayer.displayPlayerInfo();
        cricketPlayer.displayStats();
    }
}