package Hospital;

class Receptionist extends Employee {
    public Receptionist(String empId) {
        super(empId);
    }

    @Override
    public void work() {
        System.out.println("Receptionist Employee No." + empId + " is scheduling appointments.");
    }
}
