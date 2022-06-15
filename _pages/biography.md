---
layout: page
title: About me
permalink: /about/
description: A short history of me!
nav: false
---

{% assign thisyear = "now" | date: "%Y" | plus: 0 %}

<!-- Itterate on all years -->
{% for y in (2000..thisyear) reversed %}
	<!-- Create a year heading -->
	<h2 class="year">{{y}}</h2>
	<!-- Fetch this year's content-->
	{% assign sortedTimeline = site.timeline | where: "year", y %}
	{{ sortedTimeline }}
{% endfor %}
