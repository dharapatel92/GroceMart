package com.groceMart.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.groceMart.dto.AddCartRequest;
import com.groceMart.dto.CreateOrUpdateOrderRequest;
import com.groceMart.dto.common.OrderStatus;
import com.groceMart.dto.common.ResponseDTO;
import com.groceMart.service.OrderService;
import com.groceMart.utils.Constants;
import com.groceMart.utils.LoggerUtil;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class OrderController {


    @Autowired
    private OrderService orderService;

    @Deprecated
    @PostMapping("/addToCart")
    public ResponseDTO order(@RequestBody CreateOrUpdateOrderRequest request) {

        LoggerUtil.logInfo("Entered into order");
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            responseDTO = orderService.addToCart(request);
        } catch (Exception e) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Error occurred while adding order into cart");
            LoggerUtil.logError(e.getMessage());
        }
        return responseDTO;
    }

    @PutMapping("/update/order/{orderId}")
    public ResponseDTO updateOrderStatus(@PathVariable Long orderId, @RequestParam OrderStatus status) {

        LoggerUtil.logInfo("Entered into updateOrderStatus");
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            responseDTO = orderService.updateOrderStatus(orderId, status);
        } catch (Exception e) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Error occurred while updateOrderStatus");
            LoggerUtil.logError(e.getMessage());
        }
        return responseDTO;
    }

    @GetMapping("/order/{orderId}")
    public ResponseDTO getOrderById(@PathVariable Long orderId) {

        LoggerUtil.logInfo("Entered into getOrderById");
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            responseDTO = orderService.getOrderById(orderId);
        } catch (Exception e) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Error occurred while getOrderById");
            LoggerUtil.logError(e.getMessage());
        }
        return responseDTO;
    }

    @GetMapping("/orders")
    public ResponseDTO getOrderByIdAndStatus(@RequestParam(required = false) Long orderId, @RequestParam(required = false) OrderStatus status, @RequestParam Long userId) {

        LoggerUtil.logInfo("Entered into getOrderByIdAndStatus");
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            responseDTO = orderService.getOrderByIdAndStatus(orderId, status, userId);
        } catch (Exception e) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Error occurred while getOrderById");
            LoggerUtil.logError(e.getMessage());
        }
        return responseDTO;
    }
    
    @PostMapping("/V1/addToCart")
    public ResponseDTO addToCart(@RequestBody AddCartRequest request) {

        LoggerUtil.logInfo("Entered into addToCart");
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            responseDTO = orderService.addToCart(request);
        } catch (Exception e) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Error occurred while adding Product into cart");
            LoggerUtil.logError(e.getMessage());
        }
        return responseDTO;
    }

}
