package com.grapheye

import org.apache.spark.SparkContext
import org.apache.spark.SparkConf
import org.apache.spark.rdd.RDD
import org.apache.spark.graphx.GraphLoader
import org.apache.spark.graphx.VertexId
import org.apache.spark.graphx.Graph

object App {
  def main(args: Array[String]) {
    if (args.length == 0) {
      System.out.println("Boom!");
      System.exit(1);
    }
    val edgeListFilePath = args(0);
    var nodeListFilePath:String = null;
    var nodeList: RDD[String] = null;
    var vertexRDD: RDD[(VertexId, String)] = null;
    var results: Graph[(String, Double), Double] = null;
    if (args.length > 1){
      nodeListFilePath = args(1);
    }
    System.out.println("Hello!");
    val conf = new SparkConf();
    val sc = new SparkContext(conf);

    val graph = GraphLoader.edgeListFile(sc, edgeListFilePath);
    val ranks = graph.pageRank(0.0001);
    if (nodeListFilePath != null){
      nodeList = sc.textFile(nodeListFilePath);
      vertexRDD = nodeList.map(v => (v.split(" ")(0).toLong, v.split(" ")(1)));
      results = ranks.outerJoinVertices(vertexRDD){
      (v, rank, title) => (title.getOrElse(" "), rank);
      }
    }
    if (results != null){
      results.vertices.top(100){
	Ordering.by((entry: (VertexId, (String, Double))) => entry._2._2)
      }.foreach(
        v => println(v._2._1 + " " + v._2._2)
      );
    }
    else{
      ranks.vertices.top(100)(
        Ordering.by(_._2)
      ).foreach(
        v => println(v._1 + " " + v._2)
      );
    }
    System.out.println("Bye!");
  }
}
