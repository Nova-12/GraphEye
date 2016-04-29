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
./run.sh algorithm output inputs
# ./run.sh pagerank pr_test test.edgelist test.nodelist
```

### Spark monitor

`http://localhost:4040`

## GraphEye-web

Refer to `web/README.md`

