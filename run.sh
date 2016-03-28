#!/bin/sh

$SPARK_HOME/bin/spark-submit \
    --master local[4] \
    --executor-memory 4G \
    --driver-memory 4G \
    --class com.grapheye.App \
    ./target/grapheye-1.0-SNAPSHOT-jar-with-dependencies.jar \
    $@

