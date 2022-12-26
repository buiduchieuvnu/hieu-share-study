import java.util.Timer;

public class DemoTaskRepeat {

    static boolean running = false;
    static int count = 0;
    static Timer timer;
    static MyTask myTask;

  public static void main(String[] args) {

    startJob(2);

  }


  public static void startJob(int iSecond){
    running = true;
    timer = new Timer();
    myTask = new MyTask();
    int _period = iSecond * 1000;
    timer.scheduleAtFixedRate(myTask, 1000, _period);
    System.out.println("startJob!");
  }

  public static void stopJob(){
    running = false;
    count = 0;
    myTask.cancel();
    System.out.println("stopJob!");
    startJob(4);

  }

}
