package edu.bothellcs.sockets;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GameController {
  @MessageMapping("/gameEvents")
  @SendTo("/topic/clientMessages")
  public Result sendMessage(String guess) throws Exception {
    System.out.println("message received!: "+guess);
    String wordOfDay = "hello";
    String results = Functions.compareStrings(wordOfDay, guess);
    System.out.println(results);
    return new Result(results);
  }
}