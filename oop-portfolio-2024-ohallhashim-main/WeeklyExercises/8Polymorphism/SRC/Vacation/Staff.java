package Vacation;

class Staff extends Employee {
    public Staff(String name) {
        super(name);
    }

    @Override
    public String vacation() {
        return "Staff " + name + " has 20 days of vacation.";
    }
}