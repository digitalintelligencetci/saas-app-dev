package Hospital;

abstract class Employee {
    protected String empId;

    public Employee(String empId) {
        this.empId = empId;
    }

    public abstract void work();
}
