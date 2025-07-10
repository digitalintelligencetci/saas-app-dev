package Books;

public class Book {
    private String title;
    private String author;
    private String publisher;
    private int copyrightDate;

    public Book(String title, String author, String publisher, int copyrightDate) {
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.copyrightDate = copyrightDate;
    }
    // Getters and setters
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }
    public String getPublisher() {
        return publisher;
    }
    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }
    public int getCopyrightDate() {
        return copyrightDate;
    }
    public void setCopyrightDate(int copyrightDate) {
        this.copyrightDate = copyrightDate;
    }
    @Override
    public String toString() {
        return "Title: " + title + "\nAuthor: " + author + "\nPublisher: " + publisher + "\nCopyright Date: " + copyrightDate;
    }
}

