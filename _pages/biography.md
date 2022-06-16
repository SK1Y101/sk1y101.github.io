---
layout: page
title: About
permalink: /about/
description: A short history of me!
nav: false
---

<div class="timeline">
	<!-- Itterate on all page years -->
	{% for item in site.timeline | sort: "date" | reversed %}
		<!-- update year tag -->
		{% assign thisyear = item.date | date: "%Y" %}
		<!-- Create a year heading if needed -->
		{% if thisyear != y %}
			{% assign y = thisyear %}
			<h2 class="year">{{ y }}</h2>
		{% endif %}
		<!-- Content -->
		<div class="container">
			{{ item.content | remove: '<p>' | remove: '</p>' | emojify }}
		</div>
	{% endfor %}
</div>
