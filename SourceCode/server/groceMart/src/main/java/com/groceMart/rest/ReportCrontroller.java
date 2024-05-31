package com.groceMart.rest;

import com.groceMart.dto.ReportRequest;
import com.groceMart.dto.common.ResponseDTO;
import com.groceMart.service.ReportService;
import com.groceMart.utils.Constants;
import com.groceMart.utils.LoggerUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/admin/")
public class ReportCrontroller {

    @Autowired
    private ReportService reportService;

    @PostMapping("/report")
    public ResponseDTO report(@RequestBody ReportRequest request) {

        LoggerUtil.logInfo("Entered into report");
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            responseDTO = reportService.report(request);
        } catch (Exception e) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Error occurred while report");
            LoggerUtil.logError(e.getMessage());
        }
        return responseDTO;
    }

    
    @PostMapping("/kpi")
    public ResponseDTO getKpi(@RequestParam Long userId) {

        LoggerUtil.logInfo("Entered into getKpi");
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            responseDTO = reportService.getKpi(userId);
        } catch (Exception e) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Error occurred while get KPi");
            LoggerUtil.logError(e.getMessage());
        }
        return responseDTO;
    }

}
