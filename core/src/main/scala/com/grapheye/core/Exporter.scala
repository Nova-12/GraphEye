package com.grapheye.core

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import org.apache.spark.graphx.Edge;
import org.apache.spark.graphx.EdgeRDD;
import org.apache.spark.graphx.Graph;
import org.apache.spark.graphx.VertexId
import org.apache.spark.graphx.VertexRDD;
import org.apache.spark.rdd.RDD
import org.bson.Document;

class Exporter(mongoAddress: String, dbName: String, collectionName: String) {

  val client = new MongoClient(mongoAddress)
  val db = client.getDatabase(dbName)
  val collection = db.getCollection(collectionName)
  val edgeCollection = db.getCollection(collectionName + "_edge")
  val nodeCollection = db.getCollection(collectionName + "_node")
  var valueName: String = "value";

  def setValueName(name: String) {
    valueName = name;
  }

  def insertDoubleEntry(node: String, value: Double) {
    var document = new Document()
    document.append("node", node)
    document.append(valueName, value)
    collection.insertOne(document)
  }

  def insertIntEntry(node: String, value: Int) {
    var document = new Document()
    document.append("node", node)
    document.append(valueName, value)
    collection.insertOne(document)
  }

  def insertVertexIdEntry(node: String, value: VertexId) {
    var document = new Document()
    document.append("node", node)
    document.append(valueName, value.toInt)
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

    dataWithNodeNames.sortBy(_._2, ascending=false).collect().foreach(
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

    dataWithNodeNames.sortBy(_._2, ascending=false).collect().foreach(
      (v: (String, Int)) => insertIntEntry(v._1, v._2)
    )
  }

  def exportVertexId(data: VertexRDD[VertexId], nodeNames: RDD[(VertexId, String)]) {

    var dataWithNodeNames: RDD[(String, VertexId)] = null
    if (nodeNames != null) {
      dataWithNodeNames = data.leftJoin(nodeNames) {
        (vid: VertexId, value: VertexId, name: Option[String]) => (name.getOrElse(""), value)
      }.map(
        (v: (VertexId, (String, VertexId))) => (v._2._1, v._2._2)
      )
    }
    else {
      dataWithNodeNames = data.map(
        (v: (VertexId, VertexId)) => (v._1.toString, v._2)
      )
    }

    dataWithNodeNames.sortBy(_._2, ascending=false).collect().foreach(
      (v: (String, VertexId)) => insertVertexIdEntry(v._1, v._2)
    )
  }

  def insertEdgeEntry(from: Int, to: Int) {
    var document = new Document()
    document.append("from", from)
    document.append("to", to)
    edgeCollection.insertOne(document)
  }

  def insertNodeEntry(id: VertexId, name: String) {
    var document = new Document()
    document.append("id", id.toInt)
    document.append("name", name)
    nodeCollection.insertOne(document)
  }

  def exportEdges(graph: Graph[Int, Int]) {
    graph.edges.collect().foreach(
      (e: Edge[Int]) => insertEdgeEntry(e.srcId.toInt, e.dstId.toInt)
    )
  }

  def exportNodes(nodes: RDD[(VertexId, String)]) {
    nodes.collect().foreach(
      (n: (VertexId, String)) => insertNodeEntry(n._1, n._2)
    )
  }
}

