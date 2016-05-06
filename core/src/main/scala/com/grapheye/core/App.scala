package com.grapheye.core

import org.apache.spark.SparkContext
import org.apache.spark.SparkConf
import org.apache.spark.graphx.GraphLoader
import org.apache.spark.graphx.VertexId
import org.apache.spark.graphx.VertexRDD
import org.apache.spark.graphx.Graph
import org.apache.spark.graphx.lib.LabelPropagation
import org.apache.spark.rdd.RDD

import org.rogach.scallop.ScallopConf
import org.rogach.scallop.exceptions.RequiredOptionNotFound

class Conf(args: Seq[String]) extends ScallopConf(args) {

  val algorithm = trailArg[String]()
  val output = trailArg[String]()
  val edgeFile = trailArg[String]()
  val nodeFile = trailArg[String](required=false)

  validate(algorithm) { a =>
    if (List("pagerank", "trianglecount", "labelpropagation").contains(a)) Right(Unit)
    else Left("unsupported algorithm " + a)
  }

  override def onError(e: Throwable): Unit = {
    System.err.println(
      """Usage: ./run.sh algorithm output input
        |  Algorithm: pagerank, trianglecount, labelpropagation
        |  Output: mongodb_collection_name
        |  Input: edge_file_path node_file_path""".stripMargin)
    System.exit(1)
  }
  verify()
}

object App {
  def main(args: Array[String]) {

    /* Load and parse configurations. */
    val conf = new Conf(args)

    val sconf = new SparkConf();
    val sc = new SparkContext(sconf)

    /* Import */
    System.out.println("Importing..")
    val graph = GraphLoader.edgeListFile(sc, conf.edgeFile())

    var nodeVertices: RDD[(VertexId, String)] = null;
    if (!conf.nodeFile.isEmpty) {
      val nodeList = sc.textFile(conf.nodeFile())
      nodeVertices = nodeList.map(
        v => (v.split(" ")(0).toLong, v.split(" ")(1))
      )
    }

    /* Compute and export */
    conf.algorithm() match {
      case "pagerank" => compute_pagerank(graph, nodeVertices, conf)
      case "trianglecount" => compute_trianglecount(graph, nodeVertices, conf)
      case "labelpropagation" => compute_labelpropagation(graph, nodeVertices, conf)
    }

    System.out.println("Done!")
  }
  def compute_pagerank(graph: Graph[Int, Int], nodeVertices: RDD[(VertexId, String)], conf: Conf) {
    System.out.println("Computing..")
    val ranks = graph.pageRank(0.0001)

    System.out.println("Exporting..")
    val exporter = new Exporter("localhost:27017", "test", conf.output(), "rank")
    exporter.exportDouble(ranks.vertices, nodeVertices)
  }
  def compute_trianglecount(graph: Graph[Int, Int], nodeVertices: RDD[(VertexId, String)], conf: Conf) {
    System.out.println("Computing..")
    val numberOfTriangles = graph.triangleCount()

    System.out.println("Exporting..")
    val exporter = new Exporter("localhost:27017", "test", conf.output(), "trianglecount")
    exporter.exportInt(numberOfTriangles.vertices, nodeVertices)
  }
    def compute_labelpropagation(graph: Graph[Int, Int], nodeVertices: RDD[(VertexId, String)], conf: Conf) {
    System.out.println("Computing..")
    val labelId = LabelPropagation.run(graph, 10)

    System.out.println("Exporting..")
    val exporter = new Exporter("localhost:27017", "test", conf.output(), "labelId")
    exporter.exportVertexId(labelId.vertices, nodeVertices)
  }
}
