package com.grapheye

import org.apache.spark.SparkContext
import org.apache.spark.SparkConf

object App {
  def main(arg: Array[String]) {
    System.out.println("Hello!");
    val conf = new SparkConf();
    val sc = new SparkContext(conf);
    System.out.println("Bye!");
  }
}
