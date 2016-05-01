package com.grapheye.core

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import org.apache.spark.graphx.VertexId
import org.apache.spark.graphx.VertexRDD;
import org.bson.Document;

class Exporter(mongoAddress: String, dbName: String, collectionName: String) {
  val client = new MongoClient(mongoAddress)
  val db = client.getDatabase(dbName)
  val collection = db.getCollection(collectionName)

  def insertPageRankEntry(node: String, rank: Double) {
    var document = new Document()
    document.append("node", node)
    document.append("rank", rank)
    collection.insertOne(document)
  }
  def exportPageRank(result: VertexRDD[Double]) {
    result.top(100) {
      Ordering.by(_._2)
    }.foreach(
      (v: (VertexId, Double)) => insertPageRankEntry(v._1.toString, v._2)
    )
  }
  def exportPageRankWithNode(result: VertexRDD[(String, Double)]) {
    result.top(100) {
      Ordering.by(_._2._2)
    }.foreach(
      (v: (VertexId, (String, Double))) => insertPageRankEntry(v._2._1, v._2._2)
    )
  }
  def insertTriangleCountEntry(node: String, triangles: Int) {
    var document = new Document()
    document.append("node", node)
    document.append("triangles", triangles)
    collection.insertOne(document)
  }
  def exportTriangleCount(result: VertexRDD[Int]) {
    result.top(100) {
      Ordering.by(_._2)
    }.foreach(
      (v: (VertexId, Int)) => insertTriangleCountEntry(v._1.toString, v._2)
    )
  }
  def exportTriangleCountWithNode(result: VertexRDD[(String, Int)]) {
    result.top(100) {
      Ordering.by(_._2._2)
    }.foreach(
      (v: (VertexId, (String, Int))) => insertTriangleCountEntry(v._2._1, v._2._2)
    )
  }
}

