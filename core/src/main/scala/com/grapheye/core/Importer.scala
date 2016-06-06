package com.grapheye.core

import org.apache.spark.SparkContext
import org.apache.spark.graphx.Graph
import org.apache.spark.graphx.GraphLoader
import org.apache.spark.graphx.VertexId

class Importer(sc: SparkContext, conf: Conf) {

  def textFile(): Graph[String, Int] = {
    val edgeList = GraphLoader.edgeListFile(sc, conf.edgeFile())
    var graph: Graph[String, Int] = null

    if (conf.nodeFile.isEmpty) {
      graph = edgeList.mapVertices[String](
        (vid: VertexId, number: Int) => vid.toString
      )
    }
    else {
      val nodeList = sc.textFile(conf.nodeFile())
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

  def importGraph(): Graph[String, Int] = {
    return textFile()
  }
}

