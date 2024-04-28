package com.groceMart.utils;

import com.groceMart.dto.common.Response;
import com.groceMart.utils.exception.ApplicationException;
import org.apache.commons.lang3.StringUtils;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.Map;

public class CommonUtil {

    /**
     * Sets response for web service
     *
     * @param result
     * @param serviceIdentifier
     */
    public static void setWebserviceResponse(Response<?> result, String status, String serviceIdentifier,
                                             String errorCode, String errorDesc) {
        result.setStatus(status);
        if (status.equalsIgnoreCase(Constants.ERROR)) {
            result.setErrorCode(errorCode);
        }
        result.setErrorDescription(errorDesc);
        result.setServiceIdentifier(serviceIdentifier);

    }

    /**
     * Sets response for web service
     *
     * @param result
     * @param serviceIdentifier
     */
    public static void setWebserviceResponse(Response<?> result, String status, String serviceIdentifier) {
        result.setStatus(status);
        result.setErrorDescription(status);
        result.setServiceIdentifier(serviceIdentifier);

    }

    /**
     * To convert date to String
     *
     * @param date
     * @param format
     * @return
     * @throws ApplicationException
     */
    public static String converterDateToString(Calendar date){
        String convertedDate = null;
    try {
        if (date != null) {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:00.000");
            convertedDate = dateFormat.format(date.getTime());
        }
        }catch (Exception e) {
			e.printStackTrace();
			LoggerUtil.logError("Error occured while convert date"+e.getMessage());
		}
        return convertedDate;
    }

    public static Calendar converterStringToDate(String date){
    	Calendar cal = Calendar.getInstance();
    try {
        if (date != null) {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:00.000");
            cal.setTime( dateFormat.parse(date));
        }
        }catch (Exception e) {
			e.printStackTrace();
			LoggerUtil.logError("Error occured while convert date"+e.getMessage());
		}
        return cal;
    }

    /**
     * Checks if the Object is Null or Empty.
     *
     * @param obj
     * @return Boolean
     */
    public static Boolean isNullOrEmpty(final Object obj) {
        if (obj != null && obj instanceof String) {
            return isNullOrEmpty(obj.toString());
        }
        return obj == null;
    }

    public static Boolean isSelected(final Long obj) {
        return obj != null && obj != 0l;
    }

    /**
     * Checks if <tt>obj</tt> is null or an empty. string or a string with only
     * space (' ') character(s).
     *
     * @param obj
     * @return Boolean
     */
    public static Boolean isNullOrEmpty(final String obj) {
        String string = null;
        if (obj != null && !"null".equalsIgnoreCase(obj)) {
            string = obj.trim();
            if ("".equals(string)) {
                return true;
            }
            return false;
        }
        return true;
    }

    /**
     * Checks if <tt>obj1</tt> and <tt>obj2</tt> are equal or not.
     *
     * @param obj1 , obj2
     * @return Boolean
     */
    public static Boolean areEqual(final Object obj1, final Object obj2) {
        return (obj1 == null && obj2 == null)
                || (!CommonUtil.isNullOrEmpty(obj1) && !CommonUtil.isNullOrEmpty(obj2) && obj1.equals(obj2));
    }

    /**
     * Checks if <tt>obj</tt> is null or zero.
     *
     * @param obj
     * @return Boolean
     */
    public static Boolean isNullOrZero(final Integer obj) {
        return obj == null || obj.longValue() == 0;
    }

    /**
     * Checks if <tt>obj</tt> is null or zero.
     *
     * @param obj
     * @return Boolean
     */
    public static Boolean isNullOrZero(final Long obj) {
        return obj == null || obj.intValue() == 0;
    }

    /**
     * Checks if <tt>obj</tt> is null or zero.
     *
     * @param obj
     * @return Boolean
     */
    public static Boolean isNullOrZero(final BigDecimal obj) {
        return obj == null || obj.longValue() == 0;
    }

    /**
     * Checks if collection <tt>obj</tt> is null or empty.
     *
     * @param obj
     * @return Boolean
     */

    @SuppressWarnings("rawtypes")
    public static Boolean isNullOrEmpty(final Collection obj) {
        // Boolean isNullOrEmpty = false;
        return obj == null || obj.isEmpty();
    }

    /**
     * Checks if array <tt>obj</tt> is null or of length zero.
     *
     * @param obj
     * @return Boolean
     */
    public static Boolean isNullOrEmpty(final Object[] obj) {
        return obj == null || obj.length == 0;
    }

    /**
     * Checks if map <tt>obj</tt> is null or empty.
     *
     * @param obj
     * @return Boolean
     */

    @SuppressWarnings("rawtypes")
    public static Boolean isNullOrEmpty(final Map obj) {
        return obj == null || obj.isEmpty();
    }


    public static String getCurrentDate() throws ApplicationException {
        String date = null;

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        date = simpleDateFormat.format(new Date());

        return date;
    }

    public static Date getCurrDate() throws ApplicationException {
        Date date = null;

        DateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            date = simpleDateFormat.parse(simpleDateFormat.format(new Date()));
        } catch (ParseException e) {
            throw new ApplicationException("Parse exception from string to date", e);
        }
        return date;
    }

    public static String getCurrentHourMin() throws ApplicationException {

        String date = null;
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("HH-mm");
        date = simpleDateFormat.format(new Date());

        return date;
    }


    public static String getCurrentHourMinSec() throws ApplicationException {

        String date = null;
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("HH-mm-ss");
        date = simpleDateFormat.format(new Date());

        return date;
    }


    public static Long generateRandomToken() {
        return (long) (Math.random() * 1000000000);
    }

    public static double round(double value, int places) {
        if (places < 0) throw new IllegalArgumentException();

        long factor = (long) Math.pow(10, places);
        value = value * factor;
        long tmp = Math.round(value);
        return (double) tmp / factor;
    }

    public static String encodePassword(String password) {
        // Encode password using Base64
        return Base64.getEncoder().encodeToString(password.getBytes());
    }

    public static String decodePassword(String encodedPassword) {
        // Decode password using Base64
        byte[] decodedBytes = Base64.getDecoder().decode(encodedPassword);
        return new String(decodedBytes);
    }


}
