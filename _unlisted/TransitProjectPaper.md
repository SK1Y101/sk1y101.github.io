---
layout: project
title: Masters Thesis
longtitle: Determining The Parameters of Exoplanetary Candidates From Transit Timing Variations
description: >
  <p>Searching for Transit Timing Variations to determine the parameters of additional exoplanets in a system.</p>
  <p><small>astronomical databases: miscellaneous -- software: development -- software: simulations -- techniques: photometric</small></p>
img: assets/img/TransitProject/TTVModelAnimation.gif
permalink: /projects/TransitProject/paper/
importance:
github:
  user: SK1Y101
  repo: TransitProject
  onpage: true
  showbadges: true
  contributors: true
category: work
date: 2022-05-24

authors:
  - name: Jack Lloyd-Walters
    url: "https://sk1y101.github.io"
    affiliations:
      name: Royal Astronomical Society, Portsmouth University, Institute of Physics

authors:
  - name: Jack Lloyd-Walters
    url: "https://sk1y101.github.io"
    affiliations:
      name: Royal Astronomical Society, Portsmouth University, Institute of Physics

links:
  pdf: TransitProject/TransitDissertation.pdf
  url: _unlisted/TransitProjectPaper

# Optionally, you can add a table of contents to your post.
# NOTES:
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - we may want to automate TOC generation in the future using
#     jekyll-toc plugin (https://github.com/toshimaru/jekyll-toc).

bibliography: transitproject.bib

toc:
  - name: Abstract
  

# Below is an example of injecting additional post-specific styles.
# If you use this post as a template, delete this _styles block.

---
{% capture figurenums %}{% increment figure_num %}{% increment equation_num %}{% endcapture %}

## Abstract

Transit Timing Variation (TTV) provides a powerful tool to probe the dynamical configuration of exoplanetary systems from historical transit data <d-cite key="firstTTVPaper"></d-cite>, <d-cite key="secondTTVPaper"></d-cite>. TTV analysis has allowed both verification of planetary parameters <d-cite key="TrappistMass"></d-cite> and the discovery of new planetary bodies <d-cite key="Keplerc"></d-cite> from transit observation alone.
As part of this work, additional transit light curves have been collected with the 24" Ritchey-Chrétien telescope at Clanfield observatory and combined with the ExoClock database <d-cite key="ExoClockI"></d-cite>, <d-cite key="ExoClockII"></d-cite>, Exoplanet transit database <d-cite key="ETD"></d-cite>, and *TESS* light curves <d-cite key="tess"></d-cite> to create a set of historical TTV data for analysis.
A set of extensible TTV models have been developed to analytically approximate the chaotic n-body nature of real planetary systems. A computational pipeline to automate model fitting using various parameter optimisation <d-cite key="diffEvo"></d-cite>, <d-cite key="dualAnnealing"></d-cite> and model comparison <d-cite key="AIC"></d-cite>, <d-cite key="AIC2"></d-cite>, <d-cite key="AICC"></d-cite>, <d-cite key="BIC"></d-cite> techniques has been developed in-situ, allowing verification of model validity and analysis of TTV candidates using a combination of simulation and historical TTV data.
The models developed were found to accurately describe TTV, and could determine the initial system parameters of simulated TTV systems to reasonable accuracy.
Future work will allow extensions to these models, providing a more powerful suite of analytical tools for exoplanetary science, and the application of these methods to real exoplanetary systems with the possibility of new planetary discoveries.

***
