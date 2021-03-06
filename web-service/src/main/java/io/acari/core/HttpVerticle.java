package io.acari.core;

import com.google.inject.Inject;
import io.acari.auth.AuthConfigs;
import io.acari.handler.Config;
import io.acari.handler.http.api.*;
import io.acari.handler.http.auth.*;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.http.HttpServerOptions;
import io.vertx.core.json.JsonObject;
import io.vertx.core.net.JksOptions;
import io.vertx.ext.auth.jwt.JWTAuth;
import io.vertx.ext.auth.mongo.MongoAuth;
import io.vertx.ext.mongo.MongoClient;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.*;
import io.vertx.ext.web.sstore.LocalSessionStore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static io.acari.util.MongoConfig.getConfig;

public class HttpVerticle extends AbstractVerticle {
  private static final Logger LOGGER = LoggerFactory.getLogger(HttpVerticle.class);
  private static final String CONFIG_HTTP_SERVER_PORT = "http.server.port";
  private static final String CONFIG_WIKIDB_QUEUE = "wikidb.queue";
  private static final int CONFIG_HTTP_SERVER_PORT_NUMBER = 8989;
  private final io.acari.handler.http.api.APIAllPageDataHandler APIAllPageDataHandler;
  private final APIPageHandler apiPageHandler;
  private final APICreationHandler apiCreationHandler;
  private final APIUpdateHandler apiUpdateHandler;
  private final APIPageArchiveHandler apiPageArchiveHandler;
  private final TokenHandler tokenHandler;
  private final APIPageExistsHandler apiPageExistsHandler;
  private final UserExistsHandler userExistsHandler;
  private final UserUpdateHandler userUpdateHandler;
  private final APIAllArchiveDataHandler apiAllArchiveDataHandler;
  private final APIGetArchivePageHandler apiGetArchivePageHandler;
  private final APIRestoreArchiveHandler apiRestoreArchiveHandler;
  private final UserLogoutHandler userLogoutHandler;

  @Inject
  public HttpVerticle(APIAllPageDataHandler APIAllPageDataHandler,
                      APIPageHandler apiPageHandler,
                      APICreationHandler apiCreationHandler,
                      APIUpdateHandler apiUpdateHandler,
                      APIPageArchiveHandler apiPageArchiveHandler,
                      TokenHandler tokenHandler,
                      APIPageExistsHandler apiPageExistsHandler,
                      UserExistsHandler userExistsHandler,
                      UserUpdateHandler userUpdateHandler,
                      APIAllArchiveDataHandler apiAllArchiveDataHandler,
                      APIGetArchivePageHandler apiGetArchivePageHandler,
                      APIRestoreArchiveHandler apiRestoreArchiveHandler,
                      UserLogoutHandler userLogoutHandler) {
    this.APIAllPageDataHandler = APIAllPageDataHandler;
    this.apiPageHandler = apiPageHandler;
    this.apiCreationHandler = apiCreationHandler;
    this.apiUpdateHandler = apiUpdateHandler;
    this.apiPageArchiveHandler = apiPageArchiveHandler;
    this.tokenHandler = tokenHandler;
    this.apiPageExistsHandler = apiPageExistsHandler;
    this.userExistsHandler = userExistsHandler;
    this.userUpdateHandler = userUpdateHandler;
    this.apiAllArchiveDataHandler = apiAllArchiveDataHandler;
    this.apiGetArchivePageHandler = apiGetArchivePageHandler;
    this.apiRestoreArchiveHandler = apiRestoreArchiveHandler;
    this.userLogoutHandler = userLogoutHandler;
  }


