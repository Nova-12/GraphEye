package com.grapheye.core

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import org.apache.spark.graphx.VertexId
import org.apache.spark.graphx.VertexRDD;
import org.apache.spark.rdd.RDD
import org.bson.Document;

class Exporter(mongoAddress: String, dbName: String, collectionName: String,
                  valueName: String) {

  val client = new MongoClient(mongoAddress)
  val db = client.getDatabase(dbName)
  val collection = db.getCollection(collectionName)

  def insertDoubleEntry(node: String, value: Double) {
    var document = new Document()
    document.append("node", node)
    document.append(valueName, value)
    collection.insertOne(document)
  }

  def exportDouble(data: VertexRDD[Double], nodeNames: RDD[(VertexId, String)]) {

    var dataWithNodeNames: RDD[(String, Double)] = null
    if (nodeNames != null) {
      dataWithNodeNames = data.leftJoin(nodeNames) {
        (vid: VertexId, value: Double, name: Option[String]) => (name.getOrElse(""), value)
      }.map(
        (v: (VertexId, (String, Double))) => (v._2._1, v._2._2)
      )
    }
    else {
      dataWithNodeNames = data.map(
        (v: (VertexId, Double)) => (v._1.toString, v._2)
      )
    }

    dataWithNodeNames.sortBy(_._2)
    dataWithNodeNames.collect().foreach(
      (v: (String, Double)) => insertDoubleEntry(v._1, v._2)
    )
  }

  def exportInt(data: VertexRDD[Int], nodeNames: RDD[(VertexId, String)]) {

    var dataWithNodeNames: RDD[(String, Int)] = null
    if (nodeNames != null) {
      dataWithNodeNames = data.leftJoin(nodeNames) {
        (vid: VertexId, value: Int, name: Option[String]) => (name.getOrElse(""), value)
      }.map(
        (v: (VertexId, (String, Int))) => (v._2._1, v._2._2)
      )
    }
    else {
      dataWithNodeNames = data.map(
        (v: (VertexId, Int)) => (v._1.toString, v._2)
      )
    }

    dataWithNodeNames.sortBy(_._2)
    dataWithNodeNames.collect().foreach(
      (v: (String, Int)) => insertDoubleEntry(v._1, v._2)
    )
  }
}

