package com.example.modocontrol.backend_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.modocontrol.backend_service.model.order.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long>,  JpaSpecificationExecutor<Order>{
    List<Order> findByIsPaidFalse();
}