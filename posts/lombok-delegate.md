---
title: "@Delegate annotation"
description: "A quick look at the Lombok @Delegate annotation"
date: "2024-07-24"
---

I recently came across the `@Delegate` annotation from [Lombok](https://projectlombok.org).
It turns out I'm not the only person who frequently discovers new things about Lombok, as I've written about another annotation recently: [`@StandardException`](../lombok-standard-exception/).

The `@Delegate` annotation is a handy way to delegate methods from one class to another. This can be useful when you want to reuse the methods of another class without having to write them all out again.

Here's a simple example to demonstrate:

```java
import lombok.experimental.Delegate;

public class DelegateExample {
    interface Greet {
        String greet();
    }

    static class GreetImpl implements Greet {
        @Override
        public String greet() {
            return "Hello, World!";
        }
    }

    @Delegate
    private final Greet greet = new GreetImpl();

    public static void main(String[] args) {
        DelegateExample example = new DelegateExample();
        System.out.println(example.greet());
    }
}
```

In this example, we have an interface `Greet` with a single method `greet()`. We then have a class `GreetImpl` that implements this interface. Finally, we have a `DelegateExample` class that uses the `@Delegate` annotation to delegate the `greet()` method to an instance of `GreetImpl`.

This code will output `Hello, World!`, which is the result of calling the `greet()` method on the `GreetImpl` instance.

According to the [Lombok page on `@Delegate`](https://projectlombok.org/features/experimental/Delegate), this annotation will probably not move out of experimental status, so use it with caution. However, it can be a useful tool in your toolbox when you need to delegate methods between classes.

I'm always a fan of reducing boilerplate code especially when it comes to Java, `@Delegate` is a great way to do that when you need to reuse methods across classes. I'll definitely be keeping this annotation in mind for future projects.

