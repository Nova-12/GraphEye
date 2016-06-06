package com.grapheye.core

import org.apache.spark.SparkContext
import org.apache.spark.SparkConf
import org.apache.spark.graphx.Graph
import org.apache.spark.graphx.lib.LabelPropagation

import org.rogach.scallop.ScallopConf
import org.rogach.scallop.exceptions.RequiredOptionNotFound

/* The purpose of Conf class is to parse the arguments in command line interface */
class Conf(args: Seq[String]) extends ScallopConf(args) {

  val algorithm = trailArg[String]()
  val output = trailArg[String]()
  val inputType = trailArg[String]()
  val edge = trailArg[String]()
  val node = trailArg[String](required=false)

  validate(algorithm) { a =>
    if (List("pagerank", "trianglecount", "labelpropagation", "connectedcomponents").contains(a)) Right(Unit)
    else Left("unsupported algorithm " + a)
  }

  validate(inputType) { a =>
    if (List("text", "mongodb").contains(a)) Right(Unit)
    else Left("unsupported input type " + a)
  }

  override def onError(e: Throwable): Unit = {
    System.err.println(
      """Usage: ./run.sh algorithm output inputType edge [node]
        |  Algorithm: pagerank, trianglecount, labelpropagation, connectedcomponents
        |  Output: mongodb_collection_name
        |  InputType: text mongodb
        |  edge, node: file path or table name or collection name""".stripMargin)
    System.exit(1)
  }
  verify()
}

object App {

  var sc: SparkContext = null
  var exporter: Exporter = null
  var conf: Conf = null
  var graph: Graph[String, Int] = null

  /* The main function of GraphEye core */
  def main(args: Array[String]) {

    /* Load and parse configurations. */
    conf = new Conf(args)

    val sconf = new SparkConf();
    sc = new SparkContext(sconf)

    /* Import */
    System.out.println("Importing..")
    val importer = new Importer(sc, conf)
    graph = importer.importGraph()

    /* Save graph itself */
    exporter = new Exporter("localhost:27017", "test", conf.output());
    exporter.exportGraph(graph)

    /* Compute and export */
    conf.algorithm() match {
      case "pagerank" => compute_pagerank()
      case "trianglecount" => compute_trianglecount()
      case "labelpropagation" => compute_labelpropagation()
      case "connectedcomponents" =>compute_connectedcomponents()
    }

    System.out.println("Done!")
  }

  /* The following four methods compute graph algorithm and export to MongoDB */
  def compute_pagerank() {
    System.out.println("Computing..")
    val ranks = graph.pageRank(0.0001)

    System.out.println("Exporting..")
    exporter.setValueName("rank")
    exporter.exportDouble(graph, ranks.vertices)
  }

  def compute_trianglecount() {
    System.out.println("Computing..")
    val numberOfTriangles = graph.triangleCount()

    System.out.println("Exporting..")
    exporter.setValueName("trianglecount")
    exporter.exportInt(graph, numberOfTriangles.vertices)
  }

  def compute_labelpropagation() {
    System.out.println("Computing..")
    val labelId = LabelPropagation.run(graph, 10)

    System.out.println("Exporting..")
    exporter.setValueName("labelId")
    exporter.exportVertexId(graph, labelId.vertices)
  }

  def compute_connectedcomponents() {
    System.out.println("Computing..")
    val connectedNodes = graph.connectedComponents()

    System.out.println("Exporting..")
    exporter.setValueName("connected")
    exporter.exportVertexId(graph, connectedNodes.vertices)
  }
}
