# GraphEye

This project is made of two subprojects: `core` and `web`.

## GraphEye-core

### Requirements

1. Spark (`SPARK_HOME` environment varaible needed)
2. Maven
3. JDK (1.7 or later)

### How to use

```
make
./run.sh <arguments>
```

### Spark monitor

`http://localhost:4040`

## GraphEye-web

### Requirements

1. Maven
2. Tomcat 7
3. JDK (1.7 or later)

### How to run debug server

```
make
make run
```

Then connect to `localhost:8080/grapheye`

### How to deploy

```
make
```

Then deploy `web/target/grapheyeServer.war`


