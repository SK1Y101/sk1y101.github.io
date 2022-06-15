---
layout: page
title: About me
permalink: /about/
description: A short history of me!
nav: false
---

{% assign thisyear = "now" | date: "%Y" | plus: 0 %}
{% assign timeline = site.timeline | sort: "date" %}

{{ timeline }}

{% assign categorized_projects = site.projects | where: "category", category %}
{% assign sorted_projects = categorized_projects | sort: "importance" %}

{% for y in (2000..thisyear) reversed %}
	{{ y }}
{% endfor %}
