package com.groceMart.utils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import com.groceMart.GroceMartApplication;


public class LoggerUtil {

	private static final Logger LOGGER = LogManager.getLogger(GroceMartApplication.class);
	
	public static void logInfo(String message) {
		LOGGER.info(message);
	}

	public static void logDebug(String message) {
		LOGGER.debug(message);
	}

	public static void logDebug(String message, Throwable t) {
		LOGGER.debug(message, t);
	}

	public static void logError(String message) {
		LOGGER.error(message);
	}

	public static void logError(String message, Throwable t) {
		LOGGER.error(message, t);
	}
}
