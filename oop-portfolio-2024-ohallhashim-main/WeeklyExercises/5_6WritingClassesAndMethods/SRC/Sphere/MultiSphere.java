package Sphere;

public class MultiSphere {
    public static void main(String[] args) {
        Sphere sphere1 = new Sphere(5.0);
        System.out.println(sphere1);

        Sphere sphere2 = new Sphere(10.0);
        System.out.println(sphere2);

        sphere1.setDiameter(7.0);
        System.out.println(sphere1);
    }
}