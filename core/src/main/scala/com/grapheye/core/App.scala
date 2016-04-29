package com.grapheye.core

import org.apache.spark.SparkContext
import org.apache.spark.SparkConf
import org.apache.spark.graphx.GraphLoader
import org.apache.spark.graphx.VertexId
import org.apache.spark.graphx.VertexRDD
import org.apache.spark.rdd.RDD

import org.rogach.scallop.ScallopConf
import org.rogach.scallop.exceptions.RequiredOptionNotFound

class Conf(args: Seq[String]) extends ScallopConf(args) {
  banner("Usage: ./run.sh output-dest input-type input-source\n\nOptions:")
  val output = trailArg[String]()
  val edgeFile = trailArg[String]()
  val nodeFile = trailArg[String](required=false)
  override def onError(e: Throwable): Unit = {
    printHelp()
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
    if (conf.nodeFile.isSupplied) {
      val nodeList = sc.textFile(conf.nodeFile())
      nodeVertices = nodeList.map(
        v => (v.split(" ")(0).toLong, v.split(" ")(1))
      )
    }

    /* Compute */
    System.out.println("Computing..")
    val ranks = graph.pageRank(0.0001)

    /* Export */
    System.out.println("Exporting..")
    val exporter = new Exporter("localhost:27017", "test", conf.output())
    if (nodeVertices != null){
      val ranksWithNode = ranks.outerJoinVertices(nodeVertices) {
        (v, rank, title) => (title.getOrElse(" "), rank)
      }
      exporter.exportPageRankWithNode(ranksWithNode.vertices)
    }
    else{
      exporter.exportPageRank(ranks.vertices)
    }

    System.out.println("Done!")
  }
}
