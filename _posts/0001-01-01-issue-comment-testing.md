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
d3.json(url).post(data, function(a,b) {
    console.log(a)
    console.log(b)
})



</script>