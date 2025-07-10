package Hospital;

public class Hospital {
    public static void main(String[] args) {
        Employee[] employees = new Employee[4];
        employees[0] = new Doctor("5000");
        employees[1] = new Nurse("5002");
        employees[2] = new Receptionist("5004");
        employees[3] = new Cleaner("5006");

        for (Employee employee : employees) {
            employee.work();
        }
    }
}
