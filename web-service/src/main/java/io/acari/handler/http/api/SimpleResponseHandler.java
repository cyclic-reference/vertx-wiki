package io.acari.handler.http.api;

import io.acari.handler.Config;
import io.acari.util.ChainableOptional;
import io.vertx.core.AsyncResult;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.DeliveryOptions;
import io.vertx.core.eventbus.Message;
import io.vertx.core.eventbus.ReplyException;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SimpleResponseHandler {
  private static final Logger LOGGER = LoggerFactory.getLogger(SimpleResponseHandler.class);

  private final Config config;
  private final Vertx vertx;

  public SimpleResponseHandler(Config config, Vertx vertx) {
    this.config = config;
    this.vertx = vertx;
  }

  public void handle(RoutingContext routingContext, JsonObject params, DeliveryOptions deliveryOptions) {
    vertx.eventBus().<JsonObject>send(config.getDbQueueName(),
        params,
        deliveryOptions,
        connectionResult -> routingContext.response()
            .putHeader("Content-Type", "application/json")
            .end(getPayLoad(connectionResult, routingContext).encode()));
  }

  private JsonObject getPayLoad(AsyncResult<Message<JsonObject>> connectionResult, RoutingContext routingContext) {
    if (connectionResult.succeeded()) {
      routingContext.response().setStatusCode(201);
      return new JsonObject().put("success", true);
    } else {
      int code = ChainableOptional.ofNullable(connectionResult.cause())
          .filter(throwable -> throwable instanceof ReplyException)
          .map(throwable -> (ReplyException) throwable)
          .map(ReplyException::failureCode)
          .orElse(500);
      if (code != 400) {
        LOGGER.warn("Awwww Snap!", connectionResult.cause());
      }
      routingContext.response().setStatusCode(code);
      return new JsonObject().put("success", false);
    }
  }
}
