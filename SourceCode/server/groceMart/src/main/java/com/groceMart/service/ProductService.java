package com.groceMart.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.groceMart.dto.ProductDTO;
import com.groceMart.dto.common.ResponseDTO;
import com.groceMart.dto.common.Role;
import com.groceMart.entity.Category;
import com.groceMart.entity.Product;
import com.groceMart.entity.User;
import com.groceMart.repository.CategoryRepository;
import com.groceMart.repository.ProductRepository;
import com.groceMart.repository.UserRepository;
import com.groceMart.utils.Constants;
import com.groceMart.utils.LoggerUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    S3Service s3Service;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;

    public ResponseDTO addProduct(Long userId, String productDTOJson, MultipartFile imageFile) {
        ResponseDTO responseDTO = new ResponseDTO();
        ProductDTO productDTO = new ProductDTO();

        //check User access
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            if (userOptional.get().getRoles().contains(Role.CUSTOMER)) {
                responseDTO.setSuccess(Constants.ERROR_CODE);
                responseDTO.setMessage("Access denied...!! Please try with valid user.");
                return responseDTO;
            }
        } else {

            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("User is not found..!! Please try again.");
            return responseDTO;
        }


        try {
            ObjectMapper mpr = new ObjectMapper();
            productDTO = mpr.readValue(productDTOJson, ProductDTO.class);//converting JSON string to product DTO.
        } catch (Exception e) {
            e.printStackTrace();
            LoggerUtil.logError("Error occured while Parsing productJsons");
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Error occured while pasring product Json");
            return responseDTO;

        }

        Optional<Category> optionalCat = categoryRepository.findById(productDTO.getCategoryId());
        if (optionalCat.isPresent()) {

            Product product = new Product();
            product.setProductCode(productDTO.getProductCode());
            product.setProductName(productDTO.getProductName());
            product.setPrice(productDTO.getPrice());
            product.setSalePrice(productDTO.getSalePrice());
            product.setIsActive(true);
            product.setCategory(optionalCat.get());
            product.setDescription(productDTO.getDescription());
            if (productDTO.getQty() > 0) {
                product.setQty(productDTO.getQty());
            } else {
                responseDTO.setSuccess(Constants.ERROR_CODE);
                responseDTO.setMessage("Product Qty must be in positive");
                return responseDTO;
            }


            product.setIsStock(productDTO.getIsStock());
            product.setIsDelete(false);
            if (imageFile != null) {

                try {
                    String name = imageFile.getOriginalFilename();
                    int index = name.lastIndexOf(".");
                    String extension = name.substring(index + 1);
                    String fileName = productDTO.getProductCode() + "_" + "product_image" + "." + extension;// set File Name
                    fileName = fileName.replaceAll("\\\\", "-");
                    fileName = fileName.replaceAll("\\/", "-");
                    fileName = fileName.replaceAll(" ", "-");
                    File file = new File(fileName);
                    Files.copy(imageFile.getInputStream(), Paths.get(fileName), StandardCopyOption.REPLACE_EXISTING);
                    s3Service.uploadFile(fileName, imageFile);

                    product.setImage(Constants.IMAGE_PATH + fileName);
                } catch (Exception e) {
                    e.printStackTrace();
                    LoggerUtil.logError("Error Occured while uploading product image");
                }

            }

            productRepository.save(product);
            responseDTO.setSuccess(Constants.SUCESS_CODE);
            responseDTO.setMessage("Product added Sucessfully");

            return responseDTO;
        } else {

            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Product Category is not Found");
            return responseDTO;

        }


    }

    public ResponseDTO getProductByCat(Long catId) {
        ResponseDTO responseDTO = new ResponseDTO();
        List<ProductDTO> productDTOs = new ArrayList<ProductDTO>();
        List<Product> list = productRepository.findByCategoryIdAndIsDelete(catId, false);

        for (Product product : list) {
            ProductDTO dto = new ProductDTO();
            dto.setCategoryId(product.getCategory().getId());
            dto.setId(product.getId());
            dto.setImage(product.getImage());
            dto.setPrice(product.getPrice());
            dto.setProductCode(product.getProductCode());
            dto.setProductName(product.getProductName());
            dto.setSalePrice(product.getSalePrice());
            dto.setIsActive(product.getIsActive());
            dto.setDescription(product.getDescription());
            dto.setQty(product.getQty());
            dto.setIsStock(product.getIsStock());
            dto.setIsDelete(product.getIsDelete());
            productDTOs.add(dto);

        }

        responseDTO.setData(productDTOs);
        responseDTO.setMessage("Product get sucessfully");
        responseDTO.setSuccess(Constants.SUCESS_CODE);

        return responseDTO;
    }

    public ResponseDTO getProductById(Long productId) {
        ResponseDTO responseDTO = new ResponseDTO();
        ProductDTO dto = new ProductDTO();

        Optional<Product> optional = productRepository.findById(productId);

        if (optional.isPresent()) {
            dto.setCategoryId(optional.get().getCategory().getId());
            dto.setId(optional.get().getId());
            dto.setImage(optional.get().getImage());
            dto.setPrice(optional.get().getPrice());
            dto.setProductCode(optional.get().getProductCode());
            dto.setProductName(optional.get().getProductName());
            dto.setSalePrice(optional.get().getSalePrice());
            dto.setIsActive(optional.get().getIsActive());
            dto.setDescription(optional.get().getDescription());
            dto.setQty(optional.get().getQty());
            dto.setIsStock(optional.get().getIsStock());
            dto.setIsDelete(optional.get().getIsDelete());

            responseDTO.setData(dto);
            responseDTO.setMessage("Product get sucessfully");
            responseDTO.setSuccess(Constants.SUCESS_CODE);

        } else {

            responseDTO.setData(null);
            responseDTO.setMessage("Product is not Found");
            responseDTO.setSuccess(Constants.ERROR_CODE);
        }

        return responseDTO;

    }

    public ResponseDTO updateProduct(Long userId, String productDTOJson, MultipartFile imageFile) {
        ResponseDTO responseDTO = new ResponseDTO();
        ProductDTO productDTO = new ProductDTO();

        //check User access
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            if (userOptional.get().getRoles().contains(Role.CUSTOMER)) {
                responseDTO.setSuccess(Constants.ERROR_CODE);
                responseDTO.setMessage("Access denied...!! Please try with valid user.");
                return responseDTO;
            }
        } else {

            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("User is not found..!! Please try again.");
            return responseDTO;
        }


        try {
            ObjectMapper mpr = new ObjectMapper();
            productDTO = mpr.readValue(productDTOJson, ProductDTO.class);//converting JSON string to product DTO.
        } catch (Exception e) {
            e.printStackTrace();
            LoggerUtil.logError("Error occured while Parsing productJsons");
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Error occured while pasring product Json");
            return responseDTO;

        }

        Optional<Product> optionalProduct = productRepository.findById(productDTO.getId());

        if (optionalProduct.isEmpty()) {

            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Product is not found...!! Please try again.");
            return responseDTO;

        }

        Product product = optionalProduct.get();

        Optional<Category> optionalCat = categoryRepository.findById(productDTO.getCategoryId());
        if (optionalCat.isPresent()) {

            product.setProductCode(productDTO.getProductCode());
            product.setProductName(productDTO.getProductName());
            product.setPrice(productDTO.getPrice());
            product.setSalePrice(productDTO.getSalePrice());
            product.setIsActive(productDTO.getIsActive());
            product.setCategory(optionalCat.get());
            product.setDescription(productDTO.getDescription());
            product.setQty(productDTO.getQty());
            product.setIsStock(productDTO.getIsStock());
            product.setIsDelete(false);
            if (imageFile != null) {

                try {
                    String name = imageFile.getOriginalFilename();
                    int index = name.lastIndexOf(".");
                    String extension = name.substring(index + 1);
                    String fileName = productDTO.getProductCode() + "_" + "product_image" + "." + extension;// set File Name
                    fileName = fileName.replaceAll("\\\\", "-");
                    fileName = fileName.replaceAll("\\/", "-");
                    fileName = fileName.replaceAll(" ", "-");
                    File file = new File(fileName);
                    Files.copy(imageFile.getInputStream(), Paths.get(fileName), StandardCopyOption.REPLACE_EXISTING);
                    s3Service.uploadFile(fileName, imageFile);

                    product.setImage(Constants.IMAGE_PATH + fileName);
                } catch (Exception e) {
                    e.printStackTrace();
                    LoggerUtil.logError("Error Occured while uploading product image");
                }

            }

            productRepository.save(product);
            responseDTO.setSuccess(Constants.SUCESS_CODE);
            responseDTO.setMessage("Product updated Sucessfully");

            return responseDTO;
        } else {

            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Product Category is not Found");
            return responseDTO;

        }


    }

    public ResponseDTO deleteProduct(Long productId, Long userId) {

        ResponseDTO responseDTO = new ResponseDTO();

        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {

            if (userOptional.get().getRoles().contains(Role.CUSTOMER)) {
                responseDTO.setSuccess(Constants.ERROR_CODE);
                responseDTO.setMessage("Access denied.!! Please try with valid user.");
                return responseDTO;
            }

        } else {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("User is not Found");
            return responseDTO;
        }

        Optional<Product> productOptional = productRepository.findById(productId);
        if (productOptional.isPresent()) {
            productOptional.get().setIsDelete(true);
            productRepository.save(productOptional.get());

            responseDTO.setSuccess(Constants.SUCESS_CODE);
            responseDTO.setMessage("Product is deleted Sucessfully");

        } else {

            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Product is not Found");
            return responseDTO;
        }

        return responseDTO;
    }

}

