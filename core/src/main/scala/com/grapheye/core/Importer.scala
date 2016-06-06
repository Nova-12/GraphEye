package com.grapheye.core

import org.apache.spark.SparkContext
import org.apache.spark.graphx.Graph
import org.apache.spark.graphx.GraphLoader
import org.apache.spark.graphx.VertexId

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
    return textFile()
  }

  def importGraph(): Graph[String, Int] = {
    conf.inputType() match {
      case "text" => return textFile()
      case "mongodb" => return mongodb()
    }
    return null
  }
}

