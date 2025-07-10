import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics2D;
import javax.swing.JOptionPane;
import uk.ac.leedsbeckett.oop.OOPGraphics;

public class TurtleGraphics extends OOPGraphics {
    private final String[] commands = {"penup", "pendown", "turnleft", "turnright", "forward",
            "backward", "black", "red", "green", "white", "reset", "clear", "square", "pencolour",
            "penwidth", "triangle", "triangleeq"};

    public String[] getCommands() {
        return commands;
    }

    public void processCommand(String command) {
        String[] parts = command.split(" ");
        switch (parts[0]) {
            case "penup":
                penUp();
                break;
            case "pendown":
                penDown();
                break;
            case "turnleft":
                if (parts.length == 2) {
                    try {
                        int angle = Integer.parseInt(parts[1]);
                        turnLeft(angle);
                    } catch (NumberFormatException e) {
                        System.out.println("Invalid angle value.");
                    }
                } else {
                    System.out.println("Turnleft command requires 1 parameter.");
                }
                break;
            case "turnright":
                if (parts.length == 2) {
                    try {
                        int angle = Integer.parseInt(parts[1]);
                        turnRight(angle);
                    } catch (NumberFormatException e) {
                        System.out.println("Invalid angle value.");
                    }
                } else {
                    System.out.println("Turnright command requires 1 parameter.");
                }
                break;
            case "forward":
                if (parts.length == 1) {
                    System.out.println("Forward command requires 1 parameter.");
                } else {
                    try {
                        int distance = Integer.parseInt(parts[1]);
                        penUp();
                        penDown();
                        forward(distance);
                        setPenColour(Color.RED);
                    } catch (NumberFormatException e) {
                        System.out.println("Invalid distance value.");
                    }
                }
                break;
            case "backward":
                if (parts.length == 1) {
                    System.out.println("Backward command requires 1 parameter.");
                } else {
                    try {
                        int distance = Integer.parseInt(parts[1]);
                        penUp();
                        penDown();
                        forward(-distance);
                        setPenColour(Color.RED);
                    } catch (NumberFormatException e) {
                        System.out.println("Invalid distance value.");
                    }
                }
                break;
            case "square":
                penDown();
                drawSquare(100);
                break;
            case "black":
                penDown();
                setPenColour(Color.black);
                break;
            case "green":
                penDown();
                setPenColour(Color.green);
                break;
            case "white":
                penDown();
                setPenColour(Color.white);
                break;
            case "red":
                penDown();
                setPenColour(Color.red);
            case "reset":
                reset();
                penDown();
                penUp();
                break;
            case "clear":
                clear();
                break;
            case "pencolour":
                if (parts.length == 4) {
                    try {
                        int red = Integer.parseInt(parts[1]); // (255, 0, 0)
                        int green = Integer.parseInt(parts[2]); // (0, 255, 0)
                        int blue = Integer.parseInt(parts[3]); // (0, 0, 255)
                        setPenColour(new Color(red, green, blue));
                    } catch (NumberFormatException e) {
                        System.out.println("Invalid RGB values.");
                    }
                } else {
                    System.out.println("Pencolour command requires 3 parameters.");
                }
                break;
            case "penwidth":
                if (parts.length == 2) {
                    try {
                        float width = Float.parseFloat(parts[1]);
                        setPenWidth(width);
                    } catch (NumberFormatException e) {
                        System.out.println("Invalid pen width value.");
                    }
                } else {
                    System.out.println("Penwidth command requires 1 parameter.");
                }
                break;
            case "triangle":
                if (parts.length == 4) {
                    try {
                        int side1 = Integer.parseInt(parts[1]);
                        int side2 = Integer.parseInt(parts[2]);
                        int side3 = Integer.parseInt(parts[3]);
                        drawTriangle(side1, side2, side3);
                    } catch (NumberFormatException e) {
                        System.out.println("Side lengths must be integers.");
                    }
                } else {
                    System.out.println("triangle command requires 3 parameters.");
                }
                break;
            case "triangleeq":
                if (parts.length == 2) {
                    try {
                        int size = Integer.parseInt(parts[1]);
                        drawEquilateralTriangle(size);
                    } catch (NumberFormatException e) {
                        System.out.println("Size must be an integer.");
                    }
                } else {
                    System.out.println("Triangle command requires 1 parameter.");
                }
                break;
            case "about":
                about();
                break;
            default:
                System.out.println("This command is not recognised = " + command);
                break;
        }
    }

    private void setPenWidth(float width) {
        penWidth = width;
    }
    private float penWidth = 3.0f;

    private void drawEquilateralTriangle(int size) {
        Graphics2D g2d = (Graphics2D) getGraphics();
        g2d.setStroke(new BasicStroke(penWidth));

        penUp();
        forward(size / 2);
        turnRight(120);
        penDown();
        forward(size);
        turnRight(120);
        forward(size);
        turnRight(120);
        forward(size);
        setPenColour(Color.RED);
    }


    private void drawTriangle(int side1, int side2, int side3) {
        Graphics2D g2d = (Graphics2D) getGraphics();
        g2d.setStroke(new BasicStroke(penWidth));

        if (triangleValidation(side1, side2, side3)) {
            penUp();
            forward(side1 / 2);
            turnRight(120);
            penDown();
            forward(side1);
            turnRight(120);
            forward(side2);
            turnRight(120);
            forward(side3);
            setPenColour(Color.RED);
        } else {
            System.out.println("Invalid side lengths for a triangle.");
        }
    }

    private boolean triangleValidation(int side1, int side2, int side3) {
        return side1 + side2 > side3 && side2 + side3 > side1 && side3 + side1 > side2;
    }

    private void drawSquare(int length) {
        Graphics2D g2d = (Graphics2D) getGraphics();
        g2d.setStroke(new BasicStroke(penWidth));

        penUp();
        forward(length / 2);
        turnRight(90);
        forward(length / 2);
        turnLeft(90);
        penDown();

        for (int i = 0; i < 4; i++) {
            forward(length);
            turnRight(90);
        }
        setPenColour(Color.RED);
    }

    public void about() {
        super.about();
        displayMessage("Turtle Graphics by Ordemia Hashim, Leeds Beckett University");
        JOptionPane.showMessageDialog(null, "Thank you for viewing!",
                "Turtle Graphics", JOptionPane.INFORMATION_MESSAGE);
    }
}