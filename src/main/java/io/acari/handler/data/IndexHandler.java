package io.acari.handler.data;

import com.google.inject.Inject;
import io.acari.core.TemplateRenderer;
import io.acari.handler.Config;
import io.acari.handler.Configurable;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class IndexHandler implements Handler<RoutingContext>, Configurable<IndexHandler> {
  private static final Logger LOGGER = LoggerFactory.getLogger(IndexHandler.class);

  private final Vertx vertx;
  private final TemplateRenderer templateRenderer;
  private final ErrorHandler errorHandler;
  private Config config;

  @Inject
  public IndexHandler(Vertx vertx, TemplateRenderer templateRenderer, ErrorHandler errorHandler) {
    this.vertx = vertx;
    this.templateRenderer = templateRenderer;
    this.errorHandler = errorHandler;
  }

  public void handle(RoutingContext routingContext) {

    vertx.eventBus().send(config.getDbQueueName(), new JsonObject(), Config.createDeliveryOptions("delete-page"), ar -> {
      if (ar.succeeded()) {
        JsonObject messageRecieved = (JsonObject) ar.result();
        routingContext.put("title", "Wiki Home");
        routingContext.put("pages", messageRecieved.getJsonArray("pages"));
        String templateFileName = "/index.ftl";
        templateRenderer.render(routingContext, templateFileName);
      } else {
        errorHandler.handle(routingContext, ar);
      }
    });
  }

  @Override
  public IndexHandler applyConfiguration(Config config) {
    this.config = config;
    return this;
  }
}
