package com.groceMart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.groceMart.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{

	List<Product> findByCategoryIdAndIsDelete(Long catId,Boolean IsDelete);

	List<Product> findByIsDelete(boolean b);

}
