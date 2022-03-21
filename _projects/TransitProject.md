---
layout: project
title: Masters Thesis
longtitle: Determining The Parameters of Exoplanetary Candidates From Transit Timing Variations
description: Searching for Transit Timing Variations to determine the parameters of additional exoplanets in a system.
img: assets/img/TransitProject/KeplerLightCurve.jpg
importance: 1
github:
  user: SK1Y101
  repo: TransitProject
  onpage: true
category: work
date: 2022-02-11

authors:
  - name: Jack Lloyd-Walters
    url: "https://sk1y101.github.io"
links:
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
  - name: Overview
  - name: Documents
    subsections:
      - name: Project proposal
      - name: Literature Review
      - name: Poster
      - name: Presentation
      - name: Dissertation

# Below is an example of injecting additional post-specific styles.
# If you use this post as a template, delete this _styles block.

---

It should be noted, this project is a work in progress, and many things are subject to change.

## Overview

The (Current) High-level plan for this project is (as everything else is) subject to change. It is as follows:

- Find suitable observation targets (See [Project Proposal](#project-proposal)).
- Observe targets to collect data.
- Fit data to transit model and upload to Exoclock (See [Literature Review](#literature-review)).
- Summarise methodology (See [Poster](#poster)).
- Write code.
  - Select target planetary system
  - Find all ExoClock/ETD data for the planetary system.
  - Find the known system information (ie: NASA Exoplanet Archive search).
  - Simulate the known parts of the system.
  - Fit the simulation to the ExoClock/ETD data.
  - Determine whether the system does exhibit TTV.
  - Run hundreds of simulations to suggest possible system layout.
  - Summarise every stage with graphs and charts.
- Compile results (see [Presentation](#presentation)).
- Summarise findings and results, and suggest options for future work (see [Dissertation](#dissertation)).

## Documents

As part of this project, I have had to create several pieces of documentation, which can be found in each section below. Additionally, a summary of the document -if applicable- is given.

### Project Proposal

The overarching goal of this project is to attempt to measure transit timing variations of exoplanets, to determine the parameters of other exoplanet candidates in the system.

I will be making my own observations with the 24" Ritchey-Chretien telescope at [Clanfield observatory](https://hantsastro.org.uk/), and analyse them using [HOPS](https://www.exoworldsspies.com/en/software/). My own observations will be uploaded to [ExoClock](https://www.exoclock.space/), and I will use their database for historical observation data.

I will write my own python software that will extract transit timing variations from lightcurve data. With these variations measured, I will attempt to derive a model of the system, and compare that to literature and simulation.

A short list of observation candidates was made by comparing exoplanet data with both [ExoClock](https://www.exoclock.space/) and [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/), after which an application for telescope time was made.

The full document is accessible as a PDF from the link [Here](../../assets/pdf/TransitProject/Proposal.pdf)

---

### Literature Review

The full document is accessible as a PDF from the link [Here](../../assets/pdf/TransitProject/LiteratureReview.pdf)

---

### Poster

The full document is accessible as a PDF from the link [Here](../../assets/pdf/TransitProject/Poster.pdf)

---

### Presentation

Work in progress, has not yet been completed

---

### Dissertation

Work in progress, has not yet been completed

---
