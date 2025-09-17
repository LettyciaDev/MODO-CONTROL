package com.example.modocontrol.backend_service.model;

import java.time.Instant;
import org.springframework.beans.BeanUtils;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import com.example.modocontrol.backend_service.model.DTO.OrderDto;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Entity // sinaliza ao banco de dados que esta classe é uma entidade
@Table(name="orders")
public class Order {
    @Id // gera o Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private Instant date;

    
    @Size(min = 3, max = 40)
    @Column(name = "client")
    private String client;

    @Size(min = 3, max = 40)
    @Column(name = "service")
    private String service;

    @Min(value=1)
    @Column(name = "quantity")
    private Integer quantity;

    @Min(value=1)
    @Column(name = "value")
    private Double value;

    @Column(name = "isPaid")
    private Boolean isPaid;

    @Size(min = 0, max = 100)
    @Column(name = "obs")
    private String obs;
 
    public Order(OrderDto orders){
        BeanUtils.copyProperties(orders, this);
    }

}
