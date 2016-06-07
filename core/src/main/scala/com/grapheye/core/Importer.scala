package com.grapheye.core

import org.apache.hadoop.conf.Configuration
import org.apache.spark.SparkContext
import org.apache.spark.graphx.Edge
import org.apache.spark.graphx.Graph
import org.apache.spark.graphx.GraphLoader
import org.apache.spark.graphx.VertexId
import org.bson.BSONObject
import org.bson.BasicBSONObject
import org.bson.types.ObjectId

class Importer(sc: SparkContext, conf: Conf) {

  def textFile(): Graph[String, Int] = {
    val edgeList = GraphLoader.edgeListFile(sc, conf.edge())
    var graph: Graph[String, Int] = null

    if (conf.node.isEmpty) {
      graph = edgeList.mapVertices[String](
        (vid: VertexId, number: Int) => vid.toString
      )
    }
    else {
      val nodeList = sc.textFile(conf.node())
      val nodeVertices = nodeList.map(
        line => (line.split(" ")(0).toLong, line.split(" ")(1))
      )
      graph = edgeList.outerJoinVertices[String, String](nodeVertices)(
        (vid: VertexId, number: Int, name: Option[String])
        => (name.getOrElse("nonamed"))
      )
    }
    return graph
  }

  def mongodb(): Graph[String, Int] = {

    val edgeConf = new Configuration()
    edgeConf.set("mongo.input.uri", conf.edge())

    val mongoEdgeRDD = sc.newAPIHadoopRDD(edgeConf,
      classOf[com.mongodb.hadoop.MongoInputFormat],
      classOf[Object],
      classOf[BSONObject])

    val edges = mongoEdgeRDD.map(
      (v: (Object, BSONObject)) => {
        var from = v._2.get("from").asInstanceOf[Int].asInstanceOf[Long]
        var to = v._2.get("to").asInstanceOf[Int].asInstanceOf[Long]
        Edge[Int](from, to, 0)
      }
    )

    val nodeConf = new Configuration()
    nodeConf.set("mongo.input.uri", conf.node())

    val mongoNodeRDD = sc.newAPIHadoopRDD(nodeConf,
      classOf[com.mongodb.hadoop.MongoInputFormat],
      classOf[Object],
      classOf[BSONObject])

    val nodes = mongoNodeRDD.map(
      (v: (Object, BSONObject)) => {
        var id = v._2.get("id").asInstanceOf[Int].asInstanceOf[Long]
        var name = v._2.get("name").asInstanceOf[String]
        (id, name)
      }
    )

    return Graph(nodes, edges)
  }

  def importGraph(): Graph[String, Int] = {
    conf.inputType() match {
      case "text" => return textFile()
      case "mongodb" => return mongodb()
    }
    return null
  }
}

