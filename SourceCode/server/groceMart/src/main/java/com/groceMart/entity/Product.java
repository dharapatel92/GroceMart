package com.groceMart.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "product")
public class Product extends AuditEntityAt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String productName;
    private String productCode;
    private Double price;
    private Double salePrice;
    private String image;
    private Boolean isActive;
    @NotNull
    private Long qty;
    private Boolean isStock = true;
    private String description;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDelete;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id")
    private Category category;
    
    @Column( columnDefinition="Decimal(10,2) default '0.0'")
    private Float disPercentage;
    
    private Double originalPrice;

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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
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
    
    

    public Float getDisPercentage() {
		return disPercentage;
	}

	public void setDisPercentage(Float disPercentage) {
		this.disPercentage = disPercentage;
	}

	public Double getOriginalPrice() {
		return originalPrice;
	}

	public void setOriginalPrice(Double originalPrice) {
		this.originalPrice = originalPrice;
	}

	@Override
	public String toString() {
		return "Product [id=" + id + ", productName=" + productName + ", productCode=" + productCode + ", price="
				+ price + ", salePrice=" + salePrice + ", image=" + image + ", isActive=" + isActive + ", qty=" + qty
				+ ", isStock=" + isStock + ", description=" + description + ", isDelete=" + isDelete + ", category="
				+ category + ", disPercentage=" + disPercentage + ", originalPrice=" + originalPrice + "]";
	}


}
