# Spring Boot Strap Angular Demo



## Build and Run



### REST APIs exposed by application

Get all products

```
http :8080/api/products
```



Get all orders

```
http :8080/api/orders
```



If you do not have [httpie](https://httpie.org/) installed, use `curl` instead.

### Run frontend in development

```sh
# start springboot application
mvn spring-boot:run
# run npm start in separate terminal window
cd src/main/frontend
npm start
```



Access 'http://localhost:4200'



### All-in-one in springboot

You can copy all angular scripts into springbok resource/static folder, and run springboot application only.

```
cd src/main/fronend
npm run build
```



Package application.

```
mvn package
```



## Reference

[https://www.baeldung.com/spring-angular-ecommerce](https://www.baeldung.com/spring-angular-ecommerce)

