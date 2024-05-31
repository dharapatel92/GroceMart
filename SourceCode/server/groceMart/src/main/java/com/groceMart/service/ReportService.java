package com.groceMart.service;

import com.groceMart.dto.KeyValue;
import com.groceMart.dto.ReportRequest;
import com.groceMart.dto.ReportResponse;
import com.groceMart.dto.common.OrderStatus;
import com.groceMart.dto.common.ResponseDTO;
import com.groceMart.dto.common.Role;
import com.groceMart.entity.Order;
import com.groceMart.entity.Product;
import com.groceMart.entity.User;
import com.groceMart.repository.OrderRepository;
import com.groceMart.repository.ProductRepository;
import com.groceMart.repository.UserRepository;
import com.groceMart.utils.CommonUtil;
import com.groceMart.utils.Constants;
import com.groceMart.utils.exception.ApplicationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormatSymbols;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ReportService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProductRepository productRepository;


    public ResponseDTO report(ReportRequest request) {
        ResponseDTO responseDTO = new ResponseDTO();

        if (request == null || request.getUserId() == null
                || request.getYear() == null || request.getStatus() == null) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Request can not be null. please check request json UserId, Year and status is mandatory.");
            return responseDTO;
        }

        Optional<User> optionalUser = userRepository.findById(request.getUserId());

        if (optionalUser.isEmpty()) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Access denied...!! Please try with valid user.");
            return responseDTO;
        }
        if (optionalUser.get().getRoles().contains(Role.CUSTOMER)) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Access denied...!! Please try with valid user.");
            return responseDTO;
        }
        Integer year = request.getYear();
        List<Order> orders = orderRepository.findByStatusAndYear(request.getStatus(), year);
        // Initialize the reportData map with all months set to 0
        Map<String, Double> reportData = new LinkedHashMap<>();
        String[] months = new DateFormatSymbols().getMonths();
        for (int i = 0; i < 12; i++) {
            String key = months[i] + " " + year;
            reportData.put(key, 0.0);
        }

        // Update the map with actual values from orders
        for (Order order : orders) {
            Calendar cal = Calendar.getInstance();
            cal.setTime(order.getOrderDate());
            int month = cal.get(Calendar.MONTH);
            String monthName = months[month];
            String key = monthName + " " + year;

            // Sum the totalAmount
            reportData.merge(key, order.getTotalAmount(), Double::sum);
        }
        ReportResponse reportResponse = new ReportResponse();
        reportResponse.setUserId(request.getUserId());
        reportResponse.setStatus(request.getStatus());
        reportResponse.setYear(year);
        reportResponse.setReportData(reportData);
        responseDTO.setSuccess(Constants.SUCESS_CODE);
        responseDTO.setMessage("Report generated successfully.");
        responseDTO.setData(reportResponse);
        return responseDTO;
    }


	public ResponseDTO getKpi(Long userId) throws ApplicationException {
		ResponseDTO responseDTO = new ResponseDTO();
		List<KeyValue> keyValues = new ArrayList<KeyValue>();
		  Optional<User> optionalUser = userRepository.findById(userId);

	        if (optionalUser.isEmpty()) {
	            responseDTO.setSuccess(Constants.ERROR_CODE);
	            responseDTO.setMessage("Access denied...!! Please try with valid user.");
	            return responseDTO;
	        }
	        if (optionalUser.get().getRoles().contains(Role.CUSTOMER)) {
	            responseDTO.setSuccess(Constants.ERROR_CODE);
	            responseDTO.setMessage("Access denied...!! Please try with valid user.");
	            return responseDTO;
	        }
	        
	      List<User> users = userRepository.findByIsDelete(false);
	      
	      List<Product> products = productRepository.findByIsDelete(false);
	      System.out.println(CommonUtil.getCurrentDate());
	      List<Order> orders = orderRepository.findByOrderDate(CommonUtil.getCurrentDate());
	      System.out.println(orders.size());
	      long userCount = users.stream().filter(u-> u.getRoles().contains(Role.CUSTOMER)).count();
	      long vendorCount = users.stream().filter(u-> u.getRoles().contains(Role.VENDOR)).count();
	      Double totalAmt  = orders.stream().filter(o-> o.getStatus().equals(OrderStatus.COMPLETED)).mapToDouble(o-> o.getTotalAmount()).sum();
	      List<Order> sortList =  orders.stream().filter(o-> o.getStatus().equals(OrderStatus.COMPLETED)).collect(Collectors.toList());
	              
	      
	      keyValues.add(new KeyValue("Total Customer",String.valueOf(userCount)));
	      keyValues.add(new KeyValue("Total Vendor",String.valueOf(vendorCount)));
	      keyValues.add(new KeyValue("Total Product",String.valueOf(products.size())));
	      keyValues.add(new KeyValue("Total Order",String.valueOf(sortList.size())));
	      keyValues.add(new KeyValue("Total Sales",String.valueOf(totalAmt)));
	      
	      
	      responseDTO.setSuccess(Constants.SUCESS_CODE);
          responseDTO.setMessage("KPI Report generated successfully");
	      responseDTO.setData(keyValues);
		
		return responseDTO;
	}
}
	
