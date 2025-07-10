package PlayerStatistics;// Base class

public abstract class PlayerStats {
    protected String playerName;
    protected String teamName;

    public PlayerStats(String playerName, String teamName) {
        this.playerName = playerName;
        this.teamName = teamName;
    }
    public void displayPlayerInfo() {
        System.out.println("Player: " + playerName + ", Team: " + teamName);
    }

    public abstract void displayStats();
}




