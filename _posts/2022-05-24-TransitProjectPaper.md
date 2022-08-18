---
layout: distill
title: Masters Thesis
longtitle: Determining The Parameters of Exoplanetary Candidates From Transit Timing Variations
description: >
  <p>Searching for Transit Timing Variations to determine the parameters of additional exoplanets in a system.</p>
  <p>astronomical databases: miscellaneous -- software: development -- software: simulations -- techniques: photometric</p>
img: assets/img/TransitProject/TTVModelAnimation.gif
importance: 1
github:
  user: SK1Y101
  repo: TransitProject
  onpage: true
  showbadges: false
  contributors: true
category: work
date: 2022-05-24

authors:
  - name: Jack Lloyd-Walters
    url: "https://sk1y101.github.io"
    affiliations:
      name: Royal Astronomical Society, University of Portsmouth
  - name: Stephen Futcher
    affiliations:
      name: Royal Astronomical Society, Hampshire Astronomical Group
  - name: Daniel Thomas
    affiliations:
      name: University of Portsmouth
  - name: Hooshyar Assadullahi
    affiliations:
      name: University of Portsmouth

links:
  pdf: TransitProject/TransitDissertation.pdf
  url:

# Optionally, you can add a table of contents to your post.
# NOTES:
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - we may want to automate TOC generation in the future using
#     jekyll-toc plugin (https://github.com/toshimaru/jekyll-toc).

bibliography: transitproject.bib

toc:
  - name: Abstract
  - name: Introduction
    subsections:
      - name: Transit photometry
      - name: Transit timing
        subsections:
        - name: Barycentre motion
        - name: Orbital perturbation
        - name: mean motion libration
      - name: Project objectives
  - name: Methodology
    subsections:
      - name: TTV Models
        subsections:
          - name: Interior perturbation
            subsections:
              - name: Initial derivation
              - name: Extension to eccentric orbits
          - name: Exterior perturbation
      - name: Parameter search
        subsections:
          - name: Optimisation
            subsections:
              - name: Least squares regression
              - name: Maximum likelihood
              - name: Minimisation
          - name: Model comparison
            subsections:
              - name: Akaike information criterion
              - name: Corrected Akaike information criterion
              - name: Bayesian information criterion
          - name: Markov Chain, Monte Carlo
  - name: Results / Discussion
    subsections:
      - name: Observations
      - name: Light curve analysis
        subsections:
          - name: De-trending
          - name: Transit fitting
          - name: TTV Residuals
      - name: Simulation pipeline
        subsections:
          - name: Initialisation
          - name: Simulated TTV
      - name: Analytical Models
        subsections:
          - name: System and TTV
          - name: Model comparison
          - name: Parameter optimisation
          - name: Model selection
          - name: Most likely system
      - name: Discussion
        subsections:
          - name: Evaluation
          - name: Limitations
          - name: Errors
  - name: Conclusion
  - name: Acknowledgements
  - name: Data Availability
  - name: Extra material
    subsections:
    - name: Transit duration derivation

# Below is an example of injecting additional post-specific styles.
# If you use this post as a template, delete this _styles block.

---

This is a test