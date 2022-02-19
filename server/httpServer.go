package main

import (
  "log"
  "net/http"

  "github.com/gin-contrib/cors"
  "github.com/gin-gonic/gin"
)

func handleRequests() {
  engine:= gin.Default()
  config := cors.DefaultConfig()
    config.AllowOrigins = []string{"http://localhost:3000"}
    engine.Use(cors.New(config))


  engine.GET("/", func(c *gin.Context) {
      c.JSON(http.StatusOK, gin.H{
          "message": "hello world",
      })
  })

  engine.GET("/write/:text", writeHandler)

  log.Fatal(engine.Run(":8080"))
}

func writeHandler(c *gin.Context) {
  conv := textParser(c.Param("text"))
  c.String(http.StatusOK, conv)
}
