package Hospital;

class Nurse extends Employee {
    public Nurse(String empId) {
        super(empId);
    }

    @Override
    public void work() {
        System.out.println("Nurse Employee No." + empId + " is taking care of patients.");
    }
}
