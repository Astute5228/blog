---
title: "Looking into Spring Validation"
description: "A quick look at some different ways to use Spring Validation"
date: "2024-07-26"
---

I recently had a look into Spring Validation and discovered new ways it can be used. Here's a simple example that is commonly used in Spring Boot applications.

A simple `Person` class with validation constraint annotations:

```java
package com.example.spring_validated.lib;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class Person {

    @NotBlank
    private String name;

    @Min(18)
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

And a controller that uses the `Person` class as a dependency:

```java
package com.example.spring_validated;

import com.example.spring_validated.lib.Person;
import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
public class PersonController {

    @PostMapping("/person")
    public String createPerson(@Valid @RequestBody Person person) {
        return "Person created: " + person.getName();
    }
}
```

If we use this endpoint without giving a name in the request body, we will get a **400 Bad Request** response since it does not meet the constraints in the `Person` class.

In my application, the `Person` class is declared in a separate library, meaning that Spring Validation actually works across different libraries. Additionally, not only will Spring Validation apply constraints from your dependency class, but it also works with sub-dependencies as long as they are annotated with `@Valid`, like this `Address` record:

```java
package com.example.spring_validated.anotherlib;

import jakarta.validation.constraints.NotBlank;

public record Address(@NotBlank String street) {}
```

```java
package com.example.spring_validated.lib;

import com.example.spring_validated.anotherlib.Address;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class Person {

    @NotBlank
    private String name;

    @Min(18)
    private int age;

    @NotNull
    @Valid
    private Address address;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

My investigation was led by a desire to validate outside a controller, and I found that `@Validated` can also be applied to other beans like Services.

```java
package com.example.spring_validated.app;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import com.example.spring_validated.lib.Person;
import jakarta.validation.Valid;

@Service
@Validated
public class PersonService {

  public void validate(@Valid Person person) {
    System.out.println("Validated person: " + person);
  }
}
```

This is useful in my case where I want to validate data classes that we formed via extensive business logic before it is persisted or sent to another service.

I hope my notes on Spring Validation are helpful to you. I found some new ways to apply validations in my applications and I hope you can too.

