---
title: "@StandardException"
description: "A straight forward annotation for covering some of the repetitive tasks of creating exceptions."
date: "2024-07-05"
---

I recently came across a little gem annotation from [Lombok](https://projectlombok.org) that I had never heard of before: `@StandardException`.

You can annotate your Exception classes (`extends exception`) with this annotation, it will generate the usual constructors for your exception type that you would normally write.

[https://projectlombok.org/features/experimental/StandardException](https://projectlombok.org/features/experimental/StandardException)

This is a small thing, but it can save you some time and make your code cleaner. I will definitely be using this annotation in my future projects.

On one hand, this makes me wonder about all the other useful annotations that I have not yet discovered, but it also led me to think about [the problems of annotation driven development](https://theboreddev.com/the-problems-of-annotation-driven-development/)

