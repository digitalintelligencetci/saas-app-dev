public class CoinFlip {
    public static void main(String[] args) {
        
        Coin coin = new Coin();

        for(int i =0;i<1000; i++) {
            coin.flip();
        }
        System.out.println(coin.getFace());

        System.out.println(coin.toString());
    }

}