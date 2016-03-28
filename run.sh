#!/bin/sh

$SPARK_HOME/bin/spark-submit \
    --class com.grapheye.App \
    ./target/grapheye-1.0-SNAPSHOT-jar-with-dependencies.jar \
    $@

