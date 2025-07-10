package Hospital;

class Doctor extends Employee {
    public Doctor(String empId) {
        super(empId);
    }

    @Override
    public void work() {
        System.out.println("Doctor Employee No." + empId + " is diagnosing patients.");
    }
}
