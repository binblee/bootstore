package com.example.bootstore.service;

import com.example.bootstore.model.Order;
import com.example.bootstore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {


    @Autowired
    private OrderRepository orderRepository;

    @Override
    public @NotNull Iterable<Order> getAllOrders() {
        return this.orderRepository.findAll();
    }

    @Override
    public Order create(@NotNull(message = "The order cannot be null") @Valid Order order) {
        order.setDateCreated(LocalDate.now());
        return this.orderRepository.save(order);
    }

    @Override
    public void update(@NotNull(message = "The order cannot be null") @Valid Order order) {
        this.orderRepository.save(order);
    }
}
