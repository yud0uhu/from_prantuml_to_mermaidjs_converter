package main

import (
	"fmt"
    "strings"
	"os"
	"bufio"
)

func main() {
	// PlantUMLをsequenceDiagramに置換する
	// テキストファイルの文字列を一行ずつ読み込む
	data, _ :=  os.Open("plantUML.txt")
	defer data.Close()
	scanner := bufio.NewScanner(data)
	for scanner.Scan(){
		str := scanner.Text()
		
		r := strings.NewReplacer("@startuml","sequenceDiagram","->","-->","boundary","participant","control","participant","entity","participant","database","participant","collections","participant","queue","participant","@enduml","")

		resStr := r.Replace(str)

		fmt.Println(resStr)
	}

}
