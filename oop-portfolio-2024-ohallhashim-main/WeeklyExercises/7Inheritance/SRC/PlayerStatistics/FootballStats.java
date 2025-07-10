package PlayerStatistics;// Derived classes

public class FootballStats extends PlayerStats {
    private int goals;
    private int assists;

    public FootballStats(String playerName, String teamName, int goals, int assists) {
        super(playerName, teamName);
        this.goals = goals;
        this.assists = assists;
    }
    @Override
    public void displayStats() {
        System.out.println("Goals: " + goals + ", Assists: " + assists);
    }
}