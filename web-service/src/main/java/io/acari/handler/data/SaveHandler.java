package io.acari.handler.data;

import io.acari.util.ChainableOptional;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.mongo.MongoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Instant;

public class SaveHandler implements Handler<Message<JsonObject>> {
  private static final Logger LOGGER = LoggerFactory.getLogger(SaveHandler.class);

  private final MongoClient mongoClient;

  public SaveHandler(MongoClient mongoClient) {
    this.mongoClient = mongoClient;
  }

  @Override
  public void handle(Message<JsonObject> message) {
    JsonObject request = message.body();
    ChainableOptional.ofNullable(request.getString("name"))
        .ifPresent(id -> ChainableOptional.ofNullable(request.getString("username"))
            .ifPresent(userName -> ChainableOptional.ofNullable(request.getString("content"))
                .ifPresent(content -> {
                  JsonObject query = new JsonObject().put("name", id);
                  JsonObject update = new JsonObject().put("$set", new JsonObject()
                      .put("content", content)
                      .put("lastModified", new JsonObject()
                          .put("userName", userName)
                          .put("timeStamp", Instant.now().toEpochMilli())));
                  mongoClient.updateCollection("pages", query, update, aConn -> {
                    ChainableOptional.of(aConn)
                        .filter(AsyncResult::succeeded)
                        .ifPresent(conRes -> {
                          message.reply(new JsonObject().put("status", "gewd"));
                        })
                        .orElseDo(() -> {
                          LOGGER.warn("Ohh shit", aConn.cause().getMessage());
                          message.fail(ErrorCodes.DB_ERROR.ordinal(), aConn.cause().getMessage());
                        });
                  });
                }))
            .orElseDo(() -> fourHundred(message, "No User name Provided, Bruv."))
            .orElseDo(() -> fourHundred(message, "No Title Provided, Bruv."))
        ).orElseDo(() -> fourHundred(message, "No Id Provided, Bruv."));
  }

  private void fourHundred(Message routingContext, String errorMessage) {
    routingContext.fail(400, errorMessage);
  }
}
