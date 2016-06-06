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

/* The purpose of Exporter class is to export computed graph result to MongoDB */
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

  /* The following three methods are used for making collection instance */
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

  /* The following three methods are used for exporting collection instance to MongoDB collection*/
  def exportDouble(graph: Graph[String,Int], data: VertexRDD[Double]) {
    val dataWithNames = data.leftZipJoin[String, (String,Double)](graph.vertices)(
      (vid: VertexId, value: Double, name: Option[String]) => (name.getOrElse(""), value)
    )
    dataWithNames.sortBy(_._2, ascending=false).collect().foreach(
      (v: (VertexId, (String, Double))) => insertDoubleEntry(v._2._1, v._2._2)
    )
  }

  def exportInt(graph: Graph[String,Int], data: VertexRDD[Int]) {
    val dataWithNames = data.leftZipJoin[String, (String,Int)](graph.vertices)(
      (vid: VertexId, value: Int, name: Option[String]) => (name.getOrElse(""), value)
    )
    dataWithNames.sortBy(_._2, ascending=false).collect().foreach(
      (v: (VertexId, (String, Int))) => insertIntEntry(v._2._1, v._2._2)
    )
  }

  def exportVertexId(graph: Graph[String,Int], data: VertexRDD[VertexId]) {
    val dataWithNames = data.leftZipJoin[String, (String,VertexId)](graph.vertices)(
      (vid: VertexId, value: VertexId, name: Option[String]) => (name.getOrElse(""), value)
    )
    dataWithNames.sortBy(_._2, ascending=false).collect().foreach(
      (v: (VertexId, (String, VertexId))) => insertVertexIdEntry(v._2._1, v._2._2)
    )
  }

  /* The following three methods are used for saving graph itself */
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

  def exportGraph(graph: Graph[String, Int]) {
    graph.edges.collect().foreach(
      (e: Edge[Int]) => insertEdgeEntry(e.srcId.toInt, e.dstId.toInt)
    )
    graph.vertices.collect().foreach(
      (v: (VertexId, String)) => insertNodeEntry(v._1, v._2)
    )
  }
}

