package PlayerStatistics;

public class CricketStats extends PlayerStats {
    private int runs;
    private int wickets;

    public CricketStats(String playerName, String teamName, int runs, int wickets) {
        super(playerName, teamName);
        this.runs = runs;
        this.wickets = wickets;
    }
    @Override
    public void displayStats() {
        System.out.println("Runs: " + runs + ", Wickets: " + wickets);
    }
}