  @Override
  public void start(Future<Void> future) {
    Config config = new Config(config().getString(CONFIG_WIKIDB_QUEUE, CONFIG_WIKIDB_QUEUE));
    MongoClient mongoClient = MongoClient.createShared(vertx, getConfig());
    JsonObject authProps = new JsonObject();
    MongoAuth mongoAuth = MongoAuth.create(mongoClient, authProps);

    Router router = Router.router(vertx);

    router.route().handler(BodyHandler.create());
    router.post().handler(BodyHandler.create());
    router.post("/user/create").handler(new UserCreationHandler(mongoAuth));
    router.post("/user/logout").handler(userLogoutHandler);

    //It's page because I just want to reuse code :)
    //also this needs to be outside the realm of auth checks
    router.post("/user/exists/:page").handler(userExistsHandler.applyConfiguration(config));

    //this also needs to be outside the realm of auth checks
    Router baseRoute = Router.router(vertx);
    baseRoute.post("/pages").handler(APIAllPageDataHandler.applyConfiguration(config));
    baseRoute.post("/archives").handler(apiAllArchiveDataHandler.applyConfiguration(config));
    baseRoute.get("/pages/:page").handler(apiPageHandler.applyConfiguration(config));
    baseRoute.get("/exists/:page").handler(apiPageExistsHandler.applyConfiguration(config));
    baseRoute.post("/archive").handler(apiGetArchivePageHandler.applyConfiguration(config));
    router.mountSubRouter("/base", baseRoute);

    Router apiRouter = Router.router(vertx);

    AuthHandler authHandler = RedirectAuthHandler.create(mongoAuth, "/");
    router.route("/wiki/*").handler(authHandler);
    router.route("/action/*").handler(authHandler);

    JWTAuth jwtAuth = JWTAuth.create(vertx, new JsonObject()
        .put("keyStore", new JsonObject()//dis needs to be camel case
            .put("path", AuthConfigs.Configs.KEYSTORE.getValue())
            .put("type", AuthConfigs.Configs.TYPE.getValue())
            .put("password", AuthConfigs.Configs.PASSWORD.getValue())));
    apiRouter.route().handler(JWTAuthHandler.create(jwtAuth, "/api/token"));
    apiRouter.post().handler(BodyHandler.create());
    apiRouter.post("/token").handler(tokenHandler
        .applyConfiguration(jwtAuth)
        .applyConfiguration(mongoAuth));

    apiRouter.post("/pages/create").handler(apiCreationHandler.applyConfiguration(config));
    apiRouter.put().handler(BodyHandler.create());
    apiRouter.put("/archive/restore/:page").handler(apiRestoreArchiveHandler.applyConfiguration(config));
    apiRouter.put("/pages").handler(apiUpdateHandler.applyConfiguration(config));
    apiRouter.put("/user").handler(userUpdateHandler.applyConfiguration(config)
        .applyConfiguration(jwtAuth)
        .applyConfiguration(mongoAuth));
    apiRouter.delete("/page/:page").handler(apiPageArchiveHandler.applyConfiguration(config));
    router.mountSubRouter("/api", apiRouter);

    StaticHandler requestHandler = StaticHandler.create();
    router.get("/*").handler(requestHandler).failureHandler(routingContext -> routingContext.reroute("/"));

    int portNumber = config().getInteger(CONFIG_HTTP_SERVER_PORT, CONFIG_HTTP_SERVER_PORT_NUMBER);
    vertx.createHttpServer(new HttpServerOptions()
        .setSsl(true)
        .setKeyStoreOptions(new JksOptions()
            .setPassword(AuthConfigs.Configs.SSL_PASSWORD.getValue())
            .setPath(AuthConfigs.Configs.SSL_KEYSTORE.getValue())))
        .requestHandler(router::accept)
        .listen(portNumber, httpServerAsyncResult -> {
          io.vertx.core.http.HttpServer result = httpServerAsyncResult.result();
          if (httpServerAsyncResult.succeeded()) {
            LOGGER.info("Server listening on port " + result.actualPort());
            future.complete();
          } else {
            LOGGER.warn("Unable to create server because -> ", httpServerAsyncResult.cause());
            future.fail(httpServerAsyncResult.cause());
          }
        });
  }
}
