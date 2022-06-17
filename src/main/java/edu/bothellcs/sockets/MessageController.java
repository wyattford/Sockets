package edu.bothellcs.sockets;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {
  @MessageMapping("/incomingMessages")
  @SendTo("/topic/messageBoard")
  public String greeting(Message message) throws Exception {
    return String.format("{\"name\": \"%s\", \"content\": \"%s\"}", message.getName(), message.getContent());
  }
}