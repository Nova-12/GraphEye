package com.grapheye

import org.apache.spark.SparkContext
import org.apache.spark.SparkConf
import org.apache.spark.graphx.GraphLoader

object App {
  def main(args: Array[String]) {
    if (args.length == 0) {
      System.out.println("Boom!");
      System.exit(1);
    }
    val edgeListFilePath = args(0);

    System.out.println("Hello!");
    val conf = new SparkConf();
    val sc = new SparkContext(conf);

    val graph = GraphLoader.edgeListFile(sc, edgeListFilePath);
    val ranks = graph.pageRank(0.0001);

    ranks.vertices.top(100)(
      Ordering.by(_._2)
    ).foreach(
      v => println(v._1 + " " + v._2)
    );

    System.out.println("Bye!");
  }
}
