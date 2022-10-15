---
layout: project
title: Masters Thesis
longtitle: Determining The Parameters of Exoplanetary Candidates From Transit Timing Variations
description: Searching for Transit Timing Variations to determine the parameters of additional exoplanets in a system.
img: assets/img/TransitProject/TTVModelAnimation.gif
importance:
github:
  user: SK1Y101
  repo: TransitProject
  onpage: true
  showbadges: false
  contributors: true
category: work
date: 2022-02-11

authors:
  - name: Jack Lloyd-Walters FRAS
    url: "https://lloydwaltersj.com"
    affiliations:
      name: Royal Astronomical Society, University of Portsmouth, Institute of Physics
  - name: Stephen Futcher FCA FRAS
    url:
    affiliations:
      name: Royal Astronomical Society, Hampshire Astronomical Group
  - name: Dr. Hooshyar Assadullahi
    url:
    affiliations:
      name: University of Portsmouth
  - name: Prof. Daniel Thomas
    url:
    affiliations:
      name: University of Portsmouth


links:
  pdf: TransitProject/TransitDissertation.pdf
  url: paper

# Optionally, you can add a table of contents to your post.
# NOTES:
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - we may want to automate TOC generation in the future using
#     jekyll-toc plugin (https://github.com/toshimaru/jekyll-toc).

bibliography:

toc:
  - name: Motivation
  - name: Overview and Plans
  - name: Code
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

## Motivation

[![forthebadge](https://forthebadge.com/images/badges/built-with-science.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-python.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/powered-by-coffee.svg)](https://forthebadge.com)

Transiting exoplanets are growing ever more numerous, since *Kepler* launched in 2009, we have seen an explosive growth in the number of them detected. There are thousands visible in any single patch of the sky, and that's awesome.

What interests me, however, is the potential hidden planets in those systems. The planets whose transit is off axis to our line of sight, and slip past silent in the night. Through their gravitational influence on the planets we can see, hints of their presence are evident, hints that we will attempt to locate programmatically.

***

## Overview and Plans

The (Current) High-level plan for this project is -as everything else is- subject to change. It is as follows:

- Find suitable observation targets (See [Project Proposal](#project-proposal)).
- Observe targets to collect data.
- Fit data to transit model and upload to [ExoClock](https://www.exoclock.space/database/observations_by_observer#419) (See [Literature Review](#literature-review)).
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

***

## Code

Because I'm me, and I love an excuse to program, this project will make use of every possible code technique I can. This involves simulation, signal processing, curve fitting, data collection, and even some pretty graphing. Almost enough to make an entire code library!

Also because it's me, and I love badges, here's a few summarising the repo.

![GitHub](https://img.shields.io/github/license/SK1Y101/TransitProject)
[![CodeFactor](https://www.codefactor.io/repository/github/SK1Y101/TransitProject/badge)](https://www.codefactor.io/repository/github/SK1Y101/TransitProject)
[![wakatime](https://wakatime.com/badge/github/SK1Y101/TransitProject.svg)](https://wakatime.com/badge/github/SK1Y101/TransitProject)
![GitHub commit activity](https://img.shields.io/github/commit-activity/w/SK1Y101/TransitProject)
![GitHub last commit](https://img.shields.io/github/last-commit/SK1Y101/TransitProject)

![GitHub language count](https://img.shields.io/github/languages/count/SK1Y101/TransitProject)
![GitHub top language](https://img.shields.io/github/languages/top/SK1Y101/TransitProject)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/SK1Y101/TransitProject)
![Lines of code](https://img.shields.io/tokei/lines/github.com/SK1Y101/TransitProject)
<img src="https://www.openhub.net/p/TransitProject/widgets/project_thin_badge?format=gif" alt="https://www.openhub.net/p/TransitProject/widgets/project_thin_badge?format=gif" style="border-radius: 0.25rem;">

***

## Documents

As part of this project, I have had to create several pieces of documentation, which can be found in each section below. Additionally, a summary of the document -if applicable- is given.

### Project Proposal

The overarching goal of this project is to attempt to measure transit timing variations of exoplanets, to determine the parameters of other exoplanet candidates in the system.

I will be making my own observations with the 24" Ritchey-Chretien telescope at [Clanfield observatory](https://hantsastro.org.uk/), and analyse them using [HOPS](https://www.exoworldsspies.com/en/software/). My own observations will be uploaded to [ExoClock](https://www.exoclock.space/database/observations_by_observer#419), and I will use their database for historical observation data.

I will write my own python software that will extract transit timing variations from lightcurve data. With these variations measured, I will attempt to derive a model of the system, and compare that to literature and simulation.

A short list of observation candidates was made by comparing exoplanet data with both [ExoClock](https://www.exoclock.space/database/observations_by_observer#419) and [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/), after which an application for telescope time was made.

The full document is accessible as a PDF from the link [Here](../../assets/pdf/TransitProject/Proposal.pdf)

---

### Literature Review

The literature review is my chance to demonstrate knowledge of the subject, and any learned topics since begining. As I have already a lot of experience with exoplanets [see my EPQ for the first documented example](../../assets/pdf/EPQ.pdf), I summarised that knowledge and attempted to explain trainsit timing variations, and their causes, which I have had to learn over the few weeks before writing the literature review.

In short, there are a multitude of reasons: Other planets, general relativity, non-gravitational perturbations, properties of the planetary atmosphere that change how the light-curve looks, and many others. Even among the list just given, I did not delve into everything.

The full document is accessible as a PDF from the link [Here](../../assets/pdf/TransitProject/LiteratureReview.pdf)

---

### Poster

I needed to summarise my work done, and a quick idea of my project moving forward. Of course, I noted [ExoClock](https://www.exoclock.space/database/observations_by_observer#419) and my tranist observations, and gave a quick summary of (what was essentially) the literature review.

The full document is accessible as a PDF from the link [Here](../../assets/pdf/TransitProject/Poster.pdf)

---

### Presentation

As part of a demonstration of both the skills earned and progress made, a PowerPoint presentation had to be given.
A brief overview of the motivation for the project, the methodology, results, and conclusions, as well as the future steps for the project, were given in an eight minute talk, with two additional minutes for audience questions.

The full document is accessible as a PDF from the link [Here](../../assets/pdf/TransitProject/TransitPresentation.pdf)

---

### Dissertation

As the final stage in the masters project, a final thesis needed to be written.

This 6500 word dissertation would highlight the entire process, give detail to the findings and methods, and update literature, hopefully furthering the bounds of scientific knowledge.

The full document is accessible as a PDF from the link [Here](../../assets/pdf/TransitProject/TransitDissertation.pdf)
