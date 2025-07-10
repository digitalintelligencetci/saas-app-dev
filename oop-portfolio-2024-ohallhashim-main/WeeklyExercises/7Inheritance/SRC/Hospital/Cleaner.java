package Hospital;

class Cleaner extends Employee {
    public Cleaner(String empId) {
        super(empId);
    }

    @Override
    public void work() {
        System.out.println("Cleaner Employee No." + empId + " is sweeping.");
    }
}
