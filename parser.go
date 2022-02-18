package main


import (
	"fmt"
	"io/ioutil"
	"log"
)

// ファイルの全データを一度に読み込む
func main() {
	content, err := ioutil.ReadFile("plantUML.txt")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("File contents: %s", content)
}
