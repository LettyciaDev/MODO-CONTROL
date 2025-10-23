package com.example.modocontrol.backend_service.model.order.DTO;

import java.time.Instant;
import org.springframework.beans.BeanUtils;

import com.example.modocontrol.backend_service.model.order.Order;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor

public class OrderDto {
    private Long id;
    private Instant date;
    private String client;
    private String service;
    private Integer quantity;
    private Double value;
    private Double totalValue;
    private Boolean isPaid;
    private String obs;

    public OrderDto(Order orders){
        BeanUtils.copyProperties(orders, this);
        this.totalValue = this.quantity * this.value;
     }

     public OrderDto(Long id, Instant date, String client, String service, Integer quantity, Double value, Boolean isPaid, String obs) {
      this.id = id;
      this.date = date;
      this.client = client;
      this.service = service;
      this.quantity = quantity;
      this.value = value;
      this.isPaid = isPaid;
      this.obs = obs;
      this.totalValue = this.quantity * this.value;
     }
}
