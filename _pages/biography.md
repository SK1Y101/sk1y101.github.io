---
layout: page
title: About me
permalink: /about/
description: A short history of me!
nav: false
---

{% assign thisyear = "now" | date: "%Y" | plus: 0 %}

{% assign timeline = site.timeline | sort: "date" %}
{% for post in timeline.post %}{% assign post.year = post.date | date: "%Y" %}{% endfor %}

<div class="publications">
	<!-- Itterate on all page years -->
	{% for y in (2000..thisyear) reversed %}
		<!-- fetch the object for this year -->
		{% assign thisyear = timeline | where:"year", y %}
		<!-- if we have content -->
		{% if thisyear.size > 0 %}
		  <!-- Create a year heading -->
		  <h2 class="year">{{y}}</h2>
		{% endif %}
	{% endfor %}
</div>
