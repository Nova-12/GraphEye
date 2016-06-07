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
./run.sh algorithm output inputType edges nodes
# ./run.sh pagerank pr_test text test.edgelist test.nodelist
# ./run.sh pagerank pr_test mongodb "mongodb://localhost:27017/graph.edges" "mongodb://localhost:27017/graph.nodes"
```

### Spark monitor

`http://localhost:4040`

## GraphEye-web

Refer to `web/README.md`

