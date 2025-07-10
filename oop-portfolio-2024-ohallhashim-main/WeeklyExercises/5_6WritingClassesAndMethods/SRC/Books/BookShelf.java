package Books;

public class BookShelf {
    public static void main(String[] args) {

        Book book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "Scribner", 1925);
        Book book2 = new Book("To Kill a Mockingbird", "Harper Lee", "J. B. Lippincott & Co.", 1960);

        book1.setTitle("The Catcher in the Rye");

        System.out.println(book1);
        System.out.println();
        System.out.println(book2);
    }
}