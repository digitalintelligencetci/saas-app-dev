package Vacation;

public class Firm {
    public static void main(String[] args) {
        Employee[] employees = new Employee[3];
        employees[0] = new Manager("Chris");
        employees[1] = new Staff("Dominic");
        employees[2] = new Executive("Ordemia");

        for (Employee employee : employees) {
            System.out.println(employee.vacation());
        }
    }
}