---
layout: about
title: About
permalink: /
description: Welcome to my personal website.

profile:
  align: right
  image: prof_pic.jpg
  address: >
    <p><a href="https://wakatime.com/@83d59565-ae76-4745-b10d-0c9776c223f1"><img src="https://wakatime.com/badge/user/83d59565-ae76-4745-b10d-0c9776c223f1.svg" alt="Total time coded since Mar 16 2021" /></a></p>
    <p>A programmer for fun, occasionally doing things that aren't useless</p>

news: true  # includes a list of news items
selected_papers: true # includes a list of papers marked as "selected={true}"
social: true  # includes social icons at the bottom of the page
---

Hi there, I'm Jack!

I'm a Final year masters student in astrophysics at Portsmouth university with a strong passion for Python programming, exoplanetary science, and gravitational wave astronomy. I'm currently looking to begin a career in computational physics, focusing primarily on astronomical research or spacecraft operations.

For any employers looking at this page, feel free to send a job posting to me via email. I only consider jobs that are fully remote work, but may be willing to enter negotiations if the position allows remote working for a large fraction of the total time.

### Projects

{% if site.projects %}
  {% include selected_projects.html %}
{% endif %}

for an extended list of things I'm working on, or have previously worked with, see <a href="sk1y101.github.io/projects">the projects section</a> of this website.

### Activity

I love a good graph, Especially ones that I can directly influence with programming. So here's a few graphs of my programming over time. It's wonderfully interesting, I would say.

<!-- Include the library. -->
<script src="https://unpkg.com/github-calendar@latest/dist/github-calendar.min.js"></script>
<!-- Optionally, include the theme (if you don't want to struggle to write the CSS) -->
<link rel="stylesheet" href="https://unpkg.com/github-calendar@latest/dist/github-calendar-responsive.css"/>
<!-- Prepare a container for your calendar. -->
<div class="calendar"> Loading the data just for you. </div>
<script>GitHubCalendar(".calendar", "your-username", { responsive: true });</script>

This wonderful chart is courtesy of [Bloggify](https://github.com/Bloggify), and can be found [here](https://github.com/Bloggify/github-calendar)

<img align="center" class="imgresize ghcard-light" src="https://wakatime.com/share/@SK1Y101/e5c5cfbd-56b2-4479-bae6-b6f1a5cbdbbc.svg">
<img align="center" class="imgresize ghcard-dark" src="https://wakatime.com/share/@SK1Y101/ba725dc4-a1cc-4648-9e2a-4f7f5ece0e72.svg"/>

<img align="center" class="imgresize ghcard-light" src="https://wakatime.com/share/@SK1Y101/551c0fe1-6ef1-4474-9881-54c8e0f24dfd.svg">
<img align="center" class="imgresize ghcard-dark" src="https://wakatime.com/share/@SK1Y101/8cd65eff-c82f-4dd0-99b0-da4c3f3a3e1a.svg"/>

### Support me

A lot of my work, especially if it's personal, is free, open source, and probably always will be. If you want to go above and beyond and support that, I do accept cups of tea.

<a href="https://www.buymeacoffee.com/lloydwaltersj">
  <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a tea&emoji=&slug=lloydwaltersj&button_colour=B3FFFF&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=c58e4c">
</a>

### Site status

![website: up](https://img.shields.io/website?url=https%3A%2F%2Fsk1y101.github.io)

[![Deploy](https://github.com/SK1Y101/sk1y101.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/SK1Y101/sk1y101.github.io/actions/workflows/deploy.yml)
