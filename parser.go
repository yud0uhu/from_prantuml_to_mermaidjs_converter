package main

import (
	"fmt"
    "strings"
	"os"
	"bufio"
)

func main() {
	// 一行ずつ読み込み
	data, _ :=  os.Open("plantUML.txt")
	defer data.Close()
	scanner := bufio.NewScanner(data)
	for scanner.Scan(){
		// fmt.Println(scanner.Text())
		r := strings.NewReplacer("->", "-->")
		resStr := r.Replace(scanner.Text())
		fmt.Println(resStr)
	}

}
