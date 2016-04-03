package com.grapheye

import org.apache.spark.SparkContext
import org.apache.spark.SparkConf
import org.apache.spark.rdd.RDD
import org.apache.spark.graphx.GraphLoader
import org.apache.spark.graphx.VertexId
import org.apache.spark.graphx.Graph

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;

import org.bson.Document;

object App {
  def main(args: Array[String]) {

    if (args.length == 0) {
      System.out.println("Boom!");
      System.exit(1);
    }
    var client = new MongoClient("localhost:27017");
    var db = client.getDatabase("test");
    var collection = db.getCollection("pagerank");

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

    var document = new Document();
 
    if (results != null){
      results.vertices.top(100){
        Ordering.by((entry: (VertexId, (String, Double))) => entry._2._2)
      }.foreach(
        v => makeObjectWithNode(v, collection)
      );
    }
    else{
      ranks.vertices.top(100)(
        Ordering.by(_._2)
      ).foreach(
        v => makeObject(v, collection)
      );
    }
    System.out.println("Bye!");
  }

  def makeObjectWithNode(v: (VertexId, (String, Double)), collection: MongoCollection[Document])
  {
    var document = new Document();
    document.append("node", v._2._1)
    document.append("rank", v._2._2)
    collection.insertOne(document)
  }
  def makeObject(v: (VertexId, Double), collection: MongoCollection[Document])
  {
    var document = new Document();
    document.append("node", v._1)
    document.append("rank", v._2)
    collection.insertOne(document)
  }
}
