package Vacation;

class Manager extends Employee {
    public Manager(String name) {
        super(name);
    }

    @Override
    public String vacation() {
        return "Manager " + name + " has 30 days of vacation.";
    }
}
