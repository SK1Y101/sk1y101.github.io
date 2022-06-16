---
layout: page
title: About me
permalink: /about/
description: A short history of me!
nav: false
---

<div class="publications">
	<!-- Itterate on all page years -->
	{% for post in site.timeline | sort: "date" %}
		<!-- update year tag -->
		{% assign thisyear = post.date | date: "%Y" %}
		<!-- Create a year heading if needed -->
		{% if thisyear != y %}
			{% assign y = thisyear %}
			<h2 class="year">{{ y }}</h2>
		{% endif %}
		<!-- Content -->
	{% endfor %}
</div>
