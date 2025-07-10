package PostCodes;

public class Person {
    private String firstName;
    private String lastName;
    private String postalCode;

    public Person(String firstName, String lastName, String postalCode) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.postalCode = postalCode;
    }

    @Override
    public String toString() {
        return "Name: " + firstName + " " + lastName + ", Postal Code: " + postalCode;
    }
}