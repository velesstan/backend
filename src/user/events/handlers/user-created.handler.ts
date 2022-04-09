import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { UserCreatedEvent } from "../impl";

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  handle(event: UserCreatedEvent) {
    console.log("Event: ", event);
  }
}
