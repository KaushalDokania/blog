---
title: "Getting Started With Go Packages"
date: 2020-10-25T00:19:05+05:30
draft: false
author: "Kaushal Dokania"
toc: false
images:
tags:
  - Go
  - packages
  - modules
  - build
---

## What are Go Packages?

Modularity and code reusability are among the essential pillars of good software engineering practices. Functions are the first layer of code reusability in any programming language. Go takes it to another level by providing a different mechanism: packages.

According to the official Go documentation: [How to write Go code](https://golang.org/doc/code.html#Organization)

> Go programs are organized into packages. A package is a collection of source files in the same directory that are compiled together. Functions, types, variables, and constants defined in one source file are visible to all other source files within the same package.

In simple words, a package is a directory within a Go workspace containing one or more Go source files, which may also include other packages.

### Syntax

Every Go source file must belong to some package. The first line of the file should declare the package name like this.

```bash
package <package_name>
```

All the functions, types and variables present in this source file, now belong to the declared package and can be imported in other packages using the package name(as long as they are exported).

### Example

Almost all Go programs contain this line.

```go
import "fmt"
```

`fmt` is one the core packages provided by Go installation which contains several functionalities related to input/output formatting. Once imported, we can use functions exported by this package like `fmt.Print()`, `fmt.Printf()`, `fmt.Scanf()`.

## Exported and Un-exported names

The members of a package imported in another package can only be accessed when the are 'exported'. A function, type or variable is said to be exported only when it's name starts with a capital letter.

So, **exported** members(function, type or variable) starts with capital letters and can be accessed outside of package.

While everything else which does not start with a capital letter is said to be **un-exported** and is visible only within the package it was declared.

## `main` package

Like other programming languages, Go also has `main()` function as the entry point of the program. The `main()` function can only be present within a special package `main`. When `main` package is compiled it generates an executable file as output.

In Go, a package can server either of the two purposes.

1. *Commands:* The programs with `main` package, *i.e.* with executables are called *Commands*
2. *Packages:* While the others non-main packages are simply called *Packages* for code-reusability.

### Example

Let's write a simple 'Hello World' program to

```go

    package main

    import (
        "fmt"
    )

    func main() {
        fmt.Print("Hello World!")
    }

```

When we run this program with the `go run` we can see the output in the console.

*Output*
```sh
$ go run hello.go
Hello World!$
```

We can run `go build` to simply generate the executable file which then can be run directly or shared with others to run on other machine as independent executable file.

*Output*
```sh
$ go build -o hello
$ ls
hello*  hello.go
$ ./hello
Hello World!$
```

Here, the option `-o` is used to specify the name of the output file being generated

**Note:** Use `hello.exe` as the output file name for Windows systems.

## Importing packages

There are two possible format/syntax to import packages in Go.

```go
    // Multiple import statements
    import "fmt"
    import "time"
    import "math/rand"
```

```go
    // Factored import statements
    import (
        "fmt"
        "time"
        "math/rand"
    )
```

In Go the package name is the same as the last element of the import path. Say for example, `rand` is the actual package name to be used while importing the package `"math/rand"`

### Naming imports

In Go the imports can be named as well. See below

```go
import (
        "fmt"
        "time"
        r "math/rand"
    )
```

Here, `r` is the named import which can be used in place of `rand` to access its member functions or types.

### Why packages?

The way Go bundles the packages has following benefits

- **Lesser naming conflicts:** Multiple packages may have functions with same names
- **Code organization:** Modularity pays off in the way that code organization becomes efficient and  finding the code that we want to reuse becomes easier
- **Faster compilation:** Go compiler works smartly and compiles only those packages which have been modified. So, the `fmt` package which is included in most of the programs doesn't need to be compiled while compiling our program.

## Conclusion

While Go is still a fairly new langague, there are several useful [standard library packages](https://golang.org/pkg/). Go's package management provides lot of flexibility and helps fasten the development by better code organization.

