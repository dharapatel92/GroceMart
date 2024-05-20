package com.groceMart.dto;

import com.groceMart.entity.Product;
import jakarta.validation.constraints.NotNull;

public class ProductDTO {

    private Long id;

    @NotNull
    private String productName;
    @NotNull
    private String productCode;
    @NotNull
    private Double price;
    private Double salePrice;
    private String image;
    private Boolean isActive;
    @NotNull
    private Long categoryId;
    @NotNull
    private Long qty;
    @NotNull
    private Boolean isStock;
    private String description;
    private Boolean isDelete;

    public static ProductDTO build(Product product) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getId());
        productDTO.setProductName(product.getProductName());
        productDTO.setProductCode(product.getProductCode());
        productDTO.setPrice(product.getPrice());
        productDTO.setSalePrice(product.getSalePrice());
        productDTO.setImage(product.getImage());
        productDTO.setIsActive(product.getIsActive());

        // Assuming Category entity has a getter for id
        if (product.getCategory() != null) {
            productDTO.setCategoryId(product.getCategory().getId());
        }

        productDTO.setQty(product.getQty());
        productDTO.setIsStock(product.getIsStock());
        productDTO.setDescription(product.getDescription());
        productDTO.setIsDelete(product.getIsDelete());

        return productDTO;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(Double salePrice) {
        this.salePrice = salePrice;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Long getQty() {
        return qty;
    }

    public void setQty(Long qty) {
        this.qty = qty;
    }

    public Boolean getIsStock() {
        return isStock;
    }

    public void setIsStock(Boolean isStock) {
        this.isStock = isStock;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public Boolean getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Boolean isDelete) {
        this.isDelete = isDelete;
    }

    @Override
    public String toString() {
        return "ProductDTO [id=" + id + ", productName=" + productName + ", productCode=" + productCode + ", price="
                + price + ", salePrice=" + salePrice + ", image=" + image + ", isActive=" + isActive + ", categoryId="
                + categoryId + ", qty=" + qty + ", isStock=" + isStock + ", description=" + description + ", isDelete="
                + isDelete + "]";
    }


}
