#!/bin/sh

SCRIPT_DIR="$( dirname $0 )"

$SPARK_HOME/bin/spark-submit \
    --master local[4] \
    --executor-memory 4G \
    --driver-memory 4G \
    --class com.grapheye.core.App \
    $SCRIPT_DIR/target/grapheye-1.0-SNAPSHOT-jar-with-dependencies.jar \
    $@

