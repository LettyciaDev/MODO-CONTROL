package com.example.modocontrol.backend_service.service.order;

import com.example.modocontrol.backend_service.model.order.Order;
import com.example.modocontrol.backend_service.model.order.DTO.OrderDto;
import com.example.modocontrol.backend_service.repository.order.OrderRepository;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;
import java.time.ZoneId;

import org.springframework.beans.BeanUtils;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service // ANOTACAO QUE INDICA AO SPRING QUAL A CLASSE DE SERVICO
public class OrderService {
    private final OrderRepository repository;

    public OrderService(OrderRepository repository){
        this.repository = repository;
    }

    // METODO PARA SALVAR PEDIDO
    public void saveOrder(OrderDto orderDto){
        Order order = new Order();
        BeanUtils.copyProperties(orderDto, order);
        repository.saveAndFlush(order);
    }

    // METODO PARA EXIBIR TODOS OS PEDIDOS
    public List<OrderDto> showOrders(){
        List<Order> orders = repository.findAll();

        return orders.stream()
            .map(OrderDto::new) // Assumindo que OrderDto tem um construtor que aceita uma entidade Order
            .collect(Collectors.toList());
    }
    
    public List<OrderDto> searchOrders(String query) {
          if (query == null || query.trim().isEmpty()) {
            // Se a consulta estiver vazia, retorna todos os pedidos
            List<Order> allOrders = repository.findAll();
            
            return convertToDto(allOrders);
          }

        // Cria uma especificação para a busca genérica, combinando múltiplas condições com OR
        Specification<Order> specification = (root, criteriaQuery, criteriaBuilder) -> {
            String likeQuery = "%" + query.toLowerCase() + "%";
            return criteriaBuilder.or(
            criteriaBuilder.like(criteriaBuilder.lower(root.get("client")), likeQuery),
            criteriaBuilder.like(criteriaBuilder.lower(root.get("service")), likeQuery),
            criteriaBuilder.like(criteriaBuilder.lower(root.get("obs")), likeQuery)
            // Adicione mais campos aqui se necessário
            );
        };

        // Executa a busca usando a especificação
        List<Order> orders = repository.findAll(specification);

        // Converte a lista de entidades para DTOs
        return convertToDto(orders);
    }
    
    // METODO PARA APAGAR PEDIDO
    public void deleteOrder(Long id){
        repository.deleteById(id);
    }

    // METODO PARA ATUALIZAR INFORMACOES DO PEDIDO
    public void updateOrderbyId(Long id, OrderDto order){

         Order orderEntity = repository.findById(id).orElseThrow(
            () -> new RuntimeException("Pedido não encontrado")
         );

         // Copia as propriedades do DTO para a entidade, ignorando valores nulos no DTO
         // Se a propriedade for nula no DTO, ela não é copiada para a entidade
         BeanUtils.copyProperties(order, orderEntity, "id"); // Adicione "id" para evitar que o ID seja copiado
    
        // O método saveAndFlush salva a entidade atualizada
        repository.saveAndFlush(orderEntity);
    }

    // METODO PARA SOMAR OS VALORES DE TODOS OS PEDIDOS DE ACORDO COM O MÊS
    public Map<Integer, Double> showMonthlyBilling() {
    List<Order> allOrders = repository.findAll();

        return allOrders.stream()
             // 1. Converta cada Order para um OrderDto
            .map(OrderDto::new) 
            // 2. Agrupe os DTOs por mês
            .collect(Collectors.groupingBy(
                orderDto -> orderDto.getDate().atZone(ZoneId.systemDefault()).getMonthValue(),
                // 3. Some os valores do totalValue do DTO
                Collectors.summingDouble(OrderDto::getTotalValue)
            ));
    }

    // METODO PARA EXIBIR TODOS OS PEDIDOS NÃO PAGOS
    public List<OrderDto> showDebts() {
      // Busca no banco de dados apenas os pedidos não pagos
        List<Order> orders = repository.findByIsPaidFalse();

        return convertToDto(orders);
    }

    // Método auxiliar para conversão 
    private List<OrderDto> convertToDto(List<Order> orders) {
           return orders.stream()
            .map(OrderDto::new) // Assumindo que OrderDto tem um construtor que aceita uma entidade Order
            .collect(Collectors.toList());
    }
}

