package Vacation;

class Executive extends Employee {
    public Executive(String name) {
        super(name);
    }

    @Override
    public String vacation() {
        return "Executive " + name + " has 40 days of vacation.";
    }
}