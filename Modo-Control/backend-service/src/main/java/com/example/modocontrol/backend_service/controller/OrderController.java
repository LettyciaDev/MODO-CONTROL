package com.example.modocontrol.backend_service.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.modocontrol.backend_service.model.order.DTO.OrderDto;
import com.example.modocontrol.backend_service.service.order.OrderService;

import java.util.Map;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService service){
        this.orderService = service;
    }

    // DIRECIONA A REQUISIÇÃO PARA O SERVIÇO DE SALVAMENTO DE PEDIDO
    @PostMapping("/addOrder")
    public ResponseEntity<Void> saveOrder(@RequestBody OrderDto order){
      orderService.saveOrder(order);
      return ResponseEntity.ok().build();
    }

    // DIRECIONA A REQUISIÇÃO PARA O SERVIÇO DE CONSULTA DE PEDIDO
    @GetMapping("/search")
    public ResponseEntity<List<OrderDto>> searchOrders(@RequestParam("q") String query) {
        List<OrderDto> orders = orderService.searchOrders(query);
        return ResponseEntity.ok(orders);
    }
    // DIRECIONA A REQUISIÇÃO PARA O SERVIÇO DE EXIBIÇÃO DE TODOS OS PEDIDOS
    @GetMapping("/all")
    public List<OrderDto> showAllOrders(){
        return orderService.showOrders();
    }
    
    
    // DIRECIONA A REQUISIÇÃO PARA O SERVIÇO DE EXCLUSÃO DE PEDIDO
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id){
        orderService.deleteOrder(id);
        return ResponseEntity.ok().build();
    }

    // DIRECIONA A REQUISIÇÃO PARA O SERVIÇO DE ATUALIZAÇÃO DE PEDIDO
    @PutMapping("/update/{id}")
    public ResponseEntity<Void> updateOrder(@PathVariable Long id, @RequestBody OrderDto order) {

        orderService.updateOrderbyId(id, order);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/monthly-billing")
    public Map<Integer, Double> getMonthlyBilling() {
        return orderService.showMonthlyBilling();
    }

    @GetMapping("/debts")
    public List<OrderDto> getDebts() {
        return orderService.showDebts();
    }
    
}
