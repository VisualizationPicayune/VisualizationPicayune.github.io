---
layout: post
title: "Issue Comment Testing"
meta: ""
date: 0001-01-01 01:01:01 +05:00
tags: Testing
author: Christopher Michael Buck
comments: false
draft: true
---

Look at JavaScript Console

<script>


var data = {
  "title": "A test issue",
  "body": "This is a comment holder",
  "assignee": "butterwell",
  "milestone": 1,
  "labels": [
    "comment",
    "Label2"
  ]
}

var url = "https://api.github.com/repos/butterwell/github-issue-test/issues"
//d3.json(url).post(data, function(a,b) {
//    console.log(a)
//    console.log(b)
//})

var access_token = "CAACEdEose0cBAEzZBd8j1FKTmqsXrUZBFGxGny0zvv3H9S6OZAfQB54FAuuDdoV7aAGJxrLxZA7v9qs1g4QK5sAvCzr7Mnn0zHW67PktFDSy1JlAa65i7aKp4zjxd7ZAbzFLRem68axxWOJjCjL9oofta7sHbqphZCU6ePm2sb0XLecbZAVd9FtAY2RElNn1tWr5cEa7ShCLROkgLaPL9ZATYHlXoqV7DDQZD"

d3.json(url).post(data, function(a,b) {
    console.log(a)
    console.log(b)
//})




</script>