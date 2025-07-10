import javax.swing.JFrame;
import java.awt.FlowLayout;

public class MainClass {
    public static void main(String[] args) {
        new MainClass();
    }

    public MainClass() {
        JFrame mainFrame = new JFrame();
        mainFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        mainFrame.setLayout(new FlowLayout());
        TurtleGraphics turtleGraphics = new TurtleGraphics();
        mainFrame.add(turtleGraphics);
        mainFrame.pack();
        mainFrame.setVisible(true);
    }
}