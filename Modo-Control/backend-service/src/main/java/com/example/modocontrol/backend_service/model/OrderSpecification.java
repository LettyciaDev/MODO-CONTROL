package com.example.modocontrol.backend_service.model;
import org.springframework.data.jpa.domain.Specification;

public class OrderSpecification {

    // FILTRA POR NOME DO CLIENTE 
    public static Specification<Order> byClient(String client) {
        return (root, query, cb) -> cb.like(cb.lower(root.get("client")), "%" + client.toLowerCase() + "%");
    }

    // FILTRA POR NOME DO SERVIÇO
    public static Specification<Order> byService(String service) {
        return (root, query, cb) -> cb.like(cb.lower(root.get("service")), "%" + service.toLowerCase() + "%");
    }

    // FILTRA PELO STATUS DE PAGAMENTO
    public static Specification<Order> byPaidStatus(Boolean paid) {
        return (root, query, cb) -> cb.equal(root.get("paid"), paid);
    }
}
