---
layout: page
title: About Me
permalink: /about/
description: A short history of me, in timeline form!
nav: true
---

Items on the timeline follow the same colour scheme as my CV.

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
				<h4>{{ item.title | emojify}}</h4>
				{{ item.content | remove: '<p>' | remove: '</p>' | emojify }}
			<!-- If we have a project object -->
			{% else %}
				<!-- Link to project -->
				{% if item.redirect %}
				<a href="{{ item.redirect }}">{% else %}<a href="{{ item.url | relative_url }}">{% endif %}
					<h4>{{ item.title | emojify}}</h4>
					{{ item.description | remove: '<p>' | remove: '</p>' }}
			  </a>
			{% endif %}
		</div>
	{% endfor %}
</div>
