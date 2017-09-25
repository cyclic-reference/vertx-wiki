package io.acari.core;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class Queries {
  public static String CONFIG_WIKIDB_JDBC_URL = "wikidb.jdbc.url";
  public static String CONFIG_WIKIDB_JDBC_DRIVER_CLASS = "wikidb.jdbc.driver_class";
  public static String CONFIG_WIKIDB_JDBC_MAX_POOL_SIZE = "wikidb.jdbc.max_pool_size";
  public static String CONFIG_WIKIDB_SQL_QUERIES_RESOURCE_FILE = "wikidb.sqlqueries.resource.file";
  public static String CONFIG_WIKIDB_QUEUE = "wikidb.queue";
  private static Properties properties;

  static {
    try (InputStream is = SqlQueries.class.getResourceAsStream("/db-queries.properties")) {
      properties = new Properties();
      properties.load(is);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  public enum SqlQueries {
    CREATE_SCHEMA("create-pages-table"),
    ALL_PAGES("all-pages"),
    ALL_PAGES_DATA("all-pages-data"),
    GET_PAGE("get-page"),
    PAGE_EXISTS("page-exists"),
    CREATE_PAGE("create-page"),
    SAVE_PAGE("save-page"),
    DELETE_PAGE("delete-page");

    private final String value;

    SqlQueries(String butt) {
      this.value = properties.getProperty(butt);
    }

    public String getValue() {
      return value;
    }
  }

}