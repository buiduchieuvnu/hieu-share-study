import java.util.Date;
import java.util.TimerTask;

public class MyTask extends TimerTask {


  @Override
  public void run() {
          DemoTaskRepeat.count++;
          System.out.println("Run my Task " + new Date() + "; count: " + DemoTaskRepeat.count);
          if (DemoTaskRepeat.count>=5) {
            DemoTaskRepeat.stopJob();
          }
  }


}