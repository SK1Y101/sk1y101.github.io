---
layout: project
title: Masters Thesis
longtitle: Determining The Parameters of Exoplanetary Candidates From Transit Timing Variations
description: Searching for Transit Timing Variations to determine the parameters of additional exoplanets in a system.
img: assets/img/TransitProject/KeplerLightCurve.jpg
importance: 1
github: https://github.com/SK1Y101/TransitProject
category: work

date: 2021-02-11

authors:
  - name: Jack Lloyd-Walters
    url: "https://sk1y101.github.io"

links:
  github: SK1Y101/TransitProject
  pdf:
  url:

# Optionally, you can add a table of contents to your post.
# NOTES:
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - we may want to automate TOC generation in the future using
#     jekyll-toc plugin (https://github.com/toshimaru/jekyll-toc).

bibliography:

toc:
  - name: Project proposal

# Below is an example of injecting additional post-specific styles.
# If you use this post as a template, delete this _styles block.

---

It should be noted, this project is a work in progress, and many things are subject to change.

## Project proposal

The overarching goal of this project is to attempt to measure transit timing variations of exoplanets, to determine the parameters of other exoplanet candidates in the system.

I will be making my own observations with the 24" Ritchey-Chretien telescope at [Clanfield observatory](https://hantsastro.org.uk/), and analyse them using [HOPS](https://www.exoworldsspies.com/en/software/). My own observations will be uploaded to [ExoClock](https://www.exoclock.space/), and I will use their database for historical observation data.

I will write my own python software that will extract transit timing variations from lightcurve data. With these variations measured, I will attempt to derive a model of the system, and compare that to literature and simulation.

A short list of observation candidates was made by comparing exoplanet data with both [ExoClock](https://www.exoclock.space/) and [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/), for which an application for telescope time was made.

The full project proposal document can also be found [Here](assets/pdf/TransitProject/TransitProjectProposal.pdf).

---
