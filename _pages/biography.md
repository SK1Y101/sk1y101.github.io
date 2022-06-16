---
layout: page
title: About
permalink: /about/
description: A short history of me!
nav: false
---
<!-- fetch timeline objects -->
{% assign timeline = site.timeline | concat: site.projects | sort: "date" %}

<!-- Timeline display -->
<div class="timeline">
	<!-- Iterate on all page years -->
	{% for item in timeline reversed %}
		<!-- update year tag -->
		{% assign thisyear = item.date | date: "%Y" %}
		<!-- Create a year heading if needed -->
		{% if thisyear != y %}
			{% assign y = thisyear %}
			<h2 class="year">{{ y }}</h2>
		{% endif %}
		<!-- Content -->
		<div class="container {{ item.category | downcase }}">
			<!-- If we have a timeline object -->
			{% if item.timeline %}
				{{ item.title | emojify}}
				{{ item.content | remove: '<p>' | remove: '</p>' | emojify }}
			<!-- If we have a project object -->
			{% else %}
				{{ item.title | emojify}}
				{{ item.description | remove: '<p>' | remove: '</p>' }}
			{% endif %}
		</div>
	{% endfor %}
</div>
