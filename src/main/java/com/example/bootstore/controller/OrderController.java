package com.example.bootstore.controller;

import com.example.bootstore.dto.OrderProductDto;
import com.example.bootstore.exception.ResourceNotFoundException;
import com.example.bootstore.model.Order;
import com.example.bootstore.model.OrderProduct;
import com.example.bootstore.model.OrderStatus;
import com.example.bootstore.service.OrderProductService;
import com.example.bootstore.service.OrderService;
import com.example.bootstore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    ProductService productService;

    @Autowired
    OrderService orderService;

    @Autowired
    OrderProductService orderProductService;

    @GetMapping
    public Iterable<Order> list(){
        return this.orderService.getAllOrders();
    }

    @PostMapping
    public ResponseEntity<Order> create(@RequestBody OrderForm form){
        List<OrderProductDto> fromDtos = form.getProductOrders();
        validateProductsExistence((fromDtos));

        Order order = new Order();
        order.setStatus(OrderStatus.PAID.name());

        order = this.orderService.create(order);

        List<OrderProduct> orderProducts = new ArrayList<>();
        for (OrderProductDto dto : fromDtos) {
            orderProducts.add(orderProductService.create(
                    new OrderProduct(
                            order,
                            productService.getProduct(dto.getProduct().getId()),
                            dto.getQuantity()
                    )));
        }

        order.setOrderProducts(orderProducts);
        this.orderService.update(order);

        String uri = ServletUriComponentsBuilder.fromCurrentServletMapping()
                .path("/orders/{id}")
                .buildAndExpand(order.getId())
                .toString();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", uri);

        return new ResponseEntity<>(order, headers, HttpStatus.CREATED);

    }

    private void validateProductsExistence(List<OrderProductDto> orderProducts){
        List<OrderProductDto> list = orderProducts.stream()
                .filter(op -> Objects.isNull(productService.getProduct(
                        op.getProduct().getId()
                        )
                ))
                .collect(Collectors.toList());

        if( !CollectionUtils.isEmpty(list) ){
            new ResourceNotFoundException("Product not found");
        }
    }

    public static class OrderForm {

        private List<OrderProductDto> productOrders;

        public List<OrderProductDto> getProductOrders() {
            return productOrders;
        }

        public void setProductOrders(List<OrderProductDto> productOrders) {
            this.productOrders = productOrders;
        }
    }
}